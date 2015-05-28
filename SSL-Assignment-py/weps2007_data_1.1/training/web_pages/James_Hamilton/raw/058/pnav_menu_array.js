/*
 Milonic DHTML Website Navigation Menu - Version 3.5
 Written by Andy Woolley - Copyright 2002 (c) Milonic Solutions Limited. All Rights Reserved.
 Please visit http://www.milonic.co.uk/menu or e-mail menu3@milonic.com for more information.

 The Free use of this menu is only available to Non-Profit, Educational & Personal web sites.
 Commercial and Corporate licenses  are available for use on all other web sites & Intranets.
 All Copyright notices MUST remain in place at ALL times and, please keep us informed of your
 intentions to use the menu and send us your URL.
*/


//The following line is critical for menu operation, and MUST APPEAR ONLY ONCE. If you have more than one menu_array.js file rem out this line in subsequent files
menunum=0;menus=new Array();_d=document;function addmenu(){menunum++;menus[menunum]=menu;}function dumpmenus(){mt="<script language=javascript>";for(a=1;a<menus.length;a++){mt+=" menu"+a+"=menus["+a+"];"}mt+="<\/script>";_d.write(mt)}
//Please leave the above line intact. The above also needs to be enabled if it not already enabled unless this file is part of a multi pack.



////////////////////////////////////
// Editable properties START here //
////////////////////////////////////

// Special effect string for IE5.5 or above please visit http://www.milonic.co.uk/menu/filters_sample.php for more filters
effect = "Fade(duration=0.0);Alpha(style=0,opacity=100);Shadow(color='#777777', Direction=135, Strength=5)"

timegap=500			// The time delay for menus to remain visible
followspeed=5		// Follow Scrolling speed
followrate=30		// Follow Scrolling Rate
suboffset_top=5;	// Sub menu offset Top position
suboffset_left=5;	// Sub menu offset Left position

style1=[			// style1 is an array of properties. You can have as many property arrays as you need. This means that menus can have their own style.
"5A5A5A",			// Mouse Off Font Color
"",					// Mouse Off Background Color
"C40066",			// Mouse On Font Color
"",					// Mouse On Background Color
"",					// Menu Border Color
10,					// Font Size in pixels
"normal",			// Font Style (italic or normal)
"bold",				// Font Weight (bold or normal)
"Verdana",			// Font Name
4,					// Menu Item Padding
"",					// Sub Menu Image (Leave this blank if not needed)
,					// 3D Border & Separator bar
"",			// 3D High Color
"",			// 3D Low Color
"",			// Current Page Item Font Color (leave this blank to disable)
"",				// Current Page Item Background Color (leave this blank to disable)
"",					// Top Bar image (Leave this blank to disable)
"ffffff",			// Menu Header Font Color (Leave blank if headers are not needed)
"000099",			// Menu Header Background Color (Leave blank if headers are not needed)
"CCCCCC",				// Menu Item Separator Color
]

style2=[			// style2 is an array of properties. You can have as many property arrays as you need. This means that menus can have their own style.
"FFFFFF",			// Mouse Off Font Color
"9398AD",			// Mouse Off Background Color
"C40066",			// Mouse On Font Color
"9398AD",			// Mouse On Background Color
"FFFFFF",			// Menu Border Color
10,					// Font Size in pixels
"normal",			// Font Style (italic or normal)
"normal",			// Font Weight (bold or normal)
"Arial",			// Font Name
4,					// Menu Item Padding
"",					// Sub Menu Image (Leave this blank if not needed)
,					// 3D Border & Separator bar
"66ffff",			// 3D High Color
"000099",			// 3D Low Color
,			// Current Page Item Font Color (leave this blank to disable)
,				// Current Page Item Background Color (leave this blank to disable)
"",					// Top Bar image (Leave this blank to disable)
"ffffff",			// Menu Header Font Color (Leave blank if headers are not needed)
"000099",			// Menu Header Background Color (Leave blank if headers are not needed)
"A3A3A3",				// Menu Item Separator Color
]


