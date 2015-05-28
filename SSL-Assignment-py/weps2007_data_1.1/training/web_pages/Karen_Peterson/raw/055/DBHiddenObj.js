function HiddenDef(name) {
	this.name = name;
	this.type = "Form Element";
	this.clear = HDClear;
	this.getText = HDGetText;
	this.setText = HDSetText;
	this.getElementID = getElementID;
	this.elementResolved = elementResolved;
	this.elementID = null;
}

function HDClear() { if (this.elementResolved()) this.elementID.value = ''; }
function HDGetText() { return (this.elementResolved() ? this.elementID.value : ""); }
function HDSetText(Text) {if (this.elementResolved()) this.elementID.value = Text;}

