
 var now = new Date();
 if (now.getYear() <100) myYear="20" + now.getYear();  else myYear=now.getYear();
 NewYear = myYear.toString().substr(2,2);     
 var dayName = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")
 var monthName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
 if (myYear == 100){myYear = 2000}
 if (myYear == 101){myYear = 2001}
 var TodayIs = dayName[now.getDay()] + " " + now.getDate() + " " + monthName[now.getMonth()] + " " + NewYear;

//The following line is critical for menu operation, and MUST APPEAR ONLY ONCE. If you have more than one menu_array.js file rem out this line in subsequent files
menunum=0;menus=new Array();_d=document;function addmenu(){menunum++;menus[menunum]=menu;}function dumpmenus(){mt="<script language=javascript>";for(a=1;a<menus.length;a++){mt+=" menu"+a+"=menus["+a+"];"}mt+="<\/script>";_d.write(mt)}
//Please leave the above line intact. The above also needs to be enabled if it not already enabled unless this file is part of a multi pack.

function HideShowDiv(divID, state)  // state: 0 = hidden, 1 = visible
{
  var stateStr = ["hidden", "visible"];
  document.getElementById(divID).style.visibility = stateStr[state];
}


function onFunction()
{
  HideShowDiv(services, 0);
}

function offFunction()
{
  HideShowDiv(services, 1);
}
function GradPopUp() {
  OpenWin = this.open('graduate/flash.asp', "CtrlWindow", "top=50,left=50,height=554px,width=786px,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=yes");
}
	  

////////////////////////////////////
// Editable properties START here //
////////////////////////////////////

if(navigator.appVersion.indexOf("MSIE 6.0")>0)
{
	effect = "Fade(duration=0.2);Alpha(style=0,opacity=100);Shadow(color='#FFFFFF', Direction=135, Strength=0)"
}
else
{
	effect = "Shadow(color='#FFFFFF', Direction=135, Strength=0)" 
}


timegap=500				// The time delay for menus to remain visible
followspeed=5			// Follow Scrolling speed
followrate=40			// Follow Scrolling Rate
suboffset_top=0;		// Sub menu offset Top position 
suboffset_left=-5;		// Sub menu offset Left position

style1=[				// style1 is an array of properties. You can have as many property arrays as you need. This means that menus can have their own style.
"8e935f",				// Mouse Off Font Color
"FFFFFF",				// Mouse Off Background Color
"ffffff",				// Mouse On Font Color
"e4740a",				// Mouse On Background Color
"d2d3b7",				// Menu Border Color 
10,						// Font Size in pixels
"normal",				// Font Style (italic or normal)
"normal",				// Font Weight (bold or normal)
"Arial, Verdana",		// Font Name
3,						// Menu Item Padding
,						// Sub Menu Image (Leave this blank if not needed)
,						// 3D Border & Separator bar
,						// 3D High Color
,						// 3D Low Color
,				        // Current Page Item Font Color (leave this blank to disable)
,                       // Current Page Item Background Color (leave this blank to disable)
,						// Top Bar image (Leave this blank to disable)
"000099",				// Menu Header Font Color (Leave blank if headers are not needed)
"ffffff",				// Menu Header Background Color (Leave blank if headers are not needed)
]



