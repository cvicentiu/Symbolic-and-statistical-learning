		// Random Number Generator
		<!-- 
		function RandomNumber(upper_limit)
		{
		return Math.round(upper_limit * Math.random());
		}
		var upper_limit = 500000;
		// -->
		
		// Misc Popups to open a new window sized as specified when called
		<!--
		function NewWindow(width,height,url) 
		{   
		window.open(url,"PopUp","menubar=0,scrollbars=1,resizable=1,height="+height+",width="+width);
		}
		// -->
		
		// This will open a new window for top classified viewing
		<!-- 
			function topclassopenwin(mypage, myname, w, h, scroll) {
				var winl = (screen.width - w) / 2;
				var wint = (screen.height - h) / 2;
				winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable'
				win = window.open(mypage, myname, winprops)
					if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
				}
		// -->
		
		//Checks if all required fields are filled out before form is submitted and displays error message
		<!-- 
		function checkrequired(which) {
		var pass=true;
		if (document.images) {
		for (i=0;i<which.length;i++) {
		var tempobj=which.elements[i];
		if (tempobj.name.substring(0,8)=="required") {
		if (((tempobj.type=="text"||tempobj.type=="textarea")&& tempobj.value=='')||(tempobj.type.toString().charAt(0)=="s" && tempobj.selectedIndex==0)) {
		pass=false;
		break;
         		}
      		}
   		}
		}
		if (!pass) {
		shortFieldName=tempobj.name.substring(8,30).toUpperCase();
		alert(" "+shortFieldName+" is a required field.");
		return false;
		}
		else
		return true;
		}
		//  -->