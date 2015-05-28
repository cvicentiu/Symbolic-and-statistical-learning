
function Search() { }

Search.getSuggestions = function(p0, callback)
{
    DWREngine._execute('/nge/servlet/dwr', 'Search', 'getSuggestions', p0, callback);
}

var awaiting=0;
var clashed=0;
var holdText="";

function findSuggestions(text) {
	if ((text==null)||(text.length<1)) {
		document.getElementById("suggestions").style.visibility="hidden";
		holdText="";
	} else {
		if (awaiting==0) {
			if ((text.length>=3)&&(text!=holdText)) {
				awaiting=1;
				performSearch(text);
			}
		} else {
			clashed = 1;
		}
	}
}

function shutdown() {
	document.getElementById("suggestions").style.visibility="hidden";
	holdText="";
	awaiting=0;
	clashed=0;
}

function performSearch(text) {
	clashed=0;
	holdText=text;
	Search.getSuggestions(text, handleSuggestions);
}

function handleSuggestions(results) {
	if (clashed==1) {
		var termText = document.getElementById("searchTerms").value;
		if (termText.length>=3) {
			performSearch(termText);
		} else {
			clashed=0;
			awaiting=0;
		}
	} else {
		var sd='<table border="0" cellpadding="0" cellspacing="0" width="100%">\n';
		if (results.length<=1) {
			sd+='<tr><td bgcolor="white" class="small"><i>No suggestions...</i></td>\n</tr>\n';
		} else {
			var ti=0;
			var te=0;
			var bg="#E7E7D7";
			if (results[1].indexOf('|')==-1) {
				sd+='<tr bgcolor="#666701"><td width="100%" id="pad" class="smallBold"><font color="white">&nbsp;Suggestions</font></td><td class="smallBold" id="pad"><a href="#" onClick="shutdown();" style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:10px; color:white; font-weight:bold; text-decoration:none">[x]</a></td>\n</tr>\n';
				te=1;
			}
			var oc='onClick="clicked=document.getElementById(\'searchTerms\'); clicked.value=this.cells[0].innerHTML; document.dwrSearch.sug.value=\'y\'; document.dwrSearch.submit();" ';
			for (i=1; i<results.length; i++) {
				if (bg=="#E7E7D7") {
					bg="white";
				} else {
					bg="#E7E7D7";
				}
				if ((ti==0)&&(results[i].indexOf('|')!=-1)) {
					sd+='<tr bgcolor="#666701"><td ';
					if (te==1) {
						sd+='colspan="2" ';
					}
					sd+='class="smallBold" id="pad"><font color="white">&nbsp;Matching Titles</font></td>';
					if (te==0) {
						sd+='<td class="smallBold" id="pad"><a href="#" onClick="shutdown();" style="Verdana, Arial, Helvetica, sans-serif; font-size:10px; color:white; font-weight:bold; text-decoration:none">[x]</a></td>';
					}
					sd+='\n</tr>\n';
					oc="";
					ti=1;
				}
				sd+='<tr ';
				sd+=oc;
				sd+='onMouseOver="doMouseOver(this);" onMouseOut="doMouseOut(this,\'';
				sd+=bg;
				sd+='\');" bgcolor="'+bg+'" ';
				sd+='>\n';
				
				sd+='<td colspan="2" id="pad" class="small" >';
				if (ti==1) {
					if (results[i].indexOf('+')==0) {
						sd+=results[i];
					} else {
						var pg="Article.jsp";
						if (results[i].charAt(0)!='h') {
							if (results[i].charAt(0)=='p') {
								pg="Destination.jsp";
							} else if (results[i].charAt(0)=='s') {
								pg="Feature.jsp";
							} else if (results[i].charAt(0)=='e') {
								pg="Gallery.jsp";
							}
						}
						
						sd+='<a href="'+pg+'?id='+results[i].substring(0,results[i].indexOf('|'))+'&sug=y">';
						sd+=results[i].substring(results[i].indexOf('|')+1)+'</a>';
					}
				} else {
					sd+=results[i];
				}
				sd+='</td>\n</tr>\n';
			}
			sd+='</table>\n';
		}
		
		elem=document.getElementById("suggestions");
		elem.innerHTML=sd;
		elem.style.top=findPosY(document.getElementById("searchTerms"));
		
		if ((parseInt(elem.style.top)+elem.offsetHeight)>(document.body.clientHeight+document.body.scrollTop)) {
			elem.style.top=(parseInt(elem.style.top)-((parseInt(elem.style.top)+elem.offsetHeight)-(document.body.clientHeight+document.body.scrollTop)))+"px";
		}
		
		elem.style.visibility="visible";
		awaiting=0;
	}
}

