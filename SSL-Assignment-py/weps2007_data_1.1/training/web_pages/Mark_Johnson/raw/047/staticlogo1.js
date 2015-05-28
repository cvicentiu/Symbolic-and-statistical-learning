///////////////////////////Do not edit below this line/////////////////////////
function regenerate(){
window.location.reload()
}
function regenerate2(){
if (document.layers)
setTimeout("window.onresize=regenerate",400)
}


var fadeset=''
if (fadeintoview)
fadeset="filter:alpha(opacity=0)"

if (document.all)
document.write('<span id="logo" style="'+fadeset+';position:absolute;top:100;width:'+staticlogo.width+';height:'+staticlogo.height+'"></span>')

function bringintoview(){
if (logo.filters.alpha.opacity<=95)
logo.filters.alpha.opacity+=5
else{
clearInterval(viewit)
if (visibleduration!=0)
setTimeout("logo.style.visibility='hidden'",visibleduration*1000)
}
}


function createlogo(){
staticimage=new Layer(100)
staticimage.left=-300
staticimage.top=120
staticimage.document.write('<a href="'+logolink+'"><img src="'+staticlogo.src+'" border=0 alt="'+alttext+'"></a>')
staticimage.document.close()
staticimage.visibility="show"
regenerate2()
staticitns()
}

if (document.layers)
window.onload=createlogo;

if (document.all){
w=document.body.clientWidth-logo.style.pixelWidth-5
h=document.body.clientHeight-logo.style.pixelHeight-5
logo.style.left=w
logo.style.top=h
}

function logoit(){
var w2=document.body.scrollLeft+w
var h2=document.body.scrollTop+h
logo.style.left=w2
logo.style.top=h2
}
function logoit2(){
staticimage.left=pageXOffset+window.innerWidth-staticimage.document.width-15
staticimage.top=pageYOffset+window.innerHeight-staticimage.document.height
}

function insertimage(){
logo.innerHTML='<a href="'+logolink+'"><img src="'+staticlogo.src+'" border=0 alt="'+alttext+'"></a>'
if (fadeintoview)
viewit=setInterval("bringintoview()",100)
else{
if (visibleduration!=0)
setTimeout("logo.style.visibility='hidden'",visibleduration*1000)
}
}

if (document.all){
window.onscroll=logoit
window.onresize=new Function("window.location.reload()")
window.onload=insertimage
}


function staticitns(){
setInterval("logoit2()",90)
if (visibleduration!=0)
setTimeout("staticimage.visibility='hide'",visibleduration*1000)
}

