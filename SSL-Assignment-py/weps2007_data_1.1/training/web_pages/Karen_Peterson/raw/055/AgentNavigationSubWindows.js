var contactWin;
var infoWin;

function contactWindow(x) {
	if (!contactWin || contactWin.closed) {
		contactWin = window.open(x, 'cWin', 'width=500,height=400,resizable=yes');
	}
	else {
		contactWin.focus();
	}
}

function infoWindow(x) {
	if (!infoWin || infoWin.closed) {
		infoWin = window.open(x, 'iWin', 'width=500,height=400,resizable=yes,scrollbars=yes');
	}
	else {
		infoWin.focus();
	}
}