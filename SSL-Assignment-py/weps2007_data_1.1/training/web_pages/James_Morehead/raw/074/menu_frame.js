fixMozillaZIndex=true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
_menuCloseDelay=0;
_menuOpenDelay=0;
_subOffsetTop=20;
_subOffsetLeft=-2;

with(menuStyle=new mm_style()){
bordercolor="#999999";
borderstyle="solid";
bgimage='http://images.infoworld.com/img/red_hdr_bg_2.gif';
borderwidth=0;
fontfamily="Arial, Verdana, Tahoma";
fontsize="11";
fontweight="bold";
headerbgcolor="#ffffff";
headercolor="#000000";
offbgcolor="#ba0000";
offcolor="#ffffff";
onbgcolor="#c70000";
oncolor="#ffffff";
padding=4;
separatorcolor="#ffffff";
separatorsize=1;
subimage="http://images.infoworld.com/img/arrow.gif";
subimagepadding=2;
}


with(submenuStyle=new mm_style()){
bordercolor="#999999";
borderstyle="solid";
borderwidth="1";
fontfamily="Arial, Verdana, Tahoma";
fontsize="11";
fontweight="bold";
headerbgcolor="#ffffff";
headercolor="#000000";
offbgcolor="#bbbbbb";
offcolor="#333333";
onbgcolor="#c70000";
oncolor="#ffffff";
padding="5";
separatorcolor="#bbbbbb";
separatorsize=1;
subimage="http://images.infoworld.com/img/arrow.gif";
subimagepadding=2;
}

drawMenus();



