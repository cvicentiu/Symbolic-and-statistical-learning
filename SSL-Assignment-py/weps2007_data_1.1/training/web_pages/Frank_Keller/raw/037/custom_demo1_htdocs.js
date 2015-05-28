//UDMv3.7
//**DO NOT EDIT THIS *****
if (!exclude) { //********
//************************

//updated by Michael Appleby 27 March 2005 to fix baseHREF var 
/*
updated again by Michael Appleby 28 March 2005 to have baseHREF as var baseHREF = "/cfdocs/new-website/LL-WorkingDirs/Templates/" .  This is necessary for http/https security warnings.  But the version of this file in htdocs must give the full absolute URL, i.e.: baseHREF = "http://cf.ll.org etc.  The relative URL does not work because ll.org/cfdocs does not exist, but it is fine to use the absolute link as there is currently no https certificate for https://linguistlist.org.
*/
//updated by Gayathri Sriram 20 Jun 2005: Added Linguistic blogs item under Pubs main item.
//OK: M&G May 26, 2006
//Updated by Michael Appleby 12 jan 2007 to change 2006 issue links to 2007
// *** POSITIONING AND STYLES *********************************************



var menuALIGN = "virtual";	// alignment
var absLEFT = 	0;		// absolute left or right position (if menu is left or right aligned)
var absTOP = 	0; 		// absolute top position

var staticMENU = false;		// static positioning mode (ie5,ie6 and ns4 only)

var stretchMENU = false;		// show empty cells
var showBORDERS = false;		// show empty cell borders


var baseHREF = "/Templates/";	
// base path.  See notes at top of page


var zORDER = 	1000;		// base z-order of nav structure

var mCOLOR = 	"white";	// main nav cell color
var rCOLOR = 	"#ffffff";	// main nav cell rollover color
var bSIZE = 	1;		// main nav border size
var bCOLOR = 	"#black"	// main nav border color
var aLINK = 	"#000066";	// main nav link color
var aHOVER = 	"#9999FF";		// main nav link hover-color (dual purpose)
var aDEC = 	"none";		// main nav link decoration
var fFONT = 	"arial";	// main nav font face
var fSIZE = 	13;		// main nav font size (pixels)
var fWEIGHT = 	"bold"		// main nav font weight
var tINDENT = 	7;		// main nav text indent (if text is left or right aligned)
var vPADDING = 	7;		// main nav vertical cell padding
var vtOFFSET = 	0;		// main nav vertical text offset (+/- pixels from middle)

var keepLIT =	true;		// keep rollover color when browsing menu
var vOFFSET = 	5;		// shift the submenus vertically
var hOFFSET = 	0;		// shift the submenus horizontally

var smCOLOR = 	"#FCE99A";	// submenu cell color
var srCOLOR = 	"#FCE99A";	// submenu cell rollover color
var sbSIZE = 	3;		// submenu border size
var sbCOLOR = 	"#black"	// submenu border color
var saLINK = 	"#000066";	// submenu link color
var saHOVER = 	"#EC0C00";		// submenu link hover-color (dual purpose)
var saDEC = 	"none";		// submenu link decoration
var sfFONT = 	"verdana,arial";// submenu font face
var sfSIZE = 	10;		// submenu font size (pixels)
var sfWEIGHT = 	"normal"	// submenu font weight
var stINDENT = 	5;		// submenu text indent (if text is left or right aligned)
var svPADDING = 1;		// submenu vertical cell padding
var svtOFFSET = 0;		// submenu vertical text offset (+/- pixels from middle)

var shSIZE =	"1";		// submenu drop shadow size
var shCOLOR =	"#cccccc";	// submenu drop shadow color
var shOPACITY = 100;		// submenu drop shadow opacity (not ie4,ns4 or opera)

var keepSubLIT = true;		// keep submenu rollover color when browsing child menu
var chvOFFSET = 0;		// shift the child menus vertically
var chhOFFSET = 0;		// shift the child menus horizontally

var openTIMER = 0;		// menu opening delay time
var closeTIMER = 250;		// menu closing delay time

var cellCLICK = true;		// links activate on TD click
var aCURSOR = "hand";		// cursor for active links (not ns4 or opera)

var altDISPLAY = "";		// where to display alt text
var allowRESIZE = true;		// allow resize/reload

var redGRID = false;		// show a red grid
var gridWIDTH = 0;		// override grid width
var gridHEIGHT = 0;		// override grid height
var documentWIDTH = 0;		// override document width

var hideSELECT = false;		// auto-hide select boxes when menus open (ie only)
var allowForSCALING = true;	// allow for text scaling in mozilla 5


//** LINKS ***********************************************************
if (window.document.level){
	var level = window.document.level.level.value; //hopefully gets this var from the calling page
}
else{ 

	var level = "https://linguistlist.org/";
//this is https: now, just to be sure. MA 28 March 2005
}
var BC = "http://www.brothercake.com/";

var rnd=Math.random();
addMainItem();
	defineSubmenuProperties(150,"right","left",5,0);
	
	addSubmenuItem(level+"people/index.html","People : Area Index","","");
	addSubmenuItem(level+"people/personal/index.html","Directory of Linguists","","");
	addSubmenuItem(level+"search/addresses.html","Email Address Finder","","");
	addSubmenuItem(level+"sp/Societies.html","Societies","","");
	addSubmenuItem(level+"sp/Projects.html","Projects & Research Sites","","");
	addSubmenuItem(level+"sp/Funding.html","Funding Sources","","");
	addSubmenuItem(level+"people/notice/index.html","Noticeboard","","");
	addSubmenuItem(level+"cookbook/index.html","LINGUIST Cookbook","","");

addMainItem();
	defineSubmenuProperties(150,"right","left",0,0);
	addSubmenuItem(level+"jobs/index.html","Jobs: Area Index","","");		
	addSubmenuItem(level+"submitjob.html","Submit a Job","","");		
	addSubmenuItem(level+"jobs/browse-job-current-rs-1.html","Current Jobs","","");
	addSubmenuItem(level+"browsejobs.html","Jobs in Last 12 Months","","");
	addSubmenuItem(level+"support/index.html","Student Support","","");
		

addMainItem();
	defineSubmenuProperties(150,"left","left",0,0);
	addSubmenuItem(level+"callconf/index.html","Call/Conf: Area Index","","");		
	addSubmenuItem("http://linguistlist.org/callconf/add-info1.cfm","Submit Call or Conf","","");		
	addSubmenuItem(level+"callconf/search.html","Search Call/Conf","","");
	addSubmenuItem(level+"callconf/browse-current-Call.html","Current Calls","","");
	addSubmenuItem(level+"callconf/browse-current-Conf.html","Current Confs","","");

addMainItem();
	// define submenu properties (width,"align to edge","text-alignment",v offset,h offset)
	defineSubmenuProperties(150,"left","left",0,0);
	// add submenu link items ("url","Link name","_target","alt text")
	addSubmenuItem(level+"pubs/index.html","Publications: Area Index","","");
	addSubmenuItem(level+"pubs/books/index.html","Books","","");
	addSubmenuItem(level+"pubs/reviews/index.html","Reviews","","");
	addSubmenuItem(level+"pubs/diss/index.html","Dissertation Abstracts","","");
	addSubmenuItem(level+"pubs/papers/index.html","Academic Papers","","");
	addSubmenuItem(level+"pubs/tocs/index.html","Journals & Newsletters","","");
	addSubmenuItem(level+"pubs/publishers.html","Publishers","","");
	addSubmenuItem(level+"sp/Blogs.html","Linguistic Blogs","","");

addMainItem();
	defineSubmenuProperties(166,"left","left",0,0);
	addSubmenuItem(level+"langres/index.html","Lang Resources: Area Index","","");
	addSubmenuItem(level+"sp/LangAnalysis.html","Language Links  -->","","");
	
	defineChildmenuProperties(152,"left","left",-5,4,"","#FDEFC4","#FDEFC4","","","","blue"); 
	addChildmenuItem(level+"sp/LangAnalysis.html#25","Language Metasites","_top","");
	addChildmenuItem(level+"sp/LangAnalysis.html#26","Lang & Lang Families","_top","");
	addChildmenuItem(level+"sp/LangAnalysis.html#13","Constructed Languages","_top","");
	addChildmenuItem(level+"sp/LangAnalysis.html#28","Writing Systems","_top","");
	
	addSubmenuItem(level+"sp/LangNovelties.html","Language Novelties","","");
	addSubmenuItem(level+"forms/langs/find-a-language-or-family.html","Language Search","","");



addMainItem();
	defineSubmenuProperties(150,"left","left",0,0);
	addSubmenuItem(level+"tools/index.html","Tools: Area Index","","");
	addSubmenuItem(level+"sp/Texts.html","Text & Corpora","","");
	addSubmenuItem(level+"sp/Bibs.html","Bibliographies","","");
	addSubmenuItem(level+"sp/Dict.html","Dictionaries","","");
	addSubmenuItem(level+"sp/Style.html","Style Guides","","");
	addSubmenuItem(level+"sp/Software.html","Software","","");
	addSubmenuItem(level+"sp/Fonts.html","Fonts","","");
	addSubmenuItem(level+"sp/Markup.html","Markup Languages","","");

addMainItem();
	defineSubmenuProperties(150,"left","left",0,0);
	addSubmenuItem(level+"teach/index.html","Teaching: Area Index","","");
	addSubmenuItem(level+"teach/programs/index.html","Linguistic Programs","","");
	addSubmenuItem(level+"sp/LingCourse.html","Linguistic Courses","","");
	addSubmenuItem(level+"sp/Exercises.html","Linguistic Exercises","","");
	addSubmenuItem(level+"sp/LangLearnESL.html","ESL & EFL","","");
	addSubmenuItem(level+"sp/LangLearnOther.html","Learning Other Languages","","");

/*Menu items changed by Prashant on 10/14/2004* to add links to issues by topic */

addMainItem();
	defineSubmenuProperties(150,"left","left",0,0);
	addSubmenuItem(level+"lists/index.html","Mailing Lists: Area Index","","");
	addSubmenuItem(level+"issues/index.html","<-- Read LINGUIST List","","");
				defineChildmenuProperties(152,"right","left",-5,4,"","#FDEFC4","#FDEFC4","","","","blue");
				addChildmenuItem(level+"issues/index.html","Last 50 Issues","_top","");
				addChildmenuItem(level+"issues/indices/All2007r.html","All","_top","");
				addChildmenuItem(level+"issues/indices/Books2007r.html","Books","_top","");
				addChildmenuItem(level+"issues/indices/Calls2007r.html","Calls","_top","");
				addChildmenuItem(level+"issues/indices/Confs2007r.html","Confs","_top","");
				addChildmenuItem(level+"issues/indices/Disc2007r.html","Disc","_top","");
				addChildmenuItem(level+"issues/indices/Diss2007r.html","Diss","_top","");
				addChildmenuItem(level+"issues/indices/FYI2007r.html","FYIs","_top","");
				addChildmenuItem(level+"issues/indices/Jobs2007r.html","Jobs","_top","");
				addChildmenuItem(level+"issues/indices/Media2007r.html","Media","_top","");
				addChildmenuItem(level+"issues/indices/Qs2007r.html","Qs","_top","");
				addChildmenuItem(level+"issues/indices/Review2007r.html","Review","_top","");
				addChildmenuItem(level+"issues/indices/Sum2007r.html","Sum","_top","");
				addChildmenuItem(level+"issues/indices/TOC2007r.html","TOC","_top","");
				addChildmenuItem(level+"issues/indices/Support2007r.html","Support","_top","");
				addChildmenuItem(level+"issues/indices/Software2007r.html","Software","_top","");
	addSubmenuItem(level+"index.html","<-- Interact with LINGUIST","","");
				defineChildmenuProperties(152,"right","left",-5,4,"","#FDEFC4","#FDEFC4","","","","blue");
				addChildmenuItem(level+"LL/posttolinguist.html","Post to Linguist","_top","");
				addChildmenuItem(level+"subs.html","Subscribe","_top","");
				addChildmenuItem(level+"LL/WRs/user_input_wr_all.html","Submit Web Link","_top","");
				addChildmenuItem(level+"search.html","Search LINGUIST","_top","");
   addSubmenuItem(level+"lists/index.html","<-- Archived Mailing Lists","","");				
				defineChildmenuProperties(152,"right","left",-5,4,"","#FDEFC4","#FDEFC4","","","","blue");
				addChildmenuItem(level+"lists/get-lists.html","Read Archived Lists","","");
				addChildmenuItem(level+"submitmailinglist.html","Submit Mailing List","","");
				addChildmenuItem(level+"searchmailinglists.html","Search Archived Lists","","");
				
		
	
//	<!--- addChildmenuItem("","Manage Your Subscription","_top",""); --->

addMainItem();
	defineSubmenuProperties(150,"left","left",0,0);
	addSubmenuItem(level+"search/index.html","Search: Area Index","","");
	addSubmenuItem(level+"forms/langs/find-a-language-or-family.html","Language Information","","");
	addSubmenuItem(level+"search.html","LINGUIST LIST Issues","","");
	addSubmenuItem(level+"searchmailinglists.html","Multiple Mailing Lists","","");
	//addSubmenuItem(level+"search/seven-tones.html","Linguistics on The Net","","");
	addSubmenuItem(level+"search/search-all-res1.html","Search LINGUIST Site","","");
	addSubmenuItem(level+"olac/index.html","OLAC Archives","","");








//**DO NOT EDIT THIS *****
}//***********************
//************************
