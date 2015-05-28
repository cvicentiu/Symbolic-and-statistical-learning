// toggle visibility
function toggle( targetId ){
  if (document.getElementById){
  	target = document.getElementById( targetId );
    if (target.style.display == "none"){
    	target.style.display = "";
    }
    else {
        target.style.display = "none";
    }
    createCookie("help", targetId, 365);
  }
} 

function getActiveHelpBox() {
	on = document.getElementById('helpBoxOn');
	off = document.getElementById('helpBoxOff');
	
	if(on.style.display == 'none') {
		return 'helpBoxOff';
	}
	else return 'helpBoxOn';
}

