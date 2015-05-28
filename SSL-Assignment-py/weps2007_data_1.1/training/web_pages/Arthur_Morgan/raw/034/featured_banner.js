var contents=new Array()



// ========================================================================================

// change this bit only

// be careful not to include a ' (single quote) anywhere between the a href and </a> tags

// also, do not put a return anywhere inside the tags

// ========================================================================================

contents[0]='<a target="_blank" href="http://easyreports.net"><img src="http://www.twst.com/images/TWST_AR.gif" border="0"></a>'
contents[1]='<a target="_blank" href="http://liberum.twst.com"><img src="http://www.twst.com/liberum/liberum.gif" border="0"></a>'


// ========================================================================================

// end configurable elements

// ========================================================================================



function Set_Cookie(name,value,path,expires,domain,secure) {

    var today = new Date();

    var expdate = new Date(today.getYear(),today.getMonth(),today.getDate(),23,0,0);

    document.cookie = name + "=" +escape(value) +

        ( (expires) ? ";expires=" + expires.toGMTString()  : ";expires=" +  expdate.toGMTString()  ) +

        ( (path) ? ";path=" + path : ";path=/") +

        ( (domain) ? ";domain=" + domain : "") +

        ( (secure) ? ";secure" : "");

}



function Get_Cookie(name) {

    var start = document.cookie.indexOf(name+"=");

    var len = start+name.length+1;

    // alert ( document.cookie );

    if ((!start) && (name != document.cookie.substring(0,name.length))) return '';

    if (start == -1) return '';

    var end = document.cookie.indexOf(";",len);

    if (end == -1) end = document.cookie.length;

    return unescape(document.cookie.substring(len,end));

}



function get_featured_banner() {



   var content_index;

   var cookie =  Get_Cookie('featured_banner2')



   if ( cookie && cookie != '' ) {

      last_viewed = cookie - 0;

      content_index = last_viewed >= contents.length - 1  ? 0 : last_viewed + 1;

   } else {

      content_index = Math.floor( Math.random() * contents.length )

   }



   Set_Cookie('featured_banner2',content_index)

   return contents[content_index];

}

//-----------------------2nd rotating banner----------------------

var contents2=new Array()



// ========================================================================================

// change this bit only

// be careful not to include a ' (single quote) anywhere between the a href and </a> tags

// also, do not put a return anywhere inside the tags

// ========================================================================================



contents2[0]='<a href="http://www.twst.com/conferences/gateway/REIT04.html" target="_blank"><img src="http://www.twst.com/conferences/images/reits_big.gif" border="0"></a>'

contents2[1]='<a href="http://www.twst.com/conferences/gateway/banking2.html" target="_blank"><img src="http://www.twst.com/conferences/images/banking_big.gif" border="0"></a>'

contents2[2]='<a href="http://www.twst.com/conferences/gateway/smallcap.html" target="_blank"><img src="http://www.twst.com/conferences/images/caps_big.gif" border="0"></a>'

// ========================================================================================

// end configurable elements

// ========================================================================================





function get_2ndfeatured_banner() {



   var content_index2;

   var cookie2 =  Get_Cookie('featured_banner3')



   if ( cookie2 && cookie2 != '' ) {

      last_viewed2 = cookie2 - 0;

      content_index2 = last_viewed2 >= contents2.length - 1  ? 0 : last_viewed2 + 1;

   } else {

      content_index2 = Math.floor( Math.random() * contents2.length )

   }



   Set_Cookie('featured_banner3',content_index2)

   return contents2[content_index2];

}