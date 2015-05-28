function printDoc() {
	if(window.print) window.print()
    else alert (tr.pressCltP);
}

function bookmark (url, description){
	if(window.external) window.external.AddFavorite(url,description);
	else alert (tr.pressCtlD);
}

function showFrameContainer (el, container, frame, url, width, height, xOffset, yOffset, busyUrl){
	    if (document.getElementById){
        var e = document.getElementById(el);
        var c = document.getElementById(container);
        var f = document.getElementById(frame);
        if (c.style.display == "block"){
            c.style.display="none";
			return false;
        }
        if (f.src != url) f.src=url;
		// make invisible and set display to block
		// so that we may measure the element
		c.style.visibility = 'hidden';
		c.style.display = 'block';
		var box = getDimensions(e);
		var left = box.x, top = box.y;
		if(xOffset) left += xOffset;
		if(yOffset) top += yOffset;
		if(!width) width = c.offsetWidth;
		var bodywidth = document.getElementById('bodyconstraint').offsetWidth;
		if((left+width) > bodywidth) left = (bodywidth - width - 40);
        c.style.left = left+'px';
        c.style.top = top+'px';
		c.style.visibility = 'visible';
        return false;
    } else {
        window.open(url);
    }
}

function hideFrameContainer (container, frame, busyUrl) {
    if (document.getElementById){
        var c=document.getElementById(container);
        var f=document.getElementById(frame);
        c.style.display="none";
    }
}

function showPhoto (imgSrc, imgCont){
    if (document.getElementById){
        var c = document.getElementById(imgCont);
        if (c.style.display != "block"){
            c.innerHTML = '<img src="' + imgSrc + '">';
        }
		else {
            c.innerHTML = '<img src="' + tr.icons + '/transparent.gif">';
            c.style.display="none";
        }
    }
}

function hideEl(el){
	if (document.getElementById){
        document.getElementById(el).style.display = 'none';
    }
}

function showEl(el){
    if (document.getElementById){
        document.getElementById(el).style.display = 'block';
    }
}


function tickCheckBox(el){
	if (document.getElementById) {
		if (document.getElementById(el)){
			document.getElementById(el).checked=true;
		}
	}
	return true;
}

function openCurrencyConverter(obj, amount, currency) {
    if (document.getElementById) {
        document.getElementById("amount").value = amount;
        document.getElementById("sourceCurrency").value = currency;
		document.getElementById("currencyResults").style.display = 'none';
        positionObj(obj, 'currencyConverter');
		document.getElementById('currencyConverter').style.display = 'block';
    }
}

function calculateCurrency () {
    if (document.getElementById) {
        var a = document.getElementById("amount").value;
        var sc = currencydb[document.getElementById("sourceCurrency").value];
        var sd = currencydb[document.getElementById("destinationCurrency").value];
        var da = Math.round(100 * a * (sd.val / sc.val)) / 100;
        document.getElementById("displayCurrencyResults").innerHTML = sc.symbol +" "+a+" = " + sd.symbol + " " + da;
		document.getElementById('currencyResults').style.display = "block";
        return false;
    }
}

function closeCurrencyConverter() {
    if (document.getElementById) {
        document.getElementById('displayCurrencyResults').innerHTML = "";
		document.getElementById('currencyResults').style.display = "none";
        document.getElementById('currencyConverter').style.display = "none";
        // return false;
    }
}


function showDiv (el, div, alignX, alignY) {
	// (i) popups etc
	if (document.getElementById){
    	var i = document.getElementById(el);
		var c = document.getElementById(div);
        if (c.style.display != "block"){
			
			//var l=0; var t=0;
            //aTag = i;
            //do {
            //    aTag = aTag.offsetParent;
            //    l += aTag.offsetLeft;
            //    t += aTag.offsetTop;
			//} while (aTag.offsetParent && aTag.tagName != 'BODY');
	        //var left =  i.offsetLeft + l;
    	    //var top = i.offsetTop + t + i.offsetHeight + 2;
			var box = getDimensions(i);
			var left = box.x, top = box.y;
			//if (alignX == 'left' && c.style.width){
			//	left = left - parseInt(c.style.width);
			//}
			//if (alignY == 'top' && c.style.height){
			//	top = top - parseInt(c.style.height) -25;
			//}
			c.style.visibility = 'hidden'; // Needed to measure
			c.style.display = "block";     // Needed to measure
			if(alignX == 'left')
				left -= c.offsetWidth;
			else
				left += i.offsetWidth;
			if(alignY == 'top')
				top -= c.offsetHeight;
			else
				top += i.offsetHeight;
			if(top<10)
				top = 10;
			// XXX: Don't know why IE5 needs this here and not for calendar
			if(gClientIsIE5) {
				left += document.body.scrollLeft;
				top += document.body.scrollTop;
			}
        	c.style.left = left+'px';
	        c.style.top = top+'px';
			c.style.visibility = 'visible';
		} else {
			c.style.display="none";
		}
	}
}

