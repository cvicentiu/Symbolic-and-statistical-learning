
<!--
//  QuickMenu Pro, Copyright (c) 1998 - 2003, OpenCube Inc. - http://www.opencube.com
//  
/*-------------------------------------------
Colors, Borders, Dividers, and more...
--------------------------------------------*/


	dqm__sub_menu_width = 130      		//default sub menu widths
	dqm__sub_xy = "0,0"            		//default sub x,y coordinates - defined relative
						//to the top-left corner of parent image or sub menu
   

	dqm__urltarget = "_self"		//default URL target: _self, _parent, _new, or "my frame name"

	dqm__border_width = 1
	dqm__divider_height = 1

	dqm__border_color = "#CBC3C3"		//Hex color or 'transparent'
	dqm__menu_bgcolor = "#AD2D30"		//Hex color or 'transparent'
	dqm__hl_bgcolor = "#272525"		

	dqm__mouse_off_delay = 300		//defined in milliseconds (activated after mouse stops)
	dqm__nn4_mouse_off_delay = 500		//defined in milliseconds (activated after leaving sub)


/*-------------------------------------------
Font settings and margins
--------------------------------------------*/
   

    //Font settings

	dqm__textcolor = "#FFFFFF"
	dqm__fontfamily = "Verdana"		//Any available system font     
	dqm__fontsize = 10			//Defined with pixel sizing  	     
	dqm__fontsize_ns = 11			//Defined with pixel sizing  	
	dqm__fontsize_ie4 = 7.5			//Defined with point sizing
	dqm__textdecoration = "normal"		//set to: 'normal', or 'underline'
	dqm__fontweight = "bold"		//set to: 'normal', or 'bold'
	dqm__fontweight_ns = "bold"		//set to: 'normal', or 'bold'
	dqm__fontstyle = "normal"		//set to: 'normal', or 'italic' 	


    //Rollover font settings

	dqm__hl_textcolor = "#FFFFFF"
	dqm__hl_textdecoration = "normal"	//set to: 'normal', or 'underline'



    //Margins and text alignment

	dqm__text_alignment = "left"		//set to: 'left', 'center' or 'right'
	dqm__margin_top = 5
	dqm__margin_bottom = 5
	dqm__margin_left = 5
	dqm__margin_right = 5

   


/*-------------------------------------------
Bullet and Icon image library - Unlimited bullet
or icon images may be defined below and then associated
with any sub menu items within the 'Sub Menu Structure 
and Text' section of this data file.
--------------------------------------------*/


    //Relative positioned icon images (flow with sub item text)

	dqm__icon_image0 = ""
	//"sample_images/bullet.gif"
	dqm__icon_rollover0 = ""
	//"sample_images/bullet_hl.gif"
	dqm__icon_image_wh0 = "0, 0"

	

    //Absolute positioned icon images (coordinate poitioned)

	//dqm__2nd_icon_image0 = "sample_images/arrow.gif"
	//dqm__2nd_icon_rollover0 = "sample_images/arrow.gif" 
	//dqm__2nd_icon_image_wh0 = "13,10"
	//dqm__2nd_icon_image_xy0 = "0,4" 
	


/*---------------------------------------------
Optional Status Bar Text
-----------------------------------------------*/

	dqm__show_urls_statusbar = false
   
	//dqm__status_text0 = "Sample text - Main Menu Item 0"
	//dqm__status_text1 = "Sample text - Main Menu Item 1"

	//dqm__status_text1_0 = "Sample text - Main Menu Item 1, Sub Item 0"	
	//dqm__status_text1_0 = "Sample text - Main Menu Item 1, Sub Item 1"	




/*-------------------------------------------
Internet Explorer Transition Effects
--------------------------------------------*/


    //Options include - none | fade | pixelate |iris | slide | gradientwipe | checkerboard | radialwipe | randombars | randomdissolve |stretch

	dqm__sub_menu_effect = "gradientwipe"
	dqm__sub_item_effect = "gradientwipe"


    //Define the effect duration in seconds below.
   
	dqm__sub_menu_effect_duration = .25
	dqm__sub_item_effect_duration = .25


    //Specific settings for various transitions.

	dqm__effect_pixelate_maxsqare = 25
	dqm__effect_iris_irisstyle = "CIRCLE"		//CROSS, CIRCLE, PLUS, SQUARE, or STAR
	dqm__effect_checkerboard_squaresx = 14
	dqm__effect_checkerboard_squaresY = 14
	dqm__effect_checkerboard_direction = "RIGHT"	//UP, DOWN, LEFT, RIGHT


    //Opacity and drop shadows.

	dqm__sub_menu_opacity = 100			//1 to 100
	dqm__dropshadow_color = "#333333"			//Hex color value or 'none'
	dqm__dropshadow_offx = 3		//drop shadow width
	dqm__dropshadow_offy = 3		//drop shadow height



