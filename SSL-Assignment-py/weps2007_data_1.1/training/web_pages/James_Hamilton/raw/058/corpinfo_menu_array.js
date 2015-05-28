
/*
<meta name="CONTENT_OWNER" content="Alan Nasuti">
<meta name="DESCRIPTION" content="">
<meta name="KEYWORDS" content="">


 Milonic DHTML Website Navigation Menu - Version 3.5
 Written by Andy Woolley - Copyright 2002 (c) Milonic Solutions Limited. All Rights Reserved.
 Please visit http://www.milonic.co.uk/menu or e-mail menu3@milonic.com for more information.

 The Free use of this menu is only available to Non-Profit, Educational & Personal web sites.
 Commercial and Corporate licenses  are available for use on all other web sites & Intranets.
 All Copyright notices MUST remain in place at ALL times and, please keep us informed of your
 intentions to use the menu and send us your URL.
*/


//The following line is critical for menu operation, and MUST APPEAR ONLY ONCE. If you have more than one menu_array.js file rem out this line in subsequent files
//menunum=0;menus=new Array();_d=document;function addmenu(){menunum++;menus[menunum]=menu;}function dumpmenus(){mt="<script language=javascript>";for(a=1;a<menus.length;a++){mt+=" menu"+a+"=menus["+a+"];"}mt+="<\/script>";_d.write(mt)}
//Please leave the above line intact. The above also needs to be enabled if it not already enabled unless this file is part of a multi pack.



////////////////////////////////////
// Editable properties START here //
////////////////////////////////////

// Special effect string for IE5.5 or above please visit http://www.milonic.co.uk/menu/filters_sample.php for more filters
effect = "Fade(duration=0.2);Alpha(style=0,opacity=88);Shadow(color='#777777', Direction=135, Strength=5)"

timegap=500			// The time delay for menus to remain visible
followspeed=5		// Follow Scrolling speed
followrate=30		// Follow Scrolling Rate
suboffset_top=5;	// Sub menu offset Top position
suboffset_left=5;	// Sub menu offset Left position

style1=[			// style1 is an array of properties. You can have as many property arrays as you need. This means that menus can have their own style.
"5A5A5A",			// Mouse Off Font Color
"FFFFFF",			// Mouse Off Background Color
"E85900",				// Mouse On Font Color
"FFFFFF",			// Mouse On Background Color
"f0f0f0",			// Menu Border Color
10,					// Font Size in pixels
"normal",			// Font Style (italic or normal)
"bold",				// Font Weight (bold or normal)
"Verdana",			// Font Name
2,					// Menu Item Padding
"",					// Sub Menu Image (Leave this blank if not needed)
,					// 3D Border & Separator bar
"66ffff",			// 3D High Color
"000099",			// 3D Low Color
"Purple",			// Current Page Item Font Color (leave this blank to disable)
"pink",				// Current Page Item Background Color (leave this blank to disable)
"",					// Top Bar image (Leave this blank to disable)
"ffffff",			// Menu Header Font Color (Leave blank if headers are not needed)
"D0D0D0",			// Menu Header Background Color (Leave blank if headers are not needed)
"CCCCCC",				// Menu Item Separator Color
]

style2=[			// style2 is an array of properties. You can have as many property arrays as you need. This means that menus can have their own style.
"5A5A5A",			// Mouse Off Font Color
"f0f0f0",			// Mouse Off Background Color
"E85900",			// Mouse On Font Color
"D0D0D0",			// Mouse On Background Color
"",			// Menu Border Color
10,					// Font Size in pixels
"normal",			// Font Style (italic or normal)
"bold",				// Font Weight (bold or normal)
"Verdana",			// Font Name
4,					// Menu Item Padding
"",					// Sub Menu Image (Leave this blank if not needed)
,					// 3D Border & Separator bar
"66ffff",			// 3D High Color
"000099",			// 3D Low Color
"E85900",			// Current Page Item Font Color (leave this blank to disable)
"D0D0D0",			// Current Page Item Background Color (leave this blank to disable)
"",					// Top Bar image (Leave this blank to disable)
"FFFFFF",			// Menu Header Font Color (Leave blank if headers are not needed)
"A0A0A0",			// Menu Header Background Color (Leave blank if headers are not needed)
"A3A3A3",				// Menu Item Separator Color
]


