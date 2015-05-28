// lazy shortcut

d=document;

// set up rollovers

sections = new Array();
for (x=0;x<=sections.length-1;x++){
setup = sections[x]+'on = new Image();'+sections[x]+'on.src = "resources/img/nav/'+sections[x]+'_on.gif";'+sections[x]+'off = new Image();'+sections[x]+'off.src = "resources/img/nav/'+sections[x]+'_off.gif";';
eval(setup);
}

// rollover functions
function on(which) {if (d.images) {document[which].src = eval(which+"on.src");}}
function off(which) {if (d.images) {document[which].src = eval(which+"off.src");}}

// status bar set

window.status=d.title;

// window popper

function popwin(url,width,height){
window.open(url,'popup','width='+width+',height='+height+',location=0,address=0,scrollbars=0,status=0,noresize');
}

// screen width to determin wide content display

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
	
function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function getbrowserwidth() {
	var bWidth;
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		bWidth = document.body.clientWidth;
	} else {                                                
		bWidth = window.outerWidth;
	}
	return bWidth;   
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
 if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
   document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
 else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}

MM_reloadPage(true);

function widecontent(){
	if( getbrowserwidth() > 1000 ) {		
		if ( ( obj=MM_findObj( 'widecontent' ) ) != null ) {
			obj.style.display="block";
		}	
		if ( ( obj=MM_findObj( 'widecontent_insite' ) ) != null ) {
			obj.style.display="block";
		}		
		MM_showHideLayers( 'widecontent','','show' );
		MM_showHideLayers( 'widecontent_insite','','show' );
	}	
}

// show/hide

function show(object) {
	if (d.getElementById && d.getElementById(object) != null)
	node = d.getElementById(object).style.visibility='visible';
	else if (d.layers && d.layers[object] != null)
	d.layers[object].visibility = 'visible';
	else if (d.all)
	d.all[object].style.visibility = 'visible';
}

function hide(object) {
	if (d.getElementById && d.getElementById(object) != null)
	node = d.getElementById(object).style.visibility='hidden';
	else if (d.layers && d.layers[object] != null)
	d.layers[object].visibility = 'hidden';
	else if (d.all)
	d.all[object].style.visibility = 'hidden';
}

// multimedia homepage stuff

function show_multimedia(which){

	var isNetscape = ( navigator.userAgent.toLowerCase().indexOf('netscape') != -1 ) ;
	
	switch(which){
	
		case "firsttime":

			if (pluginlist.indexOf("RealPlayer")!=-1){
				show('video');
				show('video_nav');
				show('video_play');
				
				if( isNetscape ) {
					
					show('divRealPlaya');
					hide('divNotRealPlaya');
				}
				else {
					
					hide('divRealPlaya');
					show('divNotRealPlaya');					
				}
				
			}else{
				show('tvphotos');
				show('tvphotos_nav');
				show('tvphotos_tv');
				hide('divRealPlaya');
				hide('divNotRealPlaya');
			}	
				
		break;
		
		case "video":		
					
			hide('tvphotos');
			hide('tvphotos_nav');
			hide('tvphotos_tv');
			hide('tvphotos_photos');
			show('video');
			show('video_nav');
			if (pluginlist.indexOf("RealPlayer")!=-1){
				show('video_play');
			}else{
				show('video_download');
			}	
			
			if( isNetscape ) {
					
				show('divRealPlaya');
				hide('divNotRealPlaya');
			}
			else {
				
				hide('divRealPlaya');
				show('divNotRealPlaya');					
			}
				
		break;
		
		case "tvphotos":
			
			hide('video');
			hide('video_nav');
			hide('video_play');
			hide('video_download');
			show('tvphotos');
			show('tvphotos_nav');
			show('tvphotos_tv');
			hide('divRealPlaya');
			hide('divNotRealPlaya');
			
		break;
	}
}	

// start the real playa
function playSource() {
	
	var is_ie   = (navigator.userAgent.toLowerCase().indexOf("msie") != -1);
	//var isNetscape = ( navigator.userAgent.toLowerCase().indexOf('netscape') != -1 ) ;
	var RAOCX 	= document.getElementById("RVOCX");
	
	
	if( RAOCX && is_ie ) {
		
		RAOCX.DoPlayPause();
	} 
	else if ( document.javaPlug1 ) {
		
		document.javaPlug1.DoPlayPause();
	}
	else {
		
		document.embeds[0].DoPlayPause();
	}
	
	
}


//write the Safari Style sheet if we so detect it.

var nua, saf
nua=navigator.userAgent;
saf=(nua.indexOf('Safari')!=-1);
//the file isn't in resources/css so there's no point referencing it
//if (saf){
//	d.write('<link rel="STYLESHEET" type="text/css" href="resources/css/style_safari.css">');
//}

// homepage function combiner for onload statement

function init(){
	widecontent();
	show_multimedia('firsttime');
}
