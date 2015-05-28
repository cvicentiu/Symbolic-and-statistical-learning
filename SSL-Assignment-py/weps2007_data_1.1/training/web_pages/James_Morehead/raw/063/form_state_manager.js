
	var fsman;

	function FormState(formObj) {
		this.formObj = formObj;		
		this.formObj.onclick = fsmanScan;
		this.formObj.onkeyup = fsmanScan;
		this.formObj.onfocus = fsmanScan;
		this.formObj.onchange = fsmanScan;
		this.registeredButtons = new Array();
		this.allElements = new Array(formObj.elements.length);
		var elementObj;
		for (var j = 0; j < formObj.elements.length; j++) {
			elementObj = formObj.elements[j];
			var elementValue = "";
			var noscan = elementObj.getAttribute("noscan");
			if (noscan != null && noscan.length > 1) {
				this.allElements[j] = "noscan";
			} else {
				switch (elementObj.type) {

					case ("text"):
					case ("textarea"):
					case ("hidden"):
					case ("password"):
						elementValue = elementObj.value;
						break;
					case ("radio"):
					case ("checkbox"):
						elementValue = elementObj.defaultChecked;
						break;
					case ("select-one"):
						elementValue = elementObj.selectedIndex;
						break;
					case ("select-multiple"):
						for (var k = 0; k < elementObj.options.length; k++) {
							// the value is a string representing the selected state of each option
							elementValue += elementObj.options[k].defaultSelected.toString();
						}
						break;
				}
				this.allElements[j] = elementValue;
			}
		}
	}

	FormState.prototype.hasChanged = function () {

		var elementObj;
		var formState;
		var elementValue;
		var elemHasChanged = false;
		for (var i = 0; i < this.formObj.elements.length; i++) {
			elementObj = this.formObj.elements[i];
			elementValue = this.allElements[i];
			var noscan = elementObj.getAttribute("noscan");
			if (noscan != null && noscan.length > 1) {
				elemHasChanged = false;
			} else {			
				switch (elementObj.type) {
					case ("text"):
					case ("textarea"):
					case ("hidden"):
					case ("password"):
						elemHasChanged = (elementValue != elementObj.value);
						break;
					case ("radio"):
					case ("checkbox"):
						if ((elementValue == false && elementObj.checked) || (elementValue == true && !elementObj.checked)) {
							elemHasChanged = true;
						}
						break;
					case ("select-one"):
						elemHasChanged = (elementValue != elementObj.selectedIndex);
						break;
					case ("select-multiple"):
						var multiValueString = "";
						for (var k = 0; k < elementObj.options.length; k++) {
							multiValueString += elementObj.options[k].selected.toString();
						}
						elemHasChanged = (elementValue != multiValueString);

				}
			}
			if (elemHasChanged) {
				return true;
			}
		}
		return elemHasChanged;
	}
	
	FormState.prototype.scan = function () {
		if (this.hasChanged()) {
			this.unlockButtons();
			return true;
		} else {
			this.lockButtons();
			return false;
		}		
	}
	
	FormState.prototype.register = function (buttonObj) {
		if (buttonObj != null) {
			buttonObj.disabled = true;
			this.registeredButtons[this.registeredButtons.length] = buttonObj;
		}
	}
	
	FormState.prototype.unlockButtons = function () {
		for (var i = 0; i < this.registeredButtons.length; i++) {
			this.registeredButtons[i].disabled = false;
		}
	}	
	
	FormState.prototype.lockButtons = function () {
		for (var i = 0; i < this.registeredButtons.length; i++) {
			this.registeredButtons[i].disabled = true;
		}
	}
	
	
	function FormStateManager(documentString, sff) {
		this.initialized = false;
		this.allForms = null;
		this.doc = null;		
		this.docString = documentString;		
		this.registeredButtons = new Array();
		this.selectFirstField = (sff) ? true : false;
		this.forceApplyButtonLockFlag = false;
		this.noscan = false;
		this.initialize();
	}

	FormStateManager.prototype.initialize = function () {
		this.initialized = false;
		this.forceApplyButtonLockFlag = false;
		this.allForms = new Array();
		
		
		if (this.docString != null) {
			this.doc = eval(this.docString);
			if (this.doc != null && this.doc.forms.length > 0) {
				this.allForms = new Array();
				var formStateObj;
				for (var i = 0; i < this.doc.forms.length; i++) {
					var formStateObj = new FormState(this.doc.forms[i]);
					this.registerFormState(formStateObj);
					if (i == 0) {
						this.focusFirst(this.doc.forms[i]);
					}
				}
				this.doc.onunload = fsmanInitialize;
			} else {
				setTimeout("fsmanInitialize()", 500);
				return;
			}
		}
	}
	
	FormStateManager.prototype.registerFormState = function(formStateObj) {
		if (formStateObj != null) {						
			this.allForms[this.allForms.length] = formStateObj;
			this.initialized = true;
		}
	}
	
	FormStateManager.prototype.focusFirst = function (formObj) {
		var elementObj;
		for (var e = 0; e < formObj.elements.length; e++) {
			elementObj = formObj.elements[e];
			if (elementObj.type == "text" || elementObj.type == "textarea") {
				if (this.selectFirstField) {
					elementObj.select();	
				} else {
					elementObj.focus();	
				}	
				break;
			}
		}	
	}

	FormStateManager.prototype.hasChanged = function () {
		if (!this.initialized) {
			this.initialize();
			return false;
		}
		for (var i = 0; i < this.allForms.length; i++) {
			formStateObj = this.allForms[i];
			if (formStateObj.hasChanged()) {
				return true;
			}
		}
		return false;
	}
	
	FormStateManager.prototype.scan = function () {
		if (this.noscan) return;
		var childFSHasChanged = false;
		var fsObj;
		for (var i = 0; i < this.allForms.length; i++) {
			fsObj = this.allForms[i];
			if (fsObj.scan()) {
				childFSHasChanged = true;
			}
		}
		
		if (childFSHasChanged) {
			this.unlockButtons();
		} else {
			this.lockButtons();
		}
	}	

	FormStateManager.prototype.register = function (buttonObj) {
		if (buttonObj != null) {
			buttonObj.disabled = true;
			this.registeredButtons[this.registeredButtons.length] = buttonObj;
		}
	}
	
	FormStateManager.prototype.unlockButtons = function () {
		for (var i = 0; i < this.registeredButtons.length; i++) {
			button = this.registeredButtons[i];
			if (button.name == "mainSubmit") {
				if (this.forceApplyButtonLockFlag) continue;
			}
			button.disabled = false;
		}
	}	
	
	FormStateManager.prototype.lockButtons = function () {
		for (var i = 0; i < this.registeredButtons.length; i++) {
			this.registeredButtons[i].disabled = true;
		}
	}
	
	FormStateManager.prototype.lockApplyButton = function () {
		for (var i = 0; i < this.registeredButtons.length; i++) {
			button = this.registeredButtons[i];
			
			if (button.name == "mainSubmit") {
				button.disabled = true;
			}

		}
	}	
	
	FormStateManager.prototype.unlockApplyButton = function () {
		// Check bypass lock
		if (this.forceApplyButtonLockFlag) return;
		
		for (var i = 0; i < this.registeredButtons.length; i++) {
			button = this.registeredButtons[i];
			
			if (button.name == "mainSubmit") {
				button.disabled = false;
			}

		}
	}
	
	FormStateManager.prototype.unlockResetButton = function () {
		for (var i = 0; i < this.registeredButtons.length; i++) {
			button = this.registeredButtons[i];
			if (button.name == "mainReset") {
				button.disabled = false;
			}

		}
	}	
	
	FormStateManager.prototype.lockResetButton = function () {
		for (var i = 0; i < this.registeredButtons.length; i++) {
			button = this.registeredButtons[i];

			if (button.name == "mainReset") {
				button.disabled = true;
			}

		}
	}
	

	FormStateManager.prototype.forceApplyButtonLock = function () {
		this.forceApplyButtonLockFlag = true;	
	}
	
	FormStateManager.prototype.clearApplyButtonLock = function () {
		this.forceApplyButtonLockFlag = false;	
	}
	
	FormStateManager.prototype.disableScan = function () {
		this.noscan = true;	
	}	
	
	FormStateManager.prototype.enableScan = function () {
		this.noscan = false;	
	}		

	function unlockButtons() {
		if (fsman != null) {
			setTimeout("fsman.unlockButtons()", 50);
		}
	}
	
	function lockButtons() {
		if (fsman != null) {
			setTimeout("fsman.lockButtons()", 50);
		}	
	}
	
	function unlockApplyButton() {
		if (fsman != null) {
			setTimeout("fsman.unlockApplyButton()", 50);	
		}
	}
	
	function lockApplyButton() {
		if (fsman != null) {
			setTimeout("fsman.lockApplyButton()", 50);
		}			
	}
	
	function unlockResetButton() {
		if (fsman != null) {
			setTimeout("fsman.unlockResetButton()", 50);	
		}	
	}
	
	function lockResetButton() {
		if (fsman != null) {
			setTimeout("fsman.lockResetButton()", 50);
		}	
	}
	
	function forceApplyButtonLock() {
		if (fsman != null) {
			setTimeout("fsman.forceApplyButtonLock()", 50);
		}	
	}
	
	function clearApplyButtonLock() {
		if (fsman != null) {
			setTimeout("fsman.clearApplyButtonLock()", 50);
		}	
	}	
	
	function fsmanScan() {
		setTimeout("fsman.scan()", 50);
	}
	function fsmanInitialize() {
		fsman.initialize();		
	}
	