// _lcid="1033" _version="11.0.5510"
// _localBinding
// Version: "11.0.5510"
// Copyright (c) Microsoft Corporation.  All rights reserved.
function MSOLayout_MinimizeRestoreDownLevel(webPartGUID,frameState,source)
{
	var newFrameState = (frameState == "Minimized") ? "1" : "0";
	document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value = webPartGUID + ",frameState," + newFrameState;
	document.forms[MSOWebPartPageFormName].MSOWebPartPage_PostbackSource.value=source;
	document.forms[MSOWebPartPageFormName].submit();
}
function MSOLayout_RemoveWebPartDownLevel(webPartGUID, isSelected)
{
	document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value = webPartGUID + ",isIncluded,False";
	document.forms[MSOWebPartPageFormName].MSOWebPartPage_PostbackSource.value=22;
	if(isSelected)
	{
		MSOTlPn_ShowToolPane(0);
	}
	else
	{
		document.forms[MSOWebPartPageFormName].submit();
	}
}
var MSOTlPn_prevBuilder=null;
var MSOTlPn_prevWidth = 0;
var MSOTlPn_prevHeight = 0;
var MSOTlPn_shownViewChangeWarning = false;
var MSOWebPartPage_hideNextBeforeUnload = false;
var MSOWebPartPage_partDeleted = "";
function MSOLayout_CheckAndSaveChanges()
{
	if(document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges != null && document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value != "")
	{
		MSOLayout_SaveChanges();
	}
}
function MSOWebPartPage_ExportCheckWarning(address, hasPersonalizations)
{
	var doexport = true;
	if (hasPersonalizations)
	{
		if (!confirm(MSOStrings.ExportPersonalizationDialogText))
		{
			doexport = false;
		}
	}
	if (doexport)
	{
		var oldSavePerformed = false;
		if(typeof(MSOWPSC_SavePerformed) == "boolean")
		{
			oldSavePerformed = MSOWPSC_SavePerformed;
		}
		MSOWebPartPage_SetWindowLocation(address);
		if(typeof(MSOWPSC_SavePerformed) == "boolean")
		{
			MSOWPSC_SavePerformed = oldSavePerformed;
			MSOWebPartPage_hideNextBeforeUnload = true;
		}	
	}
}
function MSOMode_SetMode(bAllUsers)
{
	var newUrl = MSOMode_GetNewUrl(bAllUsers);
	MSOLayout_CheckAndSaveChanges();
	if(document.forms[MSOWebPartPageFormName].MSOTlPn_View.value != 4)
	{
		document.forms[MSOWebPartPageFormName].MSOTlPn_View.value = 0;
		var toolPaneViewExpression = /[& | \?]ToolPaneView=[-0-9A-Z]*/ig;
		newUrl = MSOMode_RemoveMode(newUrl, toolPaneViewExpression);
	}
	document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value = bAllUsers ? "true" : "false";
	document.forms[MSOWebPartPageFormName].action = newUrl;
	document.forms[MSOWebPartPageFormName].submit();
}
function MSOMode_GetNewUrl(bAllUsers, newUrl)
{
	if (newUrl==null)
	{
		newUrl = document.location.href;
	}
	var personalViewExpression = /[& | \?]PageView=Personal/ig;
	var allUsersViewExpression = /[& | \?]PageView=Shared/ig;
	var newMode = "PageView=" + (bAllUsers ? "Shared" : "Personal");
	newUrl = MSOMode_RemoveMode(newUrl, personalViewExpression);
	newUrl = MSOMode_RemoveMode(newUrl, allUsersViewExpression);
	newUrl = MSOMode_AddMode(newUrl, allUsersViewExpression, newMode);
	return newUrl;
}
function MSOMode_RemoveMode(newUrl, regExpression)
{
	var hashMarkExpression = /\#/;
	var hashMarkIndex = newUrl.search(hashMarkExpression);
	if(hashMarkIndex != -1)
	{
		newUrl = newUrl.substring(0, hashMarkIndex);
	}
	var questionMarkExpression = /\?/;
	var questionMarkIndex = newUrl.search(questionMarkExpression);
	if(questionMarkIndex != -1)
	{
		var pathString = newUrl.substring(0, questionMarkIndex);
		var queryString = newUrl.substring(questionMarkIndex, newUrl.length);
		queryString = queryString.replace(regExpression,'');
		if(queryString.length != 0 && queryString.charAt(0) != '?')
		{
			queryString = "?" + queryString;
		}
		newUrl = pathString + queryString;
	}
	return newUrl;
}
function MSOMode_AddMode(newUrl, regExpression, stringToAdd)
{
	var hashMarkExpression = /\#/;
	var hashMarkIndex = newUrl.search(hashMarkExpression);
	if(hashMarkIndex != -1)
	{
		newUrl = newUrl.substring(0, hashMarkIndex);
	}
	var questionMarkExpression = /\?/;
	var questionMarkIndex = newUrl.search(questionMarkExpression);
	if(questionMarkIndex == -1 )
	{
		newUrl += '?' + stringToAdd; 
	}
	else
	{
		var queryString = newUrl.substring(questionMarkIndex, newUrl.length);
		if(queryString.search(regExpression) == -1)
		{
			newUrl += '&' + stringToAdd; 
		}		
	}
	return newUrl;
}
function MSOPGrid_BuilderVisible(builderID)
{
	MSOPGrid_HidePrevBuilder();
	MSOTlPn_prevBuilder=null;
	builderID.style.display='inline';
}
function MSOPGrid_HidePrevBuilder()
{
	if(MSOTlPn_prevBuilder !=null)
	{
		eval(MSOTlPn_prevBuilder).style.display='none'; 
	}
}
function MSOPGrid_doBuilder(builderUrl, editorId, dialogFeatures)
{
	var pReturnValue=showModalDialog(builderUrl,editorId,dialogFeatures);
	editorId.value=pReturnValue;
//@cc_on
//@if (@_jscript_version >= 5)
//@		try { editorId.focus(); } catch (exception) {}
//@else
//@end
}
function MSOWebPartPage_RestorePageDefault()
{
	if(confirm(MSOStrings.ResetPagePersonalizationDialogText))
	{
		var newInput = document.createElement('INPUT');
		//@cc_on
		//@if (@_jscript_version >= 5)
		//@		try
		//@else
		//@end
		{
			newInput.type='hidden';
		}
		//@cc_on
		//@if (@_jscript_version >= 5)
		//@		catch(e){newInput.style.display = 'none';}
		//@else
		//@end
		newInput.name = 'MSOWebPartPage_RestorePageDefault';
		newInput.value = 'true';
		document.forms[MSOWebPartPageFormName].appendChild(newInput);
		if(document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges != null)
		{
			document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value = ""
		}
		MSOMode_SetMode(false);
	}
}
function MSOWebPartPage_RestorePartDefaults(webPartID)
{
	if(confirm(MSOStrings.ResetPartPersonalizationDialogText))
	{
		var newInput = document.createElement('INPUT');
		//@cc_on
		//@if (@_jscript_version >= 5)
		//@		try
		//@else
		//@end
		{
			newInput.type='hidden';
		}
		//@cc_on
		//@if (@_jscript_version >= 5)
		//@		catch(e){newInput.style.display = 'none';}
		//@else
		//@end
		newInput.name = 'MSO_RestoreSettings';
		newInput.value = webPartID;
		document.forms[MSOWebPartPageFormName].appendChild(newInput);
		MSOMode_SetMode(false);
	}
}
function MSOWebPartPage_MenuDoPostBack(eventTarget, eventArgument) 
{
	var theform = document.forms[MSOWebPartPageFormName];
	var eventTargetField = theform.__EVENTTARGET;
	var eventArgumentField = theform.__EVENTARGUMENT;
	if(eventTargetField == null)
	{
		eventTargetField = document.createElement('INPUT');
		eventTargetField.style.display = 'none';
		eventTargetField.name = '__EVENTTARGET';
		document.forms[MSOWebPartPageFormName].appendChild(eventTargetField);
	}
	if(eventArgumentField == null)
	{
		eventArgumentField = document.createElement('INPUT');
		eventArgumentField.style.display = 'none';
		eventArgumentField.name = '__EVENTARGUMENT';
		document.forms[MSOWebPartPageFormName].appendChild(eventArgumentField);
	}
	eventTargetField.value = eventTarget;
	eventArgumentField.value = eventArgument;
	theform.submit();
}
function MSOWebPartPage_SignIn()
{
	var newInput = document.createElement('INPUT');
	//@cc_on
	//@if (@_jscript_version >= 5)
	//@		try
	//@else
	//@end
	{
		newInput.type='hidden';
	}
	//@cc_on
	//@if (@_jscript_version >= 5)
	//@		catch(e){newInput.style.display = 'none';}
	//@else
	//@end
	newInput.name = 'MSOWebPartPage_AnonymousAccessLogIn';
	newInput.value = "1";
	document.forms[MSOWebPartPageFormName].appendChild(newInput);
	document.forms[MSOWebPartPageFormName].submit();
}
function MSOWebPartPage_SetWindowLocation(newLocation)
{
	var newLocationLowerCase = newLocation.toLowerCase();
	if(newLocationLowerCase.indexOf('javascript:') == 0 || newLocationLowerCase.indexOf('vbscript:') == 0)
	{
		MSOWebPartPage_hideNextBeforeUnload = true;
	}
	window.location = newLocation;
}
function MSOWebPartPage_SetNewWindowLocation(newLocation)
{
	window.open(newLocation);
}
function MSOTlPn_onToolPaneCloseClick()
{
	var ToolPaneViewClosed = '0';
	var PostbackSourceSettingsHide = '49';
	MSOTlPn_ShowToolPaneWrapper(ToolPaneViewClosed, PostbackSourceSettingsHide);
}
function MSOPGrid_InvokeFPBuilder(type,arguments,editorCtrl)
{
	editorCtrl.value=window.external.InvokeBuilder(type,arguments,editorCtrl.id);
	editorCtrl.focus();
}
function MSOMenu_KeyboardClick(widget)
{
	for(var index=1; index < arguments.length; index++)
	{
		if(event.keyCode == arguments[index])
		{
			widget.click();
			event.returnValue = false;
			return;
		}
	}
}
function MSOTlPn_ToggleDisplay(strID,strImgName,strAnchorName,strAltExpandText,strAltCollapseText, strImageAnchorName)
{
	var fieldID= strID+'_STATEFIELD';
	var stateFieldValue;
	if( document.all.item(strID).style.display == 'none' )
	{
		document.all.item(strID).style.display = '';
		document.images[strImgName].src = '/_layouts/images/TPMin2.gif';
		document.images[strImgName].alt = strAltCollapseText;
		document.all.item(strImageAnchorName).title = strAltCollapseText;
		document.all.item(strAnchorName).title = strAltCollapseText;
		stateFieldValue = "1";
	}
	else
	{
		document.all.item(strID).style.display = 'none';
		document.images[strImgName].src = '/_layouts/images/TPMax2.gif';
		document.images[strImgName].alt = strAltExpandText;
		document.all.item(strImageAnchorName).title = strAltExpandText;
		document.all.item(strAnchorName).title= strAltExpandText;
		stateFieldValue = "0";
	}
	if(document.all[fieldID] != null)
	{
		document.all[fieldID].value = stateFieldValue;
	}
}			
var MSOTlPn_originalToolPaneWidth;
function MSOTlPn_onToolPaneMaxClick()
{
	var mod = 1;
	var minMaxIcon = document.all['MSOTlPn_minMaxIcon'];
	var newSrc = minMaxIcon.src.substring(0, minMaxIcon.src.lastIndexOf('/')+1);
	if (document.all['MSOTlPn_Tbl'].toolpaneWide == null)
	{
		MSOTlPn_originalToolPaneWidth = document.all['MSOTlPn_Tbl'].style.width;
		document.all['MSOTlPn_Tbl'].style.width = (parseInt(document.all['MSOTlPn_Tbl'].offsetWidth)+100).toString()+"px";
		newSrc += ((document.dir == "rtl") ? "tpmax.gif" : "tpmin.gif"); 
		minMaxIcon.title = MSOStrings.ToolPaneShrinkToolTip;
		minMaxIcon.alt = MSOStrings.ToolPaneShrinkToolTip;
		minMaxIcon.parentElement.title = MSOStrings.ToolPaneShrinkToolTip;
		document.all['MSOTlPn_Tbl'].toolpaneWide = "1";
	}
	else
	{
		document.all['MSOTlPn_Tbl'].style.width = MSOTlPn_originalToolPaneWidth;
		newSrc += ((document.dir == "rtl") ? "tpmin.gif" : "tpmax.gif"); 
		minMaxIcon.title = MSOStrings.ToolPaneWidenToolTip;
		minMaxIcon.alt = MSOStrings.ToolPaneWidenToolTip;
		minMaxIcon.parentElement.title = MSOStrings.ToolPaneWidenToolTip;
		document.all['MSOTlPn_Tbl'].toolpaneWide = null;
		mod = -1;
	}
	minMaxIcon.src = newSrc;
	var x = document.all['MSOTlPn_Tbl'];
	for(var i = 0; i < x.all.length; i++)
	{
//@cc_on
//@if (@_jscript_version >= 5)
//@		try
//@else
//@end
		{
			if (x.all(i).getAttribute('ms-TlPnWiden')=="true")
			{			
			   x.all(i).style.pixelWidth += mod*120;
			}
		}
//@cc_on
//@if (@_jscript_version >= 5)
//@		catch (e)
//@else
//@end
		{
		}
	}
	MSOTlPn_WindowResize();
}
function MSOTlPn_WindowResize()
{	
	var objToolPane = document.all['MSOTlPn_MainTD'];
	if (objToolPane == null || objToolPane.offsetWidth == 0) return;
	var widthToolPane = objToolPane.offsetWidth;
	var docFrame = (document.body.offsetWidth - document.body.clientWidth);
	var spDiv = document.all['MSOTlPn_WebPartPageDiv'];
	if ((spDiv.offsetWidth + objToolPane.offsetWidth) == document.body.clientWidth)
	{
		return;
	}
	var widthAncestors = 0;
	var next = spDiv.offsetParent;
	var elementWidth = 0;
	while (next != null)
	{
	    if (document.dir != "rtl")
	    {
		    elementWidth = next.offsetLeft + (next.offsetWidth - (next.clientLeft + next.clientWidth));
		    if (next.offsetParent != null)
		    {
		        elementWidth += next.offsetParent.clientLeft;
		    }
	    }
	    else
	    {
		    elementWidth = (next.offsetParent != null) ? (next.offsetParent.offsetWidth - (next.offsetLeft + next.offsetWidth)) : 0;
	    }
		widthAncestors += elementWidth;
		next = next.offsetParent;	
	}
	widthAncestors -= docFrame;
	var widthCenter = document.body.clientWidth - (widthAncestors + widthToolPane);
	if (widthCenter < 250) 
		widthCenter = 250;
	document.all['MSO_tblPageBody'].style.pixelWidth = widthCenter +widthToolPane;
	spDiv.style.pixelWidth = widthCenter;	
	if (window.event.type == "load" && document.all.MSOTlPn_TlPnCaptionSpan!= null)
		document.all.MSOTlPn_TlPnCaptionSpan.scrollIntoView(false);
}
function MSOTlPn_CheckUrl()
{
	var toolPaneViewExpression = /[& | \?]ToolPaneView=[-0-9A-Z]*/ig;
	var formAction = document.forms[MSOWebPartPageFormName].action;
	var newUrl;
	newUrl = MSOMode_RemoveMode(document.forms[MSOWebPartPageFormName].action, toolPaneViewExpression);
	document.forms[MSOWebPartPageFormName].action = newUrl;
}
function MSOTlPn_Resize(obj)
{
	if (MSOTlPn_prevWidth != obj.clientWidth)
	{
		MSOTlPn_prevWidth = obj.clientWidth;
		MSOTlPn_WindowResize();
	}
	if (MSOTlPn_prevHeight != document.body.clientHeight)
	{
		MSOTlPn_prevHeight = document.body.clientHeight;
		var spDiv = document.all['MSOTlPn_WebPartPageDiv'];
		spDiv.style.height = "100%";
		spDiv.style.height = spDiv.offsetHeight;
	}
}
function MSOWebPartPage_SetupFixedWidthWebParts()
{
	var fixedWidthTitles = document.all['MSOFixedWidthTitle'];
	if(fixedWidthTitles != null)
	{
		if(fixedWidthTitles.length > 0)
		{
			for(var elementIndex = 0; elementIndex < fixedWidthTitles.length; elementIndex++)
			{
				fixedWidthTitles[elementIndex].style.width = MSOWebPartPage_AllocateSpaceForFirstTD(fixedWidthTitles[elementIndex]);
			}
		}
		else
		{
			fixedWidthTitles.style.width = MSOWebPartPage_AllocateSpaceForFirstTD(fixedWidthTitles);
		}
	}
}
function MSOWebPartPage_AllocateSpaceForFirstTD(titleDiv)
{
	var tempElement = document.createElement("DIV");
	tempElement.style.width = titleDiv.fixedWidth;
	document.body.appendChild(tempElement);
	var pixelSize = tempElement.offsetWidth;
	document.body.removeChild(tempElement);
	var tempTable = MSOLayout_GetParentTable(titleDiv).cloneNode(true); 
	if(tempTable != 0) 
	{
		document.body.appendChild(tempTable);
		var tempTableRow = tempTable.rows(0);
		for(var index = 1; index < tempTableRow.cells.length; index++)
		{
			pixelSize -= tempTableRow.cells(index).offsetWidth;
		}
		document.body.removeChild(tempTable);
	}
	return (pixelSize < 1) ? 1 : pixelSize;
}
function MSOWebPartPage_FindControlName(name)
{
   var labelcollection = document.all.tags("label");
   if (labelcollection != null)
   {
	   for (i = 0; i < labelcollection.length; i++)
	   {
			var label = labelcollection[i];
			if (label.innerText == name)
			{
				if (label.htmlFor.indexOf("_EDITOR") != -1)
				{
					return(label.htmlFor);
				}
			}
	   }
   }
   return null;
}
function MSOTlPn_ListViewChange(strWarningText)
{
    if (MSOTlPn_shownViewChangeWarning)
        return;
    alert(strWarningText);
    MSOTlPn_shownViewChangeWarning = true;
}
function MSOTlPn_CustomWindowResize()
{
	var objToolPane = document.all['MSOTlPn_Tbl'];
	if (objToolPane == null || objToolPane.offsetWidth == 0) return;
	objToolPane.style.pixelWidth = document.body.clientWidth;
}
function MSOTlPn_ShowListFilter()
{
	if (document.all['WebPartListFilter'].style.display == 'none')
	{
		document.all['WebPartListFilter'].style.display = 'block'; 
		document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible.value = "true";
	}
	else
	{
		document.all['WebPartListFilter'].style.display = 'none';
		document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible.value = "false";
	}
}
function MSOGallery_GetCookie(name) 
{
	var prefix = name + "=";
	var cookieStartIndex = document.cookie.indexOf(prefix);
	if (cookieStartIndex == -1)
	{
		return null;
	}
	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	if (cookieEndIndex == -1)
	{
		cookieEndIndex = document.cookie.length;
	}
	return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
} 
function MSOTlPn_ShowAllUsersToolPane(view, source, storageKey)
{
	MSOLayout_CheckAndSaveChanges();
	document.forms[MSOWebPartPageFormName].action = MSOMode_GetNewUrl(true);
	MSOTlPn_ShowToolPaneWrapper(view, source, storageKey);
}
function MSOLayout_MakeInvisibleIfEmpty()
{
	var allElements = document.getElementsByName("_invisibleIfEmpty"); 
	var agt = navigator.userAgent.toLowerCase();
	var isNav = ((agt.indexOf('mozilla')!=-1)&&((agt.indexOf('spoofer')==-1) && (agt.indexOf('compatible')==-1)));
	var isIE = (agt.indexOf("msie")!=-1);
	for (var curElement = 0; curElement < allElements.length; curElement++) 
	{
		if ((isIE && allElements[curElement].childNodes.length == 0)
			|| (isNav && allElements[curElement].childNodes.length <= 1))
		{
			allElements[curElement].style.display = "none";
		}
	}
}
function MSOLayout_GetParentRow(tableCell)
{
	var parentRow = tableCell.parentElement;
	while(parentRow.tagName != "TR" && parentRow.tagName != "BODY") parentRow = parentRow.parentElement;
	if(parentRow.tagName != "TR")
	{
		return null;
	}
	else
	{
		return parentRow;
	}
}
function MSOLayout_GetParentTable(TableCell)
{
	for (var currentObject = TableCell; currentObject.tagName != 'TABLE'; currentObject = currentObject.parentElement)
	{
		if(currentObject == document.body) return 0;
	}
	return currentObject;
}