addmenu(menu=[		// This is the array that contains your menu properties and details
"mainmenu",			// Menu Name - This is needed in order for the menu to be called
236,				// Menu Top - The Top position of the menu in pixels 332
125,				// Menu Left - The Left position of the menu in pixels 115
,					// Menu Width - Menus width in pixels
0,					// Menu Border Width
,					// Screen Position - here you can use "center;left;right;middle;top;bottom" or a combination of "center:middle"
style1,				// Properties Array - this is set higher up, as above
1,					// Always Visible - allows the menu item to be visible at all time (1=on/0=off)
"left",				// Alignment - sets the menu elements text alignment, values valid here are: left, right or center
,					// Filter - Text variable for setting transitional effects on menu activation - see above for more info
,					// Follow Scrolling - Tells the menu item to follow the user down the screen (visible at all times) (1=on/0=off)
1, 					// Horizontal Menu - Tells the menu to become horizontal instead of top to bottom style (1=on/0=off)
0,					// Keep Alive - Keeps the menu visible until the user moves over another menu or clicks elsewhere on the page (1=on/0=off)
,					// Position of TOP sub image left:center:right
,					// Set the Overall Width of Horizontal Menu to 100% and height to the specified amount (Leave blank to disable)
,					// Right To Left - Used in Hebrew for example. (1=on/0=off)
,					// Open the Menus OnClick - leave blank for OnMouseover (1=on/0=off)
,					// ID of the div you want to hide on MouseOver (useful for hiding form elements)
,					// Background image for menu when BGColor set to transparent.
,					// Scrollable Menu
,					// Reserved for future use
,"Corporate&nbsp;Information&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",	"show-menu=corpinfo",,,0 // "Description Text", "URL", "Alternate URL", "Status", "Separator Bar"
,"Executive&nbsp;Team&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",	"show-menu=execs",,,0
//,"Corporate&nbsp;Citizenship&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",	"show-menu=citizenship",,,0
,"News&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",	"show-menu=news",,,0
,"Investor&nbsp;Information&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",	"show-menu=investor_info",,,0
,"Careers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",	"show-menu=careers",,,0
,"Contact&nbsp;Us&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",	"http://www.3com.com/corpinfo/en_US/contactus/index.html",,,0
])

	addmenu(menu=["corpinfo",
	,,150,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Corporate Overview"								,"http://www.3com.com/corpinfo/en_US/index.html",,,1
	,"3Com Integrity"						,"http://www.3com.com/corpinfo/en_US/investor/integrity.html",,,1
	,"Headquarters &amp; Offices"				,"http://www.3com.com/corpinfo/en_US/contactus/index.html",,,1
	,"Environmental Initiatives & Policies"		,"http://www.3com.com/corpinfo/en_US/commaffairs/environment.html",,,1
	//,"Supplier Diversity"						,"http://www.3com.com/corpinfo/en_US/supplierdiversity/index.html",,,1
	,"Privacy"									,"http://www.3com.com/corpinfo/en_US/legal/privacy.html",,,1
	])

	
	addmenu(menu=["execs",
	,,150,,"",style2,,"left",effect,,,,,,,,,,,,
	,"3Com Leadership"		,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios.html",,,1
	,"Dan Beck"				,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/dbeck.html",,,1
	,"Robert Dechant"			,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/rdechant.html",,,1
	,"Neal D. Goldman"				,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/goldman.html",,,1
	,"Donald M. Halsted"			,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/halsted.html",,,1
	,"James Hamilton"			,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/hamilton.html",,,1
	,"Deborah Keeman"			,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/keeman.html",,,1
	,"Jerry Kelly"					,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/kelly.html",,,1
	,"Bob Mao"				,"#",,,1
	,"Edgar Masri"					,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/masri.html",,,1
	,"Marc Willebeek-LeMair"					,"http://www.3com.com/corpinfo/en_US/investor/resources/executivebios/willebeek-lemair.html",,,
	])
	
		
	addmenu(menu=["news",
	,,165,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Top Stories"							,"http://www.3com.com/corpinfo/en_US/pressbox/index.jsp",,,1
	,"PR Contacts &amp; Resources"			,"http://www.3com.com/corpinfo/en_US/pressbox/contacts/index.html",,,1
	])
	
	addmenu(menu=["investor_info",
	,,150,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Investor Information Home","http://phx.corporate-ir.net/phoenix.zhtml?c=61382&p=irol-irhome",,,1	
	,"Financials &raquo;","show-menu=finance",,,0
	,"Investor Resources &raquo;","show-menu=resources",,,0
	,"Corporate Governance &raquo;","show-menu=governance",,,0
	])
	
	addmenu(menu=["finance",
	,,150,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Earnings Releases"	,"http://phx.corporate-ir.net/phoenix.zhtml?c=61382&p=irol-earningsreleases",,,1
	,"Earnings Webcasts"					,"http://www.3com.com/corpinfo/en_US/vendorredir/ccbn-webcasts.html",,,1
	,"Fundamentals"	,"http://phx.corporate-ir.net/phoenix.zhtml?c=61382&p=irol-fundBalanceA",,,1
	,"Financial Reports"	,"http://phx.corporate-ir.net/phoenix.zhtml?c=61382&p=irol-reportsAnnual",,,1
	,"SEC Filings"							,"http://www.3com.com/corpinfo/en_US/vendorredir/ccbn-secfilings.html",,,1
	])
	
	addmenu(menu=["resources",
	,,150,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Analyst Coverage"	,"http://phx.corporate-ir.net/phoenix.zhtml?c=61382&p=irol-analysts",,,1
	,"Investor FAQs"	,"http://phx.corporate-ir.net/phoenix.zhtml?c=61382&p=irol-faq",,,1
	,"Calender of Events"	,"http://phx.corporate-ir.net/phoenix.zhtml?c=61382&p=irol-calendar",,,1
	,"Literature Requests"	,"http://www.3com.com/corpinfo/en_US/vendorredir/ccbn-literaturerequest.html",,,1
	])
	
	addmenu(menu=["governance",
	,,150,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Board of Directors"								,"http://www.3com.com/corpinfo/en_US/investor/corp_gov.html#board",,,1
	,"3Com Integrity"								,"http://www.3com.com/corpinfo/en_US/investor/integrity.html",,,1
	,"Corporate Governance"								,"http://www.3com.com/corpinfo/en_US/investor/corp_gov.html",,,1
	])
	
	addmenu(menu=["careers",
	,,150,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Careers Home"						,"http://www.3com.com/corpinfo/en_US/careers/index.html",,,1
	,"Search Careers"					,"https://www.pcrecruiter.net/pcrbin/regmenu.exe?uid=odbc.3com",,,1
	,"Pay and Benefits"				,"http://www.3com.com/corpinfo/en_US/careers/benefits.html",,,1
	,"Workforce Diversity"					,"http://www.3com.com/corpinfo/en_US/workforce_diversity/index.html",,,1
	])
	
	addmenu(menu=["conus",
	,,150,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Contact Us Home"								,"#",,,1
	])
dumpmenus()
