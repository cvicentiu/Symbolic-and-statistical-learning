var oLastSelectedDropDown = new lastSelectedDropDown();
function lastSelectedDropDown(){
   var _oLastID_1 = new Object();
   var _oLastID_2 = new Object();
   this.SetItemID_1 = function(obj){ _oLastID_1 = obj; };
   this.SetItemID_2 = function(obj){ _oLastID_2 = obj; };
   this.GetItemID_1 = function(){ return _oLastID_1; };
   this.GetItemID_2 = function(){ return _oLastID_2; };
}
function DropDownMenu(className){
	var _this            = this;
	var _className       = className;
	var _itemID          = '';
	var _baseURL         = '';
	var _ddlItems        = new Array();
	var _selectedValue   = '';
	var _targetID        = '';
	var _oThis           = new Object();
	this.DeselectOtherDropDowns = function(oCurrent1, oCurrent2){
	   var _obj1 = oLastSelectedDropDown.GetItemID_1();
	   var _obj2 = oLastSelectedDropDown.GetItemID_2();
      try{
         if(oCurrent2.id==_obj2.id){ 
            oLastSelectedDropDown.SetItemID_1(new Object());
            oLastSelectedDropDown.SetItemID_2(new Object());
            return;
         }
         _obj1.className = _obj1.className.replace('_OVER','');
			_obj1.style.zIndex = '3';
			_obj2.className = _obj2.className.replace(' Hide','');
			_obj2.className = _obj2.className + ' Hide';
      }catch(e){ }
   }
   this.RegisterSelectedDropDown = function(obj1, obj2){
      oLastSelectedDropDown.SetItemID_1(obj1);
      oLastSelectedDropDown.SetItemID_2(obj2);
   }
   this.ClearDDL = function(oCurrent){
      try{
         var item = document.getElementById(_itemID);
         item.className = item.className.replace(' Hide','');
         item.className = item.className + ' Hide';
		   oCurrent.className = _className + '_DropMenuBox'; 
         oCurrent.style.zIndex='3';
      }catch(e){ }
   }
	this.DrawDDL = function(oCurrent){
		var item = document.getElementById(_itemID);
		if(item.className.indexOf('Hide')==-1){
			_this.ClearDDL(oCurrent);
		}else{
			item.className = item.className.replace(' Hide','');
			oCurrent.className = _className + '_DropMenuBox_OVER';
         oCurrent.style.zIndex='1000';
		}
	}
	this.SetBaseURL = function(url){
		_baseURL = url;
	}
	this.SetSelectedValue = function(value){
		_selectedValue = value;
	}
	this.SetDropDownItems = function(array){
		_ddlItems = array;
	}
	this.SetTargetID = function(id){
		_targetID = id;
	}
	this.GetElementItem = function(element,url,text){
		element.className = _className + '_DropMenu_Item';
		element.onmouseover = function(){ this.className = _className + '_DropMenu_Item_Selected'; };
		element.onmouseout = function(){ this.className = _className + '_DropMenu_Item'; };
		element.onmousedown = function(){ navLnk(url); }; // For IE, when the onblur event of the parent cancels this elements onclick event.
		element.onclick = function(){ navLnk(url); };
		element.innerHTML = text;
		return element;
	}
	this.randomID = function(length){
	   var _str = "";
	   var arr = new Array(["A"],["B"],["C"],["D"],["E"],["F"],["G"],["H"],["I"],["J"],["K"],["L"],["M"],["N"],["O"],["P"],["Q"],["R"],["S"],["T"],["U"],["V"],["W"],["X"],["Y"],["Z"],["0"],["1"],["2"],["3"],["4"],["5"],["6"],["7"],["8"],["9"]);
	   for(var i=1; i<=length; i++){
	      _str += arr[Math.ceil((Math.random() * 100) / 2.8) - 1];
	   }
	   return _str;
   }
   this.SetBlurDropDown = function(oThis){
      _oThis = oThis;
   }
	this.Draw = function(){
	   _itemID = '_' + _className + _this.randomID(10) + 'DropDownList';
	   
		var baseDIV = document.createElement('div');
		baseDIV.className = _className + '_Navigation_Region';
		
		var innerDIV = document.createElement('div');
		innerDIV.id = '_' + _className + '_DropMenuBox';
		innerDIV.className = _className + '_DropMenuBox';
		innerDIV.onclick = function(){
		      _this.DeselectOtherDropDowns(this, document.getElementById(_itemID));
		      _this.RegisterSelectedDropDown(this, document.getElementById(_itemID));
			   _this.DrawDDL(this); 
		}
		innerDIV.onblur = function(){ //Ahh IE. If only FF supported you too.
		   _this.SetBlurDropDown(this);
		   setTimeout(function(){
		      _this.DeselectOtherDropDowns(_oThis, document.getElementById(_itemID));
			   _this.ClearDDL(_oThis);
			},10);
		}
		
		
		var region1DIV = document.createElement('div');
		region1DIV.className = _className + '_DropMenu_Region_1 Hide';
		region1DIV.id = _itemID;
		
		var region2DIV = document.createElement('div');
		region2DIV.className = _className + '_DropMenu_Region_2';
		
		var region3DIV = document.createElement('div');
		region3DIV.className = _className + '_DropMenu_Region_3';
		region3DIV.id = '_' + _className + '_ListRegion';
		
		var menuTextDIV = document.createElement('div');
		menuTextDIV.className = _className + '_DropMenuBoxText';
		menuTextDIV.innerHTML = _selectedValue;
		
		for(var i=0; i<_ddlItems.length; i++){
			var d = document.createElement('div');
			d = _this.GetElementItem(d,_baseURL + _ddlItems[i][1], _ddlItems[i][0]);
			region3DIV.appendChild(d);
        }
        
		region2DIV.appendChild(region3DIV);
		region1DIV.appendChild(region2DIV);
		innerDIV.appendChild(region1DIV);
		innerDIV.appendChild(menuTextDIV);
		baseDIV.appendChild(innerDIV);
		
		if(!document.getElementById(_targetID)){
		   document.write('<div id="' + _targetID + '" class="' + _className + '_DropDownList_PlaceHolderRegion"></div>');
		}
		document.getElementById(_targetID).appendChild(baseDIV);
	}
 }