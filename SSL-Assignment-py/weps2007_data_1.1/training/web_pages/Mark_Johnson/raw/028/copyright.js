PopUpURL    = "/copyright.html";
PopUpLeft   =  100;
PopUpTop    =  100;
PopUpWidth  =  500;
PopUpHeight =  220;

isIE=document.all;
isNN=!document.all&&document.getElementById;
isN4=document.layers;
pop1='left='+PopUpLeft+',top='+PopUpTop+',width='+PopUpWidth+',height='+PopUpHeight

if (isIE||isNN) {
  document.oncontextmenu=checkV;
} else {
  document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);
  document.onmousedown=checkV;
}

function checkV(e) {
  if (isN4) {
    if (e.which==2||e.which==3) {
      CR=window.open(PopUpURL,'Copyright',pop1);
      return false;
    }
  } else {
    CR=window.open(PopUpURL,'Copyright',pop1);
    return false;
  }
}