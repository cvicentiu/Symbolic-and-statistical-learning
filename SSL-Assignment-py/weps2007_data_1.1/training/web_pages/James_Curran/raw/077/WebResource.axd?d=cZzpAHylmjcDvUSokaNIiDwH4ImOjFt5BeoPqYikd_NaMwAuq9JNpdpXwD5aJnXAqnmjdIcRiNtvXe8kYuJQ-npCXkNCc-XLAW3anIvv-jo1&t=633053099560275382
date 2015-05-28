//-----------------------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------
// AtlasCompat.js
// Atlas compat Framework.

function __getNonTextNode(node) {
    try {
        while (node && node.nodeType != 1) {
            node = node.parentNode;
        }
    }
    catch (ex) {
        node = null;
    }
    return node;
}


window.Debug = new function() {
}
window.Debug.write = function(text) {
}
window.Debug.writeln = function(text) {
}
window.Debug.breakIntoDebugger = function(message) {
    throw new Error(message);
}



function _loadMozillaCompatLayer(w) {

    w.Document.prototype.scripts = document.getElementsByTagName('script');

    w.attachEvent = function(eventName, handler) {
        this.addEventListener(eventName, handler, false);
    }
    w.detachEvent = function(eventName, handler) {
        this.removeEventListener(eventName, handler, false);
    }
    
    var attachEventProxy = function(eventName, eventHandler) {
        eventHandler._mozillaEventHandler = function(e) {
            window.event = e;
            eventHandler();
            return e.returnValue;
        };
        this.addEventListener(eventName.slice(2), eventHandler._mozillaEventHandler, false);
    }

    var detachEventProxy = function (eventName, eventHandler) {
        if (eventHandler._mozillaEventHandler) {
            var mozillaEventHandler = eventHandler._mozillaEventHandler;
            delete eventHandler._mozillaEventHandler;
            
            this.removeEventListener(eventName.slice(2), mozillaEventHandler, false);
        }
    }
    
    w.attachEvent = attachEventProxy;
    w.detachEvent = detachEventProxy;
    w.HTMLDocument.prototype.attachEvent = attachEventProxy;
    w.HTMLDocument.prototype.detachEvent = detachEventProxy;
    w.HTMLElement.prototype.attachEvent = attachEventProxy;
    w.HTMLElement.prototype.detachEvent = detachEventProxy;

    w.HTMLElement.prototype.contains = function(element) {
        for (var i = 0; i < this.childNodes.length; i++) {
            var currentElement = this.childNodes[i];
            if (currentElement == element) {
                return true;
            }
            if ((currentElement.nodeType == 1) && currentElement.contains(element)) {
                return true;
            }
        }
        return false;
    }

    w.HTMLElement.prototype.__defineGetter__('children', function () {
            var elementNodes = [];
            var childCount = this.childNodes.length;
            for (var i = 0; i < childCount; i++) {
                                var childNode = this.childNodes[i];
                if (childNode.nodeType == 1) {
                    elementNodes.add(childNode);
                }
            }
            return elementNodes;
        });

    w.HTMLElement.prototype.__defineGetter__('innerText', function() {
            return this.textContent;
        });
    w.HTMLElement.prototype.__defineSetter__('innerText', function(v) {
            if (v) {
                this.innerHTML = formatPlainTextAsHtml(v);
            }
            else {
                this.innerHTML = '';
            }
        });

        function formatPlainTextAsHtml(str) {
        var sb = new Sys.StringBuilder();

        var numChars = str.length;
        var prevCh;

        for (var i=0; i < numChars; i++) {
            var ch = str.charAt(i);
            switch (ch) {
                case "<":
                    sb.append("&lt;");
                    break;
                case ">":
                    sb.append("&gt;");
                    break;
                case "\"":
                    sb.append("&quot;");
                    break;
                case "&":
                    sb.append("&amp;");
                    break;
                case " ":
                    if (prevCh == " ") {
                        sb.append("&nbsp;");
                    }
                    else {
                        sb.append(" ");
                    }
                    break;
                case "\r":
                                        break;
                case "\n":
                                        sb.appendLine();
                    sb.appendLine("<br />");
                    break;
                default:
                    sb.append(ch);
                    break;
            }

            prevCh = ch;
        }

        return sb.toString();
    }

    w.Event.prototype.__defineGetter__('srcElement', function () {
            var n = __getNonTextNode(this.explicitOriginalTarget);
            return n;
        });
    w.Event.prototype.__defineSetter__('cancelBubble', function (v) {
            if (v) {
                this.stopPropagation();
            }
        });
    
    function GetLocation(el) {
        var c = { x : 0, y : 0 };
        while (el) {
            c.x += el.offsetLeft;
            c.y += el.offsetTop;
            el = el.offsetParent;
        }
        return c;
    }
    w.Event.prototype.__defineGetter__('offsetX', function () {
            return window.pageXOffset + this.clientX - GetLocation(this.srcElement).x;
        });
    w.Event.prototype.__defineGetter__('offsetY', function () {
            return window.pageYOffset + this.clientY - GetLocation(this.srcElement).y;
        });
    w.Event.prototype.__defineSetter__('returnValue', function (v) {
            if (!v) {
                this.preventDefault();
            }
            this.cancelDefault = v;
            return v;
        });
    w.Event.prototype.__defineGetter__('returnValue', function() {
            return this.cancelDefault;
        });
    w.Event.prototype.__defineGetter__('fromElement', function () {
            var n;
            if (this.type == 'mouseover') {
                n = this.relatedTarget;
            }
            else if (this.type == 'mouseout') {
                n = this.target;
            }
            return __getNonTextNode(n);
        });
    w.Event.prototype.__defineGetter__("toElement", function () {
            var n;
            if (this.type == 'mouseout') {
                n = this.relatedTarget;
            }
            else if (this.type == 'mouseover') {
                n = this.target;
            }
            return __getNonTextNode(n);
        });
    w.Event.prototype.__defineGetter__('button', function() {
            return (this.which == 1) ? 1 : (this.which == 3) ? 2 : 0
        });

    function selectNodes(doc, path, contextNode) {
        contextNode = contextNode ? contextNode : doc;
        var xpath = new XPathEvaluator();
        var result = xpath.evaluate(path, contextNode,
                                    doc.createNSResolver(doc.documentElement),
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        var nodeList = new Array(result.snapshotLength);
        for(var i = 0; i < result.snapshotLength; i++) {
            nodeList[i] = result.snapshotItem(i);
        }

        return nodeList;
    }

    function selectSingleNode(doc, path, contextNode) {
        path += '[1]';
        var nodes = selectNodes(doc, path, contextNode);
        if (nodes.length != 0) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i]) {
                    return nodes[i];
                }
            }
        }
        return null;
    }

    w.XMLDocument.prototype.selectNodes = function(path, contextNode) {
        return selectNodes(this, path, contextNode);
    }
    
    w.XMLDocument.prototype.selectSingleNode = function(path, contextNode) {
        return selectSingleNode(this, path, contextNode);
    }

    w.XMLDocument.prototype.transformNode = function(xsl) {
        var xslProcessor = new XSLTProcessor();
        xslProcessor.importStylesheet(xsl);

        var ownerDocument = document.implementation.createDocument("", "", null);
        var transformedDoc = xslProcessor.transformToDocument(this);
        
        return transformedDoc.xml;
    }
    
    w.XMLDOMParser = w.DOMParser;
    
    Node.prototype.selectNodes = function(path) {
        var doc = this.ownerDocument;
        return doc.selectNodes(path, this);
    }
    
    Node.prototype.selectSingleNode = function(path) {
        var doc = this.ownerDocument;
        return doc.selectSingleNode(path, this);
    }

    Node.prototype.__defineGetter__('baseName', function() {
        return this.localName;
    });
    
    Node.prototype.__defineGetter__('text', function() {
        return this.textContent;
    });
    Node.prototype.__defineSetter__('text', function(value) {
        this.textContent = value;
    });
    
    Node.prototype.__defineGetter__('xml', function() {
        return (new XMLSerializer()).serializeToString(this);
    });
    
    DocumentFragment.prototype.getElementById = function(id) {
        var nodeQueue = [];
        var childNodes = this.childNodes;
        var node;
        var c;
        
        for (c = 0; c < childNodes.length; c++) {
            node = childNodes[c];
            if (node.nodeType == 1) {
                nodeQueue.queue(node);
            }
        }
        
        while (nodeQueue.length) {
            node = nodeQueue.dequeue();
            if (node.id == id) {
                return node;
            }
            childNodes = node.childNodes;
            if (childNodes.length != 0) {
                for (c = 0; c < childNodes.length; c++) {
                    node = childNodes[c];
                    if (node.nodeType == 1) {
                        nodeQueue.queue(node);
                    }
                }
            }
        }
        
        return null;
    }
    
    DocumentFragment.prototype.createElement = function(tagName) {
        return document.createElement(tagName);
    }
}

