function IsYear(strString)
   //  check for valid numeric strings	
   {
   var strValidChars = "0123456789";
   var strChar;
   var blnResult = true;

   if (strString.length != 4) return false;

   //  test strString consists of valid characters listed above
   for (i = 0; i < strString.length && blnResult == true; i++)
      {
      strChar = strString.charAt(i);
      if (strValidChars.indexOf(strChar) == -1)
         {
         blnResult = false;
         }
      }
   return blnResult;
   }

function IsNumeric(strString)
   //  check for valid numeric strings	
{

	if(strString == null || strString.length==0)
	{
		return false;
	}
   var strValidChars = "0123456789";
   var strChar;
   var blnResult = true;

   //  test strString consists of valid characters listed above
   for (i = 0; i < strString.length && blnResult == true; i++)
      {
      strChar = strString.charAt(i);
      if (strValidChars.indexOf(strChar) == -1)
         {
         blnResult = false;
         }
      }
   return blnResult;
   }

function IsStarterExperience()
{
	var iSC	= parseInt(getDictionaryCookie('SC', 'EXP'));
	if (isNaN(iSC))
	{
		iSC = 0;
	}
	var iRights	= getUserRights();
	if ((!IsLoggedIn() && iSC == 1) || (IsLoggedIn() && ((iSC == 1 || iRights == 128) && !((getSubscriptionAll() & iRights) != 0))))
		return true; 
	else
		return false;
}

function mOvr(evt,src,theClass)
{
	if (!evt)
		evt=window.event;

	if (evt.fromElement && !src.contains(evt.fromElement))
	{
		src.style.cursor = 'hand'; 
		src.className = theClass;
	}
}

function mClk(evt,i,tabSetId)
{
	if (!evt)
		evt=window.event;

	if(evt.srcElement && evt.srcElement.tagName=='TD')
	{
		document.all["TabLinkID"+tabSetId][i].click();
	}
}

function mOut(evt,src,theClass)
{
	if (!evt)
		evt=window.event;

	if (evt.toElement && !src.contains(evt.toElement))
	{
		src.style.cursor = 'default';
		src.className = theClass;
	}
}

function makeTab(text, altText, url, width, bActive, tIndex, tabSetId,tabStyle,tabUStyle,tabUHoverStyle)
{
	writeTabEx(text, altText, url, width, bActive, tIndex, tabSetId, tabStyle,tabUStyle,tabUHoverStyle);
}

