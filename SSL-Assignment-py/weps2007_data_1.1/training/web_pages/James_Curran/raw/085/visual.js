

function FeatureWindow(skinid, libraryid)
{
   window.open('popups/favoriteskin.aspx?skinid=' + skinid + '&libid=' + libraryid, 'FeatureSkin','toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,copyhistory=no,scrollbars=yes,width=810,height=570');
   return false;
}

function FavoriteWindow(articleid)
{
   newWindow(600, 200, '_blank', 'popups/articlefavorite.aspx?aid=' + articleid, false);
   return false;
}

function editReplyBounce()
{
   window.location = window.location + '#reply';
}

function editCommentBounce()
{
   window.location = window.location + '#comment';
}

function ArticleRedirect(addData)
{
   var loc = window.location + '?';
   var newloc = '';
   var view = queryString('view');
   var catid = queryString('cid');
   var p = queryString('p');  
 
   if(catid != '' && catid != null)
   {
      if(newloc == '')
         newloc = 'cid=' + catid;    
      else
         newloc = newloc + '&cid=' + catid; 
   }     
       
   var checknum = parseInt(p);    
   if(p != '' && p != null && isNaN(checknum) && p >= 1)
   {
      if(newloc == '')
         newloc = 'p=' + p;    
      else
         newloc = newloc + '&p=' + p; 
   }           
    
   if(newloc == '')
      newloc = 'view=' + view;    
   else
      newloc = newloc + '&view=' + view;
      
   if(newloc == '')
      newloc = addData;    
   else
      newloc = newloc + '&' + addData;      
      
   window.location = '?' + newloc;
}

function ArticleViewChange(select)
{
   var loc = window.location + '?';
   var newloc = '';
   var view = select.options[select.selectedIndex].value;
   var search = queryString('search');
   var catid = queryString('cid');
   var p = queryString('p');  
   
   if(search != '' && search != null)
   {
      if(newloc == '')
         newloc = 'search=' + search;    
      else
         newloc = newloc + '&search=' + search; 
   }     

   if(catid != '' && catid != null && view != '2' && view != '0' && view != '3')
   {
      if(newloc == '')
         newloc = 'cid=' + catid;    
      else
         newloc = newloc + '&cid=' + catid; 
   }     
       
   var checknum = parseInt(p);    
   if(p != '' && p != null && isNaN(checknum) && p >= 1)
   {
      if(newloc == '')
         newloc = 'p=' + p;    
      else
         newloc = newloc + '&p=' + p; 
   }           
    
   if(newloc == '')
      newloc = 'view=' + view;    
   else
      newloc = newloc + '&view=' + view;
      
   window.location = '?' + newloc;
}

var ArticleWatchCheckflag = false;
function ArticleWatchCheckAll() 
{
   var fmobj = document.getElementById('aspnetForm');
   for (var i=0;i<fmobj.elements.length;i++)
   {
      var e = fmobj.elements[i];
      if ( (e.name != 'allbox') && (e.type=='checkbox') && (!e.disabled) && e.name.indexOf('ArticleWatch') >= 0 ) 
      {
         if (ArticleWatchCheckflag == false)
         {       
            e.checked = fmobj.allbox.checked;
            ArticleWatchCheckflag = true;
         }
         else 
         {
            e.checked = fmobj.allbox.checked;
            ArticleWatchCheckflag = false;         
         }
      }     
   }
}

function ArticleAuthorWatchCheck(check, accountid) 
{
   var fmobj = document.getElementById('aspnetForm');
   var ArticleAuthorWatchCheckflag = check.checked;
   
   for (var i=0;i<fmobj.elements.length;i++)
   {
      var e = fmobj.elements[i];
      if ( (e.name != 'allbox') && (e.type=='checkbox') && (!e.disabled) && e.name.indexOf('ArticleWatch') >= 0  && e.id == '__' + accountid) 
      {          
         e.checked = ArticleAuthorWatchCheckflag;
      }     
   }
}

