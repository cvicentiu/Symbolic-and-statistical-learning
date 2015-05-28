var fmTimer = null;
var fmbg = false;
var num = 3;
var cnt = 0;

function fminit(){
    if (!document.getElementById) return;
    if (cnt++ > num) {cnt=0; return;}
    fmb1=230; fmb2=237; fmb3=246;
    fmb4=197; fmb5=212; fmb6=233;
    // fmb1=254; fmb2=186; fmb3=2;
    // #feba02
    // fmb4=179; fmb5=0; fmb6=0;
    // #b30000
    if (!fmbg){
        fmtemp=fmb1; fmb1=fmb4; fmb4=fmtemp; fmtemp=fmb2; fmb2=fmb5; fmb5=fmtemp; fmtemp=fmb3; fmb3=fmb6; fmb6=fmtemp;
    }
    fmbg = !fmbg;
    fmFade();
}

function fmToHex(n){
    var hexChars = "0123456789ABCDEF";
    if (n == 0) return "00";
    var j, n;
    var temp = "";
    while (n != 0){
        j = n % 16;
        n = (n - j)/16;
        temp = hexChars.charAt(j) + temp;
    }
    if (temp.length < 2){
        temp = "0" + temp;
    }
    return temp;
}

function fmFade(){
    obj1 = document.getElementById('bookNow1').style;
    obj2 = document.getElementById('bookNow2').style;
    fmbackcolor = "#" + fmToHex(fmb1) + fmToHex(fmb2) + fmToHex(fmb3);
    obj1.backgroundColor = fmbackcolor;
    obj2.backgroundColor = fmbackcolor;
    // obj.borderColor = fmbackcolor;
    if (fmb1 != fmb4){
	    if (fmb4 > fmb1){fmb1++;}
		else{fmb1--;}
	}
	if (fmb2 != fmb5){
		if (fmb5 > fmb2){fmb2++;}
		else{fmb2--;}
	}
	if (fmb3 != fmb6){
		if (fmb6 > fmb3){fmb3++;}
		else{fmb3--;}
	}
	if ((fmb1 == fmb4) && (fmb2 == fmb5) && (fmb3 == fmb6)){
		window.clearTimeout(fmTimer);
		fminit()}
	else{
		fmTimer = window.setTimeout("fmFade()",10);
	}
}
// onload = fminit
