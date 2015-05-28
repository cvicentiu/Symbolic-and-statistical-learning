//Begin client detection
var na = navigator.appVersion;
var napN = navigator.appName;
var nu = navigator.userAgent;

//browser flags
var isNS6up=false;
var isNS62up=false;
var isIE=false;
var isNN4=false;
var isOpera5up=false;

if ((nu.indexOf("MSIE")!=-1)&&(nu.indexOf("Opera")==-1)){isIE=true;}
var ieMajor=isIE?parseInt(nu.slice(nu.indexOf("MSIE")+4)):0;
var isIE4up=ieMajor>=4;
var isIE5up=ieMajor>=5;
if ((napN =="Netscape")&&(na.indexOf("4")==0)){isNN4=true;}
if (nu.indexOf("Netscape6")!=-1){isNS6up=true;}
var ns6Minor=isNS6up?parseFloat(nu.slice(nu.indexOf("Netscape6/")+10)):0;
if (ns6Minor>=6.2){isNS62up=true;}
if (nu.indexOf("Opera 5")!=-1){isOpera5up=true;}

//OS Flags
var isWin=false;
var isWin98=false;
var isWinNT=false;
var isMac=false;

//OS detector checks
if (nu.indexOf("Win")!=-1){isWin=true;}
if (nu.indexOf("Windows NT")!=-1){isWinNT=true;}
if (nu.indexOf("Windows 98")!=-1){isWin98=true;}
if (nu.indexOf("Mac")!=-1){isMac=true;}
//End client detection

//this code is called on submit of form, and turns off popups for 
//24 hours.
function TICM_SetCookie (name,value,expires,path,domain,secure){
        document.cookie = name + escape (value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "; expires=Thu, 01-Jan-1970 00:00:01 GMT") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : ""); 
}
var TICM_day = 86400000; //one day in milliseconds
var TICM_date = new Date();
var TICM_popup2ON = new Date(TICM_date.getTime()+TICM_day);
//End of code for popups

//Details textarea scroll box settings and content
var rows=3;
var cols=20;
//width of input type=text
var inpWidthLg=17;
var inpWidthSm=9; 

if (isNS6up){
	rows=2;  
    inpWidthLg=15; 
    inpWidthSm=7;
    if(!isNS62up){cols=17;}
    else if(isMac) {cols=29;}
    else {cols=34;}
}
if ((isIE4up||isOpera5up)&&(isWin)) {cols=35;}
if (isIE4up && isMac )              {cols=20;}
if ((isIE5up||isOpera5up)&&(isMac)) {cols=28;}
var copy="If you like FORTUNE, you'll receive 10 more issues, 13 in all for $19.99. That's 69% savings off the newsstand price! (Canada $26.34C)-GST, HST and QST not included. Plus, you'll get all the benefits of our Subscriber's Advantage Automatic Renewal Program. We'll continue to renew your FORTUNE subscription as long as you wish without interruption, unless you tell us to stop. We'll bill you annually in time to lock in savings then in effect. You may cancel at any time and receive a refund for all unmailed issues. Cover price is $4.99. Offer valid in the U.S. and Canada only. Please allow 2-3 weeks for delivery. FORTUNE is published biweekly, except for two issues combined periodically into one and occasional extra, expanded, or premium issues. Combined, expanded and premium issues count as two subscription issues. Subscribers: If the Post Office alerts us that your magazine is undeliverable, we have no further obligation unless we receive a corrected address within two years.";
var details = '<span class="Copyright"><textarea readonly cols="'+cols+'" rows="'+rows+'" wrap class="Copyright" onChange="this.value=copy;">'+copy+'</textarea></span>';

function  TICM_submit(winName,f,h,w){
	//var f = document.golfCCUpsell;
	if(TICM_check(f)){
       var features = "height=" + h + ",width=" + w + ",scrollbars=yes,location=no"
                   + ",menubar=no,resizable=no,status=yes,directories=no,toolbar=no";
        window.open("",winName,features);
		f.target = winName;
        TICM_SetCookie('popup2OFF','',TICM_popup2ON,'/');
		if(typeof P_isLoaded != "undefined")P_isLoaded = false;
        return true;
	}
    return false;
}

if(document.cookie.indexOf('popup2OFF')!=-1){
	if(typeof P_isLoaded != "undefined")P_isLoaded = false;
}


