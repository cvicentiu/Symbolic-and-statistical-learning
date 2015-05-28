function secureLogin(formName) {
  var errorString = "Please supply the following details before submitting:\n\n";
  var errorCount = 0;
  
  if(formName.email.value == "") {
    errorString += " - Your email \n"
    errorCount++;
  }
  
  if(formName.password.value == "") {
    errorString += " - Your password \n"
    errorCount++;
  }
  
  if(errorCount > 0) {
    alert(errorString);
    return false
  }
  else {
    return true;
  }
}

function checkPwd(formName) {
  if(formName.password.value == "") {
    alert("Please supply a password before submitting.");
    formName.password.focus();
    return false;
  }
  if(formName.password.value.length < 6) {
    alert("Please make sure your password is a minimum of 6 characters in length.");
    formName.password.select();
    return false;
  }
  if(formName.password.value != formName.cPassword.value) {
    alert("The password and confirm password fields must match.");
    formName.password.select();
    return false;
  }
  else {
    return true;
  }
}

function checkUpdateDetails(formName) {
  var errorString = "Please complete the following fields before submitting:\n\n"
  var errCount = 0;
  
  if(formName.firstname.value == "") {
    errorString += " - Firstname\n"
    errCount++;
  }
  if(formName.lastname.value == "") {
    errorString += " - Lastname\n"
    errCount++;
  }
  if(formName.email.value == "") {
    errorString += " - Email\n"
    errCount++;
  }
  if(formName.password.value != "") {
    if(formName.password.value != formName.cPassword.value) {
      errorString += " - The password and confirm password fields must match.\n";
      errCount++;
    }
    if(formName.password.value.length < 6) {
      errorString += " - Your password must be a minimum of 6 characters in length.\n";
      errCount++;
    }
  }
  
  if(errCount > 0) {
    alert(errorString);
    return false;
  }
  else {
    return true;
  }
}
