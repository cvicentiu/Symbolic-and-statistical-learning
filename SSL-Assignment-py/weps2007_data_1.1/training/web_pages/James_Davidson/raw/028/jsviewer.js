//
//  JSviewer - Dynamic HTML JavaScript image viewer
//  jsviewer.js
//  version 1.3.1
// 
//  Copyright (c) 2002-2005 Seann Herdejurgen (seann@herdejurgen.com)
//  All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions
//  are met:
//
//  1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//  3. The name of the author may not be used to endorse or promote products
//     derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
//  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
//  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
//  AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
//  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//  OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
//  SUCH DAMAGE.
//
//  JSviewer is distributed as freeware for non-commercial use.
//
//  Documentation and updates available on-line at http://www.jsviewer.com/
//

//
// JavaScript cookie functions
//
function getCookie(name) {
   var cookies=document.cookie.split('; ')
   if (document.cookie=='') cookies.length=0
   for (var i=0;i<cookies.length;i++)
      if (cookies[i].indexOf(name+'=')==0) {
         var value=unescape(cookies[i].split('=')[1])
         return isNaN(value)?value:parseInt(value)
      }
   return void 0
}

function setCookie(name,value) { document.cookie=name+'='+value+'; path=/'; debug() }

function initVar(name,user,value) {
   var cookie=getCookie(name)
   return user?user:cookie?cookie:value
}

//
// Set default JSviewer preferences
//
// It is recommended that you set your own defaults in the
// script that calls JSviewer rather than changing them here.
//
// You can set your own defaults in HTML like this:
//
//    <head>
//    <script src=jsviewer.js></script>
//    <script src=languages.js></script>
//    <script>
//    controlstyle='rkh'
//    options=CAPTIONS|CONTROLS|EFFECTS|PRECACHE
//    timer=5000
//    transitiontype='Fade(duration=0.75,overlap=1)'
//    </script>
//    </head>
//
function setDefaults() {
   if (languages) {
      var lang=getCookie('language')
      if (lang) language=lang
      // Make sure JSviewer knows language
      if (!language || !languages[language]) language=getLanguage()
   }
   controlstyle=initVar('controlstyle',controlstyle,'new')
   fontface=initVar('fontface',fontface,'Arial,Helvetica')
   thumbdir=initVar('thumbdir',thumbdir,'.thumbs')
   thumbsize=initVar('thumbsize',thumbsize,75)
   timer=initVar('timer',timer,8000)
   if (!maxfont) maxfont=10
   if (!minfont) minfont=1
   if (!topMargin) topMargin=0
   if (!bottomMargin) bottomMargin=0
   if (!leftMargin) leftMargin=0
   if (!rightMargin) rightMargin=0
   if (across===void 0) across=1; down=1
}

function saveState() {
   setCookie('state',pic+','+index+','+options+','+timer+','+across+','+document.fgColor+','+document.bgColor)
   setCookie('History',History.join(','))
}

function restoreState() {
   var state=getCookie('state')
   debug(state)
   pic=state.split(',')[0]*1
   index=state.split(',')[1]*1
   options=state.split(',')[2]*1
   timer=state.split(',')[3]*1
   across=state.split(',')[4]*1
   document.fgColor=state.split(',')[5]
   document.bgColor=state.split(',')[6]
   History=getCookie('History').split(',')
   setCookie('state','')
   setCookie('History','')
}

//
// Declare JSviewer global variables
//
var VERSION='1.3.1'
var Images=new Array()
var Thumbs=new Array()
var History=new Array(100)
var cache=new Array()
var languages,words,images,startstop,framesok,fullscreen,across,down
var index,lookahead,kpic,pic,pics,preload,outerframe,recheck,redisp,rethumb
var X,Y,H,W,width,height,fontface,fontsize,fontstyle
var controlstyle,language,options,thumbsize,thumbdir,timer,transitiontype
var topOffset,bottomOffset,leftOffset,rightOffset,captionOffset
var bottomMargin,topMargin,leftMargin,rightMargin,maxfont,minfont,navbarX
var dragging,dragX,dragY,dragZ
var memory=0,spectrum=0,DEBUG=0,GRADIENT=16,HELPER=0,isIE5
var R=new Array(0,  0,  0, 11,128,255,255,128, 64,128,255,255,255,128, 11,  0)
var G=new Array(0, 11,128,255,255,255,255,128, 11,  0,  0, 11, 64, 64, 64,  0)
var B=new Array(0,128,255,128, 11, 11,255,128, 64,128,255,128, 11,  0,  0,  0)

//
// JSviewer constants
//
var CAPTIONS=1
var CONTROLS=2
var CONTROLTOP=4
var EFFECTS=8
var PRECACHE=16
var ZOOM=32
var MAXSIZE=64
var RANDOM=128
var THUMBS=256
var LANGUAGES=512
var ADVANCED=1024
var HELP=2048
var SLIDESHOW=4096
var RESERVED1=8192
var RESERVED2=16384
var DEBUGMODE=32768

function about() {
   var o='JSviewer '+VERSION+'\n'
   o+=Tr('Written by')+' Seann Herdejurgen\n'
   o+='seann@herdejurgen.com\n'
   o+='http://www.jsviewer.com\n'
   o+=Tr('Copyright')+' (c) 2002-2005\n'
   o+=Tr('All rights reserved')+'.\n'
   return o
}

function showHelp() {
   var o='<title>'+T('JSviewer Help')+'</title>'
   o+=T('JSviewer keyboard controls')+'<p>'
   o+='<b>a</b> - '+T('advanced options')+'<br>'
   o+='<b>c</b> - '+T('toggle controls')+'<br>'
   o+='<b>d</b> - '+T('toggle descriptions')+'<br>'
   if (document.all) o+='<b>e</b> - '+T('toggle effects')+'<br>'
   o+='<b>f</b> - '+T('full screen')+'<br>'
   o+='<b>h</b> - '+T('toggle help')+'<br>'
   if (languages) o+='<b>l</b> - '+T('change language')+'<br>'
   o+='<b>m</b> - '+T('max image size')+'<br>'
   o+='<b>p</b> - '+T('toggle pre-cache')+'<br>'
   o+='<b>r</b> - '+T('toggle random')+'<br>'
   o+='<b>s</b> - '+T('start/stop slideshow')+'<br>'
   o+='<b>t</b> - '+T('toggle thumbnails')+'<br>'
   o+='<b>x</b> - '+T('close window')+'<br>'
   o+='<b>z</b> - '+T('toggle zoom')+'<br>'
   o+='<b>^</b> - '+T('move controls')+'<br></body>'
   o+='<b>&#150;</b> - '+T('previous image')+'<br>'
   o+='<b>+</b> - '+T('next image')+'<br>'
   o+='<b>&lt;</b> - '+T('slower')+'<br>'
   o+='<b>&gt;</b> - '+T('faster')+'<br></body>'
   o+='<b>?</b> - '+T('about')+' JSviewer<br>'
   o+='<br>'+T('Mouse click (zoom mode)')+'<br><br>'
   o+=T('left - zoom in')+'<br>'
   o+=T('right - zoom out')+'<br>'
   o+=remotekeys()
   output('hiddenlayer',font(o))
   var x=divWidth('hiddenlayer')+2*fontsize
   var y=divHeight('hiddenlayer')+2*fontsize
   if (options&HELP && (!HELPER || HELPER.closed)) {
      HELPER=window.open('','JShelp','height='+y+',width='+x+',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,screenX='+(screen.availWidth-x-10)+',left='+(screen.availWidth-x-10))
      if (HELPER) {
         HELPER.document.clear()
         HELPER.document.writeln(font(o))
         HELPER.document.close()
         inheritColors(document,HELPER.document)
         HELPER.document.onkeypress=HELPER.getKey
      }
   } else {
      if (HELPER && !HELPER.closed) HELPER.close()
      HELPER=0
   }
}

