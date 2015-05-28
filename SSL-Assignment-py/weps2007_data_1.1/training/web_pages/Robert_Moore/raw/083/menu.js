function buildArray2() {
  var b = buildArray2.arguments;
  for (i=0; i<b.length; i++) {
    this[i] = b[i];
  }
  this.length = b.length;
}

var uvrls1 = new buildArray("",
"amazocat.htm",
"mworderf.htm",
"amaztape.htm",
"azspirit.htm",
"amazgend.htm",
"amazheal.htm",
"amazsex.htm",
"amazreln.htm",
"amazjung.htm",
"azspirit.htm#spirituality",
"amazboys.htm",
"amazfath.htm",
"batbooks.htm",
"datevbooks.htm",
"sexabook.htm",
"amazbly.htm",
"azchinen.htm",
"azestes.htm",
"azfarrel.htm",
"azgurian.htm",
"azhillma.htm",
"amazlee.htm",
"azmeade.htm",
"azrjohns.htm",
"azrmoore.htm",
"azwoodma.htm");

function go2(which, num, win) {
  n = which.selectedIndex;
  if (n != 0) {
    var url = eval("uvrls" + num + "[n]")
    if (win) {
      openWindow(url);
    } else {
      location.href = url;
    }
  }
}


function buildArray() {
  var a = buildArray.arguments;
  for (i=0; i<a.length; i++) {
    this[i] = a[i];
  }
  this.length = a.length;
}

var urls1 = new buildArray("",
"articles.htm",
"rasample.htm",
"amazocat.htm",
"origivu.htm",
"menstory.htm",
"poetpage.htm",
"getstart.htm",
"artimyth.htm",
"gendjust.htm",
"books.htm",
"natlcal.htm",
"anger.htm",
"mengrief.htm",
"depressn.htm",
"http://www.batteredmen.com/index.htm",
"http://www.batteredmen.com/dateviol.htm",
"sexabupg.htm",
"mensheal.htm",
"spiritul.htm",
"relnship.htm",
"boys.htm",
"fathers.htm",
"fatherin.htm",
"whatsnew.htm",
"whathere.htm");

function go(which, num, win) {
  n = which.selectedIndex;
  if (n != 0) {
    var url = eval("urls" + num + "[n]")
    if (win) {
      openWindow(url);
    } else {
      location.href = url;
    }
  }
}