
function openPopUpWindow(strURL, pixW, pixH, blnSB)
{
    var strSB = "no"
    strLocation = strURL;
    strWHandle = eval("UD_WINDOW:" + new Date().getSeconds());
    if (blnSB) {strSB = "yes"};
    strProps = "resizable=no,scrollbars=" + strSB + ",toolbar=no,location=no,directories=no,status=no,menubar=no,width=" + pixW + ",height=" + pixH + ",top=10,left=10";
    window.open(strLocation, strWHandle, strProps);
}
