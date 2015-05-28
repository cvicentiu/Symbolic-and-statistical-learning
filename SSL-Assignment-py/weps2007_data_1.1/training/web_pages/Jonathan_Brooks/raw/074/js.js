sfHover = function() {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);


function SendEmail() {
	var objWindow = window.open('/html/SendEmail.asp', 'Email', 'height=420,width=795,top=150,left=50,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes');
}

function VacancyDetails(vacID) {
	var objWindow = window.open('/html/VacancyDetails.asp?vacID=' + vacID, 'Vacancy', 'height=420,width=795,top=150,left=50,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes');
}
