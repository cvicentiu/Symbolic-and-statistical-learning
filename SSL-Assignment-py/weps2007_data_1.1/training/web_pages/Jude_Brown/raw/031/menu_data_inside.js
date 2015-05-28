

_menuCloseDelay=500           // The time delay for menus to remain visible on mouse out
_menuOpenDelay=150            // The time delay before menus open on mouse over
_subOffsetTop=20              // Sub menu top offset
_subOffsetLeft=0            // Sub menu left offset



with(menuStyle=new mm_style()){
onbgcolor="#4C4D4F";
oncolor="#ffffff";
offbgcolor="#4C4D4F";
offcolor="#FFFFFF";
padding=5;
fontsize="8pt";
fontstyle="normal";
fontweight="bold";
imagepadding=3;
fontfamily="Verdana, Tahoma, Arial";
headercolor="#000000";
headerbgcolor="#ffffff";
outfilter="Blinds( Bands=1,direction=up, duration=0.3)";
overfilter="Blinds( Bands=1,direction=down, duration=0.3);Alpha(opacity=100)";
}

with(submenuStyle=new mm_style()){
onbgcolor="#4C4D4F";
oncolor="#D8C16C";
offbgcolor="#4C4D4F";
offcolor="#FFFFFF";
padding=5;
fontsize="8pt";
fontstyle="normal";
fontweight="bold";
fontfamily="Verdana, Tahoma, Arial";
headercolor="#000000";
headerbgcolor="#ffffff";
outfilter="Blinds( Bands=1,direction=up, duration=0.3)";
overfilter="Blinds( Bands=1,direction=down, duration=0.3);Alpha(opacity=100)";
}

with(milonic=new menuname("Main Menu")){
style=menuStyle;
top=111;
left=345;
itemheight=25;
alwaysvisible=1;
orientation="horizontal";
aI("bgimage=images/splash_navbg.jpg;image=images/arrow.gif;text=Home&nbsp;&nbsp;;url=home.asp;");
aI("bgimage=images/splash_navbg.jpg;image=images/arrow.gif;text=About Us&nbsp;&nbsp;;showmenu=About;url=aboutus.asp;");
aI("bgimage=images/splash_navbg.jpg;image=images/arrow.gif;text=Clients&nbsp;&nbsp;;url=clients.asp;");
aI("bgimage=images/splash_navbg.jpg;image=images/arrow.gif;text=Candidates&nbsp;&nbsp;;url=candidates.asp;");
aI("bgimage=images/splash_navbg.jpg;image=images/arrow.gif;text=Current Opportunities&nbsp;&nbsp;;url=search.asp;");
aI("bgimage=images/splash_navbg.jpg;image=images/arrow.gif;text=Contact Us&nbsp;&nbsp;;url=contact.asp;");
}

with(milonic=new menuname("About")){
style=submenuStyle;
overflow="scroll";
aI("text=Summit Team;url=team.asp;");
}

drawMenus();

