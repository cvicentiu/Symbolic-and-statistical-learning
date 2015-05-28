// to allow tabbing to objects in mac mozilla enter the following
// about:config
// edit accessibility.tabfocus set the value 7


var agt   = navigator.userAgent.toLowerCase();
var mac   = agt.indexOf("mac") != -1;
var macIe = mac && document.all;

var gYOUR_RATING ='Your Recommendation: ';
var gDEFAULT_TEXT ='Recommend It: ';


if (!document.getElementById && document.all)
	document.getElementById = function(id)
	{
		return document.all[id];
	}

function starImg(val)
{

       if (val <=  0) num = "0";
  else if (val <   1) num = "half";
  else if (val < 1.5) num = "1";
  else if (val <   2) num = "1half";
  else if (val < 2.5) num = "2";
  else if (val <   3) num = "2half";
  else if (val < 3.5) num = "3";
  else if (val <   4) num = "3half";
  else if (val < 4.5) num = "4";  
  else if (val <   5) num = "4half";
  else if (val >=  5) num = "5";  

  
  if (val <=  0) {
    return"http://us.i1.yimg.com/us.yimg.com/i/us/ls/gr/or_star_0.gif";
  } else {  
    return"http://us.i1.yimg.com/us.yimg.com/i/us/ls/gr/or_star_" + num + ".gif";
  }

}

String.prototype.pluralize = function(count, plural)
{
  if (plural == null)
    plural = this + 's';
	
  if(count == 1) { return this } else { return plural }
}

function setRating(rating, votes, avg)
{
  vt = document.getElementById("numvotes");
  vt.innerHTML = votes + String(" vote").pluralize(votes);

  // round to one digit
  avg = Math.round(avg * 10) / 10;

  stars = document.getElementById("ratestars");
  stars.alt = avg + String(" star").pluralize(avg);
  stars.src = starImg(avg);

  for (i = 1; i <= 5; i++)
  {
    radio = document.getElementById("rater1_rater_input0radio" + i);

    if (i == rating)
      radio.checked = true;
    else
      radio.checked = false;
  }
}


function initRatings(formName)
{
	if (!document.getElementById) return;
	if (document.styleSheets) 
	{
		if (document.styleSheets[0].disabled) return;
	}
	var i=0; 
	var forms = document.getElementsByName(formName);
	if (forms) { var form = forms[0]; } else { var form = null; }
	
	if (!form) return false;
	while (i >=0)
	{
		var sInputName = formName + '_rater_input' + i;
		var oInputs = document.getElementsByName(sInputName);
		if (oInputs[0])
		{
			if (oInputs[0].nodeName =='SELECT')	gatherSelectAttributes(oInputs[0], formName);
			else if (oInputs[0].nodeName =='INPUT' && oInputs[0].type == 'radio') gatherRadioAttributes(oInputs, formName);
			i++;
		}
		else i = -1;
	}
}

function gatherRadioAttributes(pRadios, pForm)
{
	var curSelectedIndex = -1;
	var nRadioLength = pRadios.length;
	var oRadioContainer = pRadios[0].parentNode.parentNode;
	
	var oLegend = oRadioContainer.getElementsByTagName('LEGEND');
	if (oLegend[0]) { var defaultText = oLegend[0].innerHTML; } else { var defaultText = ''; }
	var oRadioValuesLabels = new Array();
	var inputName = pRadios[0].name;
	var className = pRadios[0].className;	
	for (var i = 0 ; i < nRadioLength ; i++)
	{
		var oCurRadio = pRadios[i];
		var radioValueLength =oRadioValuesLabels.length;
		oRadioValuesLabels[radioValueLength] = new Array();
		var curRadioValues =oRadioValuesLabels[radioValueLength] 
		if (oCurRadio.value) { curRadioValues['value'] = oCurRadio.value; } else { curRadioValues['value'] = i; }		
		if (!macIe)	{ 
			if (oCurRadio.nextSibling.data) {
				curRadioValues['label'] = oCurRadio.nextSibling.data;
			} else {
				curRadioValues['label'] = gDEFAULT_TEXT;
			}
		} else if (oCurRadio.parentNode.innerText) {
				curRadioValues['label'] = oCurRadio.parentNode.innerText;
			} else {
				curRadioValues['label'] = gDEFAULT_TEXT;
			}
		
		if (oCurRadio.checked) curSelectedIndex = i;
	}
	var appendTo = oRadioContainer.parentNode;
	appendTo.removeChild(oRadioContainer);
	createRater(inputName,appendTo, oRadioValuesLabels, curSelectedIndex, className, defaultText , pForm);	
}


function gatherSelectAttributes(pInput , pForm)
{	
	var oInputOptions = pInput.getElementsByTagName('OPTION');
	var curSelectedIndex = -1;
	var defaultText = '';
	var nInputOptionLength = oInputOptions.length;
	var oOptionValuesLabels = new Array();
	var inputName = pInput.name;
	var className = pInput.className;
	for (var i = 0 ; i < nInputOptionLength ; i++)
	{

		var oCurOption = oInputOptions[i];
		if (oCurOption.value != -1)
		{
			var optionValueLength =oOptionValuesLabels.length;
			oOptionValuesLabels[optionValueLength] = new Array();
			var curOptionValues =oOptionValuesLabels[optionValueLength] 
			if (oCurOption.value) { curOptionValues['value'] = oCurOption.value; } else { curOptionValues['value'] = i; }
			if (oCurOption.innerHTML) { curOptionValues['label'] = oCurOption.innerHTML; } else { curOptionValues['label'] = ""; }
			if (oCurOption.selected) curSelectedIndex = i-1;
		}
		else if (oCurOption.innerHTML) {
				defaultText = oCurOption.innerHTML;
			} else {
				defaultText = gDEFAULT_TEXT;
			}
	}
	var appendTo = pInput.parentNode;
	appendTo.removeChild(pInput);
	createRater(inputName,appendTo, oOptionValuesLabels, curSelectedIndex, className, defaultText , pForm);
}

