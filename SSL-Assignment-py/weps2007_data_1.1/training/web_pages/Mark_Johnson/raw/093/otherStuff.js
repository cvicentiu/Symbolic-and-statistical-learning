/*********************** SEARCH FORM VALIDATION ***********************/


	function checkWhere() {


		if (!form.sWhere[0].checked && !form.sWhere[1].checked) {


		//	alert('You must specify to search either by NAME or EXPERTISE.');


			return false;


		} else {


			if (form.sString.value == "") {


				alert('You must specify something to search for.');


				return false;


			} else { return true; }


		}





	}





/*********************** POPUP CONTENT ***********************/


	function popUp(url) {


		remote = window.open(url,"new","width=500,height=350,resizable=1,status=1,location=0,scrollbars=1,toolbar=0,menubar=1");


		if (remote != null ) {


			if (remote.opener == null) { remote.opener = self; }


		}


		remote.focus();


	}


	


/*********************** POPUP CONTENT 1 ***********************/	


	function popUp1(url) {


		remote = window.open(url,"new","width=550,height=350,resizable=1,status=1,location=0,scrollbars=1,toolbar=0,menubar=1");


		if (remote != null ) {


			if (remote.opener == null) { remote.opener = self; }


		}


		remote.focus();


	}



	


/*********************** POPUP CONTENT ***********************/


	function popUp2(url) {


		remote = window.open(url,"new","width=600,height=500,resizable=1,status=1,location=0,scrollbars=1,toolbar=0,menubar=1");


		if (remote != null ) {


			if (remote.opener == null) { remote.opener = self; }


		}


		remote.focus();


	}


	

function popUp3(url) {


		remote = window.open(url,"new","width=550,height=550,resizable=1,status=1,location=0,scrollbars=1,toolbar=0,menubar=1");


		if (remote != null ) {


			if (remote.opener == null) { remote.opener = self; }


		}


		remote.focus();


	}




/*********************** THE END! ***********************/





/*********************** Replace function ***********************/


function subAwithBinC(a,b,c)


{





	var i = c.indexOf(a);


	var l = b.length;





	while (i != -1)	{


		c = c.substring(0,i) + b + c.substring(i + a.length,c.length);


  i += l


		i = c.indexOf(a,i);


	}


	return c;





}


/*********************** THE END! ***********************/