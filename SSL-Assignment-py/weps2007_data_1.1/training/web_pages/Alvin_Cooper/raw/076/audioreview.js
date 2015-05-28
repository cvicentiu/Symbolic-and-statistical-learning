/*Tool Tip*/
var offsetfromcursorX=30 //Customize x offset of tooltip
var offsetfromcursorY=-60 //Customize y offset of tooltip

var offsetdivfrompointerX=15 //Customize x offset of tooltip DIV relative to pointer image
var offsetdivfrompointerY=14 //Customize y offset of tooltip DIV relative to pointer image

document.write('<div id="dhtmltooltip"></div>') //write out tooltip DIV
//document.write('<img id="dhtmlpointer" src="/channels/photoreview2/images/arrow2.gif">') //write out pointer image

var ie=document.all
var ns6=document.getElementById && !document.all
var enabletip=false

if (ie||ns6)
	var tipobj=document.all ? document.all["dhtmltooltip"] : document.getElementById ? document.getElementById("dhtmltooltip") : ""

//var pointerobj=document.all ? document.all["dhtmlpointer"] : document.getElementById ? document.getElementById("dhtmlpointer") : ""

function ietruebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function ddrivetip(thetext, thewidth, thecolor, position){
	if (ns6||ie){
		if (typeof thewidth!="undefined") tipobj.style.width = thewidth+"px";
		if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor;
		
		//Create a doc for the div tag passed
		docDivDesc = document.getElementById('Description' + position);
		prodDesc = document.getElementById('prodDesc' + position);
		
		str = prodDesc.innerHTML.substring(0,100);
		str = str.substring(0,str.lastIndexOf(' '));
		prodDesc.innerHTML = str + '...';
		
		
		//Inject HTML to the tipobj
		tipobj.innerHTML= docDivDesc.innerHTML;
		enabletip=true;
		return false;
		
		
	}
}

// called from Review listing control
//dont use this.  where does mazda 3 come from?? hardcoded productids?? 
function PostFlagReview_OLD(intReviewID, strReviewDate) 
{
	var strExtraData = "Product Name = Mazda 3<br>\n";
	strExtraData += "ProductID = 292493<br>\n";
	strExtraData += "ReviewID = " + intReviewID + "<br>\n";
	strExtraData += "URL = PRD_292493_1531crx.aspx<br>\n";
	strExtraData += "Review Date = " + strReviewDate;
	strExtraData += "\n<br><br><a href=\"http://www.audioreview.com/tools/EditReview.aspx?ReviewID=" + intReviewID + "\">Click to Edit Review!</a>\n";
	document.FlagForm.ExtraData.value = strExtraData;
	document.FlagForm.submit();
}

function positiontip(e){
	if (enabletip){
			var nondefaultpos=false
			var curX=(ns6)?e.pageX : event.clientX + ietruebody().scrollLeft;
			var curY=(ns6)?e.pageY : event.clientY + ietruebody().scrollTop;
			
			//Find out how close the mouse is to the corner of the window
			var winwidth  = ie&&!window.opera? ietruebody().clientWidth : window.innerWidth-20;
			var winheight = ie&&!window.opera? ietruebody().clientHeight : window.innerHeight-20;

			var rightedge  = ie&&!window.opera? winwidth-event.clientX-offsetfromcursorX : winwidth-e.clientX-offsetfromcursorX;
			var bottomedge = ie&&!window.opera? winheight-event.clientY-offsetfromcursorY : winheight-e.clientY-offsetfromcursorY;

			var leftedge=(offsetfromcursorX<0)? offsetfromcursorX*(-1) : -1000;

			//if the horizontal distance isn't enough to accomodate the width of the context menu
			if (rightedge<tipobj.offsetWidth){
				//move the horizontal position of the menu to the left by it's width
				tipobj.style.left=curX-tipobj.offsetWidth+"px";
				nondefaultpos=true;
			}
			else if (curX<leftedge)
				tipobj.style.left="5px";
			else{
				//position the horizontal position of the menu where the mouse is positioned
				tipobj.style.left=curX+offsetfromcursorX-offsetdivfrompointerX+"px";
				//pointerobj.style.left=curX+offsetfromcursorX+"px";
			}
			
			
			//same concept with the vertical position
			
			if (bottomedge < tipobj.offsetHeight){
				//pointer is on bottom
				if(( bottomedge - winheight) < -300){

					tipobj.style.top = curY-tipobj.offsetHeight - (offsetfromcursorY + 80)+ "px";
					nondefaultpos=true;
				}else{

					tipobj.style.top = curY-tipobj.offsetHeight - (offsetfromcursorY - 180) + "px";
					nondefaultpos=true;
				}
			}else{
				//pointer is on top
				if(( bottomedge - winheight) > -300){

					tipobj.style.top=curY+offsetfromcursorY + (offsetfromcursorY + 140)+ "px";
					//pointerobj.style.top=curY+offsetfromcursorY+"px";
					
				}else{

					tipobj.style.top=curY+offsetfromcursorY + (offsetfromcursorY - 60)+ "px";
					//pointerobj.style.top=curY+offsetfromcursorY+"px";
				}
			}
			
			
			tipobj.style.visibility="visible";
			//if (!nondefaultpos)
				//pointerobj.style.visibility="visible";
				
			//else
				//pointerobj.style.visibility="hidden";
	}
}

function hideddrivetip(){
	if (ns6||ie){
		enabletip=false;
		tipobj.style.visibility="hidden";
		//pointerobj.style.visibility="hidden";
		tipobj.style.left="-1000px";
		tipobj.style.backgroundColor='';
		tipobj.style.width='';
	}
}

document.onmousemove=positiontip;

/*End Tool Tip*//* Header */function Search(obj){
	
	var rootdomain="http://"+window.location.hostname
	if(obj.value != '' || obj.value != null){
		var pattern = /&/g;
		strKey = obj.value.replace(pattern, " and ");
		document.location.href = rootdomain + '/befid-3/keyword-' + escape(strKey) + '/searchcrx.aspx';
		return;
	}
}
function MM_preloadImages() { //v3.0  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}}function MM_swapImgRestore() { //v3.0  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;}function MM_findObj(n, d) { //v4.01  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);  if(!x && d.getElementById) x=d.getElementById(n); return x;}function MM_swapImage() { //v3.0  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}}/* End Header *//* vvv SDC Product List Page vvvv*/function SDC_GoPage(){
                var strhost = window.location.host;
                var pattern = /gotopage/g;

                return {
                    validate : function(pagevars,textobj, iMaxValue){

                        //Check if a number is entered
                        if(parseInt(textobj.value)){
                        
                            var pageValueEntered = parseInt(textobj.value);

                            //Check for page max
                            if(pageValueEntered > iMaxValue || pageValueEntered < 0){
                              alert('Enter a number less than ' + iMaxValue +' and greater than zero.');
                            }else{
                              this.gotopage(pagevars, pageValueEntered)
                            }

                        }else{
                            alert('Please Enter a Number.test');
                        }
                   
                    },
                    
                    gotopage : function(pagevars,pageValueEntered){
                       var strURL = window.location.host + '' + pagevars;
                      window.location.href =  'http://' + strURL.replace(pattern, pageValueEntered);
                    }
                }
                
              };

/*^^^ SDC Product List Page ^^^*/