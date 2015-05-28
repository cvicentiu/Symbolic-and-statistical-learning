/*--WEBSIDESTORY CODE HBX1.0 (Universal)-->
<!--COPYRIGHT 1997-2004 WEBSIDESTORY,INC. ALL RIGHTS RESERVED. U.S.PATENT No. 6,393,479B1. MORE INFO:http://websidestory.com/privacy-->
/*<!-- <script language="javascript"> -->*/
var _hbEC=0,_hbE=new Array;function _hbEvent(a,b){b=_hbE[_hbEC++]=new Object();b._N=a;b._C=0;return b;}
var hbx=_hbEvent("pv");hbx.vpc="HBX0100u";hbx.gn="ehg-wizardsofthecoast.hitbox.com";

/*BEGIN EDITABLE SECTION
FUNCTIONS AND MODS BY TT 9-10-2004*/
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
	  sPair = pair[1].toString()
      return sPair;
    }
  } 
  return variable = "";
}

// the dataset object prototype
function HBXdataset (url,arry) {
	this.url = "";
	this.category = "";
	this.acct = "";
	for (var i=0;i<arry.length;i++) {
		if (arry[i][3]==true) {
			if (url == arry[i][0].toString()) { //needs exact string match
				this.url = url;
				this.category = arry[i][1].toString();
				this.acct = arry[i][2].toString();
				if (this.category == "boards") { this.acct += HBXBoardsAcctAdd(this.url) }
				//alert("EXACT:" + this.category);
				return;
			}
		}
		else {	
  				if (url.indexOf(arry[i][0].toString()) != -1 ) { //needs to find the substring present
						//this = makeProperties(i,url,arry,this);
						this.url = url;
						//alert("SUBSTRING:" + this.url);
						this.category = arry[i][1].toString();
						//alert("SUBSTRING:" + this.category);
						this.acct = arry[i][2].toString();
						//alert("SUBSTRING:" + this.acct);
						if (this.category == "boards") { this.acct += HBXBoardsAcctAdd(this.url) }
						return;
				}
		}
	}
}

function HBXBoardsAcctAdd(url) {
	//alert ("board acct");
	// This appends a boards subgroup account based on forum number
	var sAcct = "";
	var sForumId = url.substring(url.lastIndexOf("=") +1, url.length);
	var aForumNums = new Array(	new Array (";DM540625AJBD",16,17,18,19,20,22,25,26,30,36,39,42,44,46,48,92,96,98,99,20,126,127,295,384,386,432,434,480,520,526),
								new Array (";DM5406256MRE",217,218,219,221,225,227,229,239,241,524),
								new Array (";DM540922NNAE",144,147,153,154,155,156,157,158,160,161,163,170,171,172,173,174,175,176,177,180,249,409,430,450,456,481,496,497,498),
								new Array (";DM540625LLEA",476,477,478,485,486,487,488,489,492),
								new Array (";DM540625OAEN",503,504,505,506),
								new Array (";DM5406252IVA",56,60,452,453,454,455,490)
								);
	for (var i=0;i<aForumNums.length;i++) {
		for (var j=1;j<aForumNums[i].length;j++) {
			if (sForumId == aForumNums[i][j].toString()) { 
				//alert ("MATCH"); 
				sAcct = aForumNums[i][0];
			} 			
		}
	}	
	return sAcct;	
}
// End Functions

//SOME STRINGS BY TT 9-10-2004
var sHBXWinLoc= window.location.href.toLowerCase();
var sHBXAcct = "DM53090575ZE";

//comment next if block to debug on Luna
//if (sHBXWinLoc.indexOf("://luna") == -1) {

