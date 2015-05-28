<!-- START OF WEBTRENDS LIVE TAG -->
<!-- Copyright 2001 NetIQ Corporation -->
<!--  For privacy concerns, check our Privacy Policy at http://www.webtrendslive.com/privacy_policy.htm -->

<!-- eCommerce Revenue Tracking (patent pending) -->
<!-- For eCommerce implementation, visit the following page: -->
<!-- http://www.webtrendslive.com/support/online_help/open_help.asp?helppage=techsupport_code_ecommerce&redirection=help -->

// Modification of this code is not allowed and will permanently disable your account!
// SiteName:  Fortune.com

function wtl_Tag6_116311()
{
    var ORDER= "";
    var SERVER= "";
    var CONTENTGROUP= "";
    var INVOICE= "";
    var CARTVIEW= "";
    var CARTADD= "";
    var CARTREMOVE= "";
    var CHECKOUT= "";
    var CARTBUY= "";
    var ADCAMPAIGN= "";
    	
    if (document.location.search == ""){ var wtl_URL = document.URL; } else { var wtl_URL = document.URL + "&title=" + document.title;} ;
    var wtl_Title= document.title;

    function D8( d)
    {
        var fwd=0, seed= new Date('01/01/2000'), key= "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var s= key.charAt( d.getFullYear()-2000)+key.charAt( d.getMonth()+1)+key.charAt( d.getDate());
        s+= key.charAt( d.getHours())+key.charAt( d.getMinutes())+key.charAt( d.getSeconds());
        while( seed.getDay()!=fwd) seed= new Date(seed.getTime() + 86400000);
        var w= Math.floor( (d.getTime()-(seed.getTime()+86400000)) / 604800000 );
        s+= key.charAt( (w-(w%16))/16 );
        s+= key.charAt( w%16);
        return s;
    }

    function A( B, C)
    {
        W+="&"+B+"="+escape(C);
    }
    
    var t = new Date();
    var W="http"+(document.URL.indexOf('https:')==0?'s':'')+"://statse.webtrendslive.com/S116311/button6.asp?tagver=6&si=116311&fw=0";
    A( "server", typeof(SERVER)== "string" ? SERVER : "");
    A( "order", typeof(ORDER)== "string" ? ORDER : "");
    A( "Group", typeof(CONTENTGROUP)== "string" ? CONTENTGROUP : "");
    A( "invoice", typeof(INVOICE)== "string" ? INVOICE : "");
    A( "cartview", typeof(CARTVIEW)== "string" ? CARTVIEW : "");
    A( "cartadd", typeof(CARTADD)== "string" ? CARTADD : "");
    A( "cartremove", typeof(CARTREMOVE)== "string" ? CARTREMOVE : "");
    A( "checkout", typeof(CHECKOUT)== "string" ? CHECKOUT : "");
    A( "cartbuy", typeof(CARTBUY)== "string" ? CARTBUY : "");
    A( "adcampaign", typeof(ADCAMPAIGN)== "string" ? ADCAMPAIGN : "");
    A( "tz", t.getTimezoneOffset());
    A( "ch", t.getHours());
    A( "cl", D8(t));
    A( "ti", typeof(wtl_Title)== "string" ? wtl_Title : document.title);
    A( "url", typeof(wtl_URL)== "string" ? wtl_URL : document.URL);
    A( "rf", window.document.referrer);
    A( "js", "Yes");
    A( "ul", navigator.appName=="Netscape" ? navigator.language : navigator.userLanguage);
    if(typeof(screen)=="object")
    {
    A( "sr", screen.width+"x"+screen.height);
    A( "cd", screen.colorDepth);
    A( "jo", navigator.javaEnabled() ? "Yes" : "No");
    }
    if( W.length>2048 && navigator.userAgent.indexOf('MSIE')>=0)
        W= W.substring( 0, 2043)+"&tu=1";

    document.write('<IMG ID="WTL_TAG" BORDER="0" WIDTH="1" HEIGHT="1" SRC="'+W+'">');
}

wtl_Tag6_116311();
