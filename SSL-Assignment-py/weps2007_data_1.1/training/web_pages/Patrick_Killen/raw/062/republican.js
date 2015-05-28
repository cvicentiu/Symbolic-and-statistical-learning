<!--
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
//-->
<!--
function JustSoPicWindow(imageName,imageWidth,imageHeight,alt,bgcolor,hugger,hugMargin) {
// by E Michael Brandt of ValleyWebDesigns.com - Please leave these comments intact.
// version 3.0.4  

	if (bgcolor=="") {
		bgcolor="#FFFFFF";
	}
	var adj=10
	var w = screen.width;
	var h = screen.height;
	var byFactor=1;

	if(w<740){
	  var lift=0.90;
	}
	if(w>=740 & w<835){
	  var lift=0.91;
	}
	if(w>=835){
	  var lift=0.93;
	}
	if (imageWidth>w){	
	  byFactor = w / imageWidth;			
	  imageWidth = w;
	  imageHeight = imageHeight * byFactor;
	}
	if (imageHeight>h-adj){
	  byFactor = h / imageHeight;
	  imageWidth = (imageWidth * byFactor);
	  imageHeight = h; 
	}
	   
	var scrWidth = w-adj;
	var scrHeight = (h*lift)-adj;

	if (imageHeight>scrHeight){
  	  imageHeight=imageHeight*lift;
	  imageWidth=imageWidth*lift;
	}

	var posLeft=0;
	var posTop=0;

	if (hugger == "hug image"){
	  if (hugMargin == ""){
	    hugMargin = 0;
	  }
	  var scrHeightTemp = imageHeight - 0 + 2*hugMargin;
	  if (scrHeightTemp < scrHeight) {
		scrHeight = scrHeightTemp;
	  } 
	  var scrWidthTemp = imageWidth - 0 + 2*hugMargin;
	  if (scrWidthTemp < scrWidth) {
		scrWidth = scrWidthTemp;
	  }
	  
	  if (scrHeight<100){scrHeight=100;}
	  if (scrWidth<100){scrWidth=100;}

	  posTop =  ((h-(scrHeight/lift)-adj)/2);
	  posLeft = ((w-(scrWidth)-adj)/2);
 	}

	if (imageHeight > (h*lift)-adj || imageWidth > w-adj){
		imageHeight=imageHeight-adj;
		imageWidth=imageWidth-adj;
	}
	posTop = parseInt(posTop);
	posLeft = parseInt(posLeft);		
	scrWidth = parseInt(scrWidth); 
	scrHeight = parseInt(scrHeight);
	
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1){
	  var args= new Array();
	  args[0]='parent';
	  args[1]=imageName;
	  var i ; document.MM_returnValue = false;
	  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
	} else {
	newWindow = window.open("vwd_justso.htm","newWindow","width="+scrWidth+",height="+scrHeight+",left="+posLeft+",top="+posTop);
	newWindow.document.open();
	newWindow.document.write('<html><title>'+alt+'</title><body leftmargin="0" topmargin="0" marginheight="0" marginwidth="0" bgcolor='+bgcolor+' onBlur="self.close()" onClick="self.close()">');  
	newWindow.document.write('<table width='+imageWidth+' border="0" cellspacing="0" cellpadding="0" align="center" height='+scrHeight+' ><tr><td>');
	newWindow.document.write('<img src="'+imageName+'" width='+imageWidth+' height='+imageHeight+' alt="Click screen to close" >'); 
	newWindow.document.write('</td></tr></table></body></html>');
	newWindow.document.close();
	newWindow.focus();
	}
}
//-->


function toggleDisplay(id) {
	if (document.getElementById(id).style.display == '') {
		document.getElementById(id).style.display = 'none';
	} else {
		document.getElementById(id).style.display = '';
	}
}
<!--
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_validateForm() { //v4.0
  var i,p,q,nm,test,num,min,max,errors='',args=MM_validateForm.arguments;
  for (i=0; i<(args.length-2); i+=3) { test=args[i+2]; val=MM_findObj(args[i]);
    if (val) { nm=val.name; if ((val=val.value)!="") {
      if (test.indexOf('isEmail')!=-1) { p=val.indexOf('@');
        if (p<1 || p==(val.length-1)) errors+='- '+nm+' must contain an e-mail address.\n';
      } else if (test!='R') { num = parseFloat(val);
        if (isNaN(val)) errors+='- '+nm+' must contain a number.\n';
        if (test.indexOf('inRange') != -1) { p=test.indexOf(':');
          min=test.substring(8,p); max=test.substring(p+1);
          if (num<min || max<num) errors+='- '+nm+' must contain a number between '+min+' and '+max+'.\n';
    } } } else if (test.charAt(0) == 'R') errors += '- '+nm+' is required.\n'; }
  } if (errors) alert('The following error(s) occurred:\n'+errors);
  document.MM_returnValue = (errors == '');
}
//-->