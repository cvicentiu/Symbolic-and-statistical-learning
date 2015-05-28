<!--
function getCopyrightDate(iStartYear, iRangeSize, separatorString)
{
	var date = new Date();	
	
	// if no start year is passed in, then use the current year
	if (iStartYear == null || iStartYear == 0 || iStartYear == "")
	{
		iStartYear = date.getFullYear();
	}
	
	// default end year to current year
	var iEndYear = date.getFullYear();
	if (iRangeSize != null && iRangeSize != "")
	{
		iEndYear = iStartYear + iRangeSize;
	}		
	
	if (iStartYear == iEndYear)
	{
		return iStartYear.toString();
	}
	else
	{
		var separator = "-";
		if (separatorString != null && separatorString != "")
			separator = separatorString;
		return iStartYear + separator + iEndYear;
	}
}
-->