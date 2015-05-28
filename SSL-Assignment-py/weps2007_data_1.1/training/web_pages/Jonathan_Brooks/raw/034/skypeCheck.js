var activex = ((navigator.userAgent.indexOf('Win')  != -1) && (navigator.userAgent.indexOf('MSIE') != -1) && (parseInt(navigator.appVersion) >= 4 ));
var CantDetect = ((navigator.userAgent.indexOf('Safari')  != -1) || (navigator.userAgent.indexOf('Opera')  != -1));

function oopsPopup() {
	var windowName = "oops";
	var URLtoOpen = "http://www.bebo.com/SkypePopup.jsp";
	var popW = 600, popH = 500;
	var scrollB = 'no';
	w = screen.availWidth;
	h = screen.availHeight;
	var leftPos = (w-popW)/2, topPos = (h-popH)/2;
	oopswindow = window.open(URLtoOpen, windowName,'width=' + popW + ',height=' + popH + ',scrollbars=' + scrollB + ',screenx=' +leftPos +',screeny=' +topPos +',top=' +topPos +',left=' +leftPos);
	return false;
}

if(typeof(detected) == "undefined" && activex) {
    document.write(
        ['<script language="VBscript">',
        'Function isSkypeInstalled()',
        'on error resume next',
        'Set oSkype = CreateObject("Skype.Detection")',
        'isSkypeInstalled = IsObject(oSkype)',
        'Set oSkype = nothing',
        'End Function',
        '</script>'].join("\n")
    );
}

function skypeCheck() {
    if(CantDetect) {
        return true;
    } else if(!activex) {
        var skypeMime = navigator.mimeTypes["application/x-skype"];
        detected = true;
        if(typeof(skypeMime) == "object") {
            return true;
        } else {
            return oopsPopup();
        }
    } else {
        if(isSkypeInstalled()) {
            detected = true;
            return true;
        }
    }
    
    detected = true;
    return oopsPopup();
}