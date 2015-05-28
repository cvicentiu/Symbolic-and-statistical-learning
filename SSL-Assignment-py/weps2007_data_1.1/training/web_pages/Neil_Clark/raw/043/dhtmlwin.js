	var bShow = false;
	var	fixedX = -1			// x position (-1 if to appear below control)
	var	fixedY = -1			// y position (-1 if to appear below control)	
	var crossobj, ctlNow, iframeobj;
	var	dom=document.getElementById;
	var ie4=document.all;
	var ns6=document.getElementById&&!document.all	
	var disappeardelay=400  //menu disappear speed onMouseout (in miliseconds)	

	if (dom)
	{ 
        document.write ("<iframe id='DivShim' src='javascript:false;' scrolling='no' frameborder='0' style='position:absolute; top:0px; left:0px; display:none;'></iframe>");		
	}	
	
	function iecompattest(){
		return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
	}
	
	function getAbsX(elt) { return (elt.x) ? elt.x : getAbsPos(elt,"Left"); }
	function getAbsY(elt) { return (elt.y) ? elt.y : getAbsPos(elt,"Top"); }
	function getAbsPos(elt,which) {
		iPos = 0;
		while (elt != null) {
		iPos += elt["offset" + which];
		elt = elt.offsetParent;
		}
		return iPos;		
	}	
	
	
	function getElem(elem_name) {
	    var elem = (document.getElementById)?document.getElementById(elem_name) : document.all? eval('document.all.'+elem_name) : eval('document.'+elem_name);    
	    return elem;
	}
	
	
	function getPosOffset(what, offsettype){
	    var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
	    var parentEl=what.offsetParent;
	    while (parentEl!=null){
	        totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
	        parentEl=parentEl.offsetParent;
	    }
	    return totaloffset;
	}
	
	
	function CheckBrowserEdge(srcobj, destobj, whichedge){
	    var edgeoffset=0
	    if (whichedge=="rightedge"){
	        var windowedge=ie4 && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
	        var measure = destobj.offsetWidth
	        if (windowedge-destobj.x < measure)
	         edgeoffset=measure-srcobj.offsetWidth
	    }
	    else{
	        var topedge=ie4 && !window.opera? iecompattest().scrollTop : window.pageYOffset
	
	        var windowedge=ie4 && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
	        var measure = destobj.offsetHeight
	        //alert(destobj.offsetHeight);
	        if (windowedge-destobj.y < measure){ //move up?
	            edgeoffset=measure+srcobj.offsetHeight
	            if ((destobj.y-topedge)<measure) //up no good either?
	                edgeoffset=destobj.y+srcobj.offsetHeight-topedge
	        }
	    }
	    return edgeoffset
	}
	
	


	function hidedynwin()	{
		var elem = getElem("dynwin");
		elem.style.display="none";
		DivIframeCover(false);
	}


	

	function popupDynWin(elemid,offx,offy) {
		var	leftpos=0
		var	toppos=0

		crossobj = getElem("dynwin");
		if ( crossobj.style.display == "none" ) {
            var srcobj = getElem(elemid);
            crossobj.style.display="block";	     
            crossobj.x=getAbsX(srcobj)+offx
            crossobj.y=getAbsY(srcobj)+offy	   
            crossobj.style.left=crossobj.x+"px"
            crossobj.style.top=crossobj.y+srcobj.offsetHeight+"px"					            
			DivIframeCover(true);
		}
		else {
			crossobj.style.display="none";			
		}
		
	}

	document.onkeypress = function hidecal1 () { 
		if (event.keyCode==27) 
		{
			hidedynwin()
		}
	}
	/*document.onclick = function hidecal2 () { 		
		if (!bShow)
		{
			//hidedynwin()
		}
		bShow = false
	}*/
	
	
	
	
	var delayshow;
	function initPopupDynWin(elemid,offx,offy){
		if (ie4||ns6)
		delayshow=setTimeout("popupDynWin('"+elemid+"',"+offx+","+offy+")",disappeardelay)
	}
	
	function clearshowmenu(){
		if (typeof delayshow!="undefined")
		clearTimeout(delayshow)
	}		

	
	
	
	function dynamichide(e){
		var winobj = getElem('dynwin');
		if (ie4&&!winobj.contains(e.toElement)) {
			delayhidemenu()
		}	
		else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget)) {
			delayhidemenu()
		}	
	}
	
	
	var delayhide;
	function delayhidemenu(){
		if (ie4||ns6)
		delayhide=setTimeout("hidedynwin()",disappeardelay)
	}
	
	function clearhidemenu(){
		if (typeof delayhide!="undefined")
		clearTimeout(delayhide)
	}	
	
	
	function contains_ns6(a, b) {
		while (b.parentNode)
		if ((b = b.parentNode) == a)
		return true;
		return false;
	}	
	
			
     function DivIframeCover(state)
      {
       var DivRef = document.getElementById("dynwin");
       var IfrRef = document.getElementById('DivShim');
       if(state)
       {
        DivRef.style.display = "block";
        IfrRef.style.width = DivRef.offsetWidth-5;
        IfrRef.style.height = DivRef.offsetHeight-5;
        IfrRef.style.top = DivRef.style.top;
        IfrRef.style.left = DivRef.style.left;
        IfrRef.style.zIndex = DivRef.style.zIndex + 1;
        DivRef.style.zIndex += 1;
        IfrRef.style.display = "block";
       }
       else
       {
        DivRef.style.display = "none";
        IfrRef.style.display = "none";
       }
      }					
				