// Form Validation Script
function TICM_check(f){
var states = f.state;
var state;
var canstates = ['AB','BC','MB','NB','NF','NS','NT','ON','PE','QC','SK','YT']

	//t:temporary field value, msg:concatenated error message, good: boolean error tracker	
	var t, msg, good;
   	state = states.options[states.selectedIndex].value;  
	msg = "";
	if ((f.fullName.value == null) || (f.fullName.value == '') || isblank(f.fullName.value)) msg += "Please enter your Name.\n";
	if ((f.address1.value == null) || (f.address1.value == '') || isblank(f.address1.value)) msg += "Please enter your Address.\n";	
	if ((f.city.value == null) || (f.city.value == '') || isblank(f.city.value)) msg += "Please enter your City.\n";	
	if (state=='')msg+="Please enter your State/Province.\n"
	
    good=1; t=f.email.value;
	if (t==null || t=='' || isblank(t)) good=0;
	else good=(t.search(/^\w+(\.\w+)?@(\w+\.){1,}[a-zA-Z]{2,3}$/)==-1)?0:1;
    
	if(!good)msg+="Your 'E-mail' is blank or incorrect.\n\n";
    
	t = f.zipCode.value;
	good=1;
	if (t==null || t=='' || isblank(t) || t.length<5 || t.length>6 )good=0;
	else{if (state!=''){
			if (t.length==5 && (t.search(/^\d{5}$/) != -1)){ 
				for (d = 0; d<canstates.length;d++){
					if (state==canstates[d])good=0;
				}
			}else good=0;
			if (t.length==6 && t.search(/^[a-zA-Z]\w{5}$/)!=-1){
				good=0;
				for (d = 0; d<canstates.length;d++){
					if (state == canstates[d])good=1;
				}
			}
		}
	}

	if (!good)msg+="Zip/Postal code is blank or incorrect,\nor it doesn't match the State/Province you selected.\n";

	if (msg.length) {
		alert ("The form was not submitted because of the following error(s):\n\n" + msg +
			"\n\nPlease correct these error(s) and resubmit your form.\n\nThank you,\nTime Inc. Consumer Services");
		return false;
	}
	return true;
}
// End Form Validation Script

// Utility function to check for blanknocity
function isblank(s){
	for(var i = 0; i < s.length; i++){
		var c = s.charAt(i);
		if ((c != ' ') && (c != '\n') && (c != '\t')) return false;
	}
return true;
}

// begin html for subscription form 

