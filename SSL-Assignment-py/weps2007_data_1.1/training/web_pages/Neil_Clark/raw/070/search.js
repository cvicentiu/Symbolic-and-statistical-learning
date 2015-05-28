//method used by "search.ascx" when "Go" button is pressed
function Search()
{
	var searchValue = document.getElementById("searchCriteriaBox").value;
	if (searchValue == "" || !SearchCriteriaBox_Focus.AlreadyClicked)
	{
		var oDiv;
		oDiv = document.getElementById("searchCriteriaErrorMessage");
		oDiv.innerHTML = errorMessage_Search;
		return;
	}

	var searchContent;
	var viewImages = !document.getElementById("chkProductImages").checked;
	searchContent = document.getElementById("cboSearchContent").value;
	location.replace("/cultures/en-us/search/search.htm?SearchMode=Simple&SearchContent=" + searchContent + "&SearchValue=" + searchValue + "&ViewImages=" + viewImages);
	return false;
}

//capture return key within Search control
function SearchKeyPress(e)
{
	if (e.keyCode == 13)
	{
		Search();
		return false;
	}
}

//capture return key within Advance Search control
function AdvancedSearchKeyPress(e)
{
	if (e.keyCode == 13)
	{
		ValidateAdvanceSearchCriteria();
		return false;
	}
}

//capture return key within Search Current control
function SearchCurrentKeyPress(e)
{
	if (e.keyCode == 13)
	{
		ValidateSearchCriteria();
		return false;
	}
}

// Called when the searchCriteriaBox text box gets the focus
function SearchCriteriaBox_Focus()
{
	// If the box still has its default value, clear the box when a user clicks on it
	if (!SearchCriteriaBox_Focus.AlreadyClicked)
	{
		document.getElementById("searchCriteriaBox").value = "";
		SearchCriteriaBox_Focus.AlreadyClicked = true;
	}
	
	return true;
}

// Keep track of whether the searchCriteriaBox still has its default value
SearchCriteriaBox_Focus.AlreadyClicked = false;

// Called when the txtSearchType text box gets the focus
function TxtSearchType_Focus()
{
	// If the box still has its default value, clear the box when a user clicks on it
	if (document.getElementById("searchAdvance_txtSearchType").IsDefaultText == "true")
	{
		document.getElementById("searchAdvance_txtSearchType").value = "";
		document.getElementById("searchAdvance_txtSearchType").IsDefaultText = "false"
	}
	
	return true;
}

//method used by "search.asc" when "Advanced Search" link is pressed
//passing search criteria to advanced search.
function AdvanceSearch(value)
{
	var defaultSearchCriteria = document.getElementById("defaultSearchText").value;
	var searchValue = document.getElementById("searchCriteriaBox").value;
	if (searchValue != "undefined" && searchValue != defaultSearchCriteria)
	{
		location.replace("/cultures/en-us/search/search.htm?SearchMode=Advance&SearchValue=" + searchValue);
	}
	else
	{
		location.replace("/cultures/en-us/search/search.htm?SearchMode=Advance");
	}
}

//executed when user clicks "Advance Search" link within the Search Current control
//when user is performing a simple search
function CurrentAdvanceSearch()
{
	//retrieve search criteria to pass to advance search
	var value = document.getElementById("searchCurrent_txtSearchCriteria").value;
	//var value = document.all["searchCurrent_txtSearchCriteria"].value;
	if (value != "undefined")
	{
		//if not undefined, then txtSearchCriteria control is found and send in value
		location.replace("/cultures/en-us/search/search.htm?SearchMode=Advance&SearchValue=" + value);
	}
	else
	{
		//txtSearchCriteria control is not found so do not send in value
		location.replace("/cultures/en-us/search/search.htm?SearchMode=advance");
	}
}

//executed when user clicks "Modify Search" button within the Search Current control
//when user is performing an advance search
function ModifySearch()
{
	//posts back to page and fires the btnModifySearch_click event
	__doPostBack('btnModifySearch', '');
}

function PopulateSearchContent()
{
	//12-14 MG: Can't find any place this function is called.  Commenting it out
	//alert("populatesearchcontent");
	//document.all["cboSearchContent"].value = contentValue;
}

function ValidateSearchCriteria()
{
	var errorMessage = "  " + errorMessage_Search;
	if (document.getElementById("searchCurrent_txtSearchCriteria").value == "")
	{
		var oDiv;
		oDiv = document.getElementById("searchcurrent_lblSearchErrorMessage");
		oDiv.innerText = errorMessage;
	}
	else
	{
		//posts back to page and fires the btnSearchServer_click event
		__doPostBack('btnSearchServer', '');
	}
}

//validates that the user has at least provided criteria for at least one field out of 9
function ValidateAdvanceSearchCriteria()
{
	//variable the is used to track to see if any fields have been modified with search criteria
	//there are 9 fields - for each field with no search criteria, searchCriteria is reduced by 1
	//if searchCriteria = 0, then no search criteria was entered
	var searchCriteria = 9;

	//check to see if the field is empty or contains the default text
	if (
		document.getElementById("searchAdvance_txtSearchType").value == "" ||
		document.getElementById("searchAdvance_txtSearchType").IsDefaultText == "true"
		)
	{
		searchCriteria = searchCriteria -1;
	}

	//check to see if dropdown contains any value other than an empty string
	if (document.getElementById("searchAdvance_ddlAgeRange").value == "")
	{
		searchCriteria = searchCriteria -1;
	}

	//check to see if dropdown contains any value other than an empty string
	if (document.getElementById("searchAdvance_ddlGender").value == "")
	{
		searchCriteria = searchCriteria -1;
	}

	//check to see if dropdown contains any value other than an empty string
	if (document.getElementById("searchAdvance_ddlLanguage").value == "")
	{
		searchCriteria = searchCriteria -1;
	}

	//check to see if dropdown contains any value other than an empty string
	if (document.getElementById("searchAdvance_ddlPriceRange").value == "")
	{
		searchCriteria = searchCriteria -1;
	}

	//check to see if dropdown contains any value other than an empty string
	if (document.getElementById("searchAdvance_ddlProductType").value == "")
	{
		searchCriteria = searchCriteria -1;
	}

	//check to see if listbox contains any value other than an empty string
	if (document.getElementById("searchAdvance_ltbProductUse").value == "")
	{
		searchCriteria = searchCriteria -1;
	}

	//check to see if dropdown contains any value other than an empty string
	if (document.getElementById("searchAdvance_ddlPublishingDivision").value == "")
	{
		searchCriteria = searchCriteria -1;
	}

	//check to see if listbox contains any value other than an empty string
	if (document.getElementById("searchAdvance_ltbTopicsTypes").value == "")
	{
		searchCriteria = searchCriteria -1;
	}

	var oDiv;
	oDiv = document.getElementById("searchAdvance_lblSearchErrorMessage");
	if (searchCriteria == 0)
	{
		oDiv.innerHTML = "&nbsp;&nbsp;" + errorMessage_SearchAdvance;
	}
	else
	{
		//posts back to page and fires the btnSearchServerNow_click event
		__doPostBack('btnSearchServerNow', '');
	}
}

function WhereToBuy(value)
{
	//navigates user to WhereToBuy with correct record reference value
	location.href(urlWhereToBuy + "?RecordReference=" + value);
}
