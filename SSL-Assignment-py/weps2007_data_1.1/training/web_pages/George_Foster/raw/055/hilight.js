var NS4 = (document.layers);    // Which browser?
var IE4 = (document.all);
var n   = 0;


function findInPage(str) {
  var txt, i, found;
  if (str == "")
    return false;
  // Find next occurance of the given string on the page, wrap around to the
  // start of the page if necessary.
  if (NS4) {
    // Look for match starting at the current point. If not found, rewind
    // back to the first match.
    if (!mainitem.find(str))
      while(mainitem.find(str, false, true))
        n++;
    else
      n++;
    // If not found in either direction, give message.
    if (n == 0)
      alert("Not found.");
  }
  if (IE4) {
    txt = mainitem.document.body.createTextRange();
    // Find the nth match from the top of the page.
    for (i = 0; i <= n && (found = txt.findText(str)) != false; i++) {
      txt.moveStart("character", 1);
      txt.moveEnd("textedit");
    }
    // If found, mark it and scroll it into view.
    if (found) {
      txt.moveStart("character", -1);
      txt.findText(str);
      txt.select();
      txt.scrollIntoView();
      n++;
    }
    // Otherwise, start over at the top of the page and find first match.
    else {
      if (n > 0) {
        n = 0;
        findInPage(str);
      }
      // Not found anywhere, give message.
      else
        alert("Not found.");
    }
  }
  return false;
}

