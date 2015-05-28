var omni_suite = "viaquiz";
var thisSection = escape(location.hostname);
var thisPage = escape(location.pathname.substr(1));
if(!thisPage) {
    thisPage = 'index.html';
}
var defaultCall = "?section_0=" + thisSection + "&sec_0=" + thisSection + "&pageName=" + thisPage;
var omniCall = new ReportingCall(defaultCall);

function plusCleaner(s) {
    var str = s.replace(/\+/g, " ");
    return str;
}

omniCall.s_account=omni_suite;
//omniCall.s_dynamicAccountList="";

var s_pageName=plusCleaner(unescape(omniCall.pathToString('p')+omniCall.pageName));
var s_server="";
var s_channel=plusCleaner(omniCall.sec_0);
var s_pageType="";
var s_prop1="";
var s_prop2="";
var s_prop3=omniCall.getQueryVals();
var s_prop4="";
var s_prop5="";
var s_prop6="";
var s_prop7="";
var s_prop8="";
var s_prop9="";
var s_prop10="";
var s_prop11="";
var s_prop12="";
var s_prop13="";
var s_prop14="";
var s_prop15="";
var s_prop16="";
var s_prop17="";
var s_prop18="";
var s_prop19="";
var s_prop20="";
var s_prop21="";
var s_prop22="";
var s_prop24="";
var s_prop25="";
/* E-commerce Variables */
var s_campaign="";
var s_hier2=plusCleaner(unescape(omniCall.pathToString('h')));
var s_state="";
var s_zip="";
var s_events="";
var s_products="";
var s_purchaseID="";
var s_eVar1="";
var s_eVar2="";
var s_eVar3="";
var s_eVar4="";
var s_eVar5="";
