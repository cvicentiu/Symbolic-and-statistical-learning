// Netscape 3.0 compatibility test (for javascript image swapping)
	compat = false;
	if( parseInt( navigator.appVersion ) >= 3 ) {
		compat = true; 
	}

// cache images for quick swapping
	if( compat ) {

		l_firmprofile = new Image();
		l_firmprofile.src = imageRoot + "/nav/l_firmprofile.gif";
		lo_firmprofile = new Image();
		lo_firmprofile.src = imageRoot + "/nav/lo_firmprofile.gif";
		
		l_biographies = new Image();
		l_biographies.src = imageRoot + "/nav/l_biographies.gif";
		lo_biographies = new Image();
		lo_biographies.src = imageRoot + "/nav/lo_biographies.gif";
		
		l_practicesandindustries = new Image();
		l_practicesandindustries.src = imageRoot + "/nav/l_practicesandindustries.gif";
		lo_practicesandindustries = new Image();
		lo_practicesandindustries.src = imageRoot + "/nav/lo_practicesandindustries.gif";
		
		/*
		l_casestudies = new Image();
		l_casestudies.src = imageRoot + "/nav/l_casestudies.gif";
		lo_casestudies = new Image();
		lo_casestudies.src = imageRoot + "/nav/lo_casestudies.gif";
		*/
		
		l_newsandevents = new Image();
		l_newsandevents.src = imageRoot + "/nav/l_newsandevents.gif";
		lo_newsandevents = new Image();
		lo_newsandevents.src = imageRoot + "/nav/lo_newsandevents.gif";
		
		l_recruiting = new Image();
		l_recruiting.src = imageRoot + "/nav/l_recruiting.gif";
		lo_recruiting = new Image();
		lo_recruiting.src = imageRoot + "/nav/lo_recruiting.gif";
		
		l_publications = new Image();
		l_publications.src = imageRoot + "/nav/l_publications.gif";		
		lo_publications = new Image();
		lo_publications.src = imageRoot + "/nav/lo_publications.gif";			
			
	}
	

// swap images using the cached images

function changeImg(x, y) {
	if( compat ) {
		document.images[x].src=eval(y+'.src'); 
		}
	}

var blnIsMac = false
var strPlatform = window.navigator.platform.toLowerCase()

if (strPlatform.indexOf("mac") > -1)
{ blnIsMac = true; }

var strLastMenu = "mnu_home"

function showMenu(strMenu) {
	if (!blnIsMac) {

		var objLayer
	
		hideMenu(strLastMenu)
	
		if (document.all) {
			objLayer = document.all[strMenu]
		}
		else if (document.getElementById) {
			objLayer = document.getElementById(strMenu)
		}
		else if (document.layers) {
			objLayer = getLayer(strMenu)
		}
	
		// show
		if (document.all) {
			objLayer.style.visibility = "visible";
		}
		else if (document.getElementById) {
			objLayer.style.visibility = "visible"
		}
		else if (document.layers) {
			if (parseFloat(navigator.appVersion) >= 4.08) {
				// move to position relative to image
				objImage = getImage("l_" + strMenu.substring(3, strMenu.length))
				intTop = getImagePageTop(objImage)
				intLeft = getImagePageLeft(objImage)
				objLayer.top = intTop + objImage.height
				objLayer.left = intLeft - 1
				
				// show
				objLayer.visibility = "show"
			}
		}
	
		strLastMenu = strMenu
	}
}

function hideMenu(strMenu) {

	if (!blnIsMac) {

		var objLayer
		var isIn = false
		var i = 0
		var blnIsFromFlash = false
		
		if (strMenu == "hideFromFlash")
			blnIsFromFlash = true
	
		if (strMenu == "" || blnIsFromFlash)
			strMenu = strLastMenu
	
		if (document.all) {
			objLayer = document.all[strMenu]
		}
		else if (document.getElementById) {
			objLayer = document.getElementById(strMenu)
		}
		else if (document.layers) {
			objLayer = getLayer(strMenu)
		}
	
		// hide
		if (document.all) {
			if (!blnIsFromFlash) {
				while (!isIn && i < document.all[strMenu].all.length) {
					if (window.event.toElement == document.all[strMenu].all[i])
						isIn = true
					i++
				}
				if (!isIn) {
					document.all[strMenu].style.visibility = "hidden"
				}
			}
			else {
				document.all[strMenu].style.visibility = "hidden"
			}
		}
		else if (document.getElementById) {
			objLayer.style.visibility = "hidden"
		}
		else if (document.layers) {
			if (parseFloat(navigator.appVersion) >= 4.08) {
				objLayer.visibility = "hide"
			}
		}
	}
}

// Determine browser.

var isMinNS4 = (navigator.appName.indexOf("Netscape") >= 0 &&
                parseFloat(navigator.appVersion) >= 4) ? 1 : 0;
var isMinIE4 = (document.all) ? 1 : 0;
var isMinIE5 = (isMinIE4 && navigator.appVersion.indexOf("5.") >= 0) ? 1 : 0;

//-----------------------------------------------------------------------------
// Layer utilities.
//-----------------------------------------------------------------------------

function getLayer(name) {

  if (document.layers)
    return findLayer(name, document);
  if (isMinIE4)
    return eval('document.all.' + name);
  return null;
}

function findLayer(name, doc) {

  var i, layer;

  for (i = 0; i < doc.layers.length; i++) {
    layer = doc.layers[i];
    if (layer.name == name)
      return layer;
    if (layer.document.layers.length > 0)
      if ((layer = findLayer(name, layer.document)) != null)
        return layer;
  }
  return null;
}


function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