function hideDiv (div) {
	if (document.getElementById){
		var c=document.getElementById(div);
		c.style.display="none";
	}
}

var hide  = true;

function positionObj (p, el){
	// calendar
	//alert('positionObj');
	if (document.getElementById){
		var e = document.getElementById(el);
        var bw = getBrowserWidth();

		//var l=0; var t=0;
		//aTag = p;
		//do {
		//	aTag = aTag.offsetParent;
		//	l += aTag.offsetLeft;
		//	t += aTag.offsetTop;
		//} while (aTag.offsetParent && aTag.tagName != 'BODY');
		//var left =  p.offsetLeft + l;
		var box = getDimensions(p);
		var left = box.x, top = box.y;

		// this should be replaced by something generic.
		// for some reason e.style.width is emptly, so
		// i cannot read the width of this element
		// XXX, Hakan: e.style.width is unsafe. Use e.offsetWidth
		// instead, and make sure the element is not set to display: none

		//var width = 300;
		e.style.visibility = 'hidden';
		e.style.display = 'block';
		if ((left + e.offsetWidth) > bw){
			left = (bw - e.offsetWidth - 30);
		}
		var x = document.getElementById('bodyconstraint').offsetLeft;
		left -= x;
		e.style.display = 'none';
		e.style.visibility = 'visible';

		//var top = p.offsetTop + t + p.offsetHeight + 2;
		e.style.left = left+'px';
		e.style.top = top+'px';
	}
}

function getBrowserWidth(){
  var w = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    w = window.innerWidth;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    w = document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    w = document.body.clientWidth;
  }
  return w;
}

function getBrowserHeight(){
  var h = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    h = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    h = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    h = document.body.clientHeight;
  }
  return h;
}

function showBlock(el){
	if (document.getElementById) {
		document.getElementById(el).style.display = 'block';
	}
}

function displayArrow(ulist, image) {
    var ulBlock = document.getElementById(ulist);
    var ulBlockDisplay = ulBlock.style.display;
    var arrowImg = document.getElementById(image);
    if (ulBlockDisplay == "none") {
        arrowImg.style.backgroundPosition = "0 -11px";
    }
    else {
        arrowImg.style.backgroundPosition = "left top";
    }
}
function toggleTxt(ulist, spanAll, spanTop) {
    var ulBlock = document.getElementById(ulist);
    var ulBlockDisplay = ulBlock.style.display;
    var txtAll = document.getElementById(spanAll);
    var txtTop = document.getElementById(spanTop);
    if (ulBlockDisplay == "none") {
        txtAll.style.display = "none";
        txtTop.style.display = "inline";
    }
    else {
        txtAll.style.display = "inline";
        txtTop.style.display = "none";
    }
}

function sSc(q, bar, score){
    if (document.getElementById){
        document.getElementById('rbar_'+q).style.backgroundPosition= bar + 'px 0';
        document.getElementById('rsc_' + q).innerHTML=score;
    }
}
function sSc2(nr, el){
    if (document.getElementById){
        document.getElementById('rnr').innerHTML=nr;
        for ( var i = -1; i < 10; i++ ) {
            var l = document.getElementById('rl' + i);
            if (l) {
                l.style.color='';
                l.style.textDecoration='underline';
            }
        }
        el.style.color='#003580';
        el.style.textDecoration='none';
        el.blur();
    }
}

function fixBanner() {
}


// Getting element dimensions
function getDimensions( elm ) {
	var box = { x:0, y:0, w:0, h:0 };
	if(document.getBoxObjectFor) {
		var boxRef = document.getBoxObjectFor(elm);
		box.x = boxRef.x;
		box.y = boxRef.y;
		box.w = boxRef.width;
		box.h = boxRef.height;
	}
	else if(elm.getBoundingClientRect) {
		var rxIE50 = /MSIE 5\.0/g;
		//alert(rxIE50 + '.test("' + navigator.appVersion + '" = ' + rxIE50.test(navigator.appVersion));
		var boxRef = elm.getBoundingClientRect();
		box.x = boxRef.left;
		box.y = boxRef.top;
		box.w = (boxRef.right - boxRef.left);
		box.h = (boxRef.bottom - boxRef.top);
		//var s='';for(p in boxRef) s+=p+'    '; alert(s);
		// Damn IE...
		if(document.compatMode && document.compatMode != 'BackCompat') {
			// IE6/compliance mode
			box.x += document.documentElement.scrollLeft - 2;
			box.y += document.documentElement.scrollTop - 2;
		}
		else if(!gClientIsIE5) {
			// IE5.5
			box.x += document.body.scrollLeft - 2;
			box.y += document.body.scrollTop - 2;
		}
	}
	else {
		// No known box information available, walking
		// manually through offsetParents to calculate x/y coordinates
		box.w = elm.offsetWidth;
		box.h = elm.offsetHeight;
		while(elm) {
			box.x += elm.offsetLeft;
			box.y += elm.offsetTop;
			if(elm.offsetParent) // Required for Safari 1.3 :(
				elm = elm.offsetParent;
			else
				break;
		}
	}
	var cc;
	if(cc = document.getElementById('bodyconstraint'))
		box.x -= cc.offsetLeft;
	return box;
}


