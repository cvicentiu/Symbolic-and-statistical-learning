/***************************************************************************
 *                            Dolphin Web Community Software
 *                              -------------------
 *     begin                : Mon Mar 23 2006
 *     copyright            : (C) 2006 BoonEx Group
 *     website              : http://www.boonex.com
 *
 *     
 *
 ****************************************************************************/

/***************************************************************************
 *
 *   This is a free software; you can modify it under the terms of BoonEx 
 *   Product License Agreement published on BoonEx site at http://www.boonex.com/downloads/license.pdf
 *   You may not however distribute it for free or/and a fee. 
 *   This notice may not be removed from the source code. You may not also remove any other visible 
 *   reference and links to BoonEx Group as provided in source code.
 *
 ***************************************************************************/

/**
 * Checks/unchecks all tables
 *
 * @param   string   the form name
 * @param   boolean  whether to check or to uncheck the element
 *
 * @return  boolean  always true
 */
function setCheckboxes(the_form, do_check)
{

	var elts  = document.forms[the_form].getElementsByTagName('input');
    var elts_cnt  = elts.length;
    var i = 0;
	
    for ( i; i < elts_cnt; i++)
    {
        elts[i].checked = do_check;
		if (the_form + "_submit" == elts[i].name)
		{
			elts[i].disabled = !do_check;
		}
    } // end for
	return true;
} // end of the 'setCheckboxes()' function

function setCheckbox(the_form)
{
    var elts      = document.forms[the_form].getElementsByTagName('input');
    var elts_cnt  = elts.length;
    
    var allUnchecked = true;
	
    for (var i = 0; i < elts_cnt; i++)
    {
        if(elts[i].checked) allUnchecked = false;
    }
    
    for (var i = 0; i < elts_cnt; i++)
    {
        if(elts[i].name == (the_form + "_submit")) elts[i].disabled = allUnchecked;
    }

    return true;
}


var win = "width=500,height=600,left=100,top=100,copyhistory=no,directories=no,menubar=no,location=no,resizable=no,scrollbars=yes";
function get_gallery(id_prof)
{
   window.open("photos_gallery.php?ID="+id_prof,'gallery',win);
}

function launchTellFriend ()
{   
    var win = "width=300,height=300,left=200,top=100,copyhistory=no,directories=no,menubar=no,location=no,resizable=no,scrollbars=no";
    window.open("tellfriend.php",'tellfriend',win);
    return false;
}

function launchTellFriendProfile ( sID )
{
    var win = "width=300,height=300,left=200,top=100,copyhistory=no,directories=no,menubar=no,location=no,resizable=no,scrollbars=no";
    window.open("tellfriend.php?ID="+sID,'tellfriendprofile',win);
    return false;
}

function ShowShowHide ( show_name, show_name2, hide_name )
{
    if (hide_name) hide_name.style.display = 'none';
    if (show_name) show_name.style.display = 'inline';
    if (show_name2) show_name2.style.display = 'inline';
}

function ShowHideHide ( show_name, hide_name, hide_name2 )
{
    if (hide_name) hide_name.style.display = 'none';
    if (hide_name2) hide_name2.style.display = 'none';
    if (show_name) show_name.style.display = 'inline';
}

function charCounter(field,maxLength,countTarget)
{

	field = document.getElementById(field);
	countTarget = document.getElementById(countTarget);
	var inputLength=field.value.length;

	if(inputLength >= maxLength)
	{
		field.value=field.value.substring(0,maxLength);

	}
	countTarget.innerHTML=maxLength-field.value.length;
	
	
}



/**
 * change images onHover mouse action
 */
function show(FileName,jpg1Name)
{
	document.images[FileName].src = jpg1Name;
}

/**
 * set status of the browser window to 's'
 */
function ss(s) 
{
	window.status = s;
	return true;
}

/**
 * set status of the browser window to empty
 */
function ce()
{
	window.status='';
}


/**
 * insert emotion item
 */
function emoticon( txtarea, text ) {

	text = ' ' + text + ' ';
	if (txtarea.createTextRange && txtarea.caretPos) {
		var caretPos = txtarea.caretPos;
		caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? text + ' ' : text;
		txtarea.focus();
	} else {
		txtarea.value  += text;
		txtarea.focus();
	}
}

function launchAddToIM (id)
{
    var win = "width=600,height=160,left=100,top=100,copyhistory=no,directories=no,menubar=no,location=no,resizable=no,scrollbars=yes";
    window.open("explanation.php?explain=imadd&ID="+id,'add_to_im',win);
    return false;
}

function docOpen(text)
{
	newWindow=window.open('','','toolbar=no,resizable=yes,scrollbars=yes,width=400,height=300');
	newWindow.document.open("text/html");
	newWindow.document.write(unescape(text));
	newWindow.document.close();
}

