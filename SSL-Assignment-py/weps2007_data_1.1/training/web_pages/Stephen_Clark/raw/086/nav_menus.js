
<!-- conceal

/********** rollover image swapping from included JS file********/

function imgSwap(Trg,Src)
	{
	if (document.images)
		eval('document.' + Trg + '.src = "' + Src + '";');
	}

var CalledImages = new Array();

function imgCall(Root)
	{
	if (document.images && CalledImages)
		{
		for (var xx=1; xx < imgCall.arguments.length; xx++)
			{
			var oo               = CalledImages.length;
			CalledImages[oo]     = new Image();
			CalledImages[oo].src = Root + imgCall.arguments[xx];
			}
		}
	}

/***** end page funtions **********************/

<!-- conceal
var HomeDefault = ( self.location.href.indexOf('') +1 )
                     ? 'images/nav_home_on.gif'
                     : 'images/nav_home.gif';

var AboutDefault = ( self.location.href.indexOf('/about_us') +1 )
                     ? 'images/nav_about_on.gif'
                     : 'images/nav_about.gif';

var StaffDefault = ( self.location.href.indexOf('/meet_staff') +1 )
                     ? 'images/nav_staff_on.gif'
                     : 'images/nav_staff.gif';

var StoriesDefault = ( self.location.href.indexOf('/success_stories') +1 )
                     ? 'images/nav_stories_on.gif'
                     : 'images/nav_stories.gif';
					 
var AdviceDefault = ( self.location.href.indexOf('/expert_advice') +1)
					? 'images/nav_advice_on.gif'
                    : 'images/nav_advice.gif';			 

					 
var ContactDefault = ( self.location.href.indexOf('/contact_us') +1)
					? 'images/nav_contact_on.gif'
                    : 'images/nav_contact.gif';

var FAQDefault = ( self.location.href.indexOf('/faq') +1 )
                   ? 'images/nav_faqs_on.gif'
                   : 'images/nav_faqs.gif';

var AppointmentDefault = ( self.location.href.indexOf('/make_appointment') +1 )
                   ? 'images/nav_appt_on.gif'
                   : 'images/nav_appt.gif';                                                   

     
function lockMenuItem() {
	imgSwap('nav_home',HomeDefault);
	imgSwap('nav_about',AboutDefault);
	imgSwap('nav_staff',StaffDefault);	
	imgSwap('nav_stories',StoriesDefault);
	imgSwap('nav_advice',AdviceDefault);
	imgSwap('nav_contact',ContactDefault);
	imgSwap('nav_faq',FAQDefault);
	imgSwap('nav_appt',AppointmentDefault);
	imgCall('images/', 'nav_home_on.gif', 'nav_about_on.gif','nav_staff_on.gif','nav_stories_on.gif','nav_advice_on.gif','nav_contact_on.gif','nav_faqs_on.gif','nav_appt_on.gif');
}

function newWindow(page)
	{
	msgWindow=window.open(page,"windowName","width=640,height=480,menubar=yes,status=yes,toolbar=yes,scrollbars=yes,resizable=yes,location=yes")
	}

function stockpop_window(url) {
      if(navigator.userAgent.indexOf("MSIE") == -1) {
        newwindow = window.open(url,'stockpop','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=300,height=300');
        newwindow.focus();
      } else {
        window.open(url,'stockpop','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=300,height=300');
      }
    }


<!-- Random HTML
// Cameron Gregory - http://www.bloke.com/
// http://www.bloke.com/javascript/RandomHTML
// This line and about must remain .. then you can use it for free...
//
// ChangeLog
// Thu Apr 22 09:32:24 EDT 1999
// updated to do Random HTML from AdRotation
//
// Usage:
//  RandomHTML(args)
//  RandomHTMLLong(args,delim)
//     args		delim separated HTML
//     delim		the deliminter (separator)

