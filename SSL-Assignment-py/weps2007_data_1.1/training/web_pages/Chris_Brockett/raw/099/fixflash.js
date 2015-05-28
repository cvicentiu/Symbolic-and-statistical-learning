// JavaScript Document

function fixflash()
{
   theObjects = document.getElementsByTagName("object"); 
   for( var i = 0; i < theObjects.length; i++ )
   { 
      theObjects[i].outerHTML = theObjects[i].outerHTML; 
   }
}


function fixflash2()
{
   theObjects = document.getElementsByTagName("object"); 

var flashContainer = theObjects[0];
var flashMovie = document.createElement("div");
flashMovie.innerHTML = flashContainer.innerHTML.replace(/</g, "<").replace(/>/g, ">");
flashContainer.parentNode.insertBefore(flashMovie, flashContainer);
flashContainer.parentNode.removeChild(flashContainer);
}




var fixflashid = 0;

function fixflash_start()
{
   if( fixflash_isIE() )
   {
      document.write('<div id="fixflash' + fixflashid + '"><!-- ');
   }
}

function fixflash_end()
{
   if( fixflash_isIE() )
   {
      document.write('</div>');
      var theObject = document.getElementById("fixflash" + fixflashid++);
      var theCode = theObject.innerHTML;
      theCode = theCode.substring(4 ,9+theCode.indexOf("</object>"));
      document.write(theCode);
   }
}

function fixflash_isIE()
{
   var strBrwsr= navigator.userAgent.toLowerCase();
   if( strBrwsr.indexOf("msie") > -1 && strBrwsr.indexOf("mac") < 0 )
   {
      if( parseInt(strBrwsr.charAt(strBrwsr.indexOf("msie")+5)) < 6 ) { return false; }
      if( strBrwsr.indexOf("win98") > -1 ||
          strBrwsr.indexOf("win 9x 4.90") > -1 ||
          strBrwsr.indexOf("winnt4.0") > -1 ||
          strBrwsr.indexOf("windows nt 5.0") > -1 ) { return false; }

      return true;
   }
   else { return false; }
}


/*
function flash_loaded() {

var copy_obj=document.getElementById('copy');
if (copy_obj!=null) copy_obj.style.visibility = 'visible';

}
*/