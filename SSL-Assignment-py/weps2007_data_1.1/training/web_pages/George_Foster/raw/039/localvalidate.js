var yearRange = new Array(1900, 2050); //Year range for validation

function searchfor(frm) {
	if ((frm.searchphrase.value != 'Enter search term') && (frm.searchphrase.value.length > 0)) {
		 frm.submit();
	}
}

// -------------------------------------------------- SAVE --------------------------------------------------

//Validate main bio save
function mainbio(frm) {
	var errMsg = '';	
	//required
	if (replace(frm.profile.value, ' ', '').length <= 0) {errMsg += 'Profile is required.\n';}
	if (replace(frm.bio.value, ' ', '').length <= 0) {errMsg += 'Bio is required.\n';}

	//length limits
	if (frm.urlpersonal.value.length > 128) {errMsg += 'Personal Page URL exceeds allowed length.\n';}
	if (frm.urlcv.value.length > 128) {errMsg += 'CV Url exceeds allowed length.\n';}
	if (replace(frm.profile.value, ' ', '').length > 600) {errMsg += 'Profile exceeds allowed length.\n';}
	if (replace(frm.bio.value, ' ', '').length > 3000) {errMsg += 'Bio exceeds allowed length.\n';}

	return errMsg;
}


//Validate degrees and experience save
function detaileditdegs(frm) {
	var errMsg = '';
	//length limits
	if (frm.acaddegrees.value.length > 2048) {errMsg += 'Academic Degrees exceeds allowed length.\n';}
	if (frm.profexperience.value.length > 1024) {errMsg += 'Professional Experience exceeds allowed length.\n';}

	return errMsg;
}


//Validate publications edit save
function detaileditpubs(frm) {
	var i, totalRows = 0, errMsg = '';
	var artBookDone = false, titleChapDone = false;
	var titleArtDone = false, namePubDone = false, nameBookDone = false, pubUrlDone = false, dispRanksDone = false, pubYearDone = false;
	var thisRank, ranks = '', thisYr;
	var artLen, chapLen, bookLen, pubLen, publisherLen;
	var hasPub = false, hasBook = false, pubProbs = false, bookProbs = false;

	totalRows = frm.rows.value;
	for (i=0 ; i<=(totalRows-1) ; i++) {
		if (!eval('frm.delete' + i + '.checked')) { // not marked for delete, validate fields
			eval('frm.delete' + i + '.value= 0');
			thisYr = eval('frm.pubyear' + i + '.value');
			thisRank = eval('frm.rank' + i + '.value');
			artLen = eval('frm.titlearticle' + i + '.value.length');
			chapLen = eval('frm.titlechapter' + i + '.value.length');
			bookLen = eval('frm.namebook' + i + '.value.length');
			pubLen = eval('frm.namepub' + i + '.value.length');
			publisherLen = eval('frm.namepublisher' + i + '.value.length');
			
			//required
			hasPub = hasBook = pubProbs = bookProbs = false;
			if (artLen>0 || pubLen>0) hasPub = true;
			if (chapLen>0 || bookLen>0 || publisherLen>0) hasBook = true;
			if (hasPub && (artLen==0 || pubLen==0)) pubProbs = true;
			if (hasBook && (bookLen==0 || publisherLen==0)) bookProbs = true;
			//alert(hasPub + '.' + hasBook + ' - ' + pubProbs + '.' + bookProbs);
			if (!artBookDone && (pubProbs || bookProbs)) {errMsg += 'Either a publication (article + publication), OR \na book(book name + publisher and an optional chapter), \nbut NOT both must be provided.\n'; artBookDone = true}

			if ((thisYr.length <= 0) || (!isvalidyear(thisYr)) && (!pubYearDone)) {errMsg += 'Year is required and must be valid.\n';}
			
			//format
			if ((thisRank > 0) && (!dispRanksDone) && (ranks.indexOf(thisRank) >= 0)) {errMsg += 'Two entries cannot have the same display rank.\n'; dispRanksDone = true; ranks += thisRank + '.';}

			//length limits
			if ((artLen > 1024) && (!titleArtDone)) {errMsg += 'Article title exceeds allowed length.\n'; titleArtDone = true;}
			if ((chapLen > 512) && (!titleChapDone)) {errMsg += 'Chapter title exceeds allowed length.\n'; titleChapDone = true;}
			if ((bookLen > 512) && (!nameBookDone)) {errMsg += 'Book name exceeds allowed length.\n'; nameBookDone = true;}
			if ((pubLen > 512) && (!namePubDone)) {errMsg += 'Publication name exceeds allowed length.\n'; namePubDone = true;}
			if ((publisherLen > 512) && (!namePubDone)) {errMsg += 'Publisher exceeds allowed length.\n'; namePubDone = true;}
			if ((eval('frm.url' + i + '.value.length') > 512) && (!pubUrlDone)) {errMsg += 'URL exceeds allowed length.\n'; pubUrlDone = true;}
		} else {
			eval('frm.delete' + i + '.value = 1');
		}
	} 
	return errMsg;
}