addmenu(menu=[		// This is the array that contains your menu properties and details
"mainmenu",			// Menu Name - This is needed in order for the menu to be called
115,				// Menu Top - The Top position of the menu in pixels 332
0,					// Menu Left - The Left position of the menu in pixels 115
100,				// Menu Width - Menus width in pixels
0,					// Menu Border Width
,					// Screen Position - here you can use "center;left;right;middle;top;bottom" or a combination of "center:middle"
style1,				// Properties Array - this is set higher up, as above
1,					// Always Visible - allows the menu item to be visible at all time (1=on/0=off)
"right",			// Alignment - sets the menu elements text alignment, values valid here are: left, right or center
,					// Filter - Text variable for setting transitional effects on menu activation - see above for more info
,					// Follow Scrolling - Tells the menu item to follow the user down the screen (visible at all times) (1=on/0=off)
0, 					// Horizontal Menu - Tells the menu to become horizontal instead of top to bottom style (1=on/0=off)
0,					// Keep Alive - Keeps the menu visible until the user moves over another menu or clicks elsewhere on the page (1=on/0=off)
,					// Position of TOP sub image left:center:right
,					// Set the Overall Width of Horizontal Menu to 100% and height to the specified amount (Leave blank to disable)
,					// Right To Left - Used in Hebrew for example. (1=on/0=off)
,					// Open the Menus OnClick - leave blank for OnMouseover (1=on/0=off)
,					// ID of the div you want to hide on MouseOver (useful for hiding form elements)
,					// Background image for menu when BGColor set to transparent.
,					// Scrollable Menu
,					// Reserved for future use
//," Your Text","/ swapimage=/menu/images/in5_nav_1.gif;",,,0
,"Products &<br>Services<br>&nbsp;",				"show-menu=products","http://www.3com.com/products/en_US/productsindex.jsp?tab=cat&pathtype=purchase swapimage=http://emea.3com.com/js-css/assets/in5_nav_1.gif;",,0 // "Description Text", "URL", "Alternate URL", "Status", "Separator Bar"
,"Solutions <br>&nbsp;",				"show-menu=solutions"			,,"",0
,"Support &<br>Downloads",	"show-menu=support"				,,"",0
])

	addmenu(menu=["products",
	,103,170,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Convergence/IP Telephony","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=23&selcat=Convergence%2FIP+Telephony",,,1
	,"LAN Switches (IntelliJack)","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=61&selcat=LAN+Switches+%28IntelliJack%26%23153%3B+Switches%29",,,1
	,"Lan Switches (Modular)","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=27&selcat=LAN+Switches+%28Modular%29",,,1
	,"Lan Switches (Stackable/Edge)","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=4&selcat=LAN+Switches+%28Stackable%2FEdge%29",,,1
	,"LAN Transceivers/Cables","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=209632&selcat=LAN+Transceivers+%2F+Cables",,,1
	,"Maintenance Services","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=33&selcat=Maintenance+Services",,,1
	,"Network Interface Cards","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=19&selcat=Network+Interface+Cards+%26+LOMs",,,1
	,"Network Management","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=65&selcat=Network+Management",,,1
	,"Professional Services", "http://www.3com.com/products/en_US/prof_services/index.html",,,1
	,"Routers","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=152882&selcat=Routers",,,1
	,"Security","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=134482&selcat=Security",,,1
	,"Unified Switching","http://www.3com.com/products/en_US/detail.jsp?tab=features&pathtype=purchase&date=9-29-2006&sku=3CRUS2475",,,1
	,"Wireless","http://www.3com.com/products/en_US/prodlist.jsp?tab=cat&pathtype=purchase&cat=13&selcat=Wireless",,,1
	,"Product Finder Wizards","http://www.3com.com/productfinder/index.html",,,1
	]) 
	

	
	addmenu(menu=["solutions",
	,103,170,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Secure Converged Networks", "http://www.3com.com/network/index.html",,,1
	,"Convergence Applications", "http://www.3com.com/voip/index.html",,,1
	,"SMB Networks", "http://www.3com.com/solutions/en_US/smb/index.html",,,1
	,"Education", "http://www.3com.com/solutions/en_US/education/index.html",,,1
	,"Healthcare", "http://www.3com.com/solutions/en_US/healthcare/index.html",,,1
	,"Government", "http://www.3com.com/solutions/en_US/government/index.html",,,1
	,"Retail", "http://www.3com.com/retail/index.html",,,1
	])


	addmenu(menu=["support",
	,103,170,,"",style2,,"left",effect,,,,,,,,,,,,
	,"Product Support Home", "http://www.3com.com/products/en_US/support/index.html",,,1
	,"Downloads & Drivers", "http://www.3com.com/products/en_US/downloadsindex.jsp",,,1
	,"Product Registration & eSupport", "http://esupport.3com.com",,,1
	,"3Com Knowledgebase", "http://knowledgebase.3com.com/",,,1
	,"Repair & Replacement", "http://csoweb4.3com.com/repair/",,,1
	,"Service Offerings","http://www.3com.com/support/en_US/service_warranty/index.html",,,1
	,"3Com University", "http://www.3com.com/support/en_US/training/index.html",,,1
	])

dumpmenus()