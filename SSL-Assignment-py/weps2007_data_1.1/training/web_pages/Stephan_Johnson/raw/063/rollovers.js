<!--

var name = null;

  function imageChange(id)
     {
     		var img=document.getElementById(id).src;
     		var l=img.length;
     		var name=img.substring(0, l-4);
     		var ext=img.substring(l-4, l);
     		document.getElementById(id).src =name + "_over" + ext;
     }

  function resetChange(id)
     {
     		var img=document.getElementById(id).src;
     		var l=img.length;
     		var name=img.substring(0, l-9);
     		var ext=img.substring(l-4, l);
     		document.getElementById(id).src =name + ext;
     }
	
	// Netscape reload JavaScript
	function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);


// -->