//Validate awards edit save
function detaileditawards(frm) {
	var i, totalRows = 0, errMsg = '';
	var awardNameDone = false, awardOrgDone = false, dispRanksDone = false, awardYearDone = false;
	var thisRank, ranks = '', thisYr;

	totalRows = frm.rows.value;
	for (i=0 ; i<=(totalRows-1) ; i++) {
		if (!eval('frm.delete' + i + '.checked')) { // not marked for delete, validate fields
			eval('frm.delete' + i + '.value= 0');
			thisYr = eval('frm.awardyear' + i + '.value');
			thisRank = eval('frm.rank' + i + '.value');

			//required
			if (!isvalidyear(thisYr) && (!awardYearDone)) {errMsg += 'Year is required and must be valid.\n'; awardYearDone = true;}
			if ((eval('frm.awardname' + i + '.value.length') <= 0) && (!awardNameDone)) {errMsg += 'Name is required.\n'; awardNameDone = true;}
			
			//format
			if ((thisRank > 0) && (!dispRanksDone) && (ranks.indexOf(thisRank) >= 0)) {errMsg += 'Two entries cannot have the same display rank.\n'; dispRanksDone = true; ranks += thisRank + '.';}

			//length limits
			if ((eval('frm.awardname' + i + '.value.length') > 512) && (!awardNameDone)) {errMsg += 'Name exceeds allowed length.\n'; awardNameDone = true;}
			if ((eval('frm.awardorg' + i + '.value.length') > 512) && (!awardOrgDone)) {errMsg += 'Organization exceeds allowed length.\n'; awardOrgDone = true;}
		} else {
			eval('frm.delete' + i + '.value = 1');
		}
	} 
	return errMsg;
}


//Validate gsb press releases edit save
function detaileditgsbpressrelease(frm) {
	var i, totalRows = 0, errMsg = '';
	var mentionTitleDone = false, mentionUrlDone = false, dispRanksDone = false, mentionDateDone = false;
	var thisRank, ranks = '';

	totalRows = frm.rows.value;
	for (i=0 ; i<=(totalRows-1) ; i++) {
		if (!eval('frm.delete' + i + '.checked')) { // not marked for delete, validate fields
			eval('frm.delete' + i + '.value= 0');

			thisRank = eval('frm.rank' + i + '.value');

			//required
			//if ((!isvalidmonthyear(eval('frm.mentiondate' + i + '.value'))) && (!mentionDateDone)) {errMsg += 'Date is required and must be valid.\n'; mentionDateDone = true;}
			if ((eval('frm.mentiontitle' + i + '.value.length') == 0) && (!mentionTitleDone)) {errMsg += 'Headline is required.\n';}
			//if ((eval('frm.mentionurl' + i + '.value.length') == 0) && (!mentionUrlDone)) {errMsg += 'URL is required.\n';}
			
			//format
			if ((thisRank > 0) && (!dispRanksDone) && (ranks.indexOf(thisRank) >= 0)) {errMsg += 'Two entries cannot have the same display rank.\n'; ranks += thisRank + '.'; dispRanksDone = true;}
			
			//length limits
			if ((eval('frm.mentiondate' + i + '.value.length') > 128) && (!mentionDateDone)) {errMsg += 'Date exceeds allowed length.\n'; mentionTitleDone = true;}
			if ((eval('frm.mentiontitle' + i + '.value.length') > 512) && (!mentionTitleDone)) {errMsg += 'Headline exceeds allowed length.\n'; mentionTitleDone = true;}
			if ((eval('frm.mentionurl' + i + '.value.length') > 512) && (!mentionUrlDone)) {errMsg += 'URL exceeds allowed length.\n'; mentionUrlDone = true;}
		} else {
			eval('frm.delete' + i + '.value = 1');
		}
	} 
	return errMsg;
}


