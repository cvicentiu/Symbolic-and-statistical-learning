<!--
//names of dropdowns stored here
f7_droplayer=new Array()
f7_droplayer[0]="menuHome"
f7_droplayer[1]="menuNews"
f7_droplayer[2]="menuSports"
f7_droplayer[3]="menuFeatures"
f7_droplayer[4]="menuEntertainment"
f7_droplayer[5]="menuMilestones"
f7_droplayer[6]="menuSpecialSections"
f7_droplayer[7]="menuMarketplace"
f7_droplayer[8]="menuCustomerService"

//simple browser check
f7_v4=(parseInt(navigator.appVersion)>=4 && parseInt(navigator.appVersion)<=5)?1:0
f7_ie=(document.all && f7_v4)?1:0
f7_ns=(document.layers && f7_v4)?1:0
f7_keep=-1

//code for drops
function f7_showdrop(thelayer){
	f7_keep=thelayer;
	f7_hideall(); 
	if(f7_ie){ eval(f7_droplayer[thelayer]+'.style.visibility="visible"') }
	if(f7_ns){ eval('document.'+f7_droplayer[thelayer]+'.visibility="show"');}
}

function f7_hidedrop(){
	f7_keep=-1; setTimeout('f7_hideall()',100)
}

function f7_hideall(){
	for(i=0;i<f7_droplayer.length;i++){  
		if(f7_ie && f7_keep!=i){ 
			eval(f7_droplayer[i]+'.style.visibility="hidden"');
		}
		if(f7_ns && f7_keep!=i){ 
			eval('document.'+f7_droplayer[i]+'.visibility="hide"');
		}
	}
}

//-->