addmenu(menu=[		// This is the array that contains your menu properties and details
"mainmenu",			// Menu Name - This is needed in order for the menu to be called
98,					// Menu Top - The Top position of the menu in pixels
133,				// Menu Left - The Left position of the menu in pixels
96,					// Menu Width - Menus width in pixels
1,					// Menu Border Width 
,					// Screen Position - here you can use "center;left;right;middle;top;bottom" or a combination of "center:middle"
style1,				// Properties Array - this is set higher up, as above
1,					// Always Visible - allows the menu item to be visible at all time (1=on/0=off)
"left", 			// Alignment - sets the menu elements text alignment, values valid here are: left, right or center
effect,				// Filter - Text variable for setting transitional effects on menu activation - see above for more info
,					// Follow Scrolling - Tells the menu item to follow the user down the screen (visible at all times) (1=on/0=off)
1, 					// Horizontal Menu - Tells the menu to become horizontal instead of top to bottom style (1=on/0=off)
,					// Keep Alive - Keeps the menu visible until the user moves over another menu or clicks elsewhere on the page (1=on/0=off)
,					// Position of TOP sub image left:center:right
,					// Set the Overall Width of Horizontal Menu to 100% and height to the specified amount (Leave blank to disable)
,					// Right To Left - Used in Hebrew for example. (1=on/0=off)
,					// Open the Menus OnClick - leave blank for OnMouseover (1=on/0=off)
"Stu",					// ID of the div you want to hide on MouseOver (useful for hiding form elements)
,					// Reserved for future use
,					// Reserved for future use
,					// Reserved for future use
,"HOME","secserv.asp?page=home&sid=135",,"Home",1 // "Description Text", "URL", "Alternate URL", "Status", "Separator Bar"
,"WHO&nbsp;WE&nbsp;ARE&nbsp;&nbsp;","show-menu=who",,"Who We Are",1
,"WHAT&nbsp;WE&nbsp;DO","show-menu=what",,"What We Do",1
,"OFFICES","show-menu=offices",,"Olswang Offices",1
,"NEWS","show-menu=news",,"News",1
,"PUBLICATIONS","secserv.asp?page=news&sid=358",,"PUBLICATIONS",1
//,"PUBLICATIONS","show-menu=news",,"Publications",1
,"CAREERS","show-menu=careers",,"Careers",1
//,TodayIs.toUpperCase(),"",,"",1
])

	addmenu(menu=["who",
	,,120,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"INTRODUCTION","secserv.asp?page=introduction&sid=138",,"Introduction",1
	,"PEOPLE","show-menu=csr","team.asp?sid=133&page=people&letter=a","People",1
	,"INTERNATIONAL","show-menu=gt","international.asp?page=news&sid=658","International",1
	])

	addmenu(menu=["what",
	,,120,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"SECTORS","show-menu=sectors",,"Sectors",1
	,"SERVICES","show-menu=services",,"Services",1
	])
	
	addmenu(menu=["csr",
	,,200,1,"",style1,,"left",effect,,,,,,,,,,,,
	,"DIVERSITY DATA","secserv.asp?page=secserv&sid=1058",,"Diversity Data",1
	,"OLSWANG CORPORATE SOCIAL RESPONSIBILITY POLICY 2006","pdfs/csr_manual.pdf target=_blank",,"CSR Diversity Data",1
	
	])
	
		addmenu(menu=["services",
		,,240,1,"",style1,,"left",effect,,,,,,,,,,,,
		,"BANKING & INSOLVENCY","secserv.asp?page=secserv&sid=116",,"Banking & Insolvency",1
		,"COMMERCIAL DISPUTE RESOLUTION","show-menu=arb","secserv.asp?page=secserv&sid=118","Commercial Dispute Resolution",1
		,"CORPORATE","show-menu=corporate","secserv.asp?page=secserv&sid=119","Corporate",1		
		,"COMPANY SECRETARIAL SERVICES","secserv.asp?page=secserv&sid=120",,"Company Secretarial Services",1
		,"DATA PROTECTION","secserv.asp?page=secserv&sid=121",,"Data Protection",1
		,"EMPLOYEE BENEFITS","secserv.asp?page=secserv&sid=130",,"Employee Benefits",1
		,"EMPLOYMENT","secserv.asp?page=secserv&sid=122",,"Employment",1
		,"EU & COMPETITION","secserv.asp?page=secserv&sid=123",,"EU & Competition",1
		,"INTELLECTUAL PROPERTY","secserv.asp?page=secserv&sid=102",,"Intellectual Property",1
		,"JUDICIAL REVIEW & PUBLIC LAW","secserv.asp?page=secserv&sid=558",,"Judicial Review & Public Law",1
		,"MEDIA LITIGATION","secserv.asp?page=secserv&sid=125",,"Media Litigation",1
		,"IT & OUTSOURCING","secserv.asp?page=secserv&sid=126",,"Outsourcing",1
		,"PATENTS","secserv.asp?page=secserv&sid=127",,"Patents",1		
		,"PRIVATE EQUITY / VENTURE CAPITAL","secserv.asp?page=secserv&sid=128",,"Private Equity & Venture Capital",1
		,"REAL ESTATE LITIGATION","secserv.asp?page=secserv&sid=129",,"Property Litigation",1
		,"TAX","secserv.asp?page=secserv&sid=131",,"Tax",1
		,"TRADE MARKS","secserv.asp?page=secserv&sid=132",,"Trade Marks",1
		])
		
			addmenu(menu=["corporate",
			,,232,1,"",style1,,"left",effect,,,,,,,,,,,,
			,"CORPORATE FINANCE","secserv.asp?page=secserv&sid=144",,"Corporate Finance",1
			,"CORPORATE REAL ESTATE","secserv.asp?page=secserv&sid=147",,"Corporate Property",1
			,"FUNDRAISINGS","secserv.asp?page=secserv&sid=145",,"Fundraisings",1
			,"INVESTMENT FUNDS","secserv.asp?page=secserv&sid=1358",,"Investment Funds",1
			,"JOINT VENTURES","secserv.asp?page=secserv&sid=146",,"Joint Ventures",1
			,"MERGERS & ACQUISITIONS","secserv.asp?page=secserv&sid=143",,"Mergers & Acquisitions",1
			,"RECONSTRUCTIONS / REORGANISATIONS","secserv.asp?page=secserv&sid=148",,"Reconstructions / Reorganisations",1
			])

		addmenu(menu=["sectors",
		,,220,1,"",style1,,"left",effect,,,,,,,,,,,,
		,"BETTING & GAMING","secserv.asp?page=secserv&sid=110",,"Betting & Gaming",1
		,"BIOSCIENCES","secserv.asp?page=secserv&sid=112",,"Biosciences",1
		//,"ENERGY","secserv.asp?page=secserv&sid=109",,"Energy",1
		,"INFORMATION TECHNOLOGY","secserv.asp?page=secserv&sid=103",,"Information Technology",1
		,"INTERNET & E-COMMERCE","secserv.asp?page=secserv&sid=101",,"Internet & E-Commerce",1	
		,"MEDIA & ENTERTAINMENT","secserv.asp?page=secserv&sid=153",,"Media & Entertainment",1
		,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FILM","secserv.asp?page=secserv&sid=105",,"Film",1
		,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MARKETING SERVICES","secserv.asp?page=secserv&sid=104",,"Marketing Services",1
		,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MUSIC","secserv.asp?page=secserv&sid=106",,"Music",1
		,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PUBLISHING","secserv.asp?page=secserv&sid=107",,"Publishing",1
		,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TV & RADIO","secserv.asp?page=secserv&sid=108",,"TV & Radio",1
		,"REAL ESTATE","secserv.asp?page=secserv&sid=100",,"Real Estate",1
		,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CONSTRUCTION & DEVELOPMENT","secserv.asp?page=secserv&sid=141",,"Construction & Development",1
		,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INVESTMENT","secserv.asp?page=secserv&sid=140",,"Investment",1
		,"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PLANNING & REGENERATION","secserv.asp?page=secserv&sid=142",,"Planning",1
		,"SPORT","secserv.asp?page=secserv&sid=111",,"Sport",1
		,"TELECOMMUNICATIONS","secserv.asp?page=secserv&sid=114",,"Telecommunications",1
		])
		
			addmenu(menu=["media",
			,,130,1,"",style1,,"left",effect,,,,,,,,,,,,
			,"FILM","secserv.asp?page=secserv&sid=105",,"Film",1
			,"MARKETING SERVICES","secserv.asp?page=secserv&sid=104",,"Marketing Services",1
			,"MUSIC","secserv.asp?page=secserv&sid=106",,"Music",1
			,"PUBLISHING","secserv.asp?page=secserv&sid=107",,"Publishing",1
			,"TV & RADIO","secserv.asp?page=secserv&sid=108",,"TV & Radio",1
			])
			
			addmenu(menu=["leisure",
			,,115,1,"",style1,,"left",effect,,,,,,,,,,,,
			,"BETTING & GAMING","secserv.asp?page=secserv&sid=110",,"Betting & Gaming",1
			,"SPORT","secserv.asp?page=secserv&sid=111",,"Sport",1
			])
			
			addmenu(menu=["property",
			,,192,1,"",style1,,"left",effect,,,,,,,,,,,,
			,"CONSTRUCTION & DEVELOPMENT","secserv.asp?page=secserv&sid=141",,"Construction & Development",1
			,"INVESTMENT","secserv.asp?page=secserv&sid=140",,"Investment",1
			,"PLANNING & REGENERATION","secserv.asp?page=secserv&sid=142",,"Planning",1
			])
			
			addmenu(menu=["gt",
			,,160,1,"",style1,,"left",effect,,,,,,,,,,,,
			,"GREENBERG TRAURIG LLP","secserv.asp?page=secserv&sid=758",,"Greenberg Traurig LLP",1
			])
			
			addmenu(menu=["arb",
			,,100,1,"",style1,,"left",effect,,,,,,,,,,,,
			,"INTERNATIONAL ARBITRATION","secserv.asp?page=secserv&sid=858",,"International Arbitration",1
			])
		
	addmenu(menu=["news",,,140,1,,style1,0,"left",effect,0,,,,,,,,,,,
	,"PRESS RELEASES","news.asp?page=newsall&sid=136",,"Olswang Press Releases",1
	//,"SEMINAR INFORMATION","secserv.asp?page=news&sid=258",,"SEMINAR INFORMATION",1
	//,"PUBLICATIONS","secserv.asp?page=news&sid=358",,"PUBLICATIONS",1
	])
	
	addmenu(menu=["careers",
	,,170,1,"",style1,,"",effect,,,,,,,,,,,,
	,"OVERVIEW", "secserv.asp?page=secserv&sid=149",,"Careers Overview",1
	,"TRAINEE SOLICITOR RECRUITMENT", "secserv.asp?page=secserv&sid=151",,"Graduate Recruitment",1
	,"LEGAL OPPORTUNITIES", "secserv.asp?page=secserv&sid=150",,"Legal Opportunities",1
	//,"[NEW LATERAL HIRE SECTION]", "secserv.asp?page=secserv&sid=562",,"[Recruitment]",1
	])
	
	addmenu(menu=["offices",
	,,100,1,"",style1,,"",effect,,,,,,,,,,,,
	,"LONDON", "contact.asp?page=contact&sid=137&office=london",,"London Office Details",1
	,"THAMES VALLEY", "contact.asp?page=contact&sid=137&office=thamesvalley",,"Thames Valley Office Details",1
	,"BRUSSELS", "contact.asp?page=contact&sid=137&office=brussels",,"Brussels Office Details",1
	,"BERLIN", "contact.asp?page=contact&sid=137&office=berlin",,"Berlin Office Details",1
	,"INTERNATIONAL","show-menu=gt","international.asp?page=news&sid=658","International",1
	])
	
		addmenu(menu=["brussels",
		,,140,1,"",style1,,"left",effect,,,,,,,,,,,,
		,"EUROPEAN LAW","secserv.asp?page=secserv&sid=xxx",,,1
		,"COMPETITION","secserv.asp?page=secserv&sid=xxx",,,1
		,"REGULATORY","secserv.asp?page=secserv&sid=xxx",,,1
		,"BELGIAN LAW PRACTICE","secserv.asp?page=secserv&sid=xxx",,,1
			])
	
	
dumpmenus()