//Validate external media mentions edit save
function detaileditextmediamention(frm) {
	var i, totalRows = 0, errMsg = '';
	var mentionTitleDone = false, mentionUrlDone = false, mentionPublicationDone = false, dispRanksDone = false, mentionDateDone = false;
	var thisRank, ranks = '';

	totalRows = frm.rows.value;
	for (i=0 ; i<=(totalRows-1) ; i++) {
		if (!eval('frm.delete' + i + '.checked')) { // not marked for delete, validate fields
			eval('frm.delete' + i + '.value= 0');

			thisRank = eval('frm.rank' + i + '.value');

			//required
			//if ((!isvalidmonthyear(eval('frm.mentiondate' + i + '.value'))) && (!mentionDateDone)) {errMsg += 'Date is required and must be valid.\n'; mentionDateDone = true;}
			if ((eval('frm.mentiontitle' + i + '.value.length') == 0) && (!mentionTitleDone)) {errMsg += 'Headline is required.\n';}
			//if ((eval('frm.mentionurl' + i + '.value.length') == 0) && (!mentionUrlDone)) {errMsg += 'URL is required.\n';}
			
			//format
			if ((thisRank > 0) && (!dispRanksDone) && (ranks.indexOf(thisRank) >= 0)) {errMsg += 'Two entries cannot have the same display rank.\n'; ranks += thisRank + '.'; dispRanksDone = true;}
			
			//length limits
			if ((eval('frm.mentiondate' + i + '.value.length') > 128) && (!mentionDateDone)) {errMsg += 'Date exceeds allowed length.\n'; mentionTitleDone = true;}
			if ((eval('frm.mentiontitle' + i + '.value.length') > 512) && (!mentionTitleDone)) {errMsg += 'Headline exceeds allowed length.\n'; mentionTitleDone = true;}
			if ((eval('frm.mentionpublication' + i + '.value.length') > 512) && (!mentionPublicationDone)) {errMsg += 'Publication name exceeds allowed length.\n'; mentionTitleDone = true;}
			if ((eval('frm.mentionurl' + i + '.value.length') > 512) && (!mentionUrlDone)) {errMsg += 'URL exceeds allowed length.\n'; mentionUrlDone = true;}
		} else {
			eval('frm.delete' + i + '.value = 1');
		}
	} 
	return errMsg;
}


//Validate org affiliations edit save
function detaileditorgaffil(frm) {
	var i, totalRows = 0, errMsg = '';
	var affilNameDone = false, affilOrgDone = false, affilYearFromDone = false, affilYearToDone = false, affilUrlDone = false, dispRanksDone = false;
	var thisRank, ranks = '', thisYrFrom, thisYrTo;

	totalRows = frm.rows.value;
	for (i=0 ; i<=(totalRows-1) ; i++) {
		if (!eval('frm.delete' + i + '.checked')) { // not marked for delete, validate fields
			eval('frm.delete' + i + '.value= 0');
			thisYrFrom = eval('frm.affilyearfrom' + i + '.value');
			thisYrTo = eval('frm.affilyearto' + i + '.value');
			thisRank = eval('frm.rank' + i + '.value');

			//required
			//if ((eval('frm.affilname' + i + '.value.length') == 0) && (!affilNameDone)) {errMsg += 'Affiliation name is required.\n';}
			if ((eval('frm.affilorg' + i + '.value.length') == 0) && (!affilOrgDone)) {errMsg += 'Affiliation organization name is required.\n';}
			//if ((!isvalidyear(thisYrFrom)) && (!affilYearFromDone)) {errMsg += 'Affiliation from year is required and must be valid.\n';}
			
			//format
			if ((thisYrFrom != '') && (!isvalidyear(thisYrFrom)) && (!affilYearFromDone)) {errMsg += 'Affiliation from year must be valid.\n';}
			if ((thisYrTo != '') && (!isvalidyear(thisYrTo)) && (!affilYearToDone)) {errMsg += 'Affiliation to year must be valid.\n';}
			if ((thisRank > 0) && (!dispRanksDone) && (ranks.indexOf(thisRank) >= 0)) {errMsg += 'Two entries cannot have the same display rank.\n'; dispRanksDone = true; ranks += thisRank + '.';}
			
			//length limits
			if ((eval('frm.affilname' + i + '.value.length') > 1024) && (!affilNameDone)) {errMsg += 'Affiliation name allowed length.\n'; affilNameDone = true;}
			if ((eval('frm.affilorg' + i + '.value.length') > 1024) && (!affilOrgDone)) {errMsg += 'Affiliation organization name exceeds allowed length.\n'; affilOrgDone = true;}
			if ((eval('frm.affilurl' + i + '.value.length') > 512) && (!affilUrlDone)) {errMsg += 'Affiliation URL exceeds allowed length.\n'; affilOrgDone = true;}
		} else {
			eval('frm.delete' + i + '.value = 1');
		}
	} 
	return errMsg;
}


