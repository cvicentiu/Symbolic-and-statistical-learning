/*
GENERIC FUNCTIONS
*/

	// page initialization
	var oForm = null;
	function initForm(strFormName) {
		oForm = document.forms[strFormName];
	}
	
	// swaps the value of the indicated form field
	function swapFormValue(oForm, strFieldName, newValue) {
		if (oForm && oForm.elements[strFieldName]) {
			oForm.elements[strFieldName].value = newValue;
		}
	}

	// swaps process, swaps keyID, submits
	function doProcess(strProcessName, strKeyName, id) {
		if (oForm && oForm.elements) {
			swapFormValue(oForm, strKeyName, id);
			swapFormValue(oForm, 'process', strProcessName);
			oForm.submit();
		}
	}

	// confirms usage of doProcess
	function confirmProcess(strProcessName, strKeyName, id, strMessage) {
		if (confirm(strMessage)) {
			doProcess(strProcessName, strKeyName, id);
		}
	}
	
	// limits own value to provided integer string length
	function limitValueLength(oFormElement, strMessage, intLength) {
		if (oFormElement && oFormElement.value) {
			valLength = oFormElement.value.length;
			if ( valLength > intLength ) {
				alert(strMessage);
				oFormElement.value = oFormElement.value.slice(0, intLength - 1);
			}
		}
	}
	

/*
EDIT LIBRARY
form: /manage/editLibrary.php
logic: /lib/Form.EditLibrary.class.php
template: /templates/manage/editLibrary.tpl
*/

	function deleteAttribute(intA, strMessage) {
		if (confirm(strMessage) && oForm) {
			swapFormValue(oForm, 'a', intA);
			swapFormValue(oForm, 'process', 'deleteAttribute');
			oForm.submit();
		}
	}

	function deleteValue(intA, intV, strMessage) {
		if (confirm(strMessage) && oForm) {
			swapFormValue(oForm, 'a', intA);
			swapFormValue(oForm, 'v', intV);
			swapFormValue(oForm, 'process', 'deleteValue');
			oForm.submit();
		}
	}
	
	function moveAttribute(intA, intDistance) {
		if (oForm) {
			swapFormValue(oForm, 'a', intA);
			swapFormValue(oForm, 'distance', intDistance);
			swapFormValue(oForm, 'process', 'moveAttribute');
			oForm.submit();
		}
	}

	function moveValue(intA, intV, intDistance) {
		if (oForm) {
			swapFormValue(oForm, 'a', intA);
			swapFormValue(oForm, 'v', intV);
			swapFormValue(oForm, 'distance', intDistance);
			swapFormValue(oForm, 'process', 'moveValue');
			oForm.submit();
		}
	}
	
	
/*
EDIT PERSON
form: /manage/editPerson.php
logic: /lib/Form.EditPerson.class.php
template: /templates/manage/editPerson.tpl
*/
function deletePerson() {
		if (confirm("Are you sure you want to delete this person?") && oForm) {
			swapFormValue(oForm, 'process', 'deletePerson');
			oForm.submit();
		}
	}


	function installLibrary(intLibID) {
		if (oForm) {
			swapFormValue(oForm, 'libraryID', intLibID);
			swapFormValue(oForm, 'process', 'installLibrary');
			oForm.submit();
		}
	}

	
/*
GENERIC DELETE CONTENT
*/
	
	function deleteContent(destination) {
		if (oForm) {
			swapFormValue(oForm, 'destination', destination);
			swapFormValue(oForm, 'process', 'deleteContent');
			oForm.submit();
		}
	}
	
	
/*
LIBRARIES
form: /manage/libraries.php
logic: /manage/libraries.php
template: /templates/manage/libraries.tpl
*/
	
	// removes a content type
	function deleteContentType(intContentTypeID, strMessage) {
		if (confirm(strMessage) && oForm) {
			swapFormValue(oForm, "contentTypeID", intContentTypeID);
			swapFormValue(oForm, "process", "deleteContentType");
			oForm.submit();
		}
	}
	
