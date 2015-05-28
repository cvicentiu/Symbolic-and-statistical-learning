var D = {
	
	_tag: function(tag, parent) {
			var par = parent || document;
						
			return par.getElementsByTagName(tag);
		},
	
	_class: function(classname, tag, parent)	{
			var matches = [];
			var par = parent || document;
			
			var els = this._tag(tag, parent);
			var elsl = els.length;
			
			for(var i=0; i<elsl; i++) {
					if (els[i].className == classname)
						matches.push(els[i]);
				}
			
			if (matches.length == 1)
				return matches[0];
			
			return matches.length == 0 ? false : matches;
			
		
		},
	_id: function(id) {
			return document.getElementById(id);
		},
	
	_attr: function(attr, value, tag, parent) {

			var matches = [];
			var par = parent || document;
			
			var els = this._tag(tag, parent);
			var elsl = els.length;
			
			for (var i=0; i<elsl; i++) {
					if (els[i].getAttribute(attr) == value)
						matches.push(els[i]);
				}
			
			if (matches.length == 1)
				return matches[0];
			
			return matches.length == 0 ? false : matches;
			
				
		},
		_index: function(obj) {
					var parent_node = obj.parentNode;
					if (!parent_node)
						throw "nodeIndex: Missing parent for " + obj;
					
					for (var i = 0, cnt = 0, node, nodes = parent_node.childNodes; node = nodes[i]; i++) {
						if (node.tagName) {
							if (node === obj)
								return cnt;
							
							cnt++;
						}
					}
					return null;
		},	
		E: {
				add: function(obj, evt, func) {
					
					if (document.addEventListener)
						obj.addEventListener(evt, func, false);
					else if(document.attachEvent)
						obj.attachEvent('on'+evt,func);
					
					
					},
				remove: function(obj, evt, func) {
						obj.removeEventListener(evt, func, false);
					},
			
				get: function(e, p) {
						e = e || window.event;
						
						if (p)
							D.E.pd(e);
						
						return t = e.target || e.srcElement;
					
					},
				pd: function(e) {
						
						if (e.stopPropagation) {
							 e.stopPropagation();
							 
						} else if(e.cancelBubble) { 
							e.cancelBubble = true;
							
						} else {
						
							if (e.preventDefault) {
								e.preventDefault();
							} else {
								e.returnValue = false; 
								return false; 
							}
						}
						
						
						
					}
			
			},
		Parent: {
				_attr: function(obj, attr, value) {
						if (!obj)
							return false;

						pn = obj.parentNode;
			
						if (!pn || pn.nodeName.toLowerCase() == 'html')
							return false;
							
						if (pn && (pn.getAttribute(attr) == value)) {
								return pn;
							}
			
						return D.Parent._attr(pn, attr, value);

					
					}
			
			},
		children: function(par) {
			__matches = []
			__children = par.childNodes;
			__l = __children.length;
			for (ci=0;ci<__l;ci++) {
				if (__children[ci].nodeType != 3)
					__matches.push(__children[ci])
			}
			return __matches
		
		}
		
	
	}

Array.prototype.each = function(user_func) {
	____l = this.length;
	for(____ind = 0;____ind<____l;____ind++ ) {
		user_func(this[____ind]);
	}
}

	
var log = {
	debug: 0,
	make: function(){
		d = document.createElement('div');
		d.id = 'logger'
		d.style.backgroundColor = '#333';
		d.style.position = 'absolute';
		d.style.right = '0';
		d.style.bottom = '0'
		d.style.height = '200px'
		d.style.width = '150px';
		d.style.overflow = 'auto';
		d.style.color = '#fff';
		d.style.padding = '10px';
		d.style.fontSize = '11px';
		
		document.body.appendChild(d);
		return d
	},
	
	write: function(msg) {
		
		if (!this.debug)
			return;
	
		logger = D._id('logger');
		if (!logger)
			logger = this.make();
		
		p = document.createElement('p');
		p.style.borderBottom = '1px solid #666';
		
		m = document.createTextNode(msg);
		p.appendChild(m)
		logger.appendChild(p);
	}
}	
	
var Util = {
		
		clean: function(parobj) {
			var notWhiteSpaceNode = /\S/;
				
			for (i=0;i<parobj.childNodes.length;i++){
				if ((parobj.childNodes[i].nodeType == 3) && (!notWhiteSpaceNode.test(parobj.childNodes[i].nodeValue))) {
					parobj.removeChild(parobj.childNodes[i]);
						i--;
				}
			}
		}
	
	
	}
	
	
	
Pane = {
	
	Init: function(deflt) {
		panes = this.get();
		
		try {
			this.create(panes, deflt)
		} catch(e) {
			this.create([panes], deflt)
		}
			
	},
	get: function() {
		return D._attr('name', 'panel', 'div');
	},
	reset: function(pane_content) {
		try {
			D.children(pane_content).each(
				function(pn) {
					pn.style.display = 'none'	
				}
			)
		} catch(e) {log.write(e)}
	},
	create: function(panes, deflt) {
			total = panes.length;
			if (!total)
				throw new Exception('TypeError: Got Node Element. Expecting Array')
			
			for (var i=0; i<total; i++) {
				var ul = D._class('tab_panes', 'ul', panes[i]);
				if (!ul) return;				
				
				//var pane_content = D._class('pane_content', 'div', panes[i]);
				
				var pane_content = D._id('pane_content');
				if (!pane_content) return;
				
				Util.clean(pane_content);
				var pane_set = D.children(pane_content)
				
				pane_set.each(function(pn) {
					pname = pn.className;
					
					pid = pname.split('_')[1]
					tab = D._class('tab_'+pid, 'li', ul);
					
					if (tab) {
						a = D._tag('a', tab);
						try {
							D.E.add(a, 'click', Pane.Switch)
						} catch(e) {
							D.E.add(tab, 'click', Pane.Switch)
						}
						log.write(pid + ' ' + deflt)
						if (pid != deflt)
							pn.style.display = 'none'
					
					}
				});
				
				
			}
	
	},
	Switch: function(e) {
			li = D.E.get(e, true);
			
			while (li.className.indexOf('tab') == -1) {
				li = li.parentNode;
			}
			
			
			li_id = li.className.split('_')[1]
			log.write(li_id);
			
			panel = D.Parent._attr(li, 'name', 'panel');
			
			//pane_content = D._class('pane_content', 'div', panel);
			var pane_content = D._id('pane_content');
			Pane.reset(pane_content);
			
			
			target = D._class('pane_'+li_id, 'div', pane_content);
			target.style.display = 'block'
			
		}

	}

Pane.Init(1);
