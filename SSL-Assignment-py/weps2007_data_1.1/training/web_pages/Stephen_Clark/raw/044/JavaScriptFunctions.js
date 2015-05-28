function OpenAbbrev(sAbbrevPage) {

	Abbreviation = window.open(sAbbrevPage, '', 'width=250,height=50,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no');
	
	Abbreviation.focus();
	
	    if (Abbreviation.opener == null) Abbreviation.opener = window; 
	 Abbreviation.opener.name = "opener";

}

function OpenNote(sNotePage) {

	Note = window.open(sNotePage, '', 'width=600,height=200,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no');
	
	Note.focus();
	
	/*setTimeout("Note.scroll(0, "+scroll+")",1000);*/
	
		 if (Note.opener == null) Note.opener = window; 
	 Note.opener.name = "opener";

}

function OpenAuthInfo(sAuthInfoPage) {

	AuthInfo = window.open(sAuthInfoPage, '', 'width=400,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no');
	
	AuthInfo.focus();
	
	/*setTimeout("AuthInfo.scroll(0, "+scroll+")",1000);*/
	
		if (AuthInfo.opener == null) AuthInfo.opener = window; 
	AuthInfo.opener.name = "opener";

}
function OpenTest(sTest) {

	Test = window.open(sTest, '', 'width=800,height=600,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no');
	
	Test.focus();
	
	/*setTimeout("Test.scroll(0, "+scroll+")",1000);*/
	
		if (Test.opener == null) Test.opener = window; 
	Test.opener.name = "opener";

}

function OpenImage(sImagePage) {

	ImageInfo = window.open(sImagePage, '', 'width=600,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no');
	
	ImageInfo.focus();
	
	/*setTimeout("ImageInfo.scroll(0, "+scroll+")",1000);*/
	
		if (ImageInfo.opener == null) ImageInfo.opener = window; 
	ImageInfo.opener.name = "opener";

}

function OpenBibleRef(sBibleRef) {

	BibleRef = window.open(sBibleRef, '', 'width=600,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no');
	
	BibleRef.focus();
	
	/*setTimeout("BibleRef.scroll(0, "+scroll+")",1000);*/
	
		if (BibleRef.opener == null) BibleRef.opener = window; 
	BibleRef.opener.name = "opener";

}

function OpenPrintPage(sPrintPage) {

	PrintPage = window.open(sPrintPage, '', 'width=600,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no');
	
	PrintPage.focus();
	
	/*setTimeout("PrintPage.scroll(0, "+scroll+")",1000);*/
	
		if (PrintPage.opener == null) PrintPage.opener = window; 
	PrintPage.opener.name = "opener";

}

function OpenTopicList(sTopicList) {

	TopicList = window.open(sTopicList, '', 'width=700,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no');
	
	TopicList.focus();
	
	/*setTimeout("TopicList.scroll(0, "+scroll+")",1000);*/
	
		if (TopicList.opener == null) TopicList.opener = window; 
	TopicList.opener.name = "opener";

}

function AddTopictoSearch(sTopic) {
		temp = document.TopicPage.TopicClone.value;
		x = temp.length;
		if (x  > 0) { 
			temp = unescape(temp + " AND " + sTopic );
		}
		else { 
			temp = unescape(sTopic)
		}
		document.TopicPage.TopicClone.value = temp;
		

}

function updateSubject(textfield) {
	opener.document.SiteSearch.TopicInput.value = textfield.value;
}

function TopicSubmitButtononClick() {
	if (self.document.TopicPage.TopicClone.value.length > 0) {
		updateSubject(self.document.TopicPage.TopicClone);
	}
	self.close();
}

function OpenAuthorList(sAuthorList) {

	AuthorList = window.open(sAuthorList, '', 'width=700,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no');
	
	AuthorList.focus();
	
	/*setTimeout("AuthorList.scroll(0, "+scroll+")",1000);*/
	
		if (AuthorList.opener == null) AuthorList.opener = window; 
	AuthorList.opener.name = "opener";

}

function AddAuthortoSearch(sAuthor) {
		temp = document.AuthorPage.AuthorClone.value;
		x = temp.length;
		if (x  > 0) { 
			temp = unescape(temp + " AND " + sAuthor );
		}
		else { 
			temp = unescape(sAuthor)
		}
		document.AuthorPage.AuthorClone.value = temp;
		

}

function updateSubject(textfield) {
	opener.document.SiteSearch.TopicInput.value = textfield.value;
}

function updateAuthor(textfield) {
	opener.document.SiteSearch.AuthorInput.value = textfield.value;
}

function AuthorSubmitButtononClick() {
	updateAuthor(self.document.AuthorPage.AuthorClone);
	self.close();
}

function printIt(){
      if (window.print) self.print();
}

function ValidateIssue(selectfield1, selectfield2){
	if (selectfield1.selectedIndex == 0){
		selectfield2.selectedIndex = 0
		alert("\nYou must select a Volume first.")
	}
}

function AddIP(textIPMin1, textIPMin2, textIPMin3, textIPMin4, textIPMax1, textIPMax2, textIPMax3, textIPMax4, selectlist){
	temp = textIPMin1.value + "." + textIPMin2.value + "." + textIPMin3.value + "." + textIPMin4.value + "-" + textIPMax1.value + "." + textIPMax2.value + "." + textIPMax3.value + "." + textIPMax4.value
	i = 0
	while (i < selectlist.length) {
		if (selectlist.options[i].value == temp){
			return
		}
		i = i + 1
	}
	selectlist.options[selectlist.length] = new Option (temp, temp, false, true)
}

function RemoveIPs(selectlist){
	i = 0
	while (i < selectlist.length) {
		if (selectlist.options[i].selected == 1){
			selectlist.options[i] = null
		}
		else {
			i = i + 1
		}
	}
}

function ValidateIPNumber(text){
	if (! isNaN(text.value)){ 
		num = parseInt(text.value, 10)
		if ((num > 255) || (num < 0)){
			alert("\nThat isn't a valid IP number. (0-255)")
			/* There's probably a more intuitive way of forcibly resetting the value of the field to an empty string by reference to the object, but darned if I can figure it out. */
			text.value = text.defaultValue
		} 
	}
	else {
		alert("\nThat isn't a number.")
		/* There's probably a more intuitive way of forcibly resetting the value of the field to an empty string by reference to the object, but darned if I can figure it out. */
		text.value = text.defaultValue
	} 
}

function SelectIPRanges(selectlist){
	i = 0
	while (i < selectlist.length) {
		selectlist.options[i].selected = 1
		i = i + 1
	}
}

function ValidateTextarea(textarea){
	if (textarea.value.length > 255){
		alert("\nThe maximum number of characters allowed in this field is 255, and your input exceeds this.")
	}
}

