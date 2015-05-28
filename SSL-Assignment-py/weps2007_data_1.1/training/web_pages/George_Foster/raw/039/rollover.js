// This debug variable is set to off (0) for production scripts.
// You can set it to on (1) for development purposes.        
	var debug = 0;        
	var n3 = (((navigator.appName == "Netscape") && (parseInt(navigator.appVersion) >= 3 )) || ((navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4 )));    

/**  
  * Use this to toggle the debug on or off.  
  *   * Put it in your source code like this:  
  *               <a href="javascript:toggleDebug();">Debug</a>   
  *  
  */  
  function toggleDebug() {    
	if (debug == 1)         
		debug = 0;    
	else         
		debug = 1;  
  }          
  
/**    
  * Turns the value of "thing" into either 0 or 1 based on these rules:    
  * String:    
  *         "on"        = 1    
  *         "true"      = 1    
  *         "1"         = 1    
  *             "off"   = 0    
  *                     "false" = 0    
  *                     "0"     = 0    
  *     
  */  
  function normalize(thing) {                             
	type = typeof thing;                            
	if ( type == "number") {        
		return thing;    
	}                             
	
	if ( type == "string") {                                 
		if (thing == "on" || thing == "1" || thing == "true") {         
			return 1;               
		} else {            
			return 0;        
		}    
	}                     
	
	return 0;  
  }                  
  
  /**    
    * Switches the image whose name is "name" into either an on, or off state.    
    *     
    * Example:    
    *    In this example, an image with a file name of "button1.gif" is set to    
    *    would be specified like this:    
    *      
    *    HTML CODE:      
    *             <a href="index.html" onMouseOver="flip('button1', 'on');" onMouseOut="flip('button1', 'off');">    
    *                     <img name="button1" src="button1.gif">    
    *                     </a>    
    *    
    * Notes:     
    *    
    * The IMG tag should have a name= attribute.  This    
    *      is the same name passed in the parameter name parameter    
    *    
    * The state can be any of "on"/"off", "1"/"0", "true"/"false"    
    *    
    * The image file name should for the "ON" state should have the    
    *      string "_over" appended to the end of the name but before the     
    *      period for the extension.  i.e.,    
    *        OFF state image:  button1.gif    
    *        ON  state image:  button1_over.gif    
    *    
    */                                    
    function flip( name, state ) {                                                
	if (!n3) return false;                                                
	// is there is no image with that name, then                        
	// if debugging is on, tell the programmer                        
	// exit gracefully.                                                
	if (document.images[name] == null) {                                
		if (debug == 1) {                                        
			alert("Error: Cannot change the image named: " + name + "\n\t* Make sure the image is in the document\n\t* Make sure the IMG tag has a NAME attribute.")                                
		}                                
		return false;                        
	}                                                
	// get the name of the image                        
	oldname = document.images[name].src                                                
	newName = "";                                                
	if (normalize(state) == 0) {                                 
		//alert("State is off");                                
		if (oldname.lastIndexOf("_over") != -1) {                                        
		newName = oldname.substring(0, oldname.lastIndexOf("_over"));                                        
		extension = oldname.substring(oldname.lastIndexOf(".", oldname.length));                                        
		//alert("Extracted Name: " + newName + "\n\tExtension: " + extension + "\n\tNew Name: " + newName + extension);                                        
		newName = newName + extension;                                
	} else {                                        
		newName = oldname;                                
	}                                
	document.images[name].src = newName;                                
	return true;                        
    } else {                                
	//alert("State is on");                                                                
	newName = oldname.substring(0, oldname.lastIndexOf("."));                                
	extension = oldname.substring(oldname.lastIndexOf("."), oldname.length);                                
	//alert("Extracted name is: " + newName + "\n\tExtension is: " + extension + "\n\tNew Name is: " + newName + "_over" + extension);                                                        
	newName = newName + "_over" + extension;                                                                
	document.images[name].src = newName;                                            
	return true;                            
	}                                                
	return false;                
    }                        
    /**          
      * Function to pre-load the images necessary for rollover.          
      * This is never called by the user, so disregard it.          
      *          
      */        
    function preloadImages() {                                          
	if (!n3) return;                                        
	count = preloadImages.arguments.length;                                
	for (i = 0; i < count; i++) {                        
		this[i] = new Image();                        
		this[i].src = preloadImages.arguments[i];                
	}        
    }