//Validate center/program associations edit save
function detaileditcenterprogram(frm) {
	var i, totalRows = 0, errMsg = '';
	var affilOrgDone = false, affilUrlDone = false, dispRanksDone = false;
	var thisRank, ranks = '';

	totalRows = frm.rows.value;
	for (i=0 ; i<=(totalRows-1) ; i++) {
		if (!eval('frm.delete' + i + '.checked')) { // not marked for delete, validate fields
			eval('frm.delete' + i + '.value= 0');
			thisRank = eval('frm.rank' + i + '.value');

			//required
			if ((eval('frm.affilorg' + i + '.value.length') == 0) && (!affilOrgDone)) {errMsg += 'Name is required.\n';}
			
			//format
			if ((thisRank > 0) && (!dispRanksDone) && (ranks.indexOf(thisRank) >= 0)) {errMsg += 'Two entries cannot have the same display rank.\n'; dispRanksDone = true; ranks += thisRank + '.';}
			
			//length limits
			if ((eval('frm.affilorg' + i + '.value.length') > 512) && (!affilOrgDone)) {errMsg += 'Name exceeds allowed length.\n'; affilOrgDone = true;}
			if ((eval('frm.affilurl' + i + '.value.length') > 512) && (!affilUrlDone)) {errMsg += 'URL exceeds allowed length.\n'; affilOrgDone = true;}
		} else {
			eval('frm.delete' + i + '.value = 1');
		}
	} 
	return errMsg;
}


//Validate research documents edit save (research papers OR cases)
function detaileditresearchdocuments(frm) {
	var i, totalRows = 0, errMsg = '';
	var rDocTitleDone = false, rDocPaperNumberDone = false, rDocPaperNumberFormatDone = false, dispRanksDone = false, rDocNumberLenDone = false, rDocTitleLenDone = false;
	var thisRank, thisTitle, thisNumber, ranks = '';

	totalRows = frm.rows.value;
	for (i=0 ; i<=(totalRows-1) ; i++) {
		if (!eval('frm.delete' + i + '.checked')) { // not marked for delete, validate fields
			eval('frm.delete' + i + '.value= 0');
			thisRank = eval('frm.rank' + i + '.value');
			thisTitle = eval('frm.rdoctitle' + i + '.value');
			thisNumber = eval('frm.rdocnumber' + i + '.value');
			
			//required
			if ((thisTitle.length <= 0) && (!rDocTitleDone)) {errMsg += 'Title is required.\n'; rDocTitleDone = true;}
			//if ((thisNumber.length <= 0) && (!rDocPaperNumberDone)) {errMsg += 'Number is required.\n'; rDocPaperNumberDone = true;}
			
			//format
			if ((!isalphanum(eval('frm.rdocnumber' + i + '.value'))) && (!rDocPaperNumberFormatDone)) {errMsg += 'Number must be alphanumeric.\n'; rDocPaperNumberFormatDone = true;}
			if ((thisRank > 0) && (!dispRanksDone) && (ranks.indexOf(thisRank) >= 0)) {errMsg += 'Two entries cannot have the same display rank.\n'; dispRanksDone = true; ranks += thisRank + '.';}
			
			//length limits
			if ((thisTitle.length > 128) && (!rDocTitleLenDone)) {errMsg += 'Title exceeds allowed length.\n'; rDocTitleLenDone = true;}
			if ((thisNumber.length > 16) && (!rDocNumberLenDone)) {errMsg += 'Number exceeds allowed length.\n'; rDocNumberLenDone = true;}
		} else {
			eval('frm.delete' + i + '.value = 1');
		}
	} 
	return errMsg;
}

// -------------------------------------------------- ADD --------------------------------------------------

