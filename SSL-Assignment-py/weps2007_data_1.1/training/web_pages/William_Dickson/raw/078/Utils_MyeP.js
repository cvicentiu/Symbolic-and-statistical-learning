function submitToMyeP(curForm){
	var frmLabel = getFormName(curForm);
	var frmSuccess=true;

	if (curForm.sourceURL == undefined){
		alert("The " + frmLabel + " is missing the sourceURL hidden field.");
		frmSuccess = false;
	}

	if (curForm.sourceLBL == undefined){
		alert("The " + frmLabel + " is missing the sourceLBL hidden field.");
		frmSuccess = false;
	}

	if (curForm.destDB == undefined){
		alert("The " + frmLabel + " is missing the destDB hidden field.");
		frmSuccess = false;
	}else if(curForm.destDB.value.length == 0){
		alert("The " + frmLabel + "'s destDB hidden field has not been given a value.");
		frmSuccess = false;
	}

	if (curForm.curID == undefined){
		alert("The " + frmLabel + " is missing the curID hidden field.");
		frmSuccess = false;
	}else if(curForm.curID.value.length == 0){
		alert("The " + frmLabel + "'s curID hidden field has not been given a value.");
		frmSuccess = false;
	}

	if (curForm.homeMode == undefined){
		alert("The " + frmLabel + " is missing the homeMode hidden field.");
		frmSuccess = false;
	}else if(curForm.homeMode.value.length == 0){
		alert("The " + frmLabel + "'s homeMode hidden field has not been given a value.");
		frmSuccess = false;
	}

  var l_homeMode  = curForm.homeMode.value;

  if (l_homeMode == "UploadPic"){
  	if (validate_UploadPic(curForm) == false) { frmSuccess = false; }
  }

	var srcURL = document.URL;
	if (srcURL.substr(srcURL.length - 1, 1) == '#'){
		srcURL = trim(srcURL.substr(0, srcURL.length - 1));
	}

	curForm.sourceURL.value = encodeURIComponent(srcURL);


	var srcLBL = document.title;
	if(srcLBL.indexOf(' - ') > 0){
		srcLBL = trim(srcLBL.substr(0, srcLBL.indexOf(' - ')));
	}

	curForm.sourceLBL.value = encodeURIComponent(srcLBL);

	if(frmSuccess){
		curForm.submit();
	}
	return false;
}

function buildMyePGET(){

	var srcURL = document.URL;
	if (srcURL.substr(srcURL.length - 1, 1) == '#'){
		srcURL = srcURL.substr(0, srcURL.length - 1);
	}

	var srcLBL = document.title;
	if(srcLBL.indexOf("-") > 0){
		srcLBL = srcLBL.substr(0, srcLBL.indexOf("-"));
	}

	return "sourceURL="+encodeURIComponent(srcURL)+"&sourceLBL="+encodeURIComponent(srcLBL);

}

function getFormName(curForm){
	var frmLabel = "current form";
	if (curForm.name.length > 0){
		frmLabel = "form " + curForm.name;
	}else if(curForm.id.length > 0){
		frmLabel = "form " + curForm.id;
	}

	return frmLabel;

}

function validate_UploadPic(curForm){
	var frmLabel = getFormName(curForm);

	if (curForm.pic == undefined){
		alert("The " + frmLabel + " is missing the PIC hidden field.");
		return false;
	}

	var l_pic = curForm.pic.value;

	if (l_pic == ""){
		alert('Please select an image to upload.');
		return false;
	}

	return true;
}
