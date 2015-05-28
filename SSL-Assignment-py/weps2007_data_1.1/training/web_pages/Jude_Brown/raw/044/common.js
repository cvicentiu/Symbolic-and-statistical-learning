function openWin(image,title)
{
	aWindow=window.open("img_large.php?img="+image+"&title="+title,"","toolbar=no,width=400,height=400,status=no,scrollbars=no,resize=no,menubars=no");
	aWindow.focus();
}

function openWin2(url,w,h)
{
	aWindow=window.open(url,"","toolbar=no,width="+w+",height="+h+",status=no,scrollbars=no,resize=no,menubars=no");
	aWindow.focus();
}
function openWin3(url,w,h,title)
{
	aWindow=window.open(url,"","toolbar=no,width="+w+",height="+h+",status=no,scrollbars=yes,resize=no,menubars=no");
	aWindow.focus();
}


function openLargeImage(url)
{
	aWindow=window.open(url,"","toolbar=no,width=400,height=400,status=no,scrollbars=no,resize=no,menubars=no");
	aWindow.focus();
}

function openBookmark(aURL)
{
	aWindow=window.open(aURL,"","toolbar=no,width=400,height=100,status=no,scrollbars=no,resize=no,menubars=no");
	aWindow.focus();
}
function openVideo(aURL)
{
	aWindow=window.open(aURL,"","toolbar=no,width=400,height=400,status=no,scrollbars=no,resize=no,menubars=no");
	aWindow.focus();
}
function openMatchUs(aURL)
{
	aWindow=window.open(aURL,"","toolbar=no,width=400,height=200,status=no,scrollbars=no,resize=no,menubars=no");
	aWindow.focus();
}
function submitFormTA() 
{
	updateRTE('ta');
	return true;
}
function setImage(string) 
{
	document.getElementById('previewImage').src = 'File:\/\/' + string;
}

function checkSelectedOption(value,form,warning)
{
	if( value != -1 )
	{
		form.catid.value = value;
		form.submit();
	}
	else
	{
		alert(warning);
	}
}
function previewImage(string)
{		
	document.getElementById('previewImage').src = 'File:\/\/' + string;	
}
function previewImageServer(string)
{		
	if (string=="")
		document.getElementById('previewImage').src = "../catimages/blank.gif";	
	else
		document.getElementById('previewImage').src = "../catimages/" + string;	
}
isNS4 = (document.layers) ? true : false;
isIE4 = (document.all && !document.getElementById) ? true : false;
isIE5 = (document.all && document.getElementById) ? true : false;
isNS6 = (!document.all && document.getElementById) ? true : false;

function switchDiv(strDivName,bolVisible){

 //identify the element based on browser type
 if (isNS4) {
   objElement = document.layers[strDivName];
 } else if (isIE4) {
   objElement = document.all[strDivName];
 } else if (isIE5 || isNS6) {
   objElement = document.getElementById(strDivName);
 }
 
 if(isNS4){
     if(!bolVisible) {
       objElement.visibility ="hidden"
     } else {
       objElement.visibility ="visible"
     }     
 }else{
     if(!bolVisible) {
       objElement.style.visibility = "hidden";
     } else {
       objElement.style.visibility = "visible";
     }
 }
}


function removeall(checkboxId)
{
  
	var the_box = eval("window.document.itemForm." + checkboxId);
	for (var i=0;i<the_box.length;i++) 
	{
		the_box[i].checked=false;
  	}
  	the_box[0].checked=true;
}

function resetfirst(checkboxId)
{
  	var the_box = eval("window.document.itemForm." + checkboxId);
  	the_box[0].checked=false;
}

function collapse_all (n_index, n_depth) {
	var o_tree = TREES[n_index ? n_index : 0];
	if (!n_depth) n_depth = 1;
	if (!o_tree)
		alert("Tree is not initialized yet");
	var a_nodes = o_tree.a_nodes;
	for (var i = a_nodes.length - 1; i >= 0; i--)
		if (a_nodes[i].n_depth >= n_depth && a_nodes[i].open)
			a_nodes[i].open(1, 1);
	o_tree.ndom_refresh();
}
function expand_all (n_index, n_depth) {
	var o_tree = TREES[n_index ? n_index : 0];
	if (!o_tree)
		alert("Tree is not initialized yet");
	var a_nodes = o_tree.a_nodes;
	for (var i = 0; i< a_nodes.length; i++)
		if (n_depth == null || a_nodes[i].n_depth <= n_depth)
			a_nodes[i].open(0, 1);
	o_tree.ndom_refresh();
}