var SkinWatchCheckflag = false;
function SkinWatchCheckAll() 
{
   var fmobj = document.getElementById('aspnetForm');
   for (var i=0;i<fmobj.elements.length;i++)
   {
      var e = fmobj.elements[i];
      if ( (e.name != 'allbox') && (e.type=='checkbox') && (!e.disabled) && e.name.indexOf('SkinWatch') >= 0 ) 
      {
         if (SkinWatchCheckflag == false)
         {       
            e.checked = fmobj.allbox.checked;
            SkinWatchCheckflag = true;
         }
         else 
         {
            e.checked = fmobj.allbox.checked;
            SkinWatchCheckflag = false;         
         }
      }     
   }
}

function SkinAuthorWatchCheck(check, accountid) 
{
   var fmobj = document.getElementById('aspnetForm');
   var SkinAuthorWatchCheckflag = check.checked;
   
   for (var i=0;i<fmobj.elements.length;i++)
   {
      var e = fmobj.elements[i];
      if ( (e.name != 'allbox') && (e.type=='checkbox') && (!e.disabled) && e.name.indexOf('SkinWatch') >= 0  && e.id == '__' + accountid) 
      {          
         e.checked = SkinAuthorWatchCheckflag;
      }     
   }
}

function initSkinSort()
{
   var newest = document.getElementById('_SkinSortLinkNewest');
   var updated = document.getElementById('_SkinSortLinkUpdated');
   var name = document.getElementById('_SkinSortLinkName');
   var downloads = document.getElementById('_SkinSortLinkDownloads');
   var rating = document.getElementById('_SkinSortLinkRating');
   var libId = queryString('libid');
   var href = '';
 
   if(libId != '' && libId != null)
   {
      href = 'skins.aspx?libid=' + libId + '&sort=';
   }
   else
   {
      href = 'skins.aspx?sort=';
   }
   
   newest.href = href +'newest';
   updated.href = href +'updated';
   name.href = href +'name';
   downloads.href = href +'downloads';
   rating.href = href +'rating';  
   
   var oNewest    = document.getElementById('_SkinSortNewest');
   var oUpdated   = document.getElementById('_SkinSortUpdated');
   var oName      = document.getElementById('_SkinSortName');
   var oDownloads = document.getElementById('_SkinSortDownloads');
   var oRating    = document.getElementById('_SkinSortRating');
   var newclass = 'GallerySearch_HeaderLnk_Selected';
   
   switch(queryString("sort")) 
   {
	   case 'newest':
   		oNewest.className = newclass;
		   break;
	   case 'updated':
         oUpdated.className = newclass;
         break;
	   case '':
         oUpdated.className = newclass;
         break;         
      case 'name':
         oName.className = newclass;
         break;
      case 'downloads':
         oDownloads.className = newclass;
         break;
      case 'rating':
         oRating.className = newclass;
         break;
   }    
   
}

function confirmDelete(what)
{
   return confirm('Are you sure you want to delete this ' + what + ' ?');
}

function crumbMenuItemOver(what)
{
   var link = getChildById(what, '_Link');
   var icon = getChildById(what, '_Icon');
   
   what.className = "DD_ItemOver";
   if(link != null) link.className = "DD_LinkOver";
   if(icon != null) icon.className = "DD_IconOver";
}

function crumbMenuItemOut(what)
{  
   var link = getChildById(what, '_Link');
   var icon = getChildById(what, '_Icon');
   
   what.className = "DD_Item";
   if(link != null) link.className = "DD_Link";
   if(icon != null) icon.className = "DD_Icon";
}

//Determines whether or not to show the 'right bar'. 
//In the old code, someone decided to use 'mode' as the query string parameter. 
//Hence, we have to keep using it. mode=1 is supposed to mean that we need to hide the bar.
function processMode()
{
   if(queryString('mode') == '1')
   {
      var masterBody = document.getElementById('_MasterBody');
      var body = document.getElementById('_Body');
      var linkBar = document.getElementById('_LinkBar');
      
      linkBar.className = 'Hide';
      masterBody.className += ' MainSiteWrapper_Constraints_Compact';
      body.className += ' Body_Constraints_Compact';
   }
}

