function enableText(targetId){
	target = document.getElementById( targetId );    
    target.style.display = "";         
} 

function disableText(targetId){
	target = document.getElementById( targetId );    
    target.style.display = "none";         
} 

function changePrompt(targetId1, targetId2, backColor){
  if (document.getElementById){
            target1 = document.getElementById( targetId1 );
            target2 = document.getElementById( targetId2 );
     	       target1.style.backgroundColor = backColor;
     	       target1.style.borderTop = '1px #000000 solid';
     	       target1.style.borderLeft = '1px #000000 solid';
     	       target1.style.borderBottom = '1px #000000 solid';
     	       target2.style.backgroundColor = backColor;      
     	       target2.style.borderTop = '1px #000000 solid';
     	       target2.style.borderRight = '1px #000000 solid';
     	       target2.style.borderBottom = '1px #000000 solid';
     }
} 

function multiValidate(target1, target2, next, valExp) {
	var result = validate(target1, valExp);
	validateVisual(target2, next, result);
}

function validateInput(target, next, valExp) {
	
	var result = validate(target, valExp);
	validateVisual(target, next, result);
}

function validateCheckbox(target, next) {
	var result = 'checked';
	validateVisual(target, next, result);
}

function validateVisual(target, next, result) {
	
	disableText(target+'Text');
	
	if (result != -1) {
		enableText(target+'TextDone');
		disableText(target+'TextError');
		changePrompt(target+'Box', target+'TextBox', '#95F5A2');
		n = document.getElementById(next+'Box');
		if(n.style.backgroundColor == 'white') {
			changePrompt(next+'Box', next+'TextBox', '#F2C48F');
		}	
	}
	else {
		enableText(target+'TextError');
		disableText(target+'TextDone');
		changePrompt(target+'Box', target+'TextBox', '#F5ABAB');
	}
}

function initBox(target) {
	t = document.getElementById(target+'Box');
	if(t.style.backgroundColor == 'white') {
		changePrompt(target+'Box', target+'TextBox', '#F2C48F');
	}	
}

function validate(target, valExp) {
	t = document.getElementsByName(target);
	var value = t[0].value;
	var result = value.search(valExp);

	return result;
}

function finalValidate(targetString) {

	var s = targetString.split(', ');
	var x = true;
	for(var i = 0; i < s.length-1; i++) {
		var n = s[i].split('_');
		var reg = new RegExp(n[1]);
		var result = validate(n[0], reg);
		if(result == -1) {
			validateInput(n[0], '', reg);
			alert('Please complete the '+n[0]+' field');
			x = false;
			break;
		}
	}	
	return x;
}