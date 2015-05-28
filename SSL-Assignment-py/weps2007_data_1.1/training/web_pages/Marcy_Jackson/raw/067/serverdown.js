	//Created by Rik Jones 8/2/00
	// Edit thes dates and message
	//Changed for message display only 10/24/00, MParkin
	
	noteDownDate = 	new Date("October 9, 2003 8:01:39 AM"); //start showing message
	noteUpDate = 	new Date("October 29, 2003 10:05:39 PM");	//stop showing message
	message = 		'<p align="center"><h4><font color="red">Due to system problems, some services may be unavailable.  We apologize for the inconvenience.<br></font></h4></p>';
	
	
	//level below this line alone -------------------------
	today = new Date();

	if (today < noteUpDate && today > noteDownDate){
		// tell them when it will be down
		document.write( message);
		
	}

	
	