//Validate publications add
function detailaddpub(frm) {
	var errMsg = '';
	var artLen, chapLen, bookLen, pubLen, publisherLen;
	artLen = frm.titlearticle.value.length;
	chapLen = frm.titlechapter.value.length;
	bookLen = frm.namebook.value.length;
	pubLen = frm.namepub.value.length;
	publisherLen = frm.namepublisher.value.length;
	//alert(artLen + ' - ' + chapLen + ' - ' + bookLen + ' - ' + pubLen);
	
	//required
	var hasPub = false, hasBook = false, pubProbs = false, bookProbs = false;
	if (artLen>0 || pubLen>0) hasPub = true;
	if (chapLen>0 || bookLen>0 || publisherLen>0) hasBook = true;

	if (hasPub && (artLen==0 || pubLen==0)) pubProbs = true;
	if (hasBook && (bookLen==0 || publisherLen==0)) bookProbs = true;

	if (pubProbs || bookProbs) {errMsg += 'Either a publication (article + publication), OR \na book(book name + publisher and an optional chapter), \nbut NOT both must be provided.\n';}
	
	//format
	if ((frm.pubyear.value.length <= 0) || (!isvalidyear(frm.pubyear.value))) {errMsg += 'Publication Year is required and must be valid.\n';}

	//length limits
	if (artLen > 512) {errMsg += 'Article Title exceeds allowed length.\n';}
	if (chapLen > 512) {errMsg += 'Chapter Title exceeds allowed length.\n';}
	if (bookLen > 512) {errMsg += 'Book Name exceeds allowed length.\n';}
	if (pubLen > 512) {errMsg += 'Publication Name exceeds allowed length.\n';}
	if (publisherLen > 512) {errMsg += 'Publisher Name exceeds allowed length.\n';}

	return errMsg;
}


//Validate awards add
function detailaddaward(frm) {
	var errMsg = '';
	//required
	//if (frm.awardorg.value.length <= 0) {errMsg += 'Organization is required.\n';}
	if (frm.awardname.value.length <= 0) {errMsg += 'Name is required.\n';}
	if ((frm.awardyear.value.length == 0) || (!isvalidyear(frm.awardyear.value))) {errMsg += 'Year is required and must be valid.\n';}

	//length limits
	if (frm.awardorg.value.length > 512) {errMsg += 'Organization exceeds allowed length.\n';}
	if (frm.awardname.value.length > 512) {errMsg += 'Name exceeds allowed length.\n';}

	return errMsg;
}


//Validate gsb press release add
function detailaddgsbpressrelease(frm) {
	var errMsg = '';

	//required
	//if (!isvalidmonthyear(frm.mentiondate.value)) {errMsg += 'Date is required and must be valid.\n';}
	if (frm.mentiontitle.value.length == 0) {errMsg += 'Headline is required.\n';}
	//if (frm.mentionurl.value.length == 0) {errMsg += 'URL is required.\n';}	

	//length limits
	if (frm.mentiondate.value.length > 128) {errMsg += 'Date exceeds allowed length.\n';}
	if (frm.mentiontitle.value.length > 512) {errMsg += 'Headline exceeds allowed length.\n';}
	if (frm.mentionurl.value.length > 512) {errMsg += 'URL exceeds allowed length.\n';}

	return errMsg;
}


//Validate external media mention add
function detailaddextmention(frm) {
	var errMsg = '';

	//required
	//if (!isvalidmonthyear(frm.mentiondate.value)) {errMsg += 'Date is required and must be valid.\n';}
	//if (frm.mentionpublication.value.length == 0) {errMsg += 'Publication is required.\n';}
	if (frm.mentiontitle.value.length == 0) {errMsg += 'Headline is required.\n';}
	//if (frm.mentionurl.value.length == 0) {errMsg += 'URL is required.\n';}	

	//length limits
	if (frm.mentiondate.value.length > 128) {errMsg += 'Date exceeds allowed length.\n';}
	if (frm.mentiontitle.value.length > 512) {errMsg += 'Headline exceeds allowed length.\n';}
	if (frm.mentionurl.value.length > 512) {errMsg += 'URL exceeds allowed length.\n';}
	if (frm.mentionpublication.value.length > 512) {errMsg += 'Publication exceeds allowed length.\n';}

	return errMsg;
}


//Validate org affiliation add
function detailaddorgaffil(frm) {
	var errMsg = '';

	//required
	if (frm.affilorg.value.length == 0) {errMsg += 'Affiliation organization name is required.\n';}	
	//if ((frm.affilyearfrom.value.length == 0) || (!isvalidyear(frm.affilyearfrom.value))) {errMsg += 'Affiliation from year is required and must be valid.\n';}

	//format
	if ((frm.affilyearfrom.value.length != 0) && (!isvalidyear(frm.affilyearfrom.value))) {errMsg += 'Affiliation from year must be valid.\n';}
	if ((frm.affilyearto.value.length != 0) && (!isvalidyear(frm.affilyearto.value))) {errMsg += 'Affiliation to year must be valid.\n';}

	//length limits
	if (frm.affilname.value.length > 1024) {errMsg += 'Affiliation name exceeds allowed length.\n';}
	if (frm.affilorg.value.length > 1024) {errMsg += 'Affiliation organization name exceeds allowed length.\n';}
	if (frm.affilurl.value.length > 512) {errMsg += 'Affiliation URL exceeds allowed length.\n';}

	return errMsg;
}


