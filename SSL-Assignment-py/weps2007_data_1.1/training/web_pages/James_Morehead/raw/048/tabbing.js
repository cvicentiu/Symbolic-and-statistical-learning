function show1(){
	var divone = document.getElementById("one");
	divone.style.display = "block";
	var lionelink = document.getElementById("onelink");
	lionelink.style.borderBottomColor = "#fff";
	lionelink.style.backgroundImage = "url(/images/tab_bg_on.gif)";
}
function show2(){
	var divtwo = document.getElementById("two");
	divtwo.style.display = "block";
	var litwolink = document.getElementById("twolink");
	litwolink.style.borderBottomColor = "#fff";
	litwolink.style.backgroundImage = "url(/images/tab_bg_on.gif)";
}
function show3(){
	var divthree = document.getElementById("three");
	divthree.style.display = "block";
	var lithreelink = document.getElementById("threelink");
	lithreelink.style.borderBottomColor = "#fff";
	lithreelink.style.backgroundImage = "url(/images/tab_bg_on.gif)";
}
function hide1(){
	var divone = document.getElementById("one");
	divone.style.display = "none";
	var lionelink = document.getElementById("onelink");
	lionelink.style.borderBottomColor = "#ccc";
	lionelink.style.backgroundImage = "url(/images/tab_bg.gif)";
}
function hide2(){
	var divtwo = document.getElementById("two");
	divtwo.style.display = "none";
	var litwolink = document.getElementById("twolink");
	litwolink.style.borderBottomColor = "#ccc";
	litwolink.style.backgroundImage = "url(/images/tab_bg.gif)";
}
function hide3(){
	var divthree = document.getElementById("three");
	divthree.style.display = "none";
	var lithreelink = document.getElementById("threelink");
	lithreelink.style.borderBottomColor = "#ccc";
	lithreelink.style.backgroundImage = "url(/images/tab_bg.gif)";
}

/*
selects random number from 1 to 3
*/
var randomtab=Math.floor(Math.random()*3 + 1);

/*
Combines above functions
*/
function tab1(){
	show1();
	hide2();
	hide3();
}
function tab2(){
	show2();
	hide1();
	hide3();
}
function tab3(){
	show3();
	hide1();
	hide2();
}

/*
Chooses which of the tabs to load based on random number
*/
function tabrandomizer(){
	if ( randomtab == 1)
	{
	tab1();
	}
	if ( randomtab == 2)
	{
	tab2();
	}
	if ( randomtab == 3)
	{
	tab3();
	}
}

window.onload = tabrandomizer;