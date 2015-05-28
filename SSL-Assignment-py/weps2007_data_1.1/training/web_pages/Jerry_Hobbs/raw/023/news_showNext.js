function createRequest(){
	var request;
	try { request = new XMLHttpRequest(); } catch (e) {
	try { request = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
	try { request = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
		request = false;
	}}}
		
	return request;
}

function getNextStory(curStory,RSS,sname){
  
  var currentStoryID = curStory; // This is the Current Story ID from the referring page. use 213579 to test for last index.
  var rssID = RSS; // Which RSS feed to load.
		// var pageType = pageType;  //Pagetype: STORY link or WIRES. 'this is no longer needed.
  var sectionName = sname; // Determines which is the main section index page.
  
  var req = createRequest();
  
	  //alert("/xmlfeed/rss/0,4313," + RSS + ",00.rss"); //DEBUG CODE
	   //req.open("GET","/xmlfeed/rss/test.rss",true); //DEBUG CODE  
  req.open("GET","/xmlfeed/rss/0,4313," + RSS + ",00.rss",true); //Get RSS feed based on Section ID
  req.onreadystatechange = function(){
	if(req.readyState == 4){
	   if(req.status == 200){
		
		var doc = req.responseXML;
		var linkArray = doc.getElementsByTagName("link");
		
		var xmlLinks = "||";
		var getStoryID;
		var nextStoryLink;
		var bisCurrentMatch;
		var newsSection = "story";
		var bRSSdataReady;

	if(linkArray.length <= 0) { //Validates if RSS data is live and available.
		bRSSdataReady = false;
		nextStoryLink = parseSectionName(sectionName);
		
	} else {
		bRSSdataReady = true;
	}


	if(bRSSdataReady != false){
		for(var i=0; i<linkArray.length;i++){
		   //alert(linkArray[i].firstChild.data);
		   
		   if(linkArray[i].firstChild.data.indexOf("http://") != -1){ /* This validates RSS data availability */
		   	xmlLinks += linkArray[i].firstChild.data.toString() + "||";
		   }
		}
	 
		   xmlLinks = xmlLinks.split("||");
		   
		   for(var i=0; i<xmlLinks.length;i++){
		       getStoryID = xmlLinks[i].split(",",3);
				
			  if(currentStoryID == getStoryID[2]){

				/* store the location of the next story */
				nextStoryLink = xmlLinks[(i+1)];
				bisCurrentMatch = true;
				break;

			   } else{
			   	
			   	//alert("no match"); //DEBUG CODE
			   	bisCurrentMatch = false; 
				//break;
			   	 
		    	}
		   }
	  }
		   
						

		   	///// NAVIGATE TO CORRECT STORY PAGE /////////
		   
		   if(bisCurrentMatch == true){
		   	/* ok to navigate */
			
		   	if(nextStoryLink != ""){
		   	    /* OK to navigate to the next story */
		   	   //alert("OK to navigate =" + nextStoryLink); //DEBUG CODE
		   	   navigateStory(nextStoryLink);	
		   	   
			   	} else {
			   	   /* Start over in main section INDEX page */
			   	   //alert("Start over to INDEX = " + parseSectionName(sectionName)); //DEBUG CODE
				   navigateStory(parseSectionName(sectionName)); 
			   
		   			}
		   	
		   }else {
		   	
		   	 //bisCurrentMatch=false; //User came from an older story not in RSS, assign a current RSS story */
		   	 
////////////////////////////// TRAP BROKEN LINKS //////////////////////////////////////			
				
					   for(var j=0; j<xmlLinks.length;j++){ //Reset and Loop through to find the good link.
							
						 if(xmlLinks[j] != "" && xmlLinks[j].indexOf(newsSection) > 0){ //Validate
							nextStoryLink = xmlLinks[j];
							break;
						 } 
							//navigateStory(parseSectionName(sectionName)); //Return to the Main Section Front page.
							//break;
							
						}

///////////////////////////////////////////////////////////////////////////////////////////			 
			 
		   	  //alert("start over link is=" + nextStoryLink); //DEBUG CODE
    	      navigateStory(nextStoryLink);
		   }
	    }
	  
	  }
	}
  req.send(null);
}

function navigateStory(link){
   window.location = link;
}

function parseSectionName(str) {
	var input = str.toLowerCase();
	var baseURL = "http://www.foxnews.com";

	switch(input)
	{
	case "u.s.":
	  input = "us";
	  break    

	case "tech" :
	  input = "technology"
	  break

   } 
	return baseURL + "/" + input + "/index.html";
}


