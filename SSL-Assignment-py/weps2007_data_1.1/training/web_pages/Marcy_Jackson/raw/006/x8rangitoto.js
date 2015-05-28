/* x8dublin.js */

	var FirstLineHorizontal=1; //set menu layout (1=horizontal, 0=vertical)
	var StartTop=94; //set vertical offset
	var StartLeft=90; //set horizontal offset	
	var menuwidthchildren = 160; //set the width of child menus
	var placeholder=1 //creates a transparent image to reserve space for the menu in the layout where the x8menus.asp file is placed
	var MenuCentered='left';				
// arrows for menus that contain children
	var arrowRight = 'images/x8menus_arrow_right_lt.gif'; //white arrows
	var arrowDown = 'images/x8menus_arrow_down_lt.gif'; //white arrows
//	var arrowRight = 'images/x8menus_arrow_right_dk.gif'; //dark arrows
//	var arrowDown = 'images/x8menus_arrow_down_dk.gif'; //dark arrows

	
// menu look and feel

 	var LowBgColor='#8AACB1';
	var LowSubBgColor='#8AACB1';			// Background color when mouse is not over on subs
	var HighBgColor='black';
	var HighSubBgColor='black';			// Background color when mouse is over on subs
	var FontLowColor='white';
	var FontSubLowColor='white';
	var FontHighColor='white';
	var FontSubHighColor='white';
	var BorderColor='#191970'; //must = transparent to allow transparency effect when useFilterOnMain=1
	var BorderSubColor='#FFFFFF'; //must = transparent to allow transparency effect when useFilterOnSubs=1
	var menuheight = 21;
	var menuwidth = 168;
	var containerheight = (FirstLineHorizontal==0)?(NoOffFirstLineMenus*(menuheight+BorderWidth)):(menuheight+BorderWidth*.5);
	var containerwidth = (FirstLineHorizontal==0)?(menuwidth+(BorderWidth*1)):(NoOffFirstLineMenus*menuwidth);
	var LeftPaddng=10;
	var TopPaddng=4;	
	var FontFamily="tahoma, ms sans serif, verdana"
	var FontSize=8;
	var FontBold=1;
	var FontItalic=0;
	var MenuTextCentered=0;
	var UnfoldsOnClick=0;			// Level 1 unfolds onclick/ onmouseover


// background image. For rollover effect, assign the rollover image to the ImageOver variable	
	var useMenuBackgroundImage=0; //1 expects a background image for the menu, 0 does not.
	var menuBackgroundImage='images/chrome_blue.jpg';
	var menuBackgroundImageOver='images/chrome_green.jpg';

	//allows filter effects, e.g transparency is achieved with alpha (IE 5 only)
	var useFilterOnMain=0; // 0=off, 1=On This enables transparency on the top level menus only
	var mainFilter="alpha(opacity=50)"; // values from 0-100 accepted
	var useFilterOnSubs=1; // 0=off, 1=On This enables transparency on the sub menus only
	var subsFilter="alpha(opacity=85)"; // values from 0-100 accepted

    var useCSSBorders=1;
     //if using CSS borders, these styles are applied (NS6+/IE5+)
    var borderWidthCSS="1px";
	var borderStyle='solid';

	var borderTopColor='#FFFFFF';
	var borderRightColor='#000000';
	var borderBottomColor='#000000';
	var borderLeftColor='#FFFFFF';

	var BorderWidth=0;				// Border width
	var BorderBtwnElmnts=0;			// Border between elements 1 or 0 turns border separation on or off

	var MenuTextCentered='left';			// Item text position 'left', 'center' or 'right'
	var MenuVerticalCentered='top';		// Menu vertical position 'top', 'middle' or 'bottom'
	var ChildOverlap=0;				// horizontal overlap child/ parent
	var ChildVerticalOverlap=0;			// vertical overlap child/ parent
	var VerCorrect=0;				// Multiple frames y correction
	var HorCorrect=0;				// Multiple frames x correction
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
	var WebMasterCheck=0;			// menu tree checking on or off 1 or 0
var wrapHeight = 1.6;

function BeforeStart(){return}

function AfterBuild(){return}