function createRater(pName, pAppendTo, pOptionValuesLabels, pCurSelectedIndex, pClassName, pDefaultText , pForm)
{
	
	var oContainer = document.createElement('DIV');
	oContainer.className = pClassName;
	oContainer.id = pName+'_container';
	oContainer.labelsValues = pOptionValuesLabels;
	oContainer.selectedIndex = pCurSelectedIndex;
	oContainer.formId = pForm;
	var nElemsToAdd = pOptionValuesLabels.length;
	var textP = document.createElement('P');
	textP.id = pName+ '_text';
	/*var	hiddenField;
	if (!macIe) 
	{
		hiddenField = document.createElement('INPUT');
		hiddenField.type = 'hidden';
	}
	else hiddenField = document.createElement('<INPUT type="hidden">');
	
	hiddenField.name = pName;
	hiddenField.id = pName;*/
	
	if ( pCurSelectedIndex >=0 ) { textP.innerHTML = gYOUR_RATING; } else { textP.innerHTML = pDefaultText; }
	
	oContainer.textElemId = textP.id;
	oContainer.appendChild(textP);
	oContainer.defaultText = pDefaultText;
	var oElements = new Array();
	
	for ( var i = 0; i < nElemsToAdd; i++ )
	{
		var oElem = document.createElement('A');
		oElem.href="#";
		
		oElem.onmouseover = raterMouseOver;
		oElem.onfocus = raterMouseOver;
		oElem.onmouseout = raterMouseOut;
		oElem.onblur = raterMouseOut;		
		oElem.onclick = raterClick;
		oElem.containerId = oContainer.id;		
		oElem.index = i;
		var className = ''
		if (pCurSelectedIndex != -1 && i <= pCurSelectedIndex)
		{
				className = 'selected';
				
		}
		if (className != '') { var separator = ' '; } else { var separator = ''; }
		if (i%2) { var classNamePrefix = 'odd'+separator; } else { var classNamePrefix = 'even'+separator; }

		oElem.className = classNamePrefix + className;
		oContainer.appendChild(oElem);
		oElements[oElements.length] = oElem;
	}
	
		
	//hiddenField.value = pCurSelectedIndex;
	
	//oContainer.hiddenFieldId = hiddenField.id ;
	oContainer.ratingElements = oElements;
	//oContainer.appendChild(hiddenField);

	var clearDiv = document.createElement('DIV');
	clearDiv.className = 'clr';

	oContainer.appendChild(clearDiv);
	pAppendTo.appendChild(oContainer);
	
}


function raterMouseOver()
{
	var container = document.getElementById(this.containerId);
	var elements = container.getElementsByTagName('A');
	var numElements = elements.length;
	for (var i = 0; i < numElements; i++)
	{
		var curElem = elements[i];
		var selectedIndex  =  container.selectedIndex;
		var className = '';
		if ( selectedIndex > -1)
		{
			if (i <= selectedIndex && i <= this.index ) className = 'selectedover';
			else if (i <= selectedIndex &&  i > this.index) className = 'selectedless';
			else if (i > selectedIndex && i <= this.index) className = 'over';
			else if ( i > selectedIndex && i > this.index ) className = '';
		}
		else 
		{
			if (i <= this.index) className ='over'
		}
		if (className != '') { var separator = ' '; } else { var separator = ''; }
		if (i%2) { var classNamePrefix = 'odd'+separator; } else { var classNamePrefix = 'even'+separator; }
		curElem.className = classNamePrefix + className;
	}
	var textElem = document.getElementById(container.textElemId);
	textElem.innerHTML = container.labelsValues[this.index]['label'];
}

function raterMouseOut()
{
	var container = document.getElementById(this.containerId);
	var elements = container.getElementsByTagName('A');
	var numElements = elements.length;
	for (var i = 0; i < numElements; i++)
	{
		var curElem = elements[i];
		var selectedIndex  =  container.selectedIndex;
		if (selectedIndex != -1 && selectedIndex >= i) { var className = 'selected'; } else { var className = ''; }
		if (className != '') { var separator = ' '; } else { var separator = ''; }
		if (i%2) { var classNamePrefix = 'odd'+separator; } else { var classNamePrefix = 'even'+separator; }
		curElem.className = classNamePrefix + className;
	}
	var textElem = document.getElementById(container.textElemId);
	if (container.selectedIndex > -1) { textElem.innerHTML = gYOUR_RATING; } else { textElem.innerHTML = container.defaultText; }
}

function raterClick()
{
	var container = document.getElementById(this.containerId);
	var elements = container.getElementsByTagName('A');
	var numElements = elements.length;
	for (var i = 0; i < numElements; i++)
	{
		var curElem = elements[i];
		if (i <= this.index) { var className = 'selectedover'; } else { var className = ''; }
		if (className != '') { var separator = ' '; } else { var separator = ''; }
		if (i%2) { var classNamePrefix = 'odd'+separator; } else { var classNamePrefix = 'even'+separator; }
		curElem.className = classNamePrefix + className;
		container.selectedIndex =this.index;		
	}
	var textElem = document.getElementById(container.textElemId);
	
	if (container.selectedIndex != -1) { textElem.innerHTML = gYOUR_RATING; } else { textElem.innerHTML = container.defaultText; }		
	var hiddenField = document.getElementById('rate');
	hiddenField.value = container.labelsValues[container.selectedIndex]['value'];
	
	var thisform = document.getElementById(container.formId);
	thisform.submit();	
	return false;
}