/*
USERS
form: /manage/users.php
logic: /manage/users.php
template: /templates/manage/users.tpl
*/

	function deleteGroup(intGroupID) {
		if (confirm("Are you sure you want to delete this group?") && oForm) {
			swapFormValue(oForm, "groupID", intGroupID);
			swapFormValue(oForm, "process", "deleteGroup");
			oForm.submit();
		}
	}

	function activateGroup(intGroupID) {
		if (oForm) {
			swapFormValue(oForm, "groupID", intGroupID);
			swapFormValue(oForm, "process", "activateGroup");
			oForm.submit();
		}
	}

	function toggleGroup(intGroupID) {
		if (oForm) {
			swapFormValue(oForm, "groupID", intGroupID);
			swapFormValue(oForm, "process", "toggleGroup");
			oForm.submit();
		}
	}

	function toggleShowUser(intGroupID) {
		if (oForm) {
			swapFormValue(oForm, "groupID", intGroupID);
			swapFormValue(oForm, "process", "toggleShowUser");
			oForm.submit();
		}
	}
	
	function deleteUser(intUserID) {
		if (confirm("Are you sure you want to permanently delete this user?") && oForm) {
			swapFormValue(oForm, "userID", intUserID);
			swapFormValue(oForm, "process", "deleteUser");
			oForm.submit();
		}
	}

	function deletePermission(intPermissionID) {
		if (confirm("Are you sure you want to permanently delete this permission?") && oForm) {
			swapFormValue(oForm, "permissionID", intPermissionID);
			swapFormValue(oForm, "process", "deletePermission");
			oForm.submit();
		}
	}

	
/*
SITE MAP
form: /manage/nodes.php
logic: /manage/nodes.php
template: /templates/manage/nodes.tpl
*/

	function moveNode(intNodeID, intDistance) {
		if (oForm) {
			swapFormValue(oForm, "nodeID", intNodeID);
			swapFormValue(oForm, "distance", intDistance);
			swapFormValue(oForm, "process", "moveNode");
			oForm.submit();
		}
	}

	function deleteNode(intNodeID) {
		if (confirm("Are you sure you want to delete this node?") && oForm) {
			swapFormValue(oForm, "nodeID", intNodeID);
			swapFormValue(oForm, "process", "deleteNode");
			oForm.submit();
		}
	}

	function activateNode(intNodeID) {
		if (oForm) {
			swapFormValue(oForm, "nodeID", intNodeID);
			swapFormValue(oForm, "process", "activateNode");
			oForm.submit();
		}
	}

	function toggleNode(intNodeID) {
		if (oForm) {
			swapFormValue(oForm, "nodeID", intNodeID);
			swapFormValue(oForm, "process", "toggleNode");
			oForm.submit();
		}
	}

	function toggleShowVersion(intNodeID) {
		if (oForm) {
			swapFormValue(oForm, "nodeID", intNodeID);
			swapFormValue(oForm, "process", "toggleShowVersion");
			oForm.submit();
		}
	}
	
	function deleteVersion(intVersionID) {
		if (confirm("Are you sure you want to permanently delete this version?") && oForm) {
			swapFormValue(oForm, "versionID", intVersionID);
			swapFormValue(oForm, "process", "deleteVersion");
			oForm.submit();
		}
	}
	
	// pops open a window for previewing content
	var oPreviewPopup = null;
	function preview(strURL, intContentID, intVersionID) {
		if( strURL.indexOf( "?" ) == -1 ) 
			strURL = strURL + "?";
		if (intContentID != null) strURL = strURL + "id=" + intContentID;
		if (intVersionID != null) strURL = strURL + "&storyVersionID=" + intVersionID;
		var strTargetName = "previewRemote";
		var strOptions = "left=100,screenX=100,top=100,screenY=100,channelmode=0,directories=0,height=480,innerHeight=480,width=640,innerWidth=640,hotkeys=0,location=0,menubar=1,titlebar=1,toolbar=1,resizable=1,status=1,scrollbars";
		doPopup(oImagePopup, strURL, strTargetName, strOptions);
	}
	
	
/*
EDIT NODE
form: /manage/editNode.php
logic: lib/Form.EditNode.class.php
template: manage/editNode.tpl
*/

	function forceNewContent() {
		if (oForm) {
			var oRadios = oForm.elements['content_contentID'];
			if (oRadios && oRadios.length) {
				for(i=0; i < oRadios.length; i++) {
					if ( oRadios[i].value == 0 ) {
						oRadios[i].checked = true;
					}
				}
			}
		}
	}
	
	
	
