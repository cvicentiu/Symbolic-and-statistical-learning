var Resizables = {
  resizables: [],
  observers: [],
  
  register: function(resizable) {
    if(this.resizables.length == 0) {
      this.eventMouseUp   = this.endResize.bindAsEventListener(this);
      this.eventMouseMove = this.updateResize.bindAsEventListener(this);
      this.eventKeypress  = this.keyPress.bindAsEventListener(this);
      
      Event.observe(document, "mouseup", this.eventMouseUp);
      Event.observe(document, "mousemove", this.eventMouseMove);
      Event.observe(document, "keypress", this.eventKeypress);
    }
    this.resizables.push(resizable);
  },
  
  unregister: function(resizable) {
    this.resizables = this.resizables.reject(function(d) { return d==resizable });
    if(this.resizable.length == 0) {
      Event.stopObserving(document, "mouseup", this.eventMouseUp);
      Event.stopObserving(document, "mousemove", this.eventMouseMove);
      Event.stopObserving(document, "keypress", this.eventKeypress);
    }
  },
  
  activate: function(resizable) {
    window.focus(); // allows keypress events if window isn t currently focused, fails for Safari
    this.activeResizable = resizable;
  },
  
  deactivate: function() {
    this.activeResizable = null;
  },
  
  updateResize: function(event) {
    if(!this.activeResizable) return;
    var pointer = [Event.pointerX(event), Event.pointerY(event)];
    // Mozilla-based browsers fire successive mousemove events with
    // the same coordinates, prevent needless redrawing (moz bug?)
    if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) return;
    this._lastPointer = pointer;
    this.activeResizable.updateResize(event, pointer);
  },
  
  endResize: function(event) {
    if(!this.activeResizable) return;
    this._lastPointer = null;
    this.activeResizable.endResize(event);
    this.activeResizable = null;
  },
  
  keyPress: function(event) {
    if(this.activeResizable)
      this.activeResizable.keyPress(event);
  },
  
  addObserver: function(observer) {
    this.observers.push(observer);
    this._cacheObserverCallbacks();
  },
  
  removeObserver: function(element) {  // element instead of observer fixes mem leaks
    this.observers = this.observers.reject( function(o) { return o.element==element });
    this._cacheObserverCallbacks();
  },
  
  notify: function(eventName, resizable, event) {  // 'onStart', 'onEnd', 'onResize'
    if(this[eventName+'Count'] > 0)
      this.observers.each( function(o) {
        if(o[eventName]) o[eventName](eventName, resizable, event);
      });
  },
  
  _cacheObserverCallbacks: function() {
    ['onStart','onEnd','onResize'].each( function(eventName) {
      Resizables[eventName+'Count'] = Resizables.observers.select(
        function(o) { return o[eventName]; }
      ).length;
    });
  }
}

/*--------------------------------------------------------------------------*/