/*-------------------------------------------
Browser Bug fixes and Workarounds
--------------------------------------------*/


    //Mac offset fixes, adjust until sub menus position correctly.
   
	dqm__os9_ie5mac_offset_X = 10
	dqm__os9_ie5mac_offset_Y = 15

	dqm__osx_ie5mac_offset_X = 0
	dqm__osx_ie5mac_offset_Y = 0

	dqm__ie4mac_offset_X = -8
	dqm__ie4mac_offset_Y = -50


    //Netscape 4 resize bug workaround.

	dqm__nn4_reaload_after_resize = true
	dqm__nn4_resize_prompt_user = false
	dqm__nn4_resize_prompt_message = "To reinitialize the navigation menu please click the 'Reload' button."
   

    //Set to true if the menu is the only item on the HTML page.

	dqm__use_opera_div_detect_fix = true


    //Pre-defined sub menu item heights for the Espial Escape browser.

	dqm__escape_item_height = 20
	dqm__escape_item_height0_0 = 70
	dqm__escape_item_height0_1 = 70
	dqm__escape_item_height0_2 = 70


/*---------------------------------------------
Exposed menu events
----------------------------------------------*/


    //Reference additional onload statements here.

	//dqm__onload_code = "alert('custom function - onload')"


    //The 'X' indicates the index number of the sub menu group or item.

	dqm__showmenu_codeX = "status = 'custom show menu function call - menu0'"
	dqm__hidemenu_codeX = "status = 'custom hide menu function call - menu0'"
	dqm__clickitem_codeX_X = "alert('custom Function - Menu Item 0_0')"



/*---------------------------------------------
Specific Sub Menu Settings
----------------------------------------------*/


    //The following settings may be defined for specific sub menu groups.
    //The 'X' represents the index number of the sub menu group.

	dqm__border_widthX = 10;
	dqm__divider_heightX = 5;		
	dqm__border_colorX = "#0000ff";     
	dqm__menu_bgcolorX = "#ff0000"
	dqm__hl_bgcolorX = "#00ff00"
	dqm__hl_textcolorX = "#ff0000"
	dqm__text_alignmentX = "left"


    //The following settings may be defined for specific sub menu items.
    //The 'X' represents the index number of the sub menu item.

	dqm__hl_subdescX = "custom highlight text"
	dqm__urltargetX = "_new"




/**********************************************************************************************
**********************************************************************************************

                           Main Menu Rollover Images and Links  

**********************************************************************************************
**********************************************************************************************/



    //Main Menu Item 0

	dqm__rollover_image0 = "/images/nav_search.gif"
	dqm__rollover_wh0 = "97,17"
	dqm__url0 = "/find_reports.asp";   


    //Main Menu Item 1

	dqm__rollover_image1 = "/images/nav_services.gif"
	dqm__rollover_wh1 = "46,17"
	dqm__url1 = "/research_services.asp";

	
    //Main Menu Item 2

	dqm__rollover_image2 = "/images/nav_register.gif"
	dqm__rollover_wh2 = "47,17"
	dqm__url2 = "/subscribe.asp";
	
	
    //Main Menu Item 3

	dqm__rollover_image3 = "/images/nav_exposure.gif"
	dqm__rollover_wh3 = "51,17"
	dqm__url3 = "/advertising_solutions.asp";
	
    //Main Menu Item 4

	dqm__rollover_image4 = "/images/nav_about.gif"
	dqm__rollover_wh4 = "51,17"
	dqm__url4 = "/about.asp";

	