function _loadSafariCompatLayer(w) {
    window["HTMLHtmlElement"] = document.createElement("html").constructor;
    window.__safari = true;

    function HTMLElement() {
            }

    HTMLElement.prototype = HTMLHtmlElement.__proto__.__proto__;
    var HTMLDocument = document.constructor;
    var Text = document.createTextNode("").constructor;
    Node = Text;

    w.attachEvent = function(eventName, handler) {
        this.addEventListener(eventName, handler, false);
    }
    w.detachEvent = function(eventName, handler) {
        this.removeEventListener(eventName, handler, false);
    }
    
    var attachEventProxy = function(eventName, eventHandler) {
        eventHandler.__safariEventHandler = function(e) {
                                                if (!this.__eventTimeStamp) {
                this.__eventTimeStamp = e.timeStamp;
            }
            else {
                if ((e.timeStamp - this.__eventTimeStamp) < 20) {
                    return null;
                }
                this.__eventTimeStamp = e.timeStamp;
            }
            
            var compatEvent = {};
            for (var a in e) {
                compatEvent[a] = e[a];
            }
            compatEvent.srcElement = __getNonTextNode(compatEvent.srcElement);
            window.event = compatEvent;
            eventHandler();
            e.returnValue = compatEvent.returnValue;
            return e.returnValue;
        };
        this.addEventListener(eventName.slice(2), eventHandler.__safariEventHandler, false);
    }

    var detachEventProxy = function (eventName, eventHandler) {
        if (eventHandler.__safariEventHandler) {
            var safariEventHandler = eventHandler.__safariEventHandler;
            delete eventHandler.__safariEventHandler;
            
            this.removeEventListener(eventName.slice(2), safariEventHandler, false);
        }
    }
    
    w.attachEvent = attachEventProxy;
    w.detachEvent = detachEventProxy;
    HTMLDocument.prototype.attachEvent = attachEventProxy;
    HTMLDocument.prototype.detachEvent = detachEventProxy;
    HTMLElement.prototype.attachEvent = attachEventProxy;
    HTMLElement.prototype.detachEvent = detachEventProxy;
    
    Node.prototype.getElementById = function(id) {
        var nodeQueue = [];
        var childNodes = this.childNodes;
        var node;
        var c;
        
        for (c = 0; c < childNodes.length; c++) {
            node = childNodes[c];
            if (node.nodeType == 1) {
                nodeQueue.queue(node);
            }
        }
        
        while (nodeQueue.length) {
            node = nodeQueue.dequeue();
            if (node.id == id) {
                return node;
            }
            childNodes = node.childNodes;
            if (childNodes.length != 0) {
                for (c = 0; c < childNodes.length; c++) {
                    node = childNodes[c];
                    if (node.nodeType == 1) {
                        nodeQueue.queue(node);
                    }
                }
            }
        }
        
        return null;
    }
    
    window.XMLDOMParser = function XMLDOMParser() {}

    window.XMLDOMParser.prototype.parseFromString = function(input, contentType, node) {
        var placeHolder = document.createElement("span");
        input = this._prepareString(input);
        placeHolder.innerHTML = input;
        
                var dom;
        for (var i = placeHolder.childNodes.length - 1; i >= 0; i--) {
            if (placeHolder.childNodes[i].nodeType != 1) {
                placeHolder.removeChild(placeHolder.childNodes[i]);
            }
        }
        
                this._parseChildNodes(placeHolder.childNodes);
        
        return placeHolder;
    }

    window.XMLDOMParser.prototype._prepareString = function(input) {
                input = input.replace(/<(\w+(:\w+)?)([^>]*?)\/>/g, "<$1$3></$1>");
        input = input.replace(/<image(.*?)>/g, "<image_$1>");
        input = input.replace(/<\/image>/g, "</image_>");
        return input;
    }

    window.XMLDOMParser.prototype._parseChildNodes = function(childNodes) {
        var tagName;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType == 1) {
                tagName = childNodes[i].tagName;
                var col = tagName.indexOf(':');
                if (col != -1) {
                                        childNodes[i].tagPrefix = tagName.substr(0, col).toLowerCase();
                    tagName = tagName.substr(col + 1);
                }
                childNodes[i].baseName = tagName.toLowerCase();
                this._parseChildNodes(childNodes[i].childNodes);
            }
        }
    }
}

if (navigator.userAgent.indexOf('MSIE') != -1) {
    }
else if ((typeof(DOMParser) == "undefined") || (navigator.userAgent.toLowerCase().indexOf("safari") != -1)) {
    _loadSafariCompatLayer(window);
}
else {
    _loadMozillaCompatLayer(window);
}