var Resizable = Class.create();
Resizable.prototype = {
  initialize: function(element) {
    var options = Object.extend({
      handle: false,
      starteffect: function(element) { 
        element._opacity = Element.getOpacity(element);
        new Effect.Opacity(element, {duration:0.2, from:element._opacity, to:0.7}); 
      },
      reverteffect: function (element, fromW, toW, fromH, toH, fromL, toL, fromT, toT) {
        var style = element.style;
        style.width = toW+"px"; style.height = toH+"px";
        style.left = toL+"px"; style.top = toT+"px";
      },
      endeffect: function(element) { 
        var toOpacity = typeof element._opacity == 'number' ? element._opacity : 1.0;
        new Effect.Opacity(element, {duration:0.2, from:0.7, to:toOpacity}); 
      },
      resizeeffect: function (element, width, height, left, top) {
        var style = element.style;
        style.width = width; style.height = height;
        style.left = left; style.top = top;
       },
      zindex: 1000,
      revert: false,
      scroll: false,
      scrollSensitivity: 20,
      scrollSpeed: 15,
      snap: false,   // false, or xy or [x,y] or function(x,y){ return [x,y] }
      minSize: [0, 0],
      maxSize: false,
      edgeWidth: 20,
      constraint: false // ex. 'nswe'
    }, arguments[1] || {});

    this.element = $(element);
    this.originalCursor = this.element.style.cursor;
    
    if(options.handle && (typeof options.handle == 'string')) {
      var h = Element.childrenWithClassName(this.element, options.handle, true);
        if(h.length>0) this.handle = h[0];
    }  
    if(!this.handle) this.handle = $(options.handle);
    if(!this.handle) this.handle = this.element;
    
    if(options.scroll && !options.scroll.scrollTo && !options.scroll.outerHTML)
      options.scroll = $(options.scroll);

    Element.makePositioned(this.element); // fix IE    

    this.options  = options;
    this.resizing = false;   

    this.eventMouseDown = this.initResize.bindAsEventListener(this);
    Event.observe(this.handle, "mousedown", this.eventMouseDown);

    this.eventMouseMove = this.setCursor.bindAsEventListener(this);
    Event.observe(this.handle, "mousemove", this.eventMouseMove);
    this.eventMouseOut = this.unsetCursor.bindAsEventListener(this);
    Event.observe(this.handle, "mouseout", this.eventMouseOut);
    
    Resizables.register(this);
  },

  destroy: function() {
    Event.stopObserving(this.handle, "mousedown", this.eventMouseDown);
    Event.stopObserving(this.handle, "mousemove", this.eventMouseMove);
    Resizables.unregister(this);
  },
  
  getCurrentLT: function() {
    return([
      parseInt(Element.getStyle(this.element,'left') || '0'),
      parseInt(Element.getStyle(this.element,'top') || '0')]);
  },

  getCurrentWH: function() {
    return([
      parseInt(Element.getStyle(this.element,'width') || this.element.offsetWidth || '0'),
      parseInt(Element.getStyle(this.element,'height') || this.element.offsetHeight) || '0']);
  },

  setCursor: function(event) {
    var style = this.element.style;
    var point = [Event.pointerX(event), Event.pointerY(event)];
    var dir = this.findDirection(point);

    // If not on window edge, restore cursor and exit.
    if (dir == '') { this.unsetCursor(event); }
    else { this.element.style.cursor = dir + "-resize"; }
  },

  unsetCursor: function(event) {
    this.element.style.cursor = this.originalCursor;
  },

  findDirection: function(point) {
    Position.prepare();
    if (Position.withinIncludingScrolloffsets(this.element, point[0], point[1])) {
      var overlap = [
        Position.overlap("horizontal", this.element), 
        Position.overlap("vertical", this.element)
      ];
      var currentWH = this.getCurrentWH();
      overlap = [0,1].map(function(i) { return (overlap[i] * currentWH[i]) });

      var dir = '';
      if ( ((!this.options.constraint) || (this.options.constraint.indexOf('n') >= 0))
        && currentWH[1] - this.options.edgeWidth <= overlap[1]) {
          dir += "n";
      } else if ( ((!this.options.constraint) || (this.options.constraint.indexOf('s') >= 0))
        && overlap[1] <= this.options.edgeWidth) {
          dir += "s";
      }
      if ( ((!this.options.constraint) || (this.options.constraint.indexOf('w') >= 0))
        && currentWH[0] - this.options.edgeWidth <= overlap[0]) {
          dir += "w";
      } else if ( ((!this.options.constraint) || (this.options.constraint.indexOf('e') >= 0))
        && overlap[0] <= this.options.edgeWidth) {
          dir += "e";
      }
      return dir;
    }
    else {
      return '';
    }
  },

  initResize: function(event) {
    if(Event.isLeftClick(event)) {    
      // abort on form elements, fixes a Firefox issue
      var src = Event.element(event);
      if(src.tagName && (
        src.tagName=='INPUT' ||
        src.tagName=='SELECT' ||
        src.tagName=='OPTION' ||
        src.tagName=='BUTTON' ||
        src.tagName=='TEXTAREA')) return;
 
      var point = [Event.pointerX(event), Event.pointerY(event)];
      
      // save original position & size, excluding trailing 'px'. 
      // style.left and style.top may not be equal to actual x-y location on the screen.
      this.originalLT = this.getCurrentLT();  
      this.originalWH = this.getCurrentWH();

      this.currentDirection = this.findDirection(point);
      if (! this.currentDirection) return;
        
      if(this.element._revert) {
        this.element._revert.cancel();
        this.element._revert = null;
      }
      
      this.startPoint = point;
      this.startLT = this.getCurrentLT();
      this.startWH = this.getCurrentWH();
      Resizables.activate(this);
      Event.stop(event);
    }
  },
  
  startResize: function(event) {
    this.resizing = true;

    if(Element.getStyle(this.element,'position')=='') style.position = "relative";

    if(this.options.zindex) {
      this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
      this.element.style.zIndex = this.options.zindex;
    }
    
    if(this.options.scroll) {
      if (this.options.scroll == window) {
        var where = this._getWindowScroll(this.options.scroll);
        this.originalScrollLeft = where.left;
        this.originalScrollTop = where.top;
      } else {
        this.originalScrollLeft = this.options.scroll.scrollLeft;
        this.originalScrollTop = this.options.scroll.scrollTop;
      }
    }
    Resizables.notify('onStart', this, event);
    if(this.options.starteffect) this.options.starteffect(this.element);
  },
  
  updateResize: function(event, pointer) {
    if(!this.resizing) this.startResize(event);
    Position.prepare();
    Resizables.notify('onResize', this, event);
    this.draw(pointer);
    
    if(this.options.scroll) {
      this.stopScrolling();
      
      var p;
      if (this.options.scroll == window) {
        with(this._getWindowScroll(this.options.scroll)) { p = [ left, top, left+width, top+height ]; }
      } else {
        p = Position.page(this.options.scroll);
        p[0] += this.options.scroll.scrollLeft;
        p[1] += this.options.scroll.scrollTop;
        p.push(p[0]+this.options.scroll.offsetWidth);
        p.push(p[1]+this.options.scroll.offsetHeight);
      }
      var speed = [0,0];
      if(pointer[0] < (p[0]+this.options.scrollSensitivity)) speed[0] = pointer[0]-(p[0]+this.options.scrollSensitivity);
      if(pointer[1] < (p[1]+this.options.scrollSensitivity)) speed[1] = pointer[1]-(p[1]+this.options.scrollSensitivity);
      if(pointer[0] > (p[2]-this.options.scrollSensitivity)) speed[0] = pointer[0]-(p[2]-this.options.scrollSensitivity);
      if(pointer[1] > (p[3]-this.options.scrollSensitivity)) speed[1] = pointer[1]-(p[3]-this.options.scrollSensitivity);
      this.startScrolling(speed);
    }
    
    // fix AppleWebKit rendering
    if(navigator.appVersion.indexOf('AppleWebKit')>0) window.scrollBy(0,0);
    
    if(this.options.change) this.options.change(this);
    
    Event.stop(event);
  },
  
  finishResize: function(event, success) {
    this.resizing = false;

    Resizables.notify('onEnd', this, event);

    var revert = this.options.revert;
    if(revert && typeof revert == 'function') revert = revert(this.element);
    
    var currentWH = this.getCurrentWH();
    var currentLT = this.getCurrentLT();
    if(revert && this.options.reverteffect) {
      this.options.reverteffect(this.element, 
        currentWH[0], this.originalWH[0], currentWH[1], this.originalWH[1],
        currentLT[0], this.originalLT[0], currentLT[1], this.originalLT[1]);
    } else {
      this.originalWH = currentWH;
      this.originalLT = currentLT;
    }

    if(this.options.zindex)
      this.element.style.zIndex = this.originalZ;

    if(this.options.endeffect) 
      this.options.endeffect(this.element);

    Resizables.deactivate(this);
  },
  
  keyPress: function(event) {
    if(event.keyCode!=Event.KEY_ESC) return;
    this.finishResize(event, false);
    Event.stop(event);
  },
  
  endResize: function(event) {
    if(!this.resizing) return;
    this.stopScrolling();
    this.finishResize(event, true);
    this.currentResizeDir = '';
    Event.stop(event);
  },
  
  draw: function(point) {
    // calculate resize amount
    var d = [0,1].map(function(i){ return (point[i] - this.startPoint[i]) }.bind(this));

    if (this.options.scroll && (this.options.scroll != window)) {
        d[0] += this.options.scroll.scrollLeft-this.originalScrollLeft;
        d[1] += this.options.scroll.scrollTop-this.originalScrollTop;
    }

    // calculate new left-top & right-bottom coordinates
    var curLTRB = [
      this.startLT[0], 
      this.startLT[1], 
      this.startLT[0] + this.startWH[0],
      this.startLT[1] + this.startWH[1] 
    ];
    var newLTRB = [0,1,2,3].map( function(i) {
      return (curLTRB[i] + ((this.currentDirection.indexOf(['w','n','e','s'][i]) >= 0) 
        ? d[i%2] : 0))
    }.bind(this) );

    // snap
    if(this.options.snap) {
      if(typeof this.options.snap == 'function') {
        newLTRB = this.options.snap(newLTRB, this);
      } else {
        if(this.options.snap instanceof Array) {
          newLTRB = newLTRB.map( function(v, i) {
            return ((this.currentDirection.indexOf(['w','n','e','s'][i]) >= 0)
                     ? Math.round(v/this.options.snap[i%2])*this.options.snap[i%2]
                     : v)
          }.bind(this))
        } else {
          newLTRB = newLTRB.map( function(v, i) {
            return ((this.currentDirection.indexOf(['w','n','e','s'][i]) >= 0)
                     ? Math.round(v/this.options.snap)*this.options.snap
                     : v) 
          }.bind(this))
        }
      }
    }

    // max/min size
    [0,1].each( function(i) {
       var s = newLTRB[i+2] - newLTRB[i];
       if (this.options.maxSize && (s > this.options.maxSize[i])) {
         if (this.currentDirection.indexOf(['w','n'][i]) >= 0) {
           newLTRB[i] += s - this.options.maxSize[i];
         } else {
           newLTRB[i+2] -= s - this.options.maxSize[i];
         }
       }
       if (this.options.minSize && (s < this.options.minSize[i])) {
         if (this.currentDirection.indexOf(['w','n'][i]) >= 0) {
           newLTRB[i] += s - this.options.minSize[i];
         } else {
           newLTRB[i+2] -= s - this.options.minSize[i];
         }
       }
    }.bind(this) );

    // constraint
    newLTRB = [0,1,2,3].map( function(i) {
      return ((this.currentDirection.indexOf(['w','n','e','s'][i]) >= 0) ? newLTRB[i] : curLTRB[i])
    }.bind(this) );

    // resize
    var newWidth = newLTRB[2] - newLTRB[0];
    var newHeight = newLTRB[3] - newLTRB[1];
    this.options.resizeeffect(this.element, newWidth+"px", newHeight+"px", newLTRB[0]+"px", newLTRB[1]+"px");

    if(this.element.style.visibility=="hidden") this.element.style.visibility = ""; // fix gecko rendering
  },
  
  stopScrolling: function() {
    if(this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
      Resizables._lastScrollPointer = null;
    }
  },
  
  startScrolling: function(speed) {
    this.scrollSpeed = [speed[0]*this.options.scrollSpeed,speed[1]*this.options.scrollSpeed];
    this.lastScrolled = new Date();
    this.scrollInterval = setInterval(this.scroll.bind(this), 10);
  },
  
  scroll: function() {
    var current = new Date();
    var delta = current - this.lastScrolled;
    this.lastScrolled = current;
    if(this.options.scroll == window) {
      with (this._getWindowScroll(this.options.scroll)) {
        if (this.scrollSpeed[0] || this.scrollSpeed[1]) {
          var d = delta / 1000;
          this.options.scroll.scrollTo( left + d*this.scrollSpeed[0], top + d*this.scrollSpeed[1] );
        }
      }
    } else {
      this.options.scroll.scrollLeft += this.scrollSpeed[0] * delta / 1000;
      this.options.scroll.scrollTop  += this.scrollSpeed[1] * delta / 1000;
    }
    
    Position.prepare();
    Resizables.notify('onResize', this);

    //// following bits of code was added to the corresponding part of dragdrop.js in ver1.6.1,
    //// but seems to work better without it. (esp. when scrolling to negative co-ordinates)
 
    //Resizables._lastScrollPointer = Resizables._lastScrollPointer || $A(Resizables._lastPointer);
    //Resizables._lastScrollPointer[0] += this.scrollSpeed[0] * delta / 1000;
    //Resizables._lastScrollPointer[1] += this.scrollSpeed[1] * delta / 1000;
    //    if (Resizables._lastScrollPointer[0] < 0)
    //      Resizables._lastScrollPointer[0] = 0;
    //    if (Resizables._lastScrollPointer[1] < 0)
    //      Resizables._lastScrollPointer[1] = 0;
    //this.draw(Resizables._lastScrollPointer);
    this.draw(Resizables._lastPointer);

    if(this.options.change) this.options.change(this);
  },
  
  _getWindowScroll: function(w) {
    var T, L, W, H;
    with (w.document) {
      if (w.document.documentElement && documentElement.scrollTop) {
        T = documentElement.scrollTop;
        L = documentElement.scrollLeft;
      } else if (w.document.body) {
        T = body.scrollTop;
        L = body.scrollLeft;
      }
      if (w.innerWidth) {
        W = w.innerWidth;
        H = w.innerHeight;
      } else if (w.document.documentElement && documentElement.clientWidth) {
        W = documentElement.clientWidth;
        H = documentElement.clientHeight;
      } else {
        W = body.offsetWidth;
        H = body.offsetHeight
      }
    }
    return { top: T, left: L, width: W, height: H };
  }
}