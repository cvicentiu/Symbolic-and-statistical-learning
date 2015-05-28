	var	tNavOn = new Array(10);
	var	tNavOff = new Array(10);
	var	n;
	var	lit = -1;
	var	imglit = "";
	var	allloaded = false;

// preload images
	if (document.images) {
		for (n = 1; n < 11; n++) {
			tNavOn[n] = new Image();
			tNavOff[n] = new Image();
			tNavOn[n].src = "../images2/but"+n+"ov.gif";
			tNavOff[n].src = "../images2/but"+n+".gif";
		}
		allloaded = true;
	}
// highlight button 
	function img_act(imgName,n) {
		if (allloaded) {
			document [imgName].src = tNavOn[n].src;
			lit = n;
			imglit = imgName;
		}
	}

// un-highlight button
	function img_inact() {
		if (allloaded) {
			if (lit != -1){
				document [imglit].src = tNavOff[lit].src;
				lit = -1;
			}
		}
	}
// Link Functions
	function openit(sURL) {
		windowTwo=open(sURL,"newwin");
	}
	function closeit(sURL) {
		windowTwo=close()
	}