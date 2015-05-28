//Determine browser
var ie = (navigator.appName.indexOf('Microsoft') != -1) ? true : false;
var ns = (navigator.appName.indexOf('Netscape') != -1) ? true : false;
var ns4 = (ns && document.layers) ? true : false;
var ns6 = (ns && document.getElementById) ? true : false;
var dom = (document.getElementById) ? true : false;
var mac = ((navigator.appVersion.indexOf("PPC") >0) || (navigator.appVersion.indexOf("Mac") >0)) ? true : false;

var highRes = false;

if (screen!=null && (screen.width>800)){
	highRes = true;
	
}

// Array and function necessary for ads to show up in netscape
var ads = new Array();
	function ad(site, page, position, size){
		this.site = site;
		this.page = page;
		this.pos = position;
		this.sz = size;
}

//Variables needed for email a photo
var currentEPhoto = 0;
var imageLoc = new Array();
var imageCap = new Array();
var imageCre = new Array();
var imageAmex = new Array();

//needed for e-card
var imageNameArray = new Array();
var thumbNailLoc = new Array();

//Random Number generator
function Random(N) 
	{ return Math.floor( N*Math.random() );	} 
	
//Blank onLoad,init functions
function onLoad() {}
function init(bool) {}
var popupPath = '/popups/';

//Determine if user has registered in the past
function isRegistered() {
	var login = getCookie( "login" );
	if (( login != null ) && ( login != "null" )){
		//User is registered
		return true;
	}
	else {
		//User not registered
		return false;
	}
}

//Redirect to registration
function switchLocation(regLocation) {
	if ((typeof(regLocation) != "undefined") && (regLocation != null))
		window.location = '/' + regLocation + '/' + regLocation + 'registration.html';
	else
		window.location = '/rm/login.jsp?dest=/rm/rmSuccess.html?loc=login';
}

//define secure reg parameters in path
function getMorePathInfo(isPremium, regLocation) {
	var path = '';
	
	if ((typeof(regLocation) != "undefined") && (regLocation != null))
		path += "&regLocation=" + regLocation;
	if(!isPremium)
		path += "&reload=true";
	
	return path;
}

	
	






//Premium content gatekeeper (videoWin)
function pcGateKeeper(pcType, linkType, src, clipType, topImage, adSponsor, brandImage, brandImageLink, regLocation, relatedFrag, relatedTitle, curBGColor,headshot,headshotLink) {
	if(!isRegistered()) {
		//Not reg. Redirect to login
		if(pcType.indexOf("vid") != -1) {
			//Video content, set cookies
			var vidProperties = '<src>' + unescape(src) + '</src>';
			vidProperties += '<cType>' + unescape(clipType) + '</cType>';
			vidProperties += '<tImg>' + unescape(topImage) + '</tImg>';
			vidProperties += '<adSp>' + unescape(adSponsor) + '</adSp>';
			vidProperties += '<brImg>' + unescape(brandImage) + '</brImg>';
			vidProperties += '<brLink>' + unescape(brandImageLink) + '</brLink>';
			
			if ((typeof(relatedFrag) != "undefined") && (relatedFrag != null))
				vidProperties += '<rFrag>' + unescape(relatedFrag) + '</rFrag>';
				
			if ((typeof(relatedTitle) != "undefined") && (relatedTitle != null))
				vidProperties += '<rTitle>' + unescape(relatedTitle) + '</rTitle>';
			
			if ((typeof(curBGColor) != "undefined") && (curBGColor != null))
				vidProperties += '<curBGColor>' + unescape(curBGColor) + '</curBGColor>';
			
			
			var premiumCookie = '<pcType>' + pcType + '</pcType>'
			premiumCookie += '<linkType>' + linkType + '</linkType>';
			premiumCookie += '<loc>' + window.location + '</loc>';
			premiumCookie +=  vidProperties;
			
			SetCookie("NBA_PC", premiumCookie, null, "/");
		}
		//secure audio
		else if(pcType==("aud")) {
			var vidProperties = '<src>' + unescape(src) + '</src>';
			vidProperties += '<cType>' + unescape(clipType) + '</cType>';
			vidProperties += '<tImg>' + unescape(topImage) + '</tImg>';
			vidProperties += '<adSp>' + unescape(adSponsor) + '</adSp>';
			vidProperties += '<brImg>' + unescape(brandImage) + '</brImg>';
			vidProperties += '<brLink>' + unescape(brandImageLink) + '</brLink>';
			vidProperties += '<hShot>' + unescape(headshot) + '</hShot>';
			vidProperties += '<hLink>' + unescape(headshotLink) + '</hLink>';

			var premiumCookie = '<pcType>' + pcType + '</pcType>'
			premiumCookie += '<linkType>' + linkType + '</linkType>';
			premiumCookie += '<loc>' + window.location + '</loc>';
			premiumCookie +=  vidProperties;
			SetCookie("NBA_PC", premiumCookie, null, "/");
		}
		
		
		//switchLocation(regLocation);
		/* return false;*/
	}
		return true;
					
}


