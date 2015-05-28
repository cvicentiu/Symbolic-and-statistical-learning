// Common javascript functions used by the PVO screens

	function valid_text(fieldName,fieldRequired,fieldMaxLength,fieldValue) {
		var errors = "";
		if (fieldRequired && ((fieldValue == null) || (fieldValue == ""))) {
			errors += "\nField '" + fieldName + "' is empty";
		}
		if (fieldValue.match(/^(\s+)$/)) {
			errors += "\nField '" + fieldName + "' contains only whitespace characters";
		}
		if (fieldValue.length > fieldMaxLength) {
			errors += "\nField '" + fieldName + "' is too long (" + fieldMaxLength + " max)";
		}
		return errors;
	}

	function valid_number(fieldName,fieldRequired,fieldMaxLength,fieldValue) {
		var errors = "";
		if (fieldRequired && ((fieldValue == null) || (fieldValue == ""))) {
			errors += "\nField '" + fieldName + "' is empty";
		} else if (fieldValue.length > fieldMaxLength) {
			errors += "\nField '" + fieldName + "' is too long (" + fieldMaxLength + " max)";
        } else if (isNaN(fieldValue)) {
            errors += "\nField '" + fieldName + "' must be numeric";
        } else if (fieldValue.match(/\s/)) {
            errors += "\nField '" + fieldName + "' must not contain whitespace";
        }
        return errors;
	}

	function valid_nonneg_integer_with_min(fieldName,fieldRequired,fieldMaxLength,fieldValue,minValue) {
		var errors = valid_number(fieldName,fieldRequired,fieldMaxLength,fieldValue);
        if (errors == '' && fieldValue != "") {
            if (String(parseInt(fieldValue)) != String(fieldValue)) {
                errors += "\nField '" + fieldName + "' must not have a decimal point or leading zeros";
            } else if (fieldValue < minValue) {
                errors += "\nField '" + fieldName + "' must be an integer >= " + minValue;
            }
        }
        return errors;
	}
	function valid_natural_number(fieldName,fieldRequired,fieldMaxLength,fieldValue) {
        return valid_nonneg_integer_with_min(fieldName,fieldRequired,fieldMaxLength,fieldValue,0);
    }
	function valid_positive_integer(fieldName,fieldRequired,fieldMaxLength,fieldValue) {
        return valid_nonneg_integer_with_min(fieldName,fieldRequired,fieldMaxLength,fieldValue,1);
    }

	function valid_date(fieldName,fieldRequired,fieldValue) {
		var L = 10;
		var errors = valid_text(fieldName,fieldRequired,L,fieldValue);
		if (fieldValue!=null && fieldValue!="") {
			var yyyy = fieldValue.substr(0,4);
			var sep1 = fieldValue.substr(4,1);
			var mm   = fieldValue.substr(5,2);
			var sep2 = fieldValue.substr(7,1);
			var dd   = fieldValue.substr(8,2);
			var dt = new Date(yyyy,mm-1,dd);
			if (
				isNaN(parseInt(yyyy)) || isNaN(parseInt(mm)) || isNaN(parseInt(dd)) 
			||	sep1 != '-' || sep2 != '-'
			||	dt==null
			||	yyyy != dt.getFullYear()
			||	mm != dt.getMonth() + 1
			||	dd != dt.getDate()
			) {
				errors += "\nField '" + fieldName + "' is invalid";
			}
		}
		return errors;
	}

	function valid_url(fieldName,fieldRequired,fieldMaxLength,fieldValue) {
		var errors = valid_text(fieldName,fieldRequired,fieldMaxLength,fieldValue);
		if (fieldValue!=null && fieldValue!="") {
			if (!fieldValue.match(/^http:\/\/|^\/[a-zA-Z0-9_\.,\/\?=-]+$/)) {
				errors += "\nField '" + fieldName + "' is invalid URL";
			}
		}
		return errors;
	}

	function valid_url_absolute(fieldName,fieldRequired,fieldMaxLength,fieldValue) {
		var errors = valid_url(fieldName,fieldRequired,fieldMaxLength,fieldValue);
		if (fieldValue!=null && fieldValue!="") {
			if (!fieldValue.match(/^http:\/\//)) {
				errors += "\nField '" + fieldName + "' is invalid (not absolute URL)";
			}
		}
		return errors;
	}

	function valid_url_relative(fieldName,fieldRequired,fieldMaxLength,fieldValue) {
		var errors = valid_url(fieldName,fieldRequired,fieldMaxLength,fieldValue);
		if (fieldValue!=null && fieldValue!="") {
			if (!fieldValue.match(/^\//)) {
				errors += "\nField '" + fieldName + "' is invalid (not relative URL)";
			}
		}
		return errors;
	}

    function valid_email(fieldName,fieldRequired,fieldMaxLength,fieldValue) {
        var errors = valid_text(fieldName,fieldRequired,fieldMaxLength,fieldValue);
        if (fieldValue!=null && fieldValue!="") {
            if (fieldValue.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) == -1) {
                errors += "\nField '" + fieldName + "' is an invalid E-mail address";
            }
        }
        return errors;
    }
