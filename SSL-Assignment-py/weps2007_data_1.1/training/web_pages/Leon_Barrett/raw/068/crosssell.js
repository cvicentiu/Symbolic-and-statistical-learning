<!--This is used for multi-region cross sell-->
if(FRsite=='UK'){xsellcountry = 'the UK&rsquo;s'; var xsellurl = '.co.uk'; var countrycode = '183'}
else if (FRsite=='AU'){var xsellcountry = 'Australia&rsquo;s'; var xsellurl = '.com.au'; var countrycode = '9'}
else if (FRsite=='NZ'){var xsellcountry = 'New Zealand&rsquo;s'; var xsellurl = '.co.nz'; var countrycode = '125'}
else if (FRsite=='SA'){var xsellcountry = 'South Africa&rsquo;s'; var xsellurl = '.co.za'}
else {var xsellcountry= 'the'; var xsellurl = '.com'}

<!--end of multi-region cross sell-->
<!--And this is used for targeting dating cross sell-->
var targetage
switch (targetage){
	case null: case '': case '0' : case 'undefined' :
		var age =""
		var lookingfor_age_lower = "18";
		var lookingfor_age_upper = "90";
	break
	case '1': case '2' :
		var age = " under 20"
		var lookingfor_age_lower = "18";
		var lookingfor_age_upper = "21";
	break
	case '3': case '4' :
		var age = " in their 20's"
		var lookingfor_age_lower = "21";
		var lookingfor_age_upper = "30";
	break
	case '5': case '6' :
		var age = " in their 30's"
		var lookingfor_age_lower = "31";
		var lookingfor_age_upper = "40";
	break
	case '7': case '8' :
		var age = " in their 40's"
		var lookingfor_age_lower = "41";
		var lookingfor_age_upper = "50";
	break
	case '9': case '10' :
		var age = " in their 50's"
		var lookingfor_age_lower = "51";
		var lookingfor_age_upper = "60";
	break
	case '11':
		var age = " over 60"
		var lookingfor_age_lower = "61";
		var lookingfor_age_upper = "99";
	break
}

switch (targetsex){
case '0' :
	var sex = "singles";
	var me = "1";
	var lookingfor ="3";
break;
case 'M':
	var sex = "women";
	var me = "1";
	var lookingfor ="2";
break;
case 'FM':
	var sex = "men";
	var me = "2";
	var lookingfor ="1";
break;
case 'NS': default:
	var sex = "singles";
	var me = "1";
	var lookingfor ="3";
}	

var marrcode;
var ismarr;
var targetmarr;
if (banneradcode){
	marrcode = banneradcode.split('/');
	targetmarr = marrcode[2];
	if(targetmarr){
		if(targetmarr.toLowerCase().indexOf('y') > 0){
			ismarr = true;	
		}
	}
}
<!--end of targetted dating cross sell-->