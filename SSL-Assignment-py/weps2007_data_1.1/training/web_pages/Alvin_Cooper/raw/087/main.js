function resetForm(formName) {
	fName = (formName == null) ? 0 : formName;
	if (document.forms[fName] == null) {
		alert('Error while trying to reset the FORM.\n\nPlease contact website administrator.\nThank you!');
	}
	else if(confirm('Are you sure that you want to RESET form?')) document.forms[fName].reset();
}

function changeSearchFormBg(val) {
	objBg = document.getElementById('searchFormBg');
	if (val) objBg.style.backgroundImage = "url(_include/gui/header/_bg_menu_on.gif)";
	else objBg.style.backgroundImage = "";
}


var activeTab = 'Space';
function showTab(tabName) {
	if(document.getElementById) {
		objTab = document.getElementById('newsTab' + tabName);
		objTabContent = document.getElementById('news' + tabName);
		objActiveTab = document.getElementById('newsTab' + activeTab);
		objActiveTabContent = document.getElementById('news' + activeTab);
	} 
	else if(document.all && navigator.userAgent.indexOf('Mac') == -1) {
		objTab = document.all['newsTab' + tabName];
		objTabContent = document.all['news' + tabName];
		objActiveTab = document.all['newsTab' + activeTab];
		objActiveTabContent = document.all['news' + activeTab];
	}
	else return;
	
	objActiveTab.src = objActiveTab.src.replace(/-on\./g, "-off.");
	objTab.src = objTab.src.replace(/-off\./g, "-on.");

	objActiveTabContent.style.display = 'none';
	objTabContent.style.display = 'block';
	
	activeTab = tabName;
}

function flashTest() {
	obj = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="785" height="361">'
		+ '<param name="movie" value="_include/gui/flash/fun.swf" />'
		+ '<param name="quality" value="high" />'
		+ '<param name="wmode" value="transparent" />'
		+ '<embed src="_include/gui/flash/fun.swf" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="785" height="361"></embed>'
		+ '</object>';
	document.write(obj);
}