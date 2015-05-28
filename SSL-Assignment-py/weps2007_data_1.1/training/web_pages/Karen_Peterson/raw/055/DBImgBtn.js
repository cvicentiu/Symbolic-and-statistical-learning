BTNArray = new Array();

function makeButton(theImages,href,name,prodName,group,onClick,onMOver,onMOut,onMUp,onMDown) {
	this.setImageList = BtnSIL;
	this.getImageCount = BtnGIC;
	this.nextImage = BtnNI;
	this.previousImage = BtnPI;

	this.getImageList = getImageList;
	this.getGroupCount = getGroupCount;
	this.clearGroup = clearGroup;
	this.mouseOver = mouseOver;
	this.mouseOut = mouseOut;
	this.setState = setState;
	this.getState = getState;
	this.setIndex = setState;
	this.getIndex = getState;
	this.setClicked = setClicked;
	this.setUnclicked = setUnclicked;

	this.onChange = null;
	this.onClick = onClick;
	this.onMouseOver = onMOver;
	this.onMouseOut = onMOut;
	this.onMouseUp = onMUp;
	this.onMouseDown = onMDown;

	this.name = name;
	this.type = "Image";
	this.state = 0;
	this.group = group;

	this.imagelist = new Array();      // image names
	this.btnImageArray = new Array();  // image objects
	this.setImageList(theImages);

	this.getElementID = getElementID;
	this.elementResolved = elementResolved;
	this.elementID = null;
}

function BtnGIC() {
	if (!this.elementResolved()) return -1;
	return this.btnImageArray.length;
}

function BtnNI() {
	with(this) {
		if (!this.elementResolved()) return;
		state = parseInt(state);
		if (state == getImageCount()-1)
			state = 0;
		else
			state += 1;

		elementID.src = imagelist[state];
	}
}

function BtnPI() {
	with(this) {
		if (!this.elementResolved()) return;
		state = parseInt(state);
		if (state == 0)
			state = getImageCount()-1;
		else
			state -= 1;

		elementID.src = imagelist[state];
	}
}

function BtnSIL(theImages) {
	with(this) {
		imagelist = theImages.split(",");
		for (var i = 0; i < imagelist.length; i++) {
			this.btnImageArray[i] = new Image();
			this.btnImageArray[i].src = imagelist[i];
		}
	}
}

function getImageList() {
	if (!this.elementResolved()) return "";
	return this.imagelist.join();
}

function getGroupCount() {
	if (!this.elementResolved()) return -1;
	var k = 0;
	for (i = 0; i < BTNArray.length; i++) {
		if (this.group == BTNArray[i].group) k++;
	}
	return k;
}

function setState(newState) {
	if (!this.elementResolved()) return;
	if (newState < 0) return;
	with(this) {
		if (imagelist[newState] != null) {
			elementID.src = btnImageArray[newState].src;
			state = newState;
		}
	}
}

function getState() {
	if (!this.elementResolved()) return -1;
	return this.state;
}

function _B__onMouseOver(ID) {
	if (BTNArray != null && BTNArray.length > ID && BTNArray[ID].state == 0) {
		BTNArray[ID].setState(1);
	}
}

function _B__onMouseOut(ID) {
	if (BTNArray != null && BTNArray.length > ID && BTNArray[ID].state == 1) {
		BTNArray[ID].setState(0);
	}
}

function mouseOver() {
	if (!this.elementResolved()) return;
	if (this.state == 0)
		this.setState(1);
}

function mouseOut() {
	if (!this.elementResolved()) return;
	if (this.state == 1)
		this.setState(0);
}

function setClicked() {
	with(this) {
		if (!this.elementResolved()) return;
		if ((state == 0 || state == 1) && (btnImageArray.length > 2)) {
			clearGroup();
			setState(2);
		} else if (state == 2 && getGroupCount() == 1) {
			setState(1);
		}
	}
}

function _B__setClicked(ID) {
	if (BTNArray != null && BTNArray.length > ID) {
		BTNArray[ID].setClicked();
	}
}

function setUnclicked() {
	if (!this.elementResolved()) return;
	if (this.state == 2) this.setState(0);
}

function clearGroup() {
	if (!this.elementResolved()) return;
	for (var i = 0; i < BTNArray.length; i++) 	{
		if (this.group == BTNArray[i].group) 		{
			BTNArray[i].setUnclicked();
		}
	}
}

