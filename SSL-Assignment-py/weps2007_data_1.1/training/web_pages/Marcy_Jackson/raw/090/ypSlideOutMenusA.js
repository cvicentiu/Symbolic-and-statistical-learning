/*****************************************************
* ypSlideOutMenu
* Code from  www.youngpup.net
* --youngpup--  3/04/2001
*****************************************************/
IE = document.all?1:0;
NAV6 = document.getElementById?1:0;

nav=(navigator.appName.indexOf("Netscape") != -1)?1:0; 
ie2=(navigator.userAgent.indexOf("MSIE") != -1)?1:0;
v4=(parseInt(navigator.appVersion)>=4)?1:0;
ie=(document.all && v4)?1:0;
ie4=(nav || document.getElementById)?1:0;
ns=(document.layers && v4)?1:0;
nc=(!ie && document.getElementById)?1:0;







function writeDept(){
dp = new Array;
dp[1] = new Array("All Departments","http://www.seattle.gov/html/citizen/departments.htm")              
dp[2] = new Array("Animal Shelter","http://www.seattle.gov/animalshelter/")
dp[3] = new Array("Aquarium","http://www.seattleaquarium.org/") 
dp[4] = new Array("Arts & Cultural Affairs","http://www.seattle.gov/arts/")
dp[5] = new Array("Boards & Commissions","http://www.seattle.gov/html/citizen/boardsportal.htm")
dp[6] = new Array("Citizens Service Bureau","http://www.seattle.gov/CitizenService/")
dp[7] = new Array("City Attorney","http://www.seattle.gov/law/")
dp[8] = new Array("City Auditor","http://www.seattle.gov/audit/")
dp[9] = new Array("City Clerk","http://www.seattle.gov/leg/clerk/clerk.htm")
dp[10] = new Array("City Council","http://www.seattle.gov/council/default.htm")
dp[11] = new Array("City Light","http://www.seattle.gov/light/")
dp[12] = new Array("Civil Rights","http://www.seattle.gov/civilrights/")
dp[13] = new Array("Civil Service Commission","http://www.seattle.gov/csc/")
dp[14] = new Array("Design Commission","http://www.seattle.gov/dpd/planning/design_commission/overview/")  
dp[15] = new Array("Economic Development","http://www.seattle.gov/EconomicDevelopment/")
dp[16] = new Array("Emergency Management","http://www.seattle.gov/emergency/")
dp[17] = new Array("Ethics and Elections","http://www.seattle.gov/ethics/")
dp[18] = new Array("Executive Administration","http://www.seattle.gov/executiveadministration/")  
dp[19] = new Array("Finance Department","http://www.seattle.gov/financedepartment/")
dp[20] = new Array("Fire Department","http://www.seattle.gov/fire/")
dp[21] = new Array("Fleets & Facilities","http://www.seattle.gov/fleetsfacilities/")
dp[22] = new Array("Health Department","http://www.metrokc.gov/health/")
dp[23] = new Array("Hearing Examiner","http://www.seattle.gov/examiner/")
dp[24] = new Array("Housing","http://www.seattle.gov/housing/default.htm")
dp[25] = new Array("Human Services","http://www.seattle.gov/humanservices/")
dp[26] = new Array("Information Technology","http://www.seattle.gov/doit/default.htm")
dp[27] = new Array("Intergovernmental Relations","http://www.seattle.gov/oir/")
dp[28] = new Array("Library","http://www.spl.org/")
dp[29] = new Array("Mayor's Office","http://www.seattle.gov/mayor/")
dp[30] = new Array("-&nbsp;&nbsp;Education","http://www.seattle.gov/neighborhoods/education/")
dp[31] = new Array("-&nbsp;&nbsp;Film and Music","http://www.seattle.gov/filmandmusic/")
dp[32] = new Array("-&nbsp;&nbsp;Senior Citizens","http://www.seattle.gov/humanservices/mosc/")
dp[33] = new Array("Municipal Court","http://www.seattle.gov/courts/")
dp[34] = new Array("Neighborhoods","http://www.seattle.gov/neighborhoods/")
dp[35] = new Array("Parks and Recreation","http://www.seattle.gov/parks/")
dp[36] = new Array("Personnel","http://www.seattle.gov/Personnel/")
dp[37] = new Array("Planning & Development","http://www.seattle.gov/dpd/")  
dp[38] = new Array("Planning Commission","http://www.seattle.gov/planningcommission/")
dp[39] = new Array("Police Department","http://www.seattle.gov/police/")
dp[40] = new Array("Public Safety CSC","http://www.cityofseattle.net/pscsc/") 
dp[41] = new Array("Public Utilities","http://www.seattle.gov/util/")
dp[42] = new Array("Retirement Office","http://www.seattle.gov/retirement/")  
dp[43] = new Array("Seattle Center","http://www.seattlecenter.com/")
dp[44] = new Array("Seattle Channel","http://www.seattlechannel.org/")  
dp[45] = new Array("Sustainability &amp; Environment","http://www.seattle.gov/environment/")
dp[46] = new Array("Transportation","http://www.seattle.gov/transportation/")

document.write('<div style="visibility:hidden;" id="deptContainer" align="left">');
document.write('<div style="visibility:inherit;overflow:auto;height:200px;z-index:500" id="deptContent" class="menuCont">');
document.write('<div style="visibility:inherit;z-index:500" class="options">');
  for (var i=1;i<dp.length;i++){
  document.write('<div style="visibility:inherit;z-index:500" class="menu"><a class="pan_text" href="'+dp[i][1]+'"><b>'+dp[i][0]+'</b></a></div>')
  }
  document.write('</div></div></div>')  
}

