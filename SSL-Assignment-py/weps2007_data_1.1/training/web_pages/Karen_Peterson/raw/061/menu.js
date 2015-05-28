var Categories = new Array("ra","events","cs","dt","ag","help")
var Circles = new Array()

for (i=0;i<Categories.length;i++){
	abbrev = Categories[i]
	Categories[i] = new Object
	Categories[i].abbrev = abbrev
}

var trans = new Image(); trans.src = "/images/trans_pixel.gif"

var MENU_ON = true, MENU_OFF = false
var content = null
var header = self
var Headers = new Array()

var Delay = new Object
Delay.menu = null
Delay.period = new Array()
Delay.display = null

function showMenu(category,state){
	if (readyState!="complete") return
	Delay.menu = category-1
	Delay.display = state
	if(state){
		if (Delay.period[Delay.menu]) clearDelay(Delay.menu)
		//document.images["circle"+(Delay.menu+1)].src = Circles[Delay.menu].on.src
		showItems(Delay.menu)
	} else {
		setDelay(Delay.menu)
	}
}

function showItem(m,n,state){
	Delay.display = state
	if (state){
		clearDelay(m)
		Menus[m].items[n].on.show()
	} else {
		Menus[m].items[n].on.hide()
		setDelay(m)
	}
}

function showItems(n){
	Menus[n].obj.show()
	for (i=0;i<Menus[n].items.length;i++){
		Menus[n].items[i].off.show()
		Menus[n].items[i].cover.show()
	}
}

function hideItems(n){
	Menus[n].obj.hide()
	for (i=0;i<Menus[n].items.length;i++){
		Menus[n].items[i].on.hide()
		Menus[n].items[i].off.hide()
		Menus[n].items[i].cover.hide()
	}
}

function setDelay(t){
	Delay.period[t] = setTimeout('hideItems('+t+');//document.images["circle'+(t+1)+'"].src = Circles['+t+'].off.src;',10) //"Categories["+Delay.menu+"].on.hide();Menus["+Delay.menu+"].obj.hide()",10) 
}

function clearDelay(t){
	clearTimeout(Delay.period[t])
	Delay.period[t] = 0
}

var Menus = new Array()
var ITEM_ON = 1, ITEM_OFF = 0

function Menu(name,w,bg,bd,tc,htc){
	var menuXvalues = new Array(53,122,201,305,387,649)
	this.index = Menus.length
	this.id = "menu"+(this.index+1)
	this.name = name
	this.width = w
	this.left = menuXvalues[this.index]
	this.bgColor = bg
	this.borderColor = bd
	this.textColor = tc
	this.highlightTextColor = htc
	this.addItem = mnu_addItem
	this.create = mnu_create
	this.init = mnu_init
	this.items = new Array()
	Menus[this.index] = this
}

function mnu_addItem(text,href,newWin){
	this.items[this.items.length] = new Array(text,href,newWin)
}

function mnu_create(){
	menuTop = 71
	itemHeight = 17
	this.height = this.items.length*(itemHeight+1)+1
	menuStyle = 'position:absolute; top:'+menuTop+'px; '
	menuStyle += 'left:' + this.left + 'px; '
	menuStyle += 'width:' + this.width + 'px; '
	menuStyle += 'height:' + this.height + 'px; '
	menuStyle += 'clip:rect(0px,' + this.width + 'px,'+ this.height +'px,0px); '
	menuStyle += 'background-color:' + this.borderColor + '; layer-background-color:' + this.borderColor + '; z-index:1000; visibility:hidden; '
	strMenu = '<div id="'+this.id+'" style="'+menuStyle+'"></div>\n'
	var menuXvalues = new Array(53,122,201,305,387,649)
		for(n=0;n<this.items.length;n++){
		itemWidth = this.width-2
		itemStyle = 'position:absolute; top:'+(n*18+1+menuTop)+'px; left:'+(menuXvalues[this.index]+1)+'px; height:' + itemHeight + 'px; width:' + itemWidth + 'px; clip:rect(0px,' + itemWidth + 'px,'+ itemHeight +'px,0px); z-index:1001; visibility:hidden; '
		coverStyle = 'position:absolute; top:'+(n*18+menuTop)+'px; left:'+(menuXvalues[this.index])+'px; height:' + (itemHeight+1) + 'px; width:' + (itemWidth+2) + 'px; clip:rect(0px,' + (itemWidth+2) + 'px,'+ (itemHeight+1) +'px,0px); z-index:1002; visibility:hidden; '
		
		if (this.items[n][2] == "1") {
			clickTo = 'openNewAdmin(\''+this.items[n][1]+'\')'
			linkTo = '#';
		} else if (this.items[n][2] == "2") {
			clickTo = 'window.open(\''+this.items[n][1]+'\',\'_blank\',\'menubar=yes,toolbar=yes,scrollbars=yes,location=yes,status=yes,resizable=yes\')'
			linkTo = '#';
		} else {
			clickTo = (bw.ns4)?'':'gotoLink(\''+this.items[n][1]+'\')'
			linkTo = this.items[n][1]
		}
		
		itemEvents = (bw.ns4)?'"><a href="'+linkTo+'" onclick="'+clickTo+'" onmouseover="showItem('+this.index+','+n+',ITEM_ON)" onmouseout="showItem('+this.index+','+n+',ITEM_OFF)"><img src="/images/trans_pixel.gif" width="'+(this.width-1)+'" height="'+(itemHeight+1)+'" border="0" alt=""></a>':'" onclick="'+clickTo+'" onmouseover="showItem('+this.index+','+n+',ITEM_ON)" onmouseout="showItem('+this.index+','+n+',ITEM_OFF)" class="cover"><img src="/images/trans_pixel.gif" width="'+(this.width-1)+'" height="'+itemHeight+'" border="" alt="">'
				
		m = n+1
		strMenu += '<div id="'+this.id+m+'off" style="'+itemStyle+'color:'+this.textColor+'; background-color:' + this.bgColor + '; layer-background-color:' + this.bgColor + '"><span class="content">&nbsp;'+this.items[n][0]+'</span></div>\n'
		strMenu += '<div id="'+this.id+m+'on" style="'+itemStyle+'color:'+this.highlightTextColor+'; background-color:#ffffff; layer-background-color:#ffffff; visibility:hidden;"><span class="content">&nbsp;'+this.items[n][0]+'</span></div>\n'
		strMenu += '<div id="'+this.id+m+'cover" style="'+coverStyle+itemEvents+'</div>\n'
	}
	return strMenu
}

function mnu_init(){
	this.obj = new objLayer(this.id)
	for(n=0;n<this.items.length;n++){
		this.items[n].on = new objLayer(this.id+(n+1)+'on')
		this.items[n].off = new objLayer(this.id+(n+1)+'off')
		this.items[n].cover = new objLayer(this.id+(n+1)+'cover')
	}
}


function gotoLink(href){
	location.href = href
}

