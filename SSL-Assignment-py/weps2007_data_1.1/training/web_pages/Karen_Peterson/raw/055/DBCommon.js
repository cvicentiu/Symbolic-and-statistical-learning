function getProp(p) { if (this.elementResolved()) return this.elementID[p]; }
function setProp(p,v) { if (this.elementResolved()) this.elementID[p] = v; }

function getElementID() {
	with (this) {
		var val = "";
		if (type != "Radio") {
			if (document.all)
				elementID = eval("document.all." + name);
			else
				elementID = eval("document." + name);
		}
		else val = value;

		if (elementID == null) {
			elementID = resolveElementInDoc(document, name, type, val);

			if (elementID == null && navigator.appName.indexOf('Microsoft') >= 0) elementID = eval(name);
			if (elementID == null && type != "Plug-In") alert("Could not resolve elementID for " + name + " (" + type + ")");
		}
	}
}

function elementResolved() {
	if (this.elementID == null) this.getElementID();
	return (this.elementID != null);
}

function resolveElementInDoc(doc, name, type, value) {
	elementID = null;
	if (type == "Image" && doc.images) {
		for (var i=0; i < doc.images.length; i++) {
			if (doc.images[i] && doc.images[i].name == name) {
				elementID = doc.images[i];
				return elementID;
			}
		}
	}
	else if (type == "Form")
		elementID = eval("doc." + name);
	else if (type == "Applet")
		elementID = eval("doc.applets." + name);
	else if (type == "Plug-In")
		elementID = eval("doc.embeds." + name);

	if (elementID == null &&
		doc.forms && doc.forms[0] && doc.forms[0].elements) {
		for (var i = 0; i < doc.forms[0].elements.length; i++) {
			if (doc.forms[0].elements[i] && (doc.forms[0].elements[i].name == name) && (type != "Radio" || doc.forms[0].elements[i].value == value)) {
				elementID = doc.forms[0].elements[i];
				return elementID;
			}
		}
	}

	if (elementID == null && doc.layers) {
		for (var i=0; elementID == null && i < doc.layers.length; i++) {
			if (doc.layers[i])
				elementID = resolveElementInDoc(doc.layers[i].document, name, type, value);
		}
	}

	return elementID;
}

function replaceAwithBinC(a,b,c) {
	var i = c.indexOf(a);
	var l = b.length;
	while (i != -1)	{
		c = c.substring(0,i) + b + c.substring(i + a.length,c.length);
		i = c.indexOf(a,i);
	}
	return c;
}

function trace(theString) {
	var System = java.lang.System;
	System.out.println(theString);
}

function dumpProperties(Obj, ObjName) {
	var result = "";
	for (var i in Obj)
		result += ObjName + "." + i + " = " + Obj[i] + "\n";
	return result;
}

function nullFunc() {}

