function initializePage(showBrowseHeader, showAdvancedHeader, searchOperation) {

	t0_on  = new Image();
	t0_off = new Image();
	t1_on  = new Image();
	t1_off = new Image();
	t2_on  = new Image();
	t2_off = new Image();
	t3_on  = new Image();
	t3_off = new Image();
	t4_on  = new Image();
	t4_off = new Image();

    advancedImage = new Image();
    browseImage = new Image();
    resultsImage = new Image();
    advancedResultsImage = new Image();
    browseResultsImage = new Image();
    historyImage = new Image();
    searchingImage = new Image();
    browsingImage = new Image();

	t0_on.src  = "/7_search/images/tabs/t0_on.gif";
	t0_off.src = "/7_search/images/tabs/t0_off.gif";
	t1_on.src  = "/7_search/images/tabs/t1_on.gif";
	t1_off.src = "/7_search/images/tabs/t1_off.gif";
	t2_on.src  = "/7_search/images/tabs/t2_on.gif";
	t2_off.src = "/7_search/images/tabs/t2_off.gif";
	t3_on.src  = "/7_search/images/tabs/t3_on.gif";
	t3_off.src = "/7_search/images/tabs/t3_off.gif";
   t4_on.src  = "/7_search/images/tabs/t4_on.gif";
	t4_off.src = "/7_search/images/tabs/t4_off.gif";

    browseImage.src = "/7_search/images/browse_hdr.gif";
    browseResultsImage.src = "/7_search/images/browseresults_hdr.gif";
    historyImage.src = "/7_search/images/history_hdr.gif";
    searchingImage.src = "/7_search/images/searching_hdr.gif";
    browsingImage.src = "/7_search/images/browsing_hdr.gif";
    advancedImage.src = "/7_search/images/advanced_hdr.gif";
    resultsImage.src = "/7_search/images/results_hdr.gif";
    advancedResultsImage.src = "/7_search/images/advancedresults_hdr.gif";
// The following 3 items were changed as per PCR#WCW10002 on 10-06-2003.
//    advancedImage.src = "/7_search/images/adv_search_research.gif";
//    resultsImage.src = "/7_search/images/adv_search_research.gif";
//    advancedResultsImage.src = "/7_search/images/adv_search_research.gif";


    if (showBrowseHeader) {
        document['optionsImage'].src = eval("browseImage.src");
    } else if (showAdvancedHeader) {
        document['optionsImage'].src = eval("advancedImage.src");
    } else {
        switch (searchOperation - 0) {
            case 3:
            case 4:
            case 11:
            case 12:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18: //browse
                    document['optionsImage'].src = eval("browsingImage.src");
                    break;
            default:
                    document['optionsImage'].src = eval("searchingImage.src");
        }
    }
}

var		U = 0;

var		L = 1;


function homepage() {
	if (top.parent.opener) {
		top.parent.opener.focus();
	}
}


function openSearchHelp() {

    url = "";
    img = document['optionsImage'].src;
    if (img.indexOf(resultsImage.src) > -1) {
        url = '/6_help/site_help/site_functionality.html#4';
    } else if (img.indexOf(advancedImage.src) > -1) {
        url = '/6_help/site_help/site_functionality.html#5';
    } else if (img.indexOf(historyImage.src) > -1) {
        url = '/6_help/site_help/site_functionality.html#PreviousSearchTab';
    } else {
        url = '/6_help/site_help/site_functionality.html#6';
    }
    w = window.open(url,'_blank','height=520,width=632,scrollbars=yes');
	w.focus();
}

function openBasicSearchHelp() {
  url = '/6_help/site_help/site_functionality.html#4';
  w = window.open(url,'_blank','height=520,width=632,scrollbars=yes');
  w.focus();
}

function showAdvancedOptions(op1) {

    browseLocationString = "";
    browseHelpName = "BrowseHelp";

	showAdvancedOptionsTab();
	if (top.Content.Left) {
		if (!top.Content.Left.document.advancedForm) {
			top.Content.Left.location.href='/Search?f=3&op=' + op1+'&param=Y';
		}
        browseLocationString = top.Content.Body.document.location.href;
        if (browseLocationString.indexOf(browseHelpName) > -1) {
            top.Content.Body.document.location = "/7_search/BrowseHelp.jsp#AdvanceSearchTab";
        }
	} else {
		if (!top.Content.Body.document.advancedForm) {
			top.Content.Body.location.href='/Search?f=2&op=' + op1+'&param=Y';
		}
	}
	//document.optionsForm.keywords.focus();
}


