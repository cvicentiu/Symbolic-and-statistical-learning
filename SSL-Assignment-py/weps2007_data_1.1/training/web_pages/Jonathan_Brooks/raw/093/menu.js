/* @(#)$Id$
 *
 *		...
 *
 * version   $Revision$, $Date$
 * author    Irena Dominic
 */

function setDefaults (oCMenu) {
	//Menu properties   
	oCMenu.pxBetween=0
	//Using the cm_page object to place the menu ----
	oCMenu.fromLeft=0
	oCMenu.fromTop=0
	oCMenu.rows=1
	oCMenu.menuPlacement=0
                                                             
	oCMenu.resizeCheck=1 
	oCMenu.wait=1000 
	oCMenu.zIndex=0

	//Background bar properties
	oCMenu.useBar=0

	//Level properties - ALL properties have to be spesified in level 0
	oCMenu.level[0]=new cm_makeLevel() //Add this for each new level
	oCMenu.level[0].regClass="clLevel0"
	oCMenu.level[0].overClass="clLevel0over"
	oCMenu.level[0].borderX=0
	oCMenu.level[0].borderY=0
	oCMenu.level[0].offsetX=0
	oCMenu.level[0].offsetY=0
	oCMenu.level[0].rows=0
	oCMenu.level[0].arrow=0
	oCMenu.level[0].arrowWidth=0
	oCMenu.level[0].arrowHeight=0
	oCMenu.level[0].align="bottom"

	oCMenu.level[1]=new cm_makeLevel() //Add this for each new level (adding one to the number)
	oCMenu.level[1].regClass="clLevel1"
	oCMenu.level[1].overClass="clLevel1over"
	oCMenu.level[1].style=""
	oCMenu.level[1].offsetX=0
	oCMenu.level[1].offsetY=0
	oCMenu.level[1].borderX=0 
	oCMenu.level[1].borderY=0
	oCMenu.level[1].rows=0
	oCMenu.level[1].align="bottom" 
}

//Extra code to find position:
function findPos(num){
  //alert(num)
  if(bw.ns4){   //Netscape 4
    x = document.layers["layerMenu"+num].pageX
    y = document.layers["layerMenu"+num].pageY
  }else{ //other browsers
    x=0; y=0; var el,temp
    el = bw.ie4?document.all["divMenu"+num]:document.getElementById("divMenu"+num);
    if(el.offsetParent){
      temp = el
      while(temp.offsetParent){ //Looping parent elements to get the offset of them as well
        temp=temp.offsetParent; 
        x+=temp.offsetLeft
        y+=temp.offsetTop;
      }
    }
    x+=el.offsetLeft
    y+=el.offsetTop

	if (bw.mac && bw.ie && !bw.ie51) {
	  x += 0
	  y += 0
	}
  }
  //Returning the x and y as an array
  return [x,y]
}

function placeElements(){
  //Changing the position of ALL top items:
  pos = findPos(0)
  oCMenu.m["top0"].b.moveIt(pos[0],pos[1])
  pos = findPos(1)
  oCMenu.m["top1"].b.moveIt(pos[0],pos[1])
  pos = findPos(2)
  oCMenu.m["top2"].b.moveIt(pos[0],pos[1])
  pos = findPos(3)
  oCMenu.m["top3"].b.moveIt(pos[0],pos[1])
  pos = findPos(4)
  oCMenu.m["top4"].b.moveIt(pos[0],pos[1])
  
  //Setting the fromtop value
  oCMenu.fromTop = pos[1]
}

function enableMenu (oCMenu) {
	//Leave this line - it constructs the menu
	oCMenu.construct()		
	placeElements()
	//Setting it to re place the elements after resize - the resize is not perfect though..
	oCMenu.onafterresize="placeElements()"
}