function RandomHTMLLong(args,delim)
{
/* si: start index 
** i: current index
** ei: end index
** cc: current count
*/
 htmlSet = new Array();
 si = 0; 
 cc=0;
 ei = args.length;
  for (i=1;i<ei;i++) {
    if (args.charAt(i) == delim) {
      htmlSet[cc] = args.substring(si,i);
      cc++;
      si=i+1;
      }
    }
  ind = Math.floor(Math.random() *cc);

  document.write(htmlSet[ind]);
}

function RandomHTML(args)
{
  RandomHTMLLong(args,',');
}
// End Script -->


<!-- Begin preload images
image1 = new Image();
image1.src = "images/hed_logo.gif";
image2 = new Image();
image2.src = "images/spacer.gif";
image3 = new Image();
image3.src = "images/hed_name.gif";
image4 = new Image();
image4.src = "images/hed_shadow_bottom.gif";
image5= new Image();
image5.src = "images/hed_left_locationcurve.gif";
image6 = new Image();
image6.src = "images/hed_location_westla.gif";
image7 = new Image();
image7.src = "images/hed_location_dot.gif";
image8 = new Image();
image8.src = "images/hed_location_westlakevillage.gif";
image9 = new Image();
image9.src = "images/hed_right_locationcurve.gif";
image10 = new Image();
image10.src = "images/hed_right_locationcurve2.gif";
image11 = new Image();
image11.src = "images/hed_logo_bot.gif";
image12 = new Image();
image12.src = "images/nav_home_on.gif";
image13 = new Image();
image13.src = "images/nav_about.gif";
image14 = new Image();
image14.src = "images/nav_staff.gif";
image15 = new Image();
image15.src = "images/nav_stories.gif";
image16 = new Image();
image16.src = "images/nav_advice.gif";
image17 = new Image();
image17.src = "images/nav_contact.gif";
image18 = new Image();
image18.src = "images/nav_faqs.gif";
image19 = new Image();
image19.src = "images/nav_appt.gif";
image20 = new Image();
image20.src = "images/nav_bot.gif";
image21 = new Image();
image21.src = "images/home_tour_btn.gif";
image22 = new Image();
image22.src = "images/home_100off_btn.gif";
image23 = new Image();
image23.src = "images/home_image1.gif";
image24 = new Image();
image24.src = "images/home_title.gif";
image25 = new Image();
image25.src = "images/pic_scioscia.jpg";
image26 = new Image();
image26.src = "images/pic_zeile.jpg";
image27 = new Image();
image27.src = "images/pic_hicks.jpg";
image28 = new Image();
image28.src = "images/pic_kramer.jpg";
image29 = new Image();
image29.src = "images/pic_ohara.jpg";
image30 = new Image();
image30.src = "images/testimonial_scioscia.gif";
image31 = new Image();
image31.src = "images/testimonial_hicks.gif";
image32 = new Image();
image32.src = "images/testimonial_kramer.gif";
image33 = new Image();
image33.src = "images/testimonial_ohara.gif";
image34 = new Image();
image34.src = "images/testimonial_zeile.gif";
image35 = new Image();
image35.src = "images/success_scioscia.gif";
image36 = new Image();
image36.src = "images/success_kramer.gif";
image37 = new Image();
image37.src = "images/success_hicks.gif";
image38 = new Image();
image38.src = "images/success_zeile.gif";
image39 = new Image();
image39.src = "images/success_ohara.gif";
image40 = new Image();
image40.src = "images/home_image2.gif";
image41 = new Image();
image41.src = "images/home_image3.gif";
image42 = new Image();
image42.src = "images/home_image4.gif";
// End -->
function popup() {
        window.open('','popup','height=620,width=520,resizable=yes,scrollbars=no,scrollable=yes');
}

function popupscroll() {
        window.open('','popupscroll','height=280,width=480,resizable=no,scrollbars=yes,scrollable=yes');
}
function popupsite() {
        window.open('','popupsite','height=400,width=600,resizable=yes,scrollbars=yes,scrollable=yes');
}
// reveal -->
