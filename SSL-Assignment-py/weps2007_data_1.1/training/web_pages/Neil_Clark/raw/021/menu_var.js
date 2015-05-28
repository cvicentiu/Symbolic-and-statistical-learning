/***********************************************************************************
*	(c) Ger Versluis 2000 version 5.41 24 December 2001	          *
*	For info write to menus@burmees.nl		          *
*	You may remove all comments for faster loading	          *		
***********************************************************************************/

	var NoOffFirstLineMenus=8;			// Number of first level items
	var LowBgColor='#FFFFFF';			// Background color when mouse is not over
	var LowSubBgColor='#FFFFFF';			// Background color when mouse is not over on subs
	var HighBgColor='black';			// Background color when mouse is over
	var HighSubBgColor='black';			// Background color when mouse is over on subs
	var FontLowColor='000080';			// Font color when mouse is not over
	var FontSubLowColor='000080';			// Font color subs when mouse is not over
	var FontHighColor='#FFFFFF';			// Font color when mouse is over
	var FontSubHighColor='#FFFFFF';		// Font color subs when mouse is over
	var BorderColor='white';			// Border color
	var BorderSubColor='black';			// Border color for subs
	var BorderWidth=1;				// Border width
	var BorderBtwnElmnts=1;			      // Border between elements 1 or 0
	var FontFamily="verdana, arial,technical"	// Font family menu items
	var FontSize=10;				      // Font size menu items
	var FontBold=1;				      // Bold menu items 1 or 0
	var FontItalic=0;				      // Italic menu items 1 or 0
	var MenuTextCentered='left';		// Item text position 'left', 'center' or 'right'
	var MenuCentered='left';			// Menu horizontal position 'left', 'center' or 'right'
	var MenuVerticalCentered='top';		// Menu vertical position 'top', 'middle','bottom' or static
	var ChildOverlap=.05;				// horizontal overlap child/ parent
	var ChildVerticalOverlap=.2;			// vertical overlap child/ parent
	var StartTop=255;				      // Menu offset x coordinate
	var StartLeft=52;				      // Menu offset y coordinate
	var VerCorrect=0;				      // Multiple frames y correction
	var HorCorrect=0;				      // Multiple frames x correction
	var LeftPaddng=1;				      // Left padding
	var TopPaddng=1;				      // Top padding
	var FirstLineHorizontal=0;			// SET TO 1 FOR HORIZONTAL MENU, 0 FOR VERTICAL
	var MenuFramesVertical=0;			// Frames in cols or rows 1 or 0
	var DissapearDelay=1000;			// delay before menu folds in
	var TakeOverBgColor=1;			      // Menu frame takes over background color subitem frame
	var FirstLineFrame='navig';			// Frame where first level appears
	var SecLineFrame='space';			// Frame where sub levels appear
	var DocTargetFrame='space';			// Frame where target documents appear
	var TargetLoc='';				      // span id for relative positioning
	var HideTop=0;				      // Hide first level when loading new document 1 or 0
	var MenuWrap=1;				      // enables/ disables menu wrap 1 or 0
	var RightToLeft=0;				// enables/ disables right to left unfold 1 or 0
	var UnfoldsOnClick=0;			      // Level 1 unfolds onclick/ onmouseover
	var WebMasterCheck=0;			      // menu tree checking on or off 1 or 0
	var ShowArrow=0;				      // Uses arrow gifs when 1
	var KeepHilite=1;				      // Keep selected path highligthed
	var Arrws=['tri.gif',5,10,'tridown.gif',10,5,'trileft.gif',5,10];	// Arrow source, width and height

function BeforeStart(){return}
function AfterBuild(){return}
function BeforeFirstOpen(){return}
function AfterCloseAll(){return}


// Menu tree
//	MenuX=new Array(Text to show, Link, background image (optional), number of sub elements, height, width);
//	For rollover images set "Text to show" to:  "rollover:Image1.jpg:Image2.jpg"

Menu1=new Array("Home","http://www.nwha.com","",0,25,150);

Menu2=new Array("The NWHA","http://www.nwha.com/about.html","",0,25,150);

Menu3=new Array("Membership","http://www.nwha.com/membership.html","",0,25,150);

Menu4=new Array("NWHA Programs","","",4,25,150);
	
        Menu4_1=new Array("All Programs","http://www.nwha.com/programs","",0,20,175);

        Menu4_2=new Array("Trail Rider Program","http://www.nwha.com/programs/trailrider.html","",0);

        Menu4_3=new Array("Lifetime Achievement","http://www.nwha.com/programs/lifetime.html","",0);

        Menu4_4=new Array("Youth Program","http://www.nwha.com/programs/youth.html","",0);


Menu5=new Array("NWHA News","http://www.nwha.com/news.html","",0,25,150);

Menu6=new Array("Marketplace","","",5,25,150);

	Menu6_1=new Array("NWHA Merchandise","http://www.nwha.com/shop","",0,20,175);

	Menu6_2=new Array("Stable Directory","http://www.nwha.com/links.html","",0);

	Menu6_3=new Array("Stallions","http://www.nwha.com/stallions.html","",0);

        Menu6_4=new Array("Horses For Sale","http://www.nwha.com/forsale.html","",0);
       
        Menu6_5=new Array("Business Listings","http://www.nwha.com/linkbusiness.html","",0);

Menu7=new Array("Affiliates","","",3,25,150);

        Menu7_1=new Array("Affilated Horse Shows","http://www.nwha.com/affiliates/shows.html","",0,20,175);
	Menu7_2=new Array("Affiliating Organizations","http://www.nwha.com/affiliates/affiliates.html","",0,20,175);
        Menu7_3=new Array("Affiliate Benefits","http://www.nwha.com/affiliates","",0,20,175);
Menu8=new Array("Tracking Registry","http://www.nwha.com/nwhatr.html","",0,25,150);