//this function is specifically for videoWinSecureWNBA
function pcGateKeeperWNBA(pcType, linkType, src, clipType, topImage, adSponsor, brandImage, brandImageLink, regLocation, relatedFrag, relatedTitle, curBGColor) {
	
		if(pcType.indexOf("vid") != -1) {
			//Video content, set cookies
			var vidProperties = '<src>' + unescape(src) + '</src>';
			vidProperties += '<cType>' + unescape(clipType) + '</cType>';
			vidProperties += '<tImg>' + unescape(topImage) + '</tImg>';
			vidProperties += '<adSp>' + unescape(adSponsor) + '</adSp>';
			vidProperties += '<brImg>' + unescape(brandImage) + '</brImg>';
			vidProperties += '<brLink>' + unescape(brandImageLink) + '</brLink>';
			
			if ((typeof(relatedFrag) != "undefined") && (relatedFrag != null))
				vidProperties += '<rFrag>' + unescape(relatedFrag) + '</rFrag>';
				
			if ((typeof(relatedTitle) != "undefined") && (relatedTitle != null))
				vidProperties += '<rTitle>' + unescape(relatedTitle) + '</rTitle>';
			
			if ((typeof(curBGColor) != "undefined") && (curBGColor != null))
				vidProperties += '<curBGColor>' + unescape(curBGColor) + '</curBGColor>';
								
			var premiumCookie = '<pcType>' + pcType + '</pcType>'
			premiumCookie += '<linkType>' + linkType + '</linkType>';
			premiumCookie += '<loc>' + window.location + '</loc>';
			premiumCookie +=  vidProperties;
			SetCookie("NBA_PC", premiumCookie, null, "/");

			//set the hostname as a cookie (i.e. "linuxpub1", "www.wnba.com")
			//secureVideoWNBA.js needs to know where to redirect after login/register
			var host = document.location.hostname;
			SetCookie("WSV_HOST", host, null, "/");
		}

	return true;
}


