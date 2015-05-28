	//Created by Rik Jones 8/2/00
	// Edit thes dates and message
	//Changed for message display only 10/24/00, MParkin
	
	noteDownDate = 	new Date("June 09, 2004 1:30:36 PM"); //start showing message
	noteUpDate = 	new Date("June 12, 2004 1:00:36 AM");	//stop showing message
	message = 		'<p align="center"><h4><font color="#ff0033">All Dallas County Community College District campuses and locations will be open on Friday, June 11, to conduct business during regular hours of operation.</font></h4></p>';
	
	
	//level below this line alone -------------------------
	today = new Date();

	if (today < noteUpDate && today > noteDownDate){
		// tell them when it will be down
		document.write( message);
		
	}

	
	