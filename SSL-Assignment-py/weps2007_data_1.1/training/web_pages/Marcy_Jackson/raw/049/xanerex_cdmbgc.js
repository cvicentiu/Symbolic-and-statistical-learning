//CODE PROPERTY OF XANEREX.COM ALL RIGHTS RESERVED 2003//

	var NoOffFirstLineMenus=7;			// Number of first level items
	var LowBgColor='336699';			// Background color when mouse is not over
	var LowSubBgColor='cccccc';			// Background color when mouse is not over on subs
	var HighBgColor='6699cc';			// Background color when mouse is over
	var HighSubBgColor='336699';			// Background color when mouse is over on subs
	var FontLowColor='cccccc';			// Font color when mouse is not over
	var FontSubLowColor='003366';			// Font color subs when mouse is not over
	var FontHighColor='white';			// Font color when mouse is over
	var FontSubHighColor='white';			// Font color subs when mouse is over
	var BorderColor='336699';			// Border color
	var BorderSubColor='336699';			// Border color for subs
	var BorderWidth=1;				// Border width
	var BorderBtwnElmnts=1;			// Border between elements 1 or 0
	var FontFamily="arial,comic sans ms,technical"	// Font family menu items
	var FontSize=10;				// Font size menu items
	var FontBold=0;				// Bold menu items 1 or 0
	var FontItalic=0;				// Italic menu items 1 or 0
	var MenuTextCentered='left';			// Item text position 'left', 'center' or 'right'
	var MenuCentered='left';			// Menu horizontal position 'left', 'center' or 'right'
	var MenuVerticalCentered='top';		// Menu vertical position 'top', 'middle','bottom' or static
	var ChildOverlap=.2;				// horizontal overlap child/ parent
	var ChildVerticalOverlap=.2;			// vertical overlap child/ parent
	var StartTop=104;				// Menu offset x coordinate
	var StartLeft=25;				// Menu offset y coordinate
	var VerCorrect=0;				// Multiple frames y correction
	var HorCorrect=0;				// Multiple frames x correction
	var LeftPaddng=3;				// Left padding
	var TopPaddng=2;				// Top padding
	var FirstLineHorizontal=1;			// SET TO 1 FOR HORIZONTAL MENU, 0 FOR VERTICAL
	var MenuFramesVertical=1;			// Frames in cols or rows 1 or 0
	var DissapearDelay=1000;			// delay before menu folds in
	var TakeOverBgColor=1;			// Menu frame takes over background color subitem frame
	var FirstLineFrame='navig';			// Frame where first level appears
	var SecLineFrame='space';			// Frame where sub levels appear
	var DocTargetFrame='space';			// Frame where target documents appear
	var TargetLoc='';				// span id for relative positioning
	var HideTop=0;				// Hide first level when loading new document 1 or 0
	var MenuWrap=1;				// enables/ disables menu wrap 1 or 0
	var RightToLeft=0;				// enables/ disables right to left unfold 1 or 0
	var UnfoldsOnClick=0;			// Level 1 unfolds onclick/ onmouseover
	var WebMasterCheck=0;			// menu tree checking on or off 1 or 0
	var ShowArrow=0;				// Uses arrow gifs when 1
	var KeepHilite=1;				// Keep selected path highligthed
	var Arrws=0;	// Arrow source, width and height

function BeforeStart(){return}
function AfterBuild(){return}
function BeforeFirstOpen(){return}
function AfterCloseAll(){return}


// Menu tree
//	MenuX=new Array(Text to show, Link, background image (optional), number of sub elements, height, width);
//	For rollover images set "Text to show" to:  "rollover:Image1.jpg:Image2.jpg"

Menu1=new Array("Home","http://www.danmarrclub.org/index.html","",0,18,100);