//broadband
//REMOVE THIS FUNCTION (openSecureBroadBandInside) APRIL 25th
function openSecureBroadBandInside(src,type,video){
if(video!=null||"undefined"!=typeof(video)){ 
	src = src + "%26video%3D" + video
}
loginPath = "/broadband/login.jsp?dest=" + src 
tokenPath = "/broadband/Connection.jsp?dest=" + src
	if(type!='text'){
		if(!isRegistered()) {	
			pcGateKeeper(escape('vid'),escape('openSecureBroadBand'),escape(src));
			if(type=='audio'){
				window.open(loginPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no"); 
			}else{
				window.open(loginPath,"BroadbandWin", "width=850,height=612,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
			}
		}else{
			if(type=='audio'){
				window.open(tokenPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
			}else{
				window.open(tokenPath,"BroadbandWin", "width=850,height=612,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
			}
		}
	} else {
		if(!isRegistered()) {	
			document.location="/broadband/login_full.jsp?dest="+ src ;
		}else{
			document.location=tokenPath;
		}
	}
}

//http://broadband.nba.com/cc/playa.php?content=audio&url=http://boss.streamos.com/wmedia-live/nba/7255/20_nba-chicago_audio_040930.asx&include=audio_default_include.html'),escape('audio'));

function openSecureBroadBand(src,type,video){
src = src + "%26video%3D" + video
tokenPath = "/broadband/Connection.jsp?dest=" + src
loginPath = "/broadband/login.jsp?dest=" + src 
	if(type=='audio'){
		if(!isRegistered()) {	
			pcGateKeeper(escape('vid'),escape('openSecureBroadBand'),escape(src));
			window.open(loginPath,"BroadbandWin", "width=570,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
		}else{
		window.open(tokenPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
		}
	}else{
		window.open(tokenPath,"BroadbandWin", "width=850,height=612,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
	}
//}
if(video!=null||"undefined"!=typeof(video)){ 
	src = src + "%26video%3D" + video
}
loginPath = "/broadband/login.jsp?dest=" + src 
tokenPath = "/broadband/Connection.jsp?dest=" + src
	if(type!='text'){
		if(!isRegistered()) {	
			pcGateKeeper(escape('vid'),escape('openSecureBroadBand'),escape(src));
			if(type=='audio'){
				window.open(loginPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no"); 
			}else{
				window.open(loginPath,"BroadbandWin", "width=850,height=612,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
			}
		}else{
			if(type=='audio'){
				window.open(tokenPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
			}else{
				window.open(tokenPath,"BroadbandWin", "width=850,height=612,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
			}
		}
	} else {
		if(!isRegistered()) {	
			document.location="/broadband/login_full.jsp?dest="+ src ;
		}else{
			document.location=tokenPath;
		}
	}
}

function openSecureLive(src,type){
loginPath = "/broadband/login.jsp?dest=" + src
tokenPath = "/broadband/Connection.jsp?dest=" + src
	if(type!='text'){
		if(!isRegistered()) {	
			pcGateKeeper(escape('vid'),escape('openSecureLive'),escape(src));
			if(type=='audio'){
				window.open(loginPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no"); 
			}else{
				window.open(loginPath,"BroadbandWin", "width=652,height=379,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
			}
		}else{
			if(type=='audio'){
				window.open(tokenPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
			}else{
				window.open(tokenPath,"BroadbandWin", "width=652,height=379,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
			}
		}
	} else {
		if(!isRegistered()) {	
			document.location="/broadband/live_games_login.jsp?dest=" + src ;
		}else{
			document.location=tokenPath;
		}
	}
}


function openBroadBand(src,type,video){
src = src + "%26video%3D" + video
tokenPath = "/broadband/Connection.jsp?dest=" + src
	if(type=='audio'){
		window.open(tokenPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
	}else{
		window.open(tokenPath,"BroadbandWin", "width=752,height=583,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
	}
}
//checks to see if link originated from nba section or team
function checkteams(){
	query = '' + this.location;
	if(query.indexOf('linuxpub1')>1){
		query = query.substring((query.indexOf('linuxpub1/')) + 10);
	}else if(query.indexOf('linuxpub2')>1){
		query = query.substring((query.indexOf('linuxpub2/')) + 10);
	}else{
		query = query.substring((query.indexOf('nba.com/')) + 8);
	}
	var section = query.substring(0,query.indexOf('/'));
		
		for (i=0;i<37;i++){
			if(checkteams.arguments[i] == section){
				nbaSiteVar = "%26nbasite%3D" + checkteams.arguments[i];
			i = 38
			}
		}
	if(typeof(nbaSiteVar)=="undefined"){nbaSiteVar = "%26nbasite%3Dnba"}
	return nbaSiteVar;
}
checkteams("celtics", "heat", "nets", "knicks", "magic", "sixers", "wizards", "hawks", "bulls", "cavaliers", "pistons", "pacers", "bucks", "hornets", "raptors", "mavericks", "nuggets", "rockets", "grizzlies", "timberwolves", "spurs","jazz", "warriors", "clippers", "lakers", "suns", "blazers", "kings", "sonics", "espanol", "france", "uk", "brasil", "germany", "japan","canada","bobcats")

function nbaVideo(src,video){

if(video=="team"){
src = src + "%26lc1%3DNBA.com%26lc2%3Dteamsites%26siteid=team";
}
if(src.indexOf("/nbacom/tnt/")>0||src.indexOf("/nbacom/tnt_soundoff/")>0){
	src = src + "%26video%3D" + "blank" + "%26tab%3D" + "tntchannel"
}else if(src.indexOf("/nbacom/allstar/")>0){
	src = src + "%26video%3D" + "blank" + "%26tab%3D" + "allstarchannel"
}else{
	src = src + "%26video%3D" + video
}
//tokenPath = "/broadband/Connection.jsp?dest=" + src
src = src + checkteams();
tokenPath = unescape(src);
	newWin=window.open(tokenPath,"BroadbandWin", "width=740,height=650,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
newWin.focus();
}


function nbaVideoLP(src,video){

if(video=="team"){
src = src + "%26lc1%3DNBA.com%26lc2%3Dteamsites";
}
if(src.indexOf("/nbacom/tnt/")>0||src.indexOf("/nbacom/tnt_soundoff/")>0){
	src = src + "%26video%3D" + "blank" + "%26tab%3D" + "tntchannel"
}else if(src.indexOf("/nbacom/allstar/")>0){
	src = src + "%26video%3D" + "blank" + "%26tab%3D" + "allstarchannel"
}else{
	src = src + "%26video%3D" + video
}
tokenPath = "/broadband/Connection.jsp?dest=" + src
		window.open(tokenPath,"BroadbandWin", "width=745,height=460,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
}




function nbaVideoShort(src,video){

if(video=="team"){
src = src + "%26lc1%3DNBA.com%26lc2%3Dteamsites";
}
if(src.indexOf("/nbacom/tnt/")>0||src.indexOf("/nbacom/tnt_soundoff/")>0){
	src = src + "%26video%3D" + "blank" + "%26tab%3D" + "tntchannel"
}else if(src.indexOf("/nbacom/allstar/")>0){
	src = src + "%26video%3D" + "blank" + "%26tab%3D" + "allstarchannel"
}else{
	src = src + "%26video%3D" + video
}
src = src + checkteams();
tokenPath = "/broadband/Connection.jsp?dest=" + escape("http://broadband.nba.com/cc/playa.php?content=video&url=") + src
		newWin=window.open(tokenPath,"BroadbandWin", "width=740,height=650,top=100,left=200,alwaysRaised=yes,toolbar=0,directories=0,menubar=0,status=0,resizable=no,location=0,scrollbars=0,copyhistory=0");
newWin.focus();
}

//team video
function openTeamVideo(URL,teamCode,vidType){
src =  URL  //+ "&vidType=" + vidType;
//loginPath = "/broadband/login.jsp?dest=" + src;
tokenPath = "/broadband/ZipCheck.jsp?dest=" + src + "&teamCode=" + teamCode + "&target="+escape(document.location);
loginPath = "/broadband/BroadbandLoginTeam.jsp?dest=" + src + "&teamCode=" + teamCode + "&target="+escape(document.location);
//tokenPath = "http://linuxweb1/rm/register.jsp?dest=" + escape=(src) + "RegType=TeamVideo";


	if(!isRegistered() && teamCode) {	
	pcGateKeeper(escape('vid'),escape('openTeamVideo'),escape(src));
		window.open(loginPath,"BroadbandWin", "width=520,height=340,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
	}else{
		window.open(tokenPath,"BroadbandWin", "width=320,height=240,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
	}
}

function openTeamALP(URL,teamCode){
src =  URL + "%26%74%73%3D%31";
//loginPath = "/broadband/login.jsp?dest=" + src;
tokenPath = "/broadband/Connection.jsp?dest=" + src + "&teamCode=" + teamCode + "&target="+escape(document.location);
loginPath = "/broadband/audio_login_team.jsp?dest=" + src + "&teamCode=" + teamCode + "&target="+escape(document.location);
//tokenPath = "http://linuxweb1/rm/register.jsp?dest=" + escape=(src) + "RegType=TeamVideo";


	if(!isRegistered() && teamCode) {	
	pcGateKeeper(escape('vid'),escape('openSecureBroadBand'),escape(src));
		window.open(loginPath,"BroadbandWin", "width=570,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
	}else{
		window.open(tokenPath,"BroadbandWin", "width=510,height=377,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no");
	}
}





function audioLeaguePass(src, clipType, topImage, adSponsor, brandImage, brandImageLink, isPremium,  regLocation, urlExt, vidDate, pidType, rsrcLink, vidLoc, akamai)
{
	if(!checkReal(src, clipType, topImage, adSponsor, brandImage, brandImageLink, isPremium,  regLocation, urlExt, vidDate, pidType, rsrcLink, akamai)){
		window.open('http://www.nba.com/premium.html','r1popup','width=250,height=300,toolbar=no,scrollbars=no,resizable=no,directories=no,location=no,status=no,menubar=no');
	}
}


//Real media window
function rmWin(src, title, brandImage, brandImageLink, isPremium, regLocation) 
{
	if(isPremium)
		pcGateKeeper('vid', 'rmWin', src, '', '', '', brandImage, brandImageLink, regLocation)

	selectTemplate('RM');
	path += "&src=" + src;
	path += getMorePathInfo(isPremium, regLocation);
	
	attrs = 'toolbar=0,menubar=0,scrollbars=0,scrolling=no,resizable=no,width=355';
	brand(462,462,brandImage,brandImageLink);
	gallery=window.open(path,newWinName(),attrs);
	gallery.focus();
	
}

//Avi window
function aviWin(src,title,brandImage,brandImageLink, isPremium, regLocation) {
	
	if(isPremium)
		pcGateKeeper('vid', 'aviWin', src, '', '', '', brandImage, brandImageLink, regLocation)

	selectTemplate('AVI');
	path += "&src=" + src + "&title=" +title;
	path += getMorePathInfo(isPremium, regLocation);
	
	attrs = 'toolbar=0,menubar=0,scrollbars=0,scrolling=no,resizable="no",width=355';
	brand(462,462,brandImage,brandImageLink);
	gallery=window.open(path,newWinName(),attrs);
	gallery.focus();
	
}

//Quicktime movie window
function movWin(src,title,brandImage,brandImageLink, isPremium, regLocation) {
	if(isPremium)
		pcGateKeeper('vid', 'movWin', src, '', '', '', brandImage, brandImageLink, regLocation)
	
	selectTemplate('MOV');
	path += "&src=" + src + "&title=" +title;
	path += getMorePathInfo(isPremium, regLocation);
	
	attrs = 'toolbar=0,menubar=0,scrollbars=0,scrolling=no,resizable="no",width=355';
	brand(462,462,brandImage,brandImageLink);
	gallery=window.open(path,newWinName(),attrs);
	gallery.focus();
	
}

//Popup audio window
function audioWin(src,clipType,topImage,headshot,headshotLink,adSponsor,brandImage,brandImageLink)
{
	path = popupPath + "audPopup.html";
	path += "?clipType=" + clipType + "&src=" + src + "&topImage=" + topImage + "&headshot=" + headshot + "&headshotLink=" + headshotLink + "&adSponsor=" + adSponsor;
	attrs = 'toolbar=0,menubar=0,scrollbars=0,scrolling=no,resizable=no,width=355';
	//attrs = 'height=400';
	brand(268,268,brandImage,brandImageLink);
	gallery=window.open(path,newWinName(),'height=412,toolbar=0,menubar=0,scrollbars=0,scrolling=no,resizable=no,width=355');
	gallery.focus();
}


function audioWinSecure(src,clipType,topImage,headshot,headshotLink,adSponsor,brandImage,brandImageLink,isPremium,regLocation)
{
	playerType = "audPopup.html";
	if(isPremium)

		pcGateKeeper('aud', 'audioWinSecure',src,clipType,topImage,adSponsor,brandImage,brandImageLink,isPremium,regLocation,'','','',headshot,headshotLink)
		path = popupPath + playerType;

		path += "?clipType=" + clipType + "&src=" + src + "&topImage=" + topImage + "&adSponsor=" + adSponsor;
		path += getMorePathInfo(isPremium, regLocation);
		
		attrs = 'toolbar=0,menubar=0,scrollbars=0,scrolling=no,resizable=no,width=355';
		brand(462,462,brandImage,brandImageLink);
		gallery=window.open(path,newWinName(),attrs);
		gallery.focus();
}


function audioWinHistory(src,clipType,topImage,headshot,headshotLink,adSponsor,brandImage,brandImageLink)
{
	path = popupPath + "audPopup_history.html";
	path += "?clipType=" + clipType + "&src=" + src + "&topImage=" + topImage + "&headshot=" + headshot + "&headshotLink=" + headshotLink + "&adSponsor=" + adSponsor;
	attrs = 'toolbar=0,menubar=0,scrollbars=0,scrolling=no,resizable=no,width=355';
	brand(268,268,brandImage,brandImageLink);
	gallery=window.open(path,newWinName(),attrs);
	gallery.focus();
	
}
//Real audio window
function raWin(src,title,brandImage,brandImageLink, isPremium, regLocation) {
	selectTemplate('RA');
	path += "&src=" + src + "&title=" +title;
	attrs = 'toolbar=0,menubar=0,scrollbars=0,scrolling=no,resizable="no",width=355';
	brand(427,347,brandImage,brandImageLink);
	gallery=window.open(path,newWinName(),attrs);
	gallery.focus();
}

//Generic Open-Window function
function open_window_ex(url, title, height, width, options) {
    var path = url;
    if( url.search(/^http:/) == -1 ) {
        path = "/popups/" + url;
    } else {
        var nbaDomain = new RegExp("/^http:\/\/www.nba.com\/([.*]*)/");
        var result = url.match(nbaDomain);
        if( result != null ) {
            path = "/popups/" + result[1];
        } else {
            path = url;
        }
    }
    var opts = '';
	if(options == null || options == "null")
		opts = 'toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=yes, resizable=yes';
    else
		opts = options;
		
	opts += ',width=' + width;
    opts += ',height=' + height;
    mywin=window.open(path,title,opts);
}

function open_window_ex_link(url, title, options) {
	mywin=window.open(url,title,options);
}
//Reason: Real player on ie will explode if re-opened in same window
function newWinName() {
	return('vidWin' +(new Date).valueOf());
}

function brand(bSize,noBSize,brandImage,brandImageLink) {
   if (brandImage != '') {
       path += "&brandImage="+brandImage;
       
	   if (brandImageLink != '')
	   		path += "&brandImageLink="+brandImageLink;
       
	   attrs += ",height="+bSize;
   }
   else {
       attrs += ",height="+noBSize;
   }
}

function selectTemplate(clipType) {
	if((clipType == 'RA') || (clipType=='RM'))
		path = popupPath + 'vidPopup_rn.html'
	else
		path = popupPath + 'vidPopup_ms.html'
	path+= '?clipType=' + clipType;
}
		
//Cookie Functions
function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function getCookie (name) {

if(name == "path" || name == "expires" || name == "domain" || name == "version") {
	name = "badCookieName";
}
 var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
	if (document.cookie.substring(i, j) == arg)
      return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 

  }
  return null;
}


function SetCookie (name,value,expires,path,domain,secure) {

if(name == "path" || name == "expires" || name == "domain" || name == "version") {
	name = "badCookieName";
}

  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}


// for aol hat 
function redir3(theForm)
{
	var anyString;
	var index;
	index=theForm.URL.selectedIndex
	anyString=theForm.URL.options[index].value;

	if (anyString.substring(0,3) == "aol"){
	   window.location=theForm.URL.options[index].value;
	   theForm.URL.focus();
	}
	else
	    {
	window.location=theForm.URL.options[index].value;
	}

	 return (false);
}

function openCourtSide(codeGame) {
	window.open( '/courtsidelive/csl_popup.html?game='+codeGame,'CourtsideLive','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=12,screenY=12,top=12,left=12,copyhistory=no,width=410,height=500' );
}
function openGallery(xmlfile) {
	window.open( 'http://www.nba.com/jm.jsp?ref=amex_galleries&dest=/photogallery/gallery_detect.html?xmlfile='+xmlfile,'NBA_Photos','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,width=740,height=604' );
}
function openGalleryThumb(xmlfile,team)	{
	window.open( '/jm.jsp?ref=Thumb_galleries&dest=/photogallery/gallery_detectThumb.html?xmlfile='+xmlfile+'&teamHeader='+team,'NBA_Photos','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,width=740,height=604' );
}
function openFlashGallery(xmlfile,team)	{
	window.open( '/jm.jsp?ref=flash_gallery&dest=/photogallery/flashGalleryDetect.html?xmlfile='+xmlfile+'&teamHeader='+team,'NBA_Photos','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,width=740,height=630' );
}
function openFlashGalleryTest(xmlfile,team)	{
	window.open( '/jm.jsp?ref=flash_gallery&dest=/photogallery/flashGalleryDetectTest.html?xmlfile='+xmlfile+'&teamHeader='+team,'NBA_Photos','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,width=740,height=630' );
}
function openFlashGallery(xmlfile,team,spnsr)
	{window.open( '/jm.jsp?ref=flash_gallery&dest=/photogallery/flashGalleryDetect.html?xmlfile='+xmlfile+'&teamHeader='+team+'&spnsr='+spnsr,'NBA_Photos','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,width=740,height=630' );}

version = parseInt(navigator.appVersion);
function mostPhotoPop(photoGalSite,photoGalTeamHeader) {
	var w=740;
	//var w=590;
	var h=604;
	if(photoGalSite==''){photoGalSite='NBA';}
	if(photoGalTeamHeader==''){photoGalTeamHeader='none';}
	photoGalPage = '/photogallery/mostPhotoPopup.html?sitestart='+photoGalSite+'&teamHeader='+photoGalTeamHeader+'&startTime=weekly';
	if(navigator.appName == "Netscape" && version < 5){
		var newWindow = window.open(photoGalPage,'testing','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,resizable=yes');
	} else {
		var newWindow = window.open(photoGalPage,'testing','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,width='+w+',height='+h );
	}
}
//check for aol browser and redirect to aol.nba.com
var browserType = navigator.userAgent
var url = window.location.href
if((browserType.indexOf("AOL") != -1)) {
	if((url.indexOf("aol.nba.com") == -1) && (url.indexOf("scores.nba.com") == -1) && (url.indexOf("search.nba.com") == -1)&& (url.indexOf("ufc.nba.com") == -1)){
	domLength = url.indexOf("com/")+4;
	newLoc = url.substring(domLength,url.length)
	document.location = "http://aol.nba.com/" + newLoc
	}
}


	function testIsValidObject(objToTest) {
		if (null == objToTest) {
			return false;
		}
		if ("undefined" == typeof(objToTest) ) {
			return false;
		}
		return true;

	}
	


var xmlhttp=false;
/*@cc_on
@if (@_jscript_version >= 5)
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
@else
	xmlhttp = false;
@end @*/
if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
  xmlhttp = new XMLHttpRequest();
}



function antiCache(tempUrl) {
	if (document.all) {
		ts = new Date().valueOf();
			return tempUrl+"?ts=" + ts;
	}
	return tempUrl;
}
	

function showLayer(layerName){
		if(document.layers){
			eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.visibility="visible"');
		}else{
		eval('document.getElementById('+ "'" + layerName + "'" +').style.visibility = "visible"');
		}
}
 	
function hideLayer(layerName){
		 if(document.layers){
			eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.visibility="hidden"');
		}else{
		eval('document.getElementById('+ "'" + layerName + "'" +').style.visibility = "hidden"');
		}
}

//-------------------------------------
//recursive function scans through the numerical layers array for a layer with the required id
//------------------------------------
function getRefToDiv(divID) {
    if( document.layers ) { return document.layers[divID].document.layers[divID]; }
    if( document.getElementById ) { return document.getElementById(divID); }
    if( document.all ) { return document.all[divID]; }
    if( document[divID] ) { return document[divID].document[divID]; }
    return false;
}

//----------------------------------
// allows a positioned element be shown
//----------------------------------

function showDiv(divID_as_a_string) {
    var myReference = getRefToDiv(divID_as_a_string);
    if( !myReference ) { window.alert('Your Browser version does not support this feature'); return; }
    if( myReference.style ) { myReference.style.visibility = 'visible'; } else {
        if( myReference.visibility ) { myReference.visibility = 'show'; } else {
            window.alert('Your Browser version does not support this feature'); return; } }
}

//----------------------------------
// allows a positioned element be hidden
//----------------------------------

function hideDiv(divID_as_a_string) {
    var myReference = getRefToDiv(divID_as_a_string);
    if( !myReference ) { window.alert('Your Browser version does not support this feature');return; }
    if( myReference.style ) { myReference.style.visibility = 'hidden'; } else {
        if( myReference.visibility ) { myReference.visibility = 'hide'; } else {
            window.alert('Your Browser version does not support this feature'); return; } }
}

// team schedules dropdown links
function goHere(formName, selectName) {
	var dLink = eval('document.' + formName + '.' + selectName + '.options[document.' + formName + '.' + selectName + '.selectedIndex].value');
	if (dLink != '') window.location.href = '' + dLink;
}

// RSS on HomePage
function getMinutesSince(pDate){
	if(curTime) {
	var delay = 120000 //two minutes;
	postTime = new Date (pDate);
	curTime = new Date(curTime);

	postTime = Date.parse(postTime);
	curTime = Date.parse(curTime);

	minSince = curTime - postTime;
	minSince = minSince + delay;
	minSince = minSince / 60000;
	minSince = Math.round(minSince);

	var minStr = "min.";
	showMin = minSince;
	if(minSince >= 1 && minSince <= 60){minStr = "min.";}
	if(minSince >= 60 && minSince <= 90){minStr = "hr"; showMin = minSince / 60;}
	if(minSince >= 90 && minSince <= 1440){minStr = "hrs"; showMin = minSince / 60;}
	if(minSince >= 1440 && minSince <= 2880){minStr = "day"; showMin = minSince / 1440;}
	if(minSince >= 2880){minStr = "days"; showMin = minSince / 1440;}

	return document.write("<span class=minAgo> - " + Math.round(showMin) + " " + minStr + "</span>");
	}
}

function getURL(teamURL){location.href=teamURL;}

function openCourtSideLS2(codeGame)
  
{
mywin = window.open( 'http://www.nba.com/courtsidelive/csl_popup.html?game='+codeGame,'CourtsideLive','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=12,screenY=12,top=12,left=12,copyhistory=no,width=410,height=500' );
  
}
//new global drop down functions
function ddOpen(ddID){
	document.getElementById(ddID).style.visibility = "visible";
}
function ddClose(ddID){
	document.getElementById(ddID).style.visibility = "hidden";
}

function addOnLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function nbaEmailVideo(url, title) {
	attrs = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,,width=245,height=420';
	newPopup=window.open('/components/EmailAVideoForm.html?url='+url+'&title='+title,'EmailAVideo',attrs);
	newPopup.focus();
}

function printPage(){
window.print();
}

/*
//calls Omniture js file//
var head = document.getElementsByTagName("head")[0];
var oScript = document.createElement('script');
oScript.src = "http://www.nba.com/js/nba_s_code.js";
oScript.id = "loadScript";
oScript.type='text/javascript';
head.appendChild(oScript);
*/
/*
// You may give each page an identifying name, server, and channel on the next lines.
//sets a delay on Omniture code to give time for js file to load
function initiateOmniture(){
	setInterval('callOmniture()', 1000);
	setInterval('callFooterOmniture()', 1000);
}
function callOmniture(){
	s.pageName=""
	s.server=""
	s.channel=""
	s.prop11=s.getNewRepeat();
	// E-commerce Variables 
	s.events=""
	var e=new Date(),y=e.getYear(),m=e.getMonth()+1;
	s.eVar1=(y<1000?y+=1900:y)+"/"+(m<10?'0'+m:m);
}
initiateOmniture();
*/

//end Omniture js call//





Function.prototype.bg = function(ms){
	this.PID = setInterval(this,ms);
	return this;
}
Function.prototype.kill = function(){
	clearInterval(this.PID)
}
String.prototype.onReady = function(func){
	var str = this;
	return function(){
		try{
			eval("var res=("+str+")");
			if(res){
				arguments.callee.kill();
				func()
			}
		}catch(e){
		}
	}.bg(10)
}

function initOmniture() {
	s.pageName="generic"
	s.server=""
	s.channel=""
	s.prop11=s.getNewRepeat();

	/* E-commerce Variables */
	s.events=""
	var e=new Date(),y=e.getYear(),m=e.getMonth()+1;
	s.eVar1=(y<1000?y+=1900:y)+"/"+(m<10?'0'+m:m);
	var s_code=s.t();if(s_code)document.write(s_code);
}

function endOmniture(){
	var s_code=s.t();if(s_code)document.write(s_code)	
}	