//
// Construct object prototypes
//
function JSImage() {
   this.image=0
   this.left=0
   this.fixed=0
   this.status=0
   this.top=0
   this.zoom=0
}

//
// Browser specific DHTML functions
//
function getElement(name) {
   if (isIE5) return document.all[name]
   if (document.getElementById) return document.getElementById(name)
   if (document.all) return document.all[name]
   if (document.layers) return document[name]
}

function getDoc(name) {
   if (isIE5) return document.all[name].document
   if (document.getElementById) return document.getElementById(name).ownerDocument
   if (document.all) return document.all[name].document
   if (document.layers) return document[name].document
}

function divWidth(name) {
   if (isIE5) return document.all[name].offsetWidth
   if (document.getElementById) return document.getElementById(name).offsetWidth
   if (document.all) return document.all[name].offsetWidth
   if (document.layers) return document[name].document.width
}

function divHeight(name) {
   if (isIE5) return document.all[name].offsetHeight
   if (document.getElementById) return document.getElementById(name).offsetHeight
   if (document.all) return document.all[name].offsetHeight
   if (document.layers) return document[name].document.height
}

function getLayer(name) {
   if (isIE5) return document.all[name].style
   if (document.getElementById) return document.getElementById(name).style
   if (document.all) return document.all[name].style
   if (document.layers) return document[name]
}

function getX(layer) {
   layer=getLayer(layer)
   if (isIE5) return layer.pixelLeft
   if (document.getElementById) return parseInt(layer.left)
   if (document.all) return layer.pixelLeft
   if (document.layers) return layer.x
}

function getY(layer) {
   layer=getLayer(layer)
   if (isIE5) return layer.pixelTop
   if (document.getElementById) return parseInt(layer.top)
   if (document.all) return layer.pixelTop
   if (document.layers) return layer.y
}

function getLanguage() {
   var lang=navigator.userLanguage?navigator.userLanguage:navigator.language
   return lang.substr(0,2)
}

function setClip(layer,x,y,t,r,b,l) {
   debug(); layer=getLayer(layer)
   if (isIE5) {
      layer.clip='rect('+t+'px '+r+'px '+b+'px '+l+'px)'
      layer.pixelLeft=x
      layer.pixelTop=y
   } else if (document.getElementById) {
      layer.left=x
      layer.top=y
      layer.clip='rect('+t+' '+r+' '+b+' '+l+')'
   } else if (document.all) {
      layer.clip='rect('+t+'px '+r+'px '+b+'px '+l+'px)'
      layer.pixelLeft=x
      layer.pixelTop=y
      layer.overflow='hidden'
   } else if (document.layers) {
      layer.clip.top=t
      layer.clip.right=r
      layer.clip.bottom=b
      layer.clip.left=l
      layer.moveTo(x,y)
   }
}

function setWidth(layer,w) {
   layer=getLayer(layer)
   if (isIE5)
      layer.posWidth=w
   else if (document.getElementById)
      layer.width=w
   else if (document.all)
      layer.posWidth=w
   else if (layer.clip)
      layer.clip.width=w
}

function output(layer,html) {
   if (isIE5) {
      layer=eval(layer)
      layer.innerHTML=html
   } else if (document.getElementById)
      document.getElementById(layer).innerHTML=html
   else if (document.all) {
      layer=eval(layer)
      layer.innerHTML=html
   } else if (document.layers) {
      var doc=getDoc(layer)
      doc.open()
      doc.writeln(html)
      doc.close()
   }
}

function setXY(layer,x,y) {
   debug(); layer=getLayer(layer)
   if (isIE5) {
      layer.pixelLeft=x
      layer.pixelTop=y
   } else if (document.getElementById) {
      layer.left=x
      layer.top=y
   } else if (document.all) {
      layer.pixelLeft=x
      layer.pixelTop=y
   } else if (document.layers)
      layer.moveTo(x,y)
}

function center(layer,y) { setXY(layer,Math.round((width-divWidth(layer)-leftMargin-rightMargin)/2)+leftMargin,y) }

function setCursor(curtype) { if (document.all) document.body.style.cursor=curtype }

function setVisibility(layer,vis) {
   debug()
   layer=getLayer(layer)
   layer.visibility=(vis?'visible':'hidden')
}

function remotekeys() {
   return '<script>function getKey(evt) { var key=document.all?event.keyCode:evt.keyCode?evt.keyCode:evt.charCode?evt.charCode:evt.which?evt.which:void 0; window.opener.dokey(String.fromCharCode(key).toLowerCase()) }</script>'
}

function getKey(evt) {
  var key=document.all?event.keyCode:
           evt.keyCode?evt.keyCode:
          evt.charCode?evt.charCode:
             evt.which?evt.which:void 0
  dokey(String.fromCharCode(key).toLowerCase())
  return false
}

function dokey(key) {
  switch(key) {
     case '!': toggleOption(DEBUGMODE); break
     case '+': case '=': nextImage(); break
     case '-': previousImage(); break
     case '<': case ',': slower(); break
     case '>': case '.': faster(); break
     case '^': toggleOption(CONTROLTOP); break
     case 'a': toggleOption(ADVANCED); break
     case 'c': toggleOption(CONTROLS); break
     case 'd': toggleOption(CAPTIONS); break
     case 'e': toggleOption(EFFECTS); break
     case 'f': gofullScreen(); break
     case 'h': toggleOption(HELP); break
     case 'l': toggleOption(LANGUAGES); break
     case 'm': toggleOption(MAXSIZE); break
     case 'o': alert('options='+options); break
     case 'p': toggleOption(PRECACHE); break
     case 'r': toggleOption(RANDOM); break
     case 's': slideshow(); break
     case 't': toggleOption(THUMBS); break
     case 'x': exitfullScreen(); break
     case 'z': toggleOption(ZOOM); break
     case '?': alert(about()); break
     case '\r': if (kpic && kpic<=pics) { displayImage(save(kpic-1)) }
                kpic=0
                break
     default: if (!isNaN(key)) {
                kpic=kpic*10+parseInt(key)
              } else {
                debug(T('You typed')+': '+key)
              }
  }
}