function rePosx(){
var IE = document.all?true:false
var tempX
if (IE) { 
  tempX = document.all.DeptName.offsetLeft 
  if(tempX == 0){tempX = ((document.body.offsetWidth/2) - 210)}
  return tempX
} else if(NAV6){  
  tempX = document.getElementById('DeptName').offsetLeft
  return tempX 
} else {
  return true 
  }
}

function rePosy(){
var IE = document.all?true:false
var tempY
if (IE) { 
  tempY = document.all.DeptName.offsetTop 
  if(tempY == 0){return tempY + 23}
  else {return tempY -177
  }
   
} else if(NAV6) {  
  tempY = document.getElementById('DeptName').offsetTop
  return tempY - 177
} else { 
  return true
  }
}

ypSlideOutMenu.Registry = []
ypSlideOutMenu.aniLen = 250
ypSlideOutMenu.hideDelay = 500
ypSlideOutMenu.minCPUResolution = 10

ypSlideOutMenu.styleMod = '';

function ypSlideOutMenu(id, dir, left, top, width, height, parentid, degrade, debug)
{

	this.ie = document.all ? 1 : 0
	this.ns4 = document.layers ? 1 : 0
	this.dom = document.getElementById ? 1 : 0
	if (this.ie || this.ns4 || this.dom) {
		this.degrade = degrade;
		this.debug = debug;
		this.sliding = false;
		this.id = id
		this.parentid = parentid
		this.dir = dir
		this.orientation = dir == "left" || dir == "right" ? "h" : "v"
		this.dirType = dir == "right" || dir == "down" ? "-" : "+"
		this.dim = this.orientation == "h" ? width : height
		this.hideTimer = false
		this.aniTimer = false
		this.open = false
		this.over = false
		this.startTime = 0
		this.gRef = "ypSlideOutMenu_"+id
		eval(this.gRef+"=this")
		ypSlideOutMenu.Registry[id] = this
		
		this.initleft = left
		this.inittop = top
		this.initwidth = width
		this.initheight = height
		this.showcount = 0;
// The following code originally invoked "document.write" but it caused
// a crash in IE (but not NS) when there were
// more than 31 menus total.  What crashed is that the styles that were
// declared in the css disappeared with 31 menus, where 32 menus caused
// the d.write call to fail entirely.  When I changed
// it so that the style changes were accumulated into one string
// (then at the end that string was written into the document,
// so that document.write was only called once) this solved the problem.

		ypSlideOutMenu.styleMod += '#' + this.id + 'Container { visibility:hidden; ';
		ypSlideOutMenu.styleMod += 'left:' + left + 'px; ';
		ypSlideOutMenu.styleMod += 'z-index:500; ';
		ypSlideOutMenu.styleMod += 'top:' + top + 'px; ';
		ypSlideOutMenu.styleMod += 'overflow:hidden; }';
		ypSlideOutMenu.styleMod += '#' + this.id + 'Container, #' + this.id + 'Content { position:absolute; ';
		ypSlideOutMenu.styleMod += 'height:' + height + 'px; ';
		ypSlideOutMenu.styleMod += 'width:' + width + 'px; ';
		ypSlideOutMenu.styleMod += 'z-index:500; ';
		ypSlideOutMenu.styleMod += 'clip:rect(0 ' + width + ' ' + height + ' 0); ';
		ypSlideOutMenu.styleMod += '}  ';
		this.load()
	}
}

ypSlideOutMenu.prototype.load = function() {
	var d = document
	var lyrId1 = this.id + "Container"
	var lyrId2 = this.id + "Content"
	var obj1 = this.dom ? d.getElementById(lyrId1) : this.ie ? d.all[lyrId1] : d.layers[lyrId1]
	if (obj1) var obj2 = this.ns4 ? obj1.layers[lyrId2] : this.ie ? d.all[lyrId2] : d.getElementById(lyrId2)
	if (!obj1 || !obj2) {
		window.setTimeout(this.gRef + ".load()", 1000);
	} else {
		this.container = obj1
		this.menu = obj2
		this.style = this.ns4 ? this.menu : this.menu.style
		// SEE NOTE ABOVE.  The following function call for the 31 menus bug.
		//this.setStyle()
		this.homePos = eval("0" + this.dirType + this.dim)
		this.outPos = 0
		this.accelConst = (this.outPos - this.homePos) / ypSlideOutMenu.aniLen / ypSlideOutMenu.aniLen 
		if (this.ns4) this.menu.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT);
		this.menu.onmouseover = new Function("ypSlideOutMenu.showMenu('" + this.id + "')")
		this.menu.onmouseout = new Function("ypSlideOutMenu.hideMenu('" + this.id + "')")
		this.endSlide()
	}
}

