var today = new Date();
var Events = new Array;

function DefineEvent(EventDate, EventDescription) {
	var tmp;
	tmp = "";
	tmp = tmp + EventDescription;
	Events[EventDate] = tmp;
}

function eventTitle() {
	var curdy, curmo, yr, mo, dy;
	curdy = today.getDate();
	curmo = today.getMonth()+1;
	mo = curmo;
	yr = GetFullYear(today);
	var todayDate = yr + "" + curmo + "" + curdy
	if (Events[todayDate]) {
		tmp = Events[todayDate];
		document.write(tmp);
	}
	else {
	document.write("Welcome to AOL Shopping");
	}
}

function GetFullYear(d) { 
	var yr;
	yr = d.getYear();
	if (yr < 1000)
	yr +=1900;
	return yr;
}
/*adds-instore.js code*/
DefineEvent(2005111, "Happy Holidays!");
DefineEvent(2005112, "Happy Holidays!");
DefineEvent(2005113, "Happy Holidays!");
DefineEvent(2005114, "Happy Holidays!");
DefineEvent(2005115, "Happy Holidays!");
DefineEvent(2005116, "Happy Holidays!");
DefineEvent(2005117, "Happy Holidays!");
DefineEvent(2005118, "Happy Holidays!");
DefineEvent(2005119, "Happy Holidays!");
DefineEvent(20051110, "Happy Holidays!");
DefineEvent(20051111, "Happy Holidays!");
DefineEvent(20051112, "Happy Holidays!");
DefineEvent(20051113, "Happy Holidays!");
DefineEvent(20051114, "Happy Holidays!");
DefineEvent(20051115, "Happy Holidays!");
DefineEvent(20051116, "Happy Holidays!");
DefineEvent(20051117, "Happy Holidays!");
DefineEvent(20051118, "Happy Holidays!");
DefineEvent(20051119, "Happy Holidays!");
DefineEvent(20051120, "Happy Holidays!");
DefineEvent(20051121, "Happy Holidays!");
DefineEvent(20051122, "Happy Holidays!");
DefineEvent(20051123, "Happy Holidays!");
DefineEvent(20051124, "Happy Holidays!");
DefineEvent(20051125, "Happy Holidays!");
DefineEvent(20051126, "Happy Holidays!");
DefineEvent(20051127, "Happy Holidays!");
DefineEvent(20051128, "Happy Holidays!");
DefineEvent(20051129, "Happy Holidays!");
DefineEvent(20051130, "Happy Holidays!");
DefineEvent(2005121, "Happy Holidays!");
DefineEvent(2005122, "Happy Holidays!");
DefineEvent(2005123, "Happy Holidays!");
DefineEvent(2005124, "Happy Holidays!");
DefineEvent(2005125, "Happy Holidays!");
DefineEvent(2005126, "Happy Holidays!");
DefineEvent(2005127, "Happy Holidays!");
DefineEvent(2005128, "Happy Holidays!");
DefineEvent(2005129, "Happy Holidays!");
DefineEvent(20051210, "Happy Holidays!");
DefineEvent(20051211, "Happy Holidays!");
DefineEvent(20051212, "Happy Holidays!");
DefineEvent(20051213, "Happy Holidays!");
DefineEvent(20051214, "Happy Holidays!");
DefineEvent(20051215, "Happy Holidays!");
DefineEvent(20051216, "Happy Holidays!");
DefineEvent(20051217, "Happy Holidays!");
DefineEvent(20051218, "Happy Holidays!");
DefineEvent(20051219, "Happy Holidays!");
DefineEvent(20051220, "Happy Holidays!");
DefineEvent(20051221, "Happy Holidays!");
DefineEvent(20051222, "Happy Holidays!");
DefineEvent(20051223, "Happy Holidays!");
DefineEvent(20051224, "Happy Holidays!");
DefineEvent(20051225, "Happy Holidays!");
DefineEvent(20051226, "Happy Holidays!");
DefineEvent(20051227, "Happy Holidays!");
DefineEvent(20051228, "Happy Holidays!");
DefineEvent(20051229, "Happy Holidays!");
DefineEvent(20051230, "Happy Holidays!");
DefineEvent(20051231, "Happy Holidays!");