function writeTabEx(text, altText, url, width, bActive, tIndex, tabSetId, tabSelStyle, tabUSelStyle, tabUSelHoverStyle)
{
	var tWidth = parseInt(width);
	var tHeight = (bActive) ? 20 : 17;
	var tabStyle = tabUSelStyle;
	var tabTextStyle = "TabText";
	var tabHoverStyle = tabUSelHoverStyle;
	var borderStyle = "tabBorder";
	var borderShadowLt = "tabShadowLt";
	var borderShadowDk = "tabShadowDk";
	
	if (bActive)
	{
		tabStyle = tabSelStyle;
		tabTextStyle = "sTabText";
		borderStyle = "sTabBorder";
		borderShadowLt = "sTabShadowLt";
		borderShadowDk = "sTabShadowDk";
	}

	document.write('		<td valign="bottom" width="' + tWidth + '">');
	document.write('			<table width="100%" border="0" cellspacing="0" cellpadding="0">');
	// Tab top
	document.write('				<tr>');
	// Left rounded corner
	document.write('					<td width="3" colspan="3">');
	document.write('						<table width="100%" border="0" cellspacing="0" cellpadding="0">');
	document.write('							<tr height="1">');
	document.write('								<td width="2" height="1" colspan="2"><spacer type="block" height="1" width="1"></td>');
	document.write('								<td width="1" height="1" class="' + borderStyle + '"><spacer type="block" height="1" width="1"></td>');
	document.write('							</tr>');
	document.write('							<tr height="1">');
	document.write('								<td width="1" height="1"><spacer type="block" height="1" width="1"></td>');
	document.write('								<td width="1" height="1" class="' + borderStyle + '"><spacer type="block" height="1" width="1"></td>');
	document.write('								<td width="1" height="1" class="' + borderShadowLt + '"><spacer type="block" height="1" width="1"></td>');
	document.write('							</tr>');
	document.write('						</table>');
	document.write('					</td>');
	// Top bevel
	document.write('					<td width="' + ((tWidth=="100%") ? "" : tWidth - 6) + '">');
	document.write('						<table width="100%" border="0" cellspacing="0" cellpadding="0">');
	document.write('							<tr height="1"><td class="' + borderStyle + '" width="1" height="1"><spacer type="block" height="1" width="1"></td></tr>');
	document.write('							<tr height="1"><td class="' + borderShadowLt + '" height="1"><spacer type="block" height="1" width="1"></td></tr>');
	document.write('						</table>');
	document.write('					</td>');
	// Right rounded corner
	document.write('					<td width="3" colspan="3">');
	document.write('						<table width="3" border="0" cellspacing="0" cellpadding="0">');
	document.write('							<tr height="1">');
	document.write('								<td width="1" height="1" class="' + borderStyle + '"><spacer type="block" height="1" width="1"></td>');
	document.write('								<td width="2" height="1" colspan="2"><spacer type="block" height="1" width="1"></td>');
	document.write('							</tr>');
	document.write('							<tr height="1">');
	document.write('								<td width="1" height="1" class="' + borderShadowLt + '"><spacer type="block" height="1" width="1"></td>');
	document.write('								<td width="1" height="1" class="' + borderStyle + '"><spacer type="block" height="1" width="1"></td>');
	document.write('								<td width="1" height="1"><spacer type="block" height="1" width="1"></td>');
	document.write('							</tr>');
	document.write('						</table>');
	document.write('					</td>');
	document.write('				</tr>');
	// Tab body
	document.write('				<tr>');
			// Left edge
	document.write('					<td class="' + borderStyle + '" width="1" height="' + tHeight + '"><spacer type="block" height="1" width="1"></td>');
	document.write('					<td class="' + borderShadowLt + '" width="1"><spacer type="block" height="1" width="1"></td>');
	document.write('					<td class="' + tabStyle + '" width="1"><spacer type="block" height="1" width="1"></td>');
			// Tab text
	document.write('					<td class="' + tabStyle + '" height=15 nowrap align="center" title="' + altText + '"');

			// Add events for tabs
	if (!bActive)
	{
		document.write(' onMouseOver="mOvr(event,this,\'' + tabHoverStyle + '\');" onMouseOut="mOut(event,this,\'' + tabStyle + '\');" onClick="mClk(event,' + tIndex + ',\'' + tabSetId + '\');"');
	}
	else
	{
		document.write(' onMouseOver="mOvr(event,this,\'' + tabStyle + '\');" onMouseOut="mOut(event,this,\'' + tabStyle + '\');" onClick="mClk(event,' + tIndex + ',\'' + tabSetId + '\');"');
	}
				
	document.write('><A href="'+ url + '" id="TabLinkID' + tabSetId + '" class="' + tabTextStyle + '">' + text + '</A></td>');
			// Right edge
	document.write('					<td class="' + tabStyle + '" width="1"><spacer type="block" height="1" width="1"></td>');
	document.write('					<td class="' + borderShadowDk + '" width="1"><spacer type="block" height="1" width="1"></td>');
	document.write('					<td class="' + borderStyle + '" width="1"><spacer type="block" height="1" width="1"></td>');
	document.write('				</tr>');
	// Tab bottom
	document.write('				<tr height="1">');
	if (bActive)
	{
		document.write('					<td width="1" height="1" class="' + borderShadowDk + '"><spacer type="block" height="1" width="1"></td>');
		document.write('					<td colspan="5" height="1" class="' + tabStyle + '"><spacer type="block" height="1" width="1"></td>');
		document.write('					<td width="1" height="1" class="' + borderShadowDk + '"><spacer type="block" height="1" width="1"></td>');
	}
	else
	{
		document.write('					<td colspan="7" height="1" class="sTabBorder"><spacer type="block" height="1" width="1"></td>');
	}
	document.write('				</tr>');
	document.write('			</table>');
	document.write('		</td>');
}

//-------
function doSpace(sWidth)
{
// Space between tabs
	document.write('		<td' + ((parseInt(sWidth) != 0) ? (' width="' + sWidth + '"') : '') + ' valign="bottom">');
	document.write('			<table width="100%" height="1" border="0" cellspacing="0" cellpadding="0">');
	document.write('				<tr height="1">');
	document.write('					<td class="sTabBorder" height="1"><img src=' + m_Cache + '/i/pixel.gif height="1" width="1"></td>');
	document.write('				</tr>');
	document.write('			</table>');
	document.write('		</td>');
}


