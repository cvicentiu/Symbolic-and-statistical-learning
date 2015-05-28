function checkToggles() {

	/* set filter statuses such that it will maintain previous state upon a refresh */

	for(i=0;i<filter.length;i++) {
		// this method works in both IE and FF, provided id and name attributes are both defined
		fieldname = filterNames[i];
		thefield = "document.advancedform."+fieldname+".checked";
		if(eval(thefield)==false) {
			filter[i]=1;
		}
	}
	
}

function checkTogglePanels(){
	if(typeof(hints)!='undefined') {
		for(i=0;i<hints.length;i++) {
			if(hints[i]==1) { // pre-activated from last refresh
				document.getElementById('panel_'+i).style.display = 'block';
			}
		}
	}	
}

function changeFilter(thefilter,elements) {

	fields = new Array();
	fields = elements.split(",");
	
	if(filter[thefilter]==0) { /* if off, turn on */
		for(i=0;i<fields.length;i++) {
			//document.advancedform.eval(fields[i]).disabled = false;
			document.getElementById(fields[i]).disabled = false;
		}
		filter[thefilter] = 1;
		return;
	}
	
	if(filter[thefilter]==1) { /* if on, turn off */
		for(i=0;i<fields.length;i++) {
			//document.advancedform.eval(fields[i]).disabled = true;
			document.getElementById(fields[i]).disabled = true;
			
		}
		filter[thefilter] = 0;
		return;
	}
		
}

function hoverOn(element){

	document.getElementById(element).style.backgroundColor = "#aaa";

}

function hoverOut(element,orig){

	document.getElementById(element).style.backgroundColor = orig;

}

function togglePanel(hintKey) {

	if(hints[hintKey]==0) { // if hint off, turn on
		document.getElementById('panel_'+hintKey).style.display = 'block';
		hints[hintKey]=1;
	} else if(hints[hintKey]==1) { // if hint on, turn off
		document.getElementById('panel_'+hintKey).style.display = 'none';
		hints[hintKey]=0;
	}
	

}

function linkResult(url) {
	
	location.href = url;
	
}

/* prevent IE from submitting the form on ENTER, since this causes problems */
function noenter() {
  return !(window.event && window.event.keyCode == 13);
}

function addTo(user /* username or text to fill a field with*/,fieldname /* name/id for the new field*/,appendWhere /* element to append the new field to */){

	// used for fields with same name that will be processed by PHP or PERL. Need to modify to use with both PHP and JS processing
	// because JS must have incrementally numbered fields so IE can run thru them and populate the array to send to xmlhttp
	// will work on this later; for now, xmlhttp forms we will use addElement() below

	newTo = document.createElement('input');
	if(fieldname=="username") {
		newTo.setAttribute('name',fieldname);
	} else {
		newTo.setAttribute('name',fieldname+'_'+i);
	}
	newTo.setAttribute('id',fieldname+'_'+i);	
	newXdiv = document.createElement('div');
	newXdiv.setAttribute('id','newXdiv'+i);	
	newXdiv.innerHTML = '<a href="javascript: removeTo('+i+',\''+fieldname+'\',\''+appendWhere+'\');" alt="Remove this recipient" title="Remove ths recipient" style="color: red;">[x]</a> ';	

	if(typeof(user)!='undefined' && user!='') {
		newTo.setAttribute('type','hidden');
		newTo.setAttribute('value',user);
		newXdiv.innerHTML += user;
	}
	newTo.style.margin = '5px';
	theForm = document.getElementById(appendWhere);
	theForm.appendChild(newXdiv);
	theForm.appendChild(newTo);
	newTo.setFocus;

	i++;

}

function removeTo(num,fieldname,appendWhere) {

	var theForm = document.getElementById(appendWhere);
	varname = document.getElementById(fieldname+'_'+num);
	theForm.removeChild(varname);
	divname = 'newXdiv'+num;
	divname = document.getElementById(divname);
	theForm.removeChild(divname);

}

function showme() {

	theFormAgain = document.getElementById('theMsgForm');
	alert(document.forms['theMsgForm'].username[1].value);

}



