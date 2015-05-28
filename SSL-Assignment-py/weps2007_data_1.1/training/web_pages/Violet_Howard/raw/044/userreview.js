var selectedUserReview = 0;
	
function displayCharCount(id)
{	
    var text_area_id = "txtComment" + id;
	var boxLength = getTextBoxLength(text_area_id);

	var txtComment = getElement(text_area_id);

	if (boxLength > maxCommentChar)
	{
		window.alert("Your message can have a max of " + maxCommentChar + " characters");
	
		txtComment.value = txtComment.value.substring(0, maxCommentChar);
		boxLength = getTextBoxLength(text_area_id);
	}
	
	var characterCount = document.getElementById("characterCount" + id);
	characterCount.innerHTML = (maxCommentChar - boxLength);
}
	
function openReplyForm(userReviewId)
{
	var txtComment = document.getElementById('txtComment');
	
	txtComment.disabled = true;
	txtComment.style.backgroundColor = "#e2e2e2";

    var div = getDiv("reply_" + userReviewId);
	if (div) {
		div.className = div.className.replace(/hide/, "show");
	}
	
	ieFix();
	selectedUserReview = userReviewId;
}

function cancelReply(userReviewId) {
	var txtComment = document.getElementById('txtComment');
	
	txtComment.disabled = false;
	txtComment.style.backgroundColor = "#fff";

    var div = getDiv("reply_" + userReviewId);
	if (div) {
		div.className = div.className.replace(/show/, "hide");
	}
	
    var txt = getDiv("txtComment" + userReviewId);
	if (txt) {
		txt.value = "";
	}
	ieFix();
    
	selectedUserReview = 0;
}

function submitReply(userReviewId, movieId) {
	var txtComment = document.getElementById('txtComment');
	
	txtComment.disabled = false;
	txtComment.style.backgroundColor = "#fff";

	if (getTextBoxLength('txtComment' + userReviewId) < minCommentChar)
	{
		window.alert("Your reply must be at least " + minCommentChar+ " characters");
	    return;
	}
	var txt = getDiv('txtComment'+userReviewId);
	if (txt && movieId) {
	    backendSubmitReview(movieId, txt.value);
	}
	// hide things again;
	cancelReply(userReviewId);
}

function submitReview(movieid) {
	if (getTextBoxLength('txtComment') < minCommentChar)
	{
		window.alert("Your message must be at least " + minCommentChar+ " characters");
	    return;
	}
	
	backendSubmitReview(movieid, document.getElementById('txtComment').value);
	// this is a link activated script;
	//return false;
}

function cancelReview() {
	var txtComment = document.getElementById('txtComment');
	txtComment.value = "";
}

function backendSubmitReview(movieid, txt)
{

	var toPost = "reviewtext=" + encodeURI(txt) + "&";
	toPost += "movieid=" + movieid + "&";
	toPost += "parentid=" + selectedUserReview + "&";
	toPost += "subjecttext=&";
	toPost += "siteguid=" + getCookie('__REELZ_ACCOUNT_ID');

	makeRequest(BASE_URL + "data/adduserreview.aspx", reviewSubmitted, toPost);
	
	ieFix();
}

function reviewSubmitted()
{
	 if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var response = http_request.responseText;
	        
			if (response.length > 0)
			{
				var divUserReviews = document.getElementById("divUserReviewList");
				
				divUserReviews.innerHTML = response;
                var scripts = divUserReviews.getElementsByTagName("SCRIPT");
                for (var i = 0; i < scripts.length; i++) {
                    eval(scripts[i].innerHTML);
                }
                document.location = "#last_review"
			}
			
			ieFix();
		}
	}
}

function submitReviewRating(ratingId, rating)
{
	var toPost = "rating=" + rating + "&";
	toPost += "userreviewid=" + ratingId + "&";
	toPost += "siteguid=" + getCookie('__REELZ_ACCOUNT_ID');

	makeRequest(BASE_URL + "data/adduserreviewrating.aspx", reviewRatingSubmitted, toPost);
	
	//This will be replaced with style classes
	if (rating < 0)
	{
		//document.getElementById('messageContainer' + ratingId).style.color = "#696969";
	} else {
		//document.getElementById('messageContainer' + ratingId).style.color = "#000";
	}
	return false;
}

function reviewRatingSubmitted()
{
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var response = http_request.responseText;
	        
			if (response.length > 0)
			{
				var aryRatingInfo = response.split(':');
				
				var ratingContainer = document.getElementById("rating" + aryRatingInfo[0]);
				ratingContainer.innerHTML = aryRatingInfo[1];
			}
		}
	}
}

function submitRatingReport(ratingId)
{
	var answer = confirm("Are you sure you want to report this?");
	if (answer)
	{
		var author = document.getElementById("author" + ratingId).innerHTML;
		var comment = document.getElementById("comment" + ratingId).innerHTML;
		
		var toPost = "author=" + encodeURI(author) + "&";
		toPost += "comment=" + encodeURI(comment) + "&";
		toPost += "location=" + encodeURI(window.location) + "&";
		toPost += "ratingid=" + ratingId;

		makeRequest(BASE_URL + "data/senduserreviewreport.aspx", ratingReportSubmitted, toPost);
		
		var reported = document.getElementById("reported" + ratingId);
		reported.innerHTML = "abuse reported";
	}
}

function ratingReportSubmitted()
{
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var response = http_request.responseText;
	        
			if (response.length > 0)
			{

			}
		}
	}
}

function ieFix() {
	if(is_ie) {
        var rev_ft = getDiv("rev_ft");
        if (rev_ft) {
            rev_ft.className = rev_ft.className + "";
        }
	}
}
