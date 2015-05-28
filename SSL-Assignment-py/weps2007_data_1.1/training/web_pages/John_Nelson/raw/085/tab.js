function Accordian(id) {
	this.element = document.getElementById(id); if (!this.element) return false;  
	this.ul = this.element.getElementsByTagName("ul")[0]; 
	this.tabs = this.ul.getElementsByTagName("li");
	this.tabContent = this.getTabContent();
	this.bind();
}

Accordian.prototype.getTabContent = function() {
	tabContent= new Array();    
	this.divs = this.element.getElementsByTagName("div");
	for(var i = 0; i < this.divs.length; i++) {
        if (/tabContent/i.test(this.divs[i].className)) {
        tabContent.push(this.divs[i]);                        
		}
	}
	return tabContent;
}

Accordian.prototype.bind = function() {    
	var o = this;
	for(var i = 0; i < this.tabs.length; i++) {
		this.tabs[i].onclick = function() { o.open(this); return false; };   
		var a = this.tabs[i].getElementsByTagName("a")[0];
    if (a) a.onclick = function() { return false; };                     
	}
}

Accordian.prototype.open = function(caller) {    
	for(var i = 0; i < this.tabs.length; i++) {
		var tab = this.tabs[i]; 
		if (tab == caller) {  
			this.collapse();
			tab.className = "selected"
			this.tabContent[i].style.display = "block";
		}
	}
}

Accordian.prototype.collapse = function() {
	for(var i = 0; i < this.tabs.length; i++) {    
		this.tabs[i].className = "";
		this.tabContent[i].style.display = "none";                 
	}                                                                
}
