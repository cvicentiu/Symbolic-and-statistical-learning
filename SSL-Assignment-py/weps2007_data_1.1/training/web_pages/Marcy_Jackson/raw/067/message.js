	//Created by Rik Jones 8/2/00
	// Edit these dates and message
	//Changed for message display only 10/24/00, MParkin
	
	noteDownDate = 	new Date("July 26, 2004 2:16:00 PM"); //start showing message
	noteUpDate = 	new Date("August 1, 2004 9:02:01 AM");	//stop showing message
	message = 		'<p><h4><font color="#ff0033">Due to system upgrades, the Application for Admission, FAQs - General Info and getanswers@dcccd.edu will be unavailable from 11:00 p.m. July 31 until 9:00 a.m. August 1. We apologize for the inconvenience.</font></h4></p>';
	

	//level below this line alone -------------------------
	today = new Date();

	if (today < noteUpDate && today > noteDownDate){
		// tell them when it will be down
		document.write( message);
		
	}

	
	
