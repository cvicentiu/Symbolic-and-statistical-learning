function populate(){
  if (iedom){
    cross_marquee=document.getElementById? document.getElementById("iemarquee") : document.all.iemarquee
    cross_marquee.style.left=parseInt(marqueewidth)+8+"px"
    cross_marquee.innerHTML=marqueecontent
    actualwidth=document.all? temp.offsetWidth : document.getElementById("temp").offsetWidth
  }
  else if (document.layers){
    ns_marquee=document.ns_marquee.document.ns_marquee2
    ns_marquee.left=parseInt(marqueewidth)+8
    ns_marquee.document.write(marqueecontent)
    ns_marquee.document.close()
    actualwidth=ns_marquee.document.width
  }
  lefttime=setInterval("scrollmarquee()",20)
}

function scrollmarquee(){
  if (iedom){
    if (parseInt(cross_marquee.style.left)>(actualwidth*(-1)+8))
      cross_marquee.style.left=parseInt(cross_marquee.style.left)-copyspeed+"px"
    else
      cross_marquee.style.left=parseInt(marqueewidth)+8+"px"
  }
  else if (document.layers){
    if (ns_marquee.left>(actualwidth*(-1)+8))
      ns_marquee.left-=copyspeed
    else
      ns_marquee.left=parseInt(marqueewidth)+8
  }
}
