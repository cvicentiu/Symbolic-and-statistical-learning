/*HM_Loader.js
* by Peter Belesis. v4.0.8 010405
* Copyright (c) 2001 Peter Belesis. All Rights Reserved.
*/

   HM_DOM = (document.getElementById) ? true : false;
   HM_NS4 = (document.layers) ? true : false;
    HM_IE = (document.all) ? true : false;
   HM_IE4 = HM_IE && !HM_DOM;
   HM_Mac = (navigator.appVersion.indexOf("Mac") != -1);
  HM_IE4M = HM_IE4 && HM_Mac;
HM_IsMenu = (HM_DOM || HM_NS4 || (HM_IE4 && !HM_IE4M));

HM_BrowserString = HM_NS4 ? "NS4" : HM_DOM ? "DOM" : "IE4";

if(window.event + "" == "undefined") event = null;
function HM_f_PopUp(){return false};
function HM_f_PopDown(){return false};
popUp = HM_f_PopUp;
popDown = HM_f_PopDown;


HM_GL_MenuWidth          = 100;
HM_GL_FontFamily         = "verdana";
HM_GL_FontSize           = 7;
HM_GL_FontBold           = false;
HM_GL_FontItalic         = false;
HM_GL_FontColor          = "black";
HM_GL_FontColorOver      = "white";
HM_GL_BGColor            = "transparent";
HM_GL_BGColorOver        = "transparent";
HM_GL_ItemPadding        = 3;

HM_GL_BorderWidth        = 1;
HM_GL_BorderColor        = "red";
HM_GL_BorderStyle        = "solid";
HM_GL_SeparatorSize      = 1;
HM_GL_SeparatorColor     = "white";
HM_GL_ImageSrc           = "/menus/HM_More_white_right.gif";
HM_GL_ImageSrcLeft       = "/menus/HM_More_white_right.gif";
HM_GL_ImageSize          = 5;
HM_GL_ImageHorizSpace    = 5;
HM_GL_ImageVertSpace     = 5;

HM_GL_KeepHilite         = false;
HM_GL_ClickStart         = false;
HM_GL_ClickKill          = 0;
HM_GL_ChildOverlap       = 0;
HM_GL_ChildOffset        = 0;
HM_GL_ChildPerCentOver   = null;
HM_GL_TopSecondsVisible  = 0;
HM_GL_StatusDisplayBuild = 0;
HM_GL_StatusDisplayLink  = 1;
HM_GL_UponDisplay        = null;
HM_GL_UponHide           = null;

//HM_GL_RightToLeft      = true;
HM_GL_CreateTopOnly      = HM_NS4 ? true : false;
HM_GL_ShowLinkCursor     = true;

if(HM_IsMenu) {
	document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='/menus/HM_Arrays.js' TYPE='text/javascript'><\/SCR" + "IPT>");
	document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='/menus/HM_Script"+ HM_BrowserString +".js' TYPE='text/javascript'><\/SCR" + "IPT>");
}


//end