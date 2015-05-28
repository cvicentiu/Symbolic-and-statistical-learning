// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
function OpenWindow (url) {
    window.open(url,'','width=480,height=480,scrollbars=yes,status=yes');
}

function expandCollapse(elem,imagePlus,imageMinus,startExpanded)
{
	if (document.getElementById)
	{
		e = document.getElementById(elem);
		i = document.getElementById(elem + "Image");
		if ((e.style.display == null | e.style.display == "") && startExpanded == false)
		{
				e.style.display = "block";
				i.src = imageMinus;
		}
		if ((e.style.display == null | e.style.display == "") && startExpanded == true)
		{
				e.style.display = "none";
				i.src = imagePlus;
		}
		else if (e.style.display == "block")
		{
				e.style.display = "none";
				i.src = imagePlus;
		}
		else
		{
				e.style.display = "block";
				i.src = imageMinus;
		}
	}
}

function show_address() {
   document.getElementById("add1").style.display = '';
   document.getElementById("add2").style.display = '';
   document.getElementById("add3").style.display = '';
   document.getElementById("address").style.display='none';
}
function hide_address() {
   document.getElementById("address").style.display='';
   document.getElementById("add1").style.display = 'none';
   document.getElementById("add2").style.display = 'none';
   document.getElementById("add3").style.display = 'none';
}
function show_upload_picture() {
   document.getElementById("upload_pic_form").style.display = '';
   document.getElementById("upload_pic_label").style.display='none';
}
function hide_upload_picture() {
   document.getElementById("upload_pic_label").style.display='';
   document.getElementById("upload_pic_form").style.display = 'none';
}
function show_password() {
   document.getElementById("change_password").style.display = '';
   document.getElementById("change_password_label").style.display='none';
}
function hide_password() {
   document.getElementById("change_password_label").style.display='';
   document.getElementById("change_password").style.display = 'none';
}
function show_forgot_password() {
   document.getElementById("forgot_password").style.display = '';
}
function show_comment() {
   document.getElementById("comment").style.display = '';
   document.getElementById("show_comment").style.display='none';
}
function show_god() {
   document.getElementById("innergod").style.display = '';
}
function show_div(id) {
   document.getElementById(id).style.display = '';
}
function hide_div(id) {
   document.getElementById(id).style.display = 'none';
}

