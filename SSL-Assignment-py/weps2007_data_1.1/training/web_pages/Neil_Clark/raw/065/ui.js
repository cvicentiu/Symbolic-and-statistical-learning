/*	
	Copyright 2006 Adobe Systems Incorporated.
	Dynamic UI Javascript (in development)
	$Revision: 1.24 $
*/
UI = function() {
this.components = {};
this.registered = {};
return this;
}
UI.prototype = {
init: function(configs) {
for(prop in configs) {
if(!this.registered[prop]) continue;
var config = configs[prop];
var component = new UIComponent();
if(config.tags) {
var subscribers = component.getDomSubscribers(config.tags, config.key, config.value);
if(subscribers && config.method) {
component.applyConfigMethod(config.method);
}
}			
this.components[prop] = component;
}
},
register: function() {
for(var i=0,len=arguments.length;i<len;i++) {
this.registered[arguments[i]] = 1;
}
}
}
UIComponent = function() {
this.members = [];
return this;
}
UIComponent.prototype = {
getDomSubscribers: function(tags, attr, value) {
var len = tags.length-1,
value = attrExp(value);
do 
{
var name = tags[len];
for(var i = 0; (t = document.getElementsByTagName(name)[i]); i++)
{
if(getAttrValue(t, attr).search(value) == -1) continue;
this.members.push({id:resolveElemId(t)});
}
}
while (len--);
return this.members.length;
},
applyConfigMethod: function(method) {
method = eval(method);
var i = this.members.length-1;
do {
method.call(this, this.members[i]);
} while(i--);
}
};
function buildPodComponent(member)
{
var handleContentAsText = (browser.ax);
var stylefirst = (com.adobe.cssprofile.features.firstchild == false); 
var id = member.id;
var pod = makePodElem($(id), id+'-body', stylefirst, handleContentAsText);
$(id).parentNode.replaceChild(pod.rootelem,$(id));
function makePodElem(elem,bodyID,stylefirst,handleContentAsText)
{
var
prevElem = null,
skinElements = {
'nw':{"elem":elem.cloneNode(false),"cssname":(elem.className.replace("dyn-pod","pod")+' nw')},
'ne':{"elem":CachedElement.create('div'),"cssname":'ne'},
'se':{"elem":CachedElement.create('div'),"cssname":'se'},
'sw':{"elem":CachedElement.create('div'),"cssname":'sw'},
'n':{"elem":CachedElement.create('div'),"cssname":'n'},
's':{"elem":CachedElement.create('div'),"cssname":'s'},
'w':{"elem":CachedElement.create('div'),"cssname":'w'},
'e':{"elem":((handleContentAsText)? CachedElement.create('DIV') : elem.cloneNode(true)),"cssname":'pod-body e'}
};
if(!handleContentAsText)
{
for(var i=0,len=skinElements.e.elem.attributes.length;i<len;i++)
{
skinElements.e.elem.removeAttribute(skinElements.e.elem.attributes[i].nodeName);
}
}
if(bodyID) 
{
skinElements.e.elem.setAttribute('id',bodyID);
}	
if(stylefirst)
{
var firsttag = getFirstTag(((handleContentAsText) ? elem : skinElements.e.elem));
var str = (!firsttag.className) ? 'first-child' : firsttag.className+' first-child';
firsttag.className = str;
if(firsttag.nodeName == 'DL' || firsttag.nodeName == 'UL'  || firsttag.nodeName == 'OL')
{
var firstItem = getFirstTag(firsttag);
var str = (!firstItem.className) ? 'first-child' : (firstItem.className+' first-child');
firstItem.className = str;
}
}
if(handleContentAsText) skinElements.e.elem.innerHTML = elem.innerHTML;
for(prop in skinElements)
{	 
skinElements[prop].elem.className =  skinElements[prop].cssname;
if(prevElem) prevElem.elem.appendChild(skinElements[prop].elem); 
prevElem = skinElements[prop];
}
return { rootelem:skinElements.nw.elem, bodyelem:skinElements.e.elem };
}
}
function balanceContentToPod()
{
var 
C1 = $('C1'),
C1b = $('C1-body'),
C2 = $('C2');
if(C1&&C1b&&C2)
{
var 
C1h = C1.offsetHeight,
C1bh = C1b.offsetHeight,
C2h = C2.offsetHeight,
isTabContent;
if (isTabContent=1) C1bh = C1bh-10;		
if(C1h<C2h)
{
var h = ((C1bh-C1h)+C2h)+"px";
if(com.adobe.cssprofile.features.layout == true)
{
C1b.style.height = h;
}
else
{
C1b.style.minHeight = h;
}
}
return true;
}	
return false;
}
function DropDownBehavior(member)
{
var elem = $(member.id);
if(!elem) return;
elem.styles = new StyleEvent(elem);
elem.styles.add('keymode','mousemode');
elem.onkeyup = function() {	this.styles.toggle('keymode','mousemode')};
elem.onmousemove = function() { this.styles.toggle('mousemode','keymode')};
masks = new Masks();
for(var i = 0; (mask = document.getElementsByName('objectMask')[i]); i++)
{
masks.add(mask);
}
var fc = com.adobe.cssprofile.features.firstchild;
for(var i=0,len = elem.childNodes.length;i<len;i++)
{
var node = elem.childNodes[i];
if(!node || node.nodeType != 1) continue;
var menu = getFirstTag(node,'UL');
menu = (menu) ? menu : getFirstTag(node,'DL');
if(!menu) continue;
if(masks.elements.length)
{
menu.hasMask = true;
menu.onmouseover = function(evt)
{
masks.setState(1);
}
menu.onmouseout = function(evt)
{
masks.setState(0);
}
}
if(!fc)
{
var f = getFirstTag(menu);
if(f)
{
f.styles = new StyleEvent(getFirstTag(menu));
f.styles.add('first-child');
f.styles.enable('first-child');
}
}
node.styles = new StyleEvent(node);
if(com.adobe.cssprofile.features.directchild == false) 
{
node.styles.add('over');
var mouseIN = (typeof document.body.onmouseenter == 'object') ? 'onmouseenter' : 'onmouseover';
var mouseOUT = (typeof document.body.onmouseleave == 'object') ? 'onmouseleave' : 'onmouseout';
node[mouseIN] = function()
{
this.styles.enable('over');
}
node[mouseOUT] = function()
{
this.styles.disable('over');
}
}
node.styles.add('focus');
var anchors = node.getElementsByTagName('A');
for(var a=0,len=anchors.length;a<len;a++)
{
var atag = anchors[a];
atag.ref = node.styles;
atag.onfocus = function()
{
this.ref.enable('focus');
}
atag.onblur = function()
{
this.ref.disable('focus');
}
}
}
return;
}
Masks = function(){return this;};
Masks.prototype = {
elements : [],
stateStyles : ['off','on'],
add : function(mask)
{
var maskobj = new StyleEvent(mask);
maskobj.add('on');
this.elements.push(maskobj);
return this.elements.length;
},
setState : function(state)
{
switch(state)
{
case 0:
this.doStyle(this.stateStyles[0],this.stateStyles[1]);
break;
case 1:
this.doStyle(this.stateStyles[1],this.stateStyles[0]);
break;
default: return;
}
},
doStyle : function(s0,s1)
{
var i=this.elements.length-1;
do 
{
this.elements[i].toggle(s0,s1);
}
while (i--);
}	
};
ToggleState = function(num)
{
this.state = (num || 0);
this.toggle = function()
{
this.state = (this.state) ? 0 : 1;
return this.state;
}
return this;
}
function buildTreeList(member) {
var styleObjects = {};
var elem = $(member.id);
for(var i=0,node; node = elem.childNodes[i]; i++) {	
if(node.nodeType==3) continue; 
switch(node.nodeName) {
case "DT":
dtID = resolveElemId(node);
styleObjects[dtID] = new Array();
var styles = new StyleEvent(node);
styles.add('on','off');
styleObjects[dtID].push(styles);
if(node.firstChild && (node.firstChild.nodeType==3)) {
var cloneTXT = node.firstChild.cloneNode(false);
var a = CachedElement.create('a');
var initnum = (styles.styles['on']) ? 1 : 0;
a.togglestate = new ToggleState(initnum);
a.styles = styleObjects[dtID];
a.onclick = function() {
var i;
this.togglestate.toggle();
switch(this.togglestate.state)
{
case 0:
for(var i=0;i<this.styles.length;i++) {
this.styles[i].toggle('off','on');
}
break;
case 1:
for(var i=0;i<this.styles.length;i++) {
this.styles[i].toggle('on','off');
}
break;
}
return void(0);
}
a.appendChild(cloneTXT);
node.replaceChild(a, node.firstChild);
}
break;
case "DD":
var ddID = resolveElemId(node);
var styles = new StyleEvent(node);
styleObjects[dtID].push(styles);
break;
}	
}
elem.className = elem.className.replace("dyn-","");
member.styleObjects = styleObjects;
}
function makeTreeExplode(member) {	
var elem = $(member.id);
var attrIds = getAttributesAtMarker(elem.rel,'dyn-','explodetree');
if(!attrIds.length) return false;
var trees = com.adobe.ui.components.trees.members;
var treeobjs = [];
for(var i=0,len=trees.length;i<len;i++)
{
var tree = trees[i];
for(var id=0,idlen=attrIds.length;id<idlen;id++)
{
attrId = attrIds[id];
if(tree.id != attrId) continue;
for(prop in tree.styleObjects)
{
treeobjs = treeobjs.concat(tree.styleObjects[prop]);
}
attrIds.splice(id,1);
}
}
var gg = new ToggleLinkText();
var itxt = gg.init(elem,1);
elem.gg = gg;
if(!elem.firstChild)
{
elem.appendChild(document.createTextNode(itxt));
}
elem.styles = treeobjs;
elem.style.cursor = "pointer";
elem.onclick = function()
{
this.firstChild.nodeValue = this.gg.run();
var s = (this.gg.state) ? ['on','off'] : ['off','on'];
for(var i=0,len=this.styles.length;i<len;i++)
{
var style = this.styles[i];
style.toggle(s[0],s[1]);
}
};
elem.firstChild.nodeValue = elem.gg.run();
return;
};
ToggleLinkText = function()
{
this.state;
this.txt;
this.init = function(a,state)
{
var text = (a.text || ""); 
this.state = (state || 0);
this.txt = [(a.title+text),(a.rev+text)];
a.removeAttribute('rev');
a.removeAttribute('title');
return this.txt[this.state];
}
this.run = function()
{
this.state = (this.state) ? 0 : 1;
return this.txt[this.state];
}
return this;
}
function buildMapHover(member) {
var elem = $(member.id);
var accentIds = getAttributesAtMarker(elem.getAttribute('rel'),'d-','accent');
elem['hovers'] = accentIds;
function dAccentEvent(evt) {
evt = (evt) ? evt : event;
var elem = ( evt.srcElement ) ? evt.srcElement : evt.target;
if(elem.nodeType == 3) { elem = elem.parentNode }
if( elem ) 
{
switch(evt.type)
{
case "mouseover":
state="on";
break;
case "mouseout":
state="";
break;
}
for(var i=0,hover; hover = elem.hovers[i]; i++)
{
$(hover).className=state;
}
}
}
elem.onmouseover = dAccentEvent;
elem.onmouseout = dAccentEvent;
return;
}
function buildTabSection(member) {
var queryPrefix = "tab:";
var newtab, nontab,
elem = $(member.id),
nav = CachedElement.create('ul'),
navstyle = (elem.className.indexOf('microtab') > -1) ? "microtab menu compact" : "tab menu compact",
tabManager = new TabManager(),
subtags = elem.childNodes;
nav.setAttribute('class', navstyle); 
if(!nav.className) nav.className = navstyle; 
for(var s=0,klen = subtags.length;s<klen;s++)
{
var kid=subtags[s];
if(!kid || (kid.nodeType != 1)) continue; 
switch(kid.className)
{
case "tabtitle":
var titleId = resolveElemId(kid); 
var contentDIVtitle = kid.firstChild; 
var menuItem = CachedElement.create('li'); 
var menuLink = CachedElement.create('a'); 
menuItem.setAttribute('id', titleId); 
newtab = tabManager.addTab( titleId, 0 ); 
var referencestyle = new StyleEvent(menuItem); 
referencestyle.add('on','off'); 
tabManager.styleObjects[titleId] = referencestyle; 
menuLink['tabkey'] = titleId; 
menuLink.tab = tabManager; 
menuLink.onclick = function() {
var winUpdate = false;
var total = "tab:"+this.tabkey;
if (window.location.search.indexOf('tab:') > -1) 
{
var a = 'tab:'+this.tab.states.current+'=1';
var b = 'tab:'+this.tabkey+'=1';
winUpdate = updateUrlQuery(a,b);
}
if(!winUpdate) 
{
this.tab.setState(this.tabkey);
}
}
menuLink.appendChild(contentDIVtitle); 
menuItem.appendChild(menuLink); 
nav.appendChild(menuItem); 
break;
case "tabcontent":
var contentId = resolveElemId(kid); 
tabManager.bindContent(newtab,contentId); 
var contentstyle = new StyleEvent(kid); 
contentstyle.add('hide'); 
tabManager.styleObjects[contentId] = contentstyle; 
break;
}
}
elem.parentNode.insertBefore(nav, elem);
elem.className = "";
var pick = 0; 
for (var z=0; z<tabManager.states.items.length; z++) {
var kd = tabManager.states.items[z].key;
var urlQuery = com.deconcept.util.getRequestParameter(queryPrefix+kd);
if (urlQuery) pick = z;
}
if(!tabManager.states.items.length) {
return;
}
var pickID = tabManager.states.items[pick].key;
var isTabContent=1;
balanceContentToPod();
tabManager.setState(pickID);
this[member.id] = tabManager; 
}
TabManager = function()
{
this.styleObjects = {};
this.contents = {};
this.states = new StateSwitch();
this.setState = function(id)
{
var newstate = this.states.setCurrent(id);
if(newstate)
{
this.setStyles(this.states.items);
}
}
this.addTab = function(key, value)
{
this.contents[key] = [];
var result = this.states.addItem(key,value);
return result;
}
this.bindContent = function(obj, contentId)
{
if(!this.contents[obj.key]) return null; 
this.contents[obj.key].push(contentId); 
return this.contents[obj.key].length;
}
this.setStyles = function(elements)
{
for(var i=0,element; element = elements[i]; i++)
{
switch(element.value)
{
case 0: 
this.styleObjects[element.key].toggle('off','on');
for(var c=0,content; content=this.contents[element.key][c]; c++)
{
this.styleObjects[content].enable('hide');
}
break;
case 1: 
this.styleObjects[element.key].toggle('on','off');
for(var c=0,content; content=this.contents[element.key][c]; c++)
{
this.styleObjects[content].disable('hide');
}
break;
}
}
}
}
StateSwitch = function()
{
this.current = '';
this.items = [];
this.addItem = function(id, value)
{
var obj = {'key':id, 'value':value};
this.items.push(obj);
return obj;
}
this.setCurrent = function(id)
{
if(this.current == id) return false;
var len = this.items.length;
for(var i=0;i<len;i++)
{
this.items[i].value = (this.items[i].key == id) ? 1 : 0;
}
this.current = id;
return true;
}
return this;
}
updateUrlQuery = function(currStr,newStr)
{
var tabQueryString = window.location.toString();
if(tabQueryString.indexOf(newStr) > -1) return false; 
if(tabQueryString.indexOf(currStr) == -1) return false; 
var tabQueryString = tabQueryString.replace(window.location.hash,'');
tabQueryString = tabQueryString.replace(currStr,newStr);
return window.location = tabQueryString;
}
TabLocation = function()
{
this.location = window.location.toString();
this.tabsyntax = ['tab:','=1'];
this.initLookup = function(obj)
{
this.lookup = {};
for(prop in obj)
{
var pos = prop.indexOf(this.tabsyntax[0]);
if(pos == -1) continue;
var n = prop.substring(pos+this.tabsyntax[0].length);
var v = obj[prop];
this.lookup[n]=v;
}
return true;
}
this.update = function(currStr,newStr)
{
if(this.location.indexOf(newStr) > -1) return false; 
if(this.location.indexOf(currStr) == -1) return false; 
this.location = this.location.replace(window.location.hash,'');
this.location = this.location.replace(currStr,newStr);
return window.location = this.location;
}
}
function explodeQueryString(str,div,assign)
{
var output={};
var pairs = str.split(div);
for(var i=0;i<pairs.length;i++)
{
var pos = pairs[i].indexOf(assign);
if(pos == -1) continue;
var n = pairs[i].substring(0,pos);
var v = pairs[i].substring(pos+1);
output[n] = v;
}	
return output;
}
var winquery = window.location.search;
if(winquery.length) 
{
var pos = winquery.indexOf('tab:');
if(pos > -1)
{
var winquery = winquery.substring(1);
var queryObject = explodeQueryString(winquery,'&','=');
this['tabparams'] = new TabLocation();
this.tabparams.initLookup(queryObject);
}
}
function contentBefore()
{
var str = arguments[0];	
if(arguments[1])
{
obj = spaceSpan(str);
obj.className = "space";
obj.style.position = "relative";
obj.style.right = arguments[1];
}
else
{
obj = document.createTextNode(str);
}
this.insertBefore(obj,this.firstChild);
return;
}
function contentAfter()
{
var str = arguments[0];
var obj;
if(arguments[1])
{
obj = spaceSpan(str);
obj.className = "space";
obj.style.position = "relative";
obj.style.left = arguments[1];
}
else
{
obj = document.createTextNode(str);
}
this.appendChild(obj);
return;
}
function spaceSpan(str)
{
var span = CachedElement.create('span');
span.appendChild(document.createTextNode(str));
return span;
}
function adjacent()
{
this.shift();
return this;
}
function last()
{
return this[this.length-1];
}
function marker(method,mark,marg)
{
if(isArray(this))
{
for(var i = 0,len=this.length;i<len;i++)
{
method.apply(this[i],[mark,marg]);
}
}
else if(isObject(this))
{
method.apply(this,[mark,marg]);
}
}
Children = function()
{
this.method;
this.setMethod = function(a)
{
return (document.body.children) ? 'children' : 'childNodes'; 
}
this.checkName = function(n,v)
{
return n.nodeName == v;
}
this.checkNone = function()
{
return true;
}
}
Children.prototype._all = function(root,name)
{
if(!this.method) this.method = this.setMethod();
name = (name || "");
var o = new Array();
var checkName = (name) ? this.checkName : this.checkNone;
if(isTag(root))
{
for(var i=0; (node=root[this.method][i]); i++)
{
if(isTag(node) && checkName(node,name)) o.push(node);
}
}
else if(isArray(root) || isNodeList(root))
{
var len=root.length-1;
do
{
if(isTag(root[len]))
{
var n = this._all.apply(this,[root[len], name]);
o = o.concat(n.reverse());
} 
}
while (len--);
}
return o;
}
Children.prototype.first = function(root, name)
{
if(!this.method) this.method = this.setMethod();
name = (name || "");
var checkName = (name) ? this.checkName : this.checkNone;
if(isTag(root))
{
if(this.method=="children")
{
return (checkName(root.children[0],name)) ? root.children[0] : null;
}
else if(this.method=="childNodes")
{
for(var i=0; (node=root.childNodes[i]); i++)
{
if(isTag(node) && checkName(node,name))
{
return node;
}
}
}
}
return null;
}
Children.prototype.last = function(root,name)
{
if(!this.method) this.method = this.setMethod();
name = (name || "");
var checkName = (name) ? this.checkName : this.checkNone;
if(isTag(root))
{
if(this.method=="children")
{
var last = root.children[root.children.length-1];
return (checkName(last,name)) ? last : null;
}
else if(this.method=="childNodes")
{
for(var i=root.childNodes.length-1; (node=root.childNodes[i]); i--)
{
if(isTag(node) && checkName(node,name))
{
return node;
}
}
}
}
}
children = new Children();
com.adobe.ui = new UI();
registerOnReady( function() { 
com.adobe.ui.init({
"pods": { 
id:'root', 
key: 'className', 
value:'dyn-pod', 
tags: ['div'], 
method: "buildPodComponent"
},
"tabs": { 
id: 'root', 
key: 'className', 
value:'dyn-tabsection', 
tags: ['div'], 
method: "buildTabSection"
},
"trees": { 
id: 'root', 
key: 'className', 
value:'dyn-treelist', 
tags: ['dl'], 
method: "buildTreeList"
},
"explodes": { 
id: 'root', 
key: 'rel', 
value:'dyn-explodetree',
tags: ['a'], 
method: "makeTreeExplode"
},
"maps": { 
id:'root', 
key: 'rel', 
value:'d-accent', 
tags: ['a','area'], 
method: "buildMapHover"
},
"dropdowns": {
id:'root', 
key: 'className', 
value:'d-dropdown', 
tags: ['ul'], 
method: "DropDownBehavior"
}
});
});
registerOnReady(writeFOArr);
registerOnReady(function() {
balanceContentToPod();
var af = com.adobe.cssprofile.features.after;
var lc = com.adobe.cssprofile.features.lastchild;
var dp = $('depthpath');
if(dp && !af || dp && !lc) {
var paths = children._all(dp,'LI');
if (paths.length != 0) {					
paths[paths.length-1].className = "last-child";
var pathsA = children._all(paths,'A');
marker.apply(pathsA,[contentAfter,"/","1ex"]);
}
}
if(com.adobe.cssprofile.features.layout) {
for(var i = 0; (s = document.getElementsByTagName("select")[i]); i++) {
var e=getOverlapId(resolveElemId(s));
if(!e) continue;
var dom = $(e);
if(dom.masks) {
dom.masks.push(s);
continue;
}
else
{
dom.masks = new Array(s);
dom.onmouseover = function() {
var i = this.masks.length-1;
if(i<0) return;
do {
this.masks[i].style.visibility = "hidden";
} while(i--);
}
dom.onmouseout = function() {
var i = this.masks.length-1;
if(i<0) return;
do {
this.masks[i].style.visibility = "visible";
} while(i--);
}
}
}
}					 
});
