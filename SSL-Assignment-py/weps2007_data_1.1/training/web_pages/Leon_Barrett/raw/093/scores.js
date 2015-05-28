
function getRealLeft(el) {
    xPos = el.offsetLeft;
    tempEl = el.offsetParent;
    while (tempEl != null) {
        xPos += tempEl.offsetLeft;
        tempEl = tempEl.offsetParent;
    }
    return xPos;
}

function getRealTop(el) {
    yPos = el.offsetTop;
    tempEl = el.offsetParent;
    while (tempEl != null) {
        yPos += tempEl.offsetTop;
        tempEl = tempEl.offsetParent;
    }
    return yPos;
}

var htimer

function cover (fast) {


	if (fast == 1) {
		document.getElementById('wipe').filters.alpha.opacity = 100
		} else {

			document.getElementById('wipe').filters.alpha.opacity+=10

	
			if (document.getElementById('wipe').filters.alpha.opacity < 100) {
				timer = setTimeout('cover(0);', 30);
		}

	}
}

function uncover (fast) {

	if (fast == 1) {
		document.getElementById('wipe').filters.alpha.opacity = 0
	} else {

	document.getElementById('wipe').filters.alpha.opacity-=10

	if (document.getElementById('wipe').filters.alpha.opacity > 0) {
		timer = setTimeout('uncover(0);', 30);
	}

	}
}


function cticker(itm, stop, back1) {

	if (back1 == 1) {
		if (document.formscore.forward.value == 1) {
			document.formscore.forward.value = 0;
			itm = itm - 2
		}
	} else {
		if (document.formscore.forward.value == 0) {
			document.formscore.forward.value = 1;
			itm = itm + 2
		}
	}

	if (itm > numt) {
		itm = numt
		document.formscore.forward.value = 0;
	}
	if (itm <= 1) {
		itm = 1
		document.formscore.forward.value = 1;
	}

	if (document.getElementById('wipe').filters.alpha.opacity == 100) {
		document.getElementById('tbox').innerHTML = t[itm]
		if (stop == 1) {
			uncover(1)
		} else {
			uncover(0)
		}
	} else {
		document.getElementById('wipe').innerHTML = t[itm]
		if (stop == 1) {
			cover(1)
		} else {
			cover(0)
		}
	}

	if (back1 == 0) {
		if (itm < numt) {
			gonum = itm + 1
		} else {
			gonum = 1
		}
	} else {
		if (itm > 1) {
			gonum = itm - 1
		} else {
			gonum = 2
		}
	}
	
	document.formscore.score_item_num.value = gonum

	if (stop == 1) {
		clearTimeout(htimer)
	} else {
		htimer = setTimeout('cticker(' + gonum + ',0,0);', 2500);
	}
}

function setwipe () {

	lt = getRealLeft(document.getElementById('tbox'));
	tp = getRealTop(document.getElementById('tbox'));

	document.getElementById('wipe').style.posLeft = lt;
	document.getElementById('wipe').style.posTop = tp;

}

function nextitem() {

	cticker(parseInt(document.formscore.score_item_num.value),1,0)

}

function previtem() {

	cticker(parseInt(document.formscore.score_item_num.value),1,1)

}

function play() {

	cticker(parseInt(document.formscore.score_item_num.value),0,0)

}

function pause1() {

	clearTimeout(htimer)

}