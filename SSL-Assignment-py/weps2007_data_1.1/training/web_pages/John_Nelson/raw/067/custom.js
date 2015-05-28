//UDMv3.8.4
//**DO NOT EDIT THIS *****
if (!exclude) { //********
//************************


////////////////////////////////////////////////////////////////////////////////////////////////
//
//  ULTIMATE DROPDOWN VERSION 3.7.1 by Brothercake
//  http://www.brothercake.com/dropdown/ 
//
//  Link-wrapping routine by Brendan Armstrong
//  KDE modifications by David Joham
//  Opera reload/resize routine by Michael Wallner
//
////////////////////////////////////////////////////////////////////////////////////////////////


// *** POSITIONING AND STYLES *********************************************


var menuALIGN = "virtual";		// alignment
var absLEFT = 0;
var absTOP = 0;

var staticMENU = false;		// static positioning mode (ie5/6 and ns4 only)

var stretchMENU = false;		// show empty cells
var showBORDERS = false;		// show empty cell borders

var baseHREF =	"/library/resources/";	// base path 
var zORDER = 	1000;		// base z-order of nav structure

var mCOLOR = 	"";	// main nav cell color
var rCOLOR = 	"";	// main nav cell rollover color
var keepLIT =	true;		// keep rollover color when browsing menu
var bSIZE = 	0;		// main nav border size
var bCOLOR = 	""	// main nav border color
var aLINK = 	"";	// main nav link color
var aHOVER = 	"";		// main nav link hover-color (dual purpose)
var aDEC = 	"none";		// main nav link decoration
var fFONT = 	"arial,sans-serif";	// main nav font face		
var fSIZE = 	13;		// main nav font size (pixels)	
var fWEIGHT = 	"bold"		// main nav font weight
var tINDENT = 	0;		// main nav text indent (if text is left or right aligned)
var vPADDING = 	16;		// main nav vertical cell padding
var vtOFFSET = 	0;		// main nav vertical text offset (+/- pixels from middle)

var vOFFSET = 	5;		// shift the submenus vertically
var hOFFSET = 	-3;		// shift the submenus horizontally

var smCOLOR = 	"#818DA2";		// submenu cell color
var srCOLOR = 	"#B50C00";	// submenu cell rollover color
var sbSIZE = 	1;		// submenu border size
var sbCOLOR = 	"#041C46"	// submenu border color
var saLINK = 	"#041C46";	// submenu link color
var saHOVER = 	"#ffffff";		// submenu link hover-color (dual purpose)
var saDEC = 	"none";		// submenu link decoration
var sfFONT = 	"arial";// submenu font face		
var sfSIZE = 	12;		// submenu font size (pixels)	
var sfWEIGHT = 	""	// submenu font weight
var stINDENT = 	2;		// submenu text indent (if text is left or right aligned)
var svPADDING = 2;		// submenu vertical cell padding
var svtOFFSET = 0;		// submenu vertical text offset (+/- pixels from middle)

var shSIZE =	"0";		// menu drop shadow size 
var shCOLOR =	"";	// menu drop shadow color
var shOPACITY = 0;		// menu drop shadow opacity (not ie4/ns4/op5)

var keepSubLIT=	true;		// keep submenu rollover color when browsing child menu	
var chvOFFSET = -3;		// shift the child menus vertically 			
var chhOFFSET = -5;		// shift the child menus horizontally 		

var openTIMER = 0;		// menu opening delay time
var closeTIMER = 330;		// menu closing delay time

var cellCLICK = true;		// links activate on TD click
var aCURSOR = "hand";		// cursor for active links (not ns4 or opera)

var altDISPLAY = "status";		// where to display alt text
var allowRESIZE=true;		// allow resize/reload

var hideSELECT = true;		// auto-hide select boxes when menus open (ie only)
var allowForSCALING = true;	// allow for text scaling in mozilla 5


//** LINKS ***********************************************************








addMainItem(); 

	// define submenu properties (width,"align to edge","text-alignment",v offset,h offset)
	defineSubmenuProperties(130,"left","left",0,0,"");
	
	addSubmenuItem("/landscape.asp","Landscape","","");
	addSubmenuItem("/stillLife.asp","Still life","","");
	addSubmenuItem("/marine.asp","Marine","","");
	addSubmenuItem("/portrait.asp","Portrait","","");	
	addSubmenuItem("/architectural.asp","Architectural","","");
	addSubmenuItem("/abstract.asp","Abstract","","");
	addSubmenuItem("/semi-abstract.asp","Semi-Abstract","","");
	addSubmenuItem("/animals.asp","Animals","","");

addMainItem(); 

	defineSubmenuProperties(130,"left","left",0,0,"");
	
	addSubmenuItem("/gallery.asp","About Red Rag","","");
	addSubmenuItem("/openingTimes.asp","Opening times","","");
	addSubmenuItem("/email.asp","Email","","");
	addSubmenuItem("/telephone.asp","Telephone","","");
	addSubmenuItem("/howToFindUs.asp","How to find us","","");
	addSubmenuItem("/buying.asp","Buying","","");


//**DO NOT EDIT THIS *****
}//***********************
//************************