/*
CATEGORIES
form: /manage/categories.php
logic: /manage/categories.php
template: /templates/manage/categories.tpl
*/

	function moveCategory(intCategoryID, intDistance) {
		if (oForm) {
			swapFormValue(oForm, "categoryID", intCategoryID);
			swapFormValue(oForm, "distance", intDistance);
			swapFormValue(oForm, "process", "moveCategory");
			oForm.submit();
		}
	}
	
	function toggleCategory(intCategoryID) {
		if (oForm) {
			swapFormValue(oForm, "categoryID", intCategoryID);
			swapFormValue(oForm, "process", "toggleCategory");
			oForm.submit();
		}
	}
	
	function deleteCategory(intCategoryID) {
		if (confirm("Are you sure you want to remove this category?\nThis will not delete any items that have been assigned to the category.") && oForm) {
			swapFormValue(oForm, "categoryID", intCategoryID);
			swapFormValue(oForm, "process", "deleteCategory");
			oForm.submit();
		}
	}
	
	
/*
FILES
form: /manage/files.php
logic: /manage/files.php
template: /templates/manage/files.tpl
*/
	
	function deleteFile(strPath) {
		if (confirm("Are you sure you want to delete this file?") && oForm) {
			swapFormValue(oForm, "path", strPath);
			swapFormValue(oForm, "process", "deleteFile");
			oForm.submit();
		}
	}
	
	function deleteDirectory(strPath) {
		if (confirm("Are you sure you want to delete this directory?") && oForm) {
			swapFormValue(oForm, "path", strPath);
			swapFormValue(oForm, "process", "deleteFile");
			oForm.submit();
		}
	}
	
	function toggleDirectory(strPath) {
		if (oForm) {
			swapFormValue(oForm, "path", strPath);
			swapFormValue(oForm, "process", "toggleDirectory");
			oForm.submit();
		}
	}
	
	function uploadFile(strPath) {
		if (oForm) {
			swapFormValue(oForm, "path", strPath);
			oForm.action = oForm.elements['uploadLink'].value;
			oForm.submit();
		}
	}
	
	function newDirectory(strPath) {
		if (oForm) {
			swapFormValue(oForm, "path", strPath);
			oForm.action = oForm.elements['newDirectoryLink'].value;
			oForm.submit();
		}
	}
	
	// pops open a window from the file browser for viewing
	var oImagePopup = null;
	function imagePopup(strURL) {
		var strTargetName = "imageRemote";
		var strOptions = "left=200,screenX=300,top=200,screenY=100,channelmode=0,directories=0,height=480,innerHeight=480,width=640,innerWidth=640,hotkeys=0,location=0,menubar=0,titlebar=0,toolbar=0,resizable=1,status=1,scrollbars";
		doPopup(oImagePopup, strURL, strTargetName, strOptions);
	}
	
	
/*
GENERATE LINK
This is used with the DevEdit wysiwyg to auto generate a string that
can be processed by the Smarty engine to run custom functions. For
a complete list of functions or to add new ones, see the 
Smarty.Broncos.class.php file.
*/
	
	// pops open a window to the link generator
	var oLinkGenerator = null;
	function linkGeneratorPopup(strURL) {
		var strTargetName = "imageRemote";
		var strOptions = "left=200,screenX=300,top=200,screenY=100,channelmode=0,directories=0,height=480,innerHeight=480,width=640,innerWidth=640,hotkeys=0,location=0,menubar=0,titlebar=0,toolbar=0,resizable=1,status=1,scrollbars";
		doPopup(oLinkGenerator, strURL, strTargetName, strOptions);
	}
	
	// writes the smarty code to be inserted into the wysiwyg
	function generateLink( strTagName, strDefaultText, intID ) {
		var result = "{" + strTagName + " text='" + strDefaultText + "' id=" + intID + "}";
		if (oForm) {
			swapFormValue(oForm, 'linkText', result);
		}
	}
	
	
/*
EDIT GAME
Add a new link to a game page.
*/

	function addGameLink() {
		if (oForm) {
			// swapFormValue(oForm, 'submit_button', 'donotsubmit');
			swapFormValue(oForm, 'process', 'addGameLink');
			oForm.submit();
		}
	}
	
	function deleteGameLink(intIndex) {
		if (oForm) {
			swapFormValue(oForm, 'linkIndex', intIndex);
			swapFormValue(oForm, 'process', 'deleteGameLink');
			oForm.submit();
		}
	}
	
	function moveGameLink(intIndex, intDistance) {
		if (oForm) {
			swapFormValue(oForm, 'linkIndex', intIndex);
			swapFormValue(oForm, 'distance', intDistance);
			swapFormValue(oForm, 'process', 'moveGameLink');
			oForm.submit();
		}
	}

