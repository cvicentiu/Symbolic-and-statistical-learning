with (document) {
    //onload = HideDivs;
    onmouseover = MouseOver;
    onmouseout = MouseOut;
}  

function DoNothing() {  //a do nothing function simply so as to get the <a href/> in the html
	window.status=''; 
}  

function HideDivs() {
 var tempColl;
 bName = navigator.appName;
 bVer = parseInt(navigator.appVersion);
 if (bName != "Netscape") { 
	tempColl = document.all.tags("DIV");     
        for (i=0; i<tempColl.length; i++){
         if (tempColl(i).className == "child") tempColl(i).style.display = "none";     
        }
        BranchExpand('MainMenu', 'i1', 'top','noswap'); 
 }
} 

function MouseOver() {
      var ElementSrc = window.event.srcElement;
      if (ElementSrc.className == "item")     {
         window.event.srcElement.className = "highlight";     
      }
}

function MouseOut() {
     var ElementSrc = window.event.srcElement;
     if (ElementSrc.className == "highlight")    {
        window.event.srcElement.className = "item";
    } 
}

function BranchExpand($1,$2,$3,swap) {
  var Expanda;
  var ExpandTree;
  var ExpandFolder;
  var ExpandChild;
  
  Expanda = eval($1 + $2 + "a");
  Expanda.blur();

  ExpandChild = eval($1 + "Child");
      if ($3 != "top"){
         //ExpandTree = eval($1 + "Tree");
         ExpandFolder = eval($1 + "Folder");
      }
     
      if (ExpandChild.style.display == "none"){
         ExpandChild.style.display = "block";
      }

     else {
        ExpandChild.style.display = "none";
     }
}

 