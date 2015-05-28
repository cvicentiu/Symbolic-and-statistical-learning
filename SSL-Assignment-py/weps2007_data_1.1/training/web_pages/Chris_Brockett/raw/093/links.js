function externalLinks() {
 if (!document.getElementsByTagName) return;
 var anchors = document.getElementsByTagName('a');
 for (var i=0; i<anchors.length; i++)
 {
   var anchor = anchors[i];
   if(anchor.href && anchor.rel.match(/\bexternal\b/i))
     anchor.target = "_blank";
 }
}

function emailLinks() {
 if (!document.getElementsByTagName) return;
 var anchors = document.getElementsByTagName('a');
 var reg = /^mailto:([0-9a-f]+)$/;
 for (var i=0; i<anchors.length; i++)
 {
   var anchor = anchors[i];
   if(!anchor.href) continue;
    var xr = reg.exec(anchor.href);
    if(!xr) continue;
    var x = xr[1];
    var dar = x.match(/[0-9a-z][0-9a-z]/g);
    var s = '';
    var r = parseInt(dar[0], 16);
    for(var j=1;j!=dar.length;++j)
    {
    	var t = parseInt(dar[j], 16);
    	s += String.fromCharCode(r^t);
    	r = t;
    }
    xr = s.split(/\|/);
    anchor.href = "mailto:" + xr[0];
    if(xr.length > 1)
    {
      if(anchor.innerHTML)
        anchor.innerHTML = xr[1];
      else
      {
        anchor.document.open();
        anchor.document.write(xr[1]);
        anchor.document.close();
      }
    }
  }

}

function mainLinks() {
  externalLinks();
  emailLinks();
}