// Basic event handling
function addListener( elm, event, handler ) {
	if(elm.addEventListener)
		elm.addEventListener(event, handler, false);
	else if(elm.attachEvent)
		elm.attachEvent('on'+event, handler);
	else
		elm['on'+event] = handler;
}

function removeListener( elm, event, handler ) {
	if(elm.removeEventListener)
		elm.removeEventListener(event, handler, false);
	else if(elm.detachEvent)
		elm.detachEvent('on'+event, handler);
}

var DOM = {
	isParentOf: function( parentElm, contextElm) {
		while(contextElm && (contextElm != parentElm))
			contextElm = contextElm.parentNode;
		return (contextElm == parentElm);
	},
	getParentOrSelf: function( contextElm, nodeName ) {
		nodeName = nodeName.toLowerCase();
		while(contextElm.nodeName.toLowerCase() != nodeName && contextElm.parentNode)
			contextElm = contextElm.parentNode;
		return contextElm;
	},
	addClass: function( elm, className ) {
		elm.className += ' '+className;
	},
	removeClass: function( elm, className) {
		var classMatch = new RegExp('\\b'+className+'\\b', 'g');
		if(classMatch.test(elm.className))
			elm.className = elm.className.replace(classMatch, ' ');
	}	
};

var gClientIsGecko = (window.controllers) ? true : false;
var gClientIsOpera = (window.opera) ? true : false;
var gClientIsIE    = (document.all && !gClientIsOpera) ? true : false;
var gClientIsIE5   = (gClientIsIE && /MSIE 5\.0/.test(navigator.appVersion)) ? true : false;
var gClientIsMac   = (/Mac/.test(navigator.appVersion)) ? true : false;
//var gClientIsOk    = //???
// Onload function
function _init() {
	//alert(gClientIsIE5);
  fixMail();
	if(window.initDaySelect)
		initDaySelect();
}
//window.onload = _init;
addListener(window, 'load', _init);


String.prototype.deCode = function() {
	return this.replace(/[a-zA-Z]/g, function(c){
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
	});
};
function fixMail() {
  var classMatch = /\bencrypted\b/;
  var mailMatch = /^mailto:(.*)$/;
  var links = document.getElementsByTagName('a');
  for(var i = 0, j = links.length; i < j; i++) {
    if(classMatch.test(links[i].className) && mailMatch.test(links[i].href)) {
      links[i].className = links[i].className.replace(classMatch, '');
      var address = mailMatch.exec(links[i].href)[1];
      var text = links[i].innerText || links[i].textContent;
      links[i].href = 'mailto:' + address.deCode();
      if(text == address)
        links[i].innerHTML = text.deCode();
    }
  }
  var spans = document.getElementsByTagName('span');
  for(var i = 0, j = spans.length; i < j; i++) {
    if(classMatch.test(spans[i].className)) {
      spans[i].className = spans[i].className.replace(classMatch, '');
      var text = spans[i].innerText || spans[i].textContent;
      spans[i].innerHTML = text.deCode();
    }
  }
}



// Array functions for IE5
if(!Array.prototype.pop) {
	Array.prototype.pop = function() {
		var item;
		if (this.length > 0) {
			item = this[this.length-1];
			this.length--;
		}
		return item;
	};
}

if(!Array.prototype.push) {
	Array.prototype.push = function() {
		var start = this.length;
		for (var i = 0; i < arguments.length; i++)
			this[start + i] = arguments[i];
		return this.length;
	};
}

if(!Array.prototype.shift) {
	Array.prototype.shift = function() {
		var item = this[0];
		if (item)
			this.splice(0,1);
		return item;
	};
}

if(!Array.prototype.unshift) {
	Array.prototype.unshift = function() {
		this.reverse();
		for(var i=arguments.length-1;i>=0;i--)
			this[this.length]=arguments[i];
		this.reverse();
		return this.length;
	};
}

// Number functions for IE5
if(!Number.prototype.toFixed) {
	Number.prototype.toFixed = function( dc ) {
		dc = (typeof(dc)=='number') ? dc : 0;
		return eval('Math.round(this * 1e' + dc + ') / 1e' + dc);
	};
}

