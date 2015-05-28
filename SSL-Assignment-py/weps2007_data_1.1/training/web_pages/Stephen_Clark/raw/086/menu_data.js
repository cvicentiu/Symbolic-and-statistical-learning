_menuCloseDelay=0         // The time delay for menus to remain visible on mouse out
_menuOpenDelay=0            // The time delay before menus open on mouse over
_followSpeed=100                // Follow scrolling speed
_followRate=1000              // Follow scrolling Rate
_subOffsetTop=0               // Sub menu top offset
_subOffsetLeft=-14         // Sub menu left offset
_scrollAmount=3               // Only needed for Netscape 4.x
_scrollDelay=20               // Only needed for Netcsape 4.x



with(mainmenustyle=new mm_style()){
//onbgcolor="#8C9AAD";
onbgcolor="";
oncolor="#99CCFF";
//oncolor="#ffffff";
//offbgcolor="#DCE9F0";
//offbgcolor="";
offcolor="#515151";
//bordercolor="#666666";
//borderstyle="solid";
//borderwidth="0";
separatorcolor="#666666";
//separatorsize="1";
align="left"
//padding=4;
menuwidth="250";
fontsize="13";
fontstyle="normal";
fontweight="bold";
fontfamily="Arial, Verdana";
pagecolor="#ffffff";
pagebgcolor="#617085";
headercolor="#444444";
headerbgcolor="#ffffff";
subimageposition="100"
//subimage="/include/tridown.gif";
//subimagepadding="2";
//overfilter="Shadow(color='#777777', Direction=135, Strength=5)";
}

with(main_submenustyle=new mm_style()){
onbgcolor="#8C9AAD";
oncolor="#FFFFFF";
offbgcolor="#DCE4EF";
offcolor="#333333";
bordercolor="#666666";
borderstyle="solid";
borderwidth=1;
separatorcolor="#666666";
separatorsize="1";
align="center"
padding=3;
fontsize="12";
fontstyle="normal";
fontweight="normal";
fontfamily="Verdana, Arial";
pagecolor="#ffffff";
pagebgcolor="#617085";
headercolor="#444444";
headerbgcolor="#ffffff";
subimage="/include/tridown.gif";
subimagepadding="2";
//overfilter="Shadow(color='#777777', Direction=135, Strength=5)";
}

with(submainmenustyle=new mm_style()){
onbgcolor="#84A2AD";
oncolor="#cc3300";
offbgcolor="#99CCFF";
onbgcolor="#99CCFF";
offcolor="#515151";
bordercolor="#000000";
borderstyle="solid";
borderwidth=1;
separatorcolor="#2D729D";
separatorsize="1";
align="left";
padding=6;
fontsize="11";
fontstyle="normal";
fontfamily="Verdana, Tahoma, Arial";
pagecolor="black";
pagebgcolor="#82B6D7";
headercolor="#000000";
headerbgcolor="#ffffff";
subimage="/images/arrow_on.gif";
subimagepadding="2";
overfilter="Shadow(color='#777777', Direction=135, Strength=5)";
}

with(milonic=new menuname("Home")){
style=mainmenustyle;
top=122;
left=10;
alwaysvisible=1;
orientation="vertical";
aI("image=/images/nav_home.gif;url=/index.html;status=Back To Home Page;");
aI("image=/images/nav_about.gif;showmenu=about;url=/about_us/index.htm;status=About Athletic Physical Therapys;");
aI("image=/images/nav_staff.gif;showmenu=staff;");
aI("image=/images/nav_stories.gif;showmenu=success;url=/success_stories/index.htm;");
aI("image=/images/nav_advice.gif;showmenu=advice;url=/in_the_news/advice_index.htm;");
aI("image=/images/nav_contact.gif;url=/contact_us/index.htm;");
aI("image=/images/nav_faqs.gif;url=/faq/index.htm;");
aI("image=/images/nav_appt.gif;url=/make_appointment/index.htm;");
}


with(milonic=new menuname("staff")){
style=submainmenustyle;
aI("text=<b>View All Staff Members</b>;url=/meet_staff/index.htm;");
aI("text=<b>View by Location Below:</b>;");
aI("text=&nbsp;&nbsp;&nbsp;&nbsp;West Los Angeles;showmenu=staff_list_westlosangeles;url=/meet_staff/index.htm#westla;");
aI("text=&nbsp;&nbsp;&nbsp;&nbsp;Encino;showmenu=staff_list_encino;url=/meet_staff/index.htm#encino;");
aI("text=&nbsp;&nbsp;&nbsp;&nbsp;Westlake Village;showmenu=staff_list_westlakevillage;url=/meet_staff/index.htm#westlake;");
aI("text=&nbsp;&nbsp;&nbsp;&nbsp;Simi Valley;showmenu=staff_list_simi;url=/meet_staff/index.htm#simi;");
}

	with(milonic=new menuname("staff_list_encino")){
	style=submainmenustyle;
	aI("text=Neha Shah;url=/meet_staff/neha.htm;image=/images/menu_neha_sm.jpg;");
	aI("text=Chez Guinto;url=/meet_staff/chez.htm;image=/images/menu_chez_sm.jpg;");
	aI("text=Alexandra Stein;url=/meet_staff/alex.htm;image=/images/menu_alex_sm.jpg;");
	}
	
	with(milonic=new menuname("staff_list_westlosangeles")){
	style=submainmenustyle;
	aI("text=Jim Lundy;url=/meet_staff/jim.htm;image=/images/menu_jim_sm.jpg;");
	aI("text=Denise Chyette;url=/meet_staff/denise.htm;image=/images/menu_denise_sm.jpg;");
	aI("text=Dan Nevarez;url=/meet_staff/dan.htm;image=/images/menu_dan_sm.jpg;");
	}
	
	with(milonic=new menuname("staff_list_westlakevillage")){
	style=submainmenustyle;
	aI("text=Eric Honbo;url=/meet_staff/eric.htm;image=/images/menu_eric_sm.jpg;");
	aI("text=Ron Higa;url=/meet_staff/ron.htm;image=/images/menu_ron_sm.jpg;");
	aI("text=Cody Jones;url=/meet_staff/cody.htm;image=/images/menu_cody_sm.jpg;");
	aI("text=April Patterson;url=/meet_staff/april.htm;image=/images/menu_april_sm.jpg;");
	aI("text=Daniel Dongo;url=/meet_staff/dongo.htm;image=/images/menu_dongo_sm.jpg;");
	}

	with(milonic=new menuname("staff_list_simi")){
	style=submainmenustyle;
	aI("text=Marc Mirisch;url=/meet_staff/marc.htm;image=/images/menu_marc_sm.jpg;");
	aI("text=Tyler Hickok;url=/meet_staff/tyler.htm;image=/images/menu_tyler_sm.jpg;");
	}
	
with(milonic=new menuname("success")){
style=submainmenustyle;
aI("text=World-Class Athletes;url=/success_stories/index.htm;");
aI("text=Weekend Warriors;url=/success_stories/index_warriors.htm;");
aI("text=Referring Physicians;url=/success_stories/index_physicians.htm;");
}

with(milonic=new menuname("advice")){
style=submainmenustyle;
aI("text=&nbsp;&nbsp;&nbsp;&nbsp;Expert Advice ;url=/in_the_news/advice_index.htm;");
aI("text=&nbsp;&nbsp;&nbsp;&nbsp;Articles Featured In ;url=/in_the_news/featured_index.htm;");
aI("text=&nbsp;&nbsp;&nbsp;&nbsp;Announcements ;url=/in_the_news/annc_surveyresults.htm;");
}

drawMenus();
