function a_fam(id,title)
{ document.write('<a href="../fam_html/' + id + '.htm#begin" title="' + title + '" onmouseover="window.status=' + "'Family " + id.toUpperCase() + "'" + ';return true" onmouseout="window.status=' + "''" + '">');
}
function a_sour(id,title)
{ document.write('<a href="#" title="' + title.toUpperCase() + '" onmouseover="window.status=' + "'Source " + id.toUpperCase() + "';return true" + '" onmouseout="window.status=' + "''" + '" onclick="window.open(' + "'../sour_html/" + id + ".htm#begin','source','width=1,height=1,left='+event.screenX+',top='+event.screenY+'');return false" + '">');
}
function a_note(id,title)
{ document.write('<a href="#" title="' + title + '" onmouseover="window.status=' + "'Note " + id.toUpperCase() + "';return true" + '" onmouseout="window.status=' + "''" + '" onclick="window.open(' + "'../note_html/" + id + ".htm#begin','note','width=1,height=1,left='+event.screenX+',top='+event.screenY+'');return false" + '">');
}
function a_multimedia(filename,title)
{ document.write('<a href="#" title="' + title + '" onmouseover="window.status=' + "'Photo'" + ';return true" onmouseout="window.status=' + "''" + '" onclick="window.open(' + "'../multimedia/" + filename + "#begin','multimedia','width=1,height=1');return false" + '">');
}
function a_index(filename)
{ document.write('<a href="../indexes/' + filename + '#begin" onmouseover="window.status=' + "'Index'" + ';return true" onmouseout="window.status=' + "''" + '">');
}
function a_logo()
{ document.write('<a href="#" onmouseover="window.status=' + "'GEDvisual Homepage'" + ';return true" onmouseout="window.status=' + "''" + '" onclick="window.open(' + "'http://www.gedvisual.com','gedvisual');return false" + '">');
}
function a_legend(width,height)
{ document.write('<a href="#" onmouseover="window.status=' + "'Legend';return true" + '" onmouseout="window.status=' + "''" + '" onclick="lgnd=window.open(' + "'legend.htm#begin','legend','width=" + width + ",height=" + height + ",left='+event.screenX+',top='+event.screenY+'');return false" + '">');
}
function img_faml()
{ document.write('<img src="../layout/arrow_left.gif" height="32" width="32" border="0">');
}
function img_famr()
{ document.write('<img src="../layout/arrow_right.gif" height="32" width="32" border="0">');
}
function img_sour()
{ document.write('<img src="../layout/link_source.gif" height="9" width="9" hspace="2" border="0">');
}
function img_note()
{ document.write('<img src="../layout/link_note.gif" height="9" width="9" hspace="2" border="0">');
}
function img_multimedia(filename)
{ document.write('<img src="../multimedia/' + filename + '" border="0">');
}
function img_index()
{ document.write('<img src="../layout/button_index.gif" height="32" width="32" border="0">');
}
function img_logo()
{ document.write('<img src="../layout/gedvisual.gif" border="0">');
}
function go_f()
{ var page = document.form.flist.options[document.form.flist.selectedIndex].text;
  if (page != 'Family')
  { page = '../fam_html/' + page.toLowerCase() + '.htm#begin';
    window.open(page,'main');
  }
}
function go_i()
{ var page = document.form.ilist.options[document.form.ilist.selectedIndex].value;
  var anchor = document.form.ilist.options[document.form.ilist.selectedIndex].text;
  if (anchor != 'Individual')
  { page = '../fam_html/' + page.toLowerCase() + '.htm#' + anchor.toLowerCase();
    window.open(page,'main');
  }
}
function go_s()
{ var page = document.form.slist.options[document.form.slist.selectedIndex].text;
  if (page != 'Source')
  { page = '../sour_html/' + page.toLowerCase() + '.htm#begin';
    window.open(page,'source','width=10,height=10');
  }
}
function go_n()
{ var page = document.form.nlist.options[document.form.nlist.selectedIndex].text;
  if (page != 'Note')
  { page = '../note_html/' + page.toLowerCase() + '.htm#begin';
    window.open(page,'note','width=10,height=10');
  }
}