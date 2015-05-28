// dadaIMC: $Id: ajaxdom.js,v 1.4 2006/04/10 15:41:17 spud Exp $
// license: GNU LGPL
// copyright 2001-2004: dada typo and contributors

// <![CDATA[

// XMLHTTP Request stuff
if ((!document.all)&&(document.getElementById)) {
	IEhacks = false;
} else {
	IEhacks = true;
}
function get_XMLHttpReq() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		try {
			httpObj = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			httpObj = new ActiveXObject("Microsoft.XMLHTTP");
		}
	} else {
		httpObj = new XMLHttpRequest();
	}
	return httpObj;
}
function sndUserCheck(username) {
	if (username != "") {
		uhttp = new get_XMLHttpReq();
		uhttp.open('get', '<? echo $g_url; ?>rpc_reference.php?username='+username);
		uhttp.onreadystatechange = useralert;
		uhttp.send(null);
	}
}
function useralert() {
	var userfield = getObjectRef(document,'form_newusername');
    if (uhttp.readyState == 4) {
        var response = uhttp.responseText;
        if (response == 'true') {
        	window.alert("<? echo _('That username is already in use by a registered account. Please select another.'); ?>");
        	userfield.focus();
        }
    }
	return false;
}
function sndArbitraryUserCheck(fieldobj,username,menu) {
	aufieldobj = fieldobj;
	aumenu = menu;
	if (username != "") {
		auhttp = new get_XMLHttpReq();
		auhttp.open('get', '<? echo $g_url; ?>rpc_reference.php?name='+username);
		auhttp.onreadystatechange = arbitraryuseralert;
		auhttp.send(null);
	}
}
function arbitraryuseralert() {
	var menuobj = getObjectRef(document,aumenu);
    if (auhttp.readyState == 4) {
        var response = auhttp.responseText;
        if (response == 'true') {
        	window.alert("<? echo _('That username is already in use by a registered account. Please select another.'); ?>");
        	aufieldobj.focus();
        } else {
        	menuobj.selectedIndex = 0;
        }
    }
	return false;
}

// DOM SCRIPTING SHORTCUTS
function createNamedElement(type, name) {
	var elem = null;
	// First try the IE way; if this fails then use the standard way
	try {
		elem = document.createElement('<'+type+' name="'+name+'">');
	} catch (e) {
		// Probably failed because we're not running on IE
	}
	if (!elem || !elem.name) {
		elem = document.createElement(type);
		elem.setAttribute('name',name);
	}
	return elem;
}
function DOM_Img(src,alt,id,title,onclick,onmouseover,onmouseout) {
	var elem = document.createElement('img');
	elem.setAttribute('src',src);
	if (alt == '') {
		altarr = src.split();
		altarr.pop();
		alt = altarr.pop();
	}
	elem.setAttribute('alt',alt);
	if (id) elem.setAttribute('id',id);
	if (onclick) {
		if (IEhacks){
			elem['onclick'] = new Function(onclick);
		} else {
			elem.setAttribute('onclick',onclick);
		}
	}
	if (onmouseover) {
		if (IEhacks){
			elem['onmouseover'] = new Function(onmouseover);
		} else {
			elem.setAttribute('onmouseover',onmouseover);
		}
	}
	if (onmouseout) {
		if (IEhacks){
			elem['onmouseout'] = new Function(onmouseout);
		} else {
			elem.setAttribute('onmouseout',onmouseout);
		}
	}
	return elem;
}
function DOM_Div(id,classname,style) {
	var elem = document.createElement('div');
	if (id) elem.setAttribute('id',id);
	if (classname) {
		elem.setAttribute('class',classname);
		elem.className = classname;
	}
	if (style) elem.setAttribute('style',style);
	return elem;
}
function DOM_Atag(href,child,onclick,name,id,title) {
	var elem = document.createElement('a');
	elem.setAttribute('href',href);
	if (onclick) {
		if (IEhacks){
			elem['onclick'] = new Function(onclick);
		} else {
			elem.setAttribute('onclick',onclick);
		}
	}
	if (typeof child == 'string') {
		elem.appendChild(document.createTextNode(child));
	} else {
		elem.appendChild(child);
	}
	if (name) elem.setAttribute('name',name);
	if (id) elem.setAttribute('id',id);
	if (title) elem.setAttribute('title',title);
	return elem;
}
function DOM_InputField(type,name,id,value,length,max,onchange) {
	var elem = createNamedElement('input',name);
	elem.setAttribute('type',type);
	elem.setAttribute('id',id);
	elem.setAttribute('value',value);
	if (length) elem.setAttribute('size',length);
	if (max) elem.setAttribute('maxlength',max);
	if (onchange) {
		if (IEhacks){
			elem['onchange'] = new Function(onchange);
		} else {
			elem.setAttribute('onchange',onchange);
		}
	}
	return elem;
}
function DOM_TextArea(name,id,rows,cols,value) {
	var elem = createNamedElement('textarea',name);
	elem.setAttribute('id',id);
	elem.setAttribute('rows',rows);
	elem.setAttribute('cols',cols);
	elem.appendChild(document.createTextNode(value));
	return elem;
}
function DOM_RadioCheckbox(type,name,id,value,label,checked) {
	var labelelem = document.createElement('label');
	labelelem.setAttribute('for',id);
	var elem = createNamedElement('input',name);
	elem.setAttribute('type',type);
	elem.setAttribute('id',id);
	elem.setAttribute('value',value);
	if (checked) {
		elem.setAttribute('checked',true);
	}
	labelelem.appendChild(elem);
	labelelem.appendChild(document.createTextNode(' '+label));
	return labelelem;
}
function DOM_SelectMenu(name,id,multiple,size) {
	var elem = createNamedElement('select',name);
	var elem = document.createElement('select');
	elem.setAttribute('id',id);
	if (multiple) {
		elem.setAttribute('checked','multiple');
		elem.setAttribute('size',size);
	}
	return elem;
}
function DOM_SelectOption(id,value,label,selected) {
	var elem = document.createElement('option');
	elem.setAttribute('id',id);
	elem.setAttribute('value',value);
	elem.setAttribute('selected',selected);
	elem.appendChild(document.createTextNode(label));
	return elem;
}
function DOM_ShowHideTR(obj,sh) {
	obj = getObjectRef(document,obj);
	if (sh == 'hide') {
		obj.style.display = 'none';
	} else {
		if (IEhacks) {
			obj.style.display = 'block';
		} else {
			obj.style.display = 'table-row';
		}
	}
	return false;
}
function DOM_ShowHideTBODY(obj,sh) {
	obj = getObjectRef(document,obj);
	if (sh == 'hide') {
		obj.style.display = 'none';
	} else {
		if (IEhacks) {
			obj.style.display = 'block';
		} else {
			obj.style.display = 'table-row-group';
		}
	}
	return false;
}
// ]]>