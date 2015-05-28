// Write the top of each Web page in the genealogy
  var firstfield = "";
  var aT="@";
  var m2="mailto:";

  function eM(a1,a2){eMwin=window.open(m2+a1+aT+a2,"eMw"); eMwin.close(); return}
//<a href=JavaScript:eM("Walter","Gilbert.name")>Mail me</a>.

  function w(str){document.writeln(str)}

w('</head>');
//w('<body bgcolor=#FFFFF8>');
w('<body background=../jpeg/parchment.jpg>');
w('<table width=75% border=10 align=center><tr><td>');
w('<tr><td bgcolor=#C0C0FF align=center><font size=+2 color=red><i>The Genealogy of Walter Gilbert</i></font><br><hr>');
w(title+'<br><hr>');
if (name1 != "") w(' <font size=+2>'+name1+'</font><br>');
if (name2 != "") w(' <font size=+2>'+name2);
w('</td></tr>');
w('</table>');
w('<br><p>');

// Calc. on which tree page this ancestor belongs

  t8 = new Array();
  for(i=0; i<7; i++){t8[i] = 2*Math.pow(8,i)};  //1, 8, 64, 512,...
  id = 2*Math.floor(parseInt(fullid)/2);
  for(i=1; i<7; i++) if(id < t8[i]) break; 
  for(j=1; j<4; j++){
    if(id < t8[i-1]) break;
    id = Math.floor(id/2)}
  strid = "00000000"+id;
  strid = "t"+strid.substring(strid.length-7,99)+".htm"

// Write out the little window with links to either
//   (if no frames) The pedigree tree entry for this person (or ancestor) and the index page
//   (if in frames) Only the pedigree tree entry for this person (or ancestor)

w('<table align=right border=10 cellpadding=5><tr><td align=center>');
if (parent.frames.length == 0)
  w('<a href=genindex.htm target=_new>Full Index</a><hr>');
w("Ancestral tree".link(strid)+'</td></tr></table>');

