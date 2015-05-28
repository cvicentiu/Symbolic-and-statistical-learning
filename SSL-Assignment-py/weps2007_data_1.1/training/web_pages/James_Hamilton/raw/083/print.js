function Print()
{
        var Position = document.all.Position.innerHTML;
	var Content = document.all.Content.innerHTML;


var PartI='<div align="left" style="width:600px; background-color:#ffffff; padding-bottom:10px;"><img src="http://www.chinadaily.com.cn/image_e/logo_cdcomcn_1.gif" width="410" height="55"></div>';
var PartII= '<div align="left" style="width:600px; background-color:#ffffff; ><p class="a-black-1">           '+Position+'</p></div>';
var PartIII= '<div align="left" style="width:600px; background-color:#ffffff; padding-bottom:10px; padding-left:10px;">'+Content+'<div align="center" style="margin-top:20px;">Copyright By chinadaily.com.cn. All rights reserved</div></div>';
document.body.innerHTML =PartI+PartII+PartIII;
window.print();

}