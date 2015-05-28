var answerOverColorText = "#0000FF", answerSelectedText = "#ff6600", answerNormalColorText, currentQuestion = new Object();

function answerOver(obj){
        var agt=navigator.userAgent.toLowerCase();
        var is_webtv = (agt.indexOf("webtv") != -1);
       if(is_webtv) {   return;  }

	var inp = obj.getElementsByTagName('input').item(0);
	if(inp != currentQuestion[inp.name]){
		answerNormalColorText = obj.style.color;
		obj.style.color = answerOverColorText;
		obj.style.cursor = "default";
	}
}

function answerOut(obj){
        var agt=navigator.userAgent.toLowerCase();
        var is_webtv = (agt.indexOf("webtv") != -1);
       if(is_webtv) {   return;  }

	var inp = obj.getElementsByTagName('input').item(0);
	if(inp != currentQuestion[inp.name]){
		obj.style.color = answerNormalColorText;
	}
}

function selectAnswer(obj){

	var agt=navigator.userAgent.toLowerCase();
	var is_webtv = (agt.indexOf("webtv") != -1);
       if(is_webtv) { 	return;  }

	var inp = obj.getElementsByTagName('input').item(0);
	if(false == inp.checked){
		inp.checked = true;
		answerSelected(inp);
	}
}

function answerSelected(obj){
        var agt=navigator.userAgent.toLowerCase();
        var is_webtv = (agt.indexOf("webtv") != -1);
       if(is_webtv) {   return;  }

	obj.parentNode.style.color = answerSelectedText;
	if(undefined != currentQuestion[obj.name]){
		currentQuestion[obj.name].parentNode.style.color = answerNormalColorText;
	}
	currentQuestion[obj.name] = obj;
}