function emailsArray(){

	document.getElementById('emailButton').disabled = true;

	// create array to contain all the emails submitted
	theEmails = new Array();
	// grab the element containing all the fields in question
	parentObj = document.getElementById('toFields');
	// get the nodes aka the different INPUT elements
	nodes = parentObj.childNodes;
	// cycle through nodes, looking for INPUT elements
	for(i=0;i<nodes.length;i++){
		if(nodes[i].nodeName=='INPUT') {
			//alert(nodes[i].nodeName);
			// get the attributes of each INPUT element
			atts = nodes[i].attributes;
			// cycle through the attributes to get the name of each INPUT
			for(k=0;k<atts.length;k++){
				if(atts[k].name=='name') {
					// add the value of each INPUT to theEmails array
					theEmails.push(atts[k].value);
				}
			}
		}
	}

	// create empty str for the emails
	emailsstr = '';
	// cycle through and popular the str from theEmails arr
	for(i=0;i<theEmails.length;i++){
		// this method works in both IE and FF, provided id and name attributes are both defined
		var thisfield = theEmails[i];
		var thefield = 'document.theMailForm.'+thisfield+'.value';
		emailsstr += eval(thefield);
		if(i<theEmails.length-1) {
			emailsstr += ',';
		}
		
	}

	var postvars = 'theEmails='+emailsstr+'&';
	postvars += buildPOST('theMailForm');

	xmlhttpcall('/phpinc/class/EmailFriend/xmlhttp.php?what=addToQueue' /* script url */,"emailResponse('mailMsg','responseText')" /* responsefcn */,postvars /* POST var str */);

	//alert(emailsstr);

}


function customize(){

	var theText = document.forms['theCustomForm'].customText.value;
	//alert(theText.length);
	if(theText.length>87) {
		alert('You must enter a shorter phrase, idiot!!');
		return;
	} else if(theText.length<3) {
		alert('You\'ve gotta enter at least a three letter word to make a custom game!');
		return;
	}

	document.getElementById('customButton').disabled = true;

	var postvars = buildPOST('theCustomForm');

	xmlhttpcall('/phpinc/class/Games/xmlhttp.php?what=createCustomGame' /* script url */,"emailResponse('customMsg','responseXML')" /* responsefcn */,postvars /* POST var str */);

}

function buildPOST(theFormName) {
    theForm = document.forms[theFormName];
    var qs = '';
    for (e=0;e<theForm.elements.length;e++) {
        if (theForm.elements[e].id!='' && theForm.elements[e].id!='undefined') {
            var id = theForm.elements[e].id;
            qs+=(qs=='')?'':'&'
            qs+= id+'='+escape(theForm.elements[e].value);
        }
    }
    qs+="\n";
   return qs;
} 


function chkValue(element,value) {
	/* this fcn is for toggling a checkbox value to be sent in JS xmlhttp
	form using buildPOST() which always pulls the current value, thus 
	the need to change it in the client when clicked or you always get the default value. */	
	if(value==1) {
		element.value = 0;
	} else {
		element.value = 1;
	}
}

function preChecked(element) {
	/*  this fcn checks to see if an element is checked already and changes the 
	value in the client accordingly for use with xmlhttp submitted forms */
	if(element.checked==true) {
		chkValue(element,0);
	}

}

function loadXMLDoc(url, callback) {
	req = false;
    // branch for native XMLHttpRequest object
    if(window.XMLHttpRequest) {
    	try {
			req = new XMLHttpRequest();
        } catch(e) {
			req = false;
        }
    // branch for IE/Windows ActiveX version
    } else if(window.ActiveXObject) {
       	try {
        	req = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		req = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		req = false;
        	}
	}
    }
	if(req) {
		//req.callback = callback;
		req.onreadystatechange = processReqChange;
		req.open("POST", url, true);
		req.send("");
	}
}


function processReqChange() {
    // only if req shows "loaded"
	if (req.readyState == 4) {
		// only if "OK"
		if (req.status == 200) {
			// ...processing statements go here...
			// alert(req.responseText);
			//req.callback();
		} else {
			alert("There was a problem retrieving the XML data:\n" +
			req.statusText);
		}
	}
}


function xmlhttpcall(url,responsefcn,postvars) {

	xmlhttp=false;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
	// JScript gives us Conditional compilation, we can cope with old IE versions.
	// and security blocked creation of the objects.
	 try {
	  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	 } catch (e) {
	  try {
	   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (E) {
	   xmlhttp = false;
	  }
	 }
	@end @*/
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	  xmlhttp = new XMLHttpRequest();
	}

	 xmlhttp.open("POST",url,true);
 	 xmlhttp.setRequestHeader('content-type','application/x-www-form-urlencoded');
	 xmlhttp.send(postvars);
	 xmlhttp.onreadystatechange=function() {
	  if (xmlhttp.readyState==4) {

eval(responsefcn);
	  }
	 }
	 //xmlhttp.send(null)

}			

