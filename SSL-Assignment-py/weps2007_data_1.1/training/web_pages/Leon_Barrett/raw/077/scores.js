
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



function cover () {


	document.getElementById('wipe').filters.alpha.opacity+=5


	if (document.getElementById('wipe').filters.alpha.opacity < 100) {
		timer = setTimeout('cover();', 30);
	}

}

function uncover () {

	document.getElementById('wipe').filters.alpha.opacity-=5

	if (document.getElementById('wipe').filters.alpha.opacity > 0) {
		timer = setTimeout('uncover();', 30);
	}

}


function cticker(itm) {


	if (document.getElementById('wipe').filters.alpha.opacity == 100) {
		document.getElementById('tbox').innerHTML = t[itm]
		uncover()
	} else {
		document.getElementById('wipe').innerHTML = t[itm]
		cover()
	}

	
	if (itm < numt) {
		gonum = itm + 1
	} else {
		gonum = 1
	}

	timer = setTimeout('cticker(' + gonum + ');', 4000);
}

function setwipe () {

	lt = getRealLeft(document.getElementById('tbox'));
	tp = getRealTop(document.getElementById('tbox'));

	document.getElementById('wipe').style.posLeft = lt;
	document.getElementById('wipe').style.posTop = tp;

}
