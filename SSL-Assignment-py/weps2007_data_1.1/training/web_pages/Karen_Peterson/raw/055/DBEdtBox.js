function editDef(name,col,row,onChange,onBlur,onFocus,onSelect) {
	this.name = name;
	this.type = "Form Element";
	this.col = col;
	this.row = row;
	this.onChange = onChange;
	this.onBlur = onBlur;
	this.onFocus = onFocus;
	this.onSelect = onSelect;
	this.blur = EBBlur;
	this.focus = EBFocus;
	this.select = EBSelect;
	this.clear = EBClear;
	this.getText = EBGetText;
	this.setText = EBSetText;
	this.setTextWithNewLines = DBSTWN;
	this.appendText = EBAT;
	this.getElementID = getElementID;
	this.elementResolved = elementResolved;
	this.elementID = null;
}

function DBSTWN(Text) {
	if (this.row == 1) {
		this.setText(Text);
		return;
	}
	var tmp = Text.split(' ');
	var c = 0;
	for (var i = 0; i < tmp.length; i++) {
		if (tmp[i] != '' && tmp[i].indexOf('\n') != -1) {
			c += (tmp[i].length + 1);
			if (c > this.col + 2) {
				if (tmp[i].charAt[0] != '\n') tmp[i] = '\n' + tmp[i];
			}			
			c = tmp[i].length - tmp[i].indexOf('\n') + 1;
		} else {
			c += (tmp[i].length + 1);
			if (c > (this.col + 2)) {
				if (tmp[i].charAt[0] != '\n') tmp[i] = '\n' + tmp[i];
				c = tmp[i].length + 1;
			}
		}
	}
	this.setText(tmp.join(' '));
}

function EBSelect() {
	if (this.elementResolved()) {
 		this.elementID.select();
		this.elementID.focus();
	}
}

function EBBlur() { if (this.elementResolved()) this.elementID.blur(); }
function EBFocus() { if (this.elementResolved()) this.elementID.focus(); }
function EBClear() { if (this.elementResolved()) this.elementID.value = ''; }
function EBGetText() { return (this.elementResolved() ? this.elementID.value : ""); }
function EBSetText(Text) { if (this.elementResolved()) this.elementID.value = Text; }
function EBAT(Text) { if (this.elementResolved()) this.elementID.value += Text; }