Menu2=new Array("Club Info","http://www.danmarrclub.org/clubinfo.html","",8,20,110);
	Menu2_1=new Array("Hours of Operation","http://www.danmarrclub.org/clubinfo/hoursofoperation.html","",0,18,125);
	Menu2_2=new Array("Membership","http://www.danmarrclub.org/clubinfo/membership.html","",0,18,110);
	Menu2_3=new Array("Facilities","http://www.danmarrclub.org/clubinfo/facilities.html","",0,18,110);
	Menu2_4=new Array("Community Involvement","http://www.danmarrclub.org/clubinfo/communityinvolvement.html","",0,18,110);
	Menu2_5=new Array("Board of Directors","http://www.danmarrclub.org/clubinfo/boardmembers.html","",0,18,150);
	Menu2_6=new Array("Staff Directory","http://www.danmarrclub.org/clubinfo/staffdirectory.html","",0,18,150);
    Menu2_7=new Array("Job Opportunities","http://www.danmarrclub.org/clubinfo/jobopportunities.html","",0,18,150);
	Menu2_8=new Array("Directions","http://www.danmarrclub.org/contact/directions.html","",0,18,150);


Menu3=new Array("Programs","http://www.danmarrclub.org/programs.html","",10,18,115);
	Menu3_1=new Array("Aquatics","http://www.danmarrclub.org/programs/aquatics.html","",0,18,150);
	Menu3_2=new Array("Arts","http://www.danmarrclub.org/programs/arts.html","",0,18,150);
	Menu3_3=new Array("Athletics","http://www.danmarrclub.org/programs/athletics.html","",0,18,150);
	Menu3_4=new Array("Childcare","http://www.danmarrclub.org/programs/childcare.html","",0,18,150);
	Menu3_5=new Array("Education","http://www.danmarrclub.org/programs/education.html","",0,18,150);
	Menu3_6=new Array("Kids Café","http://www.danmarrclub.org/programs/kidscafe.html","",0,18,150);
    Menu3_7=new Array("Social Recreation","http://www.danmarrclub.org/programs/socialrecreation.html","",0,18,150);
	Menu3_8=new Array("Teen Programs","http://www.danmarrclub.org/programs/teenprograms.html","",0,18,150);
	Menu3_9=new Array("Technology","http://www.danmarrclub.org/programs/technology.html","",0,18,150);
	Menu3_10=new Array("Special Events","http://www.danmarrclub.org/programs/specialeventskids.html","",0,18,150);

Menu4=new Array("Contribute","http://www.danmarrclub.org/howyoucanhelp.html","",4,18,115);
	Menu4_1=new Array("Donate by Phone","http://www.cdmbgc.org/howyoucanhelp/donatebyphone.html","",0,18,150);
	Menu4_2=new Array("Donate by Mail","http://www.cdmbgc.org/howyoucanhelp/donatebymail.html","",0,18,150);
	Menu4_3=new Array("Donate Online","http://www.cdmbgc.org/howyoucanhelp/donateonline.html","",0,18,150);
	Menu4_4=new Array("Donate Items","http://www.cdmbgc.org/howyoucanhelp/donateitems.html","",0,18,150);

Menu5=new Array("Special Events","http://www.danmarrclub.org/specialevents.html","",6,18,125);
	Menu5_1=new Array("Grand Drawing","http://www.danmarrclub.org/specialevents/granddrawing.html","",0,18,160);
	Menu5_2=new Array("N.E. Women's Leadership","http://www.danmarrclub.org/specialevents/newla.html","",0,18,150);
	Menu5_3=new Array("McLaughlin Golf Tourn.","http://www.danmarrclub.org/specialevents/mclaughlingolf.html","",0,18,150);
	Menu5_4=new Array("Marr Club Golf Tourn.","http://www.danmarrclub.org/specialevents/marrgolf.html","",0,18,150);
	Menu5_5=new Array("Rodman Ride for Kids","http://www.danmarrclub.org/specialevents/rodmanride.html","",0,18,150);
	Menu5_6=new Array("Boston Marathon","http://www.danmarrclub.org/specialevents/bostonmarathon.html","",0,18,150);

Menu6=new Array("Volunteer","http://www.cdmbgc.org/howyoucanhelp/volunteer.html","",0,18,95);
	
Menu7=new Array("Alumni","http://www.cdmbgc.org/alumni.html","",0,18,95);
	