function dateToString(date) {
	var yyyy = date.getYear();
	var mm = date.getMonth() + 1;
	var dd = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	if (mm < 10) mm = "0"+mm;
	if (dd < 10) dd = "0"+dd;
	if (hour < 10) hour = "0"+hour;
	if (min < 10) min = "0"+min;
	return ''+mm+dd+hour+min;
}

var today = new Date();
var now = dateToString(today);

if (now <= "04032359") {
document.write('<div style="padding-left:5px;padding-bottom:10px;"><div style="border-top:1px solid #999999;border-bottom:1px solid #999999;padding:8px 0 8px 0;"><a href="http://ad.doubleclick.net/clk;14539007;3645792;m?http://www.xerox.com/Static_HTML/color_office/en_US/" target="_blank"><img src="http://www.washingtonpost.com/wp-adv/advertisers/xerox/images/FA_xerox_print.gif" border="0"></a></div></div>');
}