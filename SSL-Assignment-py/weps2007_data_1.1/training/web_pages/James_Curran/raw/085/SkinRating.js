function SkingRating(className){
	var _this = this;
	var _className = className;
	var _itemID = '';
	var _baseURL = '';
	var _selectedValue = '';
	var _targetID = '';
	this.DrawDDL = function(){
		var item = document.getElementById(_itemID);
		if(item.className.indexOf('Hide')==-1){
			item.className = item.className + ' Hide';
		}else{
			item.className = item.className.replace(' Hide','');
		}
	}
	this.SetBaseURL = function(url){
		_baseURL = url;
	}
	this.SetSelectedValue = function(value){
		_selectedValue = value;
	}
	this.ID = function(id){
		_targetID = id;
	}
	this.GetElementItem = function(element,url,index){
	   var d = document.createElement('img');
	   d.src='/images/spacer.gif';
		d.className=_className + '_RateSkinBox_Rating_' + (index * 2);
      d.title='A ' + index + ' Star Rating';
		element.className = _className + '_RateSkin_Item';
		element.onmouseover = function(){ this.className = _className + '_RateSkin_Item_Selected'; };
		element.onmouseout = function(){ this.className = _className + '_RateSkin_Item'; };
		element.onclick = function(){ 
		   RateSkin(index);
		};
		element.appendChild(d);
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
	this.Draw = function(){
	   _itemID = '_' + _className + _this.randomID(15) + 'DropDownList';
	
		var innerDIV = document.createElement('div');
		innerDIV.className = _className + '_RateSkinBox';
		innerDIV.onmouseover = function(){ 
			this.className = _className + '_RateSkinBox_OVER'; 
			_this.DrawDDL(); 
		}
		innerDIV.onmouseout = function(){ 
			this.className = _className + '_RateSkinBox'; 
			_this.DrawDDL(); 
		}
		
		var region1DIV = document.createElement('div');
		region1DIV.className = _className + '_RateSkin_Region_1 Hide';
		region1DIV.id = _itemID;
		
		var region2DIV = document.createElement('div');
		region2DIV.className = _className + '_RateSkin_Region_2';
		
		var region3DIV = document.createElement('div');
		region3DIV.className = _className + '_RateSkin_Region_3';
		region3DIV.id = '_' + _className + '_ListRegion';
		
		var menuTextDIV = document.createElement('div');
		menuTextDIV.className = _className + '_RateSkinBox_Rating_' + _selectedValue;
		
		for(var i=1; i<6; i++){
			var d = document.createElement('div');
			d = _this.GetElementItem(d,_baseURL + i, i);
			region3DIV.appendChild(d);
      }
        
		region2DIV.appendChild(region3DIV);
		region1DIV.appendChild(region2DIV);
		innerDIV.appendChild(region1DIV);
		innerDIV.appendChild(menuTextDIV);
		
		if(!document.getElementById(_targetID)){
		   document.write('<div id="' + _targetID + '" class="' + _className + '_RateSkin_PlaceHolderRegion"></div>');
		}
		document.getElementById(_targetID).appendChild(innerDIV);
	}
 }
 
 function RateSkin(rating)
{
   var skinid = queryString('skinid');
   var libid = queryString('libid');
 
   //if(skinid == '' || skinid == null || isNaN(parseInt(skinid)) == false ) return;
   //if(libid == '' || libid == null || isNaN(parseInt(libid)) == false ) return;
 
   newWindow(400,200,'_blank', '/popups/rating.aspx?skinid=' + skinid + '&libid=' + libid + '&rating=' + rating, false);
}