function showAdvancedOptionsTab() {
	if (document.images) {
		document['t0'].src = eval("t0_off.src");
		document['t1'].src = eval("t1_off.src");
		document['t2'].src = eval("t2_on.src");
		document['t3'].src = eval("t3_off.src");

        document['optionsImage'].src = eval("advancedImage.src");
	}
}


function showBrowse(op1, op2) {

    browseLocationString = "";
    browseHelpName = "BrowseHelp";

	showBrowseTab();
	if (top.Content.Left) {
		if (top.Content.Left.document.advancedForm) {

            browseLocationString = top.Content.Body.document.location.href;
            if (browseLocationString.indexOf(browseHelpName) > -1) {
                top.Content.Body.document.location = "/7_search/BrowseHelp.jsp#top";
            }
			top.Content.Left.document.advancedForm.target = "Left";
			top.Content.Left.document.advancedForm.bop.value = op1;
			top.Content.Left.document.advancedForm.op.value = op2;
			top.Content.Left.document.advancedForm.cb.value = 1;
			top.Content.Left.document.advancedForm.f.value = 3;
			top.Content.Left.document.advancedForm.submit();
		} else {
			if (top.Content.Left.document.browseForm) {
				top.Content.Body.location="/7_search/BrowseHelp.jsp#top";
			} else {
				top.Content.Left.location.href='/Browse?f=3&bop=' + op1;
			}

            browseLocationString = top.Content.Body.document.location.href;
            if (browseLocationString.indexOf(browseHelpName) > -1) {
                top.Content.Body.document.location = "/7_search/BrowseHelp.jsp#top";
            }
		}
	} else {
		if (top.Content.Body.document.advancedForm) {
			top.Content.Body.document.advancedForm.bop.value = op1;
			top.Content.Body.document.advancedForm.op.value = op2;
			top.Content.Body.document.advancedForm.cb.value = 1;
			top.Content.Body.document.advancedForm.submit();
		} else {
			top.Content.Body.location.href='/Browse?f=2&bop=' + op1;
		}
	}
	//document.optionsForm.keywords.focus();
}

function showBrowseDateExpanded(op1, op2) {
    browseLocationString = "";
    browseHelpName = "BrowseHelp";

	showBrowseTab();
	if (top.Content.Left) {
		if (top.Content.Left.document.advancedForm) {

            browseLocationString = top.Content.Body.document.location.href;
            if (browseLocationString.indexOf(browseHelpName) > -1) {
                top.Content.Body.document.location = "/7_search/BrowseHelp.jsp#top";
            }
			top.Content.Left.document.advancedForm.target = "Left";
			top.Content.Left.document.advancedForm.bop.value = op1;
			top.Content.Left.document.advancedForm.op.value = op2;
			top.Content.Left.document.advancedForm.cb.value = 1;
			top.Content.Left.document.advancedForm.FLAG.value = "T";
			top.Content.Left.document.advancedForm.BODYONLOAD.value = "T";
			top.Content.Left.document.advancedForm.submit();
		}

	} else {
		if (top.Content.Body.document.advancedForm) {
			top.Content.Body.document.advancedForm.bop.value = op1;
			top.Content.Body.document.advancedForm.op.value = op2;
			top.Content.Body.document.advancedForm.cb.value = 1;
			top.Content.Body.document.advancedForm.FLAG.value = "T";
			top.Content.Body.document.advancedForm.BODYONLOAD.value = "T";
			top.Content.Body.document.advancedForm.submit();
		}
	}

}


function showBrowseTab() {
	if (document.images) {
		document['t0'].src = eval("t0_on.src");
		document['t1'].src = eval("t1_off.src");
		document['t2'].src = eval("t2_off.src");
		document['t3'].src = eval("t3_off.src");
        document['optionsImage'].src = eval("browseImage.src");
	}
}


