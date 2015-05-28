var thewindow;
var szWebPage;
var szPageID;
var szbuttID;
var szProperties;
var szPageName;
var szFileName;
function ContentManager(szbuttID, szFileName, szLanguageList, szLoadLink){
		
// alert(szbuttID + ' : ' + szFileName);
//szWebPage = szWebPage2;
//szPageID = szPageID2;
//szbuttID = szbuttID2;
//szProperties = szProperties2;
//szPageName = szPageName2;
//szFileName = szFileName2;

      	var nHeight = (screen.availHeight * .85)
		var intTop = (screen.availHeight - nHeight) / 2;
		var intLeft = (screen.availWidth - 800) / 2;
        //thewindow = window.open("/Apps/ContentManager/lib/ContentPopUp.html", "ContentManager", "top="+ intTop +",left="+ intLeft +",status=0,resizable=1,scrollbars=1,toolbar=0,width=800,height=" + nHeight)
        thewindow = window.open("/apps/ContentEditor/ContentEditor.aspx?buttID=" + szbuttID + "&filename=" + szFileName + "&LanguageList=" + szLanguageList + "&" + szLoadLink, "ContentManager", "top="+ intTop +",left="+ intLeft +",status=1,resizable=1,scrollbars=1,toolbar=0,width=800,height=" + nHeight)
		}

function Populate()
{
	thewindow.document.forms[0].WebPage.value = szWebPage;
	thewindow.document.forms[0].PageID.value = szPageID;
	thewindow.document.forms[0].buttID.value = szbuttID;
	thewindow.document.forms[0].Properties.value = szProperties;
	thewindow.document.forms[0].PageName.value = szPageName;
	thewindow.document.forms[0].FileName.value = szFileName;		
	thewindow.document.forms[0].target = "_self";
	thewindow.document.forms[0].submit();	
}

function loadVar()
{
	if (document.all.wizard != undefined){
		wizard.SetVariable("eow", "true");
		}
}
function loadVars()
{
	if (wizard != undefined)
		wizard.SetVariable("eopopup", "true");
}
function sendVar(szFileName)
{
	if (wizard != undefined)
		wizard.SetVariable("uploadComplete", "true," + szFileName);
}
function OpenWindowCentered(szURL, szWindowName, nHeight, nWidth, bytSizable)
{
	//Centers a window and removes toolbars and such
	//bytSizeable:	1=True; 0=False
	var intTop = (screen.availHeight - nHeight) / 2;
	var intLeft = (screen.availWidth - nWidth) / 2;
			
	window.open(szURL, szWindowName, "toolbar=no,  top=" + intTop + ", left=" + intLeft + ", location=no, directories=no, menubar=no, status=no, scrollbars=no, resizable=" + bytSizable + ", width=" + nWidth + ", height="+ nHeight + "");				
}
function popIDXwizard(szWizardLocation)
			{
			var nHeight = (screen.availHeight * .75)
			var intTop = (screen.availHeight - nHeight) / 2;
			var intLeft = (screen.availWidth - 800) / 2;
			window.open("/IDXintegration/IDXList.aspx?wizardlocation=" + szWizardLocation, "IDXwizard", "toolbar=no,  top=" + intTop + ", left=" + intLeft + ", location=no, directories=no, menubar=no, status=no, scrollbars=1, resizable=1, width=800, height="+ nHeight + "");
			}
function popIDXwindow(szWizardLocation){
			var nHeight = (screen.availHeight * .75)
			var intTop = (screen.availHeight - nHeight) / 2;
			var intLeft = (screen.availWidth - 800) / 2;
			idxwindow = window.open("/IDXintegration/lib/IDXpopup.aspx?wizardlocation=" + szWizardLocation, "IDXwindow", "toolbar=no,  top=" + intTop + ", left=" + intLeft + ", location=no, directories=no, menubar=no, status=no, scrollbars=1, resizable=1, width=800, height="+ nHeight + "");
			idxwindow.blur();
		}
function IntroWindow(IntroName, IntroMusic, IntroColor, IntroText1, IntroText2, IntroText3, IntroText4, IntroText5)
{
			var intLeft = (screen.availWidth - 700) / 2;
			var intTop = (screen.availHeight - 540) / 2;
			introWin = window.open("/templates/themes/Intros/wiz_intro.asp?IntroName=" + IntroName + "&IntroMusic=" + IntroMusic + "&IntroColor=" + IntroColor + "&fromWizard=1&IntroText1=" + IntroText1 + "&IntroText2=" + IntroText2 + "&IntroText3=" + IntroText3 + "&IntroText4=" + IntroText4 + "&IntroText5=" + IntroText5, "IntroView", "toolbar=no,  top=" + intTop + ", left=" + intLeft + ", location=no, directories=no, menubar=no, status=no, scrollbars=0, resizable=0, width=700, height=540");
}
function ManageStaffProfilesPopup(){
		var nHeight = (screen.availHeight * .85);
		var intTop = (screen.availHeight - nHeight) / 2;
		var intLeft = (screen.availWidth - 800) / 2;
		window.open("/Apps/StaffMembers/StaffMembers.aspx", "StaffMembers", "top="+ intTop +",left="+ intLeft +",status=0,resizable=1,scrollbars=1,toolbar=0,width=800,height=" + nHeight);
		}
		
function resizeFrameObj(oFrame,nWidth, nHeight, count)
{	
	var nCount = count;	
	if(oFrame!=undefined)
	{
		var frmElement = oFrame.frameElement;		
		frmElement.height=nHeight;
		frmElement.width=nWidth;
		
		frmElement.style.height = nHeight;
		frmElement.style.width = nWidth;
	}
	
	if (nCount < 2)
	{
		if (oFrame.top.frames.length > 0)
		{
			if (oFrame.name != oFrame.top.frames[0].name)
			{
				nWidth = oFrame.parent.document.body.scrollWidth;
				nHeight = oFrame.parent.document.body.scrollHeight;
				resizeFrameObj(oFrame.top.frames[0], nWidth, nHeight, nCount+1);
			}
		}
	}
}

function resizeFrame(nWidth, nHeight)
{
	var oFrame = window.frames[0];		
	if (oFrame.frameElement.name != 'ifrmLeadGenProcessor') {			
		resizeFrameObj(oFrame, nWidth, nHeight, 0); 
	}
	else {			
		var oFrame = window.frames[1];		
		resizeFrameObj(oFrame, nWidth, nHeight, 0);
	}			
	
	var objWiz = document.getElementById("wizard");
	if(objWiz!=undefined)
	{
		objWiz.height=nHeight;
	}
}