var myLinksWin;
var experienceWin;
var serviceCommitmentWin;
var testimonialsWin;

function myLinksWindow(x) {
	if (!myLinksWin || myLinksWin.closed) {
		myLinksWin = window.open(x, 'mWin', 'width=500,height=400,resizable=yes,scrollbars=yes');
	}
	else {
		myLinksWin.focus();
	}
}

function experienceWindow(x) {
	if (!experienceWin || experienceWin.closed) {
		experienceWin = window.open(x, 'expWin', 'width=500,height=400,resizable=yes,scrollbars=yes');
	}
	else {
		experienceWin.focus();
	}
}

function serviceCommitmentWindow(x) {
	if (!serviceCommitmentWin || serviceCommitmentWin.closed) {
		serviceCommitmentWin = window.open(x, 'servWin', 'width=500,height=400,resizable=yes,scrollbars=yes');
	}
	else {
		serviceCommitmentWin.focus();
	}
}

function testimonialsWindow(x) {
	if (!testimonialsWin || testimonialsWin.closed) {
		testimonialsWin = window.open(x, 'testWin', 'width=500,height=400,resizable=yes,scrollbars=yes');
	}
	else {
		testimonialsWin.focus();
	}
}