function get_data( container, url, siteUrl )
    {

        if ( container )
        {
	    var container = document.getElementById( container );
	    container.innerHTML = "loading ... ";
        }

        var XMLHttpRequestObject = false;

        if ( window.XMLHttpRequest )
        {
                XMLHttpRequestObject = new XMLHttpRequest();
        }
        else if ( window.ActiveXObject )
        {
                XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
        }

        
	if( XMLHttpRequestObject )
        {
    	    var data_source = siteUrl + 'menu_xml.php' + url;
    	    XMLHttpRequestObject.open( "GET", data_source );
    	    XMLHttpRequestObject.onreadystatechange = function()
    	    {
        	if ( XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200 )
        	{

        	var xmlDocument = XMLHttpRequestObject.responseXML;
            delete XMLHttpRequestObject;
            XMLHttpRequestObject = null;
		    
		   	names = xmlDocument.getElementsByTagName("name");
		    links = xmlDocument.getElementsByTagName("link");
		    
		    list_sublinks(names, links);

        	}
    	    }
    
            XMLHttpRequestObject.send( null );

	}
	
	//container.innerHTML = '';
	
	
	
	
	function list_sublinks(names, links)
	{	    
    	var loopIndex, name, link, maxIndex = names.length;
    
	    container.innerHTML = '';
	    for ( loopIndex = 0; loopIndex < maxIndex; loopIndex++ )
   	    {
	    
		    //if ( values[loopIndex].firstChild.nodeName=="name")
			name = names[loopIndex].firstChild.nodeValue;
		    
		    //if ( values[loopIndex].childNodes[1].nodeName=="link")
			link = links[loopIndex].firstChild.nodeValue;
					    
		    container.innerHTML += '<div class="innerSubmenuDiv"><a href="' + link + '">' + name + '</a></div>';
	    }
	
	}
}


function createNamedElement( type, name )
{
	
    var element;
		
    try
    {
        element = document.createElement('<'+type+' name="'+name+'">');
    } catch (e) { }

    if (!element || !element.name) // Cool, this is not IE !!
    {
        element = document.createElement(type)
        element.name = name;
    }
								
    return element;
}
									
function display_node(node, siteUrl)
{

    var nn = document.getElementById( node );
    
	var sub_name = node.split('_')[1];
    if ( 'none' == nn.style.display )
    {
	nn.style.display='block';
	if ( '' == nn.innerHTML )    
	    get_data( node, '?action=menu&ID=' + sub_name, siteUrl);
    }
    else
    {
		nn.style.display='none';
    }
    
}
//######################################################################
/*
	var NicknameInput_ID = 'Login_NickName';
	var NicknameInput_isEmpty = true;
	var NicknameInput_emptyBackground;
	var NicknameInput_nonEmptyBackground;
*/
	/*
	var NicknameInput_emptyColor = 'rgb(170, 170, 170)';
	var NicknameInput_nonEmptyColor = 'rgb(0, 0, 0)';
	var NicknameInput_emptyText = 'Nickname';
	*/
/*
	var PasswordInput_ID = 'Login_Password';
	var PasswordInput_isEmpty = true;
	var PasswordInput_emptyBackground;
	var PasswordInput_nonEmptyBackground;
*/
	/*
	var PasswordInput_emptyColor = 'rgb(170, 170, 170)';
	var PasswordInput_nonEmptyColor = 'rgb(0, 0, 0)';
	var PasswordInput_emptyText = 'Password';
	var PasswordInput_emptyType = 'text';
	var PasswordInput_nonEmptyType = 'password';
	*/
/*
	function NicknameInput_init(sEmptyBackground, sNonEmptyBackground)
	{
	    var elt = document.getElementById(NicknameInput_ID);
	    
	    NicknameInput_emptyBackground = 'url('+sEmptyBackground+')';
	    NicknameInput_nonEmptyBackground = 'url('+sNonEmptyBackground+')';
	
	    elt.style.backgroundImage = NicknameInput_emptyBackground;
	}
	
	function PasswordInput_init(sEmptyBackground, sNonEmptyBackground)
	{
	    var elt = document.getElementById(PasswordInput_ID);
	    
	    PasswordInput_emptyBackground = 'url('+sEmptyBackground+')';
	    PasswordInput_nonEmptyBackground = 'url('+sNonEmptyBackground+')';

	    elt.style.backgroundImage = PasswordInput_emptyBackground;
	}
	
	function NicknameInput_onfocus()
	{
	    var elt = document.getElementById(NicknameInput_ID);
	
	    if (NicknameInput_isEmpty)
	    {
	        elt.style.backgroundImage = NicknameInput_nonEmptyBackground;
	    }
	
	    return true;
	}
	
	function PasswordInput_onfocus()
	{
	    var elt = document.getElementById(PasswordInput_ID);
	
	    if (PasswordInput_isEmpty)
	    {
	        elt.style.backgroundImage = PasswordInput_nonEmptyBackground;
	    }
	
	    return true;
	}
	
	function NicknameInput_onblur()
	{
	    var elt = document.getElementById(NicknameInput_ID);
	
	    if (elt.value == '')
	    {
	        elt.style.backgroundImage = NicknameInput_emptyBackground;
	        NicknameInput_isEmpty = true;
	    } else {
	        NicknameInput_isEmpty = false;
	    }
	
	    return true;
	}
	
	function PasswordInput_onblur()
	{
	    var elt = document.getElementById(PasswordInput_ID);
	
	    if (elt.value == '')
	    {
	        elt.style.backgroundImage = PasswordInput_emptyBackground;
	        PasswordInput_isEmpty = true;
	    } else {
	        PasswordInput_isEmpty = false;
	    }
	
	    return true;
	}
*/