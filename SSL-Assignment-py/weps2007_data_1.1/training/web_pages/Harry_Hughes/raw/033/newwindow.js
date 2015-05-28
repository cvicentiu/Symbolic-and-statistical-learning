<!--Hide script from old browsers

var strWinProp

function init() {

  intWidth = screen.width - 10; //Adjust for the end of screen (don't know why?)
  intHeight = screen.height - 200; //Adjust for the Icon Bar at the bottom of the window.
  
  strWinProp = " toolbar=yes"         //Back, Forward, etc...
               + ",location=yes"      //URL field
               + ",directories=no"   //"What's New", etc...
               + ",status=yes"       //Status Bar at bottom of window.
               + ",menubar=yes"       //Menubar at top of window.
               + ",resizeable=no"    //Allow resizing by dragging. (Yes - Does not work with Netscape or IE)
               + ",scrollbars=yes"   //Displays scrollbars is document is larger than window.
               + ",titlebar=yes"     //Enable/Disable titlebar resize capability.
               + ",width="+intWidth    //Standard 640,800/788, 800/788
               + ",height="+intHeight  //Standard 480,600/541, 600/566               
               + ",top=0"              //Offset of windows top edge from screen.
               + ",left=0"             //Offset of windows left edge from screen.
               + "";  

}

// End hiding script from old browsers-->