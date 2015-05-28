var win=null;

function NewWindow(mypage,w,h)
{
	LeftPosition=(screen.width)?(screen.width-w)/2:100;
	TopPosition=(screen.height)?(screen.height-h)/2:100;
	settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=yes';
	win=window.open(mypage,'ancientfaces',settings);
	win.focus();
}

function toggle_block(divname)
{
	div = document.getElementById(divname);
	
	if(div.style.display == 'block')
	{
		div.style.display = 'none';
	}
	else
	{
		div.style.display = 'block';
	}
}

function show_block(divname)
{
	div = document.getElementById(divname);
	div.style.display = 'block';
}

function hide_block(divname)
{
	div = document.getElementById(divname);
	div.style.display = 'none';
}

function form_popup(url, width, height)
{
	newwin = window.open(url, 'form_popup', config='height='+height+',width='+width+',toolbar=0,menubar=0,location=0,status=0,directories=0');
	newwin.focus();
}

function profile(member_id, baseurl)
{
	window.open(baseurl+'/site/member/profile/'+member_id, 'profile', config='height=500,width=350,toolbar=0,menubar=0,location=0,status=0,directories=0,scrollbars=yes');
}

function select_all(field, multi_fields)
{	
	if(field.checked == false)
	{
		// uncheck all
		field.checked = false;
		for(i = 0; i < multi_fields.length; ++i)
			multi_fields[i].checked = false;
	}
	else
	{
		// check all
		field.checked = true;
		for(i = 0; i < multi_fields.length; ++i)
			multi_fields[i].checked = true;
	}
}