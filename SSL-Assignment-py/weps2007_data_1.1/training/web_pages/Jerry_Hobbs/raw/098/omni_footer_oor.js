/* You may give each page an identifying name, server, and channel on the next lines. */
var lhostName = document.location.hostname.toLowerCase();
var lpathName = document.location.pathname.toLowerCase();
var myPageName=(lhostName.indexOf('www')!=-1?lhostName:"www."+lhostName);
myPageName+=(lpathName=="/"?"/index.html":lpathName);
s.pageName=myPageName;
s.server=""
s.channel="ctv_" + firstFolderSect;
s.pageType="";
if (typeof topBanner == "undefined") s.prop1="";
else s.prop1="ctv_TopBanner_" + firstFolderSect;
if (typeof rightBanner == "undefined") s.prop2="";
else s.prop2="ctv_RightBanner_" + firstFolderSect;
if (typeof middleBanner == "undefined") s.prop3="";
else s.prop3="ctv_middleBanner_" + firstFolderSect;
if (typeof bottomBanner == "undefined") s.prop4="";
else s.prop4="ctv_bottomBanner_" + firstFolderSect;
s.prop5="CourtTV";
s.prop6="";
if (typeof photoPathURL == "undefined") s.prop7="";
else s.prop7=photoPathURL;

if (typeof BRight300 == "undefined") s.prop8="";
else s.prop8="ctv_BRight300Banner_" + firstFolderSect;
if (typeof TopNewBanner == "undefined") s.prop9="";
else s.prop9="ctv_TopNewBanner_" + firstFolderSect;
if (typeof popupBanner == "undefined") s.prop10="";
else s.prop10="ctv_popupBanner_" + firstFolderSect;
if (typeof rightNewBanner == "undefined") s.prop11="";
else s.prop11="ctv_rightNewBanner_" + firstFolderSect;
if (typeof TRight300 == "undefined") s.prop12="";
else s.prop12="ctv_TRight300Banner_" + firstFolderSect;


/* E-commerce Variables */
s.campaign=s.getQueryParam("link");
s.state=""
s.zip=""
if (s.campaign.toLowerCase() == "eaf")
{
	omni_event = "event3";
	omni_eVar1 = lpathName;
}
if (typeof omni_event == "undefined") s.events="";
else s.events=omni_event;
s.products=""
s.purchaseID=""
if (typeof omni_eVar1 == "undefined") s.eVar1="";
else s.eVar1=omni_eVar1.toLowerCase();
if (s.campaign != "") s.eVar2=lpathName;
else s.eVar2="";
s.eVar3=""
s.eVar4=""
s.eVar5=""
s.hier1=hierSections;

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code=s.t();if(s_code)document.write(s_code)