function showPreviousSearches(op1) {
    browseLocationString = "";
    browseHelpName = "BrowseHelp";

	showPreviousSearchesTab();
	if (top.Content.Left) {
		if (top.Content.Left.document.advancedForm) {
			top.Content.Left.document.advancedForm.target = "Left";
			top.Content.Left.document.advancedForm.op.value = op1;
			top.Content.Left.document.advancedForm.f.value = 3;
			top.Content.Left.document.advancedForm.cb.value = 1;
			top.Content.Left.document.advancedForm.method="get";
			top.Content.Left.document.advancedForm.submit();
		} else {
			top.Content.Left.location.href='/Search?f=3&op=' + op1;
		}

        browseLocationString = top.Content.Body.document.location.href;
        if (browseLocationString.indexOf(browseHelpName) > -1) {
            top.Content.Body.document.location = "/7_search/BrowseHelp.jsp#PreviousSearchTab";
        }
	} else {
		if (top.Content.Body.document.advancedForm) {
			top.Content.Body.document.advancedForm.op.value = op1;
			top.Content.Body.document.advancedForm.cb.value = 1;
			top.Content.Body.document.advancedForm.submit();
		} else {
			top.Content.Body.location.href='/Search?f=2&op=' + op1;
		}
	}
	//document.optionsForm.keywords.focus();
}


function showPreviousSearchesTab() {
    if (document.images) {
		document['t0'].src = eval("t0_off.src");
        document['t1'].src = eval("t1_off.src");
        document['t2'].src = eval("t2_off.src");
        document['t3'].src = eval("t3_on.src");
        document['optionsImage'].src = eval("historyImage.src");
    }
}


function showSearchResults(op1, op2) {
	showResultsTab();
	if (top.Content.Left) {
		if (top.Content.Left.document.advancedForm) {
			top.Content.Left.document.advancedForm.target = "Content";
			top.Content.Left.document.advancedForm.op.value = op1;
			top.Content.Left.document.advancedForm.bf.value = op2;
			top.Content.Left.document.advancedForm.cb.value = 1;
    			top.Content.Left.document.advancedForm.action = '/7_search/Body1Frame.jsp?op=' + op1;
			top.Content.Left.document.advancedForm.submit();
		} else {
			top.Content.location='/7_search/Body1Frame.jsp?op=' + op1;
		}
	} else {
		if (top.Content.Body.document.advancedForm) {
			top.Content.Body.document.advancedForm.op.value = op1;
			top.Content.Body.document.advancedForm.bf.value = op2;
			top.Content.Body.document.advancedForm.cb.value = 1;
			top.Content.Body.document.advancedForm.submit();
		} else {
			top.Content.Body.location.href='/Search?op=' + op1;
		}
	}
	//top.Content.Body.document.resultsForm.keywords.focus();
}


function showResultsTab() {
	if (document.images) {
		document['t0'].src = eval("t0_off.src");
		document['t1'].src = eval("t1_on.src");
		document['t2'].src = eval("t2_off.src");
		document['t3'].src = eval("t3_off.src");

        if (document.optionsForm.op.value == "") {
            //try to get operation from results frame
            if (top.Content && top.Content.Body && top.Content.Body.document.resultsForm) {
                document.optionsForm.op.value = top.Content.Body.document.resultsForm.op.value;
            }
        }

		  var statusOp = (document.optionsForm.op.value - 0);
		  // If opStatus exists (and is set) on the results page use it for the status image.
        if (top.Content && top.Content.Body && top.Content.Body.document.resultsForm
               && top.Content.Body.document.resultsForm.opStatus) {
			  var val = top.Content.Body.document.resultsForm.opStatus.value;
           if (val != null && val != "" && val != 0) {
              statusOp = (val - 0);
           }
        }

        switch (statusOp) {
            case 1: //simple
                    document['optionsImage'].src = eval("resultsImage.src");
                    break;
            case 2: //advanced
                    document['optionsImage'].src = eval("advancedResultsImage.src");
                    break;
            case 3:
            case 4:
            case 11:
            case 12:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18: //browse
                    document['optionsImage'].src = eval("browseResultsImage.src");
                    break;
            default: //like simple search
                    document['optionsImage'].src = eval("resultsImage.src");
                    break;
        }
	}
}


function showResultsStatus() {
	document['optionsImage'].src = eval("resultsImage.src");
}


