function formDef(name,onSubmit,onReset) {
	this.name = name;
	this.type = "Form";
	this.onSubmit = onSubmit;
	this.onReset = onReset;
	this.submit = fmS;
	this.reset = fmR;
	this.getAction = fmGA;
	this.setAction = fmSA;
	this.getEnctype = fmGE;
	this.setEnctype = fmSE;
	this.getLanguage = fmGL;
	this.setLanguage = fmSL;
	this.getMethod = fmGM;
	this.setMethod = fmSM;
	this.getStyle = fmGS;
	this.setStyle = fmSS;
	this.getTarget = fmGTa;
	this.setTarget = fmSTa;
	this.getTitle = fmGTi;
	this.setTitle = fmSTi;
	this.getElementID = getElementID;
	this.elementResolved = elementResolved;
	this.elementID = null;
}

function fmR() { return (this.elementResolved() ? this.elementID.reset() : false); }
function fmS() { return (this.elementResolved() ? this.elementID.submit() : false); }
function fmGA() { return (this.elementResolved() ? this.elementID.action : ""); }
function fmGE() { return (this.elementResolved() ? this.elementID.enctype : ""); }
function fmGL() { return (this.elementResolved() ? this.elementID.language : ""); }
function fmGM() { return (this.elementResolved() ? this.elementID.method : ""); }
function fmGS() { return (this.elementResolved() ? this.elementID.style : ""); }
function fmGTa() { return (this.elementResolved() ? this.elementID.target : ""); }
function fmGTi() { return (this.elementResolved() ? this.elementID.title : ""); }
function fmSA(v) { if (this.elementResolved()) this.elementID.action = v; }
function fmSE(v) { if (this.elementResolved()) this.elementID.enctype = v; }
function fmSL(v) { if (this.elementResolved()) this.elementID.language = v; }
function fmSM(v) { if (this.elementResolved()) this.elementID.method = v; }
function fmSS(v) { if (this.elementResolved()) this.elementID.style = v; }
function fmSTa(v) { if (this.elementResolved()) this.elementID.target = v; }
function fmSTi(v) { if (this.elementResolved()) this.elementID.title = v; }

