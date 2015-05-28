function showAddButtons(element)
{
	$(element).style.display = 'block';
}

function hideAddButtons(element)
{
	$(element).style.display = 'none';
}

function openGroupEdit(group_id)
{
	var aw = new AjaxWindow('editgroup');
	aw.title = 'Edit Banner Group';
	aw.width = 500;
	var group = [group_id];
	aw.open('banner.getEditGroup', group, '', finishEditingRotating, group);
}	

function addBanner(addHref,group_id)
{

	var aw = new AjaxWindow('addbanner');
	aw.title = 'Add New Banner';
	aw.width = 600;
	var group = [group_id];
	aw.open('new Function(false)', group, addHref, refreshBannerGroup, group);
}

function addExistingBanner(group_id)
{
	var aw = new AjaxWindow('addbanner');
	aw.title = 'Add Existing Banner';
	aw.width = 600;
	var group = [group_id];
	aw.open('banner.getAddExistingBanner', group, '', refreshBannerGroup, group);
}

function editBanner(editHref,group_id)
{
	
	var aw = new AjaxWindow('editbanner');
	aw.title = 'Edit Banner';
	aw.width = 500;
	var group = [group_id];
	aw.open('new Function(false)', group, editHref, refreshBannerGroup, group);		
}

function editRotatingBanner(group_id)
{
	var aw = new AjaxWindow('editRotatingBanner');
	aw.title = 'Edit Rotating Banners';
	aw.width = 700;
	var group = [group_id,document.location.toString()];
	aw.open('banner.getEditRotatingBanner', group, '', finishEditingRotating, [group_id]);
	startEditingRotating(group_id);
}	

function startEditingRotating(group_id)
{
	eval('if(typeof (stopForEditing_'+group_id+') != \'undefined\') stopForEditing_'+group_id + ' = true');	
	eval('if(typeof (rotateBannerTimeout_' + group_id + ') != \'undefined\'){ window.clearTimeout(rotateBannerTimeout_' + group_id + ')}');
}

function finishEditingRotating(group_id)
{
	eval('if(typeof (stopForEditing_'+group_id+') != \'undefined\')stopForEditing_'+group_id + ' = false');
	
	refreshBannerGroup(group_id);
	
}	

function saveBannerPositions(element)
{
	var group_id = (element.id).substring(8);
	
	var banners = Sortable.serialize('banners_'+group_id);
	var rpcclient = new xmlrpc_client('xmlremote', document.location.hostname);
	//rpcclient.debug = true;  

	rpcclient.addParam(group_id);
	rpcclient.addParam(banners);				
	//send to server for saving
	rpcclient.call('banner.saveBannerPositions', refreshBannerGroup);
}

function setArchiveMode(mode,group_id)
{
	var rpcclient = new xmlrpc_client('xmlremote', document.location.hostname);
	//rpcclient.debug = true;  

	rpcclient.addParam(mode);
	rpcclient.addParam(group_id);
	//send to server for saving
	rpcclient.call('banner.setArchiveMode', refreshBannerGroup);
}
function showQuickStats(banner_id,group_id)
{
	var stats = document.getElementById('stats_'+banner_id+'-'+group_id);
	stats.innerHTML = "Loading...";
	var rpcclient = new xmlrpc_client('xmlremote', document.location.hostname);
	//rpcclient.debug = true;  

	rpcclient.addParam(banner_id);
	rpcclient.addParam(group_id);
	//send to server for saving
	rpcclient.call('banner.getBannerStats', showStats);
}
function showStats(ret)
{
	var id = ret[0];
	var stats = document.getElementById('stats_'+id);
	stats.innerHTML=ret[1];
	stats.onmouseover="";
}