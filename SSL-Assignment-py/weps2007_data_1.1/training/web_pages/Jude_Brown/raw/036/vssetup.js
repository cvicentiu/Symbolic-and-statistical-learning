// Advance Page Data Collection Script
var _site="www.masslive.com";
var _pdata='Log=1&tstamp=' + (new Date()).getTime();
var turl;

// Track non-page refreshing events
function trackevent(re,rs,ar,rcmp,rcrt,raid) {
 var params="r="+escape('/images/spacer.gif')+"&page="+escape(document.location);
 if (ar) { params+="&ar="+escape(ar); }
 if (re) { params+="&re="+escape(re); } else { params+="&re="+escape('ERROR'); }
 if (rs) { params+="&rs="+escape(rs); } else { params+="&rs="+escape('ERROR'); }
 if (rcmp) { params+="&rcmp="+escape(rcmp); }
 if (rcrt) { params+="&rcrt="+escape(rcrt); }
 if (raid) { params+="&raid="+escape(raid); }
 params += '&Log=1&tstamp=' + (new Date()).getTime();
 var teimg = new Image();
 teimg.src = "http://"+_site+"/cgi-bin/stats/redirect.cgi?"+params;
}


// Append data to be tracked to collection variable _pdata
function addpdata(name,value) {
  _pdata += '&' + name + '=' + escape(value);
}

// Send tracking request with additional page data to server
function sendpdata() {
  addpdata('page',document.location);
  addpdata('vsbw',document.body.clientWidth?document.body.clientWidth:"NA");
  addpdata('vsbh',document.body.clientHeight?document.body.clientHeight:"NA");
  addpdata('vssw',screen.availWidth?screen.availWidth:"NA");
  addpdata('vssh',screen.availHeight?screen.availHeight:"NA");
  addpdata('ptitle',document.title?document.title:"NA");
  if (document.links[0]){
    var links = document.links; 
    addpdata('vslc',links.length);
  }
  if (document.images[0]){
    var imgs = document.images, ads='', adsc=0, k=0;
    addpdata('imgc',imgs.length);
    while(img=imgs[k++]) {
      if (img.className == 'OAS_counter') {
        var adarr = img.id.split("/");
        var ad = adarr[0] + '/' + adarr[2];
        if (adsc>0) { ads +=',' } ads += ad; adsc++;
      }
    }
    addpdata('adsc',adsc);
    addpdata('ads',ads);
  }
  if (typeof(_pdata) != "undefined") {
    var turl="<script language='javascript' src='http://"+_site+"/dhtml/stats/track/vscap.js?"+_pdata+"'></script>";
    document.write(turl);
  }
}
