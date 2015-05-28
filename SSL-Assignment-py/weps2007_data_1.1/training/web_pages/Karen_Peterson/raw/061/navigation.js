var subLinks = new Array()
var topLinks = new Array()
var relLinks = new Array()
var level2Links = new Array()
var pageOffset = 0
var scrollOffset = 0

function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);

  if (endstr == -1) {
    endstr = document.cookie.length;
  }
  return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;

  while (i <  clen) {
    var j = i + alen;

    if (document.cookie.substring(i, j) == arg) {
      return getCookieVal (j);
    }

    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) {
      break;
    }
  }
  return null;
}

function topLink(tTopic,tHref,tLevel,tHigh){
  this.topic = tTopic
  this.href = tHref
  this.level = tLevel
  this.high = tHigh
  topLinks[topLinks.length] = this
}

function subLink($topic,$href,$level,$high,$onclick){
  this.topic = $topic
  this.href = $href
  this.level = $level
  this.high = $high
  this.onclick = $onclick
  subLinks[subLinks.length] = this
}

function subLink2($topic,$href,$level,$high){
  this.topic = $topic
  this.href = $href
  this.level = $level
  this.high = $high
  subLinks[subLinks.length] = this
}

function sublinkParent(sTitle, sName){
  this.title = sTitle
  this.name = sName
  level2Links[level2Links.length] = new Array()
  level2Links[level2Links.length - 1][0] = this
}

function sublinkChild(sTitle, sParent, sHref, iLevel, iGraphic){
  this.title = sTitle
  this.parent = sParent
  this.href = sHref
  this.level = iLevel
  this.graphic = iGraphic
  for (i=0;i<level2Links.length;i++){
    if (sParent==level2Links[i][0].name){
      level2Links[i][level2Links[i].length] = this
    }
  }
}