function emailResponse(elementname,responseType) {

	msgbox = document.getElementById(elementname);

	//msgbox.innerHTML = xmlhttp.responseText;
	//alert(xmlhttp.responseText);
	//return;
	
	switch(responseType) {
		
		case 'responseText':
	
			document.getElementById('emailButton').disabled = false;
	
			switch(xmlhttp.responseText) {
				
			/* cases for email to friend */
				case 'success':
				msgbox.innerHTML = 'Thanks for spreading the word, we\'ll be sending your e-mail(s) shortly! You may use the form to send more links if you wish.';
				break;
				case 'bademail':
				msgbox.innerHTML = 'One of the e-mail addresses you provided was not in the proper format. (e.g. user@domain.com)';
				break;
				case 'badhost':
				msgbox.innerHTML = 'One of the e-mail addressed you provided does not have a valid domain hostname.';
				break;
				case 'blankemail':
				msgbox.innerHTML = 'You must submit at least one valid e-mail address.';
				break;
				
			};
			
		break;
		
		case 'responseXML':

			document.getElementById('customButton').disabled = false;

			var ajaxNodes = xmlhttp.responseXML;
			var nodeineed = ajaxNodes.getElementsByTagName("url");
			var gameUrl = nodeineed[0].firstChild.nodeValue;
			msgbox.innerHTML = "Use <a style=\"color: red; text-decoration: underline;\" href=\""+gameUrl+"\" target=\"top\">this link</a> to get to your custom game, or <a style=\"color: red;\" href=\"javascript: pasteTxt('msg','Check out my custom game! \n"+gameUrl+"');\" alt=\"Paste a link to your custom game into the e-mail to friend box\" title=\"Paste a link to your custom game into the e-mail to friend box\">paste it into the e-mail box</a> to send to friends! If your game doesn't immediately appear, try refreshing <a style=\"color: red; text-decoration: underline;\" href=\""+gameUrl+"\" target=\"top\">the page</a>. It takes a few seconds for new games to become active.";
		
		break;
	
	};

}

function pasteTxt(element,str){
	
	pasteto = document.getElementById(element);
	pasteto.value += "\n"+str;
	
}

function popNewWindow(w,h,url) {
	window.open(url,"newwindow","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+w+", height="+h+", left=150, top=150");
}

function prePopulate(field, formValue, formName) {
	for(m = 0; m < field.length; m++) {
		
		if(document.getElementById(field[m]).type == "radio") {
			var temp = field[m]
			var radioButtons = document.forms[formName].elements[temp];
			
			for (a = 0; a < radioButtons.length; a++) {
				if(radioButtons[a].value == formValue[m])	{
					radioButtons[a].checked = true;
				}
			}
			
		} else if (document.getElementById(field[m]).type == "checkbox") {
			var temp = field[m];
			var checkbox = document.forms[0].elements[temp]
			
			if (formValue[m] != "") {
				checkbox.checked = true;
			}
		} else {
			document.getElementById(field[m]).value = formValue[m];	
		}
	
	//alert(field[m] + ": " + document.getElementById(field[m]).type)
	}
}


function disableButton(e) {
	if (!e) var e = window.event;
	var tg = (e.target) ? e.target : e.srcElement;
	//alert('foo');
	tg.onclick = function() {return false;};
}

function addTag(e) {
	if (!e) var e = window.event;
	var tg = (e.target) ? e.target : e.srcElement;

	var tags = document.getElementById('tags');
	tags.value += " " + tg.firstChild.nodeValue;

	// call the checkTagMax function
	if (!checkTagMax()) {
		return false;
	}
	

	// remove the tag from the list
	tg.style.display = 'none';


	return false;
}

function deleteTag(e) {
	if (!e) var e = window.event;
	var tg = (e.target) ? e.target : e.srcElement;
	
	if (tagCount == 1) {
		alert('Sorry, you must have at least one tag per post.');
		return false;
	}
	
	if (confirm('Delete this tag now?')) {
		
		// send the delete command
		var url = "/phpinc/class/Tags/Tags.ajax.php?cmd=delete&hash_id=";
		url += tg.id;
		loadXMLDoc(url, deleteTagCallback);
		

		// remove the tag
		tg.parentNode.style.display = 'none';
		tagCount--;
	}

	return false;
}

function checkTagMax(e) {
	var tags = document.getElementById('tags');

	var tagsArr = tags.value.split(' ');
	var trimmedTagsArr = Array();
	for (var i = 0; i < tagsArr.length; i++) {
		if (tagsArr[i].length > 0) {
			//alert(tagsArr[i]);
			trimmedTagsArr.push(tagsArr[i]);
		}
	}
	if ((trimmedTagsArr.length + tagCount) > 10) {
		alert("Sorry, there is a max of 10 tags per item.");
		// and then we do stuff to take the excess tags off the list
		// knock off the last value
		while ((trimmedTagsArr.length + tagCount) > 10) {
			trimmedTagsArr.pop();
		}
		tags.value = trimmedTagsArr.join(' ');
		return false;	
	}
	
	return true;

}

function deleteTagCallback() {
	
	// redraw the itemTags list
	//itemTagsRedraw();
	return false;
}

function selectTextarea(e) {
	document.getElementById(e).focus(); 
	document.getElementById(e).select(); 
}

function popNewWindow2(w,h,url) {

            window.open(url,"newwindow","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width="+w+", height="+h+", left=150, top=150");

}

function TrimString(sInString) {
  sInString = sInString.replace( /^\s+/g, "" );// strip leading
  return sInString.replace( /\s+$/g, "" );// strip trailing
}
