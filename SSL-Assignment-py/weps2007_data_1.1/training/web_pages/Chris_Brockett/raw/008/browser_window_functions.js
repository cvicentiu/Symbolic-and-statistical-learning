
function launchWindow(strURL) {
    var strWINDOW_ID = "win_" + new Date().getTime().toString();
    window.open(
        strURL, 
        strWINDOW_ID, 
        "resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no"
    );
}

function openWindow(strURL, pixW, pixH, blnSB)
{
    var strSB = "no"
    strLocation = strURL;
    strWHandle = "UDWIN";
    if (blnSB) {strSB = "yes"};
    strProps = "resizable=yes,scrollbars=" + strSB + ",toolbar=no,location=no,directories=no,status=no,menubar=no,width=" + pixW + ",height=" + pixH + ",top=10,left=10";
    window.open(strLocation, strWHandle, strProps);
}

function configureWindow(pixW, pixH, pixX, pixY) {
    var pixSH = ((window.screen != null) && (window.screen.height != null)) ? window.screen.height : 580;
    pixSH = pixSH - (pixY * 2);
    if ((pixH == -1) || (pixH > pixSH)) {
        pixH = pixSH;
    }
    window.resizeTo(pixW, pixH);
    window.moveTo(pixX, pixY);
}

