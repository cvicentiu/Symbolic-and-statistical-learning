
function galleryMenu(){
   var _this = this;
   this.Load = function(){
      _this.writeGalleryMenu();
   }
   function getCookie(name){
	   var dc = document.cookie;
	   var prefix = name + "=";
	   var begin = dc.indexOf("; " + prefix);
	   if (begin == -1) {
		   begin = dc.indexOf(prefix);
		   if (begin != 0) return null;
	   } else
		   begin += 2;
	   var end = document.cookie.indexOf(";", begin);
	   if (end == -1)
		   end = dc.length;
	   return unescape(dc.substring(begin + prefix.length, end));
   }
   this.saveCookie = function(name,value){
   
      //alert(name + '=' + value);
	   if(name==null && value==null){ return; }
	   var oneYear = 365 * 24 * 60 * 60 * 1000;
	   var expDate = new Date();		
	   expDate.setTime(expDate.getTime() + oneYear);
	   var domain = ""; //"domain=localhost/Wincustomize;"
	   domain = 'domain=wincustomize.com;';	   
	   document.cookie = name + "=" + escape(value) + "; " + domain + " expires=" + expDate.toGMTString(); + "; path=/";	   
	   
	   //alert(expDate.toGMTString());
	   //alert(document.cookie);
   }
   function inUserArray(id,array){
	   var _userArray = array.split(',');
	   for(var i = 0;i<_userArray.length;i++){
		   if(_userArray[i]==id){ return true; }
	   }
	   return false;
   }
   this.save = function (MenuId){
      var _count = 0;
	   var _arrStr = '';
	   var items = document.getElementsByTagName('INPUT');
	   for(var i=0;i<items.length;i++){
		   if(items[i].name.indexOf('GalOptions__')!=-1){
			   if(items[i].checked){
			      _count++;
				   _arrStr += items[i].name.substring(12) + ',';
			   }
		   }
	   }
	   if(_count==0){
	      _arrStr += ',';
	   }
	   _this.saveCookie("Gallery", _arrStr);	  	   
	   _this.writeGalleryMenu();
   }
   this.writeGalleryMenu = function(){
      try
	   {
	      var array = _GalleryItemsArray;
	      var _userArray = getCookie("Gallery");	
	      
	      //alert(document.cookie);
	      //alert(_userArray);
	      
	      var bArrayExists = false;	
	      if(_userArray){ 
	         bArrayExists = true; 
	         if(_userArray.indexOf(',')!=-1){ _userArray = _userArray.substring(0,_userArray.length-1); }
	      }
	      var _str = '';
	      var bVisible = false;
	      //_str += '<table width="100%" cellpadding=0 cellspacing=0 class="LibraryLinkBarFont">';
	      //_str += '<tr>\n';
		      //_str += '<td width=22></td>\n';
		      //_str += '<td></td>\n';
		      //_str += '<td width=45></td>\n';
	      //_str += '</tr>\n';
	      
	      
	      _str += '<div id="_GalleryOptionMenuPos" class="GalleryOptionsMenuPos" style="display: none;"></div>';
	      
	      _str += '<ul class="UL_LinkBar">';
	      
	      for(var i = 0; i < array.length; i++){
		      bVisible = false;
		      if(bArrayExists){
			      if(array[i][5]==1||inUserArray(array[i][2],_userArray)){
				      bVisible = true;
			      }
		      }else{
			      if(array[i][4]==1||array[i][5]==1){
				      bVisible = true;
			      }
		      }
		      if(bVisible){
			      //_str += '<tr>\n';
				      //_str += '<td align=center><img src="http://images3.stardock.com/wc/icons/' + array[i][3] + '"></td>\n';
				      //_str += '<td><nobr><a href="/Skins.aspx?LibID=' + array[i][2] + '" class="LibraryLinkBarFont">' + array[i][0] + '</a></nobr></td>\n';
				      //_str += '<td align=right height=22 class="LibraryCountTextColor" style="font-size: 11px;">' + array[i][1] + '&nbsp;</td>\n';
			      //_str += '</tr>\n';
			      
			         var _bShowIcons = new Boolean(true);
	               _bShowIcons = isShowIcons();
			      
			         if(_bShowIcons){
                     _str += '<div class="DIV_LinkBar">';
                     _str += '<img src="http://images3.stardock.com/wc/icons/' + array[i][3] + '" align=absmiddle> ';
                     _str += '<a href="/skins.aspx?libid=' + array[i][2] + '" class="LnkBar">' + array[i][0] + '</a>';
                     _str += '</div>';
			         }else{
                     _str += '<li class="LI_LinkBar">';
                     _str += '<a href="/skins.aspx?libid=' + array[i][2] + '" class="LnkBar">' + array[i][0] + '</a>';
                     _str += '</li>';
			         }
			      
			         
			      
		      }
	      }
	      //_str += '</table>';
	      
	      _str += '</ul>';
	      
	      //alert(_str);
	      
	      if(document.getElementById('_GalleryMenu')){
	         document.getElementById('_GalleryMenu').innerHTML = _str;
	      }else{
	         document.write('<div id="_GalleryMenu">' + _str + '</div>');
	      }
	   }catch(ex){
	      //alert(ex.message);
	   }
   }
   this.showExtendedOptions = function(item){
	   item.onclick = function() { 
		   document.getElementById('_GalleryOptionMenuPos').innerHTML = _this.getGalleryOptionsLinkContent('_GalleryOptionMenuPos');			
		   document.getElementById('_GalleryOptionMenuPos').style.display = '';
		   document.getElementById('_ExtOptions').className='EditGalleryButton Faded';
	   }	
   }
   function isShowIcons(){
      _showGalleryMenuIcons = _ShowDefaultLibIcon;
      var _showIcons = getCookie("GalleryMenuIcons");
      if(_showIcons!=null){
         if(parseInt(_showIcons)==0){
            return false;
         }else{
            return true;
         }
      }
      return Boolean(_showGalleryMenuIcons);
   }
   this.getGalleryOptionsLinkContent = function(MenuId){	
	   var array = _GalleryItemsArray;	
	   var _userArray = getCookie("Gallery");
	   var _str = '';
	   var _bShowIcons = new Boolean(true);
	   
	   _bShowIcons = isShowIcons();
	   
	   _str += '<div class="OptionsMenuHeaderButtons">';
	      _str += '<input type=button name=save value="Save" onClick="_galleryMenu.saveGalleryMenuOptions(\''+ MenuId +'\');" class="GalleryOptionButton">&nbsp;&nbsp;&nbsp;<input type=button name=Cancel value="Cancel" onClick="_galleryMenu.closeGalleryMenu(\''+ MenuId +'\');" class="GalleryOptionButton">\n';
	   _str += '</div>';
	   _str += '<div class="OptionsMenuHeaderText">\n';
	      _str += '<div>';
	         _str += 'Display library icons?';
	         _str += '<div>';
	            _str += '<input type=radio name=icons value="1" id="GalOptionsIcons__Icons_1" '
	               if(_bShowIcons==true){
	                  _str += 'checked';
	               }
	            _str += '> <label for="GalOptionsIcons__Icons_1">Yes</label> &nbsp;&nbsp;&nbsp;';
	            _str += '<input type=radio name=icons value="0" id="GalOptionsIcons__Icons_0" '
	               if(_bShowIcons==false){
	                  _str += 'checked';
	               }
	            _str += '> <label for="GalOptionsIcons__Icons_0">No</label>';
	         _str += '</div>';
	      _str += '</div>';
	       _str += '<div>';
	         _str += '<a href="javascript:;" onClick="_galleryMenu.hideShowGalleryOptionItems(0);" class="OptionsMenuLnk">Hide</a> / <a href="javascript:;" onClick="_galleryMenu.hideShowGalleryOptionItems(1);" class="OptionsMenuLnk">Show</a> all gallery items.\n';
	      _str += '</div>';
	   _str += '</div>';
	   _str += '<div class="OptionsMenuTextConstraints">';
	   
	   for(var i = 0; i < array.length; i++){
	      _str += '<div style="font-size: 11px; white-space: nowrap;">';
		   var ii = 0;
         _str += '<input type=checkbox name="GalOptions__' + array[i + ii][2] + '" id="GalOptions__' + array[i + ii][2] + '" ';
         if(_userArray){
            if(array[i + ii][5]==1||inUserArray(array[i + ii][2],_userArray)){
	            if(array[i + ii][5]==1){
		            _str += 'checked disabled';
	            }else{
		            _str += 'checked ';
	            }
            }
         }else{
            if(array[i + ii][4]==1||array[i + ii][5]==1){
	            if(array[i + ii][5]==1){
		            _str += 'checked disabled';
	            }else{
		            _str += 'checked ';
	            }
            }
         }
         _str += ' >';
         _str += '<label for="GalOptions__' + array[i + ii][2] + '">' + array[i + ii][0] + '</label>';  
	      _str += '</div>';
	   }
	   _str += '</div>';
	   
	   return _str;
   }
   this.hideShowGalleryOptionItems = function(mode){
      var _checked = false;
      if(mode==1){ _checked = true; }
      var items = document.getElementsByTagName('INPUT');
	   for(var i=0;i<items.length;i++){
		   if(items[i].name.indexOf('GalOptions__')!=-1){
				   items[i].checked = _checked;
		   }
	   }
   }
   this.closeGalleryMenu = function(MenuId){
	   document.getElementById(MenuId).innerHTML = '';
	   document.getElementById('_GalleryOptionMenuPos').style.display = 'none';
	   document.getElementById('_ExtOptions').className='EditGalleryButton Solid';
   }
   this.saveGalleryMenuOptions = function(MenuId){
      var _count = 0;
	   var _arrStr = '';
	   var items = document.getElementsByTagName('INPUT');
	   for(var i=0;i<items.length;i++){
		   if(items[i].name.indexOf('GalOptions__')!=-1){
			   if(items[i].checked){
			      _count++;
				   _arrStr += items[i].name.substring(12) + ',';
			   }
		   }
	   }
	   if(_count==0){
	      _arrStr += ',';
	   }
	   _this.saveCookie("Gallery", _arrStr);
	   var createdDate = new Date();
	   _this.saveCookie("GalleryCreated", createdDate.toGMTString());
	   
	   if(document.getElementById('GalOptionsIcons__Icons_1').checked){
	      _GalleryMenuIcons = 1;
	   }else{
	      _GalleryMenuIcons = 0;
	   }
	   
	   _this.saveCookie("GalleryMenuIcons", _GalleryMenuIcons)
	   _this.closeGalleryMenu(MenuId);
	   _this.writeGalleryMenu();
   }
}