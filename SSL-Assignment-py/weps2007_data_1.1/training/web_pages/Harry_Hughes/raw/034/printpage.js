var da = (document.all) ? 1 : 0;
var pr = (window.print) ? 1 : 0;
var mac = (navigator.userAgent.indexOf("Mac") != -1);

// Function to initiate the print page option

function printPage(frame, arg) {
  if (frame == window) {
    printThis();
  } else {
    link = arg; // a global variable
    printFrame(frame);
  }
 // return false;
}

// Call the window.print() method
// If supported by the browser

function printThis() {
  if (pr) { // NS4, IE5
    window.print();
  } else if (da && !mac) { // IE4 (Windows)
    vbPrintPage();
  } else { // other browsers
    alert("Sorry, your browser doesn't support this feature.");
  }
}

// Function to print a frameset
// Not used to print press release page.

function printFrame(frame) {
  if (pr && da) { // IE5
    frame.focus();
    window.print();
    link.focus();
  } else if (pr) { // NS4
    frame.print();
  } else if (da && !mac) { // IE4 (Windows)
    frame.focus();
    setTimeout("vbPrintPage(); link.focus();", 100);
  } else { // other browsers
    alert("Sorry, your browser doesn't support this feature.");
  }
}

// Create a VB Script function for IE4 browsers.

if (da && !pr && !mac) with (document) {
  writeln('<OBJECT ID="WB" WIDTH="0" HEIGHT="0" CLASSID="clsid:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>');
  writeln('<' + 'SCRIPT LANGUAGE="VBScript">');
  writeln('Sub window_onunload');
  writeln('  On Error Resume Next');
  writeln('  Set WB = nothing');
  writeln('End Sub');
  writeln('Sub vbPrintPage');
  writeln('  OLECMDID_PRINT = 6');
  writeln('  OLECMDEXECOPT_DONTPROMPTUSER = 2');
  writeln('  OLECMDEXECOPT_PROMPTUSER = 1');
  writeln('  On Error Resume Next');
  writeln('  WB.ExecWB OLECMDID_PRINT, OLECMDEXECOPT_DONTPROMPTUSER');
  writeln('End Sub');
  writeln('<' + '/SCRIPT>');
}