var form_body = '<tr><td bgcolor="ffffff"><img src="/images/subscriptions_tab.gif" width="180" height="22" border="0"></td></tr>'+
'<tr><td valign=top><Table border="0" cellspacing="0" cellpadding="2" width="180" bgcolor="cccccc">'+
'<tr><td><FORM method="post" name="fo_ofieform" action="https://subs.timeinc.net/BillMeRegularValetOrderGenerator.jhtml" onsubmit="return TICM_submit(\'fo_ofie\',this,\'410\',\'374\')">'+
'<table border="0" cellspacing="0" cellpadding="1" width="100%" bgcolor="cccccc">'+
'<tr><td class="SubscrTitle" colspan=2>Get 3 FREE Trial Issues of FORTUNE Magazine</td></tr>'+
'<tr><td class="RegText" colspan=2>Name<br><input type="text" maxlength="30" NAME="fullName" class="subsLarge" size="' + inpWidthLg + '"></td></tr>'+
'<tr><td class="RegText" colspan=2>Address<br><input type="text" maxlength="30" NAME="address1"  class="subsLarge" size="' + inpWidthLg + '"></td></tr>'+
'<tr><td class="RegText">City</td><td class="RegText">State</td></tr>'+
'<tr><td class="RegText"><input type="text" maxlength="20" name="city" class="subsSmall" size="' + inpWidthSm + '"></td>'+
'<td class="RegText"><SELECT NAME="state" SIZE="1" class="RegText"><OPTION VALUE=""><OPTION VALUE=AA {$AA}>AA<OPTION VALUE=AB {$AB}>AB<OPTION VALUE=AE {$AE}>AE<OPTION VALUE=AK {$AK}>AK<OPTION VALUE=AL {$AL}>AL<OPTION VALUE=AP {$AP}>AP<OPTION VALUE=AR {$AR}>AR<OPTION VALUE=AS {$AS}>AS<OPTION VALUE=AZ {$AZ}>AZ<OPTION VALUE=BC {$BC}>BC<OPTION VALUE=CA {$CA}>CA<OPTION VALUE=CO {$CO}>CO<OPTION VALUE=CT {$CT}>CT<OPTION VALUE=DC {$DC}>DC<OPTION VALUE=DE {$DE}>DE<OPTION VALUE=FL {$FL}>FL<OPTION VALUE=GA {$GA}>GA<OPTION VALUE=GU {$GU}>GU<OPTION VALUE=HI {$HI}>HI<OPTION VALUE=IA {$IA}>IA<OPTION VALUE=ID {$ID}>ID<OPTION VALUE=IL {$IL}>IL<OPTION VALUE=IN {$IN}>IN<OPTION VALUE=KS {$KS}>KS<OPTION VALUE=KY {$KY}>KY<OPTION VALUE=LA {$LA}>LA<OPTION VALUE=MA {$MA}>MA<OPTION VALUE=MB {$MB}>MB<OPTION VALUE=MD {$MD}>MD<OPTION VALUE=ME {$ME}>ME<OPTION VALUE=MI {$MI}>MI<OPTION VALUE=MN {$MN}>MN<OPTION VALUE=MO {$MO}>MO<OPTION VALUE=MP {$MP}>MP<OPTION VALUE=MS {$MS}>MS<OPTION VALUE=MT {$MT}>MT<OPTION VALUE=NB {$NB}>NB<OPTION VALUE=NC {$NC}>NC<OPTION VALUE=ND {$ND}>ND<OPTION VALUE=NE {$NE}>NE<OPTION VALUE=NF {$NF}>NF<OPTION VALUE=NH {$NH}>NH<OPTION VALUE=NJ {$NJ}>NJ<OPTION VALUE=NM {$NM}>NM<OPTION VALUE=NV {$NV}>NV<OPTION VALUE=NS {$NS}>NS<OPTION VALUE=NT {$NT}>NT<OPTION VALUE=NY {$NY}>NY<OPTION VALUE=ON {$ON}>ON<OPTION VALUE=OH {$OH}>OH<OPTION VALUE=OK {$OK}>OK<OPTION VALUE=OR {$OR}>OR<OPTION VALUE=PA {$PA}>PA<OPTION VALUE=PE {$PE}>PE<OPTION VALUE=PR {$PR}>PR<OPTION VALUE=QC {$QC}>QC<OPTION VALUE=RI {$RI}>RI<OPTION VALUE=SC {$SC}>SC<OPTION VALUE=SD {$SD}>SD<OPTION VALUE=SK {$SK}>SK<OPTION VALUE=TN {$TN}>TN<OPTION VALUE=TX {$TX}>TX<OPTION VALUE=UT {$UT}>UT<OPTION VALUE=VA {$VA}>VA<OPTION VALUE=VI {$VI}>VI<OPTION VALUE=VT {$VT}>VT<OPTION VALUE=WA {$WA}>WA<OPTION VALUE=WI {$WI}>WI<OPTION VALUE=WV {$WV}>WV<OPTION VALUE=WY {$WY}>WY<OPTION VALUE=YT {$YT}>YT</OPTION></SELECT></td></tr>'+
'<tr><td valign="bottom" class="RegText" colspan=2>Zip Code<br><input type="text" NAME="zipCode" maxlength="6" class="subsSmall" size="' + inpWidthSm + '"></td></tr>'+
'<tr><td class="RegText" colspan=2>E-mail<br><input type="text" maxlength="50" NAME="email"  class="subsLarge" size="' + inpWidthLg + '"></td></tr>'+
'<tr><td class="RegText" colspan=2>Offer Details:<br>' + details + '</td></tr>'+
'<tr><td align=center colspan=2><input type="image" src="/images/subscription_button.gif" width="106" height="33" border="0"></td></tr>'+
'<tr><td class="RedLink" colspan=2>&middot; <a href="http://www.timeinc.net/fortune/fortuneasia/fo_int_land.html" class="RedLink" target="_new">Outside US &amp; Canada, click here</a></td></tr></table>'+
'<input type="hidden" name="per_name" value="fo_ofiecc_pu2"><input type="hidden" name="payment_type" value="BM"><input type="hidden" name="forward" value="fo_ofiecc_pu2"></td></tr></form></table></td></tr>';

document.write(form_body);