ypSlideOutMenu.showMenu = function(id, e)
{

	var reg = ypSlideOutMenu.Registry
	var obj = ypSlideOutMenu.Registry[id]
	if (obj.container) {
//		if (obj.ie) alert('showing: ' + id);
		obj.over = true
		if (obj.hideTimer) { reg[id].hideTimer = window.clearTimeout(reg[id].hideTimer) }
		obj.showcount++;
		if (!obj.open && !obj.aniTimer) reg[id].startSlide(true)
	}
	if (obj.ns4) obj.menu.routeEvent(Event.MOUSEOVER);
}

ypSlideOutMenu.hideMenu = function(id, e)
{
	var obj = ypSlideOutMenu.Registry[id]
	if (obj.container) {
//		if (obj.ie) alert('hiding: ' + id);
		if (obj.hideTimer) window.clearTimeout(obj.hideTimer)
		obj.showcount--;
		obj.hideTimer = window.setTimeout("ypSlideOutMenu.hide('" + id + "')", ypSlideOutMenu.hideDelay);
	}
	if (obj.ns4) obj.menu.routeEvent(Event.MOUSEOUT);
}

/*
ypSlideOutMenu.prototype.isOverMenu = function(evnt) {
	if (evnt) {
		return ((this.initleft < evnt.pageX && evnt.pageX < (this.initleft + this.initwidth)) && (this.inittop < evnt.pageY && evnt.pageY < (this.inittop + this.initheight)))?true:false;
	} else {
		return true;
	}
}
*/

ypSlideOutMenu.hide = function(id) {
	var obj = ypSlideOutMenu.Registry[id]
	var reg = ypSlideOutMenu.Registry
	obj.over = false
	if (obj.hideTimer) window.clearTimeout(obj.hideTimer)
	obj.hideTimer = 0
	var close = true;
	for (menu in reg) {
		// for each child, if either
		//  1. the child is open or
		//  2. the child is closing (but hasn't closed yet)
		// then we don't close this menu.
		var pid = ypSlideOutMenu.Registry[menu].parentid
		if (pid == id) {
			if (ypSlideOutMenu.Registry[menu].open) close = false;
			if (!ypSlideOutMenu.Registry[menu].open && ypSlideOutMenu.Registry[menu].sliding) close = false;
		}
	}
	if (obj.open && !obj.aniTimer && close && !obj.showcount) obj.startSlide(false);
}


ypSlideOutMenu.prototype.startSlide = function(open) {
	this.open = open
	if (open) this.setVisibility(true)
	this.startTime = (new Date()).getTime() 
	this.sliding = true;
	this.aniTimer = window.setInterval(this.gRef + ".slide()", ypSlideOutMenu.minCPUResolution)
}

ypSlideOutMenu.prototype.slide = function() {
	var elapsed = (new Date()).getTime() - this.startTime
	if (elapsed > ypSlideOutMenu.aniLen) this.endSlide()
	else {
		var d = Math.round(Math.pow(ypSlideOutMenu.aniLen-elapsed, 2) * this.accelConst)
		if (this.open && this.dirType == "-") d = -d
		else if (this.open && this.dirType == "+") d = -d
		else if (!this.open && this.dirType == "-") d = -this.dim + d
		else d = this.dim + d
		this.moveTo(d)
	}
}

ypSlideOutMenu.prototype.endSlide = function() {
	this.aniTimer = window.clearTimeout(this.aniTimer)
	this.moveTo(this.open ? this.outPos : this.homePos)
	if (!this.open) this.setVisibility(false)
	this.sliding = false;
	if (((this.open && !this.over) || (!this.open && this.over)) && (!this.parent || this.parent.open)) {
		this.startSlide(this.over)
	} else {
		var overchild = false;
		var reg = ypSlideOutMenu.Registry
		for (menu in reg) {
			var pid = ypSlideOutMenu.Registry[menu].parentid
			if (pid == this.id) overchild = ypSlideOutMenu.Registry[menu].over ? true : overchild		
		}
//		if (!overchild && this.parentid && !ypSlideOutMenu.Registry[this.parentid].over) ypSlideOutMenu.hideMenu(this.parentid);
		if (!overchild && this.parentid && !ypSlideOutMenu.Registry[this.parentid].over) ypSlideOutMenu.hide(this.parentid);
	}
}

ypSlideOutMenu.prototype.setVisibility = function(bShow) { 
	var s = this.ns4 ? this.container : this.container.style
	s.visibility = bShow ? "visible" : "hidden"
}

ypSlideOutMenu.prototype.moveTo = function(p) { 
	this.style[this.orientation == "h" ? "left" : "top"] = p
}

ypSlideOutMenu.prototype.getPos = function(c) {
	return parseInt(this.style[c])
}