//
// Debug functions
//
function startDebug() {
   DEBUG=window.open()
   if (DEBUG) {
      DEBUG.document.clear()
      DEBUG.document.writeln('<title>JSviewer Debugger</title>')
      DEBUG.document.writeln(remotekeys()+'<pre>'+about())
      DEBUG.document.onkeypress=DEBUG.getKey
      log(navigator.userAgent)
      log(document.URL)
      window.focus()
   }
}

function log(s) {
   if (DEBUG && !DEBUG.closed) {
      var localtime=new Date()
      DEBUG.document.writeln(localtime+' '+s)
      DEBUG.scrollTo(0,99999999)
   } else DEBUG=0
}

function stopDebug() {
   log(T('End debug')+'.</pre>')
   if (DEBUG && !DEBUG.closed) DEBUG.document.close()
   DEBUG=0
}

function funcall(caller) {
   if (caller) {
      var s=caller.toString()
      var results=s.match(/function\s+([^\(]+)\(([^\)]*)\)\s.+/)
      var func=results?results[1]:''
      var args=results?results[2]:''
      args=args.split(',')
      for (var i=0;i<args.length;i++) args[i]=caller.arguments[i]
      args=args.join(',')
      return func+'('+args+') '
   } else return
}

function debug(s) { log(funcall(debug.caller)+(s?s:'')) }

function traceback() {
   log(T('Stack trace')+':')
   for (caller=traceback.caller;caller;caller=caller.caller) log('   '+funcall(caller))
}

function dump(obj) {
   if (DEBUG && !DEBUG.closed) {
      debug()
      var localtime=new Date()
      for (var o in obj) {
         if (o=='frameElement' || o===undefined) continue // IE bug
         DEBUG.document.writeln(localtime+' '+funcall(dump.caller)+o+'='+obj[o])
         DEBUG.scrollTo(0,99999999)
      }
   }
}

//
// JSviewer library functions
//
function createLayers() {
   var o='<style type="text/css"> body { overflow : hidden } </style>'
   if (navigator.appName=='Netscape' && parseInt(navigator.appVersion)==4) o=''
   var Layers=new Array('picture','caption','thumbnails','lessthumbs','morethumbs','navbar','advbar','colorbar','closer','noframes','control','langs','hiddenlayer')
   for (var i=0;i<Layers.length;i++) o+='<div id='+Layers[i]+' style="position:absolute; visibility:hidden"></div>'
   document.writeln(o)
}

function T(s) {
   if (words && words[language] && !words[language][s]) debug(s)
   return (words && words[language] && words[language][s])?words[language][s]:s
}

