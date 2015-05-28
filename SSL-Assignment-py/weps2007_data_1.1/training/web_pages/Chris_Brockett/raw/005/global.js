function observeId(elementId,name,listener,useCapture)
{
if (document.getElementById)
{
var element = document.getElementById(elementId);
if (element)
{
observe(element,name,listener,useCapture);
}
else
{
}
}
else
{
}
}
function observe(obj,name,listener,useCapture)
{
useCapture = useCapture || false;
if (obj.addEventListener)
{
obj.addEventListener(name,listener,useCapture);
}
else if (obj.attachEvent)
{
obj["e"+name+listener] = listener;
obj[name+listener] = function() { window.event.target = window.event.srcElement; obj["e"+name+listener]( window.event ); }
obj.attachEvent('on' + name,obj[name+listener]);
}
}
function stopObserving(obj,name,listener,useCapture)
{
useCapture = useCapture || false;
if (obj.removeEventListener)
{
obj.removeEventListener(name,listener,useCapture);
}
else if (obj.detachEvent)
{
obj.detachEvent('on' + name,obj[name + listener]);
obj[name+listener] = null;
obj["e"+name+listener] = null;
}
}
function searchInit()
{
if (document.getElementById)
{
var s = document.getElementById('qsearch');
if (s)
{
if (s.value == '')
{
s.value = 'search';
}
observe(s,'focus',searchFocus);
observe(s,'blur',searchBlur);
}
}
}
function searchFocus(e)
{
if (this.value == 'search')
this.value = '';
}
function searchBlur(e)
{
if (this.value == '')
this.value = 'search';
}
function DEBUG(msg) {};
