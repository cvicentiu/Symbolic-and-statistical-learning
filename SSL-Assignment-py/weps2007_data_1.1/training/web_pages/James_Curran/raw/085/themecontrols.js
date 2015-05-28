//var _lastLink='';
var _Theme='Theme0';
var myimages=new Array()

_Theme = getSiteTheme();
appendThemeJavaScript(_Theme);
function navLnk(url){
	window.location=url;
}
function rollOverNavLnk(baseObj, which){
	var _which = '';
	switch (which)
	{
		case 0:
			_which = 'Top'
			break;
		case 1:
			_which = 'Bottom'
			break;
		case 2:
			_which = 'ItemTitleRegion'
			break;
	}
	if(m_IE){
		baseObj.className=baseObj.className.replace('d' + _which + 'LinkPos','d' + _which + 'LinkPos_Over');
		//_lastLink = baseObj.childNodes(0).className + '_Over';
		//baseObj.childNodes(0).className = _lastLink;
	}else{
		baseObj.className=baseObj.className.replace('d' + _which + 'LinkPos','d' + _which + 'LinkPos_Over');
		//_lastLink = baseObj.firstChild.className + '_Over';
		//baseObj.firstChild.className = _lastLink;
	}
}
function rollOffNavLnk(baseObj){
	if(m_IE){
		baseObj.className=baseObj.className.replace('_Over','');
		//baseObj.childNodes(0).className = _lastLink.replace('_Over','');
	}else{
		baseObj.className=baseObj.className.replace('_Over','');
		//baseObj.firstChild.className = _lastLink.replace('_Over','');
	}
}
function getSiteTheme(){
	return 'Theme0'
}
function UpdateTheme(item){
	_Theme = 'Theme' + item.selectedIndex;
	var oldLinkNode = document.getElementsByTagName("link");
	try{
		appendThemeJavaScript(_Theme);
		oldLinkNode[0].href='css/' + _Theme + '/style.css';
		if(m_Opera == true) oldLinkNode[1].href='css/' + _Theme + '/style_op.css';
		if(m_Moz == true) oldLinkNode[1].href='css/' + _Theme + '/style_mz.css';
	}catch(e){
	}
}
function preloadimages(){
	for (i=0;i<preloadimages.arguments.length;i++){
		myimages[i]=new Image()
		myimages[i].src=preloadimages.arguments[i]
	}
}
function appendThemeJavaScript(themeFolder){
   var oPageHeader = document.getElementsByTagName("head").item(0);
   if(document.getElementById('_ThemeJavaScript')){ oPageHeader.removeChild(document.getElementById('_ThemeJavaScript')); }
   try{ 
      var oLinkNode = document.createElement("script");
      oLinkNode.setAttribute("type", "text/javascript"); 
      oLinkNode.setAttribute("src", "http://www.wincustomize.com/js/" + themeFolder + "/custom.js"); 
      oLinkNode.setAttribute("id", "_ThemeJavaScript");
      oPageHeader.appendChild(oLinkNode);
   }catch(e){ }
}


function addDropShaddow(item, type){
   try{
		var _className = 'DynamicDropShadow_';
		//if(m_Moz) return;
		
		switch (type)
		{
			case 0: // Standard
				break;
			case 1: // LinkBar
				_className = 'DynamicDropShadow_LinkBar_'
				break;
			case 2: // Selected Skin View
				_className = 'DynamicDropShadow_SelectedSkin_'
				break;
			case 3: // Sites Home Page
				_className = 'DynamicDropShadow_SiteHomePage_'
			case 3: // Sites Photo Album Page
				_className = 'DynamicDropShadow_SitePhotoAlbum_'
			break;
		}

      var img = document.createElement('img');
      img.id='_FeaturedSkin_Thumb';

      if(item.className != ''){
         img.className = item.className + ' Hand';
      }else{
         img.className = 'Hand';
      }
      img.src=item.src;
      
      if(item.width>0) { img.width=item.width; };
      if(item.height>0) { img.height=item.height; };
      
		if(item.parentNode.nodeName=='SPAN' && item.parentNode.id=='_shadow4'){ //Removes the existing drop shadow.
			var _parentDIV = item.parentNode.parentNode.parentNode.parentNode.parentNode;
			_parentDIV.appendChild(img);
			item.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(img,_parentDIV);
			return;
		}
        
     var span4 = document.createElement('span');
     span4.id='_shadow4';
     span4.className=_className + '4';
     span4.appendChild(img)
     
     var span3 = document.createElement('span');
     span3.id='_shadow3';
     span3.className=_className + '3';
     span3.appendChild(span4)
     
     var span2 = document.createElement('span');
     span2.id='_shadow2';
     span2.className=_className + '2';
     span2.appendChild(span3)
     
     var span1 = document.createElement('span');
     span1.id='_shadow1';
     span1.className=_className + '1';
     span1.appendChild(span2)
     
     item.parentNode.replaceChild(span1,item);  

   }catch(e){
      //alert('Error passed as: ' + e.message);
   }
}
function selectGallerySearch(mode){
	if(mode==0){
		document.getElementById('_GalleryBasicSearch').className='GallerySearch_OptionsLnk_Selected';
		document.getElementById('_GalleryAdvancedSearch').className='GallerySearch_OptionsLnk';
		document.getElementById('_GalleryAdvancedSearch_Region').className='Hide';
	}else{
		document.getElementById('_GalleryBasicSearch').className='GallerySearch_OptionsLnk';
		document.getElementById('_GalleryAdvancedSearch').className='GallerySearch_OptionsLnk_Selected';
		document.getElementById('_GalleryAdvancedSearch_Region').className='GallerySearch_AdvancedPos';
	}
}

