// Milonic DHTML Menu version 3.3.11
// please note that major changes to this file have been made.
//
// You no longer need to number your menus as in previous versions. 
// The new menu structure allows you to name the menu instead. This means that you to remove menus and not break the system.
// The structure should also be much easier to modify, add & remove menus and menu items.
// 
// If you are having difficulty with the menu please read the FAQ at http://www.milonic.co.uk/menu/faq.php before contacting us.
//
// Please note that the above text CAN be erased if you wish.



// The following line is critical for menu operation, and must appear only once.
menunum=0;menus=new Array();_d=document;function addmenu(){menunum++;menus[menunum]=menu;}function dumpmenus(){mt="<script language=javascript>";for(a=1;a<menus.length;a++){mt+=" menu"+a+"=menus["+a+"];"}mt+="<\/script>";_d.write(mt)}
//Please leave the above line intact

////////////////////////////////////
// Editable properties START here //
////////////////////////////////////


effect = "wheel(spokes=2, duration=0.5);Fade(duration=0.3);Alpha(style=0,opacity=85);Shadow(color='#ffffff', Direction=135, Strength=2)" // Special effect string for IE5.5 or above please visit http://www.milonic.co.uk/menu/filters_sample.php for more filters

timegap=500		// The time delay for menus to remain visible
followspeed=5		// Follow Scrolling speed
followrate=40		// Follow Scrolling Rate
suboffset_top=0;	// Sub menu offset Top position 
suboffset_left=0;	// Sub menu offset Left position

style1=[		// style1 is an array of properties. You can have as many property arrays as you need. This means that menus can have their own style.
"#E6E8fA",		// Mouse Off Font Color
"black",		// Mouse Off Background Color
"black",		// Mouse On Font Color
"#E6E8fA",		// Mouse On Background Color
"#E6E8fA",		// Menu Border Color 
12,			// Font Size in pixels
"normal",		// Font Style (italic or normal)
"normal",			// Font Weight (bold or normal)
"Verdana, Arial",	// Font Name
4,			// Menu Item Padding
"http://www.mythicalrealm.com/tri.gif",		// Sub Menu Image (Leave this blank if not needed)
"white",		// 3D Border & Separator bar
"#CCCCCC",		// 3D High Color
"#000099",		// 3D Low Color
,			// Current Page Item Font Color (leave this blank to disable)
,			// Current Page Item Background Color (leave this blank to disable)
"http://www.mythicalrealm.com/tridown.gif",		// Top Bar image (Leave this blank to disable)
"ffffff",		// Menu Header Font Color (Leave blank if headers are not needed)
"000099",		// Menu Header Background Color (Leave blank if headers are not needed)
]