function confirmSubmit()
{
    var agree=confirm("Are you sure?");
    if (agree)
	   return true ;
    else
	   return false ;
}
function autoTab(input,len, e) {
				
	var keyCode = (isNaN) ? e.which : e.keyCode; 
	var filter = (isNaN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
				
	if(input.value.length >= len && !containsElement(filter,keyCode)) {
		input.value = input.value.slice(0, len);
		input.form[(getIndex(input)+1) % input.form.length].focus();
	}
			
	return true;
}
function containsElement(arr, ele) {
	var found = false, index = 0;
	while(!found && index < arr.length) {
		if(arr[index] == ele) {
			found = true;
		} else {
			index++;
		}
	}

	return found;
}
				
function getIndex(input) {

	var index = -1, i = 0, found = false;
	while (i < input.form.length && index == -1) {
		if (input.form[i] == input)index = i;
		else i++;
	}
	
	return index;
}	
//from 	http://javascript.internet.com/forms/limit-textarea.html
function textCounter(field, countfield, maxlimit) {
    if (field.value.length > maxlimit) // if too long...trim it!
    field.value = field.value.substring(0, maxlimit);
    // otherwise, update 'characters left' counter
    else 
    countfield.value = maxlimit - field.value.length;

}

// http://tinymce.moxiecode.com/tinymce/docs/plugin_paste.html
function convertWord(type, content) {
	switch (type) {
		// Gets executed before the built in logic performes it's cleanups
		case "before":
			content = content.toLowerCase(); // Some dummy logic
			break;

		// Gets executed after the built in logic performes it's cleanups
		case "after":
			content = content.toLowerCase(); // Some dummy logic
			break;
	}

	return content;
}
var image_win
function fileBrowserCallBack(field_name, url, type, win) {
	image_win = win
    window.open('/action/nav/image_upload',
                    'ImageUploadWindow',
                    'width=480,height=480,scrollbars=yes,status=yes');
}

function ImageUploadCallback(img) 
{ 
    image_win.document.forms[0].elements['src'].value = img;
    image_win.showPreviewImage(img);
}


function mainBlogCategoryChanged( blogGroupID, theBox ) {

    isChecked = theBox.checked;

    //Find all the sub groups and hide/show them
    theDivs = getElemsByName( "child_of_" + blogGroupID )
    
    for( i=0; i<theDivs.length; i++ ) {
    
        if ( isChecked ) {
        
            theDivs[i].className = "visible"
        
        } else {
        
            theDivs[i].className = "hidden"
            uncheckChildRadio( theDivs[i]);
            
        }    
    }
}	


function uncheckChildRadio( theDiv, theBox ) {

    for( j=0; j<theDiv.childNodes.length; j++ ) {
    
        if ( theDiv.childNodes[j].checked && theDiv.childNodes[j]!=theBox) {
        
            theDiv.childNodes[j].checked = false;
        
        }    
    }
}



function blogSubCatagoryChecked(blogGroupID, theBox) {
    //Find all the sub groups and hide/show them
    theDivs = getElemsByName( "child_of_" + blogGroupID )

    for( i=0; i<theDivs.length; i++ ) {
    
        uncheckChildRadio( theDivs[i], theBox);
    
    }
}


function getElemsByName( theName) {

    if ( document.getElementsByName(theName).length>0) {
        
        return document.getElementsByName(theName);
    
    }

    var elems = new Array();
    var children = document.getElementsByTagName( "*");
    
    for( var a=0; a<children.length; a++ ) {
    
        if ( children[a].name==theName) elems.push( children[a]);
    
    }
    return elems;
}

/**
 * Manage changing the filter for what profile types we display, we are tracking this in a cookie since it 
 * should change the view throughout the site.  I also don't want search engines to see different views of the site
 * so I never want to pass the filtering parameters on the query string.
 */


function profileFilter( profileType ) {

    deleteCookie( "agentTypeID");
    setCookie( "agentTypeID", profileType);
    window.location.reload();

}

function tipAgent( agentID, blogEntryID, blogCommentID) {

    theURL = "/action/agents_secure/tip_agent?agent_id=" + agentID + "&blog_entry_id=" + blogEntryID;
    
    if ( blogCommentID ) {
    
        theURL += "&blog_comment_id=" + blogCommentID;
    
    }

    //Pop up the tipping window
    newWindow(  theURL, "Tip Agent:", 400, 300);

}

function newWindow(a_str_windowURL, a_str_windowName, a_int_windowWidth, a_int_windowHeight, a_bool_scrollbars, a_bool_resizable, a_bool_menubar, a_bool_toolbar, a_bool_addressbar, a_bool_statusbar, a_bool_fullscreen) {
  var int_windowLeft = (screen.width - a_int_windowWidth) / 2;
  var int_windowTop = (screen.height - a_int_windowHeight) / 2;
  var str_windowProperties = 'height=' + a_int_windowHeight + ',width=' + a_int_windowWidth + ',top=' + int_windowTop + ',left=' + int_windowLeft + ',scrollbars=' + a_bool_scrollbars + ',resizable=' + a_bool_resizable + ',menubar=' + a_bool_menubar + ',toolbar=' + a_bool_toolbar + ',location=' + a_bool_addressbar + ',statusbar=' + a_bool_statusbar + ',fullscreen=' + a_bool_fullscreen + '';
  var obj_window = window.open(a_str_windowURL, a_str_windowName, str_windowProperties)
    if (parseInt(navigator.appVersion) >= 4) {
      obj_window.window.focus();
    }
}


function blogOnSubmit() {

	content = tinyMCE.getContent();
    content = content.replace(/<\/?span[^>]*>/gi, "");
    content = content.replace(new RegExp('<(\\w[^>]*) style="([^"]*)"([^>]*)', 'gi'), "<$1$3");
	content = content.replace(/<\/?font[^>]*>/gi, "");
    tinyMCE.setContent( content );
    
    return confirm('Please confirm that this entry does not contain copyrighted material, that you do not have permission to reprint. Posting copyrighted material without permission may result in being banned from the system. Post entry?');

}





/**
 * Sets a Cookie with the given name and value.
 *
 * name       Name of the cookie
 * value      Value of the cookie
 * [expires]  Expiration date of the cookie (default: end of current session)
 * [path]     Path where the cookie is valid (default: path of calling document)
 * [domain]   Domain where the cookie is valid
 *              (default: domain of calling document)
 * [secure]   Boolean value indicating if the cookie transmission requires a
 *              secure transmission
 */
function setCookie(name, value, expires, path, domain, secure)
{
    document.cookie= name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

/**
 * Gets the value of the specified cookie.
 *
 * name  Name of the desired cookie.
 *
 * Returns a string containing value of specified cookie,
 *   or null if cookie does not exist.
 */
function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

/**
 * Deletes the specified cookie.
 *
 * name      name of the cookie
 * [path]    path of the cookie (must be same as path used to create cookie)
 * [domain]  domain of the cookie (must be same as domain used to create cookie)
 */
function deleteCookie(name, path, domain)
{
    if (getCookie(name))
    {
        document.cookie = name + "=" + 
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}


// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

function showBlogSection( the_section ) {

    //Hide all the others
    document.getElementById( "about" ).className = "hidden";
    document.getElementById( "news" ).className = "hidden";
    document.getElementById( "market-reports" ).className = "hidden";
    document.getElementById( "listings" ).className = "hidden";
    document.getElementById( "agents" ).className = "hidden";
    document.getElementById( "mortgage" ).className = "hidden";

    document.getElementById( the_section ).className = "visible";

}
