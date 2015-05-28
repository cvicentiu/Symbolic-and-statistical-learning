function reloadCaptchaImg(){
	window.location.reload();
}

function CheckAdvancedSearchForm()
{
	if(document.getElementById("AQuery").value == "")
	{
		alert("%%LNG_searchNoQuery%%");
		document.getElementById("AQuery").focus();
		return false;
	}

	if(document.getElementById("searchArticles").checked == false && document.getElementById("searchComments").checked == false && document.getElementById("searchBlogs").checked == false && document.getElementById("searchPages").checked == false && document.getElementById("searchNews").checked == false)
	{
		alert("%%LNG_searchNoArea%%");

		return false;
	}

	if(document.getElementById("searchAuthor").checked == false && document.getElementById("searchContentBody").checked == false && document.getElementById("searchTitle").checked == false)
	{
		alert("%%LNG_searchNoFields%%");

		return false;
	}



	return true;
}
function swapComment(){
	if(document.getElementById("addCommentBox").checked == true){
	document.getElementById("commentField").style.display = "";	
	}else{
		document.getElementById("commentField").style.display = "none";	
	}
	return true;
}
function SwitchField(ArticleType)
{
	articleType = ArticleType;

	switch(ArticleType)
	{
		case 0: // Article
		{
			document.getElementById("FileRow").style.display = "";
			document.getElementById("ArticleURLRow").style.display = "none";
			break;
		}
		case 1: // Summary Only
		{
			document.getElementById("FileRow").style.display = "none";
			document.getElementById("ArticleURLRow").style.display = "none";
			break;
		}
		case 2:
		{
			//blkarg
			document.getElementById("FileRow").style.display = "none";
			document.getElementById("ArticleURLRow").style.display = "";
			break;
		}
	}
}

function CheckSubmitArticleForm()
{
	if(document.getElementById("Title").value == "")
	{
		alert("%%LNG_artNoTitle%%");
		document.getElementById("Title").focus();
		return false;
	}

	if(document.getElementById("Summary").value == "")
	{
		alert("%%LNG_artNoSummary%%");
		document.getElementById("Summary").focus();
		return false;
	}

	if(document.getElementById("ACategories").selectedIndex == -1)
	{
		alert("%%LNG_artNoCategory%%");
		document.getElementById("ACategories").focus();
		return false;
	}

	if(articleType == 0) // Article
	{
		if(document.getElementById("File").value == "")
		{
			alert("%%LNG_artNoFile%%");
			document.getElementById("File").focus();
			return false;
		}
	}
	else if(articleType == 1) // Summary
	{

	}
	else if(articleType == 2) // Link
	{
		if(document.getElementById("ArticleUrl").value == "" || document.getElementById("ArticleUrl").value == "http://")
		{
			alert("%%LNG_artNoURL%%");
			document.getElementById("ArticleUrl").focus();
			document.getElementById("ArticleUrl").select();
			return false;
		}
	}

	return true;
}

function CheckSubmitArticleForm2()
{
	if(document.getElementById("Title").value == "")
	{
		alert("%%LNG_artNoTitle%%");
		document.getElementById("Title").focus();
		return false;
	}

	if(document.getElementById("Summary").value == "")
	{
		alert("%%LNG_artNoSummary%%");
		document.getElementById("Summary").focus();
		return false;
	}

	if(document.getElementById("ACategories").selectedIndex == -1)
	{
		alert("%%LNG_artNoCategory%%");
		document.getElementById("ACategories").focus();
		return false;
	}

	 if(articleType == 2) // Link
	{
		if(document.getElementById("ArticleUrl").value == "" || document.getElementById("ArticleUrl").value == "http://")
		{
			alert("%%LNG_artNoURL%%");
			document.getElementById("ArticleUrl").focus();
			document.getElementById("ArticleUrl").select();
			return false;
		}
	}

	return true;
}
function CheckLoginForm()
{
	if(document.getElementById("Username").value == "")
	{
		alert("%%LNG_authNoUser%%");
		document.getElementById("Username").focus();
		return false;
	}

	if(document.getElementById("Password").value == "")
	{
		alert("%%LNG_authNoPassword%%");
		document.getElementById("Password").focus();
		return false;
	}

	return true;
}

