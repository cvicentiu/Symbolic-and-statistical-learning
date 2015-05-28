function showdate() {
  
	var now=new Date();
	var month=now.getMonth();
	var nowmonth="";
	if (month==0){nowmonth="January"};
	if (month==1){nowmonth="February"};
	if (month==2){nowmonth="March"};
	if (month==3){nowmonth="April"};
	if (month==4){nowmonth="May"};
	if (month==5){nowmonth="June"};
	if (month==6){nowmonth="July"};
	if (month==7){nowmonth="August"};
	if (month==8){nowmonth="September"};
	if (month==9){nowmonth="October"};
	if (month==10){nowmonth="November"};
	if (month==11){nowmonth="December"};
	var year=now.getYear(); var nowyear="";
	if (year==99) {nowyear="1999"} else {if (year > 200) {nowyear=year} else {nowyear=1900+year}};
	document.write(nowmonth+"&nbsp;"+now.getDate()+",&nbsp;"+nowyear+"&nbsp;");
}

function showtagline() {
	var rand = Math.floor( (4) *  Math.random());
	scrpt = new Array
	scrpt[0] = "Free time is of the essence"
	scrpt[1] = "Don't spend another weekend flossing your cat"
	scrpt[2] = "It seemed like a good idea at the time"
	scrpt[3] = "Because everybody needs a life"
	document.write(scrpt[rand]);
}

function ShowBurstAd(adcode, width, height) {
 var bN = navigator.appName;
 var bV = parseInt(navigator.appVersion);   
 var base='http://www.burstnet.com/';   
 var Tv='';   
 var agt=navigator.userAgent.toLowerCase();   
 if (bV>=4)  
 {ts=window.location.pathname+window.location.search;
  i=0; Tv=0; while (i< ts.length)
    { Tv=Tv+ts.charCodeAt(i); i=i+1; } Tv="/"+Tv;}
  else   {Tv=escape(window.location.pathname);
  if( Tv.charAt(0)!='/' ) Tv="/"+Tv; 
    else if (Tv.charAt(1)=="/")
 Tv="";     
 if( Tv.charAt(Tv.length-1) == "/")
   Tv = Tv + "_";}   
 if (bN=='Netscape'){        
  if ((bV>=4)&&(agt.indexOf("mac")==-1))  
 { document.write('<s'+'cript src="'+ 
  base+'cgi-bin/ads/'+adcode+'.cgi/RETURN-CODE/JS' 
  +Tv+'">'); 
  document.write('</'+'script>');
 }
   else if (bV>=3) {document.write('<'+'a href="'+base+'ads/' + 
  adcode + '-map.cgi'+Tv+'"target=_top>');
  document.write('<img src="' + base + 'cgi-bin/ads/' +
  adcode + '.cgi' + Tv + '" width="' + width + '" height="' + height + '"' +
  ' border="0" alt="Click Here"></a>');}   
}
if (bN=='Microsoft Internet Explorer')    
document.write('<ifr'+'ame id="BURST" src="'+base+'cgi-bin/ads/'  
+     
adcode + '.cgi' + Tv + '/RETURN-CODE" width="' + width + '" height="' + height + '"' +     
'marginwidth="0" marginheight="0" hspace="0" vspace="0" ' +     
'frameborder="0" scrolling="no"></ifr'+'ame>');  
}