function setTopPageLinks(){
   /*
   try{
      var oSkins        = document.getElementById('_TopSkins');
      var oMasterSkins  = document.getElementById('_TopMasterSkins');
      var oSkinners     = document.getElementById('_TopSkinners');
      var oSites        = document.getElementById('_TopSites');
      var oArticles     = document.getElementById('_TopArticles');
      var sClassName    = 'Top_HeaderLnk_Selected';
      
      switch(queryString("type")) {
	      case 'authors':
   		   oSkinners.className=sClassName;
		      break;
	      case 'sites':
            oSites.className=sClassName;
            break;
         case 'articles':
            oArticles.className=sClassName;
            break;
         default:
	         switch(queryString("search")){
	            case '3':
                  oMasterSkins.className=sClassName;
                  document.getElementById('_TopSkins_HeaderRow').style.visibility='hidden';
                  break;
	            default:
                  oSkins.className=sClassName;
                  break;
            }
      }
   }catch(e){ }
   */
   try{
      var _DDL = document.getElementById('_TopPageNavDDL');
      if(queryString("type")==''){
         _DDL.selectedIndex = getDDLSelectedIndexFromValue(_DDL,'skins');
      }else{
         _DDL.selectedIndex = getDDLSelectedIndexFromValue(_DDL,queryString("type"));
      }
   }catch(e){
   
   }
   
}
function getDDLSelectedIndexFromValue(item,theValue){
   var _return = -1;
   for (var i = 0; i < item.options.length; i++){
      if(item.options[i].value==theValue){
         _return = i;
         break;
      }
   }
   return _return;
}

function fixAdSizes(item){
   if(m_IE){ //Detect IE and add a little extra width/height to it's ad box to support the dropshadow.
      item.style.width=(parseInt(item.style.width)+9) + 'px';
      item.style.height=(parseInt(item.style.height)+5) + 'px';
   }
}

function imageError(item){
   item.src='/images/' + _Theme + '/image.nopreview.gif';
}

function showMotionPreview(oProperties){
   switch (oProperties.VideoType){
		case 'flash':	{
			showFlashVideo(oProperties);
			break 
		}
		case 'avi':	{
			//Call some other method here.
			break 
		}	
	}
}
function selectMediaControlTab(tab){
   var oTab_Photo     = document.getElementById('MediaControls_Tab_Photo');
   var oTab_Video     = document.getElementById('MediaControls_Tab_Video');
   
   var oRegion_Photo    = document.getElementById('MediaControl_Photo');
   var oRegion_Video    = document.getElementById('MediaControl_Video');
   
   oTab_Photo.className = 'MediaControls_Tab';
   oTab_Video.className = 'MediaControls_Tab';

   oRegion_Photo.style.display='none';
   oRegion_Video.style.display='none';
   
   switch (tab){
      case 'photo':
         oTab_Photo.className = 'MediaControls_TabSelected';
         oRegion_Photo.style.display='';
         break;
      case 'video':
         oTab_Video.className = 'MediaControls_TabSelected';
         oRegion_Video.style.display='';
         break;
      default:
         oTab_Photo.className = 'MediaControls_TabSelected';
         oRegion_Photo.style.display='';
         break;
   }
}