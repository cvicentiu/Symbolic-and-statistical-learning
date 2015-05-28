/**
 * @class UserWrapper contains global methods in the user_wrapper.js file.
 * This is not really a class, but it serves to better organize the javadoc
 * comments generated from this file.
 * Without this, all methods get documented in a 'GLOBALS' page with methods
 * from all other .js files.
 * @private
 */
function UserWrapper()
{
}

/**
 * Gets the value from the input element with a given name and checks whether it is
 * a valid ZIP code.  If it is not, an error message is displayed in a dialog.
 * @param _el the input element containing the text to check.
 * @return true if the field has a valid ZIP code, false otherwise
 * @type boolean
 * @member UserWrapper
 */
function chkZipCode(_el)
{
	var checkOK = "0123456789";
	var allValid = true;
	var decPoints = 0;
	var allNum = "";

	if (_el.value.length < 5) {
		alertsay = "Please enter a 5 digit ZIP code or a ZIP+4 code in the format nnnnn-nnnn.";
		allValid = false;
	}
 	else if (_el.value.length > 5 && _el.value.length != 10) {
		alertsay = "Please enter a 5 digit ZIP code or a ZIP+4 code in the format nnnnn-nnnn.";
		allValid = false;
	}

	if (allValid) {
		for (var i = 0;  i < 5;  i++) {
			ch = _el.value.charAt(i);

			for (j = 0;  j < checkOK.length;  j++)
				if (ch == checkOK.charAt(j))
					break;

			if (j == checkOK.length) {
				allValid = false;
				alertsay = "ZIP code must be numeric.";
				break;
			}
		}

		if (allValid && _el.value.length > 5) {
			if (_el.value.charAt(5) != "-") {
				allValid = false;
				alertsay = "ZIP+4 must be in the format nnnnn-nnnn.";
			}
			else if (_el.value.substring(6, 10) == "0000") {
				allValid = false;
				alertsay = "0000 is not a valid ZIP+4 extension.";
			}
			else {
				for (i = 6;  i < 10;  i++) {
					ch = _el.value.charAt(i);

					for (j = 0;  j < checkOK.length;  j++)
						if (ch == checkOK.charAt(j))
							break;

					if (j == checkOK.length) {
						allValid = false;
						alertsay = "ZIP+4 must be numeric.";
						break;
					}
				}
			}
		}
	}

	if (!allValid)
		alert(alertsay);

	return (allValid);
}