function Tr(s) {
   s=T(s)
   var result
   while (result=s.match(/\&#(\d+);/))
      s=s.replace(result[0],String.fromCharCode(RegExp.$1))
   return s
}

function randomPick() {
   return randomPick.arguments[Math.floor(Math.random()*randomPick.arguments.length)]
}

function pick(n,c) {
   var i=n
   if (c>1) while (i==n) {
      i=Math.floor(n+Math.random()*c)%c
      if (c>12) for (var p=-10; p<=0; p++)
         if (History[(History.length+index+p)%History.length]==i) i=n
   }
   return i
}

function isImage(i) {
   var name=imageFile(i)
   if (name=='') return 0
   name=name.toLowerCase()
   var dot=name.lastIndexOf('.')
   var imagetypes='.gif.jpg.jpeg.png'
   return imagetypes.indexOf(name.substr(dot))>=0
}

function save(image) {
   index=(index+1)%History.length
   History[index]=image
   History[(index+1)%History.length]=-1
   return image
}

function redraw() {
   saveState()
   if (DEBUG && !DEBUG.closed) DEBUG.close()
   window.location.reload()
   return false
}

function inheritColors(source,dest) {
   dest.bgColor=source.bgColor
   dest.fgColor=source.fgColor
   dest.linkColor=source.linkColor
   dest.alinkColor=source.alinkColor
   dest.vlinkColor=source.vlinkColor
}

function font(s,c) { return '<font face="'+fontface+'"'+(c?' color='+c:'')+fontstyle+'>'+s+'</font>' }

function small(s) { return '<font face="'+fontface+'" style=font-size:'+(fontsize-1)+'pt >'+s+'</font>' }

function form(s) { return '<form>'+font(s)+'</form>' }

function vstat(s) {
   return 'onmouseover="window.status='+s+'; return true" onmouseout="window.status=\'\'; return true"'
}

function stat(s) { return vstat("'"+s+"'") }

function link(func,extra,text) {
   return '<a href="" onclick="'+func+'; return false" '+extra+' style=text-decoration:none>'+text+'</a> '
}

function button(value,func,extra) {
   return '<input type=button value="'+value+'" onclick='+func+fontstyle+extra+'> '
}

function checkbox(opt,extra,text) {
   return '<input type=checkbox name=opt'+opt+' '+(options&opt?'checked':'')+' onclick=toggleOption('+opt+')'+fontstyle+extra+'> '+text+' '
}

function notify(s,c) {
   debug()
   setClip('picture',leftOffset,topOffset,0,width-leftOffset-rightOffset,height-topOffset-bottomOffset-captionOffset,0)
   output('picture',font(s,c))
   output('hiddenlayer',font(s,c))
   var w=width-leftOffset-rightOffset
   if (w>divWidth('hiddenlayer')) w=divWidth('hiddenlayer')
   setWidth('picture',w)
   W=divWidth('picture')
   H=divHeight('picture')
   if ((width-W)/2<=leftOffset || (width-W)/2<=rightOffset)
      X=Math.floor((width-leftOffset-rightOffset-W)/2)+leftOffset
   else
      X=Math.floor((width-leftMargin-rightMargin-W)/2)+leftMargin
   if ((height-H-captionOffset)/2<=topOffset || (height-H-captionOffset)/2<=bottomOffset)
      Y=Math.floor((height-topOffset-bottomOffset-captionOffset-H)/2)+topOffset
   else
      Y=Math.floor((height-topMargin-bottomMargin-captionOffset-H)/2)+topMargin
   setXY('picture',X,Y)
}

function error(s) { notify(s,'red') }

function gofullScreen() {
   // Stop slide show
   window.clearTimeout(redisp)
   saveState()
   window.open(document.URL,'JSfull','fullscreen=1,height='+(screen.availHeight-10)+',width='+(screen.availWidth-10)+',screenX=0,screenY=0,left=0,top=0,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0')
}

function exitfullScreen() {
   if (window.opener && window.opener.toggleVisibility) {
      saveState()
      window.opener.location.reload()
   }
   if (parent) parent.window.close(); else window.close()
}

//
// Image caching functions
//
function imageFile(i) {
   var img=escape(images.options[i].value.split(';')[0])
   return img.replace('http%3A//','http://')
}

function imageCaption(i) {
   var caption=images.options[i].value.split(';')[1]
   return caption?caption:''
}

function preFetch(i) {
   if (isImage(i) && !Images[i].status) {
      debug()
      Images[i].status=2
      Images[i].image=new Image()
      Images[i].image.onload=function() { Images[i].status=1; cacheImage(i) }
      Images[i].image.onabort=function() { Images[i].status=0 }
      Images[i].image.onerror=function() { Images[i].status=3; postFetch() }
      Images[i].image.src=imageFile(i)
   }
}

function flushCache(i) {
   memory=0
   clearOption(PRECACHE)
   while (cache.length>10) {
      var p=cache[0]
      cache=cache.slice(1)
      if (i!=p && Images[p].status==1) {
         debug(T('Flushing image')+' '+p+' '+T('from cache'))
         Images[p].image=Images[p].status=0
         Thumbs[p].image=Thumbs[p].status=0
      }
   }
}

function cacheImage(i) {
   // Track browser cache memory usage
   if (Images[i].image.fileSize) memory+=Images[i].image.fileSize*1
   else memory+=Math.round(Images[i].image.width*Images[i].image.height/2)
   cache[cache.length]=i

   // Clear memory cache if needed
   if (memory>16777216) flushCache(i)

   postFetch()
}

function postFetch() {
   debug()
   // Always pre-cache next image if not loaded
   if (isImage(lookahead) && !Images[lookahead].status) return preFetch(lookahead)
   // Only pre-cache first 16 MB of images
   if (options&PRECACHE && memory<16777216) for (var i=(pic+1)%pics;i!=pic;i=(i+1)%pics)
      if (isImage(i) && !Images[i].status)
         // Use window.setTimeout to prevent stack overflow
         return window.setTimeout('preFetch('+i+')',50); 
}

function thumbFile(i) {
   var thumb=imageFile(i)
   var path=thumb.split('/')
   var l=path.length
   path[l]=path[l-1]; path[l-1]=thumbdir
   return path.join('/')
}

function fetchThumb(i) {
   if (isImage(i) && !Thumbs[i].status) {
      debug(thumbFile(i))
      Thumbs[i].status=2
      Thumbs[i].image=new Image()
      Thumbs[i].image.onload=function() { Thumbs[i].status=1 }
      Thumbs[i].image.onabort=function() { Thumbs[i].status=0 }
      Thumbs[i].image.onerror=function() { Thumbs[i].status=3 }
      Thumbs[i].image.src=thumbFile(i)
   }
}

//
// Image rendering functions
//
function IEtransition(d) {
   var trans=transitiontype
   d='duration='+d
   if (trans===void 0) switch (Math.floor(Math.random()*17)) {
      case 0: trans='Barn('+d+',motion='+randomPick('in','out')+',orientation=',randomPick('horizontal','vertical')+')'
              break;
      case 1: trans='Blinds('+d+',bands='+randomPick(2,4,6,8)+',direction='+randomPick('up','down','right','left')+')'
              break;
      case 2: trans='CheckerBoard('+d+',squaresX='+randomPick(2,4,8,12)+',squaresY='+randomPick(2,4,8,12)+',direction='+randomPick('up','down','right','left')+')'
              break;
      case 3: trans='Fade('+d+',overlap='+randomPick(0.25,0.5,0.75,1)+')'
              break;
      case 4: trans='GradientWipe('+d+',gradientSize='+randomPick(0,0.1,0.3,0.5,0.7,0.9,1)+',wipeStyle='+randomPick(0,1)+',motion='+randomPick('forward','reverse')+')'
              break;
      case 5: trans='Inset('+d+')'
              break;
      case 6: trans='Iris('+d+',irisStyle='+randomPick('DIAMOND','CIRCLE','CROSS','PLUS','SQUARE','STAR')+',motion='+randomPick('in','out')+')'
              break;
      case 7: trans='Pixelate('+d+',maxSquare='+randomPick(5,10,20,30,40,50)+')'
              break;
      case 8: trans='RadialWipe('+d+',wipeStyle='+randomPick('CLOCK','WEDGE','RADIAL')+')'
              break;
      case 9: trans='RandomBars('+d+',orientation='+randomPick('horizontal','vertical')+')'
              break;
      case 10: trans='RandomDissolve('+d+')'
              break;
      case 11: trans='Slide('+d+',pushStyle='+randomPick('HIDE','PUSH','SWAP')+',bands='+randomPick(1,2,3,4,5,6,7)+')'
              break;
      case 12: trans='Spiral('+d+',gridSizeX='+randomPick(8,16,32,64)+',gridSizeY='+randomPick(8,16,32,64)+')'
              break;
      case 13: trans='Stretch('+d+',stretchStyle='+randomPick('HIDE','PUSH','SPIN')+')'
              break;
      case 14: trans='Strips('+d+',motion='+randomPick('leftdown','leftup','rightdown','rightup')+')'
              break;
      case 15: trans='Wheel('+d+',spokes='+randomPick(2,4,10,16,20)+')'
              break;
      case 16: trans='Zigzag('+d+',gridSizeX='+randomPick(8,16,32,64)+',gridSizeY='+randomPick(8,16,32,64)+')'
              break;
   }
   document.body.style.filter='progid:DXImageTransform.Microsoft.'+trans
   if (navigator.appVersion.indexOf('MSIE 5.0')!=-1)
      document.body.style.filter='revealTrans('+d+',transition='+Math.floor(Math.random()*23)+')'
   document.body.filters[0].Apply()
}

function maxSize() {
   renderCaption(width-leftOffset-rightOffset)
   var x=(width-leftOffset-rightOffset)/Images[pic].image.width
   var y=(height-topOffset-bottomOffset-captionOffset)/Images[pic].image.height
   // Scale using smaller zoom value
   var z=(x<y?x:y)
   // Don't enlarge small images unless max size is on
   if (!(options&MAXSIZE) && z>1) z=1
   Images[pic].zoom=z
   debug('zoom='+z)
}

function renderCaption(w) {
   var caption=imageCaption(pic)
   setVisibility('caption',0)
   if (caption!='' && options&CAPTIONS) {
      output('hiddenlayer',font(caption))
      output('caption',font(caption))
      if (w>width-leftOffset-rightOffset) w=width-leftOffset-rightOffset
      if (w>divWidth('hiddenlayer') || divWidth('hiddenlayer')<fontsize*20) w=divWidth('hiddenlayer')
      else if (w<fontsize*20) w=fontsize*20
      setWidth('caption',w)
      captionOffset=divHeight('caption')+24
   } else captionOffset=0
}

function renderImage() {
   if (!Images[pic].fixed) maxSize()
   W=Math.floor(Images[pic].image.width*Images[pic].zoom)
   H=Math.floor(Images[pic].image.height*Images[pic].zoom)
   if (W>width-leftOffset-rightOffset) W=width-leftOffset-rightOffset
   renderCaption(W)
   if (H>height-topOffset-bottomOffset-captionOffset) H=height-topOffset-bottomOffset-captionOffset
   if (Images[pic].top>Math.floor(Images[pic].image.height-H/Images[pic].zoom))
      Images[pic].top=Math.floor(Images[pic].image.height-H/Images[pic].zoom)
   if (Images[pic].left>Math.floor(Images[pic].image.width-W/Images[pic].zoom))
      Images[pic].left=Math.floor(Images[pic].image.width-W/Images[pic].zoom)
   if (Images[pic].top<0) Images[pic].top=0
   if (Images[pic].left<0) Images[pic].left=0
   var x=Images[pic].left
   var y=Images[pic].top
   var z=Images[pic].zoom
   var t=Math.floor(y*z)
   var r=Math.floor(x*z+W)
   var b=Math.floor(y*z+H)
   var l=Math.floor(x*z)
   if ((width-leftMargin-rightMargin-W)/2<=leftOffset || (width-leftMargin-rightMargin-W)/2<=rightOffset)
      X=Math.floor((width-leftOffset-rightOffset-W)/2)-l+leftOffset
   else 
      X=Math.floor((width-leftMargin-rightMargin-W)/2)-l+leftMargin
   if ((height-topMargin-bottomMargin-H-captionOffset)/2<=topOffset || (height-topMargin-bottomMargin-H-captionOffset)/2<=bottomOffset)
      Y=Math.floor((height-topOffset-bottomOffset-captionOffset-H)/2)-t+topOffset
   else
      Y=Math.floor((height-topMargin-bottomMargin-H-captionOffset)/2)-t+topMargin
   output('picture','<img border=0 src="'+imageFile(pic)+'" alt=\''+images.options[pic].text+'\' width='+Math.floor(Images[pic].image.width*z)+' height='+Math.floor(Images[pic].image.height*z)+' '+(document.all?options&ZOOM?'onmousedown=startDrag() onmousemove=drag() onmouseup=stopDrag() onmouseout=stopDrag()':'onclick=nextImage()':'')+'>')
   if (Y+t<topOffset) Y=topOffset-t
   if (X+l<leftOffset) X=leftOffset-l
   setClip('picture',X,Y,t,r,b,l)
   if (captionOffset) {
      setXY('caption',X+l+Math.floor((W-divWidth('caption'))/2),Y+b+12)
      setVisibility('caption',1)
   }
}

function drawScreen() {
   if (isImage(pic)) {
      if (Images[pic].status==1)
         renderImage()
      else if (Images[pic].status==3) {
         error(T('Unable to load')+' '+Images[pic].image.src)
         renderCaption(width)
         if (captionOffset) {
            if ((width-divWidth('caption'))/2<=leftOffset || (width-divWidth('caption'))/2<=rightOffset)
               setXY('caption',Math.floor((width-leftOffset-rightOffset-divWidth('caption'))/2)+leftOffset,height-divHeight('caption')-bottomOffset-12)
            else
               setXY('caption',Math.floor((width-divWidth('caption'))/2),height-divHeight('caption')-bottomOffset-12)
            setVisibility('caption',1)
         }
      }
   } else {
      var url=imageFile(pic)
      var x=width-leftMargin-rightMargin
      var y=height-topMargin-bottomMargin
      var border=options&MAXSIZE?0:Math.round((x<y?x:y)*0.075)
      W=width-leftOffset-rightOffset-border
      renderCaption(W)
      H=height-topOffset-bottomOffset-captionOffset-border
      if (url!='') {
         X=Math.floor((width-leftOffset-rightOffset-W)/2)+leftOffset
         Y=Math.floor((height-topOffset-bottomOffset-captionOffset-H)/2)+topOffset
         setClip('picture',X,Y,0,W,H,0)
         // Display web page instead of image
         if (navigator.appName=='Netscape' && parseInt(navigator.appVersion)==4)
            error(T('Unable to display')+' '+url+' '+T('in')+' Netscape 4')
         else
            output('picture','<iframe src="'+url+'" width='+W+' height='+H+' scrolling=auto></iframe>')
         if (captionOffset) {
            setXY('caption',X+Math.floor((W-divWidth('caption'))/2),Y+H+12)
            setVisibility('caption',1)
         }
      } else {
         captionOffset=0
         notify(imageCaption(pic))
      }
   }
   window.status=images.options[pic].text
   displayThumbs()
}

function displayImage(i) {
   // Turn off scroll bars in IE
   if (document.all) document.body.scroll='no'

   // Make sure image is cached before displaying it
   if (isImage(i) && !Images[i].status) {
      preFetch(i)
      setCursor('Wait')
   }
   if (Images[i].status==2) return recheck=window.setTimeout('displayImage('+i+')',125)
   setCursor('Default')

   // Setup IE transition
   if (document.all && document.body.filters && options&EFFECTS) IEtransition(timer/6000)

   // Track current picture on screen menu and in global variable
   pic=images.selectedIndex=i; debug(imageFile(pic))

   // Pre-cache next image if current image is cached
   if (Images[pic].status==1) preFetch(lookahead)

   // Queue up next image for slide show
   if (options&SLIDESHOW) {
      window.clearTimeout(redisp)
      redisp=window.setTimeout('nextSlide()',timer)
   }

   // Render images on screen
   drawScreen()

   // Play IE transition
   if (document.all && document.body.filters && options&EFFECTS) document.body.filters[0].Play()
}

function scaleImage(Image,file,size,buffer,image,alt) {
   var z=(Image.image.width>Image.image.height?Image.image.width:Image.image.height)/size
   var x=Math.round(Image.image.width/z)
   var y=Math.round(Image.image.height/z)
   return '<img name=thumb'+image+' border=0 hspace='+buffer+' vspace='+buffer+' src="'+file+'" width='+x+' height='+y+' alt=\''+alt+'\'>'
}

function moreThumbs() { if (across*down<pics) { across++; renderThumbs() } return false }

function lessThumbs() { if (across>0) { across--; renderThumbs() } return false }

function displayThumbs() {
   if (options&THUMBS && across>0) {
      var border=Math.round(3.49*fontsize/maxfont)
      var t='thumb'+pic
      var match=0
      var doc=getDoc('thumbnails')
      for (var i=0; doc.images[i]; i++)
         doc.images[i].border=doc.images[i].name==t?match=border:0
      for (var i=0; doc.links[i]; i++)
         doc.links[i].style.textDecoration=doc.links[i].name==t?match='underline':'none'
      if (!match) renderThumbs()
   }
   setXY('lessthumbs',leftMargin+5,height-bottomMargin-divHeight('lessthumbs'))
   setXY('morethumbs',leftMargin+divWidth('thumbnails')+(across?-15:5),height-bottomMargin-divHeight('morethumbs'))
}

function renderThumbs() {
   debug()
   var THUMBSIZE=Math.round(thumbsize*fontsize/maxfont)
   var border=Math.round(3.49*fontsize/maxfont)
   var bufspace=Math.round(7.49*fontsize/maxfont)
   down=Math.floor((height-topMargin-bottomMargin-border)/(THUMBSIZE+2*bufspace))
   var maxacross=Math.floor((width-leftMargin-rightMargin-border-5)/(THUMBSIZE+2*bufspace))
   if (across>maxacross) across=maxacross
   var thumbs=down*across
   if (thumbs>pics) { across=Math.ceil(pics/down); thumbs=pics }
   var o='<table width='+(THUMBSIZE+2*(bufspace+border+5))+'>'
   var offset
   for (offset=1;offset<thumbs;offset++)
      if (History[(History.length+index-offset)%History.length]<0) break
   for (var i=1;i<=thumbs;i++) {
      var img,p,action=''
      if (options&RANDOM && thumbs<pics) {
         p=(History.length+index-offset+i)%History.length
         action='window.index='+p+'; '
         p=History[p]
      } else p=(pics+pic+i-1-pic%thumbs)%pics
      if (p<0) continue
      var comment=images.options[p].text
      if (isImage(p) && Thumbs[p].status==1)
         img=scaleImage(Thumbs[p],thumbFile(p),THUMBSIZE,bufspace,p,comment)
      else if (isImage(p) && Images[p].status==1)
         // Create psuedo thumbnails
         img=scaleImage(Images[p],imageFile(p),THUMBSIZE,bufspace,p,comment)
      else {
         if (isImage(p)) {
            if (!Thumbs[p].status) fetchThumb(p)
            if (Thumbs[p].status==2) return rethumb=window.setTimeout('renderThumbs()',125)
            if (!Images[p].status) preFetch(p)
            if (Images[p].status==2) return rethumb=window.setTimeout('renderThumbs()',125)
         }
         img=small(comment?comment:path[p])
      }
      if (!((i-1)%across)) o+='<tr>'
      o+='<td align=center>'+link(action+'window.displayImage('+p+')','name=thumb'+p,img)+'</td>'
      if (!(i%across)) o+='</tr>'
   }
   o+='</table>'
   output('thumbnails',o)
   setClip('thumbnails',leftMargin,topMargin+Math.round((height-topMargin-bottomMargin-divHeight('thumbnails'))/2),0,(THUMBSIZE+2*(bufspace+border+5))*across,(THUMBSIZE+2*(bufspace+border))*down,0)
   leftOffset=leftMargin+divWidth('thumbnails')+2*bufspace
   toggleVisibility()
}

//
// Image navigation
//
function firstImage() { displayImage(save(0)) }

function previousImage() {
   var image
   if (options&RANDOM) {
      index=(index+History.length-1)%History.length
      if (History[index]<0) {
         image=pick(pic,pics)
         History[index]=image
         History[(index+History.length-1)%History.length]=-1
      } else image=History[index]
   } else image=(pic+pics-1)%pics
   displayImage(image)
}

function nextImage() {
   var image
   if (options&RANDOM) {
      index=(index+1)%History.length
      if (History[index]<0) {
         image=lookahead
         lookahead=pick(image,pics)
         History[index]=image
         History[(index+1)%History.length]=-1
      } else image=History[index]
   } else {
      image=(pic+1)%pics
      lookahead=(image+1)%pics
   }
   displayImage(image)
}

function lastImage() { displayImage(save(pics-1)) }

//
// Slideshow functions
//
function nextSlide() { if (options&SLIDESHOW) nextImage(); else startstop.value=Tr('Start') }

function slideshow() {
   if (options&SLIDESHOW) {
      window.clearTimeout(recheck)
      window.clearTimeout(rethumb)
      window.clearTimeout(redisp)
      startstop.value=Tr('Start')
      toggleOption(SLIDESHOW)
   } else {
      startstop.value=Tr('Stop')
      toggleOption(SLIDESHOW)
      nextSlide()
   }
}

function faster() {
   if (timer>125) {
      timer=Math.round(timer/2)
      if (options&SLIDESHOW) {
         window.clearTimeout(redisp)
         nextSlide()
      }
   } else alert(Tr("I can't push her any faster captain")+"!")
}

function slower() { timer*=2 }

//
// Toggle functions
//
function toggleVisibility() {
   var a=divHeight('navbar')
   var b=divHeight('advbar')
   var c=divHeight('colorbar')
   topOffset=bottomOffset=0
   if (options&CONTROLS) {
      bottomOffset=options&ADVANCED?(spectrum?a+b+c:a+b):a
      if (options&CONTROLTOP) { topOffset=bottomOffset; bottomOffset=0 }
   }
   leftOffset=options&THUMBS?divWidth('thumbnails'):0
   rightOffset=0
   topOffset+=topMargin; bottomOffset+=bottomMargin
   leftOffset+=leftMargin; rightOffset+=rightMargin
   center('advbar',options&CONTROLTOP?a-5+topMargin:height-a-b-bottomMargin)
   setVisibility('advbar',options&CONTROLS && options&ADVANCED)
   center('colorbar',options&CONTROLTOP?a+b-15+topMargin:height-a-c-5-bottomMargin)
   setVisibility('colorbar',options&CONTROLS && options&ADVANCED && spectrum)
   if (navbarX>0) setXY('navbar',navbarX,options&CONTROLTOP?5+topMargin:height-a+5-bottomMargin)
   else center('navbar',options&CONTROLTOP?5+topMargin:height-a+5-bottomMargin)
   setVisibility('navbar',options&CONTROLS)
   setVisibility('noframes',options&CONTROLS && outerframe && !fullscreen)
   setVisibility('thumbnails',options&THUMBS)
   setVisibility('lessthumbs',options&THUMBS && across>0)
   setVisibility('morethumbs',options&THUMBS && pics>down*across)
   setVisibility('langs',options&LANGUAGES && languages)
   drawScreen()
}

function toggleOption(opt) {
   options^=opt
   setCookie('options',options)
   for (var f=0;document.forms[f];f++) for (var e=0;document.forms[f].elements[e];e++)
      if (document.forms[f].elements[e].name=='opt'+opt && document.forms[f].elements[e].type=='checkbox')
         document.forms[f].elements[e].checked=(options&opt)
   if (opt&DEBUGMODE) { if (options&DEBUGMODE) startDebug(); else stopDebug() }
   if (opt&HELP) showHelp()
   if (opt&MAXSIZE) Images[pic].fixed=0
   if (opt&PRECACHE && options&PRECACHE) postFetch()
   if (opt&RANDOM && options&RANDOM) { lookahead=pick(pic,pics); if (History[index]==-1) save(pic) }
   if (opt&RANDOM && options&THUMBS) displayThumbs()
   if (opt&(DEBUGMODE|EFFECTS|PRECACHE|RANDOM)) return
   toggleVisibility()
}

function setOption(opt) { options|=opt }

function clearOption(opt) { options&=(DEBUGMODE*2-opt-1) }

//
// Background color functions
//
function color(a,b,c) {
   if (a<b) return Math.round(a+(b-a)*c/GRADIENT)
   return Math.round(b+(a-b)*(GRADIENT-c)/GRADIENT)
}

function hex(n) {
   var digits='0123456789ABCDEF'
   return digits.charAt(Math.floor(n/16))+digits.charAt(n%16)
}

function getColor(n,c) {
   var i=Math.floor(n/GRADIENT)
   n%=GRADIENT
   var r=color(R[i],R[i+1],n)
   var g=color(G[i],G[i+1],n)
   var b=color(B[i],B[i+1],n)
   if (c && Math.abs(128-r)<16 && Math.abs(128-g)<16 && Math.abs(128-b)<16) return "#000000"
   if (c) return '#'+hex(255-r)+hex(255-g)+hex(255-b)
   return '#'+hex(r)+hex(g)+hex(b)
}

//
// Drag & drop functions
//
function getx(event) { return document.all?window.event.clientX:event.pageX }

function gety(event) { return document.all?window.event.clientY:event.pageY }

function setColors() {
   for (var f=0;document.forms[f];f++) for (var e=0;document.forms[f].elements[e];e++)
      if (document.forms[f].elements[e].style) {
         document.forms[f].elements[e].style.color=document.fgColor
         document.forms[f].elements[e].style.backgroundColor=document.bgColor
      }
   if (HELPER && !HELPER.closed) inheritColors(document,HELPER.document)
}

function colorClick(event) {
   var x=getx(event)
   var XC=x-Math.round((width-leftMargin-rightMargin-(R.length-1)*GRADIENT)/2)-leftMargin
   document.bgColor=getColor(XC,0)
   document.fgColor=getColor(XC,1)
   setColors()
}

function startDrag(event) {
   var x=getx(event)
   var y=gety(event)
   dragging=1
   dragX=x+Math.round(Images[pic].left*Images[pic].zoom)-leftOffset
   dragY=y+Math.round(Images[pic].top*Images[pic].zoom)-topOffset
   if (document.all) {
      if (window.event.button==1) dragZ=1.25
      if (window.event.button==2) dragZ=0.80
   } else {
      if (event.which==1) dragZ=1.25
      if (event.which==3) dragZ=0.80
   }
   if (document.all) window.event.cancelBubble=true
   return false
}

function drag(event) {
   if (dragging) {
      var x=getx(event)
      var y=gety(event)
      var l=Images[pic].left
      var t=Images[pic].top
      if (dragX!=x+Math.round(Images[pic].left*Images[pic].zoom-leftOffset) &&
          dragY!=y+Math.round(Images[pic].top*Images[pic].zoom)-topOffset) dragZ=0
      Images[pic].left+=Math.round((dragX+X-x)/Images[pic].zoom)
      Images[pic].top+=Math.round((dragY+Y-y)/Images[pic].zoom)
      if (Images[pic].top>(Images[pic].image.height-H/Images[pic].zoom))
         Images[pic].top=Math.round(Images[pic].image.height-H/Images[pic].zoom)
      if (Images[pic].left>(Images[pic].image.width-W/Images[pic].zoom))
         Images[pic].left=Math.round(Images[pic].image.width-W/Images[pic].zoom)
      if (Images[pic].top<0) Images[pic].top=0
      if (Images[pic].left<0) Images[pic].left=0
      if (Images[pic].left!=l || Images[pic].top!=t) renderImage()
      if (document.all) window.event.cancelBubble=true
      return false
   }
   if (document.routeEvent) document.routeEvent(event)
   return true
}

function stopDrag(event) {
   var x=getx(event)
   var y=gety(event)
   if (dragZ!=0) {
      dragZ*=Images[pic].zoom
      if (Images[pic].image.width*dragZ<50 || dragZ>6.0) {
         Images[pic].fixed=0
         Images[pic].top=0
         Images[pic].left=0
      } else {
         Images[pic].top=Math.round((y-Y)/Images[pic].zoom-(y-Y-Images[pic].top*Images[pic].zoom)/dragZ)
         Images[pic].left=Math.round((x-X)/Images[pic].zoom-(x-X-Images[pic].left*Images[pic].zoom)/dragZ)
         Images[pic].zoom=dragZ
         Images[pic].fixed=1
      }
      renderImage()
   }
   dragging=dragZ=0
   if (document.all) window.event.cancelBubble=true
   return false
}

//
// Mozilla wrappers for drag & drop
//
function mozimageClick(event) {
   var x=getx(event)
   var y=gety(event)
   var l=X+Math.floor(Images[pic].left*Images[pic].zoom)
   var t=Y+Math.floor(Images[pic].top*Images[pic].zoom)
   return x>l && x<l+W && y>t && y<t+H
}

function mozcolorClick(event) {
   var x=getx(event)
   var y=gety(event)
   var l=getX('colorbar')
   var t=getY('colorbar')
   return y>t && y<=t+divHeight('colorbar') && x>l && x<=l+divWidth('colorbar')
}

function mozstartDrag(event) {
   if (mozcolorClick(event) && options&ADVANCED && spectrum) {
      colorClick(event)
      return false
   }
   if (mozimageClick(event) && isImage(pic) && Images[pic].status==1) {
      if (options&ZOOM) return startDrag(event)
      nextImage()
      return false
   }
   document.routeEvent(event)
   return true
}

function mozdrag(event) {
   if (mozimageClick(event) && isImage(pic) && Images[pic].status==1) return drag(event)
   dragging=0
   document.routeEvent(event)
   return true
}

function mozstopDrag(event) {
   if (mozimageClick(event) && isImage(pic) && Images[pic].status==1) return stopDrag(event)
   dragging=dragZ=0
   document.routeEvent(event)
   return true
}

//
// JSviewer main program
//
function main() {
   if (preload) preload()

   // Set JSviewer defaults
   setDefaults()

   // Initialize random image history
   for (index=History.length;index;) History[--index]=-1

   // Restore previous state if exists
   if (getCookie('state')) restoreState()

   // Start debugger if necessary
   if (options&DEBUGMODE) startDebug()
   debug(T('Initializing JSviewer'))
   if (languages) debug(T('Language')+'='+language+' '+T(languages[language]))

   // Get screen dimensions
   if (document.all) {
      document.body.scroll='no'
      width=document.body.clientWidth
      height=document.body.clientHeight
   } else {
      width=window.innerWidth
      height=window.innerHeight
   } 
   fullscreen=(height>screen.availHeight-15 && width>screen.availWidth-15)
   debug('width='+width+' height='+height)
   dragZ=kpic=topOffset=bottomOffset=leftOffset=rightOffset=captionOffset=0

   // Calculate font size
   var x=width-leftMargin-rightMargin
   var y=height-topMargin-bottomMargin
   fontsize=Math.floor((x<y?x:y)/42)
   if (fontsize>maxfont) fontsize=maxfont
   if (fontsize<minfont) fontsize=minfont
   fontstyle=' style=font-size:'+fontsize+'pt '

   // Get image list from source document
   setVisibility('picture',1)
   if (!getElement('data')) return error(T('Missing data source'))
   var data=getDoc('data')
   if (data && data.forms[0]) data=data.forms[0].pictures
   else return error(T('Invalid data source'))

   // Initialize picture layer
   notify(T('Loading images'))

   // Inherit colors from opening window
   if (fullscreen && parent.opener && parent.opener.gofullScreen)
      inheritColors(parent.opener.document,document)
   if (parent && parent.frames[0]) outerframe=parent.frames[0].document

   // Initialize navigation controls
   if (data) {
      var advanced,controls
      var help=button(T('Help'),'toggleOption(HELP)',stat(T('Display JSviewer help')))
      var thumbnails=link('toggleOption(THUMBS)',vstat('options&THUMBS?\''+T('Hide thumbnail images')+'\':\''+T('Show thumbnail images')+'\''),T('thumbs'))
      var first=button(' |&lt; ','firstImage()',stat(T('First image')))
      var previous=button(' &lt; ','previousImage()',stat(T('Previous image')))
      var menu='<select name=images align=absmiddle onchange=displayImage(save(this.selectedIndex)) '+stat(T('Select an image to display'))+fontstyle+'> '
      for (var i=0;i<data.options.length;i++) {
         Images[i]=new JSImage()
         Thumbs[i]=new JSImage()
         var comment=data.options[i].text
         while (comment.indexOf("'")!=-1) comment=comment.replace("'","&acute;")
         menu+='<option value="'+data.options[i].value+'"> '+(i+1)+'. '+comment
      }
      menu+='</select> '
      var next=button(' &gt; ','nextImage()',stat(T('Next image')))
      var last=button(' &gt;| ','lastImage()',stat(T('Last image')))
      var startbutton=button(options&SLIDESHOW?T('Stop'):T('Start'),'slideshow()','name=startstop '+vstat('(options&SLIDESHOW?\''+T('Stop')+'\':\''+T('Start')+'\')+\' '+T('slideshow')+'\''))
      var adv=link('toggleOption(ADVANCED)',vstat('(options&ADVANCED?\''+T('Hide advanced options')+'\':\''+T('Show advanced options')+'\')'),'advanced')

      var speed=link('slower()',stat(T('Display images slower')),'-')+' '+T('speed')+' '+
                link('faster()',stat(T('Display images faster')),'+')
      var gofullscreen=link('gofullScreen()',stat(T('Maximize window size')),T('full screen'))
      if (fullscreen) gofullscreen=''

      // Initialize advanced controls
      var effects=checkbox(EFFECTS,vstat('(this.checked?\''+T('Disable image effects')+'\':\''+T('Enable image effects')+'\')'),T('effects'))
      if (!document.all) effects=''
      var maxsize=checkbox(MAXSIZE,stat(T('Maximize image size on screen')),T('max size'))
      var random=checkbox(RANDOM,stat(T('Randomize images')),T('random'))
      var precache=checkbox(PRECACHE,stat(T('Pre-load images in the background')),T('pre-cache'))

      switch (controlstyle) {
         case 'bmw': controls=menu+first+previous+next+last+startbutton
                     advanced='Choose a background color'
                     break;
         case 'ccd': controls=menu+startbutton
                     advanced=effects+maxsize+random+precache
		     break;
	 case 'mer': controls=gofullscreen+speed+previous+menu+next+startbutton
                     advanced=effects+maxsize+random+precache
                     break;
         case 'old': controls=thumbnails+previous+menu+next+startbutton+adv
                     advanced=gofullscreen+speed+effects+maxsize+random+precache
                     break;
         case 'per': controls=startbutton
                     advanced=menu
                     break;
         case 'rkh': controls=menu+first+previous+next+last+startbutton
                     advanced=effects+maxsize+random+precache
                     break;
         default: controls=help+previous+menu+next+startbutton
                  advanced=effects+maxsize+random+precache
      }
      output('navbar',form(controls))
      output('advbar',form(advanced))

   } else return error(T('Pictures not found in data source'))

   // Initialize misc controls
   if (languages) {
      var menu='<select onchange="setCookie(\'language\',this.options[this.selectedIndex].value); redraw();" '+stat(T('Select a language'))+fontstyle+'><option value="">'+T('Default')
      for (var l in languages) menu+='<option value='+l+(language==l?' selected':'')+'> '+T(languages[l])
      menu+='</select> '
      output('langs',form(menu))
      setXY('langs',leftMargin+10,height-bottomMargin-divHeight('langs')+10)
   }
   output('closer',font(link('exitfullScreen()','','X')))
   setXY('closer',width-20,0)
   setVisibility('closer',fullscreen)
   output('control',small(link('toggleOption(CONTROLS)','','.')))
   setXY('control',width-10,height-24)
   setVisibility('control',1)
   if (!framesok) output('noframes',small('<a target=_top href="'+document.URL+'" onclick=saveState() style=text-decoration:none>'+T('full window')+'</a>'))
   setXY('noframes',leftMargin+5,topMargin+5)
   output('lessthumbs',font(link('lessThumbs()',stat(T('Fewer thumbnails')),'-')))
   output('morethumbs',font(link('moreThumbs()',stat(T('More thumbnails')),'+')))

   // Set globals to point to select box and start/stop button
   var doc=getDoc('navbar')
   for (var f=0;doc.forms[f];f++) if (doc.forms[f].startstop) startstop=doc.forms[f].startstop
   for (var f=0;doc.forms[f];f++) if (doc.forms[f].images) images=doc.forms[f].images
   doc=getDoc('advbar')
   for (var f=0;doc.forms[f];f++) if (doc.forms[f].startstop) startstop=doc.forms[f].startstop
   for (var f=0;doc.forms[f];f++) if (doc.forms[f].images) images=doc.forms[f].images

   // Determine starting picture
   pics=images.length
   if (!pics) return error(T('No images defined in pictures list'))
   if (!pic) pic=options&RANDOM?pick(-1,pics):0 
   if (options&RANDOM && History[index]==-1) save(pic)

   // Initialize lookahead
   lookahead=options&RANDOM?pick(pic,pics):(pic+1)%pics

   // Start pre-caching images in the background
   preFetch(pic)

   // Setup hooks to drag, drop & zoom images
   if (document.captureEvents) {
      debug(T('Setup Mozilla event handlers'))
      document.captureEvents(Event.MOUSEDOWN|Event.MOUSEMOVE|Event.MOUSEUP|Event.MOUSEOUT)
      document.onmousedown=mozstartDrag
      document.onmousemove=mozdrag
      document.onmouseup=mozstopDrag
      document.onmouseout=mozstopDrag
   }

   // Capture keystrokes and resize events
   debug(T('Capturing keystroke and resize events'))
   if (document.addEventListener) document.addEventListener('khtml_keypress',getKey,false)
   if (window.captureEvents) window.captureEvents(Event.RESIZE|Event.KEYPRESS)
   if (document.all) document.onkeypress=getKey
   window.onresize=redraw
   window.onkeypress=getKey

   // Initialize colorbar
   if (document.body && !(document.body.background || document.body.style.filter)) {
      var colors=new Image()
      colors.onload=function() { spectrum=1; window.setTimeout('toggleVisibility()',100) }
      colors.src='spectrum.png'
      output('colorbar','<img src=spectrum.png width='+((R.length-1)*GRADIENT)+' height=5 alt="'+T('Choose a background color')+'"'+(document.all?' onclick=colorClick()':'')+'>')
   }

   // Set button and scrollbar colors
   setColors()

   // Display image and thumbnails
   toggleVisibility()
   displayImage(pic)

   // Close help window when unloading JSviewer
   if (options&HELP) showHelp()
   window.onunload=function() {
     if (HELPER && !HELPER.closed) HELPER.close()
     if (DEBUG && !DEBUG.closed) DEBUG.close()
   }
}

// Set JSviewer default options
options=getCookie('options')
if (!options) options=CAPTIONS|CONTROLS|CONTROLTOP|EFFECTS|PRECACHE|SLIDESHOW|ZOOM

// Create dynamic HTML layers
createLayers()

isIE5=navigator.userAgent.indexOf('MSIE 5.')>0

preload=window.onload
window.onload=main