/**********************************************************************************************
**********************************************************************************************

                              Sub Menu Structure and Text  

**********************************************************************************************
**********************************************************************************************/
   



    //Sub Menu 0

	dqm__sub_xy0 = "-104,17"
	dqm__sub_menu_width0 = 140
    dqm__subdesc0_0 = "<b>&raquo; Experts</b>"
    dqm__subdesc0_1 = "<b>&raquo; Reports</b>"
    dqm__subdesc0_2 = "<b>&raquo; Resumes</b>"
	dqm__icon_index0_0 = 0
	dqm__icon_index0_1 = 0
	dqm__icon_index0_2 = 0
	dqm__url0_0 = "/find_experts.asp"
	dqm__url0_1 = "/find_reports.asp"
	dqm__url0_2 = "/find_resumes.asp"

	
    //Sub Menu 1

	dqm__sub_xy1 = "-53,17"
	dqm__sub_menu_width1 = 140

	dqm__subdesc1_0 = "<b>&raquo; Consulting</b>"
	dqm__subdesc1_1 = "<b>&raquo; Custom Research</b>"
	dqm__subdesc1_2 = "<b>&raquo; Research Coverage</b>"
	dqm__subdesc1_3 = "<b>&raquo; Research</b>"
	dqm__subdesc1_4 = "<b>&raquo; RSS Feed</b>"

	dqm__icon_index1_0 = 0
	dqm__icon_index1_1 = 0
	dqm__icon_index1_2 = 0
	dqm__icon_index1_3 = 0
	dqm__icon_index1_4 = 0
	
	dqm__url1_0 = "/consulting_services.asp"
	dqm__url1_1 = "/custom_research.asp"
	dqm__url1_2 = "/research_coverage.asp"
	dqm__url1_3 = "/research.asp"
	dqm__url1_4 = "/rss_feed.asp"
	
	
    //Sub Menu 2

	dqm__sub_xy2 = "-54,17"
	dqm__sub_menu_width2 = 140

	dqm__subdesc2_0 = "<b>&raquo; Consultants</b>"
	dqm__subdesc2_1 = "<b>&raquo; Investors</b>"
	dqm__subdesc2_2 = "<b>&raquo; Researchers</b>"
	dqm__subdesc2_3 = "<b>&raquo; Affiliates</b>"

	dqm__icon_index2_0 = 0
	dqm__icon_index2_1 = 0
	dqm__icon_index2_2 = 0
	dqm__icon_index2_3 = 0
	
	dqm__url2_0 = "/contribute.asp"
	dqm__url2_1 = "/subscribe.asp"
	dqm__url2_2 = "/contribute.asp"
	dqm__url2_3 = "/affiliates"
	
		
    //Sub Menu 3

	dqm__sub_xy3 = "-58,17"
	dqm__sub_menu_width3 = 140

	dqm__subdesc3_0 = "<b>&raquo; Ad Solutions</b>"
	dqm__subdesc3_1 = "<b>&raquo; Media Coverage</b>"
	dqm__subdesc3_2 = "<b>&raquo; New Research</b>"

	dqm__icon_index3_0 = 0
	dqm__icon_index3_1 = 0
	dqm__icon_index3_2 = 0
	
	dqm__url3_0 = "/advertising_solutions.asp"
	dqm__url3_1 = "/media_coverage.asp"
	dqm__url3_2 = "/free_report.asp"
	
	
    //Sub Menu 4

	dqm__sub_xy4 = "-58,17"
	dqm__sub_menu_width4 = 140

	dqm__subdesc4_0 = "<b>&raquo; Overview</b>"
	dqm__subdesc4_1 = "<b>&raquo; Founder</b>"
	dqm__subdesc4_2 = "<b>&raquo; Clients</b>"
	dqm__subdesc4_3 = "<b>&raquo; Research Wire</b>"

	dqm__icon_index4_0 = 0
	dqm__icon_index4_1 = 0
	dqm__icon_index4_2 = 0
	dqm__icon_index4_3 = 0
	
	dqm__url4_0 = "/about.asp"
	dqm__url4_1 = "/founder.asp"
	dqm__url4_2 = "/our_clients.asp"
	dqm__url4_3 = "/research_wire.asp"
	
	
    //Sub Menu 0_3

	//dqm__sub_xy0_3 = "-4,2"
	//dqm__sub_menu_width0_3 = 200

	//dqm__subdesc0_3_0 = "PCBA Operation"
	//dqm__subdesc0_3_1 = "Speakers Assembly Operation"
	//dqm__subdesc0_3_2 = "IQC Department"
	//dqm__subdesc0_3_3 = "Engineering Department"
	//dqm__subdesc0_3_4 = "Line Equipment"
	//dqm__subdesc0_3_5 = "Factory/Plant Video"
	
	
	//dqm__icon_index0_3_0 = 0
	//dqm__icon_index0_3_1 = 0
	//dqm__icon_index0_3_2 = 0
	//dqm__icon_index0_3_3 = 0
	//dqm__icon_index0_3_4 = 0
	//dqm__icon_index0_3_5 = 0
	
	
	//dqm__url0_2_0 = "pcba.asp"
	//dqm__url0_2_1 = "speakers_assembly.asp"
	//dqm__url0_2_2 = "icq.asp"
	//dqm__url0_2_3 = "engineering.asp"
	//dqm__url0_2_4 = "line_equipment.asp"
	//dqm__url0_2_5 = "factory_video.asp"
	
	



//To avoid error pop up box from open cube

limit_multiple_users = true

sequence = "9x88_4"
//-->