// SIG // Begin signature block
// SIG // MIIaJgYJKoZIhvcNAQcCoIIaFzCCGhMCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFChb1C3q2vte
// SIG // Uc5P/ryTCw/qzgdyoIIUvDCCArwwggIlAhBKGdI4jIJZ
// SIG // HKVdc18VXdyjMA0GCSqGSIb3DQEBBAUAMIGeMR8wHQYD
// SIG // VQQKExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMRcwFQYD
// SIG // VQQLEw5WZXJpU2lnbiwgSW5jLjEsMCoGA1UECxMjVmVy
// SIG // aVNpZ24gVGltZSBTdGFtcGluZyBTZXJ2aWNlIFJvb3Qx
// SIG // NDAyBgNVBAsTK05PIExJQUJJTElUWSBBQ0NFUFRFRCwg
// SIG // KGMpOTcgVmVyaVNpZ24sIEluYy4wHhcNOTcwNTEyMDAw
// SIG // MDAwWhcNMDQwMTA3MjM1OTU5WjCBnjEfMB0GA1UEChMW
// SIG // VmVyaVNpZ24gVHJ1c3QgTmV0d29yazEXMBUGA1UECxMO
// SIG // VmVyaVNpZ24sIEluYy4xLDAqBgNVBAsTI1ZlcmlTaWdu
// SIG // IFRpbWUgU3RhbXBpbmcgU2VydmljZSBSb290MTQwMgYD
// SIG // VQQLEytOTyBMSUFCSUxJVFkgQUNDRVBURUQsIChjKTk3
// SIG // IFZlcmlTaWduLCBJbmMuMIGfMA0GCSqGSIb3DQEBAQUA
// SIG // A4GNADCBiQKBgQDTLiDwaHwsLS6BHLEGsqcLtxENV9pT
// SIG // 2HXjyTMqstT2CVs08+mQ/gkM0NsbWrnN5/aIsZ3AhyXr
// SIG // fVgQc2p4y3EV/cZY9imrWF6WBP0tYhFYgRzKcZTVIlgv
// SIG // 1cwUBYQ2upSqtE1K6e47Iq1WmX4hnGyGwEpHl2q0pjbV
// SIG // /Akt07Q5mwIDAQABMA0GCSqGSIb3DQEBBAUAA4GBAGFV
// SIG // Dj57x5ISfhEQjiLM1LMTK1voROQLeJ6kfvOnB3Ie4lnv
// SIG // zITjiZRM205h77Ok+0Y9UDQLn3BW9o4qfxfO5WO/eWkH
// SIG // cy6wlSiK9e2qqdJdzQrKEAmPzrOvKJbEeSmEktz/umdC
// SIG // SKaQEOS/YficU+WT0XM/+P2dT4SsVdH9EWNjMIIEAjCC
// SIG // A2ugAwIBAgIQCHptXG9ik0+6xP1D4RQYnTANBgkqhkiG
// SIG // 9w0BAQQFADCBnjEfMB0GA1UEChMWVmVyaVNpZ24gVHJ1
// SIG // c3QgTmV0d29yazEXMBUGA1UECxMOVmVyaVNpZ24sIElu
// SIG // Yy4xLDAqBgNVBAsTI1ZlcmlTaWduIFRpbWUgU3RhbXBp
// SIG // bmcgU2VydmljZSBSb290MTQwMgYDVQQLEytOTyBMSUFC
// SIG // SUxJVFkgQUNDRVBURUQsIChjKTk3IFZlcmlTaWduLCBJ
// SIG // bmMuMB4XDTAxMDIyODAwMDAwMFoXDTA0MDEwNjIzNTk1
// SIG // OVowgaAxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8w
// SIG // HQYDVQQLExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTsw
// SIG // OQYDVQQLEzJUZXJtcyBvZiB1c2UgYXQgaHR0cHM6Ly93
// SIG // d3cudmVyaXNpZ24uY29tL3JwYSAoYykwMTEnMCUGA1UE
// SIG // AxMeVmVyaVNpZ24gVGltZSBTdGFtcGluZyBTZXJ2aWNl
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // wHphh+uypwNjGysaYd6AtxUdoIuQPbsnkoQUOeuFzimS
// SIG // BmZIpANPjehPp/CvXtEvGceR8bWee5Ehzun/407w/K+V
// SIG // WLhjLeaO9ikYzXCOUMPtlrtA274l6EJV1vaF8gbni5kc
// SIG // MfMDD9RMnCQq3Bsbj4LzsO+nTeMUp+CP1sdowmFYqXLU
// SIG // +DBIT9kvb2Mg2YnKgnvCS7woxYFo5+aCQKxGOqD5PzbN
// SIG // TLtUQlp6ZXv+hOTHR1SsuT3sgMca98QzgYHJKpX7f146
// SIG // h5AU28wudfLva+Y9qWC+QgGqT6pbqD8iMZ8SFflzoR6C
// SIG // iwQr6kYCTG2PH1AulUsqeAaEdD2RjyxHMQIDAQABo4G4
// SIG // MIG1MEAGCCsGAQUFBwEBBDQwMjAwBggrBgEFBQcwAYYk
// SIG // aHR0cDovL29jc3AudmVyaXNpZ24uY29tL29jc3Avc3Rh
// SIG // dHVzMAkGA1UdEwQCMAAwRAYDVR0gBD0wOzA5BgtghkgB
// SIG // hvhFAQcBATAqMCgGCCsGAQUFBwIBFhxodHRwczovL3d3
// SIG // dy52ZXJpc2lnbi5jb20vcnBhMBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMAsGA1UdDwQEAwIGwDANBgkqhkiG9w0BAQQF
// SIG // AAOBgQAt809jYCwY2vUkD1KzDOuzvGeFwiPtj0YNzxpN
// SIG // vvN8eiAwMhhoi5K7Mpnwk7g7FQYnez4CBgCkIZKEEwrF
// SIG // mOVAV8UFJeivrxFqqeU7y+kj9pQpXUBV86VTncg2Ojll
// SIG // CHNzpDLSr6y/xwU8/0Xsw+jaJNHOY64Jp/viG+P9QQpq
// SIG // ljCCBBIwggL6oAMCAQICDwDBAIs8PIgR0T72Y+zfQDAN
// SIG // BgkqhkiG9w0BAQQFADBwMSswKQYDVQQLEyJDb3B5cmln
// SIG // aHQgKGMpIDE5OTcgTWljcm9zb2Z0IENvcnAuMR4wHAYD
// SIG // VQQLExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xITAfBgNV
// SIG // BAMTGE1pY3Jvc29mdCBSb290IEF1dGhvcml0eTAeFw05
// SIG // NzAxMTAwNzAwMDBaFw0yMDEyMzEwNzAwMDBaMHAxKzAp
// SIG // BgNVBAsTIkNvcHlyaWdodCAoYykgMTk5NyBNaWNyb3Nv
// SIG // ZnQgQ29ycC4xHjAcBgNVBAsTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFJvb3Qg
// SIG // QXV0aG9yaXR5MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
// SIG // MIIBCgKCAQEAqQK9wXDmO/JOGyifl3heMOqiqY0lX/j+
// SIG // lUyjt/6doiA+fFGim6KPYDJr0UJkee6sdslU2vLrnIYc
// SIG // j5+EZrPFa3piI9YdPN4PAZLolsS/LWaammgmmdA6LL8M
// SIG // tVgmwUbnCj44liypKDmo7EmDQuOED7uabFVhrIJ8oWAt
// SIG // d0zpmbRkO5pQHDEIJBSfqeeRKxjmPZhjFGBYBWWfHTdS
// SIG // h/en75QCxhvTv1VFs4mAvzrsVJROrv2nem10Tq8YzJYJ
// SIG // KCEAV5BgaTe7SxIHPFb/W/ukZgoIptKBVlfvtjteFoF3
// SIG // BNr2vq6Alf6wzX/WpxpyXDzKvPAIoyIwswaFybMgdxOF
// SIG // 3wIDAQABo4GoMIGlMIGiBgNVHQEEgZowgZeAEFvQcO9p
// SIG // cp4jUX4Usk2O/8uhcjBwMSswKQYDVQQLEyJDb3B5cmln
// SIG // aHQgKGMpIDE5OTcgTWljcm9zb2Z0IENvcnAuMR4wHAYD
// SIG // VQQLExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xITAfBgNV
// SIG // BAMTGE1pY3Jvc29mdCBSb290IEF1dGhvcml0eYIPAMEA
// SIG // izw8iBHRPvZj7N9AMA0GCSqGSIb3DQEBBAUAA4IBAQCV
// SIG // 6AvAjfOXGDXtuAEk2HcR81xgMp+eC8s+BZGIj8k65iHy
// SIG // 8FeTLLWgR8hi7/zXzDs7Wqk2VGn+JG0/ycyq3gV83TGN
// SIG // PZ8QcGq7/hJPGGnA/NBD4xFaIE/qYnuvqhnIKzclLb5l
// SIG // oRKKJQ9jo/dUHPkhydYV81KsbkMyB/2CF/jlZ2wNUfa9
// SIG // 8VLHvefEMPwgMQmIHZUpGk3VHQKl8YDgA7Rb9LHdyFfu
// SIG // ZUnHUlS2tAMoEv+Q1vAIj364l8WrNyzkeuSod+N2oADQ
// SIG // aj/B0jaK4EESqDVqG2rbNeHUHATkqEUEyFozOG5NHA1i
// SIG // twqijNPVVD9GzRxVpnDbEjqHk3Wfp9KgMIIEyTCCA7Gg
// SIG // AwIBAgIQaguZT8AA3qoR1NhAmqi+5jANBgkqhkiG9w0B
// SIG // AQQFADBwMSswKQYDVQQLEyJDb3B5cmlnaHQgKGMpIDE5
// SIG // OTcgTWljcm9zb2Z0IENvcnAuMR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jv
// SIG // c29mdCBSb290IEF1dGhvcml0eTAeFw0wMDEyMTAwODAw
// SIG // MDBaFw0wNTExMTIwODAwMDBaMIGmMQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSswKQYDVQQLEyJDb3B5cmlnaHQgKGMpIDIw
// SIG // MDAgTWljcm9zb2Z0IENvcnAuMSMwIQYDVQQDExpNaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQTCCASAwDQYJKoZI
// SIG // hvcNAQEBBQADggENADCCAQgCggEBAKKEFVPYCzAONJX/
// SIG // OhvC8y97bTcjTfPSjOX9r/3FAjQfJMflodxU7H4CdEer
// SIG // 2zJYFhRRKTjxfrK0jDpHtTlOblTCMQw6bfvNzctQnBuu
// SIG // p9jZSiY/tcXLj5biSfJt2OmWPt4Fz/CmVTetL2DNgGFC
// SIG // oUlUSg8Yt0vZk5kwWkd1ZLTTu922qwydT7hzOxg6qrSH
// SIG // jLCIsE1PH04RtTOA3w06ZG9ExzS9SpObvKYd+QUjTmAp
// SIG // j8wq8oSama2o2wpwe9Y0QZClt2bHXBsdozMOm1QDGj+Y
// SIG // kLjM5z0EdEMcj/c55rOsSHprKg5iAWE5dm79PpgHSxTx
// SIG // AUb9FQDgR9pP5AXkgCUCAQOjggEoMIIBJDATBgNVHSUE
// SIG // DDAKBggrBgEFBQcDAzCBogYDVR0BBIGaMIGXgBBb0HDv
// SIG // aXKeI1F+FLJNjv/LoXIwcDErMCkGA1UECxMiQ29weXJp
// SIG // Z2h0IChjKSAxOTk3IE1pY3Jvc29mdCBDb3JwLjEeMBwG
// SIG // A1UECxMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYD
// SIG // VQQDExhNaWNyb3NvZnQgUm9vdCBBdXRob3JpdHmCDwDB
// SIG // AIs8PIgR0T72Y+zfQDAQBgkrBgEEAYI3FQEEAwIBADAd
// SIG // BgNVHQ4EFgQUKVy5G7bNM+67nll99+XKLsQNNCgwGQYJ
// SIG // KwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYDVR0PBAQD
// SIG // AgFGMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQEE
// SIG // BQADggEBAEVY4ppBf/ydv0h3d66M2eYZxVe0Gr20uV8C
// SIG // oUVqOVn5uSecLU2e/KLkOIo4ZCJC37kvKs+31gbK6yq/
// SIG // 4BqFfNtRCD30ItPUwG2IgRVEX2SDZMSplCyK25A3Sg+3
// SIG // 6NRhj3Z24dkl/ySElY0EVlSUoRw6PoK87qWHjByMS3lf
// SIG // tUn6XjJpOh9UrXVN32TnMDzbZElE+/vEHEJx5qA9Re5r
// SIG // AJ+sQr26EbNW5PvVoiqB2B9OolW+J49wpqJsG/9UioK8
// SIG // gUumobFmeqkXp8sGwEfrprPpMRVTPSoEv/9zSNyLJ0P8
// SIG // Y+juJIdbvjbR6DH1Mtle33l6ujCsaYZK+4wRvxuNVFkw
// SIG // ggUPMIID96ADAgECAgphBxFDAAAAAAA0MA0GCSqGSIb3
// SIG // DQEBBQUAMIGmMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSswKQYD
// SIG // VQQLEyJDb3B5cmlnaHQgKGMpIDIwMDAgTWljcm9zb2Z0
// SIG // IENvcnAuMSMwIQYDVQQDExpNaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQTAeFw0wMjA1MjUwMDU1NDhaFw0wMzEx
// SIG // MjUwMTA1NDhaMIGhMQswCQYDVQQGEwJVUzETMBEGA1UE
// SIG // CBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSsw
// SIG // KQYDVQQLEyJDb3B5cmlnaHQgKGMpIDIwMDIgTWljcm9z
// SIG // b2Z0IENvcnAuMR4wHAYDVQQDExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQCqmb05qBgn9Cs9C0w/fHcup8u10YwNwjp0
// SIG // 15O14KBLP1lezkVPmnkp8UnMGkfuVcIIPhIg+FXy7l/T
// SIG // 4MqWvDDe/ljIJzLQhVTo8JEQu/MrvhnlA5sLhh3zsDmM
// SIG // uP0LHTxzJqxXK8opohWQghXid6NAUgOLncJwuh/pNPbz
// SIG // NZJOVYP42jC2IN5XBrVaQgbeWcvy36a9FUdxGSUj0stv
// SIG // mxl532pb8XYFeSn8w1bKj0QIhVWKy8gPRktVy4yWd0qH
// SIG // 6KlBBsf/DeloV2Nyw2lXtEPPMjow3Bvp1UMmKnn+ldsi
// SIG // ZyTJL9A04+b7UUmGuDzQJV/W7J4DYYepaEDH+OID5s8F
// SIG // AgMBAAGjggFAMIIBPDAOBgNVHQ8BAf8EBAMCBsAwEwYD
// SIG // VR0lBAwwCgYIKwYBBQUHAwMwHQYDVR0OBBYEFGvIxlEg
// SIG // 8LQv06C2rn9eJrK4h1IpMIGpBgNVHSMEgaEwgZ6AFClc
// SIG // uRu2zTPuu55Zffflyi7EDTQooXSkcjBwMSswKQYDVQQL
// SIG // EyJDb3B5cmlnaHQgKGMpIDE5OTcgTWljcm9zb2Z0IENv
// SIG // cnAuMR4wHAYDVQQLExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xITAfBgNVBAMTGE1pY3Jvc29mdCBSb290IEF1dGhv
// SIG // cml0eYIQaguZT8AA3qoR1NhAmqi+5jBKBgNVHR8EQzBB
// SIG // MD+gPaA7hjlodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NybC9wcm9kdWN0cy9Db2RlU2lnblBDQS5jcmww
// SIG // DQYJKoZIhvcNAQEFBQADggEBADUj/RNU/Onc8N0MFHr6
// SIG // p7PO/ac6yLrl5/YD+1Pbp5mpoJs2nAPrgkccIb0Uy+dn
// SIG // QAnHFpECVc5DQrTNG12w8zIEPRLlHacHp4+jfkVVdhuW
// SIG // lZFp8N0480iJ73BAt9u1VYDAA8QutijcCoIOx0Pjekhd
// SIG // uAaJkkBsbsXc+JrvC74hCowvOrXtp85xh2gj4bPkGH24
// SIG // RwGlK8RYy7KJbF/90yzEb7gjsg3/PPIRRXTyCQaZGN1v
// SIG // wIYBGBIdKxavVu9lM6HqZ070S4Kr6Q/cAfrfYH9mR13L
// SIG // LHDMe07ZBrhujAz+Yh5C+ZN8oqsKntAjEK5NeyeRbya+
// SIG // aPqmP58j68idu4cxggTWMIIE0gIBATCBtTCBpjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjErMCkGA1UECxMiQ29weXJpZ2h0
// SIG // IChjKSAyMDAwIE1pY3Jvc29mdCBDb3JwLjEjMCEGA1UE
// SIG // AxMaTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0ECCmEH
// SIG // EUMAAAAAADQwCQYFKw4DAhoFAKCBpjAZBgkqhkiG9w0B
// SIG // CQMxDAYKKwYBBAGCNwIBBDAcBgorBgEEAYI3AgELMQ4w
// SIG // DAYKKwYBBAGCNwIBFTAjBgkqhkiG9w0BCQQxFgQUlFBE
// SIG // mel2gBcQXS9RU7sA5GfGYiMwRgYKKwYBBAGCNwIBDDE4
// SIG // MDagFIASAG4AbwBuAF8AaQBlAC4AagBzoR6AHGh0dHA6
// SIG // Ly9vZmZpY2UubWljcm9zb2Z0LmNvbSAwDQYJKoZIhvcN
// SIG // AQEBBQAEggEAQYW0pgf0WhtX56tJ2zoW00kG5I9JbnFz
// SIG // JsKE/iVw9naTv7xkc1SkN0I9/uLVRi1jTSo90gdLCqKN
// SIG // sziqdMehVi+D0Eq4ZXIf6fVViJEzh7oNKej+MpEOFAhD
// SIG // DLjSeNA3pyZHCw4wyxe1KLn65D8bTNS3fAOUva4jDN1k
// SIG // aZCe8oS7o8KZ+XRqH026lmDa4mMTkU93hPnTj104lPK2
// SIG // P/FrS8w1Wl2Ni+PaCIU6/MIQJNZ1iLp0ERJ5N32TKllh
// SIG // dIHZP3qdMWJgV0OK0yMXnpRFfQZ4L0a09d32X9Axec/i
// SIG // amReVuv1M8BC2B9Sq5pC5OJ5pdccTw+qVqNWD6hIj31B
// SIG // y6GCAkwwggJIBgkqhkiG9w0BCQYxggI5MIICNQIBATCB
// SIG // szCBnjEfMB0GA1UEChMWVmVyaVNpZ24gVHJ1c3QgTmV0
// SIG // d29yazEXMBUGA1UECxMOVmVyaVNpZ24sIEluYy4xLDAq
// SIG // BgNVBAsTI1ZlcmlTaWduIFRpbWUgU3RhbXBpbmcgU2Vy
// SIG // dmljZSBSb290MTQwMgYDVQQLEytOTyBMSUFCSUxJVFkg
// SIG // QUNDRVBURUQsIChjKTk3IFZlcmlTaWduLCBJbmMuAhAI
// SIG // em1cb2KTT7rE/UPhFBidMAwGCCqGSIb3DQIFBQCgWTAY
// SIG // BgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3
// SIG // DQEJBTEPFw0wMzA3MTUwNjA0MzNaMB8GCSqGSIb3DQEJ
// SIG // BDESBBD48UweD52dFk0m+SC4Xdt3MA0GCSqGSIb3DQEB
// SIG // AQUABIIBACMpUVftp2PuZkpNDbna72E10L6Yx8qKR15m
// SIG // dW2p0ETZxT0fx1czgWPCkEKaDJFdO6TjfIkcyjP0N0A4
// SIG // qzqzIeTZFX6dcZvt3wH/Hs/ZrnmWBwx9L4lIvB+YB0Pm
// SIG // yVDXzBFuWTOeHwyrYfWPdpbEk9ZC9Vn4sUuKNDeaw378
// SIG // QB6NG5d96/+p3qMOkvg9G8g2F4CB9/BU3zTxjfc7/vol
// SIG // X/XAJhTu9Xq8TXK64RFh+JSeG0jt/gigFtuaG+WlLDpe
// SIG // sgtBVn/63rzudSX3E+m+U6pP3R/jYzelJoLpqyZPYHaU
// SIG // 7k/DP92hjaBM0Ruilnxc23Gwyoyv9PacO3YXly1/VxM=
// SIG // End signature block
