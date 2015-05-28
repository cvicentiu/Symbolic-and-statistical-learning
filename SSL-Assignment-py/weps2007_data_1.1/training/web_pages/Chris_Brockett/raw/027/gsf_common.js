function processCommand(oFormObject) {
    
    
	oOption = oFormObject.options[oFormObject.selectedIndex];
	
    if (!oOption)
		return;
	
	
	sCmd = oOption.label;
	sData = oOption.value;
	
	if (!sData) return;
	
	// are we running in a popup?
	bInPop = window.opener;
	
	switch(sCmd) {
		
		
		default:
			document.getElementById('user_cmd').value = sCmd;
			document.getElementById('user_cmd_data').value = sData;
			
			if (sCmd == "Delete Message"){
				if(!confirm("Are you sure you want to delete this message?"))
				{
					oFormObject.selectedIndex = 0;
					return;
				}
			}
			if (sCmd == "Delete This Topic"){
				if(!confirm("Are you sure you want to delete this ENTIRE topic?"))
				{
					oFormObject.selectedIndex = 0;
					return;
				}
				
			}
			
			if (sCmd == "Move This Topic"){
				openChooser("/pages/forums/board_chooser.php");
				storedData = sData;
				return;
			}
			

			if (sCmd == "Ban This User"){
				if(!confirm("Are you sure you want to ban this user?"))
				{
					oFormObject.selectedIndex = 0;
					return;
				}
				iNumDays = prompt("How many days (-1 is indefinite)?", "7");
				if (iNumDays != null)
					document.getElementById('user_cmd_extra_data').value = iNumDays;
				else
				{
					oFormObject.selectedIndex = 0;
					return;
				}
			}
			
			if (sCmd == "Suspend This User"){
				iNumDays = prompt("How many days (-1 is indefinite, Moderators may only select 1-7 days)?", "7");
				if (iNumDays != null)
					document.getElementById('user_cmd_extra_data').value = iNumDays;
				else
				{
					oFormObject.selectedIndex = 0;
					return;
				}

			}
			
			if (sCmd == "View Edit History"){
				if (window.opener)
					document.forms['command'].target = "_blank";
			}
			
			if (sCmd == "Moderate"){
			
			     if(!confirm("This will automatically mark the message as abusive and take you to the moderation page. Are you sure?"))
			     {
				    oFormObject.selectedIndex = 0;
				    return;
			     }
			}
				
			
			document.forms['command'].submit();
			break;
	}
}

function openChooser(sURL) {
	
	iChooserWin=window.open(sURL, "gamespot_chooser", "width=200,height=250,scrollbars=no,resizable=no,titlebar=no");
	iChooserWin.focus();
	return iChooserWin;
}

function boardPicked(sTitle, iId) {
    
	// user has picked a dest board for moving a topic
	if (confirm("You have chosen to move the this topic and all of it's messages from this board to the '" + sTitle + "' board. Are you sure?")) {
        document.getElementById('user_cmd_extra_data').value = iId;	
	    document.forms['command'].submit();
	}
	else
		document.forms['command'].topic_options.selectedIndex = 0;
}

function forum_toggle_spoiler(id) {

    if ( document.getElementById('spoiler'+id).style.display == "block" ) {
        document.getElementById('spoiler'+id).style.display = "none";
    }
    else {
        document.getElementById('spoiler'+id).style.display = "block";
    }
}

function forum_show_all_spoilers() {
    var id = 0;
    // max 50 msgs per page
    while (id <= 50) { 
        id++;
        try {
            var my_display = document.getElementById('spoiler'+id).style.display;
            forum_toggle_spoiler(id);
        }
        catch(err) {
            // don't auto return.  with moderation sometimes the actual spoiler id doesn't match up right due to original and current
            // msg checks
//            return;
        }
    }
}
