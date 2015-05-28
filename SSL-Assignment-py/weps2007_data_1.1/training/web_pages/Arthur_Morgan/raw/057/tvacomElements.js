
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
	if (init==true) with (navigator) {
		if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
			document.MM_pgW=innerWidth;
			document.MM_pgH=innerHeight;
			onresize=MM_reloadPage;
		}
	}
	else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
} //end MM_reloadPage(init)
MM_reloadPage(true);


function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}


function fwLoadMenus() {
  mmLoadMenus();
} // fwLoadMenus()


function mmLoadMenus() {
  if (window.mm_menu_0821141603_0) return;
  window.mm_menu_0821141603_0 = new Menu("root",120,20,"Verdana, Arial, Helvetica, sans-serif",10,"#333333","#ffffff","#ffffcc","#3366cc","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_0821141603_0.addMenuItem("About&nbsp;TVA&nbsp;Overview","location='http://www.tva.com/abouttva/index.htm'");
  mm_menu_0821141603_0.addMenuItem("Leadership","location='http://www.tva.com/abouttva/leadership.htm'");
  mm_menu_0821141603_0.addMenuItem("History","location='http://www.tva.com/abouttva/history.htm'");
  mm_menu_0821141603_0.addMenuItem("Corporate&nbsp;Reports","location='http://www.tva.gov/abouttva/corporatereport.htm'");
  mm_menu_0821141603_0.addMenuItem("TVA&nbsp;FAQ","location='http://www.tva.com/abouttva/keyfacts.htm'");
  mm_menu_0821141603_0.addMenuItem("Employment","location='http://www.tva.com/employment/index.htm'");
   mm_menu_0821141603_0.hideOnMouseOut=true;
   mm_menu_0821141603_0.menuBorder=1;
   mm_menu_0821141603_0.menuItemBorder=1;
   mm_menu_0821141603_0.menuLiteBgColor='#ffffff';
   mm_menu_0821141603_0.menuBorderBgColor='#777777';
   mm_menu_0821141603_0.bgColor='#555555';
  window.mm_menu_0821141603_1 = new Menu("root",140,20,"Verdana, Arial, Helvetica, sans-serif",10,"#333333","#ffffff","#ffffcc","#3366cc","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_0821141603_1.addMenuItem("Power&nbsp;Overview","location='http://www.tva.com/power/index.htm'");
  mm_menu_0821141603_1.addMenuItem("Fossil&nbsp;Fuel&nbsp;Generation","location='http://www.tva.com/power/fossil.htm'");
  mm_menu_0821141603_1.addMenuItem("Hydro&nbsp;Electric&nbsp;Power","location='http://www.tva.com/power/hydro.htm'");
  mm_menu_0821141603_1.addMenuItem("Nuclear&nbsp;Energy","location='http://www.tva.gov/power/nuclear/index.htm'");
  mm_menu_0821141603_1.addMenuItem("Transmission","location='http://www.tva.com/power/xmission.htm'");
  mm_menu_0821141603_1.addMenuItem("Our&nbsp;Customers","location='http://www.tva.com/power/power_customer.htm'");
   mm_menu_0821141603_1.hideOnMouseOut=true;
   mm_menu_0821141603_1.menuBorder=1;
   mm_menu_0821141603_1.menuItemBorder=1;
   mm_menu_0821141603_1.menuLiteBgColor='#ffffff';
   mm_menu_0821141603_1.menuBorderBgColor='#777777';
   mm_menu_0821141603_1.bgColor='#555555';
  window.mm_menu_0821141603_2 = new Menu("root",190,20,"Verdana, Arial, Helvetica, sans-serif",10,"#333333","#ffffff","#ffffcc","#3366cc","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_0821141603_2.addMenuItem("Environment&nbsp;Overview","location='http://www.tva.com/environment/index.htm'");
  mm_menu_0821141603_2.addMenuItem("Environmental&nbsp;Policy&nbsp;&amp;&nbsp;Principles","location='http://www.tva.com/environment/policy.htm'");
  mm_menu_0821141603_2.addMenuItem("Air&nbsp;Quality","location='http://www.tva.com/environment/air/index.htm'");
  mm_menu_0821141603_2.addMenuItem("Land&nbsp;Management","location='http://www.tva.com/environment/land/index.htm'");
  mm_menu_0821141603_2.addMenuItem("Water&nbsp;Quality","location='http://www.tva.com/environment/water/index.htm'");
  mm_menu_0821141603_2.addMenuItem("Environmental&nbsp;Reviews","location='http://www.tva.gov/environment/reports/index.htm'");
  mm_menu_0821141603_2.addMenuItem("Environmental&nbsp;Services","location='http://www.tva.com/environment/envservices/index.htm'");
   mm_menu_0821141603_2.hideOnMouseOut=true;
   mm_menu_0821141603_2.menuBorder=1;
   mm_menu_0821141603_2.menuItemBorder=1;
   mm_menu_0821141603_2.menuLiteBgColor='#ffffff';
   mm_menu_0821141603_2.menuBorderBgColor='#777777';
   mm_menu_0821141603_2.bgColor='#555555';
  window.mm_menu_0821141603_3 = new Menu("root",145,20,"Verdana, Arial, Helvetica, sans-serif",10,"#333333","#ffffff","#ffffcc","#3366cc","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_0821141603_3.addMenuItem("River&nbsp;System&nbsp;Overview","location='http://www.tva.com/river/index.htm'");
  mm_menu_0821141603_3.addMenuItem("Reservoir&nbsp;Information","location='http://www.tva.gov/river/lakeinfo/index.htm'");
  mm_menu_0821141603_3.addMenuItem("Flood&nbsp;Damage&nbsp;Reduction","location='http://www.tva.gov/river/flood/index.htm'");
  mm_menu_0821141603_3.addMenuItem("Navigation","location='http://www.tva.com/river/navigation/index.htm'");
  mm_menu_0821141603_3.addMenuItem("Power&nbsp;Supply","location='http://www.tva.com/power/hydro.htm'");
  mm_menu_0821141603_3.addMenuItem("Water&nbsp;Quality","location='http://www.tva.com/environment/water/index.htm'");
  mm_menu_0821141603_3.addMenuItem("Recreation","location='http://www.tva.com/river/recreation/index.htm'");
  mm_menu_0821141603_3.addMenuItem("Land&nbsp;and&nbsp;Shorelines","location='http://www.tva.com/river/landandshore/index.htm'");
   mm_menu_0821141603_3.addMenuItem("Water&nbsp;Supply","location='http://www.tva.gov/river/watersupply/index.htm'");
   mm_menu_0821141603_3.hideOnMouseOut=true;
   mm_menu_0821141603_3.menuBorder=1;
   mm_menu_0821141603_3.menuItemBorder=1;
   mm_menu_0821141603_3.menuLiteBgColor='#ffffff';
   mm_menu_0821141603_3.menuBorderBgColor='#777777';
   mm_menu_0821141603_3.bgColor='#555555';
  window.mm_menu_0821141603_4 = new Menu("root",195,20,"Verdana, Arial, Helvetica, sans-serif",10,"#333333","#ffffff","#ffffcc","#3366cc","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_0821141603_4.addMenuItem("Economic&nbsp;Development&nbsp;Overview","window.open('http://www.tvaed.com/index.htm','tvaed','location,menubar,scrollbars, status,toolbar')");
  mm_menu_0821141603_4.addMenuItem("Locate&nbsp;or&nbsp;Grow&nbsp;Your&nbsp;Industry","window.open('http://www.tvaed.com/solutions.htm','tvaed','location,menubar,scrollbars, status,toolbar')");
  mm_menu_0821141603_4.addMenuItem("Community&nbsp;Resources","window.open('http://www.tvaed.com/commdev.htm','tvaed','location,menubar,scrollbars, status,toolbar')");
  mm_menu_0821141603_4.addMenuItem("Industry&nbsp;Resources","window.open('http://www.tvaed.com/existing.htm','tvaed','location,menubar,scrollbars, status,toolbar')");
  mm_menu_0821141603_4.addMenuItem("Business&nbsp;Resources","window.open('http://www.tvaed.com/bus_serv.htm','tvaed','location,menubar,scrollbars, status,toolbar')");
   mm_menu_0821141603_4.hideOnMouseOut=true;
   mm_menu_0821141603_4.menuBorder=1;
   mm_menu_0821141603_4.menuItemBorder=1;
   mm_menu_0821141603_4.menuLiteBgColor='#ffffff';
   mm_menu_0821141603_4.menuBorderBgColor='#777777';
   mm_menu_0821141603_4.bgColor='#555555';
  window.mm_menu_0821141603_5 = new Menu("root",170,20,"Verdana, Arial, Helvetica, sans-serif",10,"#333333","#ffffff","#ffffcc","#3366cc","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_0821141603_5.addMenuItem("Investor&nbsp;Resources&nbsp;Overview","location='http://www.tva.gov/finance/index.htm'");
  mm_menu_0821141603_5.addMenuItem("Company&nbsp;Overview","location='http://www.tva.gov/finance/overview/index.htm'");
  mm_menu_0821141603_5.addMenuItem("Corporate&nbsp;Governance","location='http://www.tva.gov/finance/governance/index.htm'");  
  mm_menu_0821141603_5.addMenuItem("Investment&nbsp;Opportunities","location='http://www.tva.gov/finance/opportun/index.htm'");
  mm_menu_0821141603_5.addMenuItem("Financial&nbsp;Reports","location='http://www.tva.gov/finance/reports/index.htm'");
  mm_menu_0821141603_5.addMenuItem("Request&nbsp;Information","location='http://www.tva.gov/finance/request_info.htm'");
   mm_menu_0821141603_5.hideOnMouseOut=true;
   mm_menu_0821141603_5.menuBorder=1;
   mm_menu_0821141603_5.menuItemBorder=1;
   mm_menu_0821141603_5.menuLiteBgColor='#ffffff';
   mm_menu_0821141603_5.menuBorderBgColor='#777777';
   mm_menu_0821141603_5.bgColor='#555555';
  window.mm_menu_0821141603_6 = new Menu("root",151,20,"Verdana, Arial, Helvetica, sans-serif",10,"#333333","#ffffff","#ffffcc","#3366cc","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_0821141603_6.addMenuItem("News&nbsp;&amp;&nbsp;Media&nbsp;Overview","location='http://www.tva.gov/news/index.htm'");
  mm_menu_0821141603_6.addMenuItem("News&nbsp;Releases","location='http://www.tva.gov/news/releases/index.htm'");
  mm_menu_0821141603_6.addMenuItem("Media&nbsp;Contacts","location='http://www.tva.gov/news/contacts.htm'");
  mm_menu_0821141603_6.addMenuItem("TVA&nbsp;Leadership&nbsp;Team","location='http://www.tva.gov/news/execs.htm'");
   mm_menu_0821141603_6.addMenuItem("TVA&nbsp;FAQ","location='http://www.tva.gov/abouttva/keyfacts.htm'");
  mm_menu_0821141603_6.addMenuItem("Glossary","location='http://www.tva.gov/news/glossary.htm'");
   mm_menu_0821141603_6.hideOnMouseOut=true;
   mm_menu_0821141603_6.menuBorder=1;
   mm_menu_0821141603_6.menuItemBorder=1;
   mm_menu_0821141603_6.menuLiteBgColor='#ffffff';
   mm_menu_0821141603_6.menuBorderBgColor='#777777';
   mm_menu_0821141603_6.bgColor='#555555';

  mm_menu_0821141603_6.writeMenus();
} // mmLoadMenus()

function preloader() {
	if(!is_nav){
		MM_preloadImages('http://www.tva.gov/Templates/images/abouttva_o.gif','http://www.tva.gov/Templates/images/powersystem_o.gif','http://www.tva.gov/Templates/images/environment_o.gif','http://www.tva.gov/Templates/images/riversystem_o.gif','http://www.tva.gov/Templates/images/econdev_o.gif','http://www.tva.gov/Templates/images/investor_o.gif','http://www.tva.gov/Templates/images/news_o.gif','http://www.tva.gov/Templates/images/tvahome_o.gif','http://www.tva.gov/Templates/images/contactus_o.gif','http://www.tva.gov/Templates/images/sitehelp_o.gif');
	}
} // preloader()

function MM_jumpMenu(targ,selObj,restore) { //v3.0
	eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
	if (restore) selObj.selectedIndex=0;
} //end MM_jumpMenu(targ,selObj,restore)

function doHeader()	{
	var output="";
	var agt=navigator.userAgent.toLowerCase();
	this.major = parseInt(navigator.appVersion);
	this.minor = parseFloat(navigator.appVersion);
	this.ie = (agt.indexOf("msie") != -1);
	output += "<table width=\"758\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	output += "  <tr>";
	output += "    <td width=\"85\" valign=\"bottom\"><a href=\"#main\"><img name=\"skipnav\" src=\"http://www.tva.gov/Templates/images/skipnav.gif\" width=\"85\" height=\"6\" border=\"0\" alt=\"skip to main content\"></a><a href=\"http://www.tva.gov/index.htm\"><img name=\"logo\" src=\"http://www.tva.gov/Templates/images/logo.jpg\" width=\"85\" height=\"57\" border=\"0\" alt=\"TVA Logo\"></a></td>";
	output += "    <td bgcolor=\"#000000\" valign=\"bottom\" width=\"450\"><img name=\"tvaart\" src=\"http://www.tva.gov/Templates/images/tvaart.jpg\" width=\"455\" height=\"63\" border=\"0\" alt=\"Tennessee Valley Authority\"></td>";
	output += "    <td bgcolor=\"#000000\" valign=\"middle\" width=\"218\">";
	output += "      <table width=\"200\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	output += "        <form action=\"http://www.tva.gov/cgi-bin/search\" method=\"post\" enctype=\"application/x-www-form-urlencoded\" name=\"search\">";
	output += "          <tr bgcolor=\"#000000\">";
	output += "            <td width=\"62\">";
	output += "              <input type=\"hidden\" name=\"config\" size=\"-1\" value=\"www\">";
	output += "              &nbsp; </td>";
	output += "            <td valign=\"bottom\" width=\"135\" nowrap><a href=\"http://www.tva.gov/search/index.htm\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('sitehelp2111','','http://www.tva.gov/Templates/images/sitehelp_o.gif',1)\"><img name=\"sitehelp2111\" src=\"http://www.tva.gov/Templates/images/sitehelp.gif\" width=\"54\" height=\"18\" border=\"0\" alt=\"Site Help\"></a><a href=\"http://www.tva.gov/abouttva/contact.htm\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('contactus2111','','http://www.tva.gov/Templates/images/contactus_o.gif',1)\"><img name=\"contactus2111\" src=\"http://www.tva.gov/Templates/images/contactus.gif\" width=\"58\" height=\"18\" border=\"0\" alt=\"Contact Us\"></a>";
	output += "            </td>";
	output += "          </tr>";
	output += "          <tr bgcolor=\"#000000\" valign=\"middle\">";
	output += "            <td width=\"62\" align=\"right\" nowrap>";
	output += "              <input type=\"image\" border=\"0\" name=\"imageField2\" src=\"http://www.tva.gov/Templates/images/sitesearch.jpg\" width=\"62\" height=\"16\" alt=\"Search and Go Button\">";
	output += "            </td>";
	output += "            <td width=\"135\">";
	output += "              <input type=\"text\" name=\"txtquery\" id=\"txtquery\" size=\"18\" maxlength=\"256\">";
	output += "            </td>";
	output += "          </tr>";
	output += "          <tr bgcolor=\"#000000\" valign=\"middle\">";
	output += "            <td width=\"62\" align=\"right\" nowrap height=\"8\"></td>";
	output += "            <td width=\"135\" height=\"8\"></td>";
	output += "          </tr>";
	output += "        </form>";
	output += "      </table>";
	output += "    </td>";
	output += "  </tr>";
	output += "</table>";
	output += "<table width=\"758\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	output += "  <tr>";
	output += "    <td><a href=\"http://www.tva.gov/index.htm\" onMouseOut=\"MM_swapImgRestore();\" onMouseOver=\"MM_swapImage('tvahome','','http://www.tva.gov/Templates/images/tvahome_o.gif',1);\"><img name=\"tvahome\" src=\"http://www.tva.gov/Templates/images/tvahome.gif\" width=\"62\" height=\"21\" border=\"0\" alt=\"TVA Home\"></a></td>";
	output += "    <td><a href=\"http://www.tva.gov/abouttva/index.htm\" onMouseOut=\"MM_swapImgRestore();MM_startTimeout();\" onMouseOver=\"MM_showMenu(window.mm_menu_0821141603_0,0,21,null,'abouttva');MM_swapImage('abouttva','','http://www.tva.gov/Templates/images/abouttva_o.gif',1);\"><img name=\"abouttva\" src=\"http://www.tva.gov/Templates/images/abouttva.gif\" width=\"63\" height=\"21\" border=\"0\" alt=\"About TVA\"></a></td>";
	output += "    <td><a href=\"http://www.tva.gov/power/index.htm\" onMouseOut=\"MM_swapImgRestore();MM_startTimeout();\" onMouseOver=\"MM_showMenu(window.mm_menu_0821141603_1,0,21,null,'powersystem');MM_swapImage('powersystem','','http://www.tva.gov/Templates/images/powersystem_o.gif',1);\"><img name=\"powersystem\" src=\"http://www.tva.gov/Templates/images/powersystem.gif\" width=\"83\" height=\"21\" border=\"0\" alt=\"Power System\"></a></td>";
	output += "    <td><a href=\"http://www.tva.gov/environment/index.htm\" onMouseOut=\"MM_swapImgRestore();MM_startTimeout();\" onMouseOver=\"MM_showMenu(window.mm_menu_0821141603_2,0,21,null,'environment');MM_swapImage('environment','','http://www.tva.gov/Templates/images/environment_o.gif',1);\"><img name=\"environment\" src=\"http://www.tva.gov/Templates/images/environment.gif\" width=\"151\" height=\"21\" border=\"0\" alt=\"Environmental Stewardship\"></a></td>";
	output += "    <td><a href=\"http://www.tva.gov/river/index.htm\" onMouseOut=\"MM_swapImgRestore();MM_startTimeout();\" onMouseOver=\"MM_showMenu(window.mm_menu_0821141603_3,-1,21,null,'riversystem');MM_swapImage('riversystem','','http://www.tva.gov/Templates/images/riversystem_o.gif',1);\"><img name=\"riversystem\" src=\"http://www.tva.gov/Templates/images/riversystem.gif\" width=\"77\" height=\"21\" border=\"0\" alt=\"River System\"></a></td>";
	output += "    <td><a href=\"http://www.tvaed.com/index.htm\" onMouseOut=\"MM_swapImgRestore();MM_startTimeout();\" onMouseOver=\"MM_showMenu(window.mm_menu_0821141603_4,0,21,null,'econdev');MM_swapImage('econdev','','http://www.tva.gov/Templates/images/econdev_o.gif',1);\"><img name=\"econdev\" src=\"http://www.tva.gov/Templates/images/econdev.gif\" width=\"129\" height=\"21\" border=\"0\" alt=\"Economic Development\"></a></td>";
	output += "    <td><a href=\"/finance/index.htm\" onMouseOut=\"MM_swapImgRestore();MM_startTimeout();\" onMouseOver=\"MM_showMenu(window.mm_menu_0821141603_5,0,21,null,'investor');MM_swapImage('investor','','http://www.tva.gov/Templates/images/investor_o.gif',1);\"><img name=\"investor\" src=\"http://www.tva.gov/Templates/images/investor.gif\" width=\"107\" height=\"21\" border=\"0\" alt=\"Investor Resources\"></a></td>";
	output += "    <td><a href=\"http://www.tva.gov/news/index.htm\" onMouseOut=\"MM_swapImgRestore();MM_startTimeout();\" onMouseOver=\"MM_showMenu(window.mm_menu_0821141603_6,-91,21,null,'news');MM_swapImage('news','','http://www.tva.gov/Templates/images/news_o.gif',1);\"><img name=\"news\" src=\"http://www.tva.gov/Templates/images/news.jpg\" width=\"86\" height=\"21\" border=\"0\" alt=\"TVA Newsroom\"></a></td>";
	output += "  </tr>";
	output += "</table>";
	document.write(output);
} //doHeader()

function doFooter()	{
	var outputf="";
	outputf += "<table width=\"758\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	outputf += "  <tr>";
	outputf += "    <td bgcolor=\"#FFFFCC\" valign=\"middle\" height=\"46\" width=\"64\"><img src=\"http://www.tva.gov/Templates/images/bottomcorner2.gif\" width=\"64\" height=\"46\" alt=\"left corner image\"></td>";
	outputf += "    <td bgcolor=\"#FFFFCC\" valign=\"middle\" height=\"46\" width=\"630\">";
	outputf += "      <div align=\"center\"> <font face=\"Verdana, Arial, Helvetica, sans-serif\" size=\"1\"><a href=\"http://www.tva.gov/abouttva/contact.htm\">Contact";
	outputf += "        Us</a> | <a href=\"http://www.tva.gov/search/index.htm\">Search</a> | <a href=\"http://www.tva.gov/disclaim.htm\">Legal";
	outputf += "        Notices</a> | <a href=\"http://www.tva.gov/abouttva/privacy.htm\">Privacy Policy</a> | <a href=\"http://www.tva.gov/employment/index.htm\">Employment</a> | <a href=\"http://www.tva.gov/foia/index.htm\">FOIA</a> | <a href=\"/abouttva/nofear/index.htm\">No Fear Act Data</a> | <a href=\"/abouttva/link_policy.htm\">Linking Policy</a><br>";
	outputf += "        <a href=\"http://www.tva.gov/index.htm\">TVA Home</a> | <a href=\"http://www.tva.gov/abouttva/index.htm\">About";
	outputf += "        TVA</a> | <a href=\"http://www.tva.gov/power/index.htm\">Power</a> | <a href=\"http://www.tva.gov/environment/index.htm\">Environment</a>";
	outputf += "        | <a href=\"http://www.tva.gov/river/index.htm\">Rivers</a> | <a href=\"http://www.tvaed.com/index.htm\">Economic";
	outputf += "        Development</a> | <a href=\"http://www.tva.gov/finance/index.htm\">Investors</a> | <a href=\"http://www.tva.gov/news/index.htm\">News</a></font></div>";
	outputf += "    </td>";
	outputf += "    <td width=\"50\" valign=\"middle\">";
	outputf += "      <div align=\"left\"><img src=\"http://www.tva.gov/Templates/images/bottomcorner.gif\" width=\"64\" height=\"46\" alt=\"right corner image\"></div>";
	outputf += "    </td>";
	outputf += "  </tr>";
	outputf += "</table>";
	document.write(outputf);
} //doFooter()