function showHideTags(visibleClass, hiddenClass)
{
   var tags = document.getElementById('_TagCloud');

   if(tags.className == visibleClass)
      tags.className = hiddenClass;
   else
      tags.className = visibleClass;
}

function ValidateArticleReply(editorid, butt)
{
   if(!m_IE)
      editor_updateOutput(editorid);
   
	if( Trim(editor_getcontents(editorBodyId)) == '' )
	{
		alert("Sorry, but you cannot submit a blank reply!");
		return false;
	}
	
	if(butt) //bahahaha
	{
	   butt.style.display = 'none';
	   var statusbutt = document.getElementById('_SubmittingStatus');
	   
	   if(statusbutt) //double bahahaha
	   {
	      statusbutt.disabled = true;
	      statusbutt.value = 'Submitting Reply...';
	      statusbutt.style.display = '';
	   }
	}
	
	return true;
}

function ValidateSkinComment(editorid, butt)
{
   
   if(!m_IE)
      editor_updateOutput(editorid);
   
	if( Trim(editor_getcontents(editorBodyId)) == '' )
	{
		alert("Sorry, but you cannot submit a blank comment!");
		return false;
	}
	
	if(butt) //bahahaha
	{
	   butt.style.display = 'none';
	   var statusbutt = document.getElementById('_SubmittingStatus');
	   
	   if(statusbutt) //double bahahaha
	   {
	      statusbutt.disabled = true;
	      statusbutt.value = 'Submitting Comment...';
	      statusbutt.style.display = '';
	   }
	}
	
	return true;
}

function hideSkinComments(){
   if(queryString('comments')=='0'){
      if(document.getElementById('_SkinCommentsSection')){
         document.getElementById('_SkinCommentsSection').style.display='none';
         if(document.getElementById('_SkinCommentsPagebar')){
            document.getElementById('_SkinCommentsPagebar').style.display='none';
         }
         if(document.getElementById('_CommentsLink')){
            document.getElementById('_CommentsLink').onclick=function(){ showSkinComemnts(); };
         }
         if(document.getElementById('_SkinCommentsPagebar_Bottom')){
            document.getElementById('_SkinCommentsPagebar_Bottom').style.display='none';
         }
      }
   }
}
function showSkinComemnts(){
   if(document.getElementById('_SkinCommentsSection')){
      document.getElementById('_SkinCommentsSection').style.display='';
      if(document.getElementById('_SkinCommentsPagebar')){
         document.getElementById('_SkinCommentsPagebar').style.display='';
      }
      if(document.getElementById('_SkinCommentsPagebar_Bottom')){
         document.getElementById('_SkinCommentsPagebar_Bottom').style.display='';
      }
   }
}

function PagerRoll(currentPage, lastPage, element, over)
{
   if(currentPage == lastPage) { return };
   
   if(over)
      element.className = element.className + '_OVER'; 
   else
      element.className = element.className.replace('_OVER',''); 
}

function InitRegions()
{
   var sponsor = document.getElementById('_SponsorAdRegion');
   var top = document.getElementById('_TopAdRegion');

   
   
   var alt = getCookieKey("UserInfo", "ALMarker");
   var clt = getCookieKey("UserInfo", "CLMarker");
   var cl = 0;
   var al = 0;
   
   if(alt != '' && alt != null) al = parseInt(alt);
   if(clt != '' && clt != null) cl = parseInt(clt);
   
   //if(cl == clv || al >= alv) { sponsor.style.display = 'none'; top.style.display = 'none'; }
   if(cl != clv && al < alv) 
   { 
      sponsor.className = sponsor.className.replace(' Hide','');
      top.className = top.className.replace(' Hide','');
      	try{
		var _PrimaryAd = document.getElementById('_Sponsor_IndexPrimaryAd');
   		var _SecondaryAd = document.getElementById('_Sponsor_IndexSecondaryAd');
		_PrimaryAd.className = _PrimaryAd.className.replace(' Hide','');
      		_SecondaryAd.className = _SecondaryAd.className.replace(' Hide',''); 
	}catch(e){}	
   }
   

}