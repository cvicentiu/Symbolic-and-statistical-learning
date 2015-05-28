        <!-- Hide the script
        //
        // (C) 2000 Bill Stevenson
        // This is a y2k compliant script which prints the system date to the screen,
        // based on the date specified in the viewer's operating system
        //
        // You may use this script in your website provided that this notice remains at the top
        //
        var months=new Array(13);	// set up an array for string literal months
        months[1]="Jan.";		// array starts at [1] rather than [0] for
        months[2]="Feb.";		// familiar month numbering convention, could
        months[3]="Mar.";		// just as easily be [0..11] but that is less clear
        months[4]="Apr.";
        months[5]="May";
        months[6]="June";
        months[7]="July";
        months[8]="Aug.";
        months[9]="Sept.";
        months[10]="Oct.";
        months[11]="Nov.";
        months[12]="Dec.";
        var today=new Date();				// store date in today
        var lmonth=months[today.getMonth() + 1];	// pull out month name
        var date=today.getDate();			// pull out numerical date
        var year=today.getFullYear();			// pull out numerical year
        var daynum = today.getDay() + 1;		// pull out day number
        if(daynum==1) day = "Sunday";			// match day name to day number
        if(daynum==2) day = "Monday";
        if(daynum==3) day = "Tuesday";
        if(daynum==4) day = "Wednesday";
        if(daynum==5) day = "Thursday";
        if(daynum==6) day = "Friday";
        if(daynum==7) day = "Saturday";
        // make entire date into one variable, allows easy adjustment of format
        // us format: var todaysdate= (day + ", " + date + " " + lmonth + " " + year);
        var todaysdate= (day + ", " + lmonth + " " + date + ", "  + year);
        // write date to screen
        document.write(todaysdate);
        // end hiding-->
