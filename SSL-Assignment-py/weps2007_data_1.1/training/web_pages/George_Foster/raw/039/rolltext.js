/**
  * Flip text
  *
  */


var rolltext_dir = "";
  
function rolltext(name, source) {
	
	if (!n3) return false;
	
	if (document.images[name] == null) {
		if (debug == 1) {
			alert("Error: Cannot change the image named: " + name + "\n\t");
		}
		return false;
	}
	
	 // get the name of the image
	oldname = document.images[name].src

	dirname = oldname.substring(0, oldname.lastIndexOf("/"));
	newname = dirname + "/" + source;
	document.images[name].src = newname;
	//alert("Directory: " + dirname + "\n\nNew Name: " + newname);
	
			
	return true;
}
		