function CheckAuthorForm()
{
	if(document.getElementById("Username").value == "")
	{
		alert("%%LNG_authNoUser%%");
		document.getElementById("Username").focus();
		return false;
	}

	if(document.getElementById("Password").value == "")
	{
		alert("%%LNG_authNoPassword%%");
		document.getElementById("Password").focus();
		return false;
	}

	if(document.getElementById("Password").value != document.getElementById("PasswordConfirm").value)
	{
		alert("%%LNG_authBadPassword%%");
		document.getElementById("Password").focus();
		document.getElementById("Password").select();
		return false;
	}

	if(document.getElementById("FirstName").value == "")
	{
		alert("%%LNG_authNoFirstName%%");
		document.getElementById("FirstName").focus();
		return false;
	}

	if(document.getElementById("LastName").value == "")
	{
		alert("%%LNG_authNoLastName%%");
		document.getElementById("LastName").focus();
		return false;
	}

	if(document.getElementById("Email").value == "")
	{
		alert("%%LNG_authNoEmail%%");
		document.getElementById("Email").focus();
		return false;
	}
	
	if(document.getElementById("Email").value.indexOf('.') == -1 || document.getElementById("Email").value.indexOf('@') == -1)
			{
				alert('This email address is not valid.');
				document.getElementById("Email").focus();
				document.getElementById("Email").select();
				return false;
			}

	if(document.getElementById("Biography").value == "")
	{
		alert("%%LNG_authNoBio%%");
		document.getElementById("Biography").focus();
		return false;
	}

	return true;
}

function emailToFriend(ArticleLink)
{
	var t = (screen.availHeight/2) - (485/2);
	var l = (screen.availWidth/2) - (605/2);
	var emailWin = window.open(ArticleLink+"/articleemail", "emailWin", "scrollbars=yes,toolbar=1,statusbar=0,width=605,height=485,top="+t+",left="+l);
}

function CheckArticleCommentForm()
{
	var sel = false;
	var ok = false;

	for(i = 1; i < 6; i++)
	{
		eval("sel = document.getElementById('ArticleRating_"+i+"').checked;");

		if(sel)
		ok = true;
	}

	if(ok)
	{
	 return true;
	}
	else
	{
		alert("%%LNG_hpSelectRating%%");
		return false;
	}
}

function CheckArticleCommentForm1()
{
	var sel = false;
	var ok = false;

	for(i = 1; i < 6; i++)
	{
		eval("sel = document.getElementById('ArticleRating_"+i+"').checked;");

		if(sel)
		ok = true;
	}

	if(ok)
	{
		if(document.getElementById("addCommentBox").checked == 1){
			if(document.getElementById("ArticleComment").value == "")
			{
				alert("%%LNG_hpEnterComment%%");
				document.getElementById("ArticleComment").focus();
				return false;
			}
			else
			{
				return true;
			}
		}
		
	}
	else
	{
		alert("%%LNG_hpSelectRating%%");
		return false;
	}
}

function CheckArticleCommentForm2()
{
	var sel = false;
	var ok = false;


		if(document.getElementById("ArticleComment").value == "")
		{
			alert("%%LNG_hpEnterComment%%");
			document.getElementById("addCommentBox").checked = true;
			swapComment();
			document.getElementById("ArticleComment").focus();
			return false;
		}
		else
		{
			return true;
		}
	
}

function CheckEmailForm(frm)
{
	if(frm.YourName.value == "")
	{
		alert("%%LNG_artEmailNoYourName%%");
		frm.YourName.focus();
		return false;
	}

	if(frm.YourEmail.value == "")
	{
		alert("%%LNG_artEmailNoYourEmail%%");
		frm.YourEmail.focus();
		return false;
	}

	if(frm.YourEmail.value.indexOf(".") == -1 || frm.YourEmail.value.indexOf("@") == -1)
	{
		alert("%%LNG_artEmailNoYourEmail1%%");
		frm.YourEmail.focus();
		return false;
	}

	if(frm.FriendsName.value == "")
	{
		alert("%%LNG_artEmailNoFriendsName%%");
		frm.FriendsName.focus();
		return false;
	}

	if(frm.FriendsEmail.value == "")
	{
		alert("%%LNG_artEmailNoFriendsEmail%%");
		frm.FriendsEmail.focus();
		return false;
	}

	if(frm.FriendsEmail.value.indexOf(".") == -1 || frm.FriendsEmail.value.indexOf("@") == -1)
	{
		alert("%%LNG_artEmailNoFriendsEmail1%%");
		frm.FriendsEmail.focus();
		return false;
	}

	frm.Message.disabled = false;

	return true;
}