//SORTING FOR CONTENT CATEGORIES AND APPENDING ADDITIONAL ACCTs
//ARRY = substring Match, Content Category, HBX Account beyond main roll up, full string match required (T/F)
var aLocCatAcct = new Array(  	new Array("autocard.asp?name=", "autocard", "",false),
								new Array("autocard.asp", "autocard", "",false),
								new Array("x=legendology", "legendology", "",false),
								new Array("x=dbm/","dbm", ";DM550812PODE", false),
								new Array("dreamblade/", "dreamblade", ";DM550812PODE", false),
  							new Array("?url=", "autocard", "",false), 
								new Array("leaving.asp", "leaving", "",false), 
								new Array("x=ht/", "hecatomb", ";DM550324BNWM",false),
								new Array("hecatomb/", "hecatomb", ";DM550324BNWM",false),
								new Array("x=books/", "books", ";DM55032495EE",false),
								new Array("x=books/mirrorstone", "books/mirrorstone", ";DM55032495EE",false),
								new Array("x=books/dlnewadventures", "books/dlnewadventures", ";DM55032495EE",false),
								new Array("x=books/knights", "books/knights", ";DM55032495EE",false),
								new Array("x=swminis/", "swminis", ";DM550324KOES",false),
								new Array("x=starwars/", "swrpg", ";DM550324KOES",false),
								new Array("x=swtcg/", "swtcg",false),
								new Array("rss.asp", "rss", "",false), 
  							new Array("duelmasters", "duelmasters", ";DM5402232JVB",false),
								new Array("://boards", "boards", ";DM5406254LDF",false),
								new Array("://boards.avalonhill.com", "boards/avalonhill", ";DM5406254LDF;DM550516PMFW",false),
								new Array("://webapp", "dci-webapp", "",false),
								new Array("://events", "rpga/dci", "",false),
								new Array("://tank.", "chat", "",false),
								new Array("avalonhill.com", "avalonhill", ";DM54062586MF",false),
								new Array("ah/", "avalonhill", ";DM54062586MF",false),
								new Array("neopets", "neopets", ";DM5408137OWA",false),
								new Array("community_chat", "chat", ";DM55032452DW",false),
								new Array("chatlogin", "chat", ";DM55032452DW",false),
								new Array("rpgchat", "chat", ";DM55032452DW",false),
								new Array("tcgchat", "chat", ";DM55032452DW",false),
								new Array("search.atomz.com", "search", "",false),
								new Array("x=dnd/", "", ";DM540223PPAN",false),
								new Array("playdnd.", "dnd", ";DM540223PPAN",false),
								new Array("dndnow.", "dnd", ";DM540223PPAN",false),
								new Array("dndminis", "dnd", ";DM540223PPAN",false),
								new Array("magic/welcome.asp", "mtgcom", ";DM54022377AE",false),
								new Array("mtgevent/", "mtgevent", ";DM54022377AE",false),
								new Array("mtgcom/welcome", "mtgcom", ";DM54022377AE",false),
								new Array("x=magic/", "", ";DM54022377AE",false),
								new Array("x=mtgcom/", "", ";DM54022377AE",false),
								new Array("gatherer.wizards.com", "mtg-apps/gatherer", ";DM540625K1RN;DM54022377AE",false),
								new Array("gathererlookup.asp?name=", "mtg-apps/gatherer", ";DM540625K1RN;DM54022377AE",false),
								new Array("gathererdev", "mtg-apps/gatherer", ";DM540625K1RN;DM54022377AE",false),
								new Array("sideboard/", "sideboard", ";DM54022377AE",false),
								new Array("lg/", "rpga/lg", "",false),
								new Array("gr/", "rpga/gr", "",false),
								new Array("lfarchive", "rpga/livingforce", "",false),
								new Array("livingforce/", "rpga/livingforce", "",false),
								new Array("swlf", "rpga/livingforce", "",false),
								new Array("dnd/mit", "rpga/dndminis", "",false),
								new Array("dnd/minis/tournaments", "rpga/dndminis", "",false),
								new Array("magic/displayexpansion.asp", "magic", ";DM54022377AE",false),
								new Array("magic/orbofinsight", "mtgcom", ";DM54022377AE",false),
								new Array("http://www.wizards.com/magic/", "mtgcom", ";DM54022377AE",true),
								new Array("http://wizards.com/magic/", "mtgcom", ";DM54022377AE",true),
								new Array("magicthegathering.com", "mtgcom", ";DM54022377AE",true),
								new Array("mtgcom", "mtgcom", ";DM54022377AE",true),
								new Array("http://luna/", "Front Page", "",true),
								new Array("http://www.wizards.com/", "Front Page", "",true),
								new Array("http://wizards.com/", "Front Page", "",true) ,	
								new Array("http://wizards.com/welcome.asp", "Front Page", "",true) ,
								new Array("http://www.wizards.com/welcome.asp", "Front Page", "",true) ,
								new Array("http://www.wizards.com/magic/", "magic", ";DM54022377AE",true)
														
								); 

if (sHBXWinLoc.indexOf("?x=") != -1) {
		var aHBXWinLoc = sHBXWinLoc.split("x=");
		sHBXContentCat = aHBXWinLoc[1].toString(); }
	else { 	sHBXWinLoc = sHBXWinLoc.toString();
			//alert("window location= " + sHBXWinLoc);
			sHBXContentCat = "Root"; 
			
	}
