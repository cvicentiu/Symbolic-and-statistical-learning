//Rivals.com		
		
		function Left(str, n)
	        {
	                if (n <= 0)     // Invalid bound, return blank string
	                        return "";
	                else if (n > String(str).length)   // Invalid bound, return
	                        return str;                // entire string
	                else // Valid bound, return appropriate substring
	                        return String(str).substring(0,n);
	        }
		function insertImage(spath, sfile, lap, lheight, lwidth, luptype, scaption, scredit, ldate, sdescription, lsite, salign) {
		   if (Left(spath,13) == 'http://vmedia') {
		   	spath = spath.substr(24,spath.length);
		   }
		   var filename = location.pathname.substring(location.pathname.lastIndexOf('\/')+1).toLowerCase();
		   var sHTML ="";
		   if (lap == 1) {
		      dtDate = Date.parse(new Date());
		      if ((dtDate-ldate)/(24*60*60*1000) < 14) {
		         if ((scaption.length > 0) && (filename == "content.asp")) {
		            //AP Photo with Caption
		            sHTML += "<table " + salign + " border=0 ";
		            if (lwidth > 0) {
		               sHTML += "width=" + eval(lwidth + 8) + " cellpadding=0 cellspacing=0>";
		            }
		            else {
		               sHTML += " cellpadding=0 cellspacing=0>";
		            }
		            if (salign.indexOf("Right") != -1) {
		               sHTML +="<tr><td rowspan=4 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td>" +
		            	       "<td width=" + eval(lwidth + 2) + "><img src=" + spath + " style='border:1px solid black;' ";  	 
		               if ((lheight > 0) && (lwidth > 0)) {
		                  sHTML += "height=" + lheight + " width=" + lwidth + "";
		               }
		               sHTML += "></td></tr>";
		            }   
		            else {
		               sHTML +="<tr>" +
		            	       "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
		               if ((lheight > 0) && (lwidth > 0)) {
		                  sHTML += "height=" + lheight + " width=" + lwidth + "";
		               }
		               sHTML += "></td><td rowspan=4 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td></tr>";
		            
		            }
		            if (scredit.length > 0) {
		               sHTML += "<tr><td align=right><font size=1 face=verdana>AP: " + scredit + "</font></td></tr>";
		            }
		            else {
		               sHTML += "<tr><td align=right><font size=1 face=verdana>Associated Press</font></td></tr>";
		            }
			    sHTML +="<tr><td height=3><img src=http://vmedia.rivals.com/images/spacer1.gif width=1 height=3></td></tr>" +
		                    "<tr><td align=center><font size=1><b>" + scaption  + "</b></font></td></tr></table>";
		         }
		         else if (filename == "content.asp") {
		         //AP Photo without a caption
		            sHTML += "<table " + salign + " border=0 ";
		            if (lwidth > 0) {
		               sHTML += "width=" + eval(lwidth + 8) + " cellpadding=0 cellspacing=0>";
		            }
		            else {
		               sHTML += " cellpadding=0 cellspacing=0>";
		            }
		            if (salign.indexOf("Right") != -1) {
		               sHTML +="<tr><td rowspan=2 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td>" +
		            	       "<td width=" + eval(lwidth + 2) + "><img src=" + spath + " style='border:1px solid black;' ";  	 
		               if ((lheight > 0) && (lwidth > 0)) {
		                  sHTML += "height=" + lheight + " width=" + lwidth + "";
		               }
		               sHTML += "></td></tr>";
		            }
		            else {
		               sHTML +="<tr>" +
		            	       "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
		               if ((lheight > 0) && (lwidth > 0)) {
		                  sHTML += "height=" + lheight + " width=" + lwidth + "";
		               }
		               sHTML += "></td><td rowspan=2 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td></tr>";
		            }
		            if (scredit.length > 0) {
		               sHTML += "<tr><td align=right><font size=1 face=verdana>AP: " + scredit + "</font></td></tr>";
		            }
		            else {
		               sHTML += "<tr><td align=right><font size=1 face=verdana>Associated Press</font></td></tr>";
		            }
			    sHTML +="</table>";
		         
		         }
		         else {
	                    sHTML += "<table " + salign + " border=0 ";
	                    if (lwidth > 0) {
	                       sHTML += "width=" + eval(lwidth + 8) + " cellpadding=0 cellspacing=0>";
	                    }
	                    else {
	                       sHTML += "cellpadding=0 cellspacing=0>";
	                    }
	                    if (salign.indexOf("Right") != -1) {
	                       sHTML +="<tr><td rowspan=1 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td>" +
	               	               "<td width=" + eval(lwidth + 2) + "><img src=" + spath + " style='border:1px solid black;' ";  	 
	                       if ((lheight > 0) && (lwidth > 0)) {
	                          sHTML += "height=" + lheight + " width=" + lwidth + "";
	                       }
	                       sHTML += "></td></tr>";
	                    }
	                    else {
	                       sHTML +="<tr>" +
	               	               "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                       if ((lheight > 0) && (lwidth > 0)) {
	                          sHTML += "height=" + lheight + " width=" + lwidth + "";
	                       }
	                       sHTML += "></td><td rowspan=1 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td></tr>";	                 
	                    }
	                    sHTML += "</table>";
		         
		         }
       		      }
       		      else {
       		      //AP Photo Expired
       		        sHTML = ""
       		      }

		   }
		   else {
		     if (scredit== "Rivals.com"){
		     	scredit = "";
		     }
		     //Non AP Photo
		      if ((scredit.length > 0) && (scaption.length > 0) && (filename == "content.asp")) {
	                 sHTML += "<table " + salign + " border=0 ";
	                 if (lwidth > 0) {
	                    sHTML += "width=" + eval(lwidth + 8) + " cellpadding=0 cellspacing=0>";
	                 }
	                 else {
	                    sHTML += " cellpadding=0 cellspacing=0>";
	                 }
	                 if (salign.indexOf("Right") != -1) {
	                    sHTML +="<tr><td rowspan=4 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td>" +
	               	            "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                    if ((lheight > 0) && (lwidth > 0)) {
	                       sHTML += "height=" + lheight + " width=" + lwidth + "";
	                    }
	                    sHTML += "></td></tr>";
	                 }
	                 else {
	                    sHTML +="<tr>" +
	               	            "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                    if ((lheight > 0) && (lwidth > 0)) {
	                       sHTML += "height=" + lheight + " width=" + lwidth + "";
	                    }
	                    sHTML += "></td><td rowspan=4 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td></tr>";	                 
	                 }
	                 sHTML += "<tr><td align=right><font size=1 face=verdana>" + scredit + "</font></td></tr>";
		         sHTML +="<tr><td height=3><img src=http://vmedia.rivals.com/images/spacer1.gif width=1 height=3></td></tr>" +
	                      "<tr><td align=center><font size=1><b>" + scaption  + "</b></font></td></tr></table>";	   
		      }
		      else if ((scaption.length > 0) && (filename == "content.asp")) {
	                 sHTML += "<table " + salign + " border=0 ";
	                 if (lwidth > 0) {
	                    sHTML += "width=" + eval(lwidth + 8) + " cellpadding=0 cellspacing=0>";
	                 }
	                 else {
	                    sHTML += " cellpadding=0 cellspacing=0>";
	                 }
	                 if (salign.indexOf("Right") != -1) {
	                    sHTML +="<tr><td rowspan=3 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td>" +
	              	            "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                    if ((lheight > 0) && (lwidth > 0)) {
	                       sHTML += "height=" + lheight + " width=" + lwidth + "";
	                    }
	                    sHTML += "></td></tr>";
	                 }
	                 else {
	                    sHTML +="<tr>" +
	              	            "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                    if ((lheight > 0) && (lwidth > 0)) {
	                       sHTML += "height=" + lheight + " width=" + lwidth + "";
	                    }
	                    sHTML += "></td><td rowspan=3 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td></tr>";                
	                 }
	                 sHTML +="<tr><td height=3><img src=http://vmedia.rivals.com/images/spacer1.gif width=1 height=3></td></tr>" +
	                         "<tr><td align=center><font size=1><b>" + scaption  + "</b></font></td></tr></table>";	   
		      }
		      else if ((scredit.length > 0) && (filename == "content.asp")) {
	                 sHTML += "<table " + salign + " border=0 ";
	                 if (lwidth > 0) {
	                    sHTML += "width=" + eval(lwidth + 8) + " cellpadding=0 cellspacing=0>";
	                 }
	                 else {
	                    sHTML += "cellpadding=0 cellspacing=0>";
	                 }
	                 if (salign.indexOf("Right") != -1) {
	                    sHTML +="<tr><td rowspan=2 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td>" +
	               	            "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                    if ((lheight > 0) && (lwidth > 0)) {
	                       sHTML += "height=" + lheight + " width=" + lwidth + "";
	                    }
	                    sHTML += "></td></tr>";
	                 }
	                 else {
	                    sHTML +="<tr>" +
	               	            "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                    if ((lheight > 0) && (lwidth > 0)) {
	                       sHTML += "height=" + lheight + " width=" + lwidth + "";
	                    }
	                    sHTML += "></td><td rowspan=2 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td></tr>";	                 
	                 }
	                 sHTML += "<tr><td align=right><font size=1 face=verdana>" + scredit + "</font></td></tr></table>";
	              }    
	              else {  
	                 // Just an image
	                 sHTML += "<table " + salign + " border=0 ";
	                 if (lwidth > 0) {
	                    sHTML += "width=" + eval(lwidth + 8) + " cellpadding=0 cellspacing=0>";
	                 }
	                 else {
	                    sHTML += "cellpadding=0 cellspacing=0>";
	                 }
	                 if (salign.indexOf("Right") != -1) {
	                    sHTML +="<tr><td rowspan=1 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td>" +
	               	            "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                    if ((lheight > 0) && (lwidth > 0)) {
	                       sHTML += "height=" + lheight + " width=" + lwidth + "";
	                    }
	                    sHTML += "></td></tr>";
	                 }
	                 else {
	                    sHTML +="<tr>" +
	               	            "<td width=" + eval(lwidth + 2) + "><img src=http://vmedia.rivals.com" + spath + " style='border:1px solid black;' ";  	 
	                    if ((lheight > 0) && (lwidth > 0)) {
	                       sHTML += "height=" + lheight + " width=" + lwidth + "";
	                    }
	                    sHTML += "></td><td rowspan=1 width=6><img src=http://vmedia.rivals.com/images/spacer1.gif height=3 width=6></td></tr>";	                 
	                 }
	                 sHTML += "</table>";

	              }
		   } 
		   //alert(sHTML + "\n\n" + filename);
		   return sHTML;
		} 
