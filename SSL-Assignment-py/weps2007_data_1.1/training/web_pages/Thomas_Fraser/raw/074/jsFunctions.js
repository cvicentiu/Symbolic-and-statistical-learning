function SomeJSFunction(containerID, doit) { 
var container = document.getElementById(containerID); 
var curobj = container.getElementsByTagName("input"); 
for (var i = 0; i < curobj.length; i++) 
if (curobj[i].type == "checkbox") 
curobj[i].checked = doit; 
} 