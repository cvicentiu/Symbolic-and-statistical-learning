// user set constants
var bdmDelay = 500, bdmMenuCount = 1;
// browser detect
if (document.getElementById && document.all) {
  document.write ("<SCR" + "IPT language='JavaScript' src='js/bdmcode.js'><\/SCR" + "IPT>");
  document.write ("<SCR" + "IPT language='JavaScript' src='js/bdmData.js'><\/SCR" + "IPT>");
}
else {
  function bdmTitleOver () { return false };
  function bdmTitleOut () { return false };
}