function makeNewTab()
{

	document.write('<TABLE cellSpacing=0 cellPadding=0 width="620" bgColor=#efefef border=0>');
    document.write('	<TBODY>');
    document.write('	<TR valign="middle"> ');
    document.write('	<TD width="129" align="center" valign="bottom"><img src="/images/toptrans-small-curve.gif" width="129" height="5" border="0"></TD>');
    document.write('	<TD width="4" height=4 align="center" valign="bottom" bgcolor="#ffffff"><img src="/images/pix.gif" width="1" height="4"></TD>');
    document.write('	<TD width="129" align="center" valign="bottom" bgcolor="#99CCFF"><img src="/images/toptrans-small-curve.gif" width="129" height="5" border="0"></TD>');
    document.write('	<TD width="4" height=4 align="center" valign="bottom" bgcolor="#ffffff"><img src="/images/pix.gif" width="1" height="4"></TD>');
    document.write('	<TD width="129" align="center" valign="bottom"><img src="/images/toptrans-small-curve.gif" width="129" height="5" border="0"></TD>');
    document.write('	<TD width="4" height=4 align="center" valign="bottom" bgcolor="#ffffff"><img src="/images/pix.gif" width="1" height="4"></TD>');
    document.write('	<TD width="129" align="center" valign="bottom" bgcolor="#efefef"><img src="/images/toptrans-small-curve.gif" width="129" height="5" border="0"></TD>');
    document.write('	<TD width="4" height=4 align="center" valign="bottom" bgcolor="#ffffff"><img src="/images/pix.gif" width="1" height="4"></TD>');
    document.write('	<TD width="129" align="center" valign="bottom"><img src="/images/toptrans-small-curve.gif" width="129" height="5" border="0"></TD>');
    document.write('	<TD width="30" height=4 align="center" valign="bottom" bgcolor="#ffffff"><img src="/images/pix.gif" width="1" height="4"></TD>');
    document.write('	</TR>');
    document.write('	<TR valign="middle"> ');
    document.write('	<TD width="129" height=26 align="center" background="/images/toptrans-back.gif"><a href="Home"><strong>Home</strong></a></TD>');
    document.write('	<TD height=26 align="center" valign="middle" bgcolor="#ffffff" ><img src="/images/pix.gif" width="2" height="8"></TD>');
    document.write('	<TD width="129" height=26 align="center" background="/images/toptrans-back.gif" bgcolor="#99CCFF"><font color="#000000"><strong>Research</strong></font></TD>');
    document.write('	<TD height=26 align="center" valign="middle" bgcolor="#ffffff" ><img src="/images/pix.gif" width="2" height="1"></TD>');
    document.write('	<TD width="129" height=26 align="center" background="/images/toptrans-back.gif"><a href="Libraries"><strong>Libraries</strong></a></TD>');
    document.write('	<TD height=26 align="center" valign="middle" bgcolor="#ffffff" ><img src="/images/pix.gif" width="2" height="1"></TD>');
    document.write('	<TD width="129" height=26 align="center" background="/images/toptrans-back.gif"><a href="Libraries"><strong>Marketplace</strong></a></TD>');
    document.write('	<TD height=26 align="center" valign="middle" bgcolor="#ffffff" ><img src="/images/pix.gif" width="2" height="1"></TD>');
    document.write('	<TD width="129" height=26 align="center" background="/images/toptrans-back.gif"><a href="Education%20Center"><strong>Education Center</strong></a></TD>');
    document.write('	<TD height=26 valign="bottom" bgcolor="#ffffff" ><img src="/images/pix.gif" width="4" height="1"></TD>');
    document.write('	</TR>');
    document.write('	</TBODY>');
    document.write('</TABLE>');
}

function buildTopTab(sNumber,selTab,selColor)
{
	var intNum = parseInt(sNumber);
	var intSel = parseInt(selTab);
	document.write('	<TR valign="middle"> ');
    for (i = 0; i < intNum; i++)
      {
		if(i==intSel)
		  {
			document.write('	<TD class="tabs" width="129" align="center" valign="bottom" bgcolor="' + selColor + '"><img src="/images/toptrans-small-curve.gif" width="129" height="5" border="0"></TD>');
		  }
		else
		  {
			document.write('	<TD class="tabs" width="129" align="center" valign="bottom"><img src="/images/toptrans-small-curve.gif" width="129" height="5" border="0"></TD>');
		  }
		document.write('	<TD class="tabs" width="4" height=4 align="center" valign="bottom" bgcolor="#ffffff"><img src="/images/pix.gif" width="1" height="4"></TD>');
      }
	document.write('	</TR>');

}

function buildActualTab(selTab,text,folder,selColor)
{
	var intSel = parseInt(selTab);

	if(intSel==1)
	  {
		document.write('	<TD class="tabs" width="129" height=26 align="center" background="/images/toptrans-back.gif" bgcolor="' + selColor + '"><a class="webdesign" href="' + folder + '"><font color="#FFFFFF"><strong>' + text + '</strong></a></font></TD>');
	  }
	else
	  {
		document.write('	<TD class="tabs" width="129" height=26 align="center" background="/images/toptrans-back.gif"><a class="webdesign" href="' + folder + '"><font color="#000000"><strong>' + text + '</strong></a></font></TD>');
	  }
	document.write('	<TD class="tabs" height=26 align="center" valign="middle" bgcolor="#ffffff" ><img src="/images/pix.gif" width="2" height="8"></TD>');

}

function buildActualLink(selTab,text,folder,selColor)
{
	var intSel = parseInt(selTab);

	if(intSel==1)
	  {
		document.write('	<a href="' + folder + '" class="webdesign"><font color="#efefef"><strong><u><font color="#FFFFFF">' + text + '</font></u></strong></font></a>');
	  }
	else
	  {
		document.write('	<a href="' + folder + '" class="webdesign"><font color="#efefef"><font color="#FFFFFF">' + text + '</font></a>');
	  }
	document.write('	<font color="#efefef" size="1">&nbsp;|</font> &nbsp;');

}

function browse_pg(aspPage)
{
	var i;
	i = aspPage.indexOf('?');
	if (i > 0)
	{
		document.location.href = aspPage ;
	}
	else
	{
		document.location.href = aspPage + '?id=1&oid=1&page=1';
	}
}