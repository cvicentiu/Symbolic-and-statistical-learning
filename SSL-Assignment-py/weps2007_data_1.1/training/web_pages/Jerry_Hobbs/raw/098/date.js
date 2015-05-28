function ListGetAt( theList, theIndex, theDelim) {
	theVal = "";
	theOccur = 1
	theC = "";
	theLen = theList.length;
	if (theLen == 0) return "";
	for(var i=0; i < theLen; i++)
	{
		theC = theList.charAt(i);
		if (theC == theDelim ) {
			theOccur++;
			if (theOccur > theIndex) return theVal;
		} else {
			if (theOccur == theIndex) {
				theVal = theVal + theC;
			}
		}
	}
	return theVal;
}

function MonthFormat( theVal) {
	var theNum = parseInt(theVal);
	if (!isNaN( theNum)) {
		if ( theNum > 0 && theNum < 13) {
			Months = new Array();
			Months[0]="Jan.";
			Months[1]="Feb.";
			Months[2]="March";
			Months[3]="April";
			Months[4]="May";
			Months[5]="June";
			Months[6]="July";
			Months[7]="Aug.";
			Months[8]="Sept.";
			Months[9]="Oct.";
			Months[10]="Nov.";
			Months[11]="Dec.";
			return Months[theNum-1];
		} else return "";
	} else return "";	
}

function YearFormat( theVal) {
	var theNum = parseInt( theVal);
	if (!isNaN( theNum)) {
		if ( theNum < 100) theNum = theNum + 2000;
		return "" + theNum;
	} else return "";
}

function DayFormat( theVal) {
	var theNum = parseInt( theVal);
	if (!isNaN( theNum)) {
		return "" + theNum;
	} else return "";
}

function FormatNewsDate ( theDate) {
	var theYear = ListGetAt( theDate, 3, "/");
	var theMonth = ListGetAt( theDate, 1, "/");
	var theDay = ListGetAt( theDate, 2, "/");
	if (theYear != "" && theMonth != "" && theDay != "") {
		return "" + MonthFormat( theMonth) + " " + DayFormat( theDay) + ", " + YearFormat( theYear);
	} else return theDate;
}