//test location
//Use these accounts for A&A stuff
//'new Array("showdown", "mlbshowdown", ";DM540813BPEV",false),
//'new Array("starsisterz", "starsisterz", ";DM5402234LEA",false),

var thisDataset = new HBXdataset(sHBXWinLoc,aLocCatAcct);
// ADDS IN ADDITIONAL ACCT VALUES TO SET
sHBXAcct += thisDataset["acct"];
//window.status = "URL:" + thisDataset["url"].toString() + " cat:" + thisDataset["category"].toString() + " acct:" + thisDataset["acct"].toString();
if (thisDataset["category"] != "") { sHBXContentCat = thisDataset["category"]; }

//status check: 
//window.status = "UD: " + sHBXContentCat + " " + sHBXAcct;
//alert (sHBXContentCat + " " + sHBXAcct);

//CONFIGURATION VARIABLES
hbx.acct=sHBXAcct;//ACCOUNT NUMBER(S)
hbx.pn="PUT+PAGE+NAME+HERE";//PAGE NAME(S)
hbx.mlc=sHBXContentCat;//MULTI-LEVEL CONTENT CATEGORY
hbx.pndef="title";//DEFAULT PAGE NAME
hbx.ctdef="full";//DEFAULT CONTENT CATEGORY

//OPTIONAL PAGE VARIABLES
//ACTION SETTINGS
hbx.fv="";//FORM VALIDATION MINIMUM ELEMENTS OR SUBMIT FUNCTION NAME
hbx.lt="auto_pos";//LINK TRACKING
hbx.dlf="n";//DOWNLOAD FILTER
hbx.dft="n";//DOWNLOAD FILE NAMING
hbx.elf="n";//EXIT LINK FILTER

//SEGMENTS AND FUNNELS
hbx.seg="";//VISITOR SEGMENTATION
hbx.fnl="";//FUNNELS

//CAMPAIGNS
hbx.cmp="";//CAMPAIGN ID
hbx.cmpn=getQueryVariable("cmp");//CAMPAIGN ID IN QUERY
hbx.dcmp=getQueryVariable("dcmp");//DYNAMIC CAMPAIGN ID
hbx.dcmpn="";//DYNAMIC CAMPAIGN ID IN QUERY
hbx.dcmpe="";//DYNAMIC CAMPAIGN EXPIRATION
hbx.dcmpre="";//DYNAMIC CAMPAIGN RESPONSE EXPIRATION
hbx.hra="";//RESPONSE ATTRIBUTE
hbx.hqsr="";//RESPONSE ATTRIBUTE IN REFERRAL QUERY
hbx.hqsp="";//RESPONSE ATTRIBUTE IN QUERY
hbx.hlt="";//LEAD TRACKING
hbx.hla="";//LEAD ATTRIBUTE
hbx.gp="";//CAMPAIGN GOAL
hbx.gpn="";//CAMPAIGN GOAL IN QUERY
hbx.hcn="";//CONVERSION ATTRIBUTE
hbx.hcv="";//CONVERSION VALUE
hbx.cp="null";//LEGACY CAMPAIGN
hbx.cpd="";//CAMPAIGN DOMAIN

//CUSTOM VARIABLES
hbx.ci="";//CUSTOMER ID
hbx.hc1="";//CUSTOM 1
hbx.hc2="";//CUSTOM 2
hbx.hc3="";//CUSTOM 3
hbx.hc4="";//CUSTOM 4
hbx.hrf="";//CUSTOM REFERRER
hbx.pec="";//ERROR CODES

//INSERT CUSTOM EVENTS
var searchEv = new _hbEvent("search"); // required definition to create custom event
searchEv.keywords = getQueryVariable("sp-q").toLowerCase();// required value
if (searchEv.keywords != "") {
searchEv.results = "1"; // integer value required. Any number of results, or 0 to have the keyword displayed in the Failed Keywords report
searchEv.attr1 = sHBXContentCat; // optional, can be any string search attribute
}

//} // END LUNA EXCLUSION BLOCK******
//END EDITABLE SECTION

//REQUIRED SECTION. CHANGE "YOURSERVER" TO VALID LOCATION ON YOUR WEB SERVER (HTTPS IF FROM SECURE SERVER)
//<!-- </script> -->


<!--END WEBSIDESTORY CODE-->