function relLink($topic,$href){
}


  
function buildSubNav(inCategory){

	if (inCategory != null) {
   	category = inCategory;
	}

   // variables for submenu heading image
   var researchHead    = "/1_researchanalysis/images/research_head.gif";
   var consultingHead  = "/3_consulting_services/images/consulting_head.gif";
   var ssHead  = "/3_consulting_services/images/ss_head.gif";
   var itmmHead  = "/3_consulting_services/images/itmm_head.gif";
   var mbsHead  = "/3_consulting_services/images/mbs_head.gif";
   var hcmHead  = "/2_events/hcm/images/hcm_head.gif";
   var measurementHead = "/4_decision_tools/measurement/images/measurement_head.gif";
   var communityHead   = "/2_events/community/images/community_head.gif";
   var newsHead        = "/5_about/news/images/news_head.gif";
   var helpHead        = "/6_help/images/help_head.gif";
   var noHead          = "/images/no_head.gif";


   //  specify character(s) in the url
   var sectionNumber = location.pathname.substring(1, 2);
   var sectionNews = location.pathname.substring(1, 13);
   var sectionDecisionTools = location.pathname.substring(1, 44);
   var sectionSS = location.pathname.substring(1, 31); 
   var sectionITMM = location.pathname.substring(1, 27); 
   var sectionMBS = location.pathname.substring(1, 26);
   var sectionHCM = location.pathname.substring(1, 4);          
   var sectionEvents = location.pathname.substring(1, 3);
   var sectionExp = location.pathname.substring(1, 38);
   var sectionFocus2 = location.pathname.substring(1, 6);
   var sectionPrivacy = location.pathname.substring(1, 6);
   var sectionPrinciples = location.pathname.substring(1, 24);

   

   if (category != null) {

      if (category == 1) {
         menuHead = researchHead;
         }
      else
      if (category == 2) {
         menuHead = consultingHead;
         }   
      else
      if (category == 2.1) {
         menuHead = ssHead;
         }   
      else
      if (category == 2.2) {
         menuHead = itmmHead;
         }   
      else
      if (category == 2.4) {
         menuHead = mbsHead;
         }   
      else
      if (category == 3) {
         menuHead = measurementHead;
         }
      else
      if (category == 4) {
         menuHead = communityHead;
         }   
      else
      if (category == 5) {
         menuHead = newsHead;
         }
      else
      if (category == 6) {
         menuHead = helpHead;
         }
      else
      if (category == 8) {
          menuHead = newsHead;
         }
      else
      if (category == 9) {
         menuHead = communityHead;
         }
         
      else  menuHead = noHead;

      }
      
    else {
      var category = null;
      
     if (sectionPrinciples == "pages/story.php.id.2635")
         {menuHead = researchHead;}
      else
      if (sectionPrinciples == "pages/story.php.id.2630")
         {menuHead = researchHead;
         }
      else
      if (sectionFocus2 == "pages")
         {menuHead = researchHead;
         }
      else
      if (sectionExp == "1_researchanalysis/executive_programs")
         {menuHead = communityHead;
         }         
      else
       if (sectionEvents == "Ev")
         {menuHead = communityHead;
         }
      else
       if (sectionNumber == "1")
         {menuHead = researchHead;
         }
      else
      if (sectionDecisionTools == "4_decision_tools/measurement/decision_tools")
         {menuHead = researchHead;
         }
      else
       if (sectionNumber == "2")
         {menuHead = communityHead;
         }
      else
       if (sectionSS == "3_consulting_services/sourcing")
         {menuHead = ssHead;
         }
      else
       if (sectionITMM == "3_consulting_services/itmm")
         {menuHead = itmmHead;
         }
      else
       if (sectionMBS == "3_consulting_services/mbs")
         {menuHead = ssHead;
         }
      else
       if (sectionNumber == "3")
         {menuHead = consultingHead;
         }
      else
       if (sectionNumber == "4")
         {menuHead = measurementHead;
         }
      else
       if (sectionHCM == "hcm")
         {menuHead = hcmHead;
         }
      else
       if (sectionNews == "5_about/news")
         {menuHead = newsHead;
         }
      else
       if (sectionNumber == "6")
         {menuHead = helpHead;
         }
                  
      else menuHead = noHead;
      }
      
	  
	  
   var sNav= '' ;

   if (subLinks.length){
   
   sNav = '<table border="0" cellspacing="0" cellpadding="0" width="190">\n'
   sNav += '<tr>\n\t<td><img src="'+menuHead+'" height="31" width="190" alt="" border="0"></td>\n</tr>\n'
   sNav += '<tr>\n\t<td><img src="/images/trans_pixel.gif" height="2" width="190" alt="" border="0"></td>\n</tr>\n'
   sNav += '</table>'
   }


  if (subLinks.length){
    sNav += '<table border="0" cellspacing="0" cellpadding="0" width="190">\n'
    sNav += '<tr>\n\t<td class="borderCell" rowspan="100"><img src="/images/trans_pixel.gif" height="1" width="1" alt="" border="0"></td>\n'
    sNav += '\t<td class="borderCell"><img src="/images/trans_pixel.gif" height="1" width="188" alt="" border="0"></td>\n'
    sNav += '\t<td class="borderCell" rowspan="100"><img src="/images/trans_pixel.gif" height="1" width="1" alt="" border="0"></td>\n</tr>\n'

    for (i=0; i<subLinks.length; i++){
      if (subLinks[i].onclick){strOnclick = 'onclick="'+subLinks[i].onclick+'" '} else {strOnclick=''}
      if (subLinks[i].high){
	    sNav += '<tr>\n\t<td class="highlightCell"><img src="/images/transparent.gif" width="1" height="3" align="left" alt="" border="0"></td>\n</tr>\n'
        sNav += '<tr>\n\t<td class="highlightCell"><img src="/images/transparent.gif" width="6" height="18" align="left" alt="" border="0"><span class="rightNavHighText">'+subLinks[i].topic+'</span><br /><img src="/images/transparent.gif" height="3" border="0"><br /></td>\n</tr>\n'
      }
      else{
        if ( (category == 6) & (subLinks[i].topic == 'Download Help Documentation') ){
          sNav += '<tr>\n\t<td class="menuGray"><img src="/images/transparent.gif" width="1" height="3" align="left" alt="" border="0"></td>\n</tr>\n'
          sNav += '<tr>\n\t<td class="menuGray"><img src="/images/transparent.gif" width="6" height="25" align="left" alt="" border="0"><a href="'+subLinks[i].href+'" '+strOnclick+'class="rightNavText">'+subLinks[i].topic+' (Adobe PDF)</a></td>\n</tr>\n'
        }
        else {
          sNav += '<tr>\n\t<td class="menuGray"><img src="/images/transparent.gif" width="1" height="3" align="left" alt="" border="0"></td>\n</tr>\n'
          sNav += '<tr>\n\t<td class="menuGray"><img src="/images/transparent.gif" width="6" height="18" align="left" alt="" border="0"><a href="'+subLinks[i].href+'" '+strOnclick+'class="rightNavText">'+subLinks[i].topic+'</a><br /><img src="/images/transparent.gif" height="3" border="0"><br /></td>\n</tr>\n'
        }
      }

      sNav += '<tr>\n\t<td class="borderCell" height="1"><img src="/images/trans_pixel.gif" height="1" width="1" alt="" border="0"></td>\n</tr>\n'
    }

    sNav+= '</table>'
  }
  else{
    if (level2Links.length)	{
      sNav = '<table border="0" cellspacing="0" cellpadding="0" width="190">\n'
      sNav += '<tr>\n\t<td class="borderCell" rowspan="100"><img src="/images/trans_pixel.gif" height="1" width="1" alt="" border="0"></td>\n'
      sNav += '\t<td class="borderCell"><img src="/images/trans_pixel.gif" height="1" width="188" alt="" border="0"></td>\n'
      sNav += '\t<td class="borderCell" rowspan="100"><img src="/images/trans_pixel.gif" height="1" width="1" alt="" border="0"></td>\n</tr>\n'
      sNav += '<tr>\n\t<td class="highlightCell"><img src="/images/transparent.gif" width="1" height="3" align="left" alt="" border="0"></td>\n</tr>\n'

      for ( i = 0; i < level2Links.length; i++ )	{
        if (level2Links[i].onclick){strOnclick = 'onclick="'+Level2Links[i].onclick+'" '} else {strOnclick=''}
        sNav += '<tr>\n\t<td class="highlightCell"><img src="/images/transparent.gif" width="6" height="16" align="left" alt="" border="0"><span class="rightNavText">'+level2Links[ i ][ 0 ].title+'</span></td>\n</tr>\n'
        sNav += '<tr>\n\t<td class="borderCell" height="1"><img src="/images/trans_pixel.gif" height="1" width="1" alt="" border="0"></td>\n</tr>\n'

        for ( j = 1; j < level2Links[ i ].length; j++ )	{
          sNav += '<tr>\n\t<td class="menuGray"><img src="/images/transparent.gif" width="6" height="16" align="left" alt="" border="0"><a href="'+level2Links[ i ][ j ].href+'" '+strOnclick+'class="rightNavText">'+level2Links[ i ][ j ].title+'</a></td>\n</tr>\n'
          sNav += '<tr>\n\t<td class="borderCell" height="1"><img src="/images/trans_pixel.gif" height="1" width="1" alt="" border="0"></td>\n</tr>\n'
        }
      }
      sNav += '</table>'
    }
  }
  return sNav
}

  function buildTopNav(){  // buildTopNav function
    
    GetCookie('userLocaleCookie');
    
    var tNav = ''
      
      if (topLinks.length > 0){
        
        var tArea = '';
        var tLink = '';
        var userLocaleCookie = GetCookie('userLocaleCookie');
        var localeDir = 'emea/';
        
        if (userLocaleCookie == null || userLocaleCookie == 'null')
        {
          userLocaleCookie = 'wcw';
        }
        else if (userLocaleCookie == 'de') {
          localeDir = "emea/de/";
        }
        else if (userLocaleCookie == 'at') {
          localeDir = "emea/de/at/";
        }
        else if (userLocaleCookie == 'it') {
          localeDir = "emea/it/";
        }
        else if (userLocaleCookie == 'fr') {
          localeDir = "emea/fr/";
        }
        else if (userLocaleCookie == 'uk') {
          localeDir = "emea/uk/";
        }
        else if (userLocaleCookie == 'emea') {
          localeDir = "emea/";
        }
        
        switch(category) {
        case 1:
          tArea = 'Research';
          if (userLocaleCookie == 'wcw') {
            tLink = '/1_researchanalysis/research_overview.html'
            } else {
              tLink = '/regionalization/content/' + localeDir + '01_research.html'
              }
          break;
        case 2:
          tArea = 'Community';
          if (userLocaleCookie == 'wcw') {
            tLink = '/2_events/community/community_overview.html'
            } else {
              tLink = '/regionalization/content/' + localeDir + '04_community.html'
              }
          break;
        case 3:
          tArea = 'Consulting';
          if (userLocaleCookie == 'wcw') {
            tLink = '/3_consulting_services/consulting_overview.html'
            } else {
              tLink = '/regionalization/content/' + localeDir + '02_consulting.html'
              }
          break;
        case 4:
          tArea = 'Benchmarking';
          if (userLocaleCookie == 'wcw') {
            tLink = '/3_consulting_services/benchmarking/benchmarking_Solutions.jsp'
            } else {
              tLink = '/3_consulting_services/benchmarking/benchmarking_Solutions.jsp'
              }
          break;
        case 5:
          tArea = 'About Gartner';
          if (userLocaleCookie == 'wcw') {
            tLink = '/5_about/company_information/41a.html'
            } else {
              tLink = '/regionalization/content/' + localeDir + '05_z_about.html'
              }
          break;
        case 6:
          tArea = 'Help';
          tLink = '/6_help/help_overview.html'
            break;
        case 7:
          break;
        case 8:
          tArea = 'News';
          if (userLocaleCookie == 'wcw') {
            tLink = '/5_about/news/news_overview.html'
            } else {
              tLink = '/regionalization/content/' + localeDir + '05_news.html'
              }
          break;
        case 9:
          tArea = 'Community';
          if (userLocaleCookie == 'wcw') {
            tLink = '/2_events/community/community_overview.html'
            } else {
              tLink = '/regionalization/content/' + localeDir + '04_community.html'
              }
          break;
        } //end switch
        
        tNav += '\t\t<table border="0" cellspacing="0" cellpadding="0">\n'
          tNav += '\t\t\t<tr>\n'
          tNav += '\t\t\t\t<td height="17"><img src="/images/trans_pixel.gif" width="20" height="1" alt="" border="0"></td>\n'
          
          if (category != 7){
            tNav += '\t\t\t\t<td valign="middle" class="crumbBold"> <a class="topNavText" href="'+tLink+'">'+tArea+'</a> </td>\n'
              for (i = 0; i < topLinks.length; i++){
                tNav += '\t\t\t\t<td valign="middle">&nbsp;&nbsp;<img src="/images/breadcrumbs_arrow_071201.gif" width="16" height="17" alt="" align="middle" border="0">&nbsp;&nbsp;</td>'
                  
                  if (topLinks[i].high){
                    tNav += '<td valign="middle" class="crumbNorm">'+topLinks[i].topic+'</td>'
                    }
                  else{
                    tNav += '<td valign="middle" class="crumbNorm"> <a class="topNavText" href="'+topLinks[i].href+'">'+topLinks[i].topic+'</a> </td>'
                    }
                } // end for
            } //end if
          else {
            tNav += '<td valign="middle" class="crumbBold">'+topLinks[0].topic+'</td>'
              for (i = 1; i < topLinks.length; i++){
                tNav += '\t\t\t\t<td valign="middle">&nbsp;&nbsp;<img src="/images/breadcrumbs_arrow_071201.gif" width="16" height="17" alt="" border="0">&nbsp;&nbsp;</td>'
                  if (topLinks[i].high){
                    tNav += '<td valign="middle" class="crumbNorm">'+topLinks[i].topic+'</td>'
                    }
                  else{
                    tNav += '<td valign="middle" class="crumbNorm"> <a class="topNavText" href="'+topLinks[i].href+'">'+topLinks[i].topic+'</a> </td>'
                    }
                  
                } // end for
              
            }
          tNav += '\t\t\t</tr>\n'
          tNav += '\t\t</table>\n'
        } //end if
      
      
      return tNav
      
    } // end buildTopNav 
  
  