addmenu(menu=[		// This is the array that contains your menu properties and details
"mainmenu",		// Menu Name - This is needed in order for the menu to be called
0,			// Menu Top - The Top position of the menu in pixels
0,			// Menu Left - The Left position of the menu in pixels
,			// Menu Width - Menus width in pixels
1,			// Menu Border Width 
"center:top",	    	// Screen Position - here you can use "center;left;right;middle;top;bottom" or a combination of "center:middle"
style1,			// Properties Array - this is set higher up, as above
1,			// Always Visible - allows the menu item to be visible at all time (1=on/0=off)
"center",		// Alignment - sets the menu elements text alignment, values valid here are: left, right or center
effect,			// Filter - Text variable for setting transitional effects on menu activation - see above for more info
1,			// Follow Scrolling - Tells the menu item to follow the user down the screen (visible at all times) (1=on/0=off)
1, 			// Horizontal Menu - Tells the menu to become horizontal instead of top to bottom style (1=on/0=off)
,			// Keep Alive - Keeps the menu visible until the user moves over another menu or clicks elsewhere on the page (1=on/0=off)
,			// Position of TOP sub image left:center:right
,			// ..Now Obsolete..
,			// Right To Left - Used in Hebrew for example. (1=on/0=off)
,			// Open the Menus OnClick - leave blank for OnMouseover (1=on/0=off)
,			// ID of the div you want to hide on MouseOver (useful for hiding form elements)
,			// Reserved for future use
,			// Reserved for future use
,			// Reserved for future use
,"&nbsp;&nbsp;&nbsp;Main&nbsp;Page&nbsp;&nbsp;&nbsp;","show-menu=main","http://www.mythicalrealm.com","Back to the home page",1 // "Description Text", "URL", "Alternate URL", "Status", "Separator Bar"
,"&nbsp;&nbsp;&nbsp;Creatures&nbsp;&nbsp;&nbsp;","show-menu=creatures","http://www.mythicalrealm.com/mythbeast.html","Mythical Creatures",1
,"&nbsp;&nbsp;&nbsp;Legends&nbsp;&nbsp;&nbsp;","show-menu=people","http://www.mythicalrealm.com/legend.html","Gods and People of Legend",1
,"&nbsp;&nbsp;&nbsp;Races&nbsp;&nbsp;&nbsp;","show-menu=races","http://www.mythicalrealm.com/races_of_legend.html","Races of Legend",1
,"&nbsp;&nbsp;&nbsp;Community&nbsp;&nbsp;&nbsp;","show-menu=community","http://pub227.ezboard.com/bmythicalrealm","",1
])


	addmenu(menu=["main",
	,,100,1,,style1,0,"center",effect,0,,,,,,,,,,,
	,"About","http://www.mythicalrealm.com/about.html",,,1
	,"Sitemap","http://www.mythicalrealm.com/sitemap.html",,,1
	])	
	

	addmenu(menu=["creatures",
	,,98,1,,style1,0,"center",effect,0,,,,,,,,,,,
	,"Cerberus","http://www.mythicalrealm.com/creatures/cerberus.html",,,1
	,"Chimaera","http://www.mythicalrealm.com/creatures/chimera.html",,,1
	,"Dragons","show-menu=dragons","http://www.mythicalrealm.com/creatures/dragonmist.html",,1
	,"Gargoyle","http://www.mythicalrealm.com/creatures/gargoyle.html",,,1
	,"Gryphons","show-menu=gryphons","http://www.mythicalrealm.com/creatures/aerie.html",,1
	,"Hippogriff","http://www.mythicalrealm.com/creatures/hippogriff.html",,,1
	,"Kraken","http://www.mythicalrealm.com/creatures/kraken.html",,,1	
	,"Leviathan","http://www.mythicalrealm.com/creatures/leviathan.html",,,1
	,"Minotaur","http://www.mythicalrealm.com/creatures/minotaur.html",,,1
	,"Pegasus","http://www.mythicalrealm.com/creatures/pegasus.html",,,1
	,"Phoenix","show-menu=phoenix","http://www.mythicalrealm.com/creatures/phoenix.html",,1
	,"Unicorn","show-menu=unicorn","http://www.mythicalrealm.com/creatures/unipeg.html",,1
	,"Sphinx","http://www.mythicalrealm.com/creatures/sphinx.html",,,1
	,"Werewolf","http://www.mythicalrealm.com/legends/werewolf.html",,,1
	])	

		addmenu(menu=["dragons",
		,,120,1,,style1,0,"center",effect,0,,,,,,,,,,,
		,"Dragon Mist","http://www.mythicalrealm.com/creatures/dragonmist.html",,,1
		,"Dragon Globe","http://www.mythicalrealm.com/creatures/draglobe.html",,,1
		,"Dragon Fire","http://www.mythicalrealm.com/creatures/dragonfire.html",,,1
		,"Chinese Dragon","http://www.mythicalrealm.com/creatures/chinese_dragon.html",,,1
		,"Wyvern","http://www.mythicalrealm.com/creatures/dragon-wyverns.html",,,1
		])
	
		addmenu(menu=["gryphons",
		,,120,1,,style1,0,"center",effect,0,,,,,,,,,,,
		,"Aerie I","http://www.mythicalrealm.com/creatures/aerie.html",,,1
		,"Aerie II","http://www.mythicalrealm.com/creatures/aerie2.html",,,1
		])

		addmenu(menu=["phoenix",
		,,140,1,,style1,0,"center",effect,0,,,,,,,,,,,
		,"Rise of the Phoenix","http://www.mythicalrealm.com/creatures/phoenix.html",,,1
		,"Phoenix Bird Poem","http://www.mythicalrealm.com/creatures/phoenix2.html",,,1
		])

		addmenu(menu=["unicorn",
		,,150,1,,style1,0,"center",effect,0,,,,,,,,,,,
		,"Dream Time","http://www.mythicalrealm.com/creatures/unipeg.html",,,1
		,"Ballad of the Unicorn","http://www.mythicalrealm.com/creatures/unicorn.html",,,1
		])

	addmenu(menu=["people",
	,,160,1,,style1,0,"center",effect,0,,,,,,,,,,,
	,"Lady of Shalott","http://www.mythicalrealm.com/legends/shalott.html",,,1
	,"King Arthur","show-menu=king","http://www.mythicalrealm.com/legends/king_arthur.html",,1
	,"Hamlet's Ophelia","show-menu=ophelia","http://www.mythicalrealm.com/legends/ophelia.html",,1
	,"La Belle Dame Sans","http://www.mythicalrealm.com/legends/labelle.html",,,1
	,"Morgan Le Fay","http://www.mythicalrealm.com/legends/morgan_le_fay.html",,,1
	,"Merlin and the Gleam","http://www.mythicalrealm.com/legends/wizard.html",,,1
	,"Thor: God of Thunder","http://www.mythicalrealm.com/legends/thor.html",,,1	
	,"Pele: Volcano Goddess","http://www.mythicalrealm.com/legends/pele.html",,,1
	])

		addmenu(menu=["king",
		,,120,1,,style1,0,"center",effect,0,,,,,,,,,,,
		,"King Arthur I","http://www.mythicalrealm.com/legends/king_arthur.html",,,1
		,"King Arthur II","http://www.mythicalrealm.com/legends/king_arthur2.html",,,1
		])

		addmenu(menu=["ophelia",
		,,120,1,,style1,0,"center",effect,0,,,,,,,,,,,
		,"Ophelia","http://www.mythicalrealm.com/legends/ophelia.html",,,1
		,"Madness","http://www.mythicalrealm.com/legends/madness.html",,,1
		])
	
	addmenu(menu=["races",
        ,,120,1,,style1,0,"center",effect,0,,,,,,,,,,,
	,"Barbegazi","http://www.mythicalrealm.com/creatures/barbegazi.html",,,1
	,"Centaur","http://www.mythicalrealm.com/creatures/centaurs.html",,,1
	,"Elven Folk","http://www.mythicalrealm.com/creatures/elves.html",,,1
	,"Faery Fae Folk","http://www.mythicalrealm.com/creatures/fae_folk.html",,,1
	,"Menehune","http://www.mythicalrealm.com/creatures/menehune.html",,,1
	,"Mermaid - Siren","http://www.mythicalrealm.com/creatures/mermaids_sirens.html",,,1
	,"Sorceress","http://www.mythicalrealm.com/legends/morgan_le_fay.html",,,1
	,"Valkyrie","http://www.mythicalrealm.com/legends/valkyries.html",,,1
	,"Vampires","show-menu=vamp","http://www.mythicalrealm.com/legends/vampires.html",,1
	,"Wizard","http://www.mythicalrealm.com/legends/wizard.html",,,1
	,"Werewolf","http://www.mythicalrealm.com/legends/werewolf.html",,,1
	])

		addmenu(menu=["vamp",
		,,120,1,,style1,0,"center",effect,0,,,,,,,,,,,
		,"Vampires in History","http://www.mythicalrealm.com/legends/vampires.html",,,1
		,"Vampire Poem","http://www.mythicalrealm.com/legends/vampires2.html",,,1
		,"Vampires Around the World","http://www.mythicalrealm.com/legends/vampires2.html#world",,,1
		])
	
	addmenu(menu=["community",
        ,,130,1,,style1,0,"center",effect,0,,,,,,,,,,,
	,"Fantasy&nbsp;Gift&nbsp;Shop","http://www.giftgecko.com/catalog/",,,1
	,"Message&nbsp;Board","http://pub227.ezboard.com/bmythicalrealm",,,1	
	,"Links","http://www.mythicalrealm.com/links/index.html",,,1
		

	,"E-Cards","http://www.mythicalrealm.com/index.html#card",,,1
	,"Awards","http://www.mythicalrealm.com/awards/index.html",,,1
	,"Banners","http://www.mythicalrealm.com/banner.html",,,1
	])
	

	

dumpmenus()