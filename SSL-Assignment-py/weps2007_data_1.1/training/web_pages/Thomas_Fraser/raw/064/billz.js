	var aryMoused = new Array();
	var aryLayerMoused = new Array();
	var aryMoImages = new Array();
	var imageList = new Array();
	var runMouseOvers = false;
	var TimerID = null;
	var iLimit = 25;
	var itmp = 0;
	var BillzTime = 100;
	var BillzTimes = 2;
	var BillzmoveDistance = 1;
	var BillzThisLoc = 325;
	var aryLayerNames = new Array();
	var aryNavBarLayerInfo = new Array();
	var aryNavBarLayers = new Array();

	var registeredObjects = new Array();
	var viz = "hide";

	function MOImage() {
		var a = MOImage.arguments;
		this.ptrImage = BillzNavBarMM_findObj(a[0]);
		this.imageMO = new Image();
		this.imageMO.src = a[1];
		this.HTMLname = a[0];
		this.Moused = false;
		this.OriginalSrc = '';
		return true;
	}
	function BillzImagePreload() {
	// 0) html image name 1) mo image src 2)image Name for rollover key (rollover may have multiple mos for one html Image) 
		var arg = BillzImagePreload.arguments;
		var imageKey = (arg[2]) ? arg[2] : arg[0];
		imageList[imageList.length] = imageKey;
		if (!(aryMoImages[imageKey])) {
			aryMoImages[imageKey] = new MOImage(arg[0], arg[1]);
		}
	}
	function BillzMouseover() {
		var a = null;
		var imageKey = null;
		var o = null;
		if (runMouseOvers) {
			//args 0)ImageName 1)OriginalSrc 2)array index (caller imagename)					
			a = BillzMouseover.arguments;
			imageKey = (a[2]) ? a[2] : a[0];
			if (!(aryMoImages[imageKey].ptrImage)) {
				aryMoImages[imageKey].ptrImage = BillzNavBarMM_findObj(a[0]);
			}
			if (aryMoImages[imageKey] && (o = aryMoImages[imageKey].ptrImage)) {
				aryMoImages[imageKey].OriginalSrc = a[1];
				aryMoImages[imageKey].Moused = true;
				o.src = aryMoImages[imageKey].imageMO.src;
			}
		}
		return true;
	}
	var NavBarTempOnload = null;
	if (window.onload && window.onload != null){
		NavBarTempOnload = window.onload;
	}
	function FullyLoaded() {
		if (NavBarTempOnload != null){
			NavBarTempOnload();
		}
		runMouseOvers = true;
		return true;
	}
	function BillzMouseOutTimer() {
		if (TimerID) {
			clearTimeout(TimerID);
		}
		TimerID = setTimeout("BillzLayerRestore()",5000);
		return true;
	}
	function RestoreAll() {
		BillzMouseoverRestore();
		BillzLayerRestore();
		return true;
	}
	function BillzMouseoverRestore() {
		var i = 0;
		var o = null;
		if (runMouseOvers) {
			for (i = 0; i < imageList.length; i++) {
				if (aryMoImages[imageList[i]].Moused && (o = aryMoImages[imageList[i]].ptrImage)) {
					o.src = aryMoImages[imageList[i]].OriginalSrc;
					aryMoImages[imageList[i]].Moused = false;
				}
			}
		}
		return true;
	}
	function BillzLayerRestore() {
		var i = 0;
		for (i = 0; i < aryLayerNames.length; i++) {
			if (!aryNavBarLayerInfo[aryLayerNames[i]].isDefault) {
				BillzNavBarRestoreLayers(aryLayerNames[i]);
			}
		}
		return true;
	}
	function BillzArrayPushUnique(aryArray, varNewElement) { //only pushes if unique value
		var pushIt = true;
		var i = 0;
		for (i = 0; i < aryArray.length && pushIt; i++) {
			pushIt = (varNewElement != aryArray[i]);
		}
		if (pushIt) {
			BillzArrayPush(aryArray, varNewElement);
		}
		return pushIt;
	}
	function BillzArrayPush(aryArray, varNewElement) { //Implement Array Push 'cause IE cant handle it
		aryArray[aryArray.length] = varNewElement;
		return true;
	}
	function BillzArrayPop(aryArray) { //Implement Array Pop 'cause IE cant handle it before 5.5
		var varItemToPop = null;
		if (aryArray[aryArray.length - 1]) {
			varItemToPop = aryArray[aryArray.length - 1];
			aryArray[aryArray.length] = null;
		}
		return varItemToPop;
	}
	function BillzNavBarMM_findObj(n, d) { //v3.0 name changed to avoid clash with possible other JS in content, this function complements of MM Dreamweaver
		var p,i,x;

		if (registeredObjects[n]) {
			return registeredObjects[n];
		}
		if (!(d)) {
			d = document;
		}
		if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
			d = parent.frames[n.substring(p+1)].document;
			n = n.substring(0,p);
		}
		if (!(x = d[n]) && d.all) {
			x = d.all[n];
		}
		for (i = 0; !x && i < d.forms.length; i++) {
			x = d.forms[i][n];
		}
		for (i=0; !x && d.layers && i < d.layers.length; i++) {
			if (d.layers[i].id.indexOf("external_") == -1) {
				x = BillzNavBarMM_findObj(n, d.layers[i].document);
			}
		}
		registeredObjects[n] = x;

		return x;
	}
	function BillzArrayContains() {
		var a = BillzArrayContains.arguments;
		var foundit = false;
		var i = 0;
		for (i = 0; i < a[0].length && !foundit; i++) {
			foundit = (a[1] == a[0][i]);
		}
		return foundit;
	}
	function NavBarRegisterLayer() {
		var a = NavBarRegisterLayer.arguments;
		var n = a[0];
		var d = a[1];
		var mo = false;
		var o = null;
		if (a[2] && a[2] == 'MOutLayer') {
			mo = true;
		} else {
			mo = false;
		}
		if (!(BillzArrayContains(aryLayerNames, n))) {
			if (o = BillzNavBarMM_findObj(n)) {
				aryNavBarLayers[n] = o;
				BillzArrayPushUnique(aryLayerNames, n);
				aryNavBarLayerInfo[n] = new NavBarLayer(n, d, mo);
			}
		}
		return true;
	}
	function BillzNavBarMM_showHideLayers() {
	//v3.0 name changed, this function complements of MM Dreamweaver with customizations by Bill Heller
		var i = 0;
		var x = "";
		var obj = null;
		var v = null;
		var p = null;
		var args = BillzNavBarMM_showHideLayers.arguments;

		if (args[args.length - 1] != "menu") {
			BillzMouseOutTimer();
		}
		for (i = 0; i < (args.length - 2); i += 3) {
			if (!aryNavBarLayers[args[i]]) {
				x = (args[i + 2] == 'show') ? 'hide' : 'show';
				NavBarRegisterLayer(args[i], x);
			}
			if ((obj = aryNavBarLayers[args[i]]) != null) {
				v = args[i + 2];
				aryNavBarLayerInfo[args[i]].isDefault = false;
				if (args[args.length - 1] == "restore") {
					v = (v == 'show') ? 'hide' : 'show';
				}
				if (obj.style) {
					obj.style.visibility = (v == 'show') ? 'visible' : ((v == 'hide') ? 'hidden' : v);
				} else {
					obj.visibility = v;
				}
			}
		}
		return true;
	}
	function BillzNavBarRestoreLayers() {
		var i = 0;
		var x = "";
		var obj = null;
		var v = null;
		var p = null;
		var args = BillzNavBarRestoreLayers.arguments;
		for (i = 0; i < (args.length); i++) {
			if (obj = aryNavBarLayers[args[i]]) {
				v = aryNavBarLayerInfo[args[i]].defaultVisibility;
				if (obj.style) {
					obj = obj.style;
					v = (v == 'show' ) ? 'visible' : ((v == 'hide') ? 'hidden' : v);
				}
				obj.visibility = v;
				if (!aryNavBarLayerInfo[args[i]].MOutLayer) {
					aryNavBarLayerInfo[args[i]].isDefault = true;
				}
			}
		}
		return true;
	}
	function NavBarLayer() {
		var a = NavBarLayer.arguments;
		this.defaultVisibility = a[1];
		this.isDefault = true;
		this.MOutLayer = a[2];
		return true;
	}
	function BillzNavMove() {
		var thisl = null;
		var otherl = null;
		if (thisl = BillzNavBarMM_findObj("BillzScrollLayer")) {
			if (thisl.style) {
				thisl = thisl.style;
				viz = "hidden";
			} 
			thisl.top = BillzThisLoc -= 3;
			if (BillzThisLoc < -750) {
				BillzThisLoc = 325;
				BillzTimes--;
			}
		}
		if (BillzTimes <= 0) {
			otherl = BillzNavBarMM_findObj("BillzLayer");
			otherl.visibility = viz;
		} else {
			setTimeout("BillzNavMove()", BillzTime);
		}

		return true;
	}
	function NavBar_openadmin() {
		window.open('admin/', 'SiteAdmin', 'height=screen.availheight,width=screen.availwidth,scrollbars=1,toolbar=0,directories=0,status=0,menubar=0,resizable=1');
		return true;
	}
	window.onload = FullyLoaded;
//-->
