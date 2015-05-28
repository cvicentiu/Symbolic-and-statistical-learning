mydate = new Date();
myday = mydate.getDay();
mymonth = mydate.getMonth();
// convert day of week numeric to name
if(myday == 0)
	day = " Sunday, "      
else if(myday == 1)
	day = " Monday, "
else if(myday == 2)
	day = " Tuesday, "   
else if(myday == 3)
	day = " Wednesday, "   
else if(myday == 4)
	day = " Thursday, "
else if(myday == 5)
	day = " Friday, "
else if(myday == 6)
	day = " Saturday, "

// convert month numeric to name
if (mymonth == 0)
	month = "January "
else if(mymonth ==1)
	month = "February "
else if(mymonth ==2)
	month = "March "
else if(mymonth ==3)
	month = "April "
else if(mymonth ==4)
	month = "May "
else if(mymonth ==5)
	month = "June "
else if(mymonth ==6)
	month = "July "
else if(mymonth ==7)
	month = "August "
else if(mymonth ==8)
	month = "September "
else if(mymonth ==9)
	month = "October "
else if(mymonth ==10)
	month = "November "
else if(mymonth ==11)
	month = "December "
document.write("&nbsp;" + day + month + mydate.getDate()+", " + mydate.getFullYear());