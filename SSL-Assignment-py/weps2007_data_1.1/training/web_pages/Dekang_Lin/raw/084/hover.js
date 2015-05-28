function sfHover()
	{
		var sfEls = document.getElementById("nav").getElementsByTagName("LI");
		for (var i=0; i<sfEls.length; i++)
			{
				sfEls[i].onmouseover=function()
					{
						this.className+=" sfhover";
					}
				sfEls[i].onmouseout=function()
					{
						this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
					}
			}
	}
if (window.attachEvent) window.attachEvent("onload", sfHover);
		
function sfAlert()
	{alert('me');return;}
function sfAlert1()
	{alert('me1');return;}
function sfAlert2()
	{alert('me2');return;}
		
function doStart()
{
arrClass = document.getElementsByTagName("BODY");
switch (arrClass[0].className)
	{
		case "home":
			//sfAlert2();
			break;
		default:
			sfAlert1();
			if (window.attachEvent) sfHover();
			break;
	}
}
//window.onload = doStart;

function randImage1(strImgSrc,strImgType,strImgAlt,numPossibles,strClassName)
{
num = Math.floor(Math.random()*parseInt(numPossibles))+1;
document.write('<img src="'+strImgSrc+num+'.'+strImgType+'" class="'+strClassName+'" alt="" />');
}		

/*function randImage1(strImgSrc,strImgType,strImgAlt,numPossibles,strClassName)
{
num = Math.floor(Math.random()*parseInt(numPossibles))+1;
document.write('<img src="'+strImgSrc+num+'.'+strImgType+'" class="'+strClassName+'" alt="'+strImgAlt+num+'" />');
}		
*/