function deleteGame(intID) {
		if (confirm("Are you sure you want to delete this game?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteGame');
			oForm.submit();
		}
	}

	
/*
EDIT GAME PHOTO
Add a new link to a game page.
*/

	function addGamePhoto() {
		if (oForm) {
			// swapFormValue(oForm, 'submit_button', 'donotsubmit');
			swapFormValue(oForm, 'process', 'addGamePhoto');
			oForm.submit();
		}
	}
	
	function moveGamePhoto(intIndex, intDistance) {
		if (oForm) {
			swapFormValue(oForm, 'photoIndex', intIndex);
			swapFormValue(oForm, 'distance', intDistance);
			swapFormValue(oForm, 'process', 'moveGamePhoto');
			oForm.submit();
		}
	}

function deleteGamePhoto(intIndex) {
		if (confirm("Are you sure you want to delete this game?") && oForm) {
			swapFormValue(oForm, 'photoIndex', intIndex);
			swapFormValue(oForm, 'process', 'deleteGamePhoto');
			oForm.submit();
		}
	}

function deleteGamePhotoDetail(intIndex) {
		if (confirm("Are you sure you want to delete this photo?") && oForm) {
			swapFormValue(oForm, 'photoIndex', intIndex);
			swapFormValue(oForm, 'process', 'deleteGamePhotoDetail');
			oForm.submit();
		}
	}
	
function deleteSchool() {
		if (confirm("Are you sure you want to delete this school?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteSchool');
			oForm.submit();
		}
	}
	
	
/*
EDIT GALLERY
*/

	function addGalleryImage() {
		if (oForm) {
			swapFormValue(oForm, 'process', 'addGalleryImage');
			oForm.submit();
		}
	}
	
	function deleteGalleryImage(imageIndex, strMessage) {
		if (confirm(strMessage) && oForm) {
			swapFormValue(oForm, 'imageIndex', imageIndex);
			swapFormValue(oForm, 'process', 'deleteGalleryImage');
			oForm.submit();
		}
	}

	function moveGalleryImage(imageIndex, intDistance) {
		if (oForm) {
			swapFormValue(oForm, 'imageIndex', imageIndex);
			swapFormValue(oForm, 'distance', intDistance);
			swapFormValue(oForm, 'process', 'moveGalleryImage');
			oForm.submit();
		}
	}
	
function deleteGallery() {
		if (confirm("Are you sure you want to delete this gallery?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteGallery');
			oForm.submit();
		}
	}
	
/*
EDIT PHOTO
*/

function deletePhoto() {
		if (confirm("Are you sure you want to delete this photo?") && oForm) {
			swapFormValue(oForm, 'process', 'deletePhoto');
			oForm.submit();
		}
	}

/*
EDIT VIDEO
*/

function deleteVideo() {
		if (confirm("Are you sure you want to delete this video?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteVideo');
			oForm.submit();
		}
	}



/*
EDIT POLL
*/

function deleteStory() {
		if (confirm("Are you sure you want to delete this story?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteStory');
			oForm.submit();
		}
	}


/*
EDIT POLL
*/

	function addPollAnswer() {
		if (oForm) {
			swapFormValue(oForm, 'process', 'addPollAnswer');
			oForm.submit();
		}
	}
	
	function deletePollAnswer(answerIndex, strMessage) {
		if (confirm(strMessage) && oForm) {
			swapFormValue(oForm, 'answerIndex', answerIndex);
			swapFormValue(oForm, 'process', 'deletePollAnswer');
			oForm.submit();
		}
	}
	
	function togglePollAnswer(answerIndex) {
		if (oForm) {
			swapFormValue(oForm, 'answerIndex', answerIndex);
			swapFormValue(oForm, 'process', 'togglePollAnswer');
			oForm.submit();
		}
	}

	function movePollAnswer(answerIndex, intDistance) {
		if (oForm) {
			swapFormValue(oForm, 'answerIndex', answerIndex);
			swapFormValue(oForm, 'distance', intDistance);
			swapFormValue(oForm, 'process', 'movePollAnswer');
			oForm.submit();
		}
	}

function deletePoll() {
		if (confirm("Are you sure you want to delete this poll?") && oForm) {
			swapFormValue(oForm, 'process', 'deletePoll');
			oForm.submit();
		}
	}

/*
EDIT EVENT
*/

function deleteEvent() {
		if (confirm("Are you sure you want to delete this event?") && oForm) {
swapFormValue(oForm, 'process', 'deleteEvent');
			oForm.submit();
		}
	}

/*
EDIT FORM
*/

function deleteForm() {
		if (confirm("Are you sure you want to delete this form?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteForm');
			oForm.submit();
		}
	}

/*
EDIT SCRIPT
*/

function deleteScript() {
		if (confirm("Are you sure you want to delete this script?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteScript');
			oForm.submit();
		}
	}


/*
EDIT COUNTDOWN TIMER
*/

function deleteCountdownTimer() {
		if (confirm("Are you sure you want to delete this event?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteCountdownTimer');
			oForm.submit();
		}
	}

/*
EDIT COUNTDOWN TIMER
*/

function deleteTradingCard() {
		if (confirm("Are you sure you want to delete this trading card release?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteTradingCard');
			oForm.submit();
		}
	}
	
function deleteTradingCardStat() {
		if (confirm("Are you sure you want to delete this trading card stat?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteTradingCardStat');
			oForm.submit();
		}
	}




function deleteProduct() {
		if (confirm("Are you sure you want to delete this Product?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteProduct');
			oForm.submit();
		}
	}

function deleteOrder() {
		if (confirm("Are you sure you want to delete this Order?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteOrder');
			oForm.submit();
		}
	}

function deleteSlidingTiles() {
		if (confirm("Are you sure you want to delete this Scramble! Image?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteSlidingTiles');
			oForm.submit();
		}
	}
	
function deleteScrapbookPhoto() {
		if (confirm("Are you sure you want to delete this Scrapbook Photo?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteScrapbookPhoto');
			oForm.submit();
		}
	}
	
function deleteScrapbookWriting() {
		if (confirm("Are you sure you want to delete this Scrapbook Writing?") && oForm) {
			swapFormValue(oForm, 'process', 'deleteScrapbookWriting');
			oForm.submit();
		}
	}
	
	
/*
BROWSE SERVER
Pops open a window to a file browser/upload utility. When user finally
picks a file from the server, a field on the original page is populated
with an appropriate path string.
*/

	// pops open a window and stores a reference to a target element
	// which will store the result of the browsing
	var oServerBrowser = null;
	function browseServer(oTargetElement, strURL, strTagName, oTagStorage) {
		var strTargetName = "remoteFileBrowser";
		var strOptions = "left=200,screenX=300,top=200,screenY=100,channelmode=0,directories=0,height=480,innerHeight=480,width=640,innerWidth=640,hotkeys=0,location=0,menubar=0,titlebar=0,toolbar=0,resizable=1,status=1,scrollbars";

		// store requested tagname
		oTagStorage.value = strTagName;

		if ( oServerBrowser = doPopup(oServerBrowser, strURL, strTargetName, strOptions) && oTargetElement ) {
			// alert(oTargetElement);
			window.browseTarget = oTargetElement;
		}
}
	
	// no tag needed
	var oFileBrowser = null;
	function browseForFile(oTargetElement, strURL) {
		var strTargetName = "remoteFileBrowser";
		var strOptions = "left=200,screenX=300,top=200,screenY=100,channelmode=0,directories=0,height=480,innerHeight=480,width=640,innerWidth=640,hotkeys=0,location=0,menubar=0,titlebar=0,toolbar=0,resizable=1,status=1,scrollbars";

		if ( oServerBrowser = doPopup(oFileBrowser, strURL, strTargetName, strOptions) && oTargetElement ) {
			// alert(oTargetElement);
			window.browseTarget = oTargetElement;
		}
}
	
	// returns the selected file to the indicated target field
//	function selectFile(strPath) {
//		if ( strPath && window.opener.browseTarget ) {
//			window.opener.browseTarget.value = strPath;
//			window.close();
//		}
//	}

	function selectFile(strPath) {
		strPath = "{filelink path='" + strPath + "' text='" + strPath + "' target='_blank'}";
alert("here");
}

// takes the value of form element oSource, formats it, and 
	// dumps result into oTarget
	function formatFileLink(oSource, oTarget, oTagName) {
		if (oSource && oTarget && oTagName) {
		
			var strTagName = (oTagName.value) ? oTagName.value : "filelink";

			var ar = oSource.value.match( /([^\/]+)$/ );
			tagText = RegExp.$1;
			oTarget.value = "{" + strTagName + " path='" + oSource.value + "' text='" + tagText + "'}";
		}
	}
	

/*
POPUP HANDLER
Every popup window needs a variable to store its object reference.
Put "var oSomeObject = null". then pass in oSomeObject when you
pop open the window along with the other parameters.
*/
	
	function doPopup(oStorage, strURL, strTargetName, strOptions) {
		if (!(oStorage && oStorage.open && !oStorage.closed)) {
			oStorage = window.open("", strTargetName, strOptions);
		}
		if (oStorage && oStorage.open && !oStorage.closed) {
			oStorage.focus();
			oStorage.location.href = strURL;
			return oStorage;
		}
		return null;
	}

/*
GENERATE AUTO HYPERLINK - 
generates and inserts a hyperlink from insert self-mt link window into eWebEditPro  
*/

function generateAutoLink( strTagName, strDefaultText, intID ) {
	strDefaultText = strDefaultText.replace(/('|")/g,"\\$1");
	var result = "{" + strTagName + " text='" + strDefaultText + "' id=" + intID + "}";
	if (!eWebEditProUtil.isOpenerAvailable()) {
	   alert("Your hyperlink could not be inserted because the editor page has been closed.");
	  } else {
	   eWebEditProUtil.getOpenerInstance().editor.pasteText(result);
//	   top.opener.eWebEditPro.instances[0].editor.pasteText(result);

//	   self.close();
	  }
}

/*
GENERATE GAME HYPERLINK - 
same functionality as above, except used solely for inserting game links on game edit page
*/

function generateAutoGameLink( strTagName, strDefaultText, intID, formLink ) {
	strDefaultText = strDefaultText.replace(/('|")/g,"\\$1");
	var result = "{" + strTagName + " text='" + strDefaultText + "' id=" + intID + "}";
	   window.opener.document.forms[0][formLink].value = result;
//	   self.close();
}


/*
LOAD SELECTED TEXT FROM EWEBEDITPRO
*/

var selectedText;
 var selectedHTML;

 function loadselectedtext() {
  var testimage;
  var objInstance = eWebEditProUtil.getOpenerInstance();
  if (objInstance && objInstance.editor)
  {
   selectedText = objInstance.editor.getSelectedText();
   selectedHTML = objInstance.editor.getSelectedHTML();
  }
 }

function setCurrentDate() {
  // changes the date selector menus to the current date
  var currentDate = new Date();

  document.scoutingForm.year.selectedIndex = 0;
  document.scoutingForm.month.selectedIndex = currentDate.getMonth();

  setDays();  
  document.scoutingForm.day.selectedIndex = currentDate.getDate() - 1;
}

function setDays(inputYear, inputMonth, inputDays) {
  var y = inputYear.options[inputYear.selectedIndex].value;
  var m = inputMonth.selectedIndex;
  var d;

  // find number of days in current month
  if ( (m == 3) || (m == 5) || (m == 8) || (m == 10) ) {
    days = 30;
  }
  else if (m == 1) {
    // check for leapyear - Any year divisible by 4, except those divisible by 100 (but NOT 400)
    if ( (Math.floor(y/4) == (y/4)) && ((Math.floor(y/100) != (y/100)) || (Math.floor(y/400) == (y/400))) )
      days = 29
    else
      days = 28
  }
  else {
    days = 31;
  }

  // if (days in new month > current days) then we must add the extra days
  if (days > inputDays.length) {
    for (i = inputDays.length; i < days; i++) {
      inputDays.length = days;
      inputDays.options[i].text = i + 1;
      inputDays.options[i].value = i + 1;
    }
  }
  
  // if (days in new month < current days) then we must delete the extra days
  if (days < inputDays.length) {
    inputDays.length = days;
    if (inputDays.selectedIndex == -1) 
      inputDays.selectedIndex = days - 1;
  }
}






	
	