//Validate org affiliation add
function detailaddcenterprogram(frm) {
	var errMsg = '';

	//required
	if (frm.affilorg.value.length == 0) {errMsg += 'Name is required.\n';}	

	//length limits
	if (frm.affilorg.value.length > 512) {errMsg += 'Name exceeds allowed length.\n';}
	if (frm.affilurl.value.length > 512) {errMsg += 'URL exceeds allowed length.\n';}

	return errMsg;
}


//Validate research document add (research paper OR case)
function detailaddresearchdocument(frm) {
	var errMsg = '';

	//required
	if (frm.rdoctitle.value.length == 0) {errMsg += 'Title is required.\n';}	
	//if (frm.rdocnumber.value.length == 0) {errMsg += 'Number is required.\n';}	

	//format
	if (!isalphanum(frm.rdocnumber.value)) {errMsg += 'Number must be alphanumeric.\n';}
	
	//length limits
	if (frm.rdoctitle.value.length > 128) {errMsg += 'Title exceeds allowed length.\n';}
	if (frm.rdocnumber.value.length > 16) {errMsg += 'Number exceeds allowed length.\n';}

	return errMsg;
}

// -------------------------------------------------- ADMIN --------------------------------------------------

//Validate admin main save
function adminmain(frm) {
	var errMsg = '';
	var areaVal, centerVal;
	
	areaVal = frm.area.value;
	centerVal = frm.center.value;

	//required
	if (frm.rank.value.length <= 0) {errMsg += 'Rank is required.\n';}
	if ((areaVal=='' && centerVal=='') || (areaVal!='' && centerVal!='')) {errMsg += 'Either an academic area or a center (but not both) must be specified.\n';}
	
	//length limits
	if (frm.titleacad.value.length > 1024) {errMsg += 'Academic Title exceeds allowed length.\n';}
	if (frm.titleexed.value.length > 1024) {errMsg += 'Executive Education Title exceeds allowed length.\n';}
	if (frm.titleother.value.length > 1024) {errMsg += 'Other Title exceeds allowed length.\n';}
	if (frm.rank.value.length > 64) {errMsg += 'Rank exceeds allowed length.\n';}
	if (frm.leavestatus.value.length > 256) {errMsg += 'Leave Status exceeds allowed length.\n';}

	return errMsg;
}

//Add new faculty
function adminaddfaculty(frm) {
	var i, totalRows = 0, numChecked, errMsg = '';

	totalRows = frm.rows.value;
	for (i=0 ; i<=(totalRows-1) ; i++) {
		if (!eval('frm.add' + i + '.checked'))
			numChecked += 1;
	}
	if (numChecked == 0) {errMsg = 'Nothing to add!\n';}

	return errMsg;	
}
// -------------------------------------------------- PRIVATE --------------------------------------------------

//wrapper for global alphanum check function
function isalphanum(which) {
	if ((which.length <= 0) || (validAlphanumeric(which))) {
		return true;
	} else {
		return false;
	}
}


//Replace whatstr in instr with withstr
function replace(instr, whatstr, withstr) {
	var rExp = new RegExp(whatstr, "gi");
	return instr.replace(rExp, withstr);
}


//Validate supplied year (yyyy) as within range.
function isvalidyear(whichyr) {
	//alert(whichyr + ' ' + validNumber(whichyr));
	if (validNumber(whichyr) & (whichyr > yearRange[0]) & (whichyr < yearRange[1]))
		return true
	else
		return false;
}


//Validate supplied monthyear (mm/yyyy) as within range.
function isvalidmonthyear(which) {
	var monthPat = /^([0][1-9]|[1][1-2])/;
	var parts = which.split('/');
	//alert(which + '.' + parts.length + '.' + parts[0] + '.' + parts[1] + '.' + isvalidyear(parts[1]) + '.' + monthPat.test(parts[0]));
	if ((parts.length == 2) & (isvalidyear(parts[1])) & (monthPat.test(parts[0])))
		return true;
	else
		return false;
}
