//SOSD hbx variable bootstrap code
sosd  = new Object(); //dummy obj for SOSD vars
//default behavior:::>
sosd.url	= document.location.href 								// full url, including qs
sosd.path 	= document.location.pathname							// path only, not incl qs
sosd.pgname = sosd.path.substring(sosd.path.lastIndexOf("/")+1);	// filename + querystring
sosd.mlcpath= sosd.path.substring(0,sosd.path.lastIndexOf("/")+1);	// path, not incl filename

var _hbEC=0,_hbE=new Array;function _hbEvent(a,b){b=_hbE[_hbEC++]=new Object();b._N=a;b._C=0;return b;}
var hbx=_hbEvent("pv");hbx.vpc="HBX0103u";hbx.gn="ehg-uniontrib.hitbox.com";

//BEGIN EDITABLE SECTION
//CONFIGURATION VARIABLES
hbx.acct="DM5111160KMS78EN3;DM51111652RN78EN3;";//ACCOUNT NUMBER(S)
hbx.pn=sosd.pgname;//PAGE NAME(S)
hbx.mlc=sosd.mlcpath;//MULTI-LEVEL CONTENT CATEGORY
hbx.pndef="title";//DEFAULT PAGE NAME
hbx.ctdef="full";//DEFAULT CONTENT CATEGORY

//OPTIONAL PAGE VARIABLES
//ACTION SETTINGS
hbx.fv="";//FORM VALIDATION MINIMUM ELEMENTS OR SUBMIT FUNCTION NAME
hbx.lt="auto";//LINK TRACKING (sosd:auto)
hbx.dlf=".ram,.m4v"; //DOWNLOAD FILTER
hbx.dft="n";//DOWNLOAD FILE NAMING
hbx.elf="n";//EXIT LINK FILTER

//SEGMENTS AND FUNNELS
hbx.seg="";//VISITOR SEGMENTATION
hbx.fnl="";//FUNNELS

//CAMPAIGNS
hbx.cmp="";//CAMPAIGN ID
hbx.cmpn="";//CAMPAIGN ID IN QUERY
hbx.dcmp="";//DYNAMIC CAMPAIGN ID
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

//END EDITABLE SECTION

document.write('<scr'+'ipt language="javascript1.1" defer src="http://www.signonsandiego.com/scripts/hitbox/hbx.js"></scr'+'ipt>');




//####  MISC SOSD CODE BELOW ##########
//### cookie setting area
// THIS SETS THE COOKIE
CookieUser(24, 'popworks');
//THIS GETS THE COOKIE TO SEE IF IT EXISTS
var cookieExists = GetCookie('popworks'); 
// IF IT DON'T EXIST THEN NOPE, LOOKS LIKE THIS PERSON HAS COOKIES OFF
if (cookieExists == null) {
} else { // OTHERWISE LOOKS LIKE COOKIES ARE ON SO POPUP
//begin pops
var version = navigator.appVersion;
var versarr = version.split(';');

	//BEGIN POPUNDER AD POSITION
	if(document.location.hostname == "www.signonsandiego.com") {
	OAS_AD('Bottom');
	}
	//END POPUNDER AD POSITION
	
}
//## end cookie script area

//BEGIN INTERSTITAL AD
//if(document.location.hostname == "www.signonsandiego.com") {
//document.write('<scr' + 'ipt src="http://content.zanti.com/fpba/staging/PUB-8BF8-8F1E-43F3-9FB7-B982762A1D64---ADV-84AC-EE17-404D-9971-21F7F9858766.js"></scr' + 'ipt>');
//}
//END INTERSTITAL AD

//TACODA
document.write('<SCR' + 'IPT LANGUAGE="JavaScript">Tacoda_AMS_DDC("http://te.signonsandiego.com/tte/blank.gif", "1.0")</SCR' + 'IPT>');

//---------------------------------/
//phantompop bottom check
//var bottompopscript = 1;

//begin phantompop logging tool
//try{
//if (toppopscript && bottompopscript){
//}

//} catch(er) {
//var page=document.location;
//document.write('<iframe src="http://www.signonsandiego.com/scripts/popunders/phantompop_log.php?page=' + page +'" width="1" height="1" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>');
//}
//end phantompop logging tool
//---------------------------------/



//###### begin new phantom ad logger
//if (rightpos == null || rightpos == "")
//{
	//var rightpos = 0;
//}
//if (right1pos == null || right1pos == "")
//{
	//var right1pos = 0;
//}

//var total=(rightpos + right1pos)

//if (total != 2) {
//var page=document.location;
//document.write('<iframe src="http://www.signonsandiego.com/scripts/popunders/phantompop_log.php?page=' + page +'" width="1" height="1" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>');
//} 
//###### end new phantom ad logger