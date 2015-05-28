/* webtrendsMETA v1.0 ssm */ 
function getMetaData(tagname, searchAtt, metaname, changeAtt, chValue) { 
 for (var i=0; i < document.getElementsByTagName(tagname).length; i++) {                  
  if (document.getElementsByTagName(tagname)[i].getAttribute(searchAtt) == metaname) {   
	 	  document.getElementsByTagName(tagname)[i].setAttribute(changeAtt, chValue);	  
	 }
 }
}

function getResults(tagname, searchAtt, chAtt) { 
 for (var i=0; i < document.getElementsByTagName(tagname).length; i++) {
  if (document.getElementsByTagName(tagname)[i].getAttribute("NAME") == chAtt) {
  }
  document.write("<br/>");
 } 
}
