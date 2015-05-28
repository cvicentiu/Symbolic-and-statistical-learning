function checkBrowser(){
	this.win=(navigator.platform=="Win32")?1:0;
	this.mac=(navigator.platform=="MacPPC")?1:0;
	this.ver=navigator.appVersion;
	this.dom=document.getElementById?1:0;                                      /* The getElementById method is applicable to 5th generation browsers only. */
	this.ie6=(this.ver.indexOf("MSIE 6")!=-1 && this.dom)?1:0;                 /* Will handle both ie5 and ie5.5 */
	this.ie5=(this.ver.indexOf("MSIE 5")!=-1 && this.dom)?1:0;                 /* Will handle both ie5 and ie5.5 */
	this.ie4=(document.all && !this.dom)?1:0;                                  /* Specifically ie4 */
	this.ns6=(this.dom && parseInt(this.ver)>=5)?1:0;			   /* Netscape 6 (Mozilla) */
	this.ns4=(document.layers && !this.dom)?1:0;				
	this.ns = ((this.ns4 == 1) || (this.ns6 == 1))?1:0;
	this.ie = ((this.ie4 == 1) || (this.ie5 == 1) || (this.ie6 == 1))?1:0;
	this.bw=(this.ie6 || this.ie5 || (this.ie4 == 1) || this.ns4 || this.ns5); /* Only IE or Navigator */

	if (this.ns4) {
		lastWidth = window.innerWidth;
		lastHeight = window.innerHeight;
		window.onresize = handleResize;
	}
	return this
}

var bw = new checkBrowser();

function handleResize(){
	winWidth = window.innerWidth;
	winHeight = window.innerHeight
	if ((lastWidth != winWidth) || (lastHeight != winHeight)){
		lastWidth = winWidth;
		lastHeight = winHeight;
		location.reload();
	}
}

function objLayer(id,nest){
	nest=(!nest)?'':'document.'+nest+'.'
	
	/* object pointer */ 
	this.obj=bw.dom?document.getElementById(id):bw.ie4?document.all[id]:bw.ns4?eval(nest+'document.'+id):0	
	
	/* style reference */
	
	this.css=bw.dom?document.getElementById(id).style:bw.ie4?document.all[id].style:bw.ns4?eval(nest+'document.'+id):0
		
	if (bw.ie4 || bw.ie5 || bw.ns6) {this.x=this.css.pixelLeft; this.y=this.css.pixelTop; this.h=this.obj.clientHeight; this.w=this.obj.clientWidth}   
	if (bw.ns4) {this.x=this.css.left; this.y=this.css.top; this.h=this.obj.document.height; this.w=this.obj.document.width} 
		
	this.defaultTop = this.y	
	this.defaultBottom = this.y + this.h
	
	this.globalX = 0
	this.globalY = 0
	
	return this;
}

function obj_moveTo(x,y){
	this.x=x
	this.y=y
	this.css.left=this.x
	this.css.top=this.y
}

function obj_moveBy(x,y){
	this.x+=x
	this.y+=y
	this.css.left=this.x
	this.css.top=this.y
}

function obj_setZIndex(z){
	this.css.zIndex = z
}

function obj_clipValues(which){
	if (bw.ns4){
		if (which=="t") return this.css.clip.top
		if (which=="r") return this.css.clip.right
		if (which=="b") return this.css.clip.bottom
		if (which=="l") return this.css.clip.left
	} else {
		var clipv = this.css.clip.split("rect(")[1].split(")")[0].split("px")
		if (which=="t") return Number(clipv[0])
		if (which=="r") return Number(clipv[1])
		if (which=="b") return Number(clipv[2])
		if (which=="l") return Number(clipv[3])
	}
}

function obj_clipTo(t,r,b,l){
	if(bw.ns4){
		this.css.clip.top = t
		this.css.clip.right = r
		this.css.clip.bottom = b
		this.css.clip.left = l
	} else {
		this.css.clip="rect("+t+","+r+","+b+","+l+")"
	}
}

function obj_clipBy(t,r,b,l){
	this.clipTo(this.clipValues('t')+t,this.clipValues('r')+r,this.clipValues('b')+b,this.clipValues('l')+l)
}

function obj_hide(){
	this.css.visibility=(bw.ns4)?'hide':'hidden'
}

function obj_show(){
	this.css.visibility=(bw.ns4)?'show':'visible'
}

function obj_vis(){if(this.css.visibility=="hidden" || this.css.visibility=="hide") return true;}

function obj_writeIt(txt){
	if (bw.ns4){
		this.obj.document.write(txt)
		this.obj.document.close()
	} else {
		this.obj.innerHTML = txt
	}
}

function obj_swapImage(imgName,imgSrc){
	if (bw.ns4){
		this.obj.document.images[imgName].src = imgSrc
	} else {
		document[imgName].src = imgSrc
	}
}

objLayer.prototype.moveTo=obj_moveTo
objLayer.prototype.moveBy=obj_moveBy
objLayer.prototype.clipValues=obj_clipValues
objLayer.prototype.clipTo=obj_clipTo
objLayer.prototype.clipBy=obj_clipBy
objLayer.prototype.hide=obj_hide
objLayer.prototype.show=obj_show
objLayer.prototype.vis=obj_vis
objLayer.prototype.writeIt=obj_writeIt
objLayer.prototype.setZIndex = obj_setZIndex
objLayer.prototype.swapImage = obj_swapImage

