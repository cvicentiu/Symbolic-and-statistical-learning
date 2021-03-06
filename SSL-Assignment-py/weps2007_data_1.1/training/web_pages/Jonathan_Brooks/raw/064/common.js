
	
	function quickJump( myElement ){
		var destination = myElement[myElement.selectedIndex].value;
		if ( destination.length > 0 ){ 
			document.location.href = myElement[myElement.selectedIndex].value;
		}
	}
	
	
	function removeDefault( myElement, myDefault ){
		if ( myElement.value == myDefault ){
			myElement.value = "";
		}
	}
	
	function addDefault( myElement, myDefault ){
		if ( myElement.value == "" ){
			myElement.value = myDefault;
		}
	}
	
	function goTo(iPage){
			document.parentForm.NextPage.value = iPage;
			document.parentForm.submit();
	}
	
	function bounceTo(iPage,iBounceBackPage){
		document.parentForm.NextPage.value = iPage;
		document.parentForm.BouncePage.value = iBounceBackPage;
		document.parentForm.submit();
	}
	
	function submit(){
		document.parentForm.submit();
	}
	
	function clearField( myElement, defaultValue ){
		if ( defaultValue == myElement.value ) myElement.value = "";
	}
	
	
	function formatCurrency( dblAmount )
	{
		var arrAmount;
		var iDecimalPart, iIntegerPart;
		var sMinus, sPounds, sFormattedPounds, sFormattedPennies;
		
		dblAmount		= new String(dblAmount);
		arrAmount		= dblAmount.split('.',2);
		iDecimalPart	= arrAmount[1];
		iIntegerPart	= parseInt(arrAmount[0]);
		sMinus			= '';
		
		if ( isNaN(iIntegerPart) ) { iIntegerPart = 0; }
		if ( isNaN(iDecimalPart) ) { iDecimalPart = 0; }
		
		if( iIntegerPart < 0 ) { sMinus = '-'; }
		iIntegerPart = Math.abs( iIntegerPart );
		sPounds = new String(iIntegerPart);
		arrAmount = [];
		while(sPounds.length > 3) {
			sFormattedPounds = sPounds.substr(sPounds.length-3);
			arrAmount.unshift(sFormattedPounds);
			sPounds = sPounds.substr(0,sPounds.length-3);
		}
		if(sPounds.length > 0) { arrAmount.unshift(sPounds); }
		sFormattedPounds = arrAmount.join(",");
		sFormattedPennies = new String(iDecimalPart);
		
		while( sFormattedPennies.length < 2 ){ sFormattedPennies += '0'; }
			
		return sMinus + sFormattedPounds + '.' + sFormattedPennies ;
		
	}
	
	
	// Only allows numbers to be entered
	function validateKeyPress( e ) {
		if ( !e ) var e = window.event;
		if ( e.charCode ) {
			if ( e.charCode == 0 || e.charCode == 46 || ( e.charCode > 47 && e.charCode < 58 ) ) {
				return true;
			} else {
				if (e.preventDefault) e.preventDefault();
				e.cancelBubble = true;
				return false;
			}
		} else {
			if ( e.keyCode == 0 || e.keyCode == 46 || ( e.keyCode > 47 && e.keyCode < 58 ) ) {
				return true;
			} else {
				e.returnValue = false;
				e.cancelBubble = true;
				return false;
			}
		}
	}
	
	//This function ensures that the user cannot enter multiple decimal places in the amount fields
	function validateDecimalPlaces(e, textElement){


		var textBoxValue = textElement.value
		var decimalPlace=textBoxValue.indexOf('.');

		if (decimalPlace == -1)
		{ 
			return true;
		}
		else
		{
			if ( e.charCode ) {
				if ( e.charCode != 46) {
					return true;
				}
				else 
				{
					if (e.preventDefault) e.preventDefault();
					e.cancelBubble = true;
					return false;
				}
			}
			else
			{
				if ( e.keyCode != 46 ) {
					return true;
				} 
				else 
				{
					e.returnValue = false;
					e.cancelBubble = true;
					return false;
				}
			}
		}	
	}			

	
	
	// Only allows numbers to be entered
	function validateAmount( e, myElement ) {
		if ( !e ) var e = window.event;
		if ( e.charCode ) {
			if ( e.charCode == 0 || e.charCode == 46 || ( e.charCode > 47 && e.charCode < 58 ) ) {
				return true;
			} else {
				if (e.preventDefault) e.preventDefault();
				e.cancelBubble = true;
				return false;
			}
		} else {
			if ( e.keyCode == 0 || e.keyCode == 46 || ( e.keyCode > 47 && e.keyCode < 58 ) ) {
				return true;
			} else {
				e.returnValue = false;
				e.cancelBubble = true;
				return false;
			}
		}
	}
	


	function validateWebDirectory( e ) {
	
		// 65 - 90		(A-Z)
		// 97 - 122		(a-z)
		// 48 - 57		(0-9)
		// 95			(_)
		// 45			(-)
		
		var i;
		
		if ( !e ) var e = window.event;
		
		if ( e.charCode ) {
			i = e.charCode;
			if ( i == 95 || i == 45 || ( i >= 48 && i <= 57 ) || ( i >= 65 && i <= 90 ) || ( i >= 97 && i <= 122 ) ) {
				return true;
			} else {
				if (e.preventDefault) e.preventDefault();
				e.cancelBubble = true;
				return false;
			}
		} else {
			i = e.keyCode;
			if ( i == 95 || i == 45 || ( i >= 48 && i <= 57 ) || ( i >= 65 && i <= 90 ) || ( i >= 97 && i <= 122 ) ) {
				return true;
			} else {
				e.returnValue = false;
				e.cancelBubble = true;
				return false;
			}
		}
	}
	
	
	
	
	// Removes enter character
	function validateSingleLineString( e ) {

		if ( !e ) var e = window.event;

		if ( e.charCode ) {
			if ( e.charCode == 13 ) {
				childSearch(false);
				return true;
			}
		} else {
			if ( e.keyCode == 13 ) {
				childSearch(false);
				return true;
			}
		}
	}
	
	function igRound( valueElement, vxPrecision ){
		
		var dblMultiplier, dblRemainder, dblLowerBoundary, dblValue, dblPrecision
		
		dblValue			= valueElement.value;
		dblPrecision		= vxPrecision;
		dblMultiplier		= parseInt( dblValue / dblPrecision );	// Figure out how many times the precision factor will fit into the given value
		dblLowerBoundary	= dblMultiplier * dblPrecision;		// Work out the minimum possible value (max value is by definition min + dblPrecision)
		dblRemainder		= dblValue - dblLowerBoundary;		// What's the remainder? i.e. where are we between max and min
		
		if ( ( dblRemainder * 2 ) < dblPrecision ) {			// If the remainder is less than half the precision, round down.
			//alert("rounding "+vxValue+" to "+dblLowerBoundary);
			valueElement.value = dblLowerBoundary;
		} else {
			//alert("rounding "+vxValue+" to "+ (dblLowerBoundary + dblPrecision));
			valueElement.value = dblLowerBoundary + dblPrecision;		// If the remainder is half the precision or more, round up.
		}
		
	}
	
	function participantSearch(){

		var sTrimmedSearchTerm;
					
		sTrimmedSearchTerm = document.sponsorForm._SearchTerm.value.replace(/^\s+$/g,'');
							
		if ( sTrimmedSearchTerm.length > 0 ) {
			document.sponsorForm.submit();
		}
	}