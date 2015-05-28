//-----------------------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------
// Atlas.js
// Atlas Framework.



//-----------------------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------
// AtlasRuntime.js
// Atlas Runtime Framework.


var RuntimeVersion = "2.021006.A";



Function.abstractMethod = function() {
    throw 'Abstract method should be implemented';
}

Function.createCallback = function(method, context) {
    return function() {
        return method(context);
    }
}

Function.createDelegate = function(instance, method) {
    return function() {
        return method.apply(instance, arguments);
    }
}

Function.emptyFunction = Function.emptyMethod = function() {
}

Function.prototype.getBaseMethod = function(instance, methodName, baseTypeName) {
    var baseType = baseTypeName ? Function.parse(baseTypeName) : this.getBaseType();
    var baseMethod = null;

    if (baseType) {
        var directBaseType = baseType;
        
        if (instance._baseMethods) {
                        
            while (baseType) {
                var methodKey = baseType.getName() + '.' + methodName;
                var method = instance._baseMethods[methodKey];
                if (method) {
                    return method;
                }

                baseType = baseType._baseType;
            }
        }

        if (!baseMethod) {
            return directBaseType.prototype[methodName];
        }
    }
    
    return null;
}

Function.prototype.getBaseType = function() {
    return this._baseType;
}

Function.prototype.getName = function() {
    return this._typeName;
}

Function.parse = function(functionName) {
    if (!Function._htClasses) {
        Function._htClasses = {};
    }
    var fn = Function._htClasses[functionName];
    if (!fn) {
        try {
            eval('fn = ' + functionName);
            if (typeof(fn) != 'function') {
                fn = null;
            }
            else {
                Function._htClasses[functionName] = fn;
            }
        }
        catch (ex) {
        }
    }
    return fn;
}

Function.prototype._copyProps = function(p_objFnc) {
    for (var strName in p_objFnc.prototype) {
        var vValue = p_objFnc.prototype[strName];
        if (!this.prototype[strName]) {
            this.prototype[strName] = vValue;
        }
    }
}

Function.prototype._setBases = function(p_objRoot) {
    if (p_objRoot._basePrototypePending) {
                var astrPending = this.prototype._astrPendingInherits || [];    
        for (var i=0; i < astrPending.length; i++) {

            var fncType = astrPending[i] instanceof Function ? astrPending[i] : Function.parse(astrPending[i]);

                        if (!fncType._parentBase) {
                fncType._parentBase= [];
            }
            fncType._parentBase.push(p_objRoot._typeName);
            if (!p_objRoot._childBase) {
                p_objRoot._childBase= [];
            }
            p_objRoot._childBase.push(fncType._typeName);

                        
            if (fncType && (this != fncType) && (!this.inheritsFrom(fncType)) && (!fncType.inheritsFrom(this)) && !fncType._sealed) {
                if (!fncType._typeName) {
                    fncType._typeName = typeof(astrPending[i])=="function" ? astrPending[i]._typeName : astrPending[i];
                }
                if (!this.bases) {
                    this.bases = [];
                }
                this.bases.push(fncType);
                fncType._setBases(p_objRoot);
                this._copyProps(fncType);
            }
        }
    }
    this._basePrototypePending = false;
}

Function.prototype._callBaseConstructors = function(p_objInstance, p_objArgs) {
    if (this.bases) {
        for (var i=0; i < this.bases.length; i++) {                    
            if (p_objArgs) {
                this.bases[i].apply(p_objInstance, p_objArgs);
            }
            else {
                this.bases[i].apply(p_objInstance);
            }
        }
    }
}

Function.prototype.callBaseMethod = function(instance, methodName, baseArguments) {
    var baseMethod = this.getBaseMethod(instance, methodName);
    if (baseMethod) {
        if (!baseArguments) {
            return baseMethod.apply(instance);
        }
        else {
            return baseMethod.apply(instance, baseArguments);
        }
    }
    
    return null;
}

Function.prototype.implementsInterface = function(interfaceType) {
    this._setBases(this);
    var interfaces = this._interfaces;
    if (interfaces) {
        if (interfaces.contains(interfaceType)) {
            return true;
        }
    }
    if (this.bases)
    {
        for (var i=0; i < this.bases.length; i++)
        {
            if (this.bases[i].implementsInterface(interfaceType))
            {
                return true;
            }
        }
    }
    
    return false;
}

Function.prototype.inheritsFrom = function(parentType) {
    if (parentType == this) {
        return true;
    }
    if (!this._basesPending) {
        this._basesPending = true;
        this._setBases(this);
        delete this._basesPending;
    }
    if (this.bases) {
        for (var i = 0; i < this.bases.length; i++) {
            if (this.bases[i].inheritsFrom(parentType)) {
                return true;
            }
        }
    }
    
    return false;
}

Function.prototype.initializeBase = function(instance, baseArguments) {
                    
    if (this._interfaces) {
        for (var i = 0; i < this._interfaces.length; i++) {
            this._interfaces[i].call(instance);
        }
    }

    if (!this._parentBase)        {
        this._parentBase = [];
        this._parentBase.push(this._typeName);
        this._childBase = [];
        this._childBase.push(this._typeName);
    } 
    
    this._setBases(this);
    this._callBaseConstructors(instance, baseArguments);
    
    return instance;
}

Function.prototype.isImplementedBy = function(instance) {
    if (!instance) return false;
    var instanceType = Object.getType(instance);
    if (!instanceType.implementsInterface) {
        return false;
    }
    return instanceType.implementsInterface(this);
}

Function.prototype.isInstanceOfType = function(instance) {
    if (typeof(instance) == 'undefined' || instance == null) {
        return false;
    }

    if (instance instanceof this) {
        return true;
    }
    
    var instanceType = Object.getType(instance);
    if (instanceType == this) {
        return true;
    }
    if (!instanceType.inheritsFrom) {
        return false;
    }
    return instanceType.inheritsFrom(this);
}

Function.prototype.registerBaseMethod = function(instance, methodName) {
            
    if (!instance._baseMethods) {
        instance._baseMethods = { };
    }
    var methodKey = this.getName() + '.' + methodName;
    instance._baseMethods[methodKey] = instance[methodName];
}

Function.createInstance = function(type) {
    if (typeof(type) != 'function') {
        type = Function.parse(type);
    }
    
    return new type();
}

Function.prototype.registerClass = function(typeName, baseType, interfaceType) {
        
    if (window.__safari) {
        this.prototype.constructor = this;
    }
    this._typeName = typeName;
    if (baseType) {
        this._baseType = baseType;
        if (!(baseType instanceof Array)) {
            baseType = [baseType];
        }
        if (!this.prototype._astrPendingInherits) {
            this.prototype._astrPendingInherits = [];
        }
        for (var i=0; i < baseType.length; i++) {
            this.prototype._astrPendingInherits.push(baseType[i]);
        }
        this._basePrototypePending = true;
    }
    
    if (interfaceType) {
        this._interfaces = [];
        for (var i = 2; i < arguments.length; i++) {
            interfaceType = arguments[i];
            this._interfaces.push(interfaceType);
        }
    }

    return this;
}

Function.prototype.registerAbstractClass = function(typeName, baseType) {
    this.registerClass.apply(this, arguments);
    this._abstract = true;
    
    return this;
}

Function.prototype.registerSealedClass = function(typeName, baseType) {
    this.registerClass.apply(this, arguments);
    this._sealed = true;
    
    return this;
}

Function.prototype.registerInterface = function(typeName) {
    this._typeName = typeName;
    this._interface = true;
    this._abstract = true;
    this._sealed = true;
    
    return this;
}

var registerNamespace = Function.registerNamespace = function(namespacePath) {
    var rootObject = window;
    var namespaceParts = namespacePath.split('.');
    
    for (var i = 0; i < namespaceParts.length; i++) {
        var currentPart = namespaceParts[i];
        if (!rootObject[currentPart]) {
            rootObject[currentPart] = new Object();
        }
        rootObject = rootObject[currentPart];
    }
}

Function._typeName = 'Function';

window.Type = Function;



Object.getType = function(instance) {
    var ctor = instance.constructor;
    if (!ctor || (typeof(ctor) != "function") || !ctor._typeName) {
        return Object;
    }
    return instance.constructor;
}

Object.getTypeName = function(instance) {
    return Object.getType(instance).getName();
}

Object._typeName = 'Object';

Boolean.parse = function(value) {
    if (typeof(value) == 'string') {
        return (value.trim().toLowerCase() == 'true');
    }
    return value ? true : false;
}

Boolean._typeName = 'Boolean';

Number.parse = function(value) {
    if (!value || (value.length == 0)) {
        return 0;
    }
    return parseFloat(value);
}

Number._typeName = 'Number';

String.prototype.endsWith = function(suffix) {
    return (this.substr(this.length - suffix.length) == suffix);
}
String.prototype.startsWith = function(prefix) {
    return (this.substr(0, prefix.length) == prefix);
}
String.prototype.lTrim = String.prototype.trimLeft = function() {
    return this.replace(/^\s*/, "");
}
String.prototype.rTrim = String.prototype.trimRight = function() {
    return this.replace(/\s*$/, "");
}
String.prototype.trim = function() {
    return this.trimRight().trimLeft();
}

String.format = function(format) {
    var result = "";
    
    for (var i=0;;) {
                var next = format.indexOf("{", i);
        if (next < 0) {
                        result += format.slice(i);
            break;
        }
        
                result += format.slice(i, next);
        i = next+1;
        
                if (format.charAt(i) == '{') {
            result += '{';
            i++;
            continue;
        }
        
                var next = format.indexOf("}", i);
        
                var brace = format.slice(i, next).split(':');
        
        var argNumber = Number.parse(brace[0])+1;
        var arg = arguments[argNumber];
        if (arg == null) {
            arg = '';
        }

                if (arg.toFormattedString)
            result += arg.toFormattedString(brace[1] ? brace[1] : '');
        else
            result += arg.toString();
        
        i = next+1;
    }
    
    return result;
}

String.localeFormat = function(format) {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];
        if (arg == null) {
            arg = '';
        }
        format = format.replace("{" + (i - 1) + "}", arg.toLocaleString());
    }
    return format;
}

String._typeName = 'String';

Array.prototype.add = Array.prototype.queue = function(item) {
    this.push(item);
}
Array.prototype.addRange = function(items) {
    var length = items.length;
    
    if (length != 0) {
        for (var index = 0; index < length; index++) {
            this.push(items[index]);
        }
    }
}
Array.prototype.clear = function() {
    if (this.length > 0) {
        this.splice(0, this.length);
    }
}
Array.prototype.clone = function() {
    var clonedArray = [];
    
    var length = this.length;
    for (var index = 0; index < length; index++) {
        clonedArray[index] = this[index];
    }
    return clonedArray;
}
Array.prototype.contains = Array.prototype.exists = function(item) {
    var index = this.indexOf(item);
    return (index >= 0);
}
Array.prototype.dequeue = function() {
    return this.shift();
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(item, startIndex) {
        var length = this.length;
        if (length != 0) {
                        startIndex = startIndex || 0;
                        if (startIndex < 0) {
                startIndex = Math.max(0, length + startIndex);
            }
            for (var i = startIndex; i < length; i++) {
                if (this[i] == item) {
                    return i;
                }
            }
        }
        return -1;
    }
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fnCb, context) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            fnCb.call(context, this[i], i, this);
        }
    }
}
Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
}
Array.prototype.remove = function(item) {
    var index = this.indexOf(item);
    if (index >= 0) {
        this.splice(index, 1);
    }
    return (index >= 0);
}
Array.prototype.removeAt = function(index) {
    this.splice(index, 1);
}

Array._typeName = 'Array';

Array.parse = function(value) {
    return eval('(' + value + ')');
}

RegExp.parse = function(value) {
    if (value.startsWith('/')) {
        var endSlashIndex = value.lastIndexOf('/');
        if (endSlashIndex > 1) {
            var expression = value.substring(1, endSlashIndex);
            var flags = value.substr(endSlashIndex + 1);
            return new RegExp(expression, flags);
        }
    }

    return null;    
}

RegExp._typeName = 'RegExp';

Date._typeName = 'Date';

Error.createError = function(message, details, innerError) {
    var e = new Error(message);

    if (details && details.length) {
        e.details = details;
    }
    if (innerError) {
        e.innerError = innerError;
    }

    return e;
}

Error._typeName = 'Error';



Type.registerNamespace('Sys');


Type.createEnum = function(name) {

    function getValues() {
        if (!enumeration._values) {
            var values = { };
            
            for (var f in enumeration) {
                if (typeof(enumeration[f]) != 'function') {
                    values[f] = enumeration[f];
                }
            }
            enumeration._values = values;
        }
        return enumeration._values;
    }

    function valueFromString(s) {
        if (s) {
            for (var f in enumeration) {
                if (f.toLowerCase() === s.toLowerCase()) {
                    return enumeration[f];
                }
            }
        }
        return null;
    }

    function valueToString(value) {
        for (var i in enumeration) {
            if (enumeration[i] === value) {
                return i;
            }
        }
        throw Error.createError('Invalid Enumeration Value');
    }
    
    var enumeration = {};
        if (name) {
        eval('enumeration=' + name + '={};');
    }
    enumeration.getValues = getValues;
    enumeration.parse = valueFromString;
    enumeration.toString = valueToString;
    enumeration.getName = function() {return name;}
    enumeration.isEnum = function() {return true;}
    
    for (var i = 1; i < arguments.length; i += 2) {
        enumeration[arguments[i]] = arguments[i + 1];
    }
    
    return enumeration;
}

Type.createFlags = function(name) {

    function valueFromString(s) {
        var parts = s.split('|');
        var value = 0;
        
        for (var i = parts.length - 1; i >= 0; i--) {
            var part = parts[i].trim();
            var found = false;
            
            for (var f in flags) {
                if (f == part) {
                    value |= flags[f];
                    found = true;
                    break;
                }
            }
            if (found == false) {
                throw 'Invalid Enumeration Value';
            }
        }
        
        return value;
    }

    function valueToString(value) {
        var sb = new Sys.StringBuilder();
        for (var i in flags) {
            if ((flags[i] & value) != 0) {
                if (sb.isEmpty() == false) {
                    sb.append(' | ');
                }
                sb.append(i);
            }
        }
        return sb.toString();
    }

    var flags = {};
    if (name) {
        eval('flags=' + name + '={};');
    }
    flags.parse = valueFromString;
    flags.toString = valueToString;
    flags.getName = function() {return name;}
    flags.isFlags = function() {return true;}
    
    for (var i = 1; i < arguments.length; i += 2) {
        flags[arguments[i]] = arguments[i + 1];
    }
    
    return flags;
}

Sys.IArray = function() {
    this.get_length = Function.abstractMethod;
    this.getItem = Function.abstractMethod;
}
Sys.IArray.registerInterface("Sys.IArray");

Array.prototype.get_length = function() {
    return this.length;
}

Array.prototype.getItem = function(index) {
    return this[index];
}

Array._interfaces = [];
Array._interfaces.push(Sys.IArray);


Sys.IDisposable = function() {
    this.dispose = Function.abstractMethod;
}
Sys.IDisposable.registerInterface('Sys.IDisposable');

Sys.CultureInfo = {"Name":"en-US","NumberFormat":{"CurrencyDecimalDigits":2,"CurrencyDecimalSeparator":".","IsReadOnly":false,"CurrencyGroupSizes":[3],"NumberGroupSizes":[3],"PercentGroupSizes":[3],"CurrencyGroupSeparator":",","CurrencySymbol":"$","NaNSymbol":"NaN","CurrencyNegativePattern":0,"NumberNegativePattern":1,"PercentPositivePattern":0,"PercentNegativePattern":0,"NegativeInfinitySymbol":"-Infinity","NegativeSign":"-","NumberDecimalDigits":2,"NumberDecimalSeparator":".","NumberGroupSeparator":",","CurrencyPositivePattern":0,"PositiveInfinitySymbol":"Infinity","PositiveSign":"+","PercentDecimalDigits":2,"PercentDecimalSeparator":".","PercentGroupSeparator":",","PercentSymbol":"%","PerMilleSymbol":"","NativeDigits":["0","1","2","3","4","5","6","7","8","9"],"DigitSubstitution":1},"DateTimeFormat":{"AMDesignator":"AM","Calendar":{"MinSupportedDateTime":new Date(-59011459200000),"MaxSupportedDateTime":new Date(253402300799999),"AlgorithmType":1,"CalendarType":1,"Eras":[1],"TwoDigitYearMax":2029,"IsReadOnly":false},"DateSeparator":"/","FirstDayOfWeek":0,"CalendarWeekRule":0,"FullDateTimePattern":"dddd, MMMM dd, yyyy h:mm:ss tt","LongDatePattern":"dddd, MMMM dd, yyyy","LongTimePattern":"h:mm:ss tt","MonthDayPattern":"MMMM dd","PMDesignator":"PM","RFC1123Pattern":"ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'","ShortDatePattern":"M/d/yyyy","ShortTimePattern":"h:mm tt","SortableDateTimePattern":"yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss","TimeSeparator":":","UniversalSortableDateTimePattern":"yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'","YearMonthPattern":"MMMM, yyyy","AbbreviatedDayNames":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"ShortestDayNames":["Su","Mo","Tu","We","Th","Fr","Sa"],"DayNames":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"AbbreviatedMonthNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthNames":["January","February","March","April","May","June","July","August","September","October","November","December",""],"IsReadOnly":false,"NativeCalendarName":"Gregorian Calendar","AbbreviatedMonthGenitiveNames":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],"MonthGenitiveNames":["January","February","March","April","May","June","July","August","September","October","November","December",""]}};

Sys.StringBuilder = function(initialText) {
    var _parts = new Array();
    
    if ((typeof(initialText) == 'string') &&
        (initialText.length != 0)) {
        _parts.push(initialText);
    }

    this.append = function(text) {
        if ((text == null) || (typeof(text) == 'undefined')) {
            return;
        }
        if ((typeof(text) == 'string') && (text.length == 0)) {
            return;
        }
        
        _parts.push(text);
    }

    this.appendLine = function(text) {
        this.append(text);
        _parts.push('\r\n');
    }

    this.clear = function() {
        _parts.clear();
    }

    this.isEmpty = function() {
        return (_parts.length == 0);
    }

    this.toString = function(delimiter) {
        return _parts.join(delimiter || '');
    }
}
Sys.StringBuilder.registerSealedClass('Sys.StringBuilder');
if (!window.XMLHttpRequest) {
    window.XMLHttpRequest = function() {
        var progIDs = [ 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP' ];
	    
        for (var i = 0; i < progIDs.length; i++) {
            try {
                var xmlHttp = new ActiveXObject(progIDs[i]);
                return xmlHttp;
            }
            catch (ex) {
            }
        }
	    
        return null;
    }
}

Date.prototype.toFormattedString = function(format) {

    var dtf = Sys.CultureInfo.DateTimeFormat;

        if (!format)
        format = "F";

    if (format.length == 1) {
        switch (format) {
        case "d":
            format = dtf.ShortDatePattern;
            break;
        case "D":
            format = dtf.LongDatePattern;
            break;
        case "t":
            format = dtf.ShortTimePattern;
            break;
        case "T":
            format = dtf.LongTimePattern;
            break;
        case "F":
            format = dtf.FullDateTimePattern;
            break;
        case "M": case "m":
            format = dtf.MonthDayPattern;
            break;
        case "s":
            format = dtf.SortableDateTimePattern;
            break;
        case "Y": case "y":
            format = dtf.YearMonthPattern;
            break;
        default:
            throw Error.createError("'" + format + "' is not a valid date format");
        }
    }

    var regex = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g;

        var ret = "";
    var hour;

    function addLeadingZero(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num.toString();
    }

    function addLeadingZeros(num) {
        if (num < 10) {
            return '00' + num;
        }
        if (num < 100) {
            return '0' + num;
        }
        return num.toString();
    }

    for (;;) {

                var index = regex.lastIndex;

                var ar = regex.exec(format);

                ret += format.slice(index, ar ? ar.index : format.length);

        if (!ar) break;

        switch (ar[0]) {
        case "dddd":
                        ret += dtf.DayNames[this.getDay()];
            break;
        case "ddd":
                        ret += dtf.AbbreviatedDayNames[this.getDay()];
            break;
        case "dd":
                        ret += addLeadingZero(this.getDate());
            break;
        case "d":
                        ret += this.getDate();
            break;
        case "MMMM":
                        ret += dtf.MonthNames[this.getMonth()];
            break;
        case "MMM":
                        ret += dtf.AbbreviatedMonthNames[this.getMonth()];
            break;
        case "MM":
                        ret += addLeadingZero(this.getMonth() + 1);
            break;
        case "M":
                        ret += this.getMonth() + 1;
            break;
        case "yyyy":
                        ret += this.getFullYear();
            break;
        case "yy":
                        ret += addLeadingZero(this.getFullYear() % 100);
            break;
        case "y":
                        ret += this.getFullYear() % 100;
            break;
        case "hh":
                        hour = this.getHours() % 12;
            if (hour == 0) hour = 12;
            ret += addLeadingZero(hour);
            break;
        case "h":
                        hour = this.getHours() % 12;
            if (hour == 0) hour = 12;
            ret += hour;
            break;
        case "HH":
                        ret += addLeadingZero(this.getHours());
            break;
        case "H":
                        ret += this.getHours();
            break;
        case "mm":
                        ret += addLeadingZero(this.getMinutes());
            break;
        case "m":
                        ret += this.getMinutes();
            break;
        case "ss":
                        ret += addLeadingZero(this.getSeconds());
            break;
        case "s":
                        ret += this.getSeconds();
            break;
        case "tt":
                        ret += (this.getHours() < 12) ? dtf.AMDesignator : dtf.PMDesignator;
            break;
        case "t":
                        ret += ((this.getHours() < 12) ? dtf.AMDesignator : dtf.PMDesignator).charAt(0);
            break;
        case "f":
                        ret += addLeadingZeros(this.getMilliseconds()).charAt(0);
            break;
        case "ff":
                        ret += addLeadingZeros(this.getMilliseconds()).substr(0, 2);
            break;
        case "fff":
                        ret += addLeadingZeros(this.getMilliseconds());
            break;
        case "z":
                        hour = this.getTimezoneOffset() / 60;
            ret += ((hour >= 0) ? '+' : '-') + Math.floor(Math.abs(hour));
            break;
        case "zz":
                        hour = this.getTimezoneOffset() / 60;
            ret += ((hour >= 0) ? '+' : '-') + addLeadingZero(Math.floor(Math.abs(hour)));
            break;
        case "zzz":
                        hour = this.getTimezoneOffset() / 60;
            ret += ((hour >= 0) ? '+' : '-') + addLeadingZero(Math.floor(Math.abs(hour))) +
                dtf.TimeSeparator + addLeadingZero(Math.abs(this.getTimezoneOffset() % 60));
            break;
        default:
            debug.assert(false);
        }
    }
    return ret;
}




Number.prototype.toFormattedString = function(format) {
        var _percentPositivePattern = ["n %", "n%", "%n" ];
    var _percentNegativePattern = ["-n %", "-n%", "-%n"];
    var _numberNegativePattern = ["(n)","-n","- n","n-","n -"];
    var _currencyPositivePattern = ["$n","n$","$ n","n $"];
    var _currencyNegativePattern = ["($n)","-$n","$-n","$n-","(n$)","-n$","n-$","n$-","-n $","-$ n","n $-","$ n-","$ -n","n- $","($ n)","(n $)"];

        function expandNumber(number, precision, groupSizes, sep, decimalChar) {
debug.assert(groupSizes.length > 0, "groupSizes must be an array of at least 1");
        var curSize = groupSizes[0];
        var curGroupIndex = 1;

                var numberString = ""+number;
        var decimalIndex = numberString.indexOf('.');
        var right = "";
        if (decimalIndex > 0) {
            right = numberString.slice(decimalIndex+1);
            numberString = numberString.slice(0, decimalIndex);
        }

                if (precision > 0) {
                        var rightDifference = right.length - precision;
            if (rightDifference > 0) {
                right = right.slice(0, precision);
            } else if (rightDifference < 0) {
                for (var i=0; i<Math.abs(rightDifference); i++) {
                    right += '0';
                }
            }

                        right = decimalChar + right;
        }
        else {             right = "";
        }

        var stringIndex = numberString.length-1;
        var ret = "";
        while (stringIndex >= 0) {

                        if (curSize == 0 || curSize > stringIndex) {
                if (ret.length > 0)
                    return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                else
                    return numberString.slice(0, stringIndex + 1) + right;
            }

            if (ret.length > 0)
                ret = numberString.slice(stringIndex - curSize + 1, stringIndex+1) + sep + ret;
            else
                ret = numberString.slice(stringIndex - curSize + 1, stringIndex+1);

            stringIndex -= curSize;

            if (curGroupIndex < groupSizes.length) {
                curSize = groupSizes[curGroupIndex];
                curGroupIndex++;
            }
        }
        return numberString.slice(0, stringIndex + 1) + sep + ret + right;
    }
    var nf = Sys.CultureInfo.NumberFormat;

        var number = Math.abs(this);

        if (!format)
        format = "D";

    var precision = -1;
    if (format.length > 1) precision = parseInt(format.slice(1));

    var pattern;
    switch (format.charAt(0)) {
    case "d":
    case "D":
        pattern = 'n';

                if (precision != -1) {
            var numberStr = ""+number;
            var zerosToAdd = precision - numberStr.length;
            if (zerosToAdd > 0) {
                for (var i=0; i<zerosToAdd; i++) {
                    numberStr = '0'+numberStr;
                }
            }
            number = numberStr;
        }

                if (this < 0) number = -number;
        break;
    case "c":
    case "C":
        if (this < 0) pattern = _currencyNegativePattern[nf.CurrencyNegativePattern];
        else pattern = _currencyPositivePattern[nf.CurrencyPositivePattern];
        if (precision == -1) precision = nf.CurrencyDecimalDigits;
        number = expandNumber(Math.abs(this), precision, nf.CurrencyGroupSizes, nf.CurrencyGroupSeparator, nf.CurrencyDecimalSeparator);
        break;
    case "n":
    case "N":
        if (this < 0) pattern = _numberNegativePattern[nf.NumberNegativePattern];
        else pattern = 'n';
        if (precision == -1) precision = nf.NumberDecimalDigits;
        number = expandNumber(Math.abs(this), precision, nf.NumberGroupSizes, nf.NumberGroupSeparator, nf.NumberDecimalSeparator);
        break;
    case "p":
    case "P":
        if (this < 0) pattern = _percentNegativePattern[nf.PercentNegativePattern];
        else pattern = _percentPositivePattern[nf.PercentPositivePattern];
        if (precision == -1) precision = nf.PercentDecimalDigits;
        number = expandNumber(Math.abs(this), precision, nf.PercentGroupSizes, nf.PercentGroupSeparator, nf.PercentDecimalSeparator);
        break;
    default:
        debug.assert(false, "'" + format + "' is not a valid number format");
    }

    var regex = /n|\$|-|%/g;

        var ret = "";

    for (;;) {

                var index = regex.lastIndex;

                var ar = regex.exec(pattern);

                ret += pattern.slice(index, ar ? ar.index : pattern.length);

        if (!ar)
            break;

        switch (ar[0]) {
        case "n":
            ret += number;
            break;
        case "$":
            ret += nf.CurrencySymbol;
            break;
        case "-":
            ret += nf.NegativeSign;
            break;
        case "%":
            ret += nf.PercentSymbol;
            break;
        default:
            debug.assert(false);
        }
    }

    return ret;
}
Type.createEnum('Sys.ActionSequence', 'BeforeEventHandler', 0, 'AfterEventHandler', 1);
Sys.IAction = function() {
    this.get_sequence = Function.abstractMethod;
    this.execute = Function.abstractMethod;
    this.setOwner = Function.abstractMethod;
}
Sys.IAction.registerInterface('Sys.IAction');

Type.Event = function(owner, autoInvoke) {
    var _owner = owner;
    var _handlers = null;
    var _actions = null;
    var _autoInvoke = autoInvoke;
    var _invoked = false;
    
    this.get_autoInvoke = function() {
        return _autoInvoke;
    }
    
    this._getActions = function() {
if (_actions && _actions.length && !_owner) throw "Actions are only supported on events that have an owner.";
        if (_actions == null) {
            _actions = [];
        }
        return _actions;
    }
    this._getHandlers = function() {
        if (_handlers == null) {
            _handlers = [];
        }
        return _handlers;
    }
    this._getOwner = function() {
        return _owner;
    }
    
    this.isActive = function() {
        return ((_handlers != null) && (_handlers.length != 0)) ||
               ((_actions != null) && (_actions.length != 0));
    }
    
    this.get_isInvoked = function() {
        return _invoked;
    }
    
    this.dispose = function() {
        if (_handlers) {
            for (var h = _handlers.length - 1; h >= 0; h--) {
                _handlers[h] = null;
            }
            _handlers = null;
        }
        if (_actions) {
            for (var i = _actions.length - 1; i >= 0; i--) {
                _actions[i].dispose();
            }
            _actions = null;
        }
        
        _owner = null;
    }
    
    this._setInvoked = function(value) {
        _invoked = true;
    }
}
Type.Event.registerSealedClass('Type.Event', null, Sys.IDisposable);

Type.Event.prototype.add = function(handler) {
    this._getHandlers().add(handler);
    if (this.get_autoInvoke() && this.get_isInvoked()) {
        handler(this._getOwner(), null);
    }
}
Type.Event.prototype.addAction = function(action) {
    action.setOwner(this._getOwner());
    this._getActions().add(action);
}
Type.Event.prototype.remove = function(handler) {
    this._getHandlers().remove(handler);
}
Type.Event.prototype.removeAction = function(action) {
    action.dispose();
    this._getActions().remove(action);
}
Type.Event.prototype.invoke = function(sender, eventArgs) {
    if (this.isActive()) {
        var actions = this._getActions();
        var handlers = this._getHandlers();
        var hasPostActions = false;
        var i;
        
        for (i = 0; i < actions.length; i++) {
            if (actions[i].get_sequence() == Sys.ActionSequence.BeforeEventHandler) {
                actions[i].execute(sender, eventArgs);
            }
            else {
                hasPostActions = true;
            }
        }

        for (i = 0; i < handlers.length; i++) {
            handlers[i](sender, eventArgs);
        }
        
        if (hasPostActions) {
            for (i = 0; i < actions.length; i++) {
                if (actions[i].get_sequence() == Sys.ActionSequence.AfterEventHandler) {
                    actions[i].execute(sender, eventArgs);
                }
            }
        }
        
        this._setInvoked();
    }
}

Type.createEnum('Sys.HostType', 'Other', 0, 'InternetExplorer', 1, 'Firefox', 2);

Sys.Runtime = new function() {

    var _isBrowser = false;
    var _hostType = Sys.HostType.Other;
    
    var _initialized = false;
    var _disposed = false;
    var _unloading = false;

    var _disposableObjects = [];

    try {
        _isBrowser = (window != null);
    }
    catch (e) {
    }

    if (_isBrowser) {
        if (navigator.userAgent.indexOf('MSIE') != -1) {
            _hostType = Sys.HostType.InternetExplorer;
        }
        else if (navigator.userAgent.indexOf('Firefox') != -1) {
            _hostType = Sys.HostType.Firefox;
        }
        
        window.attachEvent('onload', onWindowLoad);
        window.attachEvent('onunload', onWindowUnload);
    }

    
    this.get_hostName = function() {
        if (_isBrowser) {
            return navigator.userAgent;
        }
        return '';
    }

    this.get_hostType = function() {
        return _hostType;
    }
    
    this.load = new Type.Event( null,  true);
    this.unload = new Type.Event( null,  true);

    this.dispose = function() {
        if (_isBrowser) {
            window.detachEvent('onunload', onWindowUnload);
        }
        if (_disposed == false) {
            _disposed = true;
            Sys.Runtime.unload.invoke(Sys.Runtime, null);

            if (_disposableObjects.length) {
                _unloading = true;
                var count = _disposableObjects.length;
                for (var i = 0; i < count; i++) {
                    _disposableObjects[i].dispose();
                }
                _disposableObjects.clear();
            }
        }
    }
    
    this.initialize = function() {
        if (_isBrowser) {
            window.detachEvent('onload', onWindowLoad);
        }
        if (_initialized == false) {
            _initialized = true;
            Sys.Runtime.load.invoke(Sys.Runtime, null);
        }
    }
    
    this.registerDisposableObject = function(object) {
        _disposableObjects.add(object);
    }
    
    this.unregisterDisposableObject = function(object) {
        if (!_unloading && _disposableObjects.length) {
            _disposableObjects.remove(object);
        }
    }

    function onWindowLoad() {
        Sys.Runtime.initialize();
    }

    function onWindowUnload() {
        Sys.Runtime.dispose();
    }
}
window.XMLDOM = function(markup) {
    if (!window.XMLDOMParser) {
        var progIDs = [ 'Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument' ];
        
        for (var i = 0; i < progIDs.length; i++) {
            try {
                var xmlDOM = new ActiveXObject(progIDs[i]);
                xmlDOM.async = false;
                xmlDOM.loadXML(markup);
                xmlDOM.setProperty('SelectionLanguage', 'XPath');
                
                return xmlDOM;
            }
            catch (ex) {
            }
        }
        
        return null;
    }
    else {
        var domParser = new window.XMLDOMParser();
        return domParser.parseFromString(markup, 'text/xml');
    }
}



Type.registerNamespace('Sys');


if (!Debug.breakIntoDebugger) {
    Debug.breakIntoDebugger = function(message) {
        Debug.writeln(message);
        eval('debugger;');
    }
}

Sys._Debug = function() {

    this.assert = function(condition, message, displayCaller) {
        if (!condition) {
            message = 'Assertion Failed: ' + message + (displayCaller ? '\r\nat ' + this.assert.caller : '');
            if (confirm(message + '\r\n\r\nBreak into debugger?')) {
                this.fail(message);
            }
        }
    }

    this.clearTrace = function() {
        var traceElement = document.getElementById('__atlas_trace');
        if (traceElement) {
            var children = traceElement.childNodes;
            for(var i = children.length - 2; i > 0; i--) {
                traceElement.removeChild(children[i]);
            }
            document.getElementById('__atlas_trace').style.display = 'none';
        }
    }

    this.dump = function(object, name, recursive, indentationPadding, loopArray) {
        name = name ? name : '';
        indentationPadding = indentationPadding ? indentationPadding : '';
        if (object == null) {
            this.trace(indentationPadding + name + ': null');
            return;
        }
        switch(typeof(object)) {
            case 'undefined':
                this.trace(indentationPadding + name + ': Undefined');
                break;
            case 'number': case 'string': case 'boolean':
                this.trace(indentationPadding + name + ': ' + object);
                break;
            default:
                if (Date.isInstanceOfType(object) || RegExp.isInstanceOfType(object)) {
                    this.trace(indentationPadding + name + ': ' + object.toString());
                    break;
                }
                if (!loopArray) {
                    loopArray = [];
                }
                else if (loopArray.contains(object)) {
                    this.trace(indentationPadding + name + ': ...');
                    return;
                }
                loopArray.add(object);
                var type = Object.getType(object);
                var tagName = object.tagName;
                var attributes = object.attributes;
                if ((type == Object) && tagName && attributes) {
                    this.trace(indentationPadding + name + ' {' + tagName + '}');
                    indentationPadding += '+';
                    length = attributes.length;
                    for (var i = 0; i < length; i++) {
                        var val = attributes[i].nodeValue;
                        if (val) {
                            this.dump(val, attributes[i].nodeName, recursive, indentationPadding, loopArray);
                        }
                    }
                }
                else {
                    var typeName = type.getName();
                    this.trace(indentationPadding + name + (typeof(typeName) == 'string' ? ' {' + typeName + '}' : ''));
                    if ((indentationPadding == '') || recursive) {
                        indentationPadding += '+';
                        var i, length, properties, p, v;
                        if (Sys.IArray.isImplementedBy(object)) {
                            length = object.get_length();
                            for (i = 0; i < length; i++) {
                                this.dump(object.getItem(i), '[' + i + ']', recursive, indentationPadding, loopArray);
                            }
                        }
                        if (Sys.ITypeDescriptorProvider.isImplementedBy(object)) {
                            var td = Sys.TypeDescriptor.getTypeDescriptor(object);
                            properties = td._getProperties();
                            for (p in properties) {
                                var propertyInfo = properties[p];
                                if (propertyInfo.name) {
                                    v = Sys.TypeDescriptor.getProperty(object, propertyInfo.name);
                                    this.dump(v, p, recursive, indentationPadding, loopArray);
                                }
                            }
                        }
                        else {
                            for (p in object) {
                                v = object[p];
                                if (!Function.isInstanceOfType(v) && !Type.Event.isInstanceOfType(v)) {
                                    this.dump(v, p, recursive, indentationPadding, loopArray);
                                }
                            }
                        }
                    }
                }
                loopArray.remove(object);
        }
    }

    this.fail = function(message) {
        Debug.breakIntoDebugger(message);
    }

    this.trace = function(text) {
        Debug.writeln(text);

        var traceElement = document.getElementById('__atlas_trace');
        if (!traceElement) {
            traceElement = document.createElement('FIELDSET');
            traceElement.id = '__atlas_trace';
            traceElement.style.backgroundColor = 'white';
            traceElement.style.color = 'black';
            traceElement.style.textAlign = 'left';
            traceElement.style.font = 'normal normal normal 1em/1.1em verdana,sans-serif';
            var legend = document.createElement('LEGEND');
            var legendText = document.createTextNode('Debugging Trace');
            legend.appendChild(legendText);
            traceElement.appendChild(legend);
            var clearButton = document.createElement('INPUT');
            clearButton.type = 'button';
            clearButton.value = 'Clear Trace';
            clearButton.onclick = debug.clearTrace;
            traceElement.appendChild(clearButton);
            document.body.appendChild(traceElement);
        }
        var traceLine = document.createElement('DIV');
        traceLine.innerHTML = text;
        traceElement.insertBefore(traceLine, traceElement.childNodes[traceElement.childNodes.length - 1]);
        traceElement.style.display = 'block';
    }

        this.checkType = function(debugTag, name, value, type) {
        if (!type.isInstanceOfType(value)) {
            this.assert(false, String.format("{0}: parameter '{1}' was set to a '{2}' while it should be of type '{3}'. Its value is '{4}'",
                debugTag, name, Object.getTypeName(value), type.getName(), value));
        }
    }

        this.validateParameters = function(debugTag, argumentArray, validationData) {
                for (var i=0; i<validationData.length; i++) {
                        if (!validationData[i])
                continue;

            var paramName = validationData[i][0];
            var checksToMake = validationData[i][1];
            var paramOptional = validationData[i][2];

                        if (!argumentArray[i]) {
                                if (paramOptional)
                    continue;

                this.assert(false, String.format("{0}: The required parameter '{1}' of type '{2}' is missing",
                    debugTag, paramName, checksToMake.getName()));
            }
            else {
                this.checkType(debugTag, paramName, argumentArray[i], checksToMake);
            }
        }
    }
}
Sys._Debug.registerSealedClass('Sys._Debug');

window.debug = new Sys._Debug();

Sys.Attributes = new function() {

    this.defineAttribute = function(attributeName) {
        this[attributeName] = attributeName;
    }
}

Sys.Attributes.defineAttribute('Element');


Sys.TypeDescriptor = function() {
    var _properties = { };
    var _events = { };
    var _methods = { };
    var _attributes = { };
    
    this._getAttributes = function() {
        return _attributes;
    }
    
    this._getEvents = function() {
        return _events;
    }
    
    this._getMethods = function() {
        return _methods;
    }
    
    this._getProperties = function() {
        return _properties;
    }
}
Sys.TypeDescriptor.registerSealedClass('Sys.TypeDescriptor');

Sys.TypeDescriptor.prototype.addAttribute = function(attributeName, attributeValue) {
    this._getAttributes()[attributeName] = attributeValue;
}

Sys.TypeDescriptor.prototype.addEvent = function(eventName, supportsActions) {
    this._getEvents()[eventName] = { name: eventName, actions: supportsActions };
}

Sys.TypeDescriptor.prototype.addMethod = function(methodName, associatedParameters) {
    this._getMethods()[methodName] = { name: methodName, parameters: associatedParameters };
}

Sys.TypeDescriptor.prototype.addProperty = function(propertyName, propertyType, readOnly) {
    if (!readOnly) {
        readOnly = false;
    }
    var associatedAttributes;
    if (arguments.length > 3) {
        associatedAttributes = { };
        for (var i = 3; i < arguments.length; i += 2) {
            var attribute = arguments[i];
            var value = arguments[i + 1];
            associatedAttributes[attribute] = value;
        }
    }
    this._getProperties()[propertyName] = { name: propertyName, type: propertyType, isReadOnly: readOnly, attributes: associatedAttributes };
}

Sys.TypeDescriptor.addType = function(tagPrefix, tagName, type) {
    if (!Sys.TypeDescriptor._registeredTags) {
        Sys.TypeDescriptor._registeredTags = { };
    }

    var tagTable = Sys.TypeDescriptor._registeredTags[tagPrefix];
    if (!tagTable) {
        tagTable = { };
        Sys.TypeDescriptor._registeredTags[tagPrefix] = tagTable;
    }

    tagTable[tagName] = type;
}

Sys.TypeDescriptor.createParameter = function(parameterName, parameterType) {
    return { name: parameterName, type: parameterType };
}

Sys.TypeDescriptor.getType = function(tagPrefix, tagName) {
    var type = null;
    if (Sys.TypeDescriptor._registeredTags) {
        var tagNameTable = Sys.TypeDescriptor._registeredTags[tagPrefix];
        if (tagNameTable) {
            type = tagNameTable[tagName];
        }
    }
debug.assert(type, String.format("Unrecognized tag {0}:{1}", tagPrefix, tagName));
    return type;
}

Sys.TypeDescriptor.getTypeDescriptor = function(instance) {
    if (instance == null) {
        throw Error.createError('instance is null in TypeDescriptor.getTypeDescriptor');
    }

    var type = Object.getType(instance);
    var td = type._descriptor;
    if (!td && !type._descriptorChecked) {
        if (Sys.ITypeDescriptorProvider.isImplementedBy(instance)) {
            td = instance.getDescriptor();
debug.assert(td, String.format('Failed to get type descriptor for instance of type "{0}"', type.getName()));
            
            type._descriptor = td;
        }
        type._descriptorChecked = true;
    }

    return td;
}

Sys.TypeDescriptor.unload = function() {
    if (Sys.TypeDescriptor._registeredTags) {
                        Sys.TypeDescriptor._registeredTags = null;
    }
}

Sys.TypeDescriptor.getAttribute = function(instance, attributeName) {
    if (instance == null) {
        throw Error.createError('instance is null in TypeDescriptor.getAttribute');
    }

    var td = Sys.TypeDescriptor.getTypeDescriptor(instance);
debug.assert(td, 'Attributes are only supported for types implementing ITypeDescriptorProvider');
    
    return td._getAttributes()[attributeName];
}

Sys.TypeDescriptor.getProperty = function(instance, propertyName, key) {
    if (instance == null) {
        throw Error.createError('instance is null in TypeDescriptor.getProperty');
    }

    if (Sys.ICustomTypeDescriptor.isImplementedBy(instance)) {
        return instance.getProperty(propertyName, key);
    }
    
    if ((propertyName == null) || (propertyName.length == 0)) {
        throw Error.createError('propertyName is null');
    }
    
    var td = Sys.TypeDescriptor.getTypeDescriptor(instance);
    if (!td) {
                var field = instance[propertyName];
        if (field && key) {
            field = field[key];
        }
        return field;
    }

    var propertyInfo = td._getProperties()[propertyName];
debug.assert(propertyInfo, String.format('Property "{0}" not found on object of type "{1}"', propertyName, Object.getTypeName(instance)));
    
    var getter = instance['get_' + propertyInfo.name];
    
    var object = getter.call(instance);
    if ((propertyInfo.type == Object) && propertyInfo.isReadOnly && key) {
        object = object[key];
    }
    return object;
}

Sys.TypeDescriptor.setProperty = function(instance, propertyName, value, key) {
    if (instance == null) {
        throw Error.createError('instance is null in TypeDescriptor.setProperty');
    }

    if (Sys.ICustomTypeDescriptor.isImplementedBy(instance)) {
        instance.setProperty(propertyName, value, key);
        return;
    }

    if ((propertyName == null) || (propertyName.length == 0)) {
        throw Error.createError('propertyName is null');
    }
    
    var td = Sys.TypeDescriptor.getTypeDescriptor(instance);
    if (!td) {
                var object = instance;
        if (key && key.length) {
            object = instance[propertyName];
            propertyName = key;
        }
        object[propertyName] = value;
        return;
    }
    
    var propertyInfo = td._getProperties()[propertyName];
debug.assert(propertyInfo, String.format('Property "{0}" not found on object of type "{1}"', propertyName, Object.getTypeName(instance)));
    
    if (!propertyInfo.isReadOnly) {
                        if ((propertyInfo.type != String) && (typeof(value) == 'string') && propertyInfo.type.parse) {
            value = propertyInfo.type.parse(value);
        }

        var setter = instance['set_' + propertyInfo.name];
        
        setter.call(instance, value);
    }
    else if ((propertyInfo.type == Object) && key) {
        var getter = instance['get_' + propertyInfo.name];
        var object = getter.call(instance);
        
        object[key] = value;
    }
}

Sys.TypeDescriptor.invokeMethod = function(instance, methodName, parameters) {
    if (instance == null) {
        throw Error.createError('instance is null in TypeDescriptor.invokeMethod');
    }

    if (Sys.ICustomTypeDescriptor.isImplementedBy(instance)) {
        return instance.invokeMethod(methodName, parameters);
    }
    
    var td = Sys.TypeDescriptor.getTypeDescriptor(instance);
    if (!td) {
        debug.assert(!parameters || !parameters.length, 'Parameters are not supported for methods on intrinsic objects');
        return instance[methodName].call(instance);
    }
    
    var methodInfo = td._getMethods()[methodName];
debug.assert(methodInfo, String.format('Method "{0}" not found on object of type "{1}"', methodName, Object.getTypeName(instance)));
    
    var method = instance[methodInfo.name];
    
    if (!methodInfo.parameters || !methodInfo.parameters.length) {
        return method.call(instance);
    }
    else {
                
        var arguments = [];
        for (var i = 0; i < methodInfo.parameters.length; i++) {
            var parameterInfo = methodInfo.parameters[i];
            var value = parameters[parameterInfo.name];
            
            if (value && (parameterInfo.type != String) && (typeof(value) == 'string')) {
                value = parameterInfo.type.parse(value);
            }

            arguments[i] = value;
        }
        
        return method.apply(instance, arguments);
    }
}

Sys.TypeDescriptor.getPropertyType = function(instance, propertyName, key) {
    if (instance == null) {
        throw Error.createError('instance is null in TypeDescriptor.getPropertyType');
    }

    if (Sys.ICustomTypeDescriptor.isImplementedBy(instance)) {
        return Object;
    }
    
    if (key) {
        return Object;
    }

    if ((propertyName == null) || (propertyName.length == 0)) {
        throw Error.createError('propertyName is null');
    }

    var td = Sys.TypeDescriptor.getTypeDescriptor(instance);

    var propertyInfo = td._getProperties()[propertyName];
debug.assert(propertyInfo, String.format('Property "{0}" not found on object of type "{1}"', propertyName, Object.getTypeName(instance)));
    
    return propertyInfo.type;
}

Sys.ScriptLoader = function() {

    var _references;
    var _completionCallback;
    var _callbackContext;

    var _currentLoadingReference;
    var _currentOnScriptLoad;
    
    this.load = function(references, completionCallback, callbackContext) {
        _references = references;
        _completionCallback = completionCallback;
        _callbackContext = callbackContext;
        
        loadReferences();
    }

    function loadReferences() {
        if (_currentLoadingReference) {
            if ((_currentLoadingReference.readyState != 'loaded') &&
                (_currentLoadingReference.readyState != 'complete')) {
                return;
            }
            else {
                                if (_currentOnScriptLoad) {
                    eval(_currentOnScriptLoad);
                    _currentOnScriptLoad = null;
                }
                
                if (Sys.Runtime.get_hostType() != Sys.HostType.InternetExplorer) {
                    _currentLoadingReference.onload = null;
                }
                else {
                    _currentLoadingReference.onreadystatechange = null;
                }
                _currentLoadingReference = null;
            }
        }

        if (_references.length) {
            var reference = _references.dequeue();
            var scriptElement = document.createElement('script');
            _currentLoadingReference = scriptElement;
            _currentOnScriptLoad = reference.onscriptload;
            
            if (Sys.Runtime.get_hostType() != Sys.HostType.InternetExplorer) {
                scriptElement.readyState = 'loaded';
                scriptElement.onload = loadReferences;
            }
            else {
                scriptElement.onreadystatechange = loadReferences;
            }
            scriptElement.type = 'text/javascript';
            scriptElement.src = reference.url;

            var headElement = document.getElementsByTagName('head')[0];
            headElement.appendChild(scriptElement);

            return;
        }
        
        if (_completionCallback) {
            var completionCallback = _completionCallback;
            var callbackContext = _callbackContext;
            
            _completionCallback = null;
            _callbackContext = null;
            
            completionCallback(callbackContext);
        }
        
        _references = null;
    }
}
Sys.ScriptLoader.registerClass('Sys.ScriptLoader');

Sys.MarkupContext = function(document, global, parentContext, dataContext) {
    var _document = document;
    var _global = global;
    var _parentContext = parentContext;
    var _dataContext = dataContext;
    var _objects = { };
    var _pendingReferences = [];
    var _pendingEndUpdates = [];

    var _dataContextHidden = false;
    var _opened = false;
    
    this.get_dataContext = function() {
debug.assert(_opened);
        
        if (_dataContextHidden) {
            return null;
        }
        return _dataContext;
    }
    
    this.get_isGlobal = function() {
        return _global;
    }
    
    this.addObject = function(id, object) {
debug.assert(!_objects[id], String.format('Duplicate use of id "{0}" for object of type "{1}".', id, Object.getTypeName(object)));
        _objects[id] = object;
    }
    this.removeObject = function(component) {
        delete _objects[component.get_id()];
    }

    this.addEndUpdate = function(instance) {
debug.assert(_opened);
        
        _pendingEndUpdates.add(instance);
    }
        
    this.addReference = function(instance, propertyInfo, reference) {
debug.assert(_opened);
        
        _pendingReferences.add({ o: instance, p: propertyInfo, r: reference });
    }
    
    this.close = function() {
debug.assert(_opened);
        
        _opened = false;
        _dataContext = null;
        
                                        var i;
        for (i = 0; i < _pendingReferences.length; i++) {
            var pendingReference = _pendingReferences[i];
            
            var instance = pendingReference.o;
            var propertyInfo = pendingReference.p;
            var propertyValue = pendingReference.r;

            var object = this.findObject(propertyValue);
debug.assert(object, String.format('Could not resolve reference to object named "{0}" for "{1}" property on object of type "{2}"', propertyValue, propertyInfo.name, Object.getTypeName(instance)));

            var setter = instance['set_' + propertyInfo.name];
            setter.call(instance, object);
        }
        _pendingReferences = null;
        
        for (i = 0; i < _pendingEndUpdates.length; i++) {
            _pendingEndUpdates[i].endUpdate();
        }
        _pendingEndUpdates = null;
    }

    this.dispose = function() {
        if (!_global) {
                                                                        for (var o in _objects) {
                if (Sys.IDisposable.isImplementedBy(_objects[o])) {
                    _objects[o].dispose();
                }
                
                _objects[o] = null;
            }
        }
        
        _document = null;
        _parentContext = null;
        _dataContext = null;

        _objects = null;
        _pendingReferences = null;
        _pendingEndUpdates = null;
    }
    
    this.findElement = function(id) {
        if (_opened) {
debug.assert(_document != null);
            
            var element = _document.getElementById(id);
            if (!element && _parentContext) {
                element = _parentContext.findElement(id);
            }
            return element;
        }
        
        return null;
    }
    
    this.findObject = function(id) {
        var object = _objects[id];
        if (!object && _parentContext) {
            object = _parentContext.findObject(id);
        }
        
        return object;
    }
    
    this.hideDataContext = function() {
debug.assert(_opened);
        
        if (!_dataContextHidden) {
            _dataContextHidden = true;
            return true;
        }
        return false;
    }
    
    this.open = function() {
debug.assert(_opened == false);
        
        _pendingReferences = [];
        _pendingEndUpdates = [];
        
        _opened = true;
    }
    
    this.restoreDataContext = function() {
debug.assert(_opened);
        
        _dataContextHidden = false;
    }
}
Sys.MarkupContext.registerSealedClass('Sys.MarkupContext');

Sys.MarkupContext.createGlobalContext = function() {
    return new Sys.MarkupContext(document, true);
}

Sys.MarkupContext.createLocalContext = function(documentFragment, parentContext, dataContext) {
debug.assert(documentFragment != null);
debug.assert(parentContext != null);

    return new Sys.MarkupContext(documentFragment, false, parentContext, dataContext);
}

Sys.MarkupParser = new function() {

    this.initializeObject = function(instance, node, markupContext) {
        var td = Sys.TypeDescriptor.getTypeDescriptor(instance);
        if (!td) {
            return null;
        }
        
        var supportsBatchedUpdates = false;
        if (Sys.ISupportBatchedUpdates.isImplementedBy(instance)) {
            supportsBatchedUpdates = true;
            instance.beginUpdate();
        }
        
        var i, a;
        var attr, attrName;
        var propertyInfo, propertyName, propertyType, propertyValue;
        var eventInfo, eventValue;
        var setter, getter;
        
        var properties = td._getProperties();
        var events = td._getEvents();
        
        var attributes = node.attributes;
        if (attributes) {
            for (a = attributes.length - 1; a >= 0; a--) {
                attr = attributes[a];
                attrName = attr.nodeName;
                
debug.assert(properties[attrName] || events[attrName], String.format('Unrecognized attribute "{0}" on object of type "{1}"', attrName, Object.getTypeName(instance)));
                
                propertyInfo = properties[attrName];
                if (propertyInfo) {
                    propertyType = propertyInfo.type;
                    propertyValue = attr.nodeValue;
                    
                    var delayedSet = false;
                    
                    if (propertyType == Object) {
                        var elementsOnly = (propertyInfo.attributes && propertyInfo.attributes[Sys.Attributes.Element]);
                        if (!elementsOnly) {
                            markupContext.addReference(instance, propertyInfo, propertyValue);
                            delayedSet = true;
                        }
                        else {
                            propertyValue = markupContext.findElement(propertyValue);
                        }
                    }
                    
                    if (!delayedSet) {
                        propertyName = propertyInfo.name;

                        setter = instance['set_' + propertyName];
                        if (propertyType != Object) {
                            if (propertyType == Array) {
                                propertyValue = Array.parse('[' + propertyValue + ']');
                            }
                            else if (propertyType != String) {
                                propertyValue = propertyType.parse(propertyValue);
debug.assert((propertyValue !== null) || !(propertyType.isEnum && propertyType.isEnum()), 'Invalid Enumeration Value');
                            }
                        }
                        
                        setter.call(instance, propertyValue);
                    }
                }
                else {
                    eventInfo = events[attrName];
                    if (eventInfo) {
                        var handler = Function.parse(attr.nodeValue);
                        if (handler) {
                            eventValue = instance[eventInfo.name];
                            eventValue.add(handler);
                        }
                    }
                }
            }
        }

        var childNodes = node.childNodes;
        if (childNodes && (childNodes.length != 0)) {
            for (i = childNodes.length - 1; i >= 0; i--) {
                var childNode = childNodes[i];
                if (childNode.nodeType != 1) {
                    continue;
                }
                
                var nodeName = childNode.baseName;

debug.assert(properties[nodeName] || events[nodeName], String.format('Unrecognized child node "{0}" on object of type "{1}"', nodeName, Object.getTypeName(instance)));

                propertyInfo = properties[nodeName];
                if (propertyInfo) {
                    propertyName = propertyInfo.name;
                    propertyType = propertyInfo.type;

                    if (propertyInfo.isReadOnly) {
                        getter = instance['get_' + propertyName];
                        var nestedObject = getter.call(instance);
                        
                        if (propertyType == Array) {
                            if (childNode.childNodes.length != 0) {
                                var items = this.parseNodes(childNode.childNodes, markupContext);
                                for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
                                    nestedObject.add(items[itemIndex]);
                                }
                            }
                        }
                        else if (propertyType == Object) {
                            attributes = childNode.attributes;
                            for (a = attributes.length - 1; a >= 0; a--) {
                                attr = attributes[a];
                                nestedObject[attr.nodeName] = attr.nodeValue;
                            }
                        }
                        else {
                            this.initializeObject(nestedObject, childNode, markupContext);
                        }
                    }
                    else {
                        propertyValue = null;
                        if (propertyType == String) {
                            propertyValue = childNode.text;
                        }
                        else if (childNode.childNodes.length != 0) {
                            var valueNode;
                            for (var childNodeIndex = 0; childNodeIndex < childNode.childNodes.length; childNodeIndex++) {
                                if (childNode.childNodes[childNodeIndex].nodeType != 1) {
                                    continue;
                                }
                                valueNode = childNode.childNodes[childNodeIndex];
                                break;
                            }
                            if (valueNode) {
                                propertyValue = this.parseNode(valueNode, markupContext);
                            }
                        }
                        
                        if (propertyValue) {
                            setter = instance['set_' + propertyName];
                            setter.call(instance, propertyValue);
                        }
                    }
                }
                else {
                    eventInfo = events[nodeName];
                    if (eventInfo && eventInfo.actions) {
                        var actions = this.parseNodes(childNode.childNodes, markupContext);
                        if (actions.length) {
                            eventValue = instance[eventInfo.name];
                            for (var e = 0; e < actions.length; e++) {
                                eventValue.addAction(actions[e]);
                            }
                        }
                    }
                }
            }
        }

        if (supportsBatchedUpdates) {
            markupContext.addEndUpdate(instance);
        }
        
        return instance;
    }

    this.parseNode = function(node, markupContext) {
        var parsedObject = null;
        
        var tagPrefix = node.prefix;
        if (!tagPrefix) {
            tagPrefix = node.tagPrefix;
        }
        if (!tagPrefix || (tagPrefix.length == 0)) {
            tagPrefix = 'script';
        }

        var tagName = node.baseName;

        var tagType = Sys.TypeDescriptor.getType(tagPrefix, tagName);
        if (tagType) {
            var parseMethod = tagType.parseFromMarkup;
            if (!parseMethod) {
                var baseType = tagType.getBaseType();
                while (baseType) {
                    parseMethod = baseType.parseFromMarkup;
                    if (parseMethod) {
                        break;
                    }
                    baseType = baseType.getBaseType();
                }
                tagType.parseFromMarkup = parseMethod;
            }
            
            if (parseMethod) {
                parsedObject = parseMethod.call(null, tagType, node, markupContext);
            }
        }
        return parsedObject;
    }

    this.parseNodes = function(nodes, markupContext) {
        var objects = [];
        
        for (var i = 0; i < nodes.length; i++) {
            var objectNode = nodes[i];
            if (objectNode.nodeType != 1) {
                                continue;
            }

            var processedObject = this.parseNode(objectNode, markupContext);
            if (processedObject) {
                objects.add(processedObject);
            }
        }
        
        return objects;
    }

    this.processDocument = function(markupContext, completionHandler) {
debug.assert(markupContext.get_isGlobal());
        
        var scripts = [];
        var scriptElements = document.getElementsByTagName('script');
        for (var e = 0; e < scriptElements.length; e++) {
            if (scriptElements[e].type == 'text/xml-script') {
                var scriptElement = scriptElements[e];

                var scriptMarkup = scriptElement.innerHTML;
                if (scriptMarkup.startsWith('<!--')) {
                    var startIndex = scriptMarkup.indexOf('<', 1);
                    var endIndex = scriptMarkup.lastIndexOf('>');
                    endIndex = scriptMarkup.lastIndexOf('>', endIndex - 1);
                    
                    scriptMarkup = scriptMarkup.substring(startIndex, endIndex + 1);
                }
                
                if (scriptMarkup.length == 0) {
                    continue;
                }

                var scriptDOM = new XMLDOM(scriptMarkup);
                var scriptDocumentNode = scriptDOM.childNodes[0];
                if (scriptDocumentNode == null) {
                    throw Error.createError('Invalid xml markup in xml script block', scriptMarkup);
                }
                scripts.add(scriptDocumentNode);
            }
        }
        
        this.processDocumentScripts(markupContext, scripts, completionHandler);
    }

    this.processDocumentDelta = function(markupContext, scriptDocumentNode) {
debug.assert(markupContext.get_isGlobal());
        
                                
        var scriptDocumentItemNodes = scriptDocumentNode.childNodes;
        
        for (var i = scriptDocumentItemNodes.length - 1; i >= 0; i--) {
            var node = scriptDocumentItemNodes[i];
            if (node.nodeType != 1) {
                continue;
            }
            
            if (node.baseName == 'components') {
                markupContext.open();
                this.parseNodes(node.childNodes, markupContext);
                markupContext.close();
                break;
            }
        }
    }
    
    this.processDocumentScripts = function(markupContext, scripts, completionHandler) {
        var references = [];
        var componentNodes = [];
        
        for (var s = 0; s < scripts.length; s++) {
            var scriptDocumentNode = scripts[s];
            var scriptDocumentItemNodes = scriptDocumentNode.childNodes;
            
            for (var i = scriptDocumentItemNodes.length - 1; i >= 0; i--) {
                var node = scriptDocumentItemNodes[i];
                if (node.nodeType != 1) {
                    continue;
                }
                
                if (node.baseName == 'components') {
                    for (var c = 0; c < node.childNodes.length; c++) {
                        var componentNode = node.childNodes[c];
                        if (componentNode.nodeType != 1) {
                            continue;
                        }
                        
                        componentNodes.add(componentNode);
                    }
                }
                else if (node.baseName == 'references') {
                    for (var r = 0; r < node.childNodes.length; r++) {
                        var referenceNode = node.childNodes[r];
                        if (referenceNode.nodeType != 1) {
                            continue;
                        }
                        
                        if (referenceNode.baseName == 'add') {
                            var srcAttribute = referenceNode.attributes.getNamedItem('src');
                            var onloadAttribute = referenceNode.attributes.getNamedItem('onscriptload');
                            if (srcAttribute) {
                                var loadVal = '';
                                if (onloadAttribute) {
                                    loadVal = onloadAttribute.nodeValue;
                                }
                                references.queue({url: srcAttribute.nodeValue, onscriptload: loadVal});
                            }
                        }
                    }
                }
            }
        }
        
        this._processXMLScript(markupContext, references, componentNodes, completionHandler);
    }
    
    this._processXMLScript = function(markupContext, references, componentNodes, completionHandler) {
        var xmlScriptContext =
            {
                markupContext: markupContext,
                references: references,
                componentNodes: componentNodes,
                completionHandler: completionHandler
            };

        if (references && references.length) {
            var scriptLoader = new Sys.ScriptLoader();
            scriptLoader.load(references,
                              Function.createDelegate(this, this._processXMLScriptComponents),
                              xmlScriptContext);
        }
        else {
            this._processXMLScriptComponents(xmlScriptContext);
        }
    }
    
    this._processXMLScriptComponents = function(xmlScriptContext) {
debug.assert(xmlScriptContext != null);
        
        var markupContext = xmlScriptContext.markupContext;
        var componentNodes = xmlScriptContext.componentNodes;
        var completionHandler = xmlScriptContext.completionHandler;

        markupContext.open();
        if (componentNodes && componentNodes.length) {
            this.parseNodes(componentNodes, markupContext);
        }
        markupContext.close();
        
        if (completionHandler) {
            completionHandler();
        }
    }
}
Sys.ISupportBatchedUpdates = function() {
    this.beginUpdate = Function.abstractMethod;
    this.endUpdate = Function.abstractMethod;
}
Sys.ISupportBatchedUpdates.registerInterface('Sys.ISupportBatchedUpdates');
Sys.ICustomTypeDescriptor = function() {
    this.getProperty = Function.abstractMethod;
    this.setProperty = Function.abstractMethod;
    this.invokeMethod = Function.abstractMethod;
}
Sys.ICustomTypeDescriptor.registerInterface('Sys.ICustomTypeDescriptor');

Sys.ITypeDescriptorProvider = function() {
    this.getDescriptor = Function.abstractMethod;
}
Sys.ITypeDescriptorProvider.registerInterface('Sys.ITypeDescriptorProvider');
Sys.EventArgs = function() {

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();
        return td;
    }
    Sys.EventArgs.registerBaseMethod(this, 'getDescriptor');
}
Sys.EventArgs.registerClass('Sys.EventArgs', null, Sys.ITypeDescriptorProvider);

Sys.EventArgs.Empty = new Sys.EventArgs();
Sys.CancelEventArgs = function() {
    Sys.CancelEventArgs.initializeBase(this);
    var _canceled = false;
    
    this.get_canceled = function() {
        return _canceled;
    }
    this.set_canceled = function(value) {
        _canceled = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.CancelEventArgs.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('canceled', Boolean);
        return td;
    }
    Sys.CancelEventArgs.registerBaseMethod(this, 'getDescriptor');
}
Sys.CancelEventArgs.registerClass('Sys.CancelEventArgs', Sys.EventArgs);

Sys._Application = function() {

    var _markupContext = Sys.MarkupContext.createGlobalContext();

    this.load = new Type.Event(this);
    this.unload = new Type.Event(this);
    
    this.findObject = function(id) {
        if (_markupContext) {
            return _markupContext.findObject(id);
        }
        return null;
    }
    
    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();
        
        td.addEvent('load', true);
        td.addEvent('unload', true);
        
        return td;
    }
    
    this.getMarkupContext = function() {
        return _markupContext;
    }

    this.getProperty = function(name, key) {
debug.fail('not supported');
    }
    
    this.getService = function(serviceType) {
                return null;
    }

    this.invokeMethod = function(methodName, parameters) {
debug.assert((parameters == null) || (parameters.length == 0), 'parameters are not supported');
        
        var method = Function.parse(methodName);
        if (typeof(method) == 'function') {
            method();
        }
    }

    this._loadIncremental = function(scriptDocument) {
        Sys.MarkupParser.processDocumentDelta(_markupContext, scriptDocument);
    }
    
    this.setProperty = function(name, value, key) {
debug.fail('not supported');
    }
    
    function onLoaded() {
        Sys.Application.load.invoke(Sys.Application, null);
        var pageLoadHandler = Function.parse('pageLoad');
        if (typeof(pageLoadHandler) == 'function') {
            pageLoadHandler();
        }
    }

    function onRuntimeLoad() {
        Sys.Runtime.load.remove(onRuntimeLoad);
        Sys.MarkupParser.processDocument(_markupContext, onLoaded);
    }

    function onRuntimeUnload() {
        Sys.Runtime.unload.remove(onRuntimeUnload);

        Sys.Application.unload.invoke(Sys.Application, null);
        var pageUnloadHandler = Function.parse('pageUnload');
        if (typeof(pageUnloadHandler) == 'function') {
            pageUnloadHandler();
        }

        if (_markupContext) {
            _markupContext.dispose();
            _markupContext = null;
        }
        
        Sys.TypeDescriptor.unload();
    }
    
    Sys.Runtime.load.add(onRuntimeLoad);
    Sys.Runtime.unload.add(onRuntimeUnload);
}

Sys._Application.registerSealedClass('Sys._Application', null, Sys.ITypeDescriptorProvider, Sys.ICustomTypeDescriptor);
Sys.TypeDescriptor.addType('script', 'application', Sys._Application);

Sys._Application.parseFromMarkup = function(type, node, markupContext) {
    if (!markupContext.get_isGlobal()) {
        return null;
    }

    var id = null;
    var idAttribute = node.attributes.getNamedItem('id');
    if (idAttribute) {
        id = idAttribute.nodeValue;
        node.attributes.removeNamedItem('id');
    }
    
    Sys.MarkupParser.initializeObject(Sys.Application, node, markupContext);
    if (idAttribute) {
        node.attributes.setNamedItem(idAttribute);
    }
    if (id && (markupContext.findObject(id) != Sys.Application)) {
        markupContext.addObject(id, Sys.Application);
    }

    return Sys.Application;
}

function $object(id, context) {
    context = context || Sys.Application;
    return context.findObject(id);
}
Sys.INotifyPropertyChanged = function() {
    this.propertyChanged = null;
}
Sys.INotifyPropertyChanged.registerInterface('Sys.INotifyPropertyChanged');

Sys.INotifyCollectionChanged = function() {
    this.collectionChanged = null;
}
Sys.INotifyCollectionChanged.registerInterface('Sys.INotifyCollectionChanged');

Sys.PropertyChangedEventArgs = function(propertyName) {
    Sys.PropertyChangedEventArgs.initializeBase(this);
    var _propertyName = propertyName;
    
    this.get_propertyName = function() {
        return _propertyName;
    }

    this.getDescriptor = function() {
        var td = Sys.PropertyChangedEventArgs.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('propertyName', String, true);
        return td;
    }
}
Sys.PropertyChangedEventArgs.registerSealedClass('Sys.PropertyChangedEventArgs', Sys.EventArgs);
Type.createEnum('Sys.NotifyCollectionChangedAction', 'Add', 0, 'Remove', 1, 'Reset', 2);
Sys.CollectionChangedEventArgs = function(action, changedItem) {
    Sys.CollectionChangedEventArgs.initializeBase(this);
    
    var _action = action;
    var _changedItem = changedItem;
    
    this.get_action = function() {
        return _action;
    }
    
    this.get_changedItem = function() {
        return _changedItem;
    }

    this.getDescriptor = function() {
        var td = Sys.CollectionChangedEventArgs.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('action', Sys.NotifyCollectionChangedAction, true);
        td.addProperty('changedItem', Object, true);
        return td;
    }
}
Sys.CollectionChangedEventArgs.registerSealedClass('Sys.CollectionChangedEventArgs', Sys.EventArgs);
Type.createEnum('Sys.BindingDirection', 'In', 0, 'Out', 1, 'InOut', 2);
Sys.BindingEventArgs = function(value, direction, targetPropertyType, transformerArgument) {
    Sys.BindingEventArgs.initializeBase(this);
    
    var _value = value;
    var _direction = direction;
    var _targetPropertyType = targetPropertyType;
    var _transformerArgument = transformerArgument;
    
    this.get_direction = function() {
        return _direction;
    }
    
    this.get_targetPropertyType = function() {
        return _targetPropertyType;
    }
    
    this.get_transformerArgument = function() {
        return _transformerArgument;
    }
    
    this.get_value = function() {
        return _value;
    }
    this.set_value = function(value) {
        _value = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.BindingEventArgs.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('direction', Sys.BindingDirection, true);
        td.addProperty('targetPropertyType', Object, true);
        td.addProperty('transformerArgument', Object, true);
        td.addProperty('value', Object);
        return td;
    }
    Sys.BindingEventArgs.registerBaseMethod(this, 'getDescriptor');
}
Sys.BindingEventArgs.registerSealedClass('Sys.BindingEventArgs', Sys.CancelEventArgs);

Sys.BindingBase = function() {
    Sys.BindingBase.initializeBase(this);
    
    var _id;
    var _target;
    var _property;
    var _propertyKey;
    var _dataContext;
    var _dataPath;
    var _dataPathParts;
    var _transformerArgument = null;
    var _automatic = true;
    var _bindingExecuting = false;

    var _source;

    this.get_automatic = function() {
        return _automatic;
    }
    this.set_automatic = function(value) {
        if (!_source) {
            _automatic = value;
        }
    }

    this.get_dataContext = function() {
        return _dataContext;
    }
    this.set_dataContext = function(value) {
        if (!_source) {
            _dataContext = value;
        }
    }
    
    this.get_dataPath = function() {
        return _dataPath;
    }
    this.set_dataPath = function(value) {
        if (!_source) {
            _dataPath = value;
        }
    }

    this.get_id = function() {
        return _id;
    }
    this.set_id = function(value) {
        _id = value;
    }
    
    this.get_property = function() {
        return _property;
    }
    this.set_property = function(value) {
        if (!_source) {
            _property = value;
        }
    }
    
    this.get_propertyKey = function() {
        return _propertyKey;
    }
    this.set_propertyKey = function(value) {
        if (!_source) {
            _propertyKey = value;
        }
    }
    
    this.get_transformerArgument = function() {
        return _transformerArgument;
    }
    this.set_transformerArgument = function(value) {
        _transformerArgument = value;
    }
    
    this.transform = new Type.Event(null);

    this.dispose = function() {
        this.transform.dispose();
        
        _dataContext = null;
        _source = null;
        _target = null;
    }
    Sys.BindingBase.registerBaseMethod(this, 'dispose');
    
    this.evaluate = function(direction) {
debug.assert((direction == Sys.BindingDirection.In) || (direction == Sys.BindingDirection.Out));

        if (_bindingExecuting) {
            return;
        }
        _bindingExecuting = true;
        if (direction == Sys.BindingDirection.In) {
            this.evaluateIn();
        }
        else {
            this.evaluateOut();
        }
        _bindingExecuting = false;
    }
    
    this.evaluateIn = function() {
        var targetPropertyType = Sys.TypeDescriptor.getPropertyType(_target, _property, _propertyKey);
        var value = this._getSourceValue(targetPropertyType);
        
        var canceled = false;
        if (this.transform.isActive()) {
            var be = new Sys.BindingEventArgs(value, Sys.BindingDirection.In, targetPropertyType, _transformerArgument);
            
            this.transform.invoke(this, be);
            canceled = be.get_canceled();
            value = be.get_value();
        }
        
        if (!canceled) {
            Sys.TypeDescriptor.setProperty(_target, _property, value, _propertyKey);
        }
    }
    
    this.evaluateOut = function() {
        throw Error.createError('evaluateOut is not supported for this binding');
    }
    Sys.BindingBase.registerBaseMethod(this, 'evaluateOut');
    
    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();
        
        td.addProperty('automatic', Boolean);
        td.addProperty('dataContext', Object);
        td.addProperty('dataPath', String);
        td.addProperty('id', String);
        td.addProperty('property', String);
        td.addProperty('propertyKey', String);
        td.addProperty('transformerArgument', String);
        td.addEvent('transform', false);
        td.addMethod('evaluateIn');

        return td;
    }
    Sys.BindingBase.registerBaseMethod(this, 'getDescriptor');
    
    this.initialize = function(target) {
debug.assert(target);
        _target = target;

        _source = _dataContext;
        if (!_source) {
                                    _source = _target.get_dataContext();
        }
debug.assert(_source, String.format('No data context available for binding with ID "{0}" and dataPath "{1}" on object of type "{2}"', _id, _dataPath, Object.getTypeName(_target)));

        if (_dataPath && _dataPath.indexOf('.') > 0) {
            _dataPathParts = _dataPath.split('.');
        }
    }
    Sys.BindingBase.registerBaseMethod(this, 'initialize');
    
    this._evaluateDataPath = function() {
debug.assert(_dataPathParts);

        var object = _source;
        for (var i = 0; i < _dataPathParts.length - 1; i++) {
            object = Sys.TypeDescriptor.getProperty(object, _dataPathParts[i]);
            if (!object) {
                return null;
            }
        }
        return object;
    }
    
    this._get_dataPathParts = function() {
        return _dataPathParts;
    }
    
    this._getSource = function() {
        return _source;
    }
    
    this._getSourceValue = function(targetPropertyType) {
        if (_dataPath && _dataPath.length) {        
            var propertyObject = _source;
            var propertyName = _dataPath;
            
            if (_dataPathParts) {
                propertyObject = this._evaluateDataPath();
                if (propertyObject == null) {
                    return null;
                }
                propertyName = _dataPathParts[_dataPathParts.length - 1];
            }

            return Sys.TypeDescriptor.getProperty(propertyObject, propertyName);
        }
        if (_source && Sys.ICustomTypeDescriptor.isImplementedBy(_source)) {
            return _source.getProperty('');
        }
        return _source;
    }
    Sys.BindingBase.registerBaseMethod(this, '_getSourceValue');
    
    this._getTarget = function() {
        return _target;
    }

    this._getTargetValue = function(destinationType) {
        var value = Sys.TypeDescriptor.getProperty(_target, _property, _propertyKey);
        var canceled = false;

        if (this.transform.isActive()) {
            var be = new Sys.BindingEventArgs(value, Sys.BindingDirection.Out, destinationType, _transformerArgument);
        
            this.transform.invoke(this, be);
            canceled = be.get_canceled();
            if (!canceled) {
                value = be.get_value();
            }
            else {
                value = null;
            }
        }
        
        return value;
    }
}
Sys.BindingBase.registerAbstractClass('Sys.BindingBase', null, Sys.IDisposable, Sys.ITypeDescriptorProvider);

Sys.BindingBase.parseFromMarkup = function(type, node, markupContext) {
    var newBinding = new type();

    var builtInTransform;
    var transformAttribute = node.attributes.getNamedItem('transform');
    if (transformAttribute) {
        var transformValue = transformAttribute.nodeValue;
        builtInTransform = Sys.BindingBase.Transformers[transformValue];
    }
    if (builtInTransform) {
        newBinding.transform.add(builtInTransform);
        node.attributes.removeNamedItem('transform');
    }

    var binding = Sys.MarkupParser.initializeObject(newBinding, node, markupContext);
    if (builtInTransform) {
        node.attributes.setNamedItem(transformAttribute)
    }
    
    if (binding) {
        if (binding.get_id()) {
            markupContext.addObject(binding.get_id(), binding);
        }
        return binding;
    }
    else {
        newBinding.dispose();
    }

    return null;
}
Sys.BindingBase.Transformers = { };

Sys.BindingBase.Transformers.Invert = function(sender, eventArgs) {
    eventArgs.set_value(!eventArgs.get_value());
}

Sys.BindingBase.Transformers.ToString = function(sender, eventArgs) {
debug.assert(eventArgs.get_direction() == Sys.BindingDirection.In);

    var value = eventArgs.get_value();
    var newValue = '';
    var formatString = eventArgs.get_transformerArgument();
    var placeHolder = (formatString && (formatString.length != 0)) ? formatString.indexOf('{0}') : -1;

    if (placeHolder != -1) {
        newValue = String.format(formatString, value);
    }
    else if (value) {
        newValue = value.toString();
    }
    else {
        newValue = formatString;
    }

    eventArgs.set_value(newValue);
}

Sys.BindingBase.Transformers.ToLocaleString = function(sender, eventArgs) {
debug.assert(eventArgs.get_direction() == Sys.BindingDirection.In);

    var value = eventArgs.get_value();
    var newValue = '';
    var formatString = eventArgs.get_transformerArgument();
    var placeHolder = (formatString && (formatString.length != 0)) ? formatString.indexOf('{0}') : -1;

    if (placeHolder != -1) {
        newValue = String.localeFormat(formatString, value);
    }
    else if (value) {
        newValue = value.toLocaleString();
    }
    else {
        newValue = formatString;
    }

    eventArgs.set_value(newValue);
}

Sys.BindingBase.Transformers.Add = function(sender, eventArgs) {
    var value = eventArgs.get_value();
    if (typeof(value) != 'number') {
        value = Number.parse(value);
    }

    var delta = eventArgs.get_transformerArgument();
    if (!delta) {
        delta = 1;
    }
    if (typeof(delta) != 'number') {
        delta = Number.parse(delta);
    }

    if (eventArgs.get_direction() == Sys.BindingDirection.Out) {
        delta = -delta;
    }

    var newValue = value + delta;
    if (eventArgs.get_targetPropertyType() != 'number') {
        newValue = newValue.toString();
    }

    eventArgs.set_value(newValue);
}

Sys.BindingBase.Transformers.Multiply = function(sender, eventArgs) {
    var value = eventArgs.get_value();
    if (typeof(value) != 'number') {
        value = Number.parse(value);
    }

    var factor = eventArgs.get_transformerArgument();
    if (!factor) {
        factor = 1;
    }
    if (typeof(factor) != 'number') {
        factor = Number.parse(factor);
    }

    var newValue;
    if (eventArgs.get_direction() == Sys.BindingDirection.Out) {
        newValue = value / factor;
    }
    else {
        newValue = value * factor;
    }

    if (eventArgs.get_targetPropertyType() != 'number') {
        newValue = newValue.toString();
    }

    eventArgs.set_value(newValue);
}

Sys.BindingBase.Transformers.Compare = function(sender, eventArgs) {
debug.assert(eventArgs.get_direction() == Sys.BindingDirection.In);

    var value = eventArgs.get_value();
    var compareValue = eventArgs.get_transformerArgument();

    if (compareValue === null) {
        value = value ? true : false;
    }
    else {
        value = (value === compareValue);
    }

    eventArgs.set_value(value);
}

Sys.BindingBase.Transformers.CompareInverted = function(sender, eventArgs) {
debug.assert(eventArgs.get_direction() == Sys.BindingDirection.In);

    var value = eventArgs.get_value();
    var compareValue = eventArgs.get_transformerArgument();

    if (compareValue === null) {
        value = value ? false : true;
    }
    else {
        value = (value !== compareValue);
    }

    eventArgs.set_value(value);
}

Sys.BindingBase.Transformers.RSSTransform = function(sender, eventArgs) {
debug.assert(eventArgs.get_direction() == Sys.BindingDirection.In);

    function getNodeValue(source, xPath) {
        var node = source.selectSingleNode(xPath);
        if (node) {
            return node.nodeValue;
        }
        return null;
    }

    var xmlNodes = eventArgs.get_value();
    if (!xmlNodes) {
        return;
    }

                    var dataItems = new Sys.Data.DataTable([
        new Sys.Data.DataColumn('title', String, null, false, true),
        new Sys.Data.DataColumn('description', String, null, false, true),
        new Sys.Data.DataColumn('link', String, null, false, true),
        new Sys.Data.DataColumn('author', String, null, false, true),
        new Sys.Data.DataColumn('category', String, null, false, true),
        new Sys.Data.DataColumn('comments', String, null, false, true),
        new Sys.Data.DataColumn('guid', String, null, true, true),
        new Sys.Data.DataColumn('pubDate', String, null, false, true),
        new Sys.Data.DataColumn('source', String, null, false, true)
    ]);

        for (var i = 0; i < xmlNodes.length; i++) {
        var xmlNode = xmlNodes[i];
        if (!xmlNode || (xmlNode.nodeType != 1)) {
            continue;
        }

        var dataItem = {
            title : getNodeValue(xmlNode, './title/text()'),
            description : getNodeValue(xmlNode, './description/text()'),
            link : getNodeValue(xmlNode, './link/text()'),
            author : getNodeValue(xmlNode, './author/text()'),
            category : getNodeValue(xmlNode, './category/text()'),
            comments : getNodeValue(xmlNode, './comments/text()'),
            guid : getNodeValue(xmlNode, './guid/text()'),
            pubDate : getNodeValue(xmlNode, './pubDate/text()'),
            source : getNodeValue(xmlNode, './source/text()')
        };

        dataItems.add(dataItem);
    }

    eventArgs.set_value(dataItems);
}

Sys.Binding = function() {
    Sys.Binding.initializeBase(this);

    var _targetNotificationHandler;
    var _sourceNotificationHandler;

    var _direction = Sys.BindingDirection.In;
    
    this.get_direction = function() {
        return _direction;
    }
    this.set_direction = function(value) {
        if (!this._getSource()) {
            _direction = value;
        }
    }

    this.dispose = function() {
        if (_targetNotificationHandler) {
            var target = this._getTarget();
            target.propertyChanged.remove(_targetNotificationHandler);
            _targetNotificationHandler = null;
        }
        
        if (_sourceNotificationHandler) {
            var source = this._getSource();
            source.propertyChanged.remove(_sourceNotificationHandler);
            _sourceNotificationHandler = null;
        }
        
        Sys.Binding.callBaseMethod(this, 'dispose');
    }
    
    this.evaluateOut = function() {
        var propertyObject;
        var propertyName;
        
        var dataPathParts = this._get_dataPathParts();
        if (dataPathParts) {
            propertyObject = this._evaluateDataPath();
            propertyName = dataPathParts[dataPathParts.length - 1];
            
            if (!propertyObject) {
                return;
            }
        }
        else {
            propertyObject = this._getSource();
            propertyName = this.get_dataPath();
        }

debug.assert(propertyObject);

        var sourcePropertyType = Sys.TypeDescriptor.getPropertyType(propertyObject, propertyName);
        
        var value = this._getTargetValue(sourcePropertyType);
        if (value != null) {
            Sys.TypeDescriptor.setProperty(propertyObject, propertyName, value);
        }
    }
    
    this.getDescriptor = function() {
        var td = Sys.Binding.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('direction', Sys.BindingDirection);
        td.addMethod('evaluateOut');
        return td;
    }
    
    this.initialize = function(target) {
        Sys.Binding.callBaseMethod(this, 'initialize', [ target ]);
        
        if (this.get_automatic()) {
            if ((_direction != Sys.BindingDirection.In) &&
                Sys.INotifyPropertyChanged.isImplementedBy(target)) {
                _targetNotificationHandler = Function.createDelegate(this, this._onTargetPropertyChanged);
                target.propertyChanged.add(_targetNotificationHandler);
            }
            
            if (_direction != Sys.BindingDirection.Out) {
                var source = this._getSource();
                if (Sys.INotifyPropertyChanged.isImplementedBy(source)) {
                    _sourceNotificationHandler = Function.createDelegate(this, this._onSourcePropertyChanged);
                    source.propertyChanged.add(_sourceNotificationHandler);
                }

                this.evaluate(Sys.BindingDirection.In);
            }
        }
    }
    
    this._onSourcePropertyChanged = function(sender, eventArgs) {
debug.assert(_direction != Sys.BindingDirection.Out);
        
        var compareProperty = this.get_dataPath();
        var dataPathParts = this._get_dataPathParts();
        if (dataPathParts) {
            compareProperty = dataPathParts[0];
        }
        
        var propertyName = eventArgs.get_propertyName();
        if (!propertyName || (propertyName == compareProperty)) {
            this.evaluate(Sys.BindingDirection.In);
        }
    }
    
    this._onTargetPropertyChanged = function(sender, eventArgs) {
debug.assert(_direction != Sys.BindingDirection.In);
        
        var propertyName = eventArgs.get_propertyName();
        if (!propertyName || (propertyName == this.get_property())) {
            this.evaluate(Sys.BindingDirection.Out);
        }
    }
}
Sys.Binding.registerSealedClass('Sys.Binding', Sys.BindingBase);
Sys.TypeDescriptor.addType('script', 'binding', Sys.Binding);
Sys.XPathBinding = function() {
    Sys.XPathBinding.initializeBase(this);

    var _xpath;
    
    this.get_xpath = function() {
        return _xpath;
    }
    this.set_xpath = function(value) {
        if (!this._getSource()) {
            _xpath = value;
        }
    }

    this.getDescriptor = function() {
        var td = Sys.XPathBinding.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('xpath', String);
        return td;
    }
    
    this.initialize = function(target) {
        Sys.XPathBinding.callBaseMethod(this, 'initialize', [ target ]);
        
        if (this.get_automatic()) {
            this.evaluate(Sys.BindingDirection.In);
        }
    }
    
    this._getSourceValue = function(targetPropertyType) {
        var source = Sys.XPathBinding.callBaseMethod(this, '_getSourceValue');
        if (!source) {
            return null;
        }
                
        if (targetPropertyType == Sys.IArray) {
            var nodes = source.selectNodes(xpath);
            
                                                var list = [];
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                
                if (!node || (node.nodeType != 1)) {
                    continue;
                }
                list.add(node);
            }
            return list;
        }
        else {
            var node = source.selectSingleNode(_xpath);
            if (node) {
                return node.nodeValue;
            }
            return null;
        }
    }
}
Sys.XPathBinding.registerSealedClass('Sys.XPathBinding', Sys.BindingBase);
Sys.TypeDescriptor.addType('script', 'xpathBinding', Sys.XPathBinding);

Sys.Component = function(registerAsDisposable) {
    var _id = null;
    var _initialized = false;
    var _updating = false;
    
    var _bindings = null;
    var _dataContext = null;
    
    var _events = [];

    if (registerAsDisposable) {
        Sys.Runtime.registerDisposableObject(this);
    }

    this.get_bindings = function() {
        if (!_bindings) {
            _bindings = [];
        }
        return _bindings;
    }

    this.get_dataContext = function() {
        return _dataContext;
    }
    Sys.Component.registerBaseMethod(this, 'get_dataContext');
    
    this.set_dataContext = function(value) {
        _dataContext = value;
    }

    this.get_id = function() {
        return _id;
    }
    this.set_id = function(value) {
        _id = value;
    }
    
    this.get_isInitialized = function() {
        return _initialized;
    }
    
    this.get_isUpdating = function() {
        return _updating;
    }

    this.createEvent = function(autoInvoke) {
        var eventObject = new Type.Event(this, autoInvoke);
        _events.add(eventObject);
        
        return eventObject;
    }

    this.propertyChanged = this.createEvent();
    
    this.beginUpdate = function() {
        _updating = true;
    }
    
    this.dispose = function() {
        if (_bindings) {
            for (var i = 0; i < _bindings.length; i++) {
                _bindings[i].dispose();
                _bindings[i] = null;
            }
            _bindings = null;
        }
        
        if (_events) {
            for (var e = _events.length - 1; e >= 0; e--) {
                _events[e].dispose();
                _events[e] = null;
            }
            _events = null;
        }
        
        Sys.Runtime.unregisterDisposableObject(this);
            }
    Sys.Component.registerBaseMethod(this, 'dispose');
    
    this.endUpdate = function() {
        _updating = false;
        if (!_initialized) {
            this.initialize();
        }
        this.updated();
    }

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();
        
        td.addProperty('bindings', Array, true);
        td.addProperty('dataContext', Object);
        td.addProperty('id', String);
        td.addProperty('isInitialized', Boolean, true);
        td.addProperty('isUpdating', Boolean, true);
        td.addEvent('propertyChanged', true);
        return td;
    }
    Sys.Component.registerBaseMethod(this, 'getDescriptor');
    
    this.initialize = function() {
        if (_bindings) {
            for (var i = 0; i < _bindings.length; i++) {
                _bindings[i].initialize(this);
            }
        }
        
        _initialized = true;
    }
    Sys.Component.registerBaseMethod(this, 'initialize');

    this.raisePropertyChanged = function(propertyName) {
        this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs(propertyName));
    }
    Sys.Component.registerBaseMethod(this, 'raisePropertyChanged');

    this.updated = function() {
    }
    Sys.Component.registerBaseMethod(this, 'updated');
}
Sys.Component.registerAbstractClass('Sys.Component', null, Sys.IDisposable, Sys.ITypeDescriptorProvider, Sys.ISupportBatchedUpdates, Sys.INotifyPropertyChanged);

Sys.Component.parseFromMarkup = function(type, node, markupContext) {
    var newComponent = Type.createInstance(type);
    
                                    var dataContextHidden = false;
    var dataContext = markupContext.get_dataContext();
    if (dataContext) {
        dataContextHidden = markupContext.hideDataContext();
    }

    var component = Sys.MarkupParser.initializeObject(newComponent, node, markupContext);
    if (component) {
        if (component.get_id()) {
            markupContext.addObject(component.get_id(), component);
        }
        if (dataContext) {
            component.set_dataContext(dataContext);
        }
    }
    else {
        newComponent.dispose();
    }
    
        if (dataContextHidden) {
        markupContext.restoreDataContext();
    }

    return component;
}

Sys.Component.createCollection = function(component) {
    var collection = [];
    collection._component = component;

    collection.collectionChanged = new Type.Event(collection);
    
    collection._add = collection.add;
    collection.add = function(item) {
        this._add(item);
        item.setOwner(this._component);
        this.collectionChanged.invoke(this, new Sys.CollectionChangedEventArgs(Sys.NotifyCollectionChangedAction.Add, item));
    }
    
    collection._clear = collection.clear;
    collection.clear = function() {
        for (var i = this.length - 1; i >= 0; i--) {
            this[i].dispose();
            this[i] = null;
        }
        this._clear();
        this.collectionChanged.invoke(this, new Sys.CollectionChangedEventArgs(Sys.NotifyCollectionChangedAction.Reset, null));
    }

    collection.dispose = function() {
        this.clear();
        this._component = null;
    }
    
    collection._remove = collection.remove;
    collection.remove = function(item) {
        item.dispose();
        this._remove(item);
        this.collectionChanged.invoke(this, new Sys.CollectionChangedEventArgs(Sys.NotifyCollectionChangedAction.Remove, item));
    }
    
    collection._removeAt = collection.removeAt;
    collection.removeAt = function(index) {
        var item = this[index];
        item.dispose();
        this._removeAt(index);
        this.collectionChanged.invoke(this, new Sys.CollectionChangedEventArgs(Sys.NotifyCollectionChangedAction.Remove, item));
    }
    
    return collection;
}

Sys.Reference = function() {

    var _component;
    var _onload;
    
    this.get_component = function() {
        return _component;
    }
    this.set_component = function(value) {
        _component = value;
    }
    
    this.get_onscriptload = function() {
        return _onload;
    }
    this.set_onscriptload = function(value) {
        _onload = value;
    }
    
    this.dispose = function() {
        _component = null;
    }
    
    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();
        
        td.addProperty('component', Object);
        td.addProperty('onscriptload', String);
        return td;
    }
}
Sys.Reference.registerSealedClass('Sys.Reference', null, Sys.ITypeDescriptorProvider, Sys.IDisposable);
Sys.TypeDescriptor.addType('script', 'reference', Sys.Reference);


Sys.Reference.parseFromMarkup = function(type, node, markupContext) {
    var newReference = new Sys.Reference();

    var reference = Sys.MarkupParser.initializeObject(newReference, node, markupContext);
    if (reference) {
        return reference;
    }
    else {
        newReference.dispose();
    }

    return null;
}

Sys.Action = function() {
    Sys.Action.initializeBase(this, [false]);
    
    var _eventSource;
    var _eventArgs;
    var _result;
    
    var _target;
    var _sequence = Sys.ActionSequence.BeforeEventHandler;

    this.get_dataContext = function() {
        return this;
    }
    
    this.get_eventArgs = function() {
        return _eventArgs;
    }
    
    this.get_result = function() {
        return _result;
    }
    
    this.get_sequence = function() {
        return _sequence;
    }
    this.set_sequence = function(value) {
        _sequence = value;
    }
    
    this.get_sender = function() {
        return _eventSource;
    }

    this.get_target = function() {
        return _target;
    }
    this.set_target = function(value) {
        _target = value;
    }

    this.dispose = function() {
        _target = null;
        _eventSource = null;

        Sys.Action.callBaseMethod(this, 'dispose');
    }
    Sys.Action.registerBaseMethod(this, 'dispose');
    
    this.execute = function(sender, eventArgs) {
        _eventArgs = eventArgs;
        
        var bindings = this.get_bindings();
        var i;
        for (i = 0; i < bindings.length; i++) {
            bindings[i].evaluateIn();
        }
        
        _result = this.performAction();

        for (i = 0; i < bindings.length; i++) {
            bindings[i].evaluateOut();
        }
        
        _eventArgs = null;
        _result = null;
    }
    
    this.getDescriptor = function() {
        var td = Sys.Action.callBaseMethod(this, 'getDescriptor');

        td.addProperty('eventArgs', Sys.EventArgs, true);
        td.addProperty('result', Object, true);
        td.addProperty('sender', Object, true);
        td.addProperty('sequence', Sys.ActionSequence);
        td.addProperty('target', Object);
        return td;
    }
    Sys.Action.registerBaseMethod(this, 'getDescriptor');
    
    this.initialize = function() {
        var bindings = this.get_bindings();
        for (var i = 0; i < bindings.length; i++) {
            bindings[i].set_automatic(false);
        }
        
        Sys.Action.callBaseMethod(this, 'initialize');
    }

    this.setOwner = function(eventSource) {
        _eventSource = eventSource;
                                                            }
}
Sys.Action.registerAbstractClass('Sys.Action', Sys.Component, Sys.IAction);

Sys.Action.parseFromMarkup = function(type, node, markupContext) {
    var newAction = Type.createInstance(type);
    
    var action = Sys.MarkupParser.initializeObject(newAction, node, markupContext);
    if (action) {
        if (action.get_id()) {
            markupContext.addObject(action.get_id(), action);
        }
        return action;
    }
    else {
        newAction.dispose();
    }

    return null;
}
Sys.InvokeMethodAction = function() {
    Sys.InvokeMethodAction.initializeBase(this);
    
    var _method;
    var _parameters;
    
    this.get_method = function() {
        return _method;
    }
    this.set_method = function(value) {
        _method = value;
    }
    
    this.get_parameters = function() {
        if (!_parameters) {
            _parameters = { };
        }
        return _parameters;
    }

    this.getDescriptor = function() {
        var td = Sys.InvokeMethodAction.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('method', String);
        td.addProperty('parameters', Object, true);
        return td;
    }
    
    this.performAction = function() {
        return Sys.TypeDescriptor.invokeMethod(this.get_target(), _method, _parameters);
    }
}
Sys.InvokeMethodAction.registerSealedClass('Sys.InvokeMethodAction', Sys.Action);
Sys.TypeDescriptor.addType('script', 'invokeMethod', Sys.InvokeMethodAction);

Sys.SetPropertyAction = function() {
    Sys.SetPropertyAction.initializeBase(this);
    
    var _property;
    var _propertyKey;
    var _value;
    
    this.get_property = function() {
        return _property;
    }
    this.set_property = function(value) {
        _property = value;
    }
    
    this.get_propertyKey = function() {
        return _propertyKey;
    }
    this.set_propertyKey = function(value) {
        _propertyKey = value;
    }
    
    this.get_value = function() {
        return _value;
    }
    this.set_value = function(value) {
        _value = value;
    }

    this.getDescriptor = function() {
        var td = Sys.SetPropertyAction.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('property', String);
        td.addProperty('propertyKey', String);
        td.addProperty('value', String);
        return td;
    }
    
    this.performAction = function() {
        Sys.TypeDescriptor.setProperty(this.get_target(), _property, _value, _propertyKey);
        return null;
    }
}
Sys.SetPropertyAction.registerSealedClass('Sys.SetPropertyAction', Sys.Action);
Sys.TypeDescriptor.addType('script', 'setProperty', Sys.SetPropertyAction);


Sys.Timer = function() {
    Sys.Timer.initializeBase(this, [true]);
    
    var _interval = 1000;
    var _enabled;
    var _timer = null;
    
    this.getDescriptor = function() {
        var td = Sys.Timer.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('interval', Number);
        td.addProperty('enabled', Boolean);
        td.addEvent('tick', true);
        return td;
    }
    
    this.get_interval = function() {
        return _interval;
    }
    this.set_interval = function(value) {
        if (_interval != value) {
            _interval = value;
            this.raisePropertyChanged('interval');
            
            if (!this.get_isUpdating() && (_timer != null)) {
                stopTimer();
                startTimer(this);
            }
        }
    }
    
    this.get_enabled = function() {
        return _enabled;
    }
    this.set_enabled = function(value) {
        if (value != this.get_enabled()) {
            _enabled = value;
            this.raisePropertyChanged('enabled');
            if (!this.get_isUpdating()) {
                if (value) {
                    startTimer(this);
                }
                else {
                    stopTimer();
                }
            }
        }
    }

    this.tick = this.createEvent();

    this.dispose = function() {
        this.set_enabled(false);
        stopTimer();
        
        Sys.Timer.callBaseMethod(this, 'dispose');
    }
    
    this.updated = function() {
        Sys.Timer.callBaseMethod(this, 'updated');

        if (_enabled) {
            stopTimer();
            startTimer(this);
        }
    }

    function _timerCallback(context) {
        context.tick.invoke(context, Sys.EventArgs.Empty);
    }

    function startTimer(instance) {
        _timer = window.setInterval(Function.createCallback(_timerCallback, instance),
                                    _interval);
    }

    function stopTimer() {
        window.clearInterval(_timer);
        _timer = null;
    }
}
Sys.Timer.registerSealedClass('Sys.Timer', Sys.Component);
Sys.TypeDescriptor.addType('script', 'timer', Sys.Timer);

Sys.Counter = function() {
    Sys.Counter.initializeBase(this, [false]);
    
    var _value = 0;
    var _lowerBound = Number.NaN;
    var _upperBound = Number.NaN;
    
    this.getDescriptor = function() {
        var td = Sys.Counter.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('value', Number);
        td.addProperty('lowerBound', Number);
        td.addProperty('upperBound', Number);
        td.addProperty('canDecrement', Boolean, true);
        td.addProperty('canIncrement', Boolean, true);
        td.addMethod('increment');
        td.addMethod('decrement');
        return td;
    }
    
    this.get_canDecrement = function() {
        return isNaN(_lowerBound) || (_value > _lowerBound);
    }
    
    this.get_canIncrement = function() {
        return isNaN(_upperBound) || (_value < _upperBound);
    }
    
    this.get_lowerBound = function() {
        return _lowerBound;
    }
    this.set_lowerBound = function(value) {
        if ((isNaN(value) && isNaN(_lowerBound)) || (value == _lowerBound)) return;
        var oldCanDecrement = this.get_canDecrement();
        _lowerBound = value;
        this.raisePropertyChanged('lowerBound');
        if (oldCanDecrement != this.get_canDecrement()) {
            this.raisePropertyChanged('canDecrement');
        }
    }
    
    this.get_upperBound = function() {
        return _upperBound;
    }
    this.set_upperBound = function(value) {
        if ((isNaN(value) && isNaN(_upperBound)) || (value == _upperBound)) return;
        var oldCanIncrement = this.get_canIncrement();
        _upperBound = value;
        this.raisePropertyChanged('upperBound');
        if (oldCanIncrement != this.get_canIncrement()) {
            this.raisePropertyChanged('canIncrement');
        }
    }
    
    this.get_value = function() {
        return _value;
    }
    this.set_value = function(value) {
        if ((isNaN(_lowerBound) || (value >= _lowerBound)) &&
            (isNaN(_upperBound) || (value <= _upperBound)) && (_value != value)) {
            var oldCanDecrement = this.get_canDecrement();
            var oldCanIncrement = this.get_canIncrement();
            _value = value;
            this.raisePropertyChanged('value');
            if (oldCanDecrement != this.get_canDecrement()) {
                this.raisePropertyChanged('canDecrement');
            }
            if (oldCanIncrement != this.get_canIncrement()) {
                this.raisePropertyChanged('canIncrement');
            }
        }
    }
    
    this.decrement = function() {
        this.set_value(_value - 1);
    }
    
    this.increment = function() {
        this.set_value(_value + 1);
    }
}
Sys.Counter.registerSealedClass('Sys.Counter', Sys.Component);
Sys.TypeDescriptor.addType('script', 'counter', Sys.Counter);

Sys.ITask = function() {
        this.execute = Function.abstractMethod;
}
Sys.ITask.registerInterface('Sys.ITask');


Sys._TaskManager = function() {

    var _tasks = [];
    var _timeoutCookie;
    var _timeoutHandler;

    Sys.Runtime.registerDisposableObject(this);

    this.addTask = function(task) {
debug.assert(Sys.IDisposable.isImplementedBy(task), 'The task must implement IDisposable');

        _tasks.queue(task);
        this._startTimeout();
    }

    this.dispose = function() {
        if (_timeoutCookie) {
            window.clearTimeout(_timeoutCookie);
        }

        if (_tasks && _tasks.length) {
            for (var i = _tasks.length - 1; i >= 0; i--) {
                _tasks[i].dispose();
            }
        }
        _tasks = null;

        _timeoutHandler = null;

        Sys.Runtime.unregisterDisposableObject(this);
    }

    this._onTimeout = function() {
        _timeoutCookie = 0;

                var task = _tasks.dequeue();
        if (!task.execute()) {
                        _tasks.queue(task);
        }

                if (_tasks.length) {
            this._startTimeout();
        }
    }

    this._startTimeout = function() {
        if (!_timeoutCookie) {
            if (!_timeoutHandler) {
                _timeoutHandler = Function.createDelegate(this, this._onTimeout);
            }
            _timeoutCookie = window.setTimeout(_timeoutHandler,  0);
        }
    }
}
Sys._TaskManager.registerSealedClass('Sys._TaskManager', null, Sys.IDisposable);

Sys.TaskManager = new Sys._TaskManager();


Type.registerNamespace('Sys.Serialization');


Sys.Serialization.JSON = new function() {

    function serializeWithBuilder(object, stringBuilder) {
        var i;
        
        switch (typeof object) {
        case 'object':
            if (object) {
                                if (Array.isInstanceOfType(object)) {
                    stringBuilder.append('[');
                    for (i = 0; i < object.length; ++i) {
                        if (i > 0) {
                            stringBuilder.append(',');
                        }
                        stringBuilder.append(serializeWithBuilder(object[i], stringBuilder));
                    }
                    stringBuilder.append(']');
                } 
                                else {
                                        if (typeof object.serialize == 'function') {
                        stringBuilder.append(object.serialize());
                        break;
                    }
                
                    stringBuilder.append('{');
                    var needComma = false;
                    for (var name in object) {

                                                if (name.startsWith('$')) {
                            continue;
                        }

                        var value = object[name];
                        if (typeof value != 'undefined' && typeof value != 'function') {
                            if (needComma) {
                                stringBuilder.append(',');
                            }
                            else {
                                needComma = true;
                            }
             
                                                        stringBuilder.append(serializeWithBuilder(name, stringBuilder));
                            stringBuilder.append(':');
                            stringBuilder.append(serializeWithBuilder(value, stringBuilder));
                        }
                    }
                    stringBuilder.append('}');
                }
            }
            else {
                stringBuilder.append('null');
            }
            break;
            
        case 'number':
            if (isFinite(object)) {
                stringBuilder.append(String(object));
            }
                        else {
                stringBuilder.append('null');
            }
            break;
            
        case 'string':
            stringBuilder.append('"');
            var length = object.length;
            for (i = 0; i < length; ++i) {
                var curChar = object.charAt(i);
                                                if (curChar >= ' ') {
                                        if (curChar == '\\' || curChar == '"') {
                        stringBuilder.append('\\');
                    }
                    stringBuilder.append(curChar);
                }
                else {
                                        switch (curChar) {
                        case '\b':
                            stringBuilder.append('\\b');
                            break;
                        case '\f':
                            stringBuilder.append('\\f');
                            break;
                        case '\n':
                            stringBuilder.append('\\n');
                            break;
                        case '\r':
                            stringBuilder.append('\\r');
                            break;
                        case '\t':
                            stringBuilder.append('\\t');
                            break;
                        default:
                                                        stringBuilder.append('\\u00');
                            stringBuilder.append(curChar.charCodeAt().toString(16));
                    }
                }
            }
            stringBuilder.append('"');
            break;
 
        case 'boolean':
            stringBuilder.append(object.toString());
            break;
 
        default:
            stringBuilder.append('null');
            break;
        }
    }

    this.serialize = function(object) { 
        var stringBuilder = new Sys.StringBuilder();
        serializeWithBuilder(object, stringBuilder);
        return stringBuilder.toString();
    }

    this.deserialize = function(data) {
        return eval('(' + data + ')');
    }
}

Date.prototype.serialize = function() {
    var stringBuilder = new Sys.StringBuilder();

    stringBuilder.append('new Date(');
    stringBuilder.append(Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds(), this.getUTCMilliseconds()));
    stringBuilder.append(')');

    return stringBuilder.toString();
}

Type.registerNamespace('Sys.Net');

Sys.Net.WebRequestExecutor = function() {
    var _webRequest = null;
    var _resultObject = null;
    var _resultXml = null;
    
    this.get_webRequest = function() {
        return _webRequest;
    }
    this.set_webRequest = function(value) {
        _webRequest = value;
    }

    this.get_userContext = function() {
        return _webRequest.get_userContext();
    }
    
    this.executeRequest = Function.abstractMethod;
    this.abort = Function.abstractMethod;

    this.get_isActive = Function.abstractMethod;
    this.get_isComplete = Function.abstractMethod;
    this.get_timedOut = Function.abstractMethod;
    this.get_data = Function.abstractMethod;
    this.get_statusCode = Function.abstractMethod;
    this.get_statusText = Function.abstractMethod;

    this.get_object = function() {
        if (!_resultObject) {
            _resultObject = Sys.Serialization.JSON.deserialize(this.get_data());
        }
        return _resultObject;
    }

    this.get_xml = function() {
        if (!_resultXml) {
            _resultXml = new XMLDOM(this.get_data());

                        if (!_resultXml || !_resultXml.documentElement)
                return null;
        }
        
        return _resultXml;
    }
    Sys.Net.WebRequestExecutor.registerBaseMethod(this, 'get_xml');
}
Sys.Net.WebRequestExecutor.registerAbstractClass('Sys.Net.WebRequestExecutor');

Type.createEnum('Sys.Net.WebRequestExecutorType', 'XmlHttp', 0, 'IFrame', 1);
Sys.Net.XMLHttpExecutor = function() {
    Sys.Net.XMLHttpExecutor.initializeBase(this);
    
    var _this = this;
    var _xmlHttpRequest = null;
    var _webRequest = null;
    var _isComplete = false;
    var _timedOut = false;
    var _timer = null;
    
    this.get_timedOut = function() {
        return _timedOut;    
    }
    
    this.get_isActive = function() {
        return _xmlHttpRequest != null;
    }

    this.get_isComplete = function() {
        return _isComplete;
    }

    this.executeRequest = function() {
        
        _webRequest = this.get_webRequest();
        var body = _webRequest.get_body();
        var headers = _webRequest.get_headers();
        
        _xmlHttpRequest = new XMLHttpRequest();
        _xmlHttpRequest.onreadystatechange = onReadyStateChange;
        
        if (body != null) {
            _xmlHttpRequest.open('POST', _webRequest.get_resolvedUrl(), true );
            
                        if ((headers == null) || !headers['Content-Type']) {
                _xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        else {
            _xmlHttpRequest.open('GET', _webRequest.get_resolvedUrl(), true  );
        }
        
        if (headers != null) {
            for (var header in headers) {
                var val = headers[header];
                if (typeof(val) != "function")
                    _xmlHttpRequest.setRequestHeader(header, val);
            }
        }

        var timeoutInterval = _webRequest.get_timeoutInterval();
        if (timeoutInterval > 0) {
            _timer = window.setTimeout(Function.createDelegate(this, onTimeout), timeoutInterval);
        }

        _xmlHttpRequest.send(body);
    }

    this.get_data = function() {
        return _xmlHttpRequest.responseText;
    }
    
    this.get_statusCode = function() {
        return _xmlHttpRequest.status;
    }
    
    this.get_statusText = function() {
        return _xmlHttpRequest.statusText;
    }
    
    this.get_xml = function() {
        var xml = _xmlHttpRequest.responseXML;
        if (!xml || !xml.documentElement) {
                        xml = new XMLDOM(_xmlHttpRequest.responseText);
            
                        if (!xml || !xml.documentElement)
                return null;
        }
        else if (Sys.Runtime.get_hostType() == Sys.HostType.InternetExplorer) {
            xml.setProperty('SelectionLanguage', 'XPath');
        }
        return xml;
    }
    
    function onReadyStateChange() {
        
        if (_xmlHttpRequest.readyState == 4 ) {

            ClearTimer();
                        
            _isComplete = true;
            
            if (_webRequest.completed != null)
                _webRequest.completed.invoke(_this, null);
            
            cleanupXmlHttpRequest();
        }
    }
    
    function ClearTimer() {
        if (_timer != null) {
            window.clearTimeout(_timer);
            _timer = null;
        }    
    }
    
    function onTimeout() {
        if (!_isComplete) {
            ClearTimer();

            _timedOut = true;
            _isComplete = true;
        
            _xmlHttpRequest.onreadystatechange = Function.emptyMethod;
            _xmlHttpRequest.abort();
        
            _webRequest.timeout.invoke(_webRequest, null);
            
            _xmlHttpRequest = null;
        }
    }
        
    this.abort = function() {
        ClearTimer();

        if (_xmlHttpRequest != null && !_isComplete) {
        
                        _xmlHttpRequest.onreadystatechange = Function.emptyMethod;            
            _xmlHttpRequest.abort();

            _xmlHttpRequest = null;
            _webRequest.aborted.invoke(_webRequest, null);
        }
    }
    
    function cleanupXmlHttpRequest() {
        if (_xmlHttpRequest != null) {
            _xmlHttpRequest.onreadystatechange = Function.emptyMethod;
            _xmlHttpRequest = null;
        }
    }
}
Sys.Net.XMLHttpExecutor.registerClass('Sys.Net.XMLHttpExecutor', Sys.Net.WebRequestExecutor);
Sys.Net.IFrameExecutor = function() {
    Sys.Net.IFrameExecutor.initializeBase(this);

        if (!Sys.Net.IFrameManager) {
        Sys.Net.IFrameManager = new Sys.Net._IFrameManager();
    }

    var _this = this;
    var _webRequest = null;
    var _isComplete = false;
    var _responseData;
    var _iframe;
    var _loaded = false;
    var _timer = null;
    
        var _base64Table = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O',
                        'P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d',
                        'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
                        't','u','v','w','x','y','z','0','1','2','3','4','5','6','7',
                        '8','9','-','_','=' ];

    this.get_isActive = function() {
        return _iframe != null;
    }

    this.get_isComplete = function() {
        return _isComplete;
    }

    this.executeRequest = function() {
                Sys.Net.IFrameManager.getAvailableIFrame(Function.createDelegate(this, executeRequestInternal));
    }
    
    function URLTokenEncode(input) {
        var bytes = new Array();
        var result = "";        
        
                for (var index = 0; index < input.length; index++) {
            var charCode = input.charCodeAt(index);
            
            if (charCode < 0x000080) {
                bytes.push(charCode);
            }
            else if (charCode < 0x000800) {
                bytes.push(0xc0 | charCode >> 6);
                bytes.push(0x80 | charCode & 0x3f);
            }
            else if (charCode < 0x010000) {
                bytes.push(0xe0 | charCode >> 12);
                bytes.push(0x80 | ((charCode & 0xfff) >> 6));
                bytes.push(0x80 | charCode & 0x3f);
            }
            else {
                bytes.push(0xf0 | charCode >> 18);
                bytes.push(0x80 | ((charCode & 0x3ffff) >> 12));
                bytes.push(0x80 | ((charCode & 0xfff) >> 6));
                bytes.push(0x80 | charCode & 0x3f);
            }
        }

                var i = 0;
        
                while (i < bytes.length - 2) {
            var i1 = bytes[i++];
            var i2 = bytes[i++];
            var i3 = bytes[i++];

            result += _base64Table[i1 >> 2];
            result += _base64Table[(i1 & 0x03) << 4 | i2 >> 4];
            result += _base64Table[(i2 & 0x0f) << 2 | i3 >> 6];
            result += _base64Table[i3 & 0x3f];
        }
        
                switch (bytes.length - i) {
            case 2 :
                var i1 = bytes[i++];
                var i2 = bytes[i++];
            
                result += _base64Table[i1 >> 2];
                result += _base64Table[(i1 & 0x03) << 4 | i2 >> 4];
                result += _base64Table[(i2 & 0x0f) << 2];
                result += '1';
                break;

            case 1:
                var i1 = bytes[i++];
            
                result += _base64Table[i1 >> 2];
                result += _base64Table[(i1 & 0x03) << 4];
                result += '2';
                break;
                
            case 0:
                result += '0';
        }        
        
        return result;
    }

    function executeRequestInternal(iframe) {
        _webRequest = this.get_webRequest();
        _iframe = iframe;

        var requestData = {
            headers: _webRequest.get_headers(),
            uri: _webRequest.get_resolvedUrl(),
            body: _webRequest.get_body()
        };

                var appUrl = Sys.Net.WebRequest.resolveUrl(_webRequest.get_appUrl());
        var queryString = {data:Sys.Serialization.JSON.serialize(requestData)};
        var url = appUrl + "iframecall.axd" + '?' + Sys.Net.WebRequest.createQueryString(queryString, URLTokenEncode);
            
        var frameDoc = _iframe.document;

                frameDoc.open("about:blank", "_self", "", true );

                        frameDoc.write();
        _iframe.__exec = this;
        
        frameDoc.write('<SCRIPT id="script" src="' + url + '"></SCRIPT>');
        
        var scriptElement = frameDoc.getElementById("script");

        var timeoutInterval = _webRequest.get_timeoutInterval();
        if (timeoutInterval > 0) {
            _timer = window.setTimeout(Function.createDelegate(this, onTimeout), timeoutInterval);
        }
        
        function onScriptLoaded() {
            if (scriptElement.readyState == 'complete' || scriptElement.readyState == 'loaded') {
                _loaded = true;
                
                                                                if (!_isComplete) {
                    _this.onMethodComplete({
                        content: "A web request made using the iframe executor failed. Make sure that the app's web.config registers iframecall.axd in its <httpHandlers>.",
                        status: 500});
                }
            }
        }

        if (Sys.Runtime.get_hostType() != Sys.HostType.InternetExplorer) {
            scriptElement.readyState = 'loaded';
            scriptElement.onload = onScriptLoaded;
        }
        else {
            scriptElement.onreadystatechange = onScriptLoaded;
        }
        
        frameDoc.close();
    }

    this.get_data = function() {
        if (_responseData) {
            return _responseData.content;
        }

debug.assert(_isComplete, "Request is not completed yet.");

        return null;
    }
    
    this.get_statusCode = function() {
        if (_responseData) {
            return _responseData.status;
        }

debug.assert(_isComplete, "Request is not completed yet.");

        if (_timedOut) {
                        if (_loaded) {
                                return 500;
            }

                        return 408;
        }
    }
    
    this.get_statusText = function() {
                return "Status text not available";
    }
    
    this.abort = function() {
        ClearTimer();

        if (_iframe != null && !_isComplete) {
        
            releaseIFrame();
            
            _webRequest.aborted.invoke(_webRequest, null);
        }
    }

    this.onMethodComplete = function(responseData) {

                        if (!_iframe) {
            return;
        }
        
        releaseIFrame();

        _responseData = responseData;

        _isComplete = true;
        
        if (_webRequest.completed != null) {
            _webRequest.completed.invoke(_this, null);
        }

        ClearTimer();
    }

    function ClearTimer() {
        if (_timer != null) {
            window.clearTimeout(_timer);
            _timer = null;
        }    
    }

    function onTimeout() {
        releaseIFrame();
            
        if (!_isComplete) {
            ClearTimer();

            _timedOut = true;
            _isComplete = true;

            _webRequest.timeout.invoke(_webRequest, null);
        }
    }
    
        function releaseIFrame() {
        if (_iframe != null) {
            Sys.Net.IFrameManager.releaseIFrame(_iframe);
            _iframe = null;
        }
    }
}
Sys.Net.IFrameExecutor.registerClass('Sys.Net.IFrameExecutor', Sys.Net.WebRequestExecutor);

Sys.Net._IFrameManager = function() {

    var _iframes;
    var _waitingQueue = new Array();
    var _frames = 2;
    
    this.get_frames = function() {
        return _frames;
    }
    
    this.set_frames = function(value) {
        _frames = value;
    }
    
    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();

        td.addProperty('frames', Number);
        return td;
    }
    
    this.getAvailableIFrame = function(callback) {
    
                var iframe = findAvailableIFrame();
        
                if (iframe != null) {
            callback(iframe);
            return true;
        }
        
                _waitingQueue.add(callback);
        return false;
    }

    this.releaseIFrame = function(iframe) {

                iframe._available = true;
        
                        if (_waitingQueue.length > 0) {
            window.setTimeout(Function.createDelegate(this, processNextItemInQueue), 0);
        }
    }
    
    function processNextItemInQueue() {
        if (_waitingQueue.length == 0)
            return;
        
        var iframe = findAvailableIFrame();
        if (iframe != null) {
                        callback = _waitingQueue.dequeue();
            callback(iframe);
        }
    }

    function findAvailableIFrame() {
    
                ensureIFramesCreated();

                for (var i=0; i<_iframes.length; i++) {
            if (_iframes[i]._available) {
                                _iframes[i]._available = false;
                return _iframes[i];
            }
        }

                return null;
    }

    function ensureIFramesCreated() { 
    
                if (_iframes)
            return;
            
                _iframes = new Array();
        for (var i=0; i<_frames; i++) {
            _iframes[i] = createIFrame();
            _iframes[i]._available = true;
        }
    }
    
    function createIFrame() { 
        var iframe = document.createElement("iframe"); 
        iframe.setAttribute("width", 0); 
        iframe.setAttribute("height", 0); 
        iframe.style.visibility = "hidden";
        
                var frameCount = window.frames.length;
        document.body.appendChild(iframe);

        return window.frames[frameCount];
    } 
}

Sys.Net._IFrameManager.registerSealedClass('Sys.Net._IFrameManager', null, Sys.ITypeDescriptorProvider);
Sys.TypeDescriptor.addType('script', 'iframemanager', Sys.Net._IFrameManager);

Sys.Net._IFrameManager.parseFromMarkup = function(type, node, markupContext) {
    if (!markupContext.get_isGlobal()) {
        return null;
    }
    
        if (!Sys.Net.IFrameManager) {
        Sys.Net.IFrameManager = new Sys.Net._IFrameManager();
    }
        
    Sys.MarkupParser.initializeObject(Sys.Net.IFrameManager, node, markupContext);
    return Sys.Net.IFrameManager;
}
Sys.Net._WebRequestManager = function() {

    var _requestQueue = new Object();
    var _batchDelay = 500;
    var _timeoutInterval = 0;
    var _executorType = Sys.Net.XMLHttpExecutor;
    var _enableBatching = false;
    var _batchSize = 5;
    var _defaultAppUrl = document.URL.substr(0, document.URL.lastIndexOf('/') + 1);
    var _defaultDomain = getDomainFromUrl(document.URL);

    this.get_batchDelay = function() {
        return _batchDelay;
    }
    
    this.set_batchDelay = function(value) {
        _batchDelay = value;
    }
    
    this.get_timeoutInterval = function() {
        return _timeoutInterval;
    }

    this.set_timeoutInterval = function(value) {
        _timeoutInterval = value;
    }

    this.get_enableBatching = function() {
        return _enableBatching;
    }
    
    this.set_enableBatching = function(value) {
        _enableBatching = value;
    }
    
    this.get_batchSize = function() {
        return _batchSize;
    }

    this.set_batchSize = function(value) {
        _batchSize = value;
    }
    
    this.get_executorType = function() {
        return _executorType;
    }
    this.set_executorType = function(value) {
        switch (value) {
        case Sys.Net.WebRequestExecutorType.XmlHttp:
            _executorType = Sys.Net.XMLHttpExecutor;
            break;
            
        case Sys.Net.WebRequestExecutorType.IFrame:
            _executorType = Sys.Net.IFrameExecutor;
            break;

        default:
debug.assert(false, "set_executorType");
        }
    }
    
    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();

        td.addProperty('batchDelay', Number);
        td.addProperty('timeoutInterval', Number);
        td.addProperty('enableBatching', Boolean);
        td.addProperty('batchSize', Number);
        td.addProperty('executorType', Sys.Net.WebRequestExecutorType);
        return td;
    }
    
    this.enqueue = function(webRequest) {
                if (webRequest.get_aborted() == true) {
            return;
        }
        
        if (!_enableBatching || webRequest.get_priority() == Sys.Net.WebRequestPriority.High) {
                        executeRequest(webRequest);
        }
        else {
            var appUrl = Sys.Net.WebRequest.resolveUrl(webRequest.get_appUrl());

                        appUrl = appUrl.toLowerCase();

            var queueInfo = _requestQueue[appUrl];
                        if (!queueInfo) {
                queueInfo = new Object();
                queueInfo.queue = new Array();
                queueInfo.appUrl = appUrl;
                _requestQueue[appUrl] = queueInfo;
            }

            var queue = queueInfo.queue;
            
                        queue.add(webRequest);

            if (queue.length >= _batchSize) {
                                sendBatchedRequests(queueInfo);
            }
            else if (queue.length == 1) {
            
                function onTimer() {
                    queueInfo.timer = null;
                    
                                        if (queue.length > 0) {
                        sendBatchedRequests(queueInfo);
                    }
                }
            
                                queueInfo.timer = window.setTimeout(onTimer, _batchDelay);
            }
        }
    }
    
    this.flush = function() {
        for (var appUrl in _requestQueue) {
            var queueInfo = _requestQueue[appUrl];

            sendBatchedRequests(queueInfo);
        }
    }
    
    function containsHost(url) {
        if (url.indexOf(':') != -1) {
            return true;
        }
        return false;
    }
    
    function isAbsoluteUrl(url) {
        if (containsHost(url)) {
            return true;
        }

        var firstChar = url.charAt(0);
        if (firstChar == '/' || firstChar == '\\') {
            return true;
        }
        
        return false;
    }

    function sendBatchedRequests(queueInfo) {
        var queue = queueInfo.queue;
        if (queue.length == 0)
            return;
            
        var appUrl = queueInfo.appUrl;
        
                queue.sort(compareRequestPriority);

        var request;

        if (queue.length == 1 || _batchSize == 1) {
                        request = queue[0];
        }
        else {
                        request = createBatchRequest(appUrl, queue);
        }

        executeRequest(request);

                queueInfo.queue = new Array();

                if (queueInfo.timer) {
            window.clearTimeout(queueInfo.timer);
            queueInfo.timer = null;
        }        
    }
    
    function getDomainFromUrl(url) {
                                        var i = url.indexOf('://');
        if (i == -1 || i > 10) {
            return null;
        }

                var j = url.indexOf('/', i + 3);
        var host;
        if (j > -1) {
            host = url.substring(i + 3, j);
        }
        else {
            host = url.substring(i + 3);
        }

        var parts = host.split('.');
        var length = parts.length;
        var domain = host;
        
                if (length > 2) {
            domain = parts[length - 2] + '.' + parts[length - 1];
        }

        return domain.toLowerCase();
    }

    function isCrossDomainRequest(webRequest) {
        var domain;
        var url = webRequest.get_resolvedUrl();
        domain = getDomainFromUrl(url);
        
                if (!domain) {
debug.assert(false, "expect url to always contain domain: "+url);
            return false;
        }
        
        return domain != _defaultDomain;
    }

    function executeRequest(webRequest) {
                if (webRequest.get_aborted() == true) {
            return;
        }

        var executor = null;
                                        if (_executorType != Sys.Net.IFrameExecutor &&
            !webRequest.get_forceXmlHttp() && 
            isCrossDomainRequest(webRequest)) {
            executor = new Sys.Net.IFrameExecutor();
        }
        else {
            executor = new _executorType();
        }
        
        executor.set_webRequest(webRequest);

                        if (Sys.Runtime.get_hostType() != Sys.HostType.InternetExplorer) {        
            webRequest.get_headers().referer = document.URL;
        }
        
        webRequest.set_executor(executor);

        if (_timeoutInterval != 0 && webRequest.get_timeoutInterval() == 0) {
            webRequest.set_timeoutInterval(_timeoutInterval);
        }
        
        executor.executeRequest();
    }

    function createBatchRequest(appUrl, requests) {

        var batchRequestData = new Array();
        
                var batchRequest = new Sys.Net.WebRequest();        
        
        var forceXmlHttp = false;
        for (var i=0; i<requests.length; i++) {
            var request = requests[i];

                        if (request.get_aborted() == true) {
                continue;
            }
            
            if (request.get_forceXmlHttp()) {
                forceXmlHttp = true;
            }

            request.set_delegateRequest(batchRequest);            
            
            batchRequestData[i] = {
                headers: request.get_headers(),
                uri: request.get_resolvedUrl(),
                body: request.get_body()
            };
        }
        
                batchRequest.set_forceXmlHttp(forceXmlHttp);
       
                batchRequest.completed.add(onComplete);
        batchRequest.timeout.add(onTimeout);
        batchRequest.aborted.add(onAborted);
        
        batchRequest.set_url(appUrl + "atlasbatchcall.axd");
        batchRequest.set_appUrl(appUrl);
        batchRequest.set_body(Sys.Serialization.JSON.serialize(batchRequestData));
        batchRequest.get_headers()['Content-Type'] = 'application/json';
        
        function onComplete(response) {

            var statusCode = response.get_statusCode();
            var result = null;

            try {
                result = response.get_object();
            }
            catch (ex) {
            }

            if (statusCode < 200 || statusCode >= 300) {
                                                for (var i=0; i<requests.length; i++)
                    requests[0].completed.invoke(response, null);
            }
            else {
                for (var i=0; i<requests.length; i++) {
                    var request = requests[i];

                    var subResponse = new Sys.Net.BatchResponse(
                        request, result[i].content, result[i].status);
                        
                    request.completed.invoke(subResponse, null);
                }
            }
        }
        
        function onTimeout() {
            for (var i=0; i<requests.length; i++) {
                var request = requests[i];
                    
                request.timeout.invoke(request, null);
            }
        }
        
        function onAborted() {
            for (var i=0; i<requests.length; i++) {
                var request = requests[i];

                request.aborted.invoke(request, null);
            }        
        }

        return batchRequest;
    }
    
    function compareRequestPriority(requestOne, requestTwo) {
        return requestOne.get_priority() - requestTwo.get_priority();
    }
}

Sys.Net._WebRequestManager.registerSealedClass('Sys.Net._WebRequestManager', null, Sys.ITypeDescriptorProvider);
Sys.TypeDescriptor.addType('script', 'webRequestManager', Sys.Net._WebRequestManager);

Sys.Net._WebRequestManager.parseFromMarkup = function(type, node, markupContext) {
    if (!markupContext.get_isGlobal()) {
        return null;
    }
    
    Sys.MarkupParser.initializeObject(Sys.Net.WebRequestManager, node, markupContext);
    return Sys.Net.WebRequestManager;
}

Sys.Net.WebRequestManager = new Sys.Net._WebRequestManager();
Type.createEnum('Sys.Net.WebRequestPriority', 'High', 0, 'Normal', 1, 'Low', 2);
Sys.Net.WebRequest = function() {
    Sys.Net.WebRequest.initializeBase(this, [true]);

        var _url = null;
    var _headers = null;
    var _body = null;
    var _userContext = null;
    var _appUrl = null;

    var _executor;
    var _invokeCalled = false;
    var _abortCalled = false;

    var _timeoutInterval = 0;
    var _priority = Sys.Net.WebRequestPriority.Normal;
    
    var _delegateRequest = null;
    
    var _forceXmlHttp = false;

    
    this.get_appUrl = function() {
        return _appUrl;
    }
    
    this.set_appUrl = function(value) {
        _appUrl = value;
        if (_appUrl && _appUrl.charAt(_appUrl.length - 1) != '/') {
            _appUrl += '/';
        }
    }

    this.get_url = function() {
        return _url;
    }
    
        this.get_resolvedUrl = function() {
                if (_appUrl) {
            var resolvedAppUrl = Sys.Net.WebRequest.resolveUrl(_appUrl);
            return Sys.Net.WebRequest.resolveUrl(_url, resolvedAppUrl);
        }
        else {
            return Sys.Net.WebRequest.resolveUrl(_url);
        }
    }
    
    this.set_url = function(value) {
        _url = value;
    }
    
    this.get_headers = function() {
        if (_headers == null) {
            _headers = { };
        }
        return _headers;
    }

    this.get_forceXmlHttp = function() {
        return _forceXmlHttp;
    }
    this.set_forceXmlHttp = function(value) {
        _forceXmlHttp = value;
    }
    
    this.get_body = function() {
        return _body;
    }
    this.set_body = function(value) {
        _body = value;
    }
    
    this.get_userContext = function() {
        return _userContext;
    }
    
    this.get_executor = function() {
        if (_executor) {
            return _executor;
        }

        return _delegateRequest;
    }
    
    this.set_executor = function(value) {
        _executor = value;
    }

    this.get_timeoutInterval = function() {
        return _timeoutInterval;
    }
    
    this.set_timeoutInterval = function(value) {
        _timeoutInterval = value;
    }
    
    this.get_priority = function() {
        return _priority;
    }

    this.set_priority = function(value) {
        _priority = value;
    }
    
        this.get_aborted = function() {
        return _abortCalled;
    }
    
    this.get_isActive = function() {
        var executor = this.get_executor();
        return executor && executor.get_isActive();
    }
    
    this.get_timedOut = function() {
        return _timedOut;
    }
    
    this.set_delegateRequest = function(request) {
        _delegateRequest = request;
    }

        
    this.aborted = new Type.Event(this);

    this.completed = new Type.Event(this);
    
    this.timeout = new Type.Event(this);


    
    this.invoke = function(userContext) {
    
                if (_executor || _invokeCalled) {
debug.assert(false, "executor and invokeCalled should not be set");
            return;
        }
        
        _userContext = userContext;
        
        Sys.Net.WebRequestManager.enqueue(this);
        _invokeCalled = true;
    }

    this.abort = function() {

                if (!_invokeCalled) {
debug.assert(false, "abort called but invoke wasn't");
            return;
        }

        _abortCalled = true;

        var executor = this.get_executor();
        if (executor) {
            executor.abort();
        }
    }
}
Sys.Net.WebRequest.registerClass('Sys.Net.WebRequest');

Sys.Net.WebRequest.resolveUrl = function(url, baseUrl) {
        if (url && url.startsWith('http') && url.indexOf('://') != -1) {
        return url;
    }
    
        if (!baseUrl) {
        var baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            baseUrl = baseElement.href;
        }
        else {
            baseUrl = document.URL;
        }
    }
    baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/') + 1);

        if (!url) {
        return baseUrl;
    }

        if (url.charAt(0) == '/') {
        var slashslash = baseUrl.indexOf('://');
        if (slashslash == -1) {
debug.assert(false, "base url doesn't contain ://");
            return url;
        }
            
        var nextSlash = baseUrl.indexOf('/', slashslash + 3);
        if (nextSlash == -1) {
debug.assert(false, "base url doesn't contain another /");
            return url;
        }
        
        return baseUrl.substr(0, nextSlash) + url;
    }
            else {
        var lastSlash = baseUrl.lastIndexOf('/');
        if (lastSlash == -1) {
debug.assert(false, "can't find last / in base url");
            return url;
        }
            
        return baseUrl.substr(0, lastSlash+1) + url;
    }
}

Sys.Net.WebRequest.createQueryString = function(queryString, encodeMethod) {

        if (encodeMethod == null)
        encodeMethod = encodeURIComponent;
        
    var sb = new Sys.StringBuilder();

    var i = 0;    
    for (var arg in queryString) {
        var val = queryString[arg];
        if (typeof(val) == "function") continue;
        if (i != 0) {
            sb.append('&');
        }
        
        sb.append(arg);
        sb.append('=');
        debug.assert(!Object.isInstanceOfType(val), "The parameter '" + arg + "' is set to a complex object (" +
            Sys.Serialization.JSON.serialize(val) + "), but it must be a simple object to be passed on the query string");
        sb.append(encodeMethod(val));
        
        i++;
    }
    
    return sb.toString();
}

Sys.Net.WebRequest.createUrl = function(url, queryString) {
    if (!queryString) {
        return url;
    }
    
    var sep = '?';
    if (url && url.indexOf('?') != -1) 
        sep = '&';
    return url + sep + Sys.Net.WebRequest.createQueryString(queryString);
}

Sys.Net.WebMethod = function() {
    this.addHeaders = Function.abstractMethod;
    this.get_appUrl = Function.abstractMethod;
    this.get_url = Function.abstractMethod;
    this.get_body = Function.abstractMethod;

        this.invoke = function(params) {

                                        var numOfParams = arguments.length;
        if (numOfParams == 2 && arguments[1] && typeof(arguments[1]) != 'function') {
        
                        var expectedParamNames = ["onMethodComplete", "onMethodTimeout", "onMethodError",
                "onMethodAborted", "userContext", "timeoutInterval", "priority", "useGetMethod"];

                        var paramContainer = arguments[1];
            
                        var newParams = new Array(expectedParamNames.length + 1);
            newParams[0] = params;
            
            for (var paramName in paramContainer) {
            
                                var index = expectedParamNames.indexOf(paramName);
                
                                if (index < 0) {
                    throw Error.createError(String.format("'{0}' is not a valid argument. It should be one of {1}", paramName, expectedParamNames));
                }

                newParams[index+1] = paramContainer[paramName];
            }
            
            return this._invoke.apply(this, newParams);
        }
        
        return this._invoke.apply(this, arguments);
    }
    
    this._invoke = function(params, onMethodComplete, onMethodTimeout, 
        onMethodError, onMethodAborted, userContext, timeoutInterval, priority, useGetMethod) {

        window.debug.validateParameters("WebMethod.Invoke", arguments,
            [   
                ['params', Object, true],
                ['onMethodComplete', Function, true],
                ['onMethodTimeout', Function, true],
                ['onMethodError', Function, true],
                ['onMethodAborted', Function, true],
                ,                   ['timeoutInterval', Number, true],
                ['priority', Number, true],
                ['useGetMethod', Boolean, true]
            ]);

                var request = new Sys.Net.WebRequest();

                this.addHeaders(request.get_headers());

        request.set_url(this.get_url(params, useGetMethod));
        request.set_appUrl(this.get_appUrl());
        
        if (params == null) {
            params = {};
        }
            
                request.set_body(this.get_body(params, useGetMethod));

        request.completed.add(onComplete);
        request.timeout.add(onTimeout);
        request.aborted.add(onAborted);
        
        if (timeoutInterval) {
            request.set_timeoutInterval(timeoutInterval);
        }
        
        if (priority >= 0) {
            request.set_priority(priority);
        }
        
var methodName = this.get_methodName();

        request.invoke();

        function onComplete(response, eventArgs) {
            var statusCode = response.get_statusCode();
            var result = null;

                                    try {
                result = response.get_object();
            }
            catch (ex) {
                try {
                    result = response.get_xml();
                }
                catch (ex) {
                }
            }

            if (((statusCode < 200) || (statusCode >= 300)) ||
                Sys.Net.MethodRequestError.isInstanceOfType(result)) {

                if (onMethodError) {
                    onMethodError(result, response, userContext);
                }
                else {
                                        debug.trace("The server method '" + methodName + "' failed with the following error:");
                    if (result != null) {
                                                debug.trace(result.get_exceptionType() + ": " + result.get_message());
                    }
                    else {
                                                                        debug.trace(response.get_data());
                    }
                }
            }
            else if (onMethodComplete) {
                onMethodComplete(result, response, userContext);
            }
        }

        function onTimeout(request, eventArgs) {
            if (onMethodTimeout) {
                onMethodTimeout(request, userContext);
            }
        }
        
        function onAborted(request, eventArgs) {
            if (onMethodAborted) {
                onMethodAborted(request, userContext);
            }
        }
        
        return request;
    }
}
Sys.Net.WebMethod.registerAbstractClass('Sys.Net.WebMethod');

Sys.Net.WebMethod.generateTypedConstructor = function(serverType) {
    return function(properties) {
        this.__serverType = serverType;
        
                if (properties != null) {
            for (var name in properties) {
                this[name] = properties[name];
            }
        }
    }
}

Sys.Net.ServiceMethod = function(url, methodName, appUrl) {
    Sys.Net.ServiceMethod.initializeBase(this);

this.get_methodName = function() { return methodName; }

    this.addHeaders = function(headers) {
                headers['Content-Type'] = 'application/json';
    }

    this.get_url = function(params, useGetMethod) {
                if (!useGetMethod || !params)
            params = {};
        
                params.mn = methodName;
        var fullUrl = Sys.Net.WebRequest.createUrl(url, params );
        delete params.mn;           
        return fullUrl;
    }

    this.get_body = function(params, useGetMethod) {
                if (useGetMethod) return null;
        
        var body = Sys.Serialization.JSON.serialize(params);
        
                if (body == "{}")
            return "";
            
        return body;
    }
    
    this.get_appUrl = function() {
        return appUrl;
    }
}
Sys.Net.ServiceMethod.registerClass('Sys.Net.ServiceMethod', Sys.Net.WebMethod);

Sys.Net.ServiceMethod.invoke = function(methodURL, methodName, appUrl) {
    
    var method = new Sys.Net.ServiceMethod(methodURL, methodName, appUrl);

        var callMethodArgs = new Array();
    for (var i=3; i<arguments.length; i++)
        callMethodArgs[i-3] = arguments[i];

        return method.invoke.apply(method, callMethodArgs);
}

Sys.Net.ServiceMethod.createProxyMethod = function(proxy, methodName) {

        var numOfParams = arguments.length-2;
    
        var createWebMethodArguments = arguments;

        proxy[methodName] = function() {
    
                                var args = {};
        for (var i=0; i<numOfParams; i++) {
                        if (typeof(arguments[i]) == 'function') {
                throw Error.createError(String.format("Parameter #{0} passed to method '{1}' should not be a function", i+1, methodName));
            }
            
            args[createWebMethodArguments[i+2]] = arguments[i];
        }
        
                        var callMethodArgs = [ proxy.path, methodName, proxy.appPath, args ];
        
                for (var i=0; i+numOfParams<arguments.length; i++)
            callMethodArgs[i+4] = arguments[numOfParams+i];
        
                return Sys.Net.ServiceMethod.invoke.apply(null, callMethodArgs);
    }
}
Sys.Net.ServiceMethodRequest = function() {
    Sys.Net.ServiceMethodRequest.initializeBase(this);

    var _url = null;
    var _appUrl = null;
    var _methodName = null;
    var _parameters = null;
    var _response = null;
    var _userContext = null;
    var _result = null;
    var _request = null;
    var _timeoutInterval = 0;
    var _priority = Sys.Net.WebRequestPriority.Normal;    

    this.get_url = function() {
        return _url;
    }
    this.set_url = function(value) {
        _url = value;
    }

    this.get_appUrl = function() {
        return _appUrl;
    }
    
    this.set_appUrl = function(value) {
        _appUrl = value;
    }
    
    this.get_methodName = function() {
        return _methodName;
    }
    this.set_methodName = function(value) {
        _methodName = value;
    }

    this.get_parameters = function() {
        if (_parameters == null) {
            _parameters = { };
        }
        return _parameters;
    }

    this.get_response = function() {
        return _response;
    }

    this.get_result = function() {
        return _result;
    }

    this.get_timeoutInterval = function() {
        return _timeoutInterval;
    }
    
    this.set_timeoutInterval = function(value) {
        _timeoutInterval = value;
    }

    this.get_priority = function() {
        return _priority;
    }

    this.set_priority = function(value) {
        _priority = value;
    }
    
        
    this.completed = this.createEvent();
    this.timeout = this.createEvent();
    this.error = this.createEvent();
    this.aborted = this.createEvent();

    this.invoke = function(userContext) {
                if (_request != null) {
            return false;
        }

        var serviceMethod = new Sys.Net.ServiceMethod(_url, _methodName, _appUrl);
        _request = serviceMethod.invoke(_parameters, onMethodComplete, onMethodTimeout, 
            onMethodError, onMethodAborted, this ,
            _timeoutInterval, _priority);

        function onMethodComplete(result, response, target ) {
            _request = null;
            _userContext = userContext;
            _response = response;
            _result = result;
            target.completed.invoke(target, Sys.EventArgs.Empty);
        }

        function onMethodError(result, response, target ) {
            _request = null;
            _userContext = userContext;
            _response = response;
            _result = result;
            target.error.invoke(target, Sys.EventArgs.Empty);
        }

        function onMethodTimeout(request, target ) {
            _request = null;
            _userContext = userContext;
            target.timeout.invoke(request, Sys.EventArgs.Empty);
        }
        
        function onMethodAborted(request, target ) {
            _request = null;
            _userContext = userContext;
            target.aborted.invoke(request, Sys.EventArgs.Empty);
        }
        
        return true;
    }

    this.abort = function() {
        if (_request) {
            _request.abort();
        }
    }

    this.getDescriptor = function() {
        var td = Sys.Net.ServiceMethodRequest.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('url', String);
        td.addProperty('appUrl', String);
        td.addProperty('methodName', String);
        td.addProperty('parameters', Object, true);
        td.addProperty('response', Sys.Net.WebRequestExecutor, true);
        td.addProperty('result', Object, true);
        td.addProperty('timeoutInterval', Number);
        td.addProperty('priority', Number);

        td.addMethod('invoke');
        td.addMethod('abort');

        td.addEvent('completed', true);
        td.addEvent('timeout', true);
        td.addEvent('error', true);
        td.addEvent('aborted', true);

        return td;
    }
    Sys.Net.ServiceMethodRequest.registerBaseMethod(this, 'getDescriptor');
}
Sys.Net.ServiceMethodRequest.registerClass('Sys.Net.ServiceMethodRequest', Sys.Component);
Sys.TypeDescriptor.addType('script', 'serviceMethod', Sys.Net.ServiceMethodRequest);
Sys.Net.PageMethod = function(methodName) {
    Sys.Net.PageMethod.initializeBase(this);

this.get_methodName = function() { return methodName; }

    this.addHeaders = function(headers) {
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    this.get_url = function() {
        var form = document.forms[0];
        return form.action;
    }
    
    this.get_appUrl = function() {
        return null;
    }
    
    this.get_body = function(params) {
        var form = document.forms[0];

        
                var bodyDictionary = {};
        bodyDictionary["__serviceMethodName"] = methodName;
        bodyDictionary["__serviceMethodParams"] = Sys.Serialization.JSON.serialize(params);

                var count = form.elements.length;
        var element;
        for (var i = 0; i < count; i++) {
            element = form.elements[i];
            var tagName = element.tagName.toLowerCase();
            if (tagName == "input") {
                var type = element.type;
                if ((type == "text" || type == "hidden" || type == "password" ||
                    ((type == "checkbox" || type == "radio") && element.checked))) {
                    bodyDictionary[element.name] = element.value;
                }
            }
            else if (tagName == "select") {
                var selectCount = element.options.length;
                for (var j = 0; j < selectCount; j++) {
                    var selectChild = element.options[j];
                    if (selectChild.selected == true) {
                        bodyDictionary[element.name] = element.value;
                    }
                }
            }
            else if (tagName == "textarea") {
                bodyDictionary[element.name] = element.value;
            }
        }

                return Sys.Net.WebRequest.createQueryString(bodyDictionary, encodeFormPostField);
    }

                function encodeFormPostField(param) {
                        param = param.replace(/%/gi, "%25");
        param = param.replace(/&/gi, "%26");
        param = param.replace(/=/gi, "%3d");
        param = param.replace(/\+/gi, "%2b");
        return param;
    }
}
Sys.Net.PageMethod.registerClass('Sys.Net.PageMethod', Sys.Net.WebMethod);

Sys.Net.PageMethod.invoke = function(methodName) {
    
    var method = new Sys.Net.PageMethod(methodName);

        var callMethodArgs = new Array();
    for (var i=1; i<arguments.length; i++)
        callMethodArgs[i-1] = arguments[i];

        return method.invoke.apply(method, callMethodArgs);
}

Sys.Net.PageMethod.createProxyMethod = function(proxy, methodName) {

        var numOfParams = arguments.length-2;
    
        var createWebMethodArguments = arguments;

        proxy[methodName] = function() {
    
                                var args = {};
        for (var i=0; i<numOfParams; i++) {
                        if (typeof(arguments[i]) == 'function') {
                throw Error.createError(String.format("Parameter #{0} passed to method '{1}' should not be a function", i+1, methodName));
            }

            args[createWebMethodArguments[i+2]] = arguments[i];
        }

                        var callMethodArgs = [ methodName, args ];
        
                for (var i=0; i+numOfParams<arguments.length; i++)
            callMethodArgs[i+2] = arguments[numOfParams+i];
        
                return Sys.Net.PageMethod.invoke.apply(null, callMethodArgs);
    }
}
Sys.Net.MethodRequestError = function(message, stackTrace, exceptionType) {
    var _message = message;
    var _stackTrace = stackTrace;
    var _exceptionType = exceptionType;
    
    this.get_message = function() {
        return _message;
    }
    
    this.get_stackTrace = function() {
        return _stackTrace;
    }
    
    this.get_exceptionType = function() {
        return _exceptionType;
    }
}
Sys.Net.MethodRequestError.registerClass('Sys.Net.MethodRequestError');
Sys.Net.BatchResponse = function(request, data, status) {
    Sys.Net.BatchResponse.initializeBase(this);
    
    this.set_webRequest(request);
    
    this.get_data = function() {
        return data;
    }
    
    this.get_statusCode = function() {
        return status;
    }
}
Sys.Net.BatchResponse.registerClass('Sys.Net.BatchResponse', Sys.Net.WebRequestExecutor);
Sys.Net.BridgeMethod = function() {
    Sys.Net.BridgeMethod.initializeBase(this, [true]);
    
    var _data;
    var _bridgeURL = "";
    var _bridgeMethod = "";
    var _isReady = false;
    var _onTimeout = "";
    var _onError = "";
    var _parameters = {};
    
    this.get_data = function() {
        return _data;
    }
    this.set_data = function(data) {
        _data = data;
        this.raisePropertyChanged('data');
        this._set_isReady(true);
        this.dataAvailable.invoke(this, Sys.EventArgs.Empty);
    }
    
    this.get_isReady = function() {
        return _isReady;
    }
    this._set_isReady = function(value) {
        if (_isReady != value) {
            _isReady = value;
            this.raisePropertyChanged("isReady");
        }
    }
    
    this.get_parameters = function() {
        return _parameters;
    }
    
    this.get_bridgeURL = function() {
        return _bridgeURL;
    }
    this.set_bridgeURL = function(url) {
        _bridgeURL = url;
        this.raisePropertyChanged('bridgeURL');
    }
    
    this.get_onTimeout = function() {
        return _onTimeout;
    }
    this.set_onTimeout = function(timeout) {
        _onTimeout = timeout;
        this.raisePropertyChanged('onTimeout');
    }
    this.get_onError = function() {
        return _onError;
    }
    this.set_onError = function(error) {
        _onError = error;
        this.raisePropertyChanged('onError');
    }
    this.get_bridgeMethod = function() {
        return _bridgeMethod;
    }
    this.set_bridgeMethod = function(value) {
        _bridgeMethod = value;
        this.raisePropertyChanged('bridgeMethod');
    }
    
    this.dispose = function() {
        _data = null;
        
        Sys.Net.BridgeMethod.callBaseMethod(this, 'dispose');
    }
    
    this.getDescriptor = function() {
        var td = Sys.Net.BridgeMethod.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('data', Object);
        td.addProperty('isReady', Boolean, true);
        td.addProperty('bridgeURL', String);
        td.addProperty('parameters', Object, true);
        td.addProperty('bridgeMethod', String);
        td.addProperty('onTimeout', String);
        td.addProperty('onError', String);
        td.addMethod('invoke');
        td.addEvent('dataAvailable', true);
        
        return td;
    }
    
    this.dataAvailable = this.createEvent();
    
    function onRequestComplete(result, response, userContext) {
        userContext.set_data(result);
    }
    
    this.invoke = function() {
        this._set_isReady(false);

        var method = new Sys.Net.ServiceMethod(_bridgeURL, "__invokeBridge", document.URL.substr(0, document.URL.lastIndexOf('/')+1));
                var callMethodArgs = [ {"method" : _bridgeMethod, "args" : _parameters } , onRequestComplete, eval(_onTimeout), eval(_onError), "", this ];
        method.invoke.apply(method, callMethodArgs);
    }
}
Sys.Net.BridgeMethod.registerSealedClass('Sys.Net.BridgeMethod', Sys.Component);
Sys.TypeDescriptor.addType('script', 'bridgemethod', Sys.Net.BridgeMethod);

Type.registerNamespace('Sys.Data');

Sys.Data.IData = function() {
    this.add = Function.abstractMethod;
    this.clear = Function.abstractMethod;
    this.getRow = Function.abstractMethod;
    this.remove = Function.abstractMethod;
}
Sys.Data.IData.registerInterface('Sys.Data.IData');
Sys.Data.DataColumn = function(columnName, dataType, defaultValue, isKey, isReadOnly) {
    var _columnName = columnName;
    var _dataType = dataType;
    var _defaultValue = defaultValue;
    var _readOnly = isReadOnly;
    var _key = isKey;
    
    this.get_columnName = function() {
        return _columnName;
    }
    
    this.get_dataType = function() {
        return _dataType;
    }
    
    this.get_defaultValue = function() {
        return _defaultValue;
    }
    
    this.get_isKey = function() {
        return _key;
    }
    
    this.get_readOnly = function() {
        return _readOnly;
    }
    
    this.dispose = function() {
        _columnName = null;
        _dataType = null;
        _defaultValue = null;
    }

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();
        
        td.addProperty('columnName', String, true);
        td.addProperty('dataType', Sys.Type, true);
        td.addProperty('defaultValue', Object, true);
        td.addProperty('isKey', Boolean, true);
        td.addProperty('readOnly', Boolean, true);
        return td;
    }
}
Sys.Data.DataColumn.registerSealedClass('Sys.Data.DataColumn', null, Sys.ITypeDescriptorProvider, Sys.IDisposable);
Sys.Data.DataRow = function(objectDataRow, dataTableOwner, index) {
    var _owner = dataTableOwner;
    var _row = objectDataRow;
    var _index = index;
    var _state = Sys.Data.DataRowState.Unchanged;
    var _selected = false;

    this.get_isDirty = function() {
        return typeof(_row._original) == "object";
    }

    this.get_index = function() {
        return _index;
    }
    this._set_index = function(index) {
        _index = index;
    }

    this.get_rowObject = function() {
        return typeof(_row._rowObject) != "undefined" ? _row._rowObject : _row;
    }

    this.get_selected = function() {
        return _selected;
    }
    this.set_selected = function(value) {
        if (_selected != value) {
            _selected = value;
            this.raisePropertyChanged("$selected");
        }
    }

    this.get_state = function() {
        return _state;
    }
    this._set_state = function(value) {
        _state = value;
    }

    this.get_table = function() {
        return _owner;
    }
    this._set_table = function(value) {
        _owner = value;
    }

    this.dispose = function() {
        if (this.propertyChanged) {
            this.propertyChanged.dispose();
        }
        _row = null;
        _owner = null;
    }

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();

        td.addProperty('$isDirty', Boolean, true);
        td.addProperty('$index', Number, true);
        td.addProperty('$selected', Boolean);
        td.addEvent('propertyChanged', true);
        return td;
    }

    this.initialize = function() {
        this.propertyChanged.initialize(this);
    }

    this.propertyChanged = new Type.Event(null);

    this.getProperty = function(name, key) {
        if (!name) {
            return typeof(_row._rowObject) != "undefined" ? _row._rowObject : _row;
        }
        switch(name) {
        case "$isDirty":
            return this.get_isDirty();

        case "$index":
            return _index;

        case "$selected":
            return this.get_selected();
        }

        if (Sys.ITypeDescriptorProvider.isImplementedBy(_row)) {
            return Sys.TypeDescriptor.getProperty(_row, name, key);
        }
        return _row[name];
    }

    this.setProperty = function(name, value, key) {
        if (name == "$selected") {
            this.set_selected(value);
            return;
        }
            debug.assert(_owner);
            var col = _owner.getColumn(name);
            debug.assert(col.get_readOnly() !== true || _state == Sys.Data.DataRowState.Detached, "A read-only property can't be set." )
        if (_row[name] === value) return;
        var isDirty = this.get_isDirty();
        if (!isDirty && _owner && (this.get_state() == Sys.Data.DataRowState.Unchanged)) {
            var original = {};
            for (var columnName in _row) {
                if ((columnName.charAt(0) != '_') && (typeof(_row[columnName]) != "function")) {
                    original[columnName] = _row[columnName];
                }
            }
            _row._original = original;
            this._set_state(Sys.Data.DataRowState.Modified);
        }

        if (Sys.ITypeDescriptorProvider.isImplementedBy(_row)) {
            Sys.TypeDescriptor.setProperty(_row, name, value, key);
        }
        else {
            _row[name] = value;
        }
        this.raisePropertyChanged(name);
        if (!isDirty) {
            this.raisePropertyChanged("$isDirty");
        }
        _owner.raiseRowChanged(_row);
    }

    this.invokeMethod = function(methodName, parameters) {
    }

    this.raisePropertyChanged = function(propertyName) {
        this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs(propertyName));
    }
}
Sys.Data.DataRow.registerSealedClass('Sys.Data.DataRow', null, Sys.ICustomTypeDescriptor, Sys.INotifyPropertyChanged, Sys.ITypeDescriptorProvider, Sys.IDisposable);
Sys.Data.DataRowView = function(dataRow, index) {
    var _row = dataRow;
    var _index = index;
    var _propertyChanged;

    this.get_dataIndex = function() {
        return _row.get_index();
    }

    this.get_index = function() {
        return _index;
    }
    this._set_index = function(value) {
        _index = value;
    }

    this.get_isDirty = function() {
        return _row.get_isDirty();
    }

    this._get_row = function() {
        return _row;
    }

    this.get_rowObject = function() {
        return _row.get_rowObject();
    }

    this.get_selected = function() {
        return _row.get_selected();
    }
    this.set_selected = function(value) {
        _row.set_selected(value);
    }

    this.get_table = function() {
        return _row.get_table();
    }

    this.dispose = function() {
        if (_row && _propertyChanged) {
            _row.propertyChanged.remove(_propertyChanged);
        }
        if (this.propertyChanged) {
            this.propertyChanged.dispose();
            this.propertyChanged = null;
        }
        _row = null;
    }

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();

        td.addProperty('$dataIndex', Number, true);
        td.addProperty('$isDirty', Boolean, true);
        td.addProperty('$index', Number, true);
        td.addProperty('$selected', Boolean);
        td.addEvent('propertyChanged', true);
        return td;
    }

    this.initialize = function() {
        _propertyChanged = Function.createDelegate(this, onPropertyChanged);
        _row.propertyChanged.add(_propertyChanged);
    }

    this.propertyChanged = new Type.Event(null);

    function onPropertyChanged(sender, args) {
        this.raisePropertyChanged(args.get_propertyName());
    }

    this.getProperty = function(name, key) {
        if (name == "$index") return _index;
        if (name == "$dataIndex") return _row.get_index();
        return _row.getProperty(name, key);
    }

    this.setProperty = function(name, value, key) {
        _row.setProperty(name, value, key);
    }

    this.invokeMethod = function(methodName, parameters) {
    }

    this.raisePropertyChanged = function(propertyName) {
        this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs(propertyName));
    }
}
Sys.Data.DataRowView.registerSealedClass('Sys.Data.DataRowView', null, Sys.ICustomTypeDescriptor, Sys.INotifyPropertyChanged, Sys.ITypeDescriptorProvider, Sys.IDisposable);
Sys.Data.DataRowCollection = function(dataRowViews, dataTable) {
    var _rows = dataRowViews;
    var _dataTable = dataTable;

    var _indexToRow = null;

    var _tableCollectionChanged;

    var _suspendNotifications = false;

    this._get_dataTable = function() {
        return _dataTable;
    }

    this.get_length = function() {
        return _rows.length;
    }

    this.add = function(rowObject) {
        var row = _dataTable.add(rowObject);
        var rv = new Sys.Data.DataRowView(row, _rows.length);
        rv.initialize();
        _rows.add(rv);
        if (_indexToRow) {
            _indexToRow[row.get_dataIndex()] = row;
        }
    }

    this.clear = function() {
        _suspendNotifications = true;
        for (var i = _rows.length - 1; i >= 0; i--) {
            _dataTable.remove(_rows[i]._get_row());
        }
        _rows = [];
        _indexToRow = null;
        _suspendNotifications = false;
        this.raiseCollectionChanged(Sys.NotifyCollectionChangedAction.Reset, null);
    }

    this.getRow = function(index) {
        return _rows[index];
    }
    this.getItem = this.getRow;

    this.remove = function(rowObject) {
        _dataTable.remove(rowObject._get_row());
    }

    this.dispose = function() {
        if (_dataTable && _tableCollectionChanged) {
            _dataTable.collectionChanged.remove(_tableCollectionChanged);
        }
        if (this.collectionChanged) {
            this.collectionChanged.dispose();
            this.collectionChanged = null;
        }
        if (this.propertyChanged) {
            this.propertyChanged.dispose();
            this.propertyChanged = null;
        }
        _rows = null;
        _dataTable = null;
    }

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();

        td.addProperty('length', Number, true);
        td.addMethod('add');
        td.addMethod('clear');
        td.addMethod('remove');
        td.addEvent('collectionChanged', true);
        td.addEvent('propertyChanged', true);
        return td;
    }

    this.initialize = function() {
        if (_dataTable.collectionChanged) {
            _tableCollectionChanged = Function.createDelegate(this, onTableCollectionChanged);
            _dataTable.collectionChanged.add(_tableCollectionChanged);
        }
    }

    this.collectionChanged = new Type.Event(null);
    this.propertyChanged = new Type.Event(null);

    this.raiseCollectionChanged = function(action, changedItem) {
        this.collectionChanged.invoke(this, new Sys.CollectionChangedEventArgs(action, changedItem));
    }

    function ensureLookupTable() {
        if (!_indexToRow) {
            _indexToRow = [];
            for (var j = _rows.length - 1; j >= 0; j--) {
                var row = _rows[j];
                _indexToRow[row.get_dataIndex()] = row;
            }
        }
    }

    function onTableCollectionChanged(sender, args) {
        if (_suspendNotifications) return;
        switch(args.get_action()) {
        case Sys.NotifyCollectionChangedAction.Reset:
            _rows = [];
            _indexToRow = null;
            this.raiseCollectionChanged(Sys.NotifyCollectionChangedAction.Reset, changedItem);
            return;
        case Sys.NotifyCollectionChangedAction.Remove:
            var changedItem = args.get_changedItem();
            ensureLookupTable();
            var idx = changedItem.get_index();
            if (_indexToRow[idx]) {
                _rows.remove(_indexToRow[idx]);
                delete _indexToRow[idx];
                this.raiseCollectionChanged(Sys.NotifyCollectionChangedAction.Remove, changedItem);
            }
            return;
        }
    }
}
Sys.Data.DataRowCollection.registerSealedClass('Sys.Data.DataRowCollection', null, Sys.Data.IData, Sys.IArray, Sys.INotifyPropertyChanged, Sys.INotifyCollectionChanged, Sys.ITypeDescriptorProvider, Sys.IDisposable);
Type.createEnum('Sys.Data.DataRowState',
    'Unchanged', 0,
    'Added', 1,
    'Deleted', 2,
    'Detached', 3,
    'Modified', 4);
Sys.Data.DataTable = function(columns, tableArray) {
    var _array = Array.isInstanceOfType(tableArray) ? tableArray : [];

    var _columns = Array.isInstanceOfType(columns) ? columns : [];
    var _columnDictionary = {};

    var _keys = null;

    var _rows = [];
    var _deletedRows = [];
    var _newRows = [];
    var _updatedRows = [];

    this.get_columns = function() {
        return _columns;
    }

    this.get_keyNames = function() {
        if (!_keys) {
            _keys = [];
            var len = _columns.length;
            for (var i = 0; i < len; i++) {
                var col = _columns[i];
                if (col.get_isKey()) {
                    _keys.add(col.get_columnName());
                }
            }
        }
        return _keys;
    }

    this.get_isDirty = function() {
        return (_deletedRows.length != 0) || (_newRows.length != 0) || (_updatedRows.length != 0);
    }

    this.get_length = function() {
        return _array.length;
    }

    this.add = function(rowObject) {
        var row;
        if (Sys.Data.DataRow.isInstanceOfType(rowObject)) {
            row = rowObject;
            debug.assert(((row.get_table() == this) && (row.get_state() == Sys.Data.DataRowState.Detached)) ||
                         !row.get_table(),
                         'Can\'t add a row that belongs to another table or has been added already.');
            row._set_table(this);
            rowObject = rowObject.get_rowObject();
        }
        else {
            row = new Sys.Data.DataRow(rowObject, this);
        }
        var index = _array.length;
        row._set_index(index);
        var columns = this.get_columns();
        if (columns) {
            for(var i = columns.length - 1; i >= 0; i--) {
                var column = columns[i];
                if (typeof(rowObject[column.get_columnName()]) == "undefined") {
                    rowObject[column.get_columnName()] = column.get_defaultValue();
                }
            }
        }
        var oldIsDirty = this.get_isDirty();
        _array[index] = rowObject;
        _rows[index] = row;
        _newRows.add(rowObject);
        row._set_state(Sys.Data.DataRowState.Added);
        this.raiseCollectionChanged(Sys.NotifyCollectionChangedAction.Add, row);
        this.raisePropertyChanged("length");
        if (!oldIsDirty) {
            this.raisePropertyChanged("isDirty");
        }
        return row;
    }

    this.clear = function() {
        if (this.get_length() > 0) {
            var oldIsDirty = this.get_isDirty();
            for (var i = _array.length - 1; i >= 0; i--) {
                var row = _array[i];
                if (row && !_newRows.contains(row)) {
                    _deletedRows.add(row);
                    _rows[i]._set_state(Sys.Data.DataRowState.Deleted);
                }
            }
            _rows = [];
            _array = [];
            _newRows = [];
            _updatedRows = [];
            this.raiseCollectionChanged(Sys.NotifyCollectionChangedAction.Reset, null);
            this.raisePropertyChanged("length");
            if (!oldIsDirty) {
                this.raisePropertyChanged("isDirty");
            }
        }
    }

    this.createRow = function(initialData) {
        var obj = {};
        var undef = {};
        for (var i = _columns.length - 1; i >= 0; i--) {
            var column = _columns[i];
            var columnName = column.get_columnName();
            var val = undef;
            if (initialData) {
                val = Sys.TypeDescriptor.getProperty(initialData, columnName);
            }
            if ((val == undef) || (typeof(val) == "undefined")) {
                val = column.get_defaultValue();
            }
            obj[columnName] = val;
        }
        var row = new Sys.Data.DataRow(obj, this, -1);
        row._set_state(Sys.Data.DataRowState.Detached);
        return row;
    }

    this.getChanges = function() {
        return {updated : _updatedRows, inserted : _newRows, deleted : _deletedRows};
    }

    this.getColumn = function(name) {
        var col = _columnDictionary[name];
        if (col) {
            return col;
        }
        for (var c = _columns.length - 1; c >= 0; c--) {
            var column = _columns[c];
            if (column.get_columnName() == name) {
                _columnDictionary[name] = column;
                return column;
            }
        }
debug.fail(String.format("Column name {0} doesn't exist.", name));
        return null;
    }

    this.getRow = function(index) {
        var row = _rows[index];
        if (!row) {
            var rowObject = _array[index];
            if (rowObject) {
                row = Sys.Data.DataRow.isInstanceOfType(rowObject) ? rowObject : new Sys.Data.DataRow(rowObject, this, index);
                _rows[index] = row;
            }
        }
        return row;
    }

    this.getItem = this.getRow;

    this.remove = function(rowObject) {
        if (Sys.Data.DataRow.isInstanceOfType(rowObject)) {
            rowObject = rowObject.get_rowObject();
        }
        var oldIsDirty = this.get_isDirty();
        var index = _array.indexOf(rowObject);
        var row = this.getItem(index);
        _array.removeAt(index);
        _rows.removeAt(index);
        index = _newRows.indexOf(rowObject);
        if (index != -1) {
            _newRows.removeAt(index);
        }
        else {
            _deletedRows.add(rowObject);
        }
        row._set_state(Sys.Data.DataRowState.Deleted);
        this.raiseCollectionChanged(Sys.NotifyCollectionChangedAction.Remove, row);
        this.raisePropertyChanged("length");
        if (oldIsDirty != this.get_isDirty()) {
            this.raisePropertyChanged("isDirty");
        }
    }

    this.dispose = function() {
        if (this.collectionChanged) {
            this.collectionChanged.dispose();
            this.collectionChanged = null;
        }
        if (this.propertyChanged) {
            this.propertyChanged.dispose();
            this.propertyChanged = null;
        }
        var i, row;
        if (_rows) {
            for (i = _rows.length - 1; i >= 0; i--) {
                row = _rows[i];
                if (row) {
                    _rows[i].dispose();
                }
            }
        }
        if (_deletedRows) {
            for (i = _deletedRows.length - 1; i >= 0; i--) {
                row = _deletedRows[i];
                if (row && row.dispose) {
                    row.dispose();
                }
            }
        }
        if (_newRows) {
            for (i = _newRows.length - 1; i >= 0; i--) {
                row = _newRows[i];
                if (row && row.dispose) {
                    row.dispose();
                }
            }
        }
        if (_updatedRows) {
            for (i = _updatedRows.length - 1; i >= 0; i--) {
                row = _updatedRows[i];
                if (row && row.dispose) {
                    row.dispose();
                }
            }
        }
        _rows = null;
        _deletedRows = null;
        _newRows = null;
        _updatedRows = null;
        _columns = null;
        _array = null;
        _keys = null;
    }

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();

        td.addProperty('columns', Array, true);
        td.addProperty('keyNames', Array, true);
        td.addProperty('length', Number, true);
        td.addProperty('isDirty', Boolean, true);
        td.addMethod('add');
        td.addMethod('clear');
        td.addMethod('remove');
        td.addEvent('collectionChanged', true);
        td.addEvent('propertyChanged', true);
        return td;
    }

    this.collectionChanged = new Type.Event(null);
    this.propertyChanged = new Type.Event(null);

    this.raiseCollectionChanged = function(action, changedItem) {
        this.collectionChanged.invoke(this, new Sys.CollectionChangedEventArgs(action, changedItem));
    }

    this.raiseRowChanged = function(changedItem) {
        if ((_updatedRows.indexOf(changedItem) == -1) && (_newRows.indexOf(changedItem) == -1)) {
            var oldIsDirty = this.get_isDirty();
            _updatedRows.add(changedItem);
            if (!oldIsDirty) {
                this.raisePropertyChanged("isDirty");
            }
        }
    }

    this.raisePropertyChanged = function(propertyName) {
        this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs(propertyName));
    }
}
Sys.Data.DataTable.registerSealedClass('Sys.Data.DataTable', null, Sys.Data.IData, Sys.IArray, Sys.INotifyPropertyChanged, Sys.INotifyCollectionChanged, Sys.ITypeDescriptorProvider, Sys.IDisposable);
Sys.Data.DataView = function() {
                    Sys.Data.DataView.initializeBase(this);

        var _data = null;
    var _filteredTable = null;
    var _filteredRows = null;
    var _paginatedRows = null;

    var _pageSize = 0;
    var _pageIndex = 0;

    var _sorted = false;
    var _sortColumn = '';
    var _sortDirection = Sys.Data.SortDirection.Ascending;

    var _filters;

    var _dataChangedDelegate;
    var _compareRowsDelegate;

    var _updating = false;

    this.get_data = function() {
                                return _data;
    }
    this.set_data = function(data) {
debug.assert(!data || Sys.Data.IData.isImplementedBy(data) || Sys.IArray.isImplementedBy(data));
        _filteredTable = null;
        if (_data && _data.collectionChanged) {
            _data.collectionChanged.remove(_dataChangedDelegate);
        }
        _data = data;
        if (_data && _data.collectionChanged) {
            _data.collectionChanged.add(_dataChangedDelegate);
        }
        this.raisePropertyChanged('data');
        this.raisePropertyChanged('filteredData');
    }

    this.get_filteredData = function() {
                                ensureFilteredData.call(this);
        return _filteredTable;
    }

    this.get_filters = function() {
                                if (!_filters) {
            _filters = Sys.Component.createCollection(this);
            _filters.collectionChanged.add(_dataChangedDelegate);
        }
        return _filters;
    }

    this.get_hasNextPage = function() {
                                ensureFilteredData.call(this);
        return (this.get_pageIndex() < this.get_pageCount() - 1);
    }
    this.get_hasPreviousPage = function() {
                                if (!_data) return false;
        return (this.get_pageIndex() > 0);
    }

    this.get_length = function() {
                                ensureFilteredData.call(this);
        return _filteredTable ? _filteredTable.get_length() : 0;
    }

    this.get_pageCount = function() {
                                if (_pageSize == 0) {
            return 1;
        }
        ensureFilteredData.call(this);
        if (!_filteredRows) return 1;
        return Math.floor((_filteredRows.length - 1) / _pageSize) + 1;
    }

    this.get_pageIndex = function() {
                                return _pageIndex;
    }
    this.set_pageIndex = function(value, dontRaiseFilteredDataChanged) {
debug.assert(value >= 0, "pageIndex should be superior or equal to zero.");
        var count = this.get_pageCount();
        if (value >= count) {
            value = (count > 0 ? count - 1 : 0);
        }
        if (value != _pageIndex) {
            var oldState = prepareChange.call(this);
            _pageIndex = value;
            _paginatedRows = null;
            triggerChangeEvents.call(this, oldState, false);
            if (!dontRaiseFilteredDataChanged) {
                this.raisePropertyChanged('filteredData');
            }
        }
    }

    this.get_pageSize = function() {
                                return _pageSize;
    }
    this.set_pageSize = function(value) {
        if (_pageSize != value) {
            var oldState = prepareChange.call(this);
            _pageSize = value;
            _paginatedRows = null;
            triggerChangeEvents.call(this, oldState, true);
            this.raisePropertyChanged('filteredData');
        }
    }

    this.get_sortColumn = function() {
                                return _sortColumn;
    }
    this.set_sortColumn = function(value) {
        this.sort(value, _sortDirection);
    }

    this.get_sortDirection = function() {
                                return _sortDirection;
    }
    this.set_sortDirection = function(value) {
        this.sort(_sortColumn, value);
    }

    this.dispose = function() {
        if (_filters) {
            _filters.dispose();
            _filters = null;
        }

        Sys.Data.DataView.callBaseMethod(this, 'dispose');
    }
    Sys.Data.DataView.registerBaseMethod(this, 'dispose');

    this.getDescriptor = function() {
        var td = Sys.Data.DataView.callBaseMethod(this, 'getDescriptor');

        td.addProperty("data", Sys.Data.DataTable);
        td.addProperty("filteredData", Sys.Data.DataTable, true);
        td.addProperty("filters", Array, true);
        td.addProperty("hasNextPage", Boolean, true);
        td.addProperty("hasPreviousPage", Boolean, true);
        td.addProperty("length", Number, true);
        td.addProperty("pageCount", Number, true);
        td.addProperty("pageIndex", Number);
        td.addProperty("pageSize", Number);
        td.addProperty("sortColumn", String);
        td.addProperty("sortDirection", Sys.Data.SortDirection);
        td.addMethod("sort", [ Sys.TypeDescriptor.createParameter('sortColumn', String),
                               Sys.TypeDescriptor.createParameter('sortDirection', Sys.Data.SortDirection) ]);
        return td;
    }
    Sys.Data.DataView.registerBaseMethod(this, 'getDescriptor');

    this.getItem = function(index) {
                                                return _filteredTable ? _filteredTable[index] : null;
    }

    this.initialize = function() {
        Sys.Data.DataView.callBaseMethod(this, 'initialize');
        if (_filters) {
            for (var i = 0; i < _filters.length; i++) {
                _filters[i].initialize(this);
            }
        }
    }
    Sys.Data.DataView.registerBaseMethod(this, 'initialize');

    this.sort = function(sortColumn, sortDirection) {
                                                var colChanged = (sortColumn != _sortColumn);
        var dirChanged = (sortDirection != _sortDirection);
        if (colChanged || dirChanged) {
            _sortColumn = sortColumn;
            _sortDirection = sortDirection;
            if (colChanged) {
                this.raisePropertyChanged('sortColumn');
            }
            if (dirChanged) {
                this.raisePropertyChanged('sortDirection');
            }
            _sorted = false;
            this.set_pageIndex(0, true);
            this.raisePropertyChanged('filteredData');
        }
    }

    this._raiseFilterChanged = function(filter) {
        _dataChangedDelegate(this, Sys.EventArgs.Empty);
    }

    function compareRows(row1, row2) {
        var sortColumn = this.get_sortColumn();
        var sortDirection = this.get_sortDirection();
        if (row1.getProperty(sortColumn) == row2.getProperty(sortColumn)) return 0;
        if (row1.getProperty(sortColumn) < row2.getProperty(sortColumn)) {
            return (sortDirection == Sys.Data.SortDirection.Ascending) ? -1 : 1;
        }
        return (sortDirection == Sys.Data.SortDirection.Ascending) ? 1 : -1;
    }
    _compareRowsDelegate = Function.createDelegate(this, compareRows);

        function onDataChanged(sender, args) {
        if (args != Sys.EventArgs.Empty) {
            var item = args.get_changedItem();
            var filters = this.get_filters();
            if (item && !isValidAfterFiltering.call(item, filters, filters.get_length())) {
                                return;
            }
                    }
        _filteredTable = null;
        this.raisePropertyChanged('filteredData');
    }
    _dataChangedDelegate = Function.createDelegate(this, onDataChanged);

    function ensureFilteredData() {
        if (_updating || !_data) return;
        _updating = true;
        var oldState = prepareChange.call(this);
        if ((typeof(_data.length) == "number") && (_data.length === 0)) {
            _filteredRows = [];
            _paginatedRows = [];
            _filteredTable = new Sys.Data.DataRowCollection([], _data);
            _filteredTable.initialize();
            _sorted = true;
        }
        else {
            if (!_filteredTable) {
                _filteredRows = [];
                _paginatedRows = null;
                _filteredTable = null;
                var filters = this.get_filters();
                var filterLength = filters.get_length();
                var dataLength = _data.get_length();
                for (var i = 0; i < dataLength; i++) {
                    var item = _data.getItem(i);
                    if (!Sys.Data.DataRow.isInstanceOfType(item)) {
                        item = new Sys.Data.DataRow(item, null, i);
                    }
                    if (isValidAfterFiltering.call(this, item, filters, filterLength)) {
                        var rv = new Sys.Data.DataRowView(item, i);
                        rv.initialize();
                        _filteredRows.add(rv);
                    }
                }
            }
            if (!_sorted && _sortColumn && (_filteredRows.length != 0)) {
                _filteredRows.sort(_compareRowsDelegate);
                for (var i = _filteredRows.length - 1; i >= 0; i--) {
                    _filteredRows[i]._set_index(i);
                }
                _sorted = true;
                _paginatedRows = null;
                _filteredTable = null;
            }
            if ((_pageSize > 0) && !_paginatedRows) {
                _paginatedRows = [];
                _filteredTable = null;
                var len = _filteredRows.length;
                var start = _pageSize * _pageIndex;
                if (len && (start >= len)) {
                    _pageIndex = Math.floor(len / _pageSize) - 1;
                    start = _pageSize * _pageIndex;
                }
                var end = start + _pageSize;
                for(var i = start; (i < end) && (i < len); i++) {
                    _filteredRows[i]._set_index(i);
                    _paginatedRows.add(_filteredRows[i]);
                }
            }
            else {
                _paginatedRows = _filteredRows;
            }
            if (!_filteredTable) {
                _filteredTable = new Sys.Data.DataRowCollection(_paginatedRows, _data);
                _filteredTable.initialize();
            }
        }
        triggerChangeEvents.call(this, oldState, true);
        _updating = false;
    }

    function isValidAfterFiltering(row, filters, filterLength) {
        for (var j = 0; j < filterLength; j++) {
            if (!filters[j].filter(row)) {
                return false;
            }
        }
        return true;
    }

    function triggerChangeEvents(oldState, lengthCanChange) {
        var count;
        var pageIndex = this.get_pageIndex();
        if (lengthCanChange) {
            if (this.get_pageCount() != oldState.pageCount) {
                this.raisePropertyChanged('pageCount');
            }
            if (this.get_length() != oldState.length) {
                this.raisePropertyChanged('length');
            }
            count = this.get_pageCount();
            if (pageIndex >= count) {
                pageIndex = (count > 0 ? count - 1 : 0);
                this.set_pageIndex(pageIndex);
            }
        }
        else {
            count = oldState.pageCount;
        }
        if (pageIndex != oldState.pageIndex) {
            this.raisePropertyChanged('pageIndex');
        }
        if ((pageIndex < count - 1) != oldState.hasNextPage) {
            this.raisePropertyChanged('hasNextPage');
        }
        if ((pageIndex > 0) != oldState.hasPreviousPage) {
            this.raisePropertyChanged('hasPreviousPage');
        }
    }

    function prepareChange() {
        return {pageCount: this.get_pageCount(),
                pageIndex: this.get_pageIndex(),
                length: this.get_length(),
                hasNextPage: this.get_hasNextPage(),
                hasPreviousPage: this.get_hasPreviousPage()};
    }
}
Sys.Data.DataView.registerClass('Sys.Data.DataView', Sys.Component, Sys.IArray);
Sys.TypeDescriptor.addType('script', 'dataView', Sys.Data.DataView);
Sys.Data.DataFilter = function() {
    Sys.Data.DataFilter.initializeBase(this, [false]);
    
        this.filter = Function.abstractMethod;
    
    this.get_dataContext = function() {
        var dc = Sys.Data.DataFilter.callBaseMethod(this, 'get_dataContext');
        if (!dc) {
            if (this.owner) {
                dc = this.owner.get_dataContext();
            }
        }
        
        return dc;
    }
    Sys.Data.DataFilter.registerBaseMethod(this, 'get_dataContext');
    
    this.dispose = function() {
        this.owner = null;
        Sys.Data.DataFilter.callBaseMethod(this, 'dispose');
    }
    Sys.Data.DataFilter.registerBaseMethod(this, 'dispose');
    
    this.raisePropertyChanged = function(propertyName) {
        Sys.Data.DataFilter.callBaseMethod(this, 'raisePropertyChanged');
        if (this.owner) {
            this.owner._raiseFilterChanged(this);
        }
    }
    Sys.Data.DataFilter.registerBaseMethod(this, 'raisePropertyChanged');
    
    this.setOwner = function(owner) {
        this.owner = owner;
    }
}
Sys.Data.DataFilter.registerAbstractClass('Sys.Data.DataFilter', Sys.Component);
Sys.Data.PropertyFilter = function() {
    Sys.Data.PropertyFilter.initializeBase(this, [false]);
    
    var _property;
    var _value;
    
    this.get_property = function() {
        return _property;
    }
    this.set_property = function(name) {
        _property = name;
        this.raisePropertyChanged('property');
    }
    
    this.get_value = function() {
        return _value;
    }
    this.set_value = function(value) {
        _value = value;
        this.raisePropertyChanged('value');
    }
    
    this.filter = function(item) {
        if (Sys.ITypeDescriptorProvider.isImplementedBy(item)) {
            return Sys.TypeDescriptor.getProperty(item, _property) == _value;
        }
        return item[_property] == _value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.Data.PropertyFilter.callBaseMethod(this, 'getDescriptor');

        td.addProperty('property', String);
        td.addProperty('value', String);
        return td;
    }
}
Sys.Data.PropertyFilter.registerSealedClass('Sys.Data.PropertyFilter', Sys.Data.DataFilter);
Sys.TypeDescriptor.addType('script', 'propertyFilter', Sys.Data.PropertyFilter);
Sys.Data.DataSource = function() {
                        Sys.Data.DataSource.initializeBase(this, [true]);

    var _data = null;
    var _initialData;
    var _autoLoad = false;
    var _serviceURL = "";
    var _loadMethod = "";
    var _serviceType = Sys.Data.ServiceType.DataService;
    var _parameters = {};
    var _isReady = true;

    var _dataChangedDelegate;

    this.get_autoLoad = function() {
        return _autoLoad;
    }
    this.set_autoLoad = function(value) {
        _autoLoad = value;
    }

    this.get_data = function() {
        return _data;
    }
    this.set_data = function(data) {
debug.assert(!data || Sys.Data.DataTable.isInstanceOfType(data) || (data instanceof Array), "data must be of type Sys.Data.DataTable or Array.");
        var oldIsDirtyAndReady = this.get_isDirtyAndReady();
        var oldIsReady = this.get_isReady();
        var oldRowCount = this.get_rowCount();
        if (_data) {
            _data.propertyChanged.remove(_dataChangedDelegate);
        }
        if (data instanceof Array) {
            data = new Sys.Data.DataTable([], data);
        }
        _data = data;
        if (_data) {
            _data.propertyChanged.add(_dataChangedDelegate);
        }
        this.raisePropertyChanged('data');
        if (oldIsDirtyAndReady != this.get_isDirtyAndReady()) {
            this.raisePropertyChanged('isDirtyAndReady');
        }
        if (oldIsReady != this.get_isReady()) {
            this.raisePropertyChanged('isReady');
        }
        if (oldRowCount != this.get_rowCount()) {
            this.raisePropertyChanged('rowCount');
        }
    }

    this.get_initialData = function() {
        return _initialData;
    }
    this.set_initialData = function(value) {
        if (!_data) {
            if (this.get_isInitialized()) {
                var data = null;
                if (value && (value.length)) {
                    data = Sys.Serialization.JSON.deserialize(value);
                }
                this.set_data(data);
            }
            else {
                _initialData = value;
            }
        }
    }

    this.get_isDirtyAndReady = function() {
        return _isReady && _data && _data.get_isDirty();
    }

    this.get_isReady = function() {
        return _isReady;
    }
    this._set_isReady = function(value) {
        if (_isReady != value) {
            var oldDirtyAndReady = this.get_isDirtyAndReady();
            _isReady = value;
            this.raisePropertyChanged("isReady");
            if (this.get_isDirtyAndReady() != oldDirtyAndReady) {
                this.raisePropertyChanged("isDirtyAndReady");
            }
        }
    }

    this.get_loadMethod = function() {
        return _loadMethod;
    }
    this.set_loadMethod = function(value) {
        _loadMethod = value;
    }

    this.get_parameters = function() {
        return _parameters;
    }

    this.get_serviceURL = function() {
        return _serviceURL;
    }
    this.set_serviceURL = function(url) {
        _serviceURL = url;
    }

    this.get_serviceType = function() {
        return _serviceType;
    }
    this.set_serviceType = function(value) {
        _serviceType = value;
    }

    this.get_rowCount = function() {
        if (_data) {
            return _data.get_length();
        }
        return 0;
    }

    this.dispose = function() {
        if (_data) {
            _data.dispose();
        }
        _data = null;

        Sys.Data.DataSource.callBaseMethod(this, 'dispose');
    }

    this.getDescriptor = function() {
        var td = Sys.Data.DataSource.callBaseMethod(this, 'getDescriptor');

        td.addProperty('data', Object);
        td.addProperty('autoLoad', Boolean);
        td.addProperty('initialData', String);
        td.addProperty('isDirtyAndReady', Boolean, true);
        td.addProperty('isReady', Boolean, true);
        td.addProperty('loadMethod', String);
        td.addProperty('rowCount', Number, true);
        td.addProperty('serviceURL', String);
        td.addProperty('parameters', Object, true);
        td.addProperty('serviceType', Sys.Data.ServiceType);
        td.addMethod('load');
        td.addMethod('save');
        td.addEvent('dataAvailable', true);

        return td;
    }

    this.dataAvailable = this.createEvent();

    this.initialize = function() {
        Sys.Data.DataSource.callBaseMethod(this, 'initialize');
        if (_autoLoad || _initialData) {
            this.load();
        }
    }

    function onDataPropertyChanged(sender, args) {
        switch(args.get_propertyName()) {
            case "isDirty":
                this.raisePropertyChanged("isDirtyAndReady");
                break;
            case "length":
                this.raisePropertyChanged("rowCount");
                break;
        }
    }
    _dataChangedDelegate = Function.createDelegate(this, onDataPropertyChanged);

    function onRequestComplete(sender, eventArgs) {
        onLoadComplete.call(this, sender.get_response().get_object());
    }

    function onLoadComplete(rawData) {
        var oldDirtyAndReady = this.get_isDirtyAndReady();
        this.set_data(rawData);
        _isReady = true;
        this.raisePropertyChanged("isReady");
        if (this.get_isDirtyAndReady() != oldDirtyAndReady) {
            this.raisePropertyChanged("isDirtyAndReady");
        }
        this.dataAvailable.invoke(this, Sys.EventArgs.Empty);
    }

    function ready() {
        this._set_isReady(true);
    }

    this.load = function() {
                                                        if (_initialData) {
            this.set_data(Sys.Serialization.JSON.deserialize(_initialData));
            _initialData = null;
            return;
        }
        this._set_isReady(false);
        if (_serviceType == Sys.Data.ServiceType.DataService) {
            Sys.Net.ServiceMethod.invoke(_serviceURL, "GetData", null,
                {parameters: _parameters, loadMethod: _loadMethod},
                Function.createDelegate(this, onLoadComplete),
                Function.createDelegate(this, ready));
        }
        else {
            var url = Sys.Net.WebRequest.createUrl(_serviceURL, _parameters);
            var request = new Sys.Net.WebRequest();
            request.set_url(url);
            request.completed.add(Function.createDelegate(this, onRequestComplete));
            request.timeout.add(Function.createDelegate(this, ready));

            request.invoke();
        }
    }

    this.save = function() {
        if (_data && _data.get_isDirty()) {
            var changes = _data.getChanges();
            this._set_isReady(false);
            if (_serviceType == Sys.Data.ServiceType.DataService) {
                Sys.Net.ServiceMethod.invoke(_serviceURL, "SaveData", null,
                    {changeList: changes, parameters: _parameters, loadMethod: _loadMethod},
                    Function.createDelegate(this, onLoadComplete),
                    Function.createDelegate(this, ready));
            }
            else {
throw Error.createError("Save is not supported in Handler mode.");
            }
        }
    }
}
Sys.Data.DataSource.registerSealedClass('Sys.Data.DataSource', Sys.Component);
Sys.TypeDescriptor.addType('script', 'dataSource', Sys.Data.DataSource);
Type.createEnum('Sys.Data.ServiceType', 'DataService', 0, 'Handler', 1);
Type.createEnum('Sys.Data.SortDirection', 'Ascending', 0, 'Descending', 1);
Sys.Data.XMLDataSource = function() {
    Sys.Data.XMLDataSource.initializeBase(this, [true]);

    var _document = null;
    var _initialDocument = null;
    
    var _data = null;
    var _xpath = '';
    
    var _serviceURL;
    var _parameters = { };
    var _isReady = false;
    var _autoLoad = false;
    
    this.get_autoLoad = function() {
        return _autoLoad;
    }
    this.set_autoLoad = function(value) {
        _autoLoad = value;
    }
    
    this.get_document = function() {
        return _document;
    }
    
    this.get_data = function() {
        return _data;
    }
    
    this.get_initialDocument = function() {
        return _initialDocument;
    }
    this.set_initialDocument = function(value) {
        if (!_document) {
            var document = new XMLDOM(value.trim());
            if (this.get_isInitialized()) {
                this._setDocument(document);
            }
            else {
                _initialDocument = document;
            }
        }
    }
    
    this.get_isReady = function() {
        return _isReady;
    }
    
    this.get_parameters = function() {
        return _parameters;
    }
    
    this.get_serviceURL = function() {
        return _serviceURL;
    }
    this.set_serviceURL = function(value) {
        _serviceURL = value;
    }
    
    this.get_xpath = function() {
        return _xpath;
    }
    this.set_xpath = function(value) {
        if (_xpath != value) {
            _xpath = value;
            
            if (_document) {
                this._updateData();
            }
        }
    }
    
    this.documentAvailable = this.createEvent();
    
    this.dispose = function() {
        _document = null;
        _initialDocument = null;
        _data = null;
        
        Sys.Data.XMLDataSource.callBaseMethod(this, 'dispose');
    }
    
    this.getDescriptor = function() {
        var td = Sys.Data.DataSource.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('autoLoad', Boolean);
        td.addProperty('data', Object, true);
        td.addProperty('document', Object, true);
        td.addProperty('initialDocument', String);
        td.addProperty('isReady', Boolean, true);
        td.addProperty('parameters', Object, true);
        td.addProperty('serviceURL', String);
        td.addProperty('xpath', String);
        td.addEvent('documentAvailable', true);
        td.addMethod('load');
        
        return td;
    }
    
    this.initialize = function() {
        Sys.Data.XMLDataSource.callBaseMethod(this, 'initialize');
        
        if (_autoLoad) {
            this.load();
        }
    }
    
    this.load = function() {
        if (_initialDocument) {
            var document = _initialDocument;
            _initialDocument = null;
            
            this._setDocument(document);
            this._updateReady(true);
        }
        else {
            this._invokeService();
        }
    }
    
    this._invokeService = function() {
        var url = Sys.Net.WebRequest.createUrl(_serviceURL, _parameters);
        var request = new Sys.Net.WebRequest();
        request.set_url(url);
        request.completed.add(Function.createDelegate(this, this._serviceCompleted));
        request.timeout.add(Function.createDelegate(this, this._serviceTimeout));
        
        request.invoke();
        this._updateReady(false);
    }
    
    this._serviceCompleted = function(sender, eventArgs) {
        if (sender.get_statusCode() == 200) {
            this._setDocument(sender.get_xml());
        }
    
        this._updateReady(true);
    }
    
    this._serviceTimeout = function(sender, eventArgs) {
        this._updateReady(true);
    }
    
    this._setDocument = function(document) {
        _document = document;
        this._updateData();
        this.raisePropertyChanged('document');
        this.documentAvailable.invoke(this, Sys.EventArgs.Empty);
    }
    
    this._updateData = function() {
        var xpath = _xpath;
        if (!xpath || !xpath.length) {
            xpath = '*/*';
        }
        
        var nodes = _document.selectNodes(xpath);

                                var data = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            
            if (!node || (node.nodeType != 1)) {
                continue;
            }
            data.add(node);
        }
        
        _data = data;
        this.raisePropertyChanged('data');
    }
    
    this._updateReady = function(ready) {
        _isReady = ready;
        this.raisePropertyChanged('isReady');
    }
}
Sys.Data.XMLDataSource.registerSealedClass('Sys.Data.XMLDataSource', Sys.Component);
Sys.TypeDescriptor.addType('script', 'xmlDataSource', Sys.Data.XMLDataSource);

Type.registerNamespace('Sys.Services');

Sys.Services._AuthenticationService = function() {
    this.path = "ScriptServices/Microsoft/Web/Services/Standard/AuthenticationWebService.asmx";
    
    var cm=Sys.Net.ServiceMethod.createProxyMethod;
    cm(this, "login", "userName", "password", "createPersistentCookie");
    cm(this, "logout");
    cm(this, "validateUser", "userName", "password");
    }
Sys.Services._AuthenticationService.registerSealedClass('Sys.Services._AuthenticationService');

Sys.Services.AuthenticationService = new Sys.Services._AuthenticationService();

Sys._Profile = function() {
    Sys._Profile.initializeBase(this);

    var _properties = { };
    var _propertyNames;
    var _isDirty;
    var _autoSave;
    
    Sys.Runtime.registerDisposableObject(this);
    
    this.get_autoSave = function() {
        return _autoSave;
    }
    this.set_autoSave = function(value) {
        _autoSave = value;
    }

    this.get_initialData = function() {
        return null;
    }
    this.set_initialData = function(value) {
        if (value && value.length) {
            this._updateProperties(Sys.Serialization.JSON.deserialize(value));
        }
    }
    
    this.get_isDirty = function() {
        return _isDirty;
    }
    
    this.get_propertyNames = function() {
        return _propertyNames;
    }
    this.set_propertyNames = function(value) {
        _propertyNames = value;
    }
    
    this.loaded = new Type.Event(null);

    this.propertyChanged = new Type.Event(null);
    
    this.saved = new Type.Event(null);
    
    this.dispose = function() {
        this.propertyChanged.dispose();
        this.loaded.dispose();
        this.saved.dispose();

        Sys.Runtime.unregisterDisposableObject(this);
    }

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();

        td.addProperty('autoSave', Boolean);
        td.addProperty('initialData', String);
        td.addProperty('isDirty', Boolean,  true);
        td.addProperty('propertyNames', Array);
        td.addMethod('load');
        td.addMethod('save');
        td.addEvent('loaded',  false);
        td.addEvent('saved',  false);
        
        return td;
    }
    
    this.getProperty = function(name, key) {
        if (_properties) {
            return _properties[name];
        }
        return null;
    }
    
    this.invokeMethod = function(methodName, parameters) {
    }
    
    this.load = function() {
        Sys.Net.ServiceMethod.invoke(Sys._Profile.WebServicePath, "GetProfile", null,
                                                { properties: _propertyNames },
                                                Function.createDelegate(this, this._onRequestComplete), null, null, null,
                                                 true);
    }
    
    this.save = function() {
        Sys.Net.ServiceMethod.invoke(Sys._Profile.WebServicePath, "SetProfile", null,
                                                { values: _properties },
                                                Function.createDelegate(this, this._onRequestComplete), null, null, null,
                                                 false);
    }
    
    this._saveIfDirty = function() {
        if (_isDirty) {
            this.save();
        }
    }
    
    this.setProperty = function(name, value, key) {
        if (!_properties) {
            this._updateProperties({ });
        }
        _properties[name] = value;
        this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs(name));
        
        if (!_isDirty) {
            _isDirty = true;
            this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs('isDirty'));
        }
        
        if (_autoSave) {
            window.setTimeout(Function.createDelegate(this, this._saveIfDirty), 0);
        }
    }

    this._onRequestComplete = function(result, response, userContext) {
        if (userContext) {
            this._updateProperties(result);
            _isDirty = false;
            this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs(null));

            this.loaded.invoke(this, null);
        }
        else {
            _isDirty = false;
            this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs('isDirty'));

            this.saved.invoke(this, null);
        }
    }
    
    this._updateProperties = function(properties) {
        _properties = properties;
        this.properties = properties;
    }
}
Sys._Profile.WebServicePath = 'ScriptServices/Microsoft/Web/Services/Standard/ProfileWebService.asmx';

Sys._Profile.registerSealedClass('Sys._Profile', null, Sys.IDisposable, Sys.ITypeDescriptorProvider, Sys.ICustomTypeDescriptor, Sys.INotifyPropertyChanged);
Sys.TypeDescriptor.addType('script', 'profile', Sys._Profile);

Sys._Profile.parseFromMarkup = function(type, node, markupContext) {
    if (!markupContext.get_isGlobal()) {
        return null;
    }

    var id;
    var idAttribute = node.attributes.getNamedItem('id');
    if (idAttribute) {
        id = idAttribute.nodeValue;
        node.attributes.removeNamedItem('id')
    }
    
    Sys.MarkupParser.initializeObject(Sys.Profile, node, markupContext);
    if (!Sys.Profile.properties) {
        Sys.Profile._updateProperties({ });
        Sys.Profile.load();
    }

    if (id && id.length) {
        markupContext.addObject(id, Sys.Profile);
        node.attributes.setNamedItem(idAttribute);
    }
    return Sys.Profile;
}

Sys.Profile = new Sys._Profile();



Type.registerNamespace('Sys.UI');


function $(elementID) {
    return document.getElementById(elementID);
}

Sys.UI._escapeCData = function(value) {
    return value.replace(/\\/g, '\\\\').replace(/]/g, '\\]');
}

Sys.UI._unescapeCData = function(cDataValue) {
    return cDataValue.replace(/\\\\/g, '\\').replace(/\\]/g, ']');
}


Sys.Attributes.defineAttribute('ValueProperty');
Type.createEnum('Sys.UI.VisibilityMode', 'Hide', 0, 'Collapse', 1);

Sys.UI.Control = function(associatedElement) {
    Sys.UI.Control.initializeBase(this, [true]);

    this.element = associatedElement;
    this.element.control = this;
    
    var _oldDisplayMode = this.element.style.displayMode;
    if (!_oldDisplayMode || (_oldDisplayMode == 'none')) {
        _oldDisplayMode = '';
    }

    var _visibilityMode = Sys.UI.VisibilityMode.Hide;
    
    var _propertyChangeHandler;
    var _behaviors;
    var _parent;

    this.get_accessKey = function() {
        return this.element.accessKey;
    }
    this.set_accessKey = function(value) {
        if (this.element.accessKey != value) {
            this.element.accessKey = value;
            this.raisePropertyChanged('accessKey');
        }
    }
    
    this.get_associatedElement = function() {
        if (!_propertyChangeHandler) {
            _propertyChangeHandler = Function.createDelegate(this, this._onPropertyChange);
            this.element.attachEvent('onpropertychange', _propertyChangeHandler);
        }
        return this.element;
    }
    
    this.get_behaviors = function() {
        if (!_behaviors) {
            _behaviors = Sys.Component.createCollection(this);
        }
        return _behaviors;
    }

    this.get_cssClass = function() {
        return this.element.className;
    }
    this.set_cssClass = function(value) {
        if (this.element.className != value) {
            this.element.className = value;
            this.raisePropertyChanged('cssClass');
        }
    }

    this.get_dataContext = function() {
        var dc = Sys.UI.Control.callBaseMethod(this, 'get_dataContext');
        if (!dc) {
            var parent = this.get_parent();
            if (parent) {
                dc = parent.get_dataContext();
            }
        }
        
        return dc;
    }
    Sys.UI.Control.registerBaseMethod(this, 'get_dataContext');
    
    this.get_enabled = function() {
        return !this.element.disabled;
    }
    this.set_enabled = function(value) {
        if (value != this.get_enabled()) {
            this.element.disabled = !value;
            this.raisePropertyChanged('enabled');
        }
    }
    
    this.get_parent = function() {
        if (_parent) {
            return _parent;
        }
        else {
            var parentElement = this.element.parentNode;
            while (parentElement) {
                if (parentElement.control) {
                    return parentElement.control;
                }
                parentElement = parentElement.parentNode;
            }
            return null;
        }
    }
    this.set_parent = function(control) {
        _parent = control;
    }
    
    this.get_style = function() {
        if (!_propertyChangeHandler) {
            _propertyChangeHandler = Function.createDelegate(this, this._onPropertyChange);
            this.element.attachEvent('onpropertychange', _propertyChangeHandler);
        }
        return this.element.style;
    }

    this.get_tabIndex = function() {
        return this.element.tabIndex;
    }
    this.set_tabIndex = function(value) {
        var old = this.element.tabIndex;
        this.element.tabIndex = value;
        if (old != value) {
            this.raisePropertyChanged('tabIndex');
        }
    }
    
    this.get_visibilityMode = function() {
        return _visibilityMode;
    }
    this.set_visibilityMode = function(value) {
        if (_visibilityMode != value) {
            _visibilityMode = value;
            if (this.get_visible() == false) {
                if (_visibilityMode == Sys.UI.VisibilityMode.Hide) {
                    this.element.style.display = _oldDisplayMode;
                }
                else {
                    this.element.style.display = 'none';
                }
            }

            this.raisePropertyChanged('visibilityMode');
        }
    }
    
    this.get_visible = function() {
        return (this.element.style.visibility != 'hidden');
    }
    this.set_visible = function(value) {
        if (value != this.get_visible()) {
            this.element.style.visibility = value ? 'visible' : 'hidden';
            if (value || (_visibilityMode == Sys.UI.VisibilityMode.Hide)) {
                this.element.style.display = _oldDisplayMode;
            }
            else {
                this.element.style.display = 'none';
            }

            this.raisePropertyChanged('visible');
        }
    }
    
    this.validation = this.createEvent();
    
    this.addCssClass = function(className) {
        if (!this.containsCssClass(className)) {
            this.set_cssClass(this.get_cssClass() + ' ' + className);
        }
    }
    
    this.containsCssClass = function(className) {
        return Sys.UI.Control.containsCssClass(this.element, className);
    }
    
    this.dispose = function() {
        if (_propertyChangeHandler) {
            this.element.detachEvent('onpropertychange', _propertyChangeHandler);
            _propertyChangeHandler = null;
        }
        
        if (_behaviors) {
            _behaviors.dispose();
            _behaviors = null;
        }

        if (this.element) {
            this.element.control = null;
            this.element = null;
        }
        
        Sys.UI.Control.callBaseMethod(this, 'dispose');
    }
    Sys.UI.Control.registerBaseMethod(this, 'dispose');
    
    this.findObject = function(id) {
        var object;
        if (this.element.markupContext) {
            object = this.element.markupContext.findObject(id);
        }
        if (!object) {
            var parent = this.get_parent();
            if (parent) {
                object = parent.findObject(id);
            }
            else {
                object = Sys.Application.findObject(id);
            }
        }
        return object;
    }
    
    this.focus = function() {
        this.element.focus();
    }

    this.getDescriptor = function() {
        var td = Sys.UI.Control.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('accessKey', String);
        td.addProperty('associatedElement', Object, true);
        td.addProperty('behaviors', Array, true);
        td.addProperty('cssClass', String);
        td.addProperty('enabled', Boolean);
        td.addProperty('parent', Object);
        td.addProperty('style', Object, true);
        td.addProperty('tabIndex', Number);
        td.addProperty('visible', Boolean);
        td.addProperty('visibilityMode', Sys.UI.VisibilityMode);
        td.addMethod('addCssClass', [ Sys.TypeDescriptor.createParameter('className', String) ]);
        td.addMethod('focus');
        td.addMethod('scrollIntoView');
        td.addMethod('removeCssClass', [ Sys.TypeDescriptor.createParameter('className', String) ]);
        td.addMethod('toggleCssClass', [ Sys.TypeDescriptor.createParameter('className', String) ]);
        return td;
    }
    Sys.UI.Control.registerBaseMethod(this, 'getDescriptor');

    this.onBubbleEvent = function(source, args) {
        return false;
    }
    Sys.UI.Control.registerBaseMethod(this, 'onBubbleEvent');
    
    this.raiseBubbleEvent = function(source, args) {
        var currentTarget = this.get_parent();
        while (currentTarget) {
            if (currentTarget.onBubbleEvent(source, args)) {
                return;
            }
            currentTarget = currentTarget.get_parent();
        }
    }
    
    this.removeCssClass = function(className) {
        Sys.UI.Control.removeCssClass(this.element, className);
    }
    
    this.scrollIntoView = function() {
        this.element.scrollIntoView();
    }
    
    this.toggleCssClass = function(className) {
        if (this.containsCssClass(className)) {
            this.removeCssClass(className);
        }
        else {
            this.addCssClass(className);
        }
    }
    
    this._onPropertyChange = function() {
        if (window.event.propertyName.startsWith('style')) {
            this.raisePropertyChanged('style');
        }
        else {
            this.raisePropertyChanged('associatedElement');
        }
    }
}
Sys.UI.Control.registerClass('Sys.UI.Control', Sys.Component);
Sys.TypeDescriptor.addType('script', 'control', Sys.UI.Control);

Sys.UI.Control.parseFromMarkup = function(type, node, markupContext) {
    var idAttribute = node.attributes.getNamedItem('id');
debug.assert(idAttribute && idAttribute.nodeValue.length, String.format('No associated HTML element was specified for control of type "{0}"', type.getName()));

    var id = idAttribute.nodeValue;
    var associatedElement = markupContext.findElement(id);
debug.assert(associatedElement, String.format('Could not find an HTML element with ID "{0}" for control of type "{1}"', id, type.getName()));
    
    var dataContextHidden = false;
    var dataContext = markupContext.get_dataContext();
    if (dataContext) {
        dataContextHidden = markupContext.hideDataContext();
    }

    var newControl = new type(associatedElement);
    var control = Sys.MarkupParser.initializeObject(newControl, node, markupContext);
    
    if (control) {
        var id = control.get_id();
debug.assert(id && id.length);
        
        markupContext.addObject(id, control);

        if (dataContext) {
            control.set_dataContext(dataContext);
        }
    }
    else {
        newControl.dispose();
    }
    
    if (dataContextHidden) {
        markupContext.restoreDataContext();
    }

    return control;
}

Sys.UI.Control.setLocation = function(element, position) {
    element.style.left = position.x + "px";
    element.style.top = position.y + "px";
}

Sys.UI.Control.overlaps = function(r1, r2) {
    var xLeft = (r1.x >= r2.x && r1.x <= (r2.x + r2.width));
    var xRight = ((r1.x + r1.width) >= r2.x && (r1.x + r1.width) <= r2.x + r2.width);
    var xComplete = ((r1.x < r2.x) && ((r1.x + r1.height) > (r2.x + r2.height)));
    
    var yLeft = (r1.y >= r2.y && r1.y <= (r2.y + r2.height));
    var yRight = ((r1.y + r1.height) >= r2.y && (r1.y + r1.height) <= r2.y + r2.height);
    var yComplete = ((r1.y < r2.y) && ((r1.y + r1.height) > (r2.y + r2.height)));
    if ((xLeft || xRight || xComplete) && (yLeft || yRight || yComplete)) {
        return true;
    }
    
    return false;
}

Sys.UI.Control.getLocation = function(element) {
    var offsetX = 0;
    var offsetY = 0;
    var parent;
    
    for (parent = element; parent; parent = parent.offsetParent) {
        if (parent.offsetLeft) {
            offsetX += parent.offsetLeft;
        }
        if (parent.offsetTop) {
            offsetY += parent.offsetTop;
        }
    }

    return { x: offsetX, y: offsetY };
}

Sys.UI.Control.getBounds = function(element) {
    var offset = Sys.UI.Control.getLocation(element);
    
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    
    return { x: offset.x, y: offset.y, width: width, height: height };
}

Sys.UI.Control.removeCssClass = function(element, className) {
    var currentClassName = ' ' + element.className + ' ';
    var index = currentClassName.indexOf(' ' + className + ' ');
    if (index >= 0) {
        var newClassName = (currentClassName.substr(0, index) + ' ' +
            currentClassName.substring(index + className.length + 1, currentClassName.length)).trim();
        if (element.control) {
            element.control.set_cssClass(newClassName);
        }
        else {
            element.className = newClassName;
        }
    }
}

Sys.UI.Control.addCssClass = function(element, className) {
    if (!Sys.UI.Control.containsCssClass(element, className)) {
        if (element.control) {
            element.control.addCssClass(className);
        }
        else {
            element.className += ' ' + className;
        }
    }
}

Sys.UI.Control.containsCssClass = function(element, className) {
    return element.className.split(' ').contains(className);
}
Sys.UI.CommandEventArgs = function(commandName, argument) {
    Sys.UI.CommandEventArgs.initializeBase(this, []);
    
    var _commandName = commandName;
    var _argument = argument;
    
    this.get_argument = function() {
        return _argument;
    }
    
    this.get_commandName = function() {
        return _commandName;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.CommandEventArgs.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('argument', String, true);
        td.addProperty('commandName', String, true);
        
        return td;
    }
    Sys.UI.CommandEventArgs.registerBaseMethod(this, 'getDescriptor');
}
Sys.UI.CommandEventArgs.registerClass('Sys.UI.CommandEventArgs', Sys.EventArgs);

Sys.UI.Behavior = function() {
    Sys.UI.Behavior.initializeBase(this, [false]);
    
    this.get_dataContext = function() {
        var dc = Sys.UI.Behavior.callBaseMethod(this, 'get_dataContext');
        if (!dc) {
            if (this.control) {
                dc = this.control.get_dataContext();
            }
        }
        
        return dc;
    }
    
    this.dispose = function() {
        this.control = null;
        Sys.UI.Behavior.callBaseMethod(this, 'dispose');
    }
    Sys.UI.Behavior.registerBaseMethod(this, 'dispose');
    
    this.setOwner = function(control) {
        this.control = control;
    }
    Sys.UI.Behavior.registerBaseMethod(this, 'setOwner');
}
Sys.UI.Behavior.registerAbstractClass('Sys.UI.Behavior', Sys.Component);
Sys.UI.IValidationTarget = function() {
    this.get_isInvalid = Function.abstractMethod;
    this.get_validationMessage = Function.abstractMethod;
    this.validated = null;
    this.validate = Function.abstractMethod;
}
Sys.UI.IValidationTarget.registerInterface('Sys.UI.IValidationTarget');

Sys.UI.Validator = function() {
    Sys.UI.Validator.initializeBase(this);

    var _errorMessage;
    var _isInvalid = false;
    
    this.get_dataContext = function() {
        var dc = Sys.Component.callBaseMethod(this, 'get_dataContext');
        if (!dc) {
            if (this.control) {
                dc = this.control.get_dataContext();
            }
        }
        
        return dc;
    }

    this.get_errorMessage = function() {
        return _errorMessage;
    }
    this.set_errorMessage = function(value) {
        _errorMessage = value;
    }
    
    this.get_isInvalid = function() {
        return _isInvalid;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.Validator.callBaseMethod(this, 'getDescriptor');

        td.addProperty('errorMessage', String);
        td.addProperty('isInvalid', Boolean, true);
        return td;
    }
    Sys.UI.Validator.registerBaseMethod(this, 'getDescriptor');
    
    this.dispose = function() {
        this.control = null;
        Sys.UI.Validator.callBaseMethod(this, 'dispose');
    }
    Sys.UI.Validator.registerBaseMethod(this, 'dispose');

    this.performValidation = function(value) {
                _isInvalid = !this.validate(value);
    }
    
    this.setOwner = function(control) {
        this.control = control;
    }

    this.validate = Function.abstractMethod;
}
Sys.UI.Validator.registerAbstractClass('Sys.UI.Validator', Sys.Component);
Sys.UI.ValidationGroup = function() {
    Sys.UI.ValidationGroup.initializeBase(this);

    var _associatedControls = [];
    var _valid = true;
    var _validated = false;
    
    var _validatedHandler;
    
    this.get_associatedControls = function() {
        return _associatedControls;
    }
    
    this.get_isValid = function() {
        if (!_validated) {
            this.validate();
            _validated = true;
        }
        return _valid;
    }

    this.dispose = function() {
        if (_associatedControls) {
            for (var i = 0; i < _associatedControls.length; i++) {
                _associatedControls[i].get_component().validated.remove(_validatedHandler);
                _associatedControls[i].dispose();
            }
            _validatedHandler = null;
            _associatedControls = null;
        }
        
        Sys.UI.ValidationGroup.callBaseMethod(this, 'dispose');
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.ValidationGroup.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('isValid', Boolean, true);
        td.addProperty('associatedControls', Array, true);
        return td;
    }
    
    this.initialize = function() {
        Sys.UI.ValidationGroup.callBaseMethod(this, 'initialize');

        _validatedHandler = Function.createDelegate(this, this._onControlValidated);
        for (var i = 0; i < _associatedControls.length; i++) {
            _associatedControls[i].get_component().validated.add(_validatedHandler);
        }
    }

    this.validate = function() {
        var valid = true;
        
        if (_associatedControls && _associatedControls.length) {
            for (var i = 0; i < _associatedControls.length; i++) {
                if (_associatedControls[i].get_component().get_isInvalid()) {
                    valid = false;
                    break;
                }
            }
        }
        
        _valid = valid;
    }
    
    this._onControlValidated = function(sender, eventArgs) {
        var isValid = _valid;
        this.validate();
        
        if (_valid != isValid) {
            this.raisePropertyChanged('isValid');
        }
    }
}
Sys.UI.ValidationGroup.registerSealedClass('Sys.UI.ValidationGroup', Sys.Component);
Sys.TypeDescriptor.addType('script', 'validationGroup', Sys.UI.ValidationGroup);

Sys.UI.InputControl = function(associatedElement) {
    Sys.UI.InputControl.initializeBase(this, [associatedElement]);

    var _valuePropertyName;

    var _validators;
    var _invalid = false;
    var _validated = false;
    var _validationMessage;
    
    this.get_isInvalid = function() {
        if (!_validated) {
            this.validate(false);
            _validated = true;
        }
        return _invalid;
    }

    this.get_validationMessage = function() {
        return this.get_isInvalid() ? _validationMessage : '';
    }

    this.get_validators = function() {
        if (!_validators) {
            _validators = Sys.Component.createCollection(this);
        }
        return _validators;
    }
    
    this.validated = this.createEvent();
    
    this.dispose = function() {
        if (_validators) {
            _validators.dispose();
            _validators = null;
        }

        Sys.UI.InputControl.callBaseMethod(this, 'dispose');
    }
    Sys.UI.InputControl.registerBaseMethod(this, 'dispose');

    this.getDescriptor = function() {
        var td = Sys.UI.InputControl.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('isInvalid', Boolean, true);
        td.addProperty('validationMessage', String, true);
        td.addProperty('validators', Array, true);
        return td;
    }
    Sys.UI.InputControl.registerBaseMethod(this, 'getDescriptor');

    this.raisePropertyChanged = function(propertyName) {
        if (_validators && _validators.length) {
            if (!_valuePropertyName) {
                _valuePropertyName = Sys.TypeDescriptor.getAttribute(this, Sys.Attributes.ValueProperty);
            }

            if (_valuePropertyName == propertyName) {
                if (!this.validate(true)) {
                    return;
                }
            }
        }

        Sys.UI.InputControl.callBaseMethod(this, 'raisePropertyChanged', [propertyName]);
    }
    Sys.UI.InputControl.registerBaseMethod(this, 'raisePropertyChanged');
    
    this.validate = function(raiseEvent) {
        if (!_validators || !_validators.length) {
            return true;
        }

        if (!_valuePropertyName) {
            _valuePropertyName = Sys.TypeDescriptor.getAttribute(this, Sys.Attributes.ValueProperty);
        }
        var value = Sys.TypeDescriptor.getProperty(this, _valuePropertyName);

        var invalidValidator = null;
        for (var i = 0; i < _validators.length; i++) {
            var validator = _validators[i];
            
            validator.performValidation(value);
            if (validator.get_isInvalid()) {
                invalidValidator = validator;
                
                _validationMessage = invalidValidator.get_errorMessage();
                _invalid = true;
                break;
            }
        }
        if (!invalidValidator) {
            _invalid = false;
        }

        if (raiseEvent) {
            this.validated.invoke(this, Sys.EventArgs.Empty);
        }
        return !_invalid;
    }
}
Sys.UI.InputControl.registerAbstractClass('Sys.UI.InputControl', Sys.UI.Control, Sys.UI.IValidationTarget);
Sys.TemplateInstance = function() {
    this.instanceElement = null;
    this.callbackResult = null;
}

Sys.UI.ITemplate = function() {
    this.createInstance = Function.abstractMethod;
    this.initialize = Function.abstractMethod;
}
Sys.UI.ITemplate.registerInterface('Sys.UI.ITemplate');
Sys.TypeDescriptor.addType('script', 'template', Sys.UI.ITemplate);

Sys.UI.ITemplate.parseFromMarkup = function(type, node, markupContext) {
    var layoutElementAttribute = node.attributes.getNamedItem('layoutElement');
debug.assert(layoutElementAttribute && layoutElementAttribute.nodeValue.length, 'Missing layoutElement attribute on template definition');
    
    var layoutElementID = layoutElementAttribute.nodeValue;
    var layoutElement = markupContext.findElement(layoutElementID);
debug.assert(layoutElement, String.format('Could not find the HTML element with ID "{0}" associated with the template', layoutElementID));
    
    return new Sys.UI.DeclarativeTemplate(layoutElement, node, markupContext);
}

Sys.UI.ITemplate.disposeInstance = function(container) {
    if (container.markupContext) {
        container.markupContext.dispose();
        container.markupContext = null;
    }
}

Sys.UI.DeclarativeTemplate = function(layoutElement, scriptNode, parentMarkupContext) {
    Sys.UI.DeclarativeTemplate.initializeBase(this);
    
    var _layoutElement = layoutElement;
    var _scriptNode = scriptNode;
    var _parentMarkupContext = parentMarkupContext;
    
    this.createInstance = function(containerElement, dataContext, instanceElementCreatedCallback, callbackContext) {
        var result = new Sys.TemplateInstance();
        result.instanceElement = _layoutElement.cloneNode(true);
        
        var documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(result.instanceElement);
        
        var markupContext = Sys.MarkupContext.createLocalContext(documentFragment, _parentMarkupContext, dataContext);
        markupContext.open();
        Sys.MarkupParser.parseNodes(_scriptNode.childNodes, markupContext);

        if (instanceElementCreatedCallback) {
            result.callbackResult = instanceElementCreatedCallback(result.instanceElement, markupContext, callbackContext);
        }
        
        result.instanceElement.markupContext = markupContext;
        containerElement.appendChild(result.instanceElement);
        markupContext.close();
        
        return result;
    }
    
    this.dispose = function() {
        _layoutElement = null;
        _scriptNode = null;
        _parentMarkupContext = null;
    }
    
    this.initialize = function() {
        if (_layoutElement.parentNode) {
            _layoutElement.parentNode.removeChild(_layoutElement);
        }
    }
}
Sys.UI.DeclarativeTemplate.registerSealedClass('Sys.UI.DeclarativeTemplate', null, Sys.UI.ITemplate, Sys.IDisposable);
Type.createEnum('Sys.UI.DialogResult', 'OK', 0, 'Cancel', 1);
Type.createEnum('Sys.UI.MessageBoxStyle', 'OK', 0, 'OKCancel', 1);
Sys.UI.Window = new function() {

    this.messageBox = function(text, style) {
        if (!style) {
            style = Sys.UI.MessageBoxStyle.OK;
        }
        
        var result = Sys.UI.DialogResult.OK;
        switch (style) {
            case Sys.UI.MessageBoxStyle.OK:
                window.alert(text);
                break;
            case Sys.UI.MessageBoxStyle.OKCancel:
                if (window.confirm(text) == false) {
                    result = Sys.UI.DialogResult.Cancel;
                }
                break;
        }
        
        return result;
    }
    
    this.inputBox = function(promptText, defaultValue) {
        if (!defaultValue) {
            defaultValue = '';
        }
        return window.prompt(promptText, defaultValue);
    }
}

Type.createEnum('Sys.UI.Key',
    "Backspace", 8,
    "Tab", 9,
    "Return", 13,
    "Esc", 27,
    "Space", 32,
    "PageUp", 33,
    "PageDown", 34,
    "End", 35,
    "Home", 36,
    "Left", 37,
    "Up", 38,
    "Right", 39,
    "Down", 40,
    "WindowsDelete", 46,
    "Delete", 127
);





Sys.UI.Label = function(associatedElement) {
    var _htmlEncode = false;

    Sys.UI.Label.initializeBase(this, [associatedElement]);

    this.get_htmlEncode = function() {
        return _htmlEncode;
    }
    this.set_htmlEncode = function(value) {
        _htmlEncode = value;
    }

    this.get_text = function() {
        if (_htmlEncode) {
            return this.element.innerText;
        }
        else {
            return this.element.innerHTML;
        }
    }
    this.set_text = function(value) {
        if (_htmlEncode) {
            if (this.element.innerText !== value) {
                this.element.innerText = value;
                this.raisePropertyChanged('text');
            }
        }
        else {
            if (this.element.innerHTML !== value) {
                this.element.innerHTML = value;
                this.raisePropertyChanged('text');
            }
        }
    }

    this.getDescriptor = function() {
        var td = Sys.UI.Label.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('htmlEncode', Boolean);
        td.addProperty('text', String);
        return td;
    }
    Sys.UI.Label.registerBaseMethod(this, 'getDescriptor');
}
Sys.UI.Label.registerClass('Sys.UI.Label', Sys.UI.Control);
Sys.TypeDescriptor.addType('script', 'label', Sys.UI.Label);


Sys.UI.Image = function(associatedElement) {
    Sys.UI.Image.initializeBase(this, [associatedElement]);
    
    this.get_alternateText = function() {
        return this.element.alt;
    }
    
    this.set_alternateText = function(value) {
        this.element.alt = value;
    }
    
    this.get_height = function() {
        return this.element.height;
    }
    this.set_height = function(value) {
        this.element.height = value;
    }
    
    this.get_imageURL = function() {
        return this.element.src;
    }
    this.set_imageURL = function(value) {
        this.element.src = value;
    }
    
    this.get_width = function() {
        return this.element.width;
    }
    this.set_width = function(value) {
        this.element.width = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.Image.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('alternateText', String);
        td.addProperty('height', Number);
        td.addProperty('imageURL', String);
        td.addProperty('width', Number);
        return td;
    }
    Sys.UI.Image.registerBaseMethod(this, 'getDescriptor');
}
Sys.UI.Image.registerClass('Sys.UI.Image', Sys.UI.Control);
Sys.TypeDescriptor.addType('script', 'image', Sys.UI.Image);


Sys.UI.HyperLink = function(associatedElement) {
    Sys.UI.HyperLink.initializeBase(this, [associatedElement]);
    
    var _clickHandler;

    this.get_navigateURL = function() {
        return this.element.href;
    }
    this.set_navigateURL = function(value) {
        this.element.href = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.HyperLink.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('navigateURL', String);
        td.addEvent('click', true);
        return td;
    }
    Sys.UI.HyperLink.registerBaseMethod(this, 'getDescriptor');
    
    this.click = this.createEvent();

    this.dispose = function() {
        if (_clickHandler) {
            this.element.detachEvent('onclick', _clickHandler);
            _clickHandler = null;
        }
        
        Sys.UI.HyperLink.callBaseMethod(this, 'dispose');
    }
    
    this.initialize = function() {
        Sys.UI.HyperLink.callBaseMethod(this, 'initialize');
        
        _clickHandler = Function.createDelegate(this, this._onClick);
        this.element.attachEvent('onclick', _clickHandler);
    }
    
    this._onClick = function() {
        this.click.invoke(this, Sys.EventArgs.Empty);
    }
}
Sys.UI.HyperLink.registerClass('Sys.UI.HyperLink', Sys.UI.Label);
Sys.TypeDescriptor.addType('script', 'hyperLink', Sys.UI.HyperLink);


Sys.UI.Button = function(associatedElement) {
    Sys.UI.Button.initializeBase(this, [associatedElement]);

    var _clickHandler;
    var _command;
    var _arg;
    
    this.get_argument = function() {
        return _arg;
    }
    this.set_argument = function(value) {
        if (_arg != value) {
            _arg = value;
            this.raisePropertyChanged('argument');
        }
    }
    
    this.get_command = function() {
        return _command;
    }
    this.set_command = function(value) {
        if (_command != value) {
            _command = value;
            this.raisePropertyChanged('command');
        }
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.Button.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('command', String);
        td.addProperty('argument', String);
        td.addEvent('click', true);
        return td;
    }
    Sys.UI.Button.registerBaseMethod(this, 'getDescriptor');
    
    this.click = this.createEvent();

    this.dispose = function() {
        if (_clickHandler) {
            this.element.detachEvent('onclick', _clickHandler);
            _clickHandler = null;
        }
        
        Sys.UI.Button.callBaseMethod(this, 'dispose');
    }
    
    this.initialize = function() {
        Sys.UI.Button.callBaseMethod(this, 'initialize');
        
        _clickHandler = Function.createDelegate(this, this._onClick);
        this.element.attachEvent('onclick', _clickHandler);
    }
    
    this._onClick = function() {
        this.click.invoke(this, Sys.EventArgs.Empty);
        if (_command) {
            this.raiseBubbleEvent(this, new Sys.UI.CommandEventArgs(_command, _arg));
        }
    }
}
Sys.UI.Button.registerClass('Sys.UI.Button', Sys.UI.Control);
Sys.TypeDescriptor.addType('script', 'button', Sys.UI.Button);


Sys.UI.CheckBox = function(associatedElement) {
    Sys.UI.CheckBox.initializeBase(this, [associatedElement]);

    var _clickHandler;
    
    this.get_checked = function() {
        return this.element.checked;
    }
    this.set_checked = function(value) {
        if (value != this.get_checked()) {
            this.element.checked = value;
            this.raisePropertyChanged('checked');
        }
    }
    
    this.click = this.createEvent();
    
    this.getDescriptor = function() {
        var td = Sys.UI.CheckBox.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('checked', Boolean);
        td.addEvent('click', true);
        return td;
    }
    Sys.UI.CheckBox.registerBaseMethod(this, 'getDescriptor');
    
    this.dispose = function() {
        if (_clickHandler) {
            this.element.detachEvent('onclick', _clickHandler);
            _clickHandler = null;
        }
        
        Sys.UI.CheckBox.callBaseMethod(this, 'dispose');
    }
    
    this.initialize = function() {
        Sys.UI.CheckBox.callBaseMethod(this, 'initialize');
        
        _clickHandler = Function.createDelegate(this, this._onClick);
        this.element.attachEvent('onclick', _clickHandler);
    }
    
    this._onClick = function() {
        this.raisePropertyChanged('checked');
        this.click.invoke(this, Sys.EventArgs.Empty);
    }
}
Sys.UI.CheckBox.registerClass('Sys.UI.CheckBox', Sys.UI.Control);
Sys.TypeDescriptor.addType('script', 'checkBox', Sys.UI.CheckBox);


Sys.UI.Select = function(associatedElement) {
    Sys.UI.Select.initializeBase(this, [associatedElement]);

    var _selectionChangedHandler;
    var _data;
    var _dataChangedDelegate;
    var _textProperty;
    var _valueProperty;
    var _firstItemText;

    this.get_data = function() {
        return _data;
    }
    this.set_data = function(data) {
        if (_data && Sys.INotifyCollectionChanged.isImplementedBy(_data)) {
            _data.collectionChanged.remove(_dataChangedDelegate);
        }
        _data = data;
        if (_data) {
            if (!Sys.Data.DataTable.isInstanceOfType(_data)) {
                _data = new Sys.Data.DataTable([], _data);
            }
            _data.collectionChanged.add(_dataChangedDelegate);
        }
        dataBind.call(this);
        this.raisePropertyChanged('data');
    }
    
    this.get_firstItemText = function() {
        return _firstItemText;
    }
    this.set_firstItemText = function(value) {
        if (_firstItemText != value) {
            _firstItemText = value;
            this.raisePropertyChanged('firstItemText');
            dataBind.call(this);
        }
    }
    
    this.get_selectedValue = function() {
        return this.element.value;
    }
    this.set_selectedValue = function(value) {
        this.element.value = value;
    }
    
    this.get_textProperty = function() {
        return _textProperty;
    }
    this.set_textProperty = function(name) {
        _textProperty = name;
        this.raisePropertyChanged('textProperty');
    }
    
    this.get_valueProperty = function() {
        return _valueProperty;
    }
    this.set_valueProperty = function(name) {
        _valueProperty = name;
        this.raisePropertyChanged('valueProperty');
   }
    
    this.selectionChanged = this.createEvent();

    function dataBind() {
        var options = this.element.options;
        var selectedValues = [];
        var i;
        for (i = options.length - 1; i >= 0; i--) {
            if (options[i].selected) {
                selectedValues.add(options[i].value);
            }
            options[i] = null;
        }
        var option;
        if (_firstItemText && (_firstItemText.length != 0)) {
            option = new Option(_firstItemText, "");
            options[this.element.length] = option;
        }
        if (_data) {
            var length = _data.get_length();
            for (i = 0; i < length; i++) {
                var item = _data.getItem(i);
                option = new Option(Sys.TypeDescriptor.getProperty(item, _textProperty),
                    Sys.TypeDescriptor.getProperty(item, _valueProperty));
                option.selected = selectedValues.contains(option.value);
                options[this.element.length] = option;
            }
        }
    }
    _dataChangedDelegate = Function.createDelegate(this, dataBind);

    this.dispose = function() {
        if (_selectionChangedHandler) {
            this.element.detachEvent('onchange', _selectionChangedHandler);
            _selectionChangedHandler = null;
        }
        
        Sys.UI.Select.callBaseMethod(this, 'dispose');
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.Select.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty("data", Sys.Data.DataTable);
        td.addProperty('firstItemText', String);
        td.addProperty('selectedValue', String);
        td.addProperty('textProperty', String);
        td.addProperty('valueProperty', String);
        td.addEvent('selectionChanged', true);
        return td;
    }
    Sys.UI.Select.registerBaseMethod(this, 'getDescriptor');
    
    this.initialize = function() {
        Sys.UI.Select.callBaseMethod(this, 'initialize');

        _selectionChangedHandler = Function.createDelegate(this, this._onSelectionChanged);
        this.element.attachEvent('onchange', _selectionChangedHandler);
    }

    this._onSelectionChanged = function() {
        this.raisePropertyChanged('selectedValue');
        this.selectionChanged.invoke(this, Sys.EventArgs.Empty);
    }
}
Sys.UI.Select.registerClass('Sys.UI.Select', Sys.UI.Control);
Sys.TypeDescriptor.addType('script', 'select', Sys.UI.Select);


Sys.UI.TextBox = function(associatedElement) {
    Sys.UI.TextBox.initializeBase(this, [associatedElement]);
    
    var _text;
    
    var _changeHandler;
    var _keyPressHandler;
    
    this.get_text = function() {
        return this.element.value;
    }
    this.set_text = function(value) {
        if (this.element.value != value) {
            this.element.value = value;
            this.raisePropertyChanged('text');
        }
    }

    this.dispose = function() {
        if (_changeHandler) {
            this.element.detachEvent('onchange', _changeHandler);
            _changeHandler = null;
        }
        if (_keyPressHandler) {
            this.element.detachEvent('onkeypress', _keyPressHandler);
            _keyPressHandler = null;
        }
        
        Sys.UI.TextBox.callBaseMethod(this, 'dispose');
    }

    this.getDescriptor = function() {
        var td = Sys.UI.TextBox.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('text', String);
        td.addAttribute(Sys.Attributes.ValueProperty, 'text');
        return td;
    }
    Sys.UI.TextBox.registerBaseMethod(this, 'getDescriptor');
    
    this.initialize = function() {
        Sys.UI.TextBox.callBaseMethod(this, 'initialize');
        
        _text = this.element.value;

        _changeHandler = Function.createDelegate(this, this._onChanged);
        this.element.attachEvent('onchange', _changeHandler);
        
        _keyPressHandler = Function.createDelegate(this, this._onKeyPress);
        this.element.attachEvent('onkeypress', _keyPressHandler);
    }
    
    this._onChanged = function() {
        if (this.element.value != _text) {
            _text = this.element.value;
            this.raisePropertyChanged('text');
        }
    }
    
    this._onKeyPress = function() {
        var e = window.event;
        var key = e.keyCode;
        
        if (key == 13) {
            if (this.element.value != _text) {
                _text = this.element.value;
                this.raisePropertyChanged('text');
            }
        }
    }
}
Sys.UI.TextBox.registerClass('Sys.UI.TextBox', Sys.UI.InputControl);
Sys.TypeDescriptor.addType('script', 'textBox', Sys.UI.TextBox);


Sys.UI.PopupBehavior = function() {
    Sys.UI.PopupBehavior.initializeBase(this);
    
    var _x = 0;
    var _y = 0;
    var _positioningMode = Sys.UI.PositioningMode.Absolute;
    var _parentElement;
    
    var _moveHandler;
    
    this.get_parentElement = function() {
        return _parentElement;
    }
    this.set_parentElement = function(element) {
        _parentElement = element;
        this.raisePropertyChanged('parentElement');
    }
    
    this.get_positioningMode = function() {
        return _positioningMode;
    }
    this.set_positioningMode = function(mode) {
        _positioningMode = mode;
        this.raisePropertyChanged('positioningMode');
    }
    
    this.get_x = function() {
        return _x;
    }
    this.set_x = function(x) {
        _x = x;
        if (this.control && this.control.get_visible()) {
            this.show();
        }
        this.raisePropertyChanged('x');
    }
    
    this.get_y = function() {
        return _y;
    }
    this.set_y = function(y) {
        _y = y;
        if (this.control && this.control.get_visible()) {
            this.show();
        }
        this.raisePropertyChanged('y');
    }
    
    this.hide = function() {
        this.control.set_visible(false);
        var elt = this.control.element;
        if (elt.originalWidth) {
            elt.style.width = elt.originalWidth + "px";
            elt.originalWidth = null;
        }
        if (window.navigator && window.navigator.appName == "Microsoft Internet Explorer" && !window.opera) {
            var childFrame = elt._hideWindowedElementsIFrame;
            if (childFrame) {
                childFrame.style.display = "none";
            }
        }
    }
    
    this.show = function() {
        this.control.set_visible(true);
        var elt = this.control.element;
        var offsetParent = elt.offsetParent;
        if (!offsetParent) offsetParent = document.documentElement;
        var offsetParentLocation = Sys.UI.Control.getLocation(offsetParent);
        var parent = _parentElement ? _parentElement : offsetParent;
        var parentBounds = Sys.UI.Control.getBounds(parent);
        var diff = {x: parentBounds.x - offsetParentLocation.x, y:parentBounds.y - offsetParentLocation.y};
        var width = elt.offsetWidth - (elt.clientLeft ? elt.clientLeft * 2 : 0);
        var height = elt.offsetHeight - (elt.clientTop ? elt.clientTop * 2 : 0);
        var position;
        switch (_positioningMode) {
            case Sys.UI.PositioningMode.Center:
                position = {
                    x: Math.round(parentBounds.width / 2 - width / 2),
                    y: Math.round(parentBounds.height / 2 - height / 2)
                };
                break;
            case Sys.UI.PositioningMode.BottomLeft:
                position = {
                    x: 0,
                    y: parentBounds.height
                };
                break;
            case Sys.UI.PositioningMode.BottomRight:
                position = {
                    x: parentBounds.width - width,
                    y: parentBounds.height
                };
                break;
            case Sys.UI.PositioningMode.TopLeft:
                position = {
                    x: 0,
                    y: -elt.offsetHeight
                };
                break;
            case Sys.UI.PositioningMode.TopRight:
                position = {
                    x: parentBounds.width - width,
                    y: -elt.offsetHeight
                };
                break;
            default:
                position = {x: 0, y: 0};
        }
        position.x += _x + diff.x;
        position.y += _y + diff.y;
        Sys.UI.Control.setLocation(elt, position);
        elt.style.width = width + "px";
        var newPosition = Sys.UI.Control.getBounds(elt);
        var documentWidth = self.innerWidth ? self.innerWidth : document.documentElement.clientWidth;
                if (!documentWidth) {
            documentWidth = document.body.clientWidth;
        }
        if (newPosition.x + newPosition.width > documentWidth - 5) {
            position.x -= newPosition.x + newPosition.width - documentWidth + 5;
        }
        if (newPosition.x < 0) {
            position.x -= newPosition.x;
        }
        if (newPosition.y < 0) {
            position.y -= newPosition.y;
        }
        Sys.UI.Control.setLocation(elt, position);
                if ((Sys.Runtime.get_hostType() == Sys.HostType.InternetExplorer) && !window.opera) {
            var childFrame = elt._hideWindowedElementsIFrame;
            if (!childFrame) {
                childFrame = document.createElement("iframe");
                                childFrame.src = "about:blank";
                childFrame.style.position = "absolute";
                childFrame.style.display = "none";
                childFrame.scrolling = "no";
                childFrame.frameBorder = "0";
                childFrame.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";
                elt.parentNode.insertBefore(childFrame, elt);
                elt._hideWindowedElementsIFrame = childFrame;
                _moveHandler = Function.createDelegate(this, moveHandler);
                elt.attachEvent('onmove', _moveHandler);
            }
            childFrame.style.top = elt.style.top;
            childFrame.style.left = elt.style.left;
            childFrame.style.width = elt.offsetWidth + "px";
            childFrame.style.height = elt.offsetHeight + "px";
            childFrame.style.display = elt.style.display;
            if (elt.currentStyle && elt.currentStyle.zIndex) {
                childFrame.style.zIndex = elt.currentStyle.zIndex;
            }
            else if (elt.style.zIndex) {
                childFrame.style.zIndex = elt.style.zIndex;
            }
        }
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.PopupBehavior.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('parentElement', Object, false, Sys.Attributes.Element, true);
        td.addProperty('positioningMode', Sys.UI.PositioningMode);
        td.addProperty('x', Number);
        td.addProperty('y', Number);
        td.addMethod('show');
        td.addMethod('hide');
        return td;
    }
    Sys.UI.PopupBehavior.registerBaseMethod(this, 'getDescriptor');
    
    this.initialize = function() {
        Sys.UI.PopupBehavior.callBaseMethod(this, 'initialize');
        this.hide();
        this.control.element.style.position = "absolute";
    }
    Sys.UI.PopupBehavior.registerBaseMethod(this, 'initialize');
    
    this.dispose = function() {
        if (_moveHandler && this.control && this.control.element) {
            this.hide();
            this.control.element.detachEvent('onmove', _moveHandler);
            _moveHandler = null;
        }
        _parentElement = null;
        Sys.UI.PopupBehavior.callBaseMethod(this, 'dispose');
    }
    Sys.UI.PopupBehavior.registerBaseMethod(this, 'dispose');
    
    function moveHandler() {
        var elt = this.control.element;
        if (elt._hideWindowedElementsIFrame) {
            elt.parentNode.insertBefore(elt._hideWindowedElementsIFrame, elt);
            elt._hideWindowedElementsIFrame.style.top = elt.style.top;
            elt._hideWindowedElementsIFrame.style.left = elt.style.left;
        }
    }
}
Sys.UI.PopupBehavior.registerClass('Sys.UI.PopupBehavior', Sys.UI.Behavior);
Sys.TypeDescriptor.addType('script', 'popupBehavior', Sys.UI.PopupBehavior);
Type.createEnum('Sys.UI.PositioningMode', 'Absolute', 0, 'Center', 1, 'BottomLeft', 2, 'BottomRight', 3, 'TopLeft', 4, 'TopRight', 5);

Sys.UI.ClickBehavior = function() {
    Sys.UI.ClickBehavior.initializeBase(this);
    
    var _clickHandler;
    
    this.click = this.createEvent();
    
    this.dispose = function() {
        this.control.element.detachEvent('onclick', _clickHandler);
        Sys.UI.ClickBehavior.callBaseMethod(this, 'dispose');
    }

    this.initialize = function() {
        Sys.UI.ClickBehavior.callBaseMethod(this, 'initialize');

        _clickHandler = Function.createDelegate(this, clickHandler);
        this.control.element.attachEvent('onclick', _clickHandler);
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.ClickBehavior.callBaseMethod(this, 'getDescriptor');
        td.addEvent('click', true);
        return td;
    }
    
    function clickHandler() {
        this.click.invoke(this, Sys.EventArgs.Empty);
    }
}
Sys.UI.ClickBehavior.registerSealedClass('Sys.UI.ClickBehavior', Sys.UI.Behavior);
Sys.TypeDescriptor.addType('script', 'clickBehavior', Sys.UI.ClickBehavior);

Sys.UI.HoverBehavior = function() {
    Sys.UI.HoverBehavior.initializeBase(this);
    
    var _hoverHandler;
    var _unHoverHandler;
    var _hoverElement;
    var _unhoverDelay = 0;
    var _hoverCount = 0;

    this.get_hoverElement = function() {
        return _hoverElement;
    }
    this.set_hoverElement = function(element) {
debug.assert(!this.get_isInitialized() || (_hoverElement == element), "hoverElement can't be changed after initialization.");
        _hoverElement = element;
    }
    
    this.get_unhoverDelay = function() {
        return _unhoverDelay;
    }
    this.set_unhoverDelay = function(ms) {
        _unhoverDelay = ms;
        this.raisePropertyChanged('unhoverDelay');
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.HoverBehavior.callBaseMethod(this, 'getDescriptor');
        td.addProperty('hoverElement', Object, false, Sys.Attributes.Element, true);
        td.addProperty('unhoverDelay', Number);
        td.addEvent('hover', true);
        td.addEvent('unhover', true);
        return td;
    }
    
    this.hover = this.createEvent();
    this.unhover = this.createEvent();
    
    this.dispose = function() {
        if (_hoverHandler) {
            this.control.element.detachEvent('onmouseover', _hoverHandler);
            this.control.element.detachEvent('onfocus', _hoverHandler);
            if (_hoverElement) {
                _hoverElement.detachEvent('onmouseover', _hoverHandler);
                _hoverElement.detachEvent('onfocus', _hoverHandler);
            }
            _hoverHandler = null;
        }
        if (_unHoverHandler) {
            this.control.element.detachEvent('onmouseout', _unHoverHandler);
            this.control.element.detachEvent('onblur', _unHoverHandler);
            if (_hoverElement) {
                _hoverElement.detachEvent('onmouseout', _unHoverHandler);
                _hoverElement.detachEvent('onblur', _unHoverHandler);
            }
            _unHoverHandler = null;
        }
        
        Sys.UI.HoverBehavior.callBaseMethod(this, 'dispose');
    }

    this.initialize = function() {
        Sys.UI.HoverBehavior.callBaseMethod(this, 'initialize');

        _hoverHandler = Function.createDelegate(this, hoverHandler);
        this.control.element.attachEvent('onmouseover', _hoverHandler);
        this.control.element.attachEvent('onfocus', _hoverHandler);

        _unHoverHandler = Function.createDelegate(this, _unhoverDelay ? delayedUnhoverHandler : unHoverHandler);
        this.control.element.attachEvent('onmouseout', _unHoverHandler);
        this.control.element.attachEvent('onblur', _unHoverHandler);
        
        if (_hoverElement) {
            _hoverElement.attachEvent('onmouseover', _hoverHandler);
            _hoverElement.attachEvent('onfocus', _hoverHandler);
            _hoverElement.attachEvent('onmouseout', _unHoverHandler);
            _hoverElement.attachEvent('onblur', _unHoverHandler);
        }
    }
    
    function delayedUnhoverHandler() {
        window.setTimeout(Function.createDelegate(this, unHoverHandler), _unhoverDelay);
    }
    
    function hoverHandler() {
        _hoverCount++;
        this.hover.invoke(this, Sys.EventArgs.Empty);
    }
    
    function unHoverHandler() {
        _hoverCount--;
        if (_hoverCount == 0) {
            this.unhover.invoke(this, Sys.EventArgs.Empty);
        }
    }
}
Sys.UI.HoverBehavior.registerSealedClass('Sys.UI.HoverBehavior', Sys.UI.Behavior);
Sys.TypeDescriptor.addType('script', 'hoverBehavior', Sys.UI.HoverBehavior);

Sys.UI.AutoCompleteBehavior = function() {
    Sys.UI.AutoCompleteBehavior.initializeBase(this);
    
    var _appURL;
    var _serviceURL;
    var _serviceMethod;
    var _minimumPrefixLength = 3;
    var _completionSetCount = 10;
    var _completionInterval = 1000;
    var _completionListElement;
    var _popupBehavior;
    
    var _timer;
    var _cache;
    var _currentPrefix;
    var _selectIndex;
    
    var _focusHandler;
    var _blurHandler;
    var _keyDownHandler;
    var _mouseDownHandler;
    var _mouseUpHandler;
    var _mouseOverHandler;
    var _tickHandler;
    
    this.get_appURL = function() {
        return _appURL;
    }
    this.set_appURL = function(value) {
        _appURL = value;
    }

    this.get_completionInterval = function() {
        return _completionInterval;
    }
    this.set_completionInterval = function(value) {
        _completionInterval = value;
    }
    
    this.get_completionList = function() {
        return _completionListElement;
    }
    this.set_completionList = function(value) {
        _completionListElement = value;
    }
    
    this.get_completionSetCount = function() {
        return _completionSetCount;
    }
    this.set_completionSetCount = function(value) {
        _completionSetCount = value;
    }
    
    this.get_minimumPrefixLength = function() {
        return _minimumPrefixLength;
    }
    this.set_minimumPrefixLength = function(value) {
        _minimumPrefixLength = value;
    }
    
    this.get_serviceMethod = function() {
        return _serviceMethod;
    }
    this.set_serviceMethod = function(value) {
        _serviceMethod = value;
    }
    
    this.get_serviceURL = function() {
        return _serviceURL;
    }
    this.set_serviceURL = function(value) {
        _serviceURL = value;
    }

    this.dispose = function() {
        if (_timer) {
            _timer.tick.remove(_tickHandler);
            _timer.dispose();
        }
        
        var element = this.control.element;
        element.detachEvent('onfocus', _focusHandler);
        element.detachEvent('onblur', _blurHandler);
        element.detachEvent('onkeydown', _keyDownHandler);
        
        _completionListElement.detachEvent('onmousedown', _mouseDownHandler);
        _completionListElement.detachEvent('onmouseup', _mouseUpHandler);
        _completionListElement.detachEvent('onmouseover', _mouseOverHandler);
        
        _tickHandler = null;
        _focusHandler = null;
        _blurHandler = null;
        _keyDownHandler = null;
        _mouseDownHandler = null;
        _mouseUpHandler = null;
        _mouseOverHandler = null;

        Sys.UI.AutoCompleteBehavior.callBaseMethod(this, 'dispose');
    }

    this.getDescriptor = function() {
        var td = Sys.UI.AutoCompleteBehavior.callBaseMethod(this, 'getDescriptor');
        td.addProperty('completionInterval', Number);
        td.addProperty('completionList', Object, false, Sys.Attributes.Element, true);
        td.addProperty('completionSetCount', Number);
        td.addProperty('minimumPrefixLength', Number);
        td.addProperty('serviceMethod', String);
        td.addProperty('serviceURL', String);
        td.addProperty('appURL', String);
        return td;
    }
    
    this.initialize = function() {
        Sys.UI.AutoCompleteBehavior.callBaseMethod(this, 'initialize');

        _tickHandler = Function.createDelegate(this, this._onTimerTick);
        _focusHandler = Function.createDelegate(this, this._onGotFocus);
        _blurHandler = Function.createDelegate(this, this._onLostFocus);
        _keyDownHandler = Function.createDelegate(this, this._onKeyDown);
        _mouseDownHandler = Function.createDelegate(this, this._onListMouseDown);
        _mouseUpHandler = Function.createDelegate(this, this._onListMouseUp);
        _mouseOverHandler = Function.createDelegate(this, this._onListMouseOver);
        
        _timer = new Sys.Timer();
        _timer.set_interval(_completionInterval);
        _timer.tick.add(_tickHandler);
        
        var element = this.control.element;
        element.autocomplete = "off";
        element.attachEvent('onfocus', _focusHandler);
        element.attachEvent('onblur', _blurHandler);
        element.attachEvent('onkeydown', _keyDownHandler);
        
        var elementBounds = Sys.UI.Control.getBounds(element);
        
        if (!_completionListElement) {
            _completionListElement = document.createElement('DIV');
            document.body.appendChild(_completionListElement);
        }
        
        var completionListStyle = _completionListElement.style;
        completionListStyle.visibility = 'hidden';
        completionListStyle.backgroundColor = 'window';
        completionListStyle.color = 'windowtext';
        completionListStyle.border = 'solid 1px buttonshadow';
        completionListStyle.cursor = 'default';
        completionListStyle.unselectable = 'unselectable';
        completionListStyle.overflow = 'hidden';
        completionListStyle.width = (elementBounds.width - 2) + 'px';
        _completionListElement.attachEvent('onmousedown', _mouseDownHandler);
        _completionListElement.attachEvent('onmouseup', _mouseUpHandler);
        _completionListElement.attachEvent('onmouseover', _mouseOverHandler);
        document.body.appendChild(_completionListElement);
        var popupControl = new Sys.UI.Control(_completionListElement);
        _popupBehavior = new Sys.UI.PopupBehavior();
        _popupBehavior.set_parentElement(element);
        _popupBehavior.set_positioningMode(Sys.UI.PositioningMode.BottomLeft);
        popupControl.get_behaviors().add(_popupBehavior);
        _popupBehavior.initialize();
        popupControl.initialize();
    }
    
    this._hideCompletionList = function() {
        _popupBehavior.hide();
        _completionListElement.innerHTML = '';
        _selectIndex = -1;
    }
    
    this._highlightItem = function(item) {
        var children = _completionListElement.childNodes;
        
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child != item) {
                child.style.backgroundColor = 'window';
                child.style.color = 'windowtext';
            }
        }
        item.style.backgroundColor = 'highlight';
        item.style.color = 'highlighttext';
    }
    
    this._onListMouseDown = function() {
        if (window.event.srcElement != _completionListElement) {
            this._setText(window.event.srcElement.firstChild.nodeValue);
        }
    }
    
    this._onListMouseUp = function() {
        this.control.focus();
    }
    
    this._onListMouseOver = function() {
        var item = window.event.srcElement;
        _selectIndex = -1;
        this._highlightItem(item);
    }

    this._onGotFocus = function() {
        _timer.set_enabled(true);
    }
    
    this._onKeyDown = function() {
        var e = window.event;
        if (e.keyCode == 27) {
            this._hideCompletionList();
            e.returnValue = false;
        }
        else if (e.keyCode == Sys.UI.Key.Up) {
            if (_selectIndex > 0) {
                _selectIndex--;
                this._highlightItem(_completionListElement.childNodes[_selectIndex]);
                e.returnValue = false;
            }
        }
        else if (e.keyCode == Sys.UI.Key.Down) {
            if (_selectIndex < (_completionListElement.childNodes.length - 1)) {
                _selectIndex++;
                this._highlightItem(_completionListElement.childNodes[_selectIndex]);
                e.returnValue = false;
            }
        }
        else if (e.keyCode == Sys.UI.Key.Return) {
            if (_selectIndex != -1) {
                this._setText(_completionListElement.childNodes[_selectIndex].firstChild.nodeValue);
                e.returnValue = false;
            }
        }
        
        if (e.keyCode != Sys.UI.Key.Tab) {
            _timer.set_enabled(true);
        }
    }
    
    this._onLostFocus = function() {
        _timer.set_enabled(false);
        this._hideCompletionList();
    }
    
    function _onMethodComplete(result, response, context) {
        var acBehavior = context[0];
        var prefixText = context[1];
        acBehavior._update(prefixText, result,  true);
    }
    
    this._onTimerTick = function(sender, eventArgs) {
        if (_serviceURL && _serviceMethod) {
            var text = this.control.element.value;
            
            if (text.trim().length < _minimumPrefixLength) {
                this._update('', null,  false);
                return;
            }
            
            if (_currentPrefix != text) {
                _currentPrefix = text;
                if (_cache && _cache[text]) {
                    this._update(text, _cache[text],  false);
                    return;
                }
                
                Sys.Net.ServiceMethod.invoke(_serviceURL, _serviceMethod, _appURL,
                                                          { prefixText : _currentPrefix, count: _completionSetCount },
                                                          _onMethodComplete, null, null, null,
                                                          [ this, text ]);
            }
        }
    }
    
    this._setText = function(text) {
        _timer.set_enabled(false);
        _currentPrefix = text;
        if (Sys.UI.TextBox.isInstanceOfType(this.control)) {
            this.control.set_text(text);
        }
        else {
            this.control.element.value = text;
        }
        this._hideCompletionList();
    }
    
    this._update = function(prefixText, completionItems, cacheResults) {
        if (cacheResults) {
            if (!_cache) {
                _cache = { };
            }
            _cache[prefixText] = completionItems;
        }

        _completionListElement.innerHTML = '';
        _selectIndex = -1;
        if (completionItems && completionItems.length) {
            for (var i = 0; i < completionItems.length; i++) {
                var itemElement = document.createElement('div');
                itemElement.appendChild(document.createTextNode(completionItems[i]));
                itemElement.__item = '';
                
                var itemElementStyle = itemElement.style;
                itemElementStyle.padding = '1px';
                itemElementStyle.textAlign = 'left';
                itemElementStyle.textOverflow = 'ellipsis';
                itemElementStyle.backgroundColor = 'window';
                itemElementStyle.color = 'windowtext';
                
                _completionListElement.appendChild(itemElement);
            }
            _popupBehavior.show();
        }
        else {
            _popupBehavior.hide();
        }
    }
}
Sys.UI.AutoCompleteBehavior.registerSealedClass('Sys.UI.AutoCompleteBehavior', Sys.UI.Behavior);
Sys.TypeDescriptor.addType('script', 'autoComplete', Sys.UI.AutoCompleteBehavior);

Sys.UI.RequiredFieldValidator = function() {
    Sys.UI.RequiredFieldValidator.initializeBase(this);

    this.validate = function(value) {
        if (!value) {
            return false;
        }
        if (String.isInstanceOfType(value)) {
            if (value.length == 0) {
                return false;
            }
        }
        return true;
    }
}
Sys.UI.RequiredFieldValidator.registerSealedClass('Sys.UI.RequiredFieldValidator', Sys.UI.Validator);
Sys.TypeDescriptor.addType('script', 'requiredFieldValidator', Sys.UI.RequiredFieldValidator);
Sys.UI.TypeValidator = function() {
    Sys.UI.TypeValidator.initializeBase(this);
    
    var _type;
    
    this.get_type = function() {
        return _type;
    }
    this.set_type = function(value) {
        _type = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.TypeValidator.callBaseMethod(this, 'getDescriptor');

        td.addProperty('type', Function);
        return td;
    }

    this.validate = function(value) {
        var valid = true;
        if (value && value.length) {
            try {
                var number = _type.parse(value);
                if (isNaN(number)) {
                    valid = false;
                }
            }
            catch (ex) {
                valid = false;
            }
        }
        return valid;
    }
}
Sys.UI.TypeValidator.registerSealedClass('Sys.UI.TypeValidator', Sys.UI.Validator);
Sys.TypeDescriptor.addType('script', 'typeValidator', Sys.UI.TypeValidator);
Sys.UI.RangeValidator = function() {
    Sys.UI.RangeValidator.initializeBase(this);
    
    var _lowerBound;
    var _upperBound;
    
    this.get_lowerBound = function() {
        return _lowerBound;
    }
    this.set_lowerBound = function(value) {
        _lowerBound = value;
    }
    
    this.get_upperBound = function() {
        return _upperBound;
    }
    this.set_upperBound = function(value) {
        _upperBound = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.RangeValidator.callBaseMethod(this, 'getDescriptor');

        td.addProperty('lowerBound', Number);
        td.addProperty('upperBound', Number);
        return td;
    }

    this.validate = function(value) {
        if (value && value.length) {
            return ((value <= _upperBound) && (value >= _lowerBound));
        }
        return true;
    }
}
Sys.UI.RangeValidator.registerSealedClass('Sys.UI.RangeValidator', Sys.UI.Validator);
Sys.TypeDescriptor.addType('script', 'rangeValidator', Sys.UI.RangeValidator);
Sys.UI.RegexValidator = function() {
    Sys.UI.RegexValidator.initializeBase(this);
    
    var _regex;
    
    this.get_regex = function() {
        return _regex;
    }
    this.set_regex = function(value) {
        _regex = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.RegexValidator.callBaseMethod(this, 'getDescriptor');

        td.addProperty('regex', RegExp);
        return td;
    }

    this.validate = function(value) {
        if (value && value.length) {
            var matches = _regex.exec(value);
            return (matches && (matches[0] == value));
        }
        return true;
    }
}
Sys.UI.RegexValidator.registerSealedClass('Sys.UI.RegexValidator', Sys.UI.Validator);
Sys.TypeDescriptor.addType('script', 'regexValidator', Sys.UI.RegexValidator);
Sys.UI.CustomValidationEventArgs = function(value) {
    Sys.UI.CustomValidationEventArgs.initializeBase(this);
    
    var _value = value;
    var _isValid = true;
    
    this.get_value = function() {
        return _value;
    }
    
    this.get_isValid = function() {
        return _isValid;
    }
    this.set_isValid = function(value) {
        _isValid = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.CustomValidationEventArgs.callBaseMethod(this, 'getDescriptor');

        td.addProperty('isValid', Boolean);
        td.addProperty('value', Object, true);
        return td;
    }
}
Sys.UI.CustomValidationEventArgs.registerSealedClass('Sys.UI.CustomValidationEventArgs', Sys.EventArgs);
Sys.UI.CustomValidator = function() {
    Sys.UI.CustomValidator.initializeBase(this);
    
    this.validateValue = this.createEvent();
    
    this.getDescriptor = function() {
        var td = Sys.UI.CustomValidator.callBaseMethod(this, 'getDescriptor');

        td.addEvent('validateValue', false);
        return td;
    }

    this.validate = function(value) {
        if (value && value.length) {
            var cve = new Sys.UI.CustomValidationEventArgs(value);
            this.validateValue.invoke(this, cve);

            return cve.get_isValid();
        }
        return true;
    }
}
Sys.UI.CustomValidator.registerSealedClass('Sys.UI.CustomValidator', Sys.UI.Validator);
Sys.TypeDescriptor.addType('script', 'customValidator', Sys.UI.CustomValidator);

Sys.UI.ValidationErrorLabel = function(associatedElement) {
    Sys.UI.ValidationErrorLabel.initializeBase(this, [associatedElement]);
    
    var _associatedControl;
    var _validatedHandler;
    
    this.get_associatedControl = function() {
        return _associatedControl;
    }
    this.set_associatedControl = function(value) {
        if (_associatedControl && _validatedHandler) {
            _associatedControl.validated.remove(_validatedHandler);
        }
        
        if (Sys.UI.IValidationTarget.isImplementedBy(value)) {
            _associatedControl = value;
        }
        if (_associatedControl) {
            if (!_validatedHandler) {
                _validatedHandler = Function.createDelegate(this, this._onControlValidated);
            }
            _associatedControl.validated.add(_validatedHandler);
        }
    }

    this.dispose = function() {
        if (_associatedControl) {
            if (_validatedHandler) {
                _associatedControl.validated.remove(_validatedHandler);
                _validatedHandler = null;
            }
            _associatedControl = null;
        }
        
        Sys.UI.ValidationErrorLabel.callBaseMethod(this, 'dispose');
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.ValidationErrorLabel.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('associatedControl', Object);
        return td;
    }
    
    this.initialize = function() {
        Sys.UI.ValidationErrorLabel.callBaseMethod(this, 'initialize');
        this.set_visible(false);
    }
    
    this._onControlValidated = function(sender, eventArgs) {
        var isInvalid = _associatedControl.get_isInvalid();
        var tooltip = '';
        
        if (isInvalid) {
            tooltip = _associatedControl.get_validationMessage();
        }

        this.set_visible(isInvalid);
        this.element.title = tooltip;
    }
}
Sys.UI.ValidationErrorLabel.registerSealedClass('Sys.UI.ValidationErrorLabel', Sys.UI.Label);
Sys.TypeDescriptor.addType('script', 'validationErrorLabel', Sys.UI.ValidationErrorLabel);

Type.registerNamespace('Sys.UI.Data');

Sys.UI.Data.DataControl = function(associatedElement) {
    Sys.UI.Data.DataControl.initializeBase(this, [associatedElement]);
    
    var _data;
    var _dataIndex = 0;
    var _suspendChangeNotifications = false;
    
    var _dataChangedDelegate;
    
    function prepareChange() {
        return {dataIndex: this.get_dataIndex(), canMoveNext: this.get_canMoveNext(), canMovePrevious: this.get_canMovePrevious()};
    }
    function triggerChangeEvents(oldState) {
        var dataIndex = this.get_dataIndex();
        if (oldState.dataIndex != dataIndex) {
            this.raisePropertyChanged('dataIndex');
            this.raisePropertyChanged('dataItem');
            oldState.dataIndex = dataIndex;
        }
        var canMoveNext = this.get_canMoveNext();
        if (oldState.canMoveNext != canMoveNext) {
            this.raisePropertyChanged('canMoveNext');
            oldState.canMoveNext = canMoveNext;
        }
        var canMovePrevious = this.get_canMovePrevious();
        if (oldState.canMovePrevious != canMovePrevious) {
            this.raisePropertyChanged('canMovePrevious');
            oldState.canMovePrevious = canMovePrevious;
        }
    }
    
    this.get_canMoveNext = function() {
        if (!_data) return false;
        return (_dataIndex < _data.get_length() - 1);
    }
    this.get_canMovePrevious = function() {
        if (!_data) return false;
        return (_dataIndex > 0);
    }
    
    this.get_data = function() {
        return _data;
    }
    this.set_data = function(value) {
        var oldState = prepareChange.call(this);
        if (_data && Sys.INotifyCollectionChanged.isImplementedBy(_data)) {
            _data.collectionChanged.remove(_dataChangedDelegate);
        }
        _data = value;
        if (_data && Sys.INotifyCollectionChanged.isImplementedBy(_data)) {
            _data.collectionChanged.add(_dataChangedDelegate);
        }
        var newLength = _data ? _data.get_length() : 0;
        if (_dataIndex >= newLength) {
            this.set_dataIndex(0);
        }
        
        if (!this.get_isUpdating()) {
            this.render();
        }

        this.raisePropertyChanged('data');
        triggerChangeEvents.call(this, oldState);
    }
    
    this.get_dataContext = function() {
        return this.get_dataItem();
    }
    Sys.UI.Data.DataControl.registerBaseMethod(this, 'get_dataContext');
    
    this.get_dataIndex = function() {
        return _dataIndex;
    }
    this.set_dataIndex = function(value) {
        if (_dataIndex != value) {
            var oldState = prepareChange.call(this);
            _dataIndex = value;
            if (!_suspendChangeNotifications) {
                triggerChangeEvents.call(this, oldState);
            }
        }
    }
    Sys.UI.Data.DataControl.registerBaseMethod(this, 'set_dataIndex');
    
    this.get_dataItem = function() {
        if (_data) {
            return _data.getItem(_dataIndex);
        }
        return null;
    }
    
    this.get_length = function() {
        return Sys.IArray.isImplementedBy(_data) ? _data.get_length() : 0;
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.Data.DataControl.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('canMoveNext', Boolean, true);
        td.addProperty('canMovePrevious', Boolean, true);
        td.addProperty('data', Sys.Data.DataTable);
        td.addProperty('dataIndex', Number);
        td.addProperty('dataItem', Object, true);
        td.addProperty("length", Number, true);
        td.addMethod('addItem');
        td.addMethod('deleteCurrentItem');
        td.addMethod('moveNext');
        td.addMethod('movePrevious');
        
        return td;
    }
    Sys.UI.Data.DataControl.registerBaseMethod(this, 'getDescriptor');
    
    this.addItem = function() {
        if (_data) {
            var oldState = prepareChange.call(this);
            _data.add({});
            this.set_dataIndex(_data.get_length() - 1);
            triggerChangeEvents.call(this, oldState);
        }
    }
    
    this.deleteCurrentItem = function() {
        if (_data) {
            var oldState = prepareChange.call(this);
            _suspendChangeNotifications = true;
            var item = this.get_dataItem();
            if (this.get_dataIndex() == _data.get_length() - 1) {
                this.set_dataIndex(Math.max(0, _data.get_length() - 2));
            }
            _data.remove(item);
            _suspendChangeNotifications = false;
            triggerChangeEvents.call(this, oldState);
        }
    }
    
    this.getItem = function(index) {
        if (_data) {
            return _data.getItem(_dataIndex);
        }
        return null;
    }
    
    this.moveNext = function() {
        if (_data) {
            var oldState = prepareChange.call(this);
            var newIndex = this.get_dataIndex() + 1;
            if (newIndex < _data.get_length()) {
                this.set_dataIndex(newIndex);
            }
            triggerChangeEvents.call(this, oldState);
        }
    }
    
    this.movePrevious = function() {
        if (_data) {
            var oldState = prepareChange.call(this);
            var newIndex = this.get_dataIndex() - 1;
            if (newIndex >=0) {
                this.set_dataIndex(newIndex);
            }
            triggerChangeEvents.call(this, oldState);
        }
    }

    this.onBubbleEvent = function(source, args) {
        if (args.get_commandName() == "select") {
            var arg = args.get_argument();
            if (!arg && arg != 0) {
                var dataContext = source.get_dataContext();
                if (dataContext) {
                    arg = dataContext.get_index();
                }
            }
            if (arg && String.isInstanceOfType(arg)) {
                arg = Number.parse(arg);
            }
            if (arg || arg == 0) {
                this.set_dataIndex(arg);
                return true;
            }
        }
        return false;
    }
    Sys.UI.Data.DataControl.registerBaseMethod(this, 'onBubbleEvent');
    
    function onDataChanged(sender, args) {
        this.render();
    }
    _dataChangedDelegate = Function.createDelegate(this, onDataChanged);
}
Sys.UI.Data.DataControl.registerClass('Sys.UI.Data.DataControl', Sys.UI.Control, Sys.IArray);
Sys.UI.Data.DataNavigator = function(associatedElement) {
    Sys.UI.Data.DataNavigator.initializeBase(this, [associatedElement]);
    
    var _data;
    
    this.get_dataView = function() {
        return _data;
    }
    this.set_dataView = function(value) {
debug.assert(Sys.Data.DataView.isInstanceOfType(value), "dataView must be of type Sys.Data.DataView.");
        _data = value;
        this.raisePropertyChanged('dataView');
    }
    
    this.get_dataContext = function() {
        return this.get_dataView();
    }
    Sys.UI.Data.DataNavigator.registerBaseMethod(this, 'get_dataContext');
    
    this.getDescriptor = function() {
        var td = Sys.UI.Data.DataControl.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('dataView', Object);
        
        return td;
    }
    Sys.UI.Data.DataNavigator.registerBaseMethod(this, 'getDescriptor');

    this.onBubbleEvent = function(source, args) {
        if (!_data) return false;
        var cmd = args.get_commandName().toLowerCase();
        switch(cmd) {
        case "page":
            var arg = args.get_argument();
            if (arg && String.isInstanceOfType(arg)) {
                arg = Number.parse(arg);
            }
            if (arg || arg == 0) {
                _data.set_pageIndex(arg);
                return true;
            }
            break;
            
        case "nextpage":
            _data.set_pageIndex(_data.get_pageIndex() + 1);
            return true;

        case "previouspage":
            var idx = _data.get_pageIndex() - 1;
            if (idx >= 0) {
                _data.set_pageIndex(idx);
            }
            return true;
            
        case "firstpage":
            _data.set_pageIndex(0);
            return true;
            
        case "lastpage":
            _data.set_pageIndex(_data.get_pageCount() - 1);
            return true;
        }
        return false;
    }
    Sys.UI.Control.registerBaseMethod(this, 'onBubbleEvent');
}
Sys.UI.Data.DataNavigator.registerClass('Sys.UI.Data.DataNavigator', Sys.UI.Control);
Sys.TypeDescriptor.addType('script', 'dataNavigator', Sys.UI.Data.DataNavigator);
Sys.UI.Data.ItemView = function(associatedElement) {
    Sys.UI.Data.ItemView.initializeBase(this, [associatedElement]);
    
    var _itemTemplate;
    var _emptyTemplate;
    
    var _keyDownHandler;
    
    var _layoutTemplateElement = null;

    this.set_dataIndex = function(value) {
        if (this.get_dataIndex() != value) {
            Sys.UI.Data.ItemView.callBaseMethod(this, 'set_dataIndex', [value]);
            if (!this.get_isUpdating()) {
                this.render();
            }
        }
    }

    this.get_emptyTemplate = function() {
        return _emptyTemplate;
    }
    this.set_emptyTemplate = function(value) {
        if (_emptyTemplate) {
            _emptyTemplate.dispose();
        }
        _emptyTemplate = value;
        
        if (!this.get_isUpdating()) {
            this.render();
        }
        this.raisePropertyChanged('emptyTemplate');
    }
    
    this.get_itemTemplate = function() {
        return _itemTemplate;
    }
    this.set_itemTemplate = function(value) {
        if (_itemTemplate) {
            _itemTemplate.dispose();
        }
        _itemTemplate = value;
        
        if (!this.get_isUpdating()) {
            this.render();
        }
        this.raisePropertyChanged('itemTemplate');
    }
    
    this.dispose = function() {
        if (this.element) {
            if (_keyDownHandler) {
                this.element.detachEvent('onkeydown', _keyDownHandler);
            }
            if (this.element.childNodes.length) {
                this.element.markupContext = null;
                Sys.UI.ITemplate.disposeInstance(this.element.firstChild);
            }
        }
        if (_itemTemplate) {
            _itemTemplate.dispose();
            _itemTemplate = null;
        }
        
        if (_emptyTemplate) {
            _emptyTemplate.dispose();
            _emptyTemplate = null;
        }
        
        _layoutTemplateElement = null;
        
        Sys.UI.Data.ItemView.callBaseMethod(this, 'dispose');
    }
    Sys.UI.Data.ItemView.registerBaseMethod(this, 'dispose');
    
    this.getDescriptor = function() {
        var td = Sys.UI.Data.ItemView.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('itemTemplate', Sys.UI.ITemplate);
        td.addProperty('emptyTemplate', Sys.UI.ITemplate);
        
        return td;
    }
    Sys.UI.Data.ItemView.registerBaseMethod(this, 'getDescriptor');
    
    this.initialize = function() {
        _keyDownHandler = Function.createDelegate(this, this._onKeyDown);

        Sys.UI.Data.ItemView.callBaseMethod(this, 'initialize');

        this.element.attachEvent('onkeydown', _keyDownHandler);

        if (_itemTemplate) {
            _itemTemplate.initialize();
        }
        if (_emptyTemplate) {
            _emptyTemplate.initialize();
        }
        
        this.render();
    }
    
    this._onKeyDown = function() {
        var e = window.event;
        if (e.srcElement == this.element) {
            if ((e.keyCode == Sys.UI.Key.Up) || (e.keyCode == Sys.UI.Key.Left)) {
                this.movePrevious();
                e.returnValue = false;
            }
            else if ((e.keyCode == Sys.UI.Key.Down) || (e.keyCode == Sys.UI.Key.Right)) {
                this.moveNext();
                e.returnValue = false;
            }
        }
    }
    
    this.render = function() {
        if (this.element.childNodes.length) {
            if (_layoutTemplateElement) {
                Sys.UI.ITemplate.disposeInstance(_layoutTemplateElement);
            }
        }
        this.element.innerHTML = '';
        
        var template;
        var data = this.get_data();
        if (data && data.get_length()) {
            template = _itemTemplate;
        }
        else {
            template = _emptyTemplate;
        }
        
        if (template) {
            var instance = template.createInstance(this.element, this.get_dataContext()).instanceElement;
            this.element.markupContext = instance.markupContext;
            _layoutTemplateElement = instance;
        }
    }
}
Sys.UI.Data.ItemView.registerClass('Sys.UI.Data.ItemView', Sys.UI.Data.DataControl);
Sys.TypeDescriptor.addType('script', 'itemView', Sys.UI.Data.ItemView);
Sys.UI.Data.ListView = function(associatedElement) {
    Sys.UI.Data.ListView.initializeBase(this, [associatedElement]);

    var _itemClass;
    var _alternatingItemClass;
    var _separatorClass;
    var _selectedItemClass;

    var _focusHandler;
    var _keyDownHandler;
    var _itemFocusHandler;
    var _itemClickHandler;

    var _focusIndex;

        var _layoutTemplate = null;
    var _itemTemplate = null;
    var _separatorTemplate = null;
    var _emptyTemplate = null;
    var _itemTemplateParentElementId;

    var _itemElements = [];
    var _separatorElements = [];
    var _layoutTemplateElement = null;

    this.get_alternatingItemCssClass = function() {
        return _alternatingItemClass;
    }
    this.set_alternatingItemCssClass = function(value) {
        if (value != _alternatingItemClass) {
            _alternatingItemClass = value;
            this.render();
            this.raisePropertyChanged('alternatingItemCssClass');
        }
    }

    this.set_dataIndex = function(value) {
        var oldIndex = this.get_dataIndex();
        if (oldIndex != value) {
            var sel = this.getItemElement(oldIndex);
            if (sel && _selectedItemClass) {
                Sys.UI.Control.removeCssClass(sel, _selectedItemClass);
            }
            Sys.UI.Data.ListView.callBaseMethod(this, 'set_dataIndex', [value]);
            sel = this.getItemElement(value);
            if (sel && _selectedItemClass) {
                Sys.UI.Control.addCssClass(sel, _selectedItemClass);
            }
        }
    }

    this.get_emptyTemplate = function() {
        return _emptyTemplate;
    }
    this.set_emptyTemplate = function(template) {
        if (_emptyTemplate) {
            _emptyTemplate.dispose();
        }
        _emptyTemplate = template;

        if (!this.get_isUpdating()) {
            this.render();
        }
        this.raisePropertyChanged('emptyTemplate');
    }

    this.get_itemCssClass = function() {
        return _itemClass;
    }
    this.set_itemCssClass = function(value) {
        if (value != _itemClass) {
            _itemClass = value;
            this.render();
            this.raisePropertyChanged('itemCssClass');
        }
    }

    this.get_itemTemplate = function() {
        return _itemTemplate;
    }
    this.set_itemTemplate = function(template) {
        if (_itemTemplate) {
            _itemTemplate.dispose();
        }
        _itemTemplate = template;

        if (!this.get_isUpdating()) {
            this.render();
        }
        this.raisePropertyChanged('itemTemplate');
    }

    this.get_itemTemplateParentElementId = function() {
        return _itemTemplateParentElementId;
    }
    this.set_itemTemplateParentElementId = function(id) {
        _itemTemplateParentElementId = id;
        this.raisePropertyChanged('itemTemplateParentElementId');
    }

    this.get_layoutTemplate = function() {
        return _layoutTemplate;
    }
    this.set_layoutTemplate = function(template) {
        if (_layoutTemplate) {
            _layoutTemplate.dispose();
        }
        _layoutTemplate = template;

        if (!this.get_isUpdating()) {
            this.render();
        }
        this.raisePropertyChanged('layoutTemplate');
    }

    this.get_selectedItemCssClass = function() {
        return _selectedItemClass;
    }
    this.set_selectedItemCssClass = function(value) {
        if (value != _selectedItemClass) {
            _selectedItemClass = value;
            this.render();
            this.raisePropertyChanged('selectedItemCssClass');
        }
    }

    this.get_separatorCssClass = function() {
        return _separatorClass;
    }
    this.set_separatorCssClass = function(value) {
        if (value != _separatorClass) {
            _separatorClass = value;
            this.render();
            this.raisePropertyChanged('separatorCssClass');
        }
    }

    this.get_separatorTemplate = function() {
        return _separatorTemplate;
    }
    this.set_separatorTemplate = function(template) {
        if (_separatorTemplate) {
            _separatorTemplate.dispose();
        }
        _separatorTemplate = template;

        if (!this.get_isUpdating()) {
            this.render();
        }
        this.raisePropertyChanged('separatorTemplate');
    }

    this.getDescriptor = function() {
        var td = Sys.UI.Data.ListView.callBaseMethod(this, 'getDescriptor');

        td.addProperty("alternatingItemCssClass", String);
        td.addProperty("layoutTemplate", Sys.UI.ITemplate);
        td.addProperty("itemCssClass", String);
        td.addProperty("itemTemplate", Sys.UI.ITemplate);
        td.addProperty("itemTemplateParentElementId", String);
        td.addProperty("selectedItemCssClass", String);
        td.addProperty("separatorCssClass", String);
        td.addProperty("separatorTemplate", Sys.UI.ITemplate);
        td.addProperty("emptyTemplate", Sys.UI.ITemplate);
        return td;
    }
    Sys.UI.Data.ListView.registerBaseMethod(this, 'getDescriptor');

    this.getItemElement = function(index) {
        return _itemElements[index];
    }

    this.initialize = function() {
        _focusHandler = Function.createDelegate(this, this._onGotFocus);
        _keyDownHandler = Function.createDelegate(this, this._onKeyDown);
        _itemFocusHandler = Function.createDelegate(this, this._onItemFocus);
        _itemClickHandler = Function.createDelegate(this, this._onItemClick);

        Sys.UI.Data.ListView.callBaseMethod(this, 'initialize');

        this.element.attachEvent('onkeydown', _keyDownHandler);
        this.element.attachEvent('onfocus', _focusHandler);

        if (_itemTemplate) {
            _itemTemplate.initialize();
        }
        if (_separatorTemplate) {
            _separatorTemplate.initialize();
        }
        if (_emptyTemplate) {
            _emptyTemplate.initialize();
        }
        if (_layoutTemplate) {
            _layoutTemplate.initialize();
        }

        if (!this.get_tabIndex()) {
            this.set_tabIndex(0);
        }

        this.render();
    }
    Sys.UI.Data.ListView.registerBaseMethod(this, 'initialize');

    this.dispose = function() {
        if (this.element) {
            if (_focusHandler) {
                this.element.detachEvent('onfocus', _focusHandler);
            }
            if (_keyDownHandler) {
                this.element.detachEvent('onkeydown', _keyDownHandler);
            }
        }
        if (_itemElements) {
            for (var i = _itemElements.length - 1; i >= 0; i--) {
                if (_itemFocusHandler) {
                    _itemElements[i].detachEvent('onfocus', _itemFocusHandler);
                }
                if (_itemClickHandler) {
                    _itemElements[i].detachEvent('onclick', _itemClickHandler);
                }
            }
        }

        if (_layoutTemplate) {
            _layoutTemplate.dispose();
            _layoutTemplate = null;
        }
        if (_itemTemplate) {
            _itemTemplate.dispose();
            _itemTemplate = null;
        }
        if (_separatorTemplate) {
            _separatorTemplate.dispose();
            _separatorTemplate = null;
        }
        if (_emptyTemplate) {
            _emptyTemplate.dispose();
            _emptyTemplate = null;
        }
        _itemElements = null;
        _separatorElements = null;
        _layoutTemplateElement = null;

        Sys.UI.Data.ListView.callBaseMethod(this, 'dispose');
    }
    Sys.UI.Data.ListView.registerBaseMethod(this, 'dispose');

    this._onGotFocus = function() {
        if (window.event.srcElement == this.element) {
            setFocus(this, this.getItemElement(this.get_dataIndex()));
        }
    }

    this._onKeyDown = function() {
        var e = window.event;
        if (e.srcElement == this.getItemElement(_focusIndex)) {
            if ((e.keyCode == Sys.UI.Key.Up) || (e.keyCode == Sys.UI.Key.Left)) {
                if (_focusIndex > 0) {
                    setFocus(this, this.getItemElement(_focusIndex - 1));
                    e.returnValue = false;
                }
            }
            else if ((e.keyCode == Sys.UI.Key.Down) || (e.keyCode == Sys.UI.Key.Right)) {
                if (_focusIndex < (this.get_length() - 1)) {
                    setFocus(this, this.getItemElement(_focusIndex + 1));
                    e.returnValue = false;
                }
            }
            else if ((e.keyCode == Sys.UI.Key.Return) || (e.keyCode == Sys.UI.Key.Space)) {
                if (_focusIndex != -1) {
                    this.set_dataIndex(_focusIndex);
                    e.returnValue = false;
                }
            }
        }
    }

    this._onItemFocus = function() {
        if (typeof(window.event.srcElement.dataIndex) != "undefined") {
            _focusIndex = window.event.srcElement.dataIndex;
        }
    }

    this._onItemClick = function() {
        var s = window.event.srcElement;
        var srcTag = s.tagName.toUpperCase();
        while (s && (typeof(s.dataIndex) == 'undefined')) {
            s = s.parentNode;
        }
        if (s) {
            var idx = s.dataIndex;
            sel = this.getItemElement(idx);
            if (sel) {
                this.set_dataIndex(idx);
                if ((srcTag != "INPUT") && (srcTag != "TEXTAREA") &&
                    (srcTag != "SELECT") && (srcTag != "BUTTON") && (srcTag != "A")) {
                    setFocus(this, sel);
                }
            }
        }
    }

    this.render = function() {
        var i, element;
        for (i = _itemElements.length - 1; i >= 0; i--) {
            element = _itemElements[i];
            if (element) {
                Sys.UI.ITemplate.disposeInstance(element);
            }
        }
        _itemElements = [];
        for (i = _separatorElements.length - 1; i >= 0; i--) {
            element = _separatorElements[i];
            if (element) {
                Sys.UI.ITemplate.disposeInstance(element);
            }
        }
        _separatorElements = [];

        if (this.element.childNodes.length) {
            if (_layoutTemplateElement) {
                Sys.UI.ITemplate.disposeInstance(_layoutTemplateElement);
            }
        }
        this.element.innerHTML = '';

        var tasksPending = false;

        var items = this.get_data();
        var itemLength = items ? items.get_length() : 0;
        if (itemLength > 0) {
            var template = this.get_layoutTemplate();
            if (template) {
                var itemTemplate = this.get_itemTemplate();
                var separatorTemplate = this.get_separatorTemplate();

                var layoutTemplateInstance = template.createInstance(this.element, null, findItemTemplateParentCallback, _itemTemplateParentElementId);
                var itemTemplateParent = layoutTemplateInstance.callbackResult;
                _layoutTemplateElement = layoutTemplateInstance.instanceElement;

                tasksPending = true;
                var renderTask = new Sys.UI.Data.ListViewRenderTask(this, items, itemTemplate, itemTemplateParent, separatorTemplate, _itemElements, _separatorElements, _itemClass, _alternatingItemClass, _separatorClass, _itemFocusHandler, _itemClickHandler);
                Sys.TaskManager.addTask(renderTask);
            }
        }
        else {
            var emptyTemplate = this.get_emptyTemplate();
            if (emptyTemplate) {
                emptyTemplate.createInstance(this.element);
            }
        }
    }

    function findItemTemplateParentCallback(instanceElement, markupContext, id) {
        return markupContext.findElement(id);
    }

    function setFocus(owner, element) {
        if (element.focus) {
            for(var i = owner.get_length() - 1; i >= 0; i--) {
                var sel = owner.getItemElement(i);
                if (sel) {
                    sel.tabIndex = -1;
                }
            }
            var t = owner.element.tabIndex;
            if (t == -1) {
                t = owner.element.__tabIndex;
            }
            element.tabIndex = t;
            setTimeout(Function.createCallback(focus, element), 0);
            owner.element.__tabIndex = t;
            owner.element.tabIndex = -1;
        }
    }

    function focus(element) {
        try {
            element.focus();
        }
        catch(e) {}
    }
}
Sys.UI.Data.ListView.registerClass('Sys.UI.Data.ListView', Sys.UI.Data.DataControl);
Sys.TypeDescriptor.addType('script', 'listView', Sys.UI.Data.ListView);


Sys.UI.Data.ListViewRenderTask = function(listView, data, itemTemplate, itemTemplateParent, separatorTemplate, itemElements, separatorElements, itemClass, alternatingItemClass, separatorClass, itemFocusHandler, itemClickHandler) {
    var _listView = listView;
    var _data = data;
    var _itemTemplate = itemTemplate;
    var _itemTemplateParent = itemTemplateParent;
    var _separatorTemplate = separatorTemplate;
    var _itemElements = itemElements;
    var _separatorElements = separatorElements;
    var _itemClass = itemClass;
    var _alternatingItemClass = alternatingItemClass;
    var _separatorClass = separatorClass;
    var _itemFocusHandler = itemFocusHandler;
    var _itemClickHandler = itemClickHandler;
    var _currentIndex = 0;

    this.dispose = function() {
        _listView = null;
        _data = null;
        _itemTemplate = null;
        _itemTemplateParent = null;
        _separatorTemplate = null;
        _itemElements = null;
        _separatorElements = null;
        _itemClass = null;
        _alternatingItemClass = null;
        _separatorClass = null;
        _itemFocusHandler = null;
        _itemClickHandler = null;
    }

    this.execute = function() {
        var itemLength = _data.get_length();
        var lengthm1 = itemLength - 1;

                var lastElementToRender = Math.min(itemLength, _currentIndex + 5);
        for (; _currentIndex < lastElementToRender; _currentIndex++) {
            var item = _data.getItem(_currentIndex);

            if (_itemTemplate) {
                var element = _itemTemplate.createInstance(_itemTemplateParent, item).instanceElement;
                if (_itemClass) {
                    if ((_currentIndex % 2 == 1) && (_alternatingItemClass)) {
                        element.className = _alternatingItemClass;
                    }
                    else {
                        element.className = _itemClass;
                    }
                }
                _itemElements[_currentIndex] = element;
                element.tabIndex = -1;
                element.dataIndex = _currentIndex;
                element.attachEvent('onfocus', _itemFocusHandler);
                element.attachEvent('onclick', _itemClickHandler);
            }
            if (_separatorTemplate && (_currentIndex != lengthm1) && _itemTemplateParent) {
                var sep = _separatorTemplate.createInstance(_itemTemplateParent).instanceElement;
                if (_separatorClass) {
                    sep.className = _separatorClass;
                }
                _separatorElements[_currentIndex] = sep;
            }
        }

        if (_currentIndex == itemLength) {

                        return true;
        }
        else {
                        return false;
        }
    }
}
Sys.UI.Data.ListViewRenderTask.registerSealedClass('Sys.UI.Data.ListViewRenderTask', null, Sys.ITask, Sys.IDisposable);

Sys.UI.Data.SortBehavior = function() {
    Sys.UI.Data.SortBehavior.initializeBase(this);
    
    var _clickHandler;
    var _sortChangedDelegate;
    var _sortColumn = '';
    var _sortAscendingCssClass = 'sortAscending';
    var _sortDescendingCssClass = 'sortDescending';
    var _dataView = null;
    
    this.get_sortAscendingCssClass = function() {
        return _sortAscendingCssClass;
    }
    this.set_sortAscendingCssClass = function(value) {
        _sortAscendingCssClass = value;
    }
    
    this.get_sortColumn = function() {
        return _sortColumn;
    }
    this.set_sortColumn = function(value) {
        if (value != _sortColumn) {
            _sortColumn = value;
            this.raisePropertyChanged('sortColumn');
        }
    }
    
    this.get_sortDescendingCssClass = function() {
        return _sortDescendingCssClass;
    }
    this.set_sortDescendingCssClass = function(value) {
        _sortDescendingCssClass = value;
    }
    
    this.get_dataView = function() {
        return _dataView;
    }
    this.set_dataView = function(value) {
if (!Sys.Data.DataView.isInstanceOfType(value)) throw Error.createError("dataView must be of type Sys.Data.DataView.");
        if (_dataView && _sortChangedDelegate) {
            _dataView.propertyChanged.remove(_sortChangedDelegate);
        }
        _dataView = value;
        if (this.get_isInitialized()) {
            _dataView.propertyChanged.add(_sortChangedDelegate);
            this.update();
        }
    }
    
    this.dispose = function() {
        if (_dataView && _sortChangedDelegate) {
            _dataView.propertyChanged.remove(_sortChangedDelegate);
        }
        _dataView = null;
        if (_clickHandler) {
            this.control.element.detachEvent('onclick', _clickHandler);
        }
        Sys.UI.Data.SortBehavior.callBaseMethod(this, 'dispose');
    }

    this.initialize = function() {
        Sys.UI.Data.SortBehavior.callBaseMethod(this, 'initialize');
        _clickHandler = Function.createDelegate(this, clickHandler);
        this.control.element.attachEvent('onclick', _clickHandler);
        _sortChangedDelegate = Function.createDelegate(this, sortChanged);
        if (_dataView) {
            _dataView.propertyChanged.add(_sortChangedDelegate);
            this.update();
        }
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.Data.SortBehavior.callBaseMethod(this, 'getDescriptor');
        td.addProperty('dataView', Object);
        td.addProperty('sortAscendingCssClass', String);
        td.addProperty('sortColumn', String);
        td.addProperty('sortDescendingCssClass', String);
        return td;
    }
    
    function clickHandler() {
        var view = this.get_dataView();
        if (view) {
            if (view.get_sortColumn() == _sortColumn) {
                view.set_sortDirection(
                    (view.get_sortDirection() == Sys.Data.SortDirection.Ascending) ?
                    Sys.Data.SortDirection.Descending :
                    Sys.Data.SortDirection.Ascending);
            }
            else {
                view.sort(_sortColumn, Sys.Data.SortDirection.Ascending);
            }
        }
    }
    
    this.update = function() {
        if (_dataView && (_dataView.get_sortColumn() == _sortColumn)) {
            if (_dataView.get_sortDirection() == Sys.Data.SortDirection.Ascending) {
                this.control.removeCssClass(_sortDescendingCssClass);
                this.control.addCssClass(_sortAscendingCssClass);
            }
            else {
                this.control.removeCssClass(_sortAscendingCssClass);
                this.control.addCssClass(_sortDescendingCssClass);
            }
        }
        else {
            this.control.removeCssClass(_sortAscendingCssClass);
            this.control.removeCssClass(_sortDescendingCssClass);
        }
    }
    
    function sortChanged(sender, args) {
        var pName = args.get_propertyName();
        if ((pName == 'sortColumn') || (pName == 'sortDirection')) {
            this.update();
        }
    }
}
Sys.UI.Data.SortBehavior.registerSealedClass('Sys.UI.Data.SortBehavior', Sys.UI.Behavior);
Sys.TypeDescriptor.addType('script', 'sortBehavior', Sys.UI.Data.SortBehavior);
Sys.UI.Data.XSLTView = function(associatedElement) {
    Sys.UI.Data.XSLTView.initializeBase(this, [associatedElement]);

    var _document = null;
    var _transform = null;
    var _parameters = null;

    this.get_document = function() {
        return _document;
    }
    this.set_document = function(document) {
        _document = document;
        if (this.get_isInitialized()) {
            this._render();
        }
    }
    
    this.get_parameters = function() {
        if (!_parameters) {
            _parameters = { };
        }
        return _parameters;
    }
    
    this.get_transform = function() {
        return _transform;
    }
    this.set_transform = function(transform) {
        _transform = transform;
        if (this.get_isInitialized()) {
            this._render();
        }
    }

    this.dispose = function() {
        _document = null;
        _transform = null;

        Sys.UI.Data.XSLTView.callBaseMethod(this, 'dispose');
    }
    
    this.getDescriptor = function() {
        var td = Sys.UI.Data.XSLTView.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('document', Object);
        td.addProperty('parameters', Object,  true);
        td.addProperty('transform', Object);
        td.addMethod('update');
        return td;
    }
    
    this.initialize = function() {
        Sys.UI.Data.XSLTView.callBaseMethod(this, 'initialize');
        this._render();
    }
    
    this.update = function() {
        this._render();
    }

    this._render = function() {
        var html = '';
        
        if (_document && _transform) {
            if (_parameters) {
                if (Sys.Runtime.get_hostType() == Sys.HostType.InternetExplorer) {
                    _transform.setProperty('SelectionNamespaces', 'xmlns:xsl="http://www.w3.org/1999/XSL/Transform"');
                }
                for (var paramName in _parameters) {
                    var paramNode = _transform.selectSingleNode('//xsl:param[@name="' + paramName + '"]');
                    if (paramNode) {
                        paramNode.text = _parameters[paramName].toString();
                        paramNode.removeAttribute('select');
                    }
                }
            }
            html = _document.transformNode(_transform);
        }
        
        this.element.innerHTML = html;
    }    
}
Sys.UI.Data.XSLTView.registerSealedClass('Sys.UI.Data.XSLTView', Sys.UI.Control);
Sys.TypeDescriptor.addType('script', 'xsltView', Sys.UI.Data.XSLTView);



Type.registerNamespace('Sys.WebForms');


Sys.WebForms.PostBackAction = function() {
    Sys.WebForms.PostBackAction.initializeBase(this);
    
    var _eventArgument;
    
    this.get_eventArgument = function() {
        return _eventArgument;
    }
    this.set_eventArgument = function(value) {
        _eventArgument = value;
    }
    
    this.getDescriptor = function() {
        var td = Sys.WebForms.PostBackAction.callBaseMethod(this, 'getDescriptor');
        
        td.addProperty('eventArgument', String);
        td.addProperty('target', String);
        return td;
    }
    
    this.performAction = function() {
        __doPostBack(this.get_target(), this.get_eventArgument());
    }
}
Sys.WebForms.PostBackAction.registerSealedClass('Sys.WebForms.PostBackAction', Sys.Action);
Sys.TypeDescriptor.addType('script', 'postBack', Sys.WebForms.PostBackAction);


Sys.WebForms._PageRequestManager = function() {
    var _id;
    var _form;
    var _scriptManagerID;
    var _updatePanelIDs;
    var _updatePanelClientIDs;
    var _asyncPostbackControlIDs;
    var _errorContainerID;

    var _additionalInput;
    var _onsubmit;
    var _originalDoPostBack;
    var _postbackSettings;
    var _request;
    var _referencedScripts = [];
    var _scriptsToLoad;
    var _currentLoadingScript;
    var _xmlScript;
    var _pageErrorMessage;
    var _inErrorMode = false;
    var _errorModeGrayDiv;
    var _errorModeTable;
    var _onWindowResizeHandler;
    var _onFormSubmitHandler;
    var _onFormElementClickHandler;

    Sys.Runtime.registerDisposableObject(this);

    this.get_asyncPostbackControlIDs = function() {
                                return _asyncPostbackControlIDs.join(',');
    }
    this.set_asyncPostbackControlIDs = function(value) {
        if (value) {
            _asyncPostbackControlIDs = value.split(',');
        }
        else {
                        _asyncPostbackControlIDs = [];
        }
    }

    this.get_errorContainerID = function() {
        return _errorContainerID;
    }
    this.set_errorContainerID = function(value) {
        _errorContainerID = value;
    }

    this.get_form = function() {
                                return _form.id;
    }
    this.set_form = function(value) {
if (_form) throw Error.createError('The form property cannot be set more than once on PageRequestManager.');
        _form = document.getElementById(value);

                _form._initialAction = _form.action;

        _onsubmit = _form.onsubmit;
        _form.onsubmit = null;
        _onFormSubmitHandler = Function.createDelegate(this, this._onFormSubmit);
        _onFormElementClickHandler = Function.createDelegate(this, this._onFormElementClick);
        _form.attachEvent('onsubmit', _onFormSubmitHandler);
        _form.attachEvent('onclick', _onFormElementClickHandler);

        _originalDoPostBack = window.__doPostBack;
        if (_originalDoPostBack) {
            window.__doPostBack = Function.createDelegate(this, this._doPostBack);
        }
    }

    this.get_id = function() {
                                        return _id;
    }
    this.set_id = function(value) {
debug.assert(value == Sys.WebForms._PageRequestManager._id, 'The ID must be \'' + Sys.WebForms._PageRequestManager._id + '\'.');
        _id = value;
    }

    this.get_inErrorMode = function() {
                                        return _inErrorMode;
    }

    this.get_inPostBack = function() {
                                return _request != null;
    }

    this.get_pageErrorMessage = function() {
                                return _pageErrorMessage;
    }

    this.get_scriptManagerID = function() {
                                return _scriptManagerID;
    }
    this.set_scriptManagerID = function(value) {
        _scriptManagerID = value;
    }

    this.get_updatePanelIDs = function() {
                                return _updatePanelIDs.join(',');
    }
    this.set_updatePanelIDs = function(value) {
        if (value) {
            _updatePanelIDs = value.split(',');
                        _updatePanelClientIDs = new Array(_updatePanelIDs.length);
            for (var i = 0; i < _updatePanelIDs.length; i++) {
                _updatePanelClientIDs[i] = uniqueIDToClientID(_updatePanelIDs[i]);
            }
        }
        else {
                        _updatePanelIDs = [];
            _updatePanelClientIDs = [];
        }
    }


    this.abortPostBack = function() {
        if (this.get_inPostBack()) {
            _request.abort();
            _request = null;
            this.raisePropertyChanged('inPostBack');
        }
    }

        this.propertyChanged = new Type.Event(this, false);

    function addScriptToDocument(scriptElement) {
        var headElement = document.getElementsByTagName('HEAD')[0];
        headElement.appendChild(scriptElement);
    }

    this.clearError = function() {
debug.assert(_onWindowResizeHandler != null, 'expected _onWindowResizeHandler to be set');
        window.detachEvent('onresize', _onWindowResizeHandler);

        debug.assert(_errorModeGrayDiv != null, '_errorModeGrayDiv should exist');
debug.assert(_errorModeTable != null, '_errorModeTable should exist');
        _errorModeGrayDiv.style.display = 'none';
        _errorModeTable.style.display = 'none';

        this._enableFormElements();

                _pageErrorMessage = '';
        this.raisePropertyChanged('pageErrorMessage');

        _inErrorMode = false;
        this.raisePropertyChanged('inErrorMode');
    }

    function createPostbackSettings(async, panelID) {
debug.assert(async ? panelID : true, 'panelID should be specified if async is true');
        return { async:async, panelID:panelID };
    }

    function destroyTree(element, markupContext) {
                if (element.nodeType == 1) {
            if (element.control) {
                markupContext.removeObject(element.control);
                element.control.dispose();
            }

            var children = element.children;
            for (var i = children.length - 1; i >= 0; i--) {
                var node = children[i];
                destroyTree(node, markupContext);
                element.removeChild(node);
            }
        }
    }

    function disableElements(elements) {
        for (var i = elements.length - 1; i >= 0; i--) {
            var elmt = elements[i];
            if (!elmt.disabled) {
                elmt.disabled = true;
            }
            else {
                elmt._wasDisabled = true;
            }
        }
    }

    this._disableFormElements = function() {
        disableElements(_form.getElementsByTagName("INPUT"));
        disableElements(_form.getElementsByTagName("SELECT"));
        disableElements(_form.getElementsByTagName("TEXTAREA"));
        disableElements(_form.getElementsByTagName("BUTTON"));
        disableElements(_form.getElementsByTagName("A"));
    }

    this.dispose = function() {
        if (_form) {
            _form.detachEvent('onsubmit', _onFormSubmitHandler);
            _form.detachEvent('onclick', _onFormElementClickHandler);
        }

        if (_originalDoPostBack) {
            window.__doPostBack = _originalDoPostBack;
            _originalDoPostBack = null;
        }

        _form = null;
        _scriptManagerID = null;
        _updatePanelIDs = null;
        _updatePanelClientIDs = null;
        _asyncPostbackControlIDs = null;


        Sys.Runtime.unregisterDisposableObject(this);
    }

        this._doPostBack = function(eventTarget, eventArgument) {
        _additionalInput = null;

        if (this.get_inPostBack()) {
                                    if (window.event) {
                window.event.returnValue = false;
            }
            return;
        }

                                        _postbackSettings = null;
        var postbackElement = findNearestElement(eventTarget);
        if (postbackElement) {
            _postbackSettings = getPostbackSettings(postbackElement);
        }
        else {
            _postbackSettings = createPostbackSettings(true, _scriptManagerID);
        }
        if (!_postbackSettings.async) {
            _originalDoPostBack(eventTarget, eventArgument);
            return;
        }

        var form = _form;
        form.__EVENTTARGET.value = eventTarget;
        form.__EVENTARGUMENT.value = eventArgument;
        this._onFormSubmit();

        if (window.event) {
            window.event.returnValue = false;
        }
    }

    function enableElements(elements) {
        for (var i = elements.length - 1; i >= 0; i--) {
            var elmt = elements[i];
            if (!elmt._wasDisabled) {
                elmt.disabled = false;
            }
            else {
                elmt._wasDisabled = null;
            }
        }
    }

    this._enableFormElements = function() {
        enableElements(_form.getElementsByTagName("INPUT"));
        enableElements(_form.getElementsByTagName("SELECT"));
        enableElements(_form.getElementsByTagName("TEXTAREA"));
        enableElements(_form.getElementsByTagName("BUTTON"));
        enableElements(_form.getElementsByTagName("A"));
    }

    this._enterErrorMode = function(pageErrorMessage) {
        this._onFormSubmitCompletedCallback();

        var errorContainer = null;
        if (_errorContainerID) {
            errorContainer = document.getElementById(_errorContainerID);
        }
        if (errorContainer) {
            if (!_errorModeGrayDiv) {
                debug.assert(_errorModeTable == null, 'Expected _errorModeTable to not exist when _errorModeGrayDiv does not exist');

                                _errorModeGrayDiv = document.createElement('div');

                _errorModeGrayDiv.style.position = 'absolute';
                _errorModeGrayDiv.style.top = '0px';
                _errorModeGrayDiv.style.left = '0px';
                _errorModeGrayDiv.style.width = '100%';
                _errorModeGrayDiv.style.height = '100%';
                _errorModeGrayDiv.style.backgroundColor = '#c1c0c0';
                _errorModeGrayDiv.style.opacity = '0.50';
                _errorModeGrayDiv.style.filter = 'alpha(opacity=50)';
                _errorModeGrayDiv.style.zIndex = '30000';

                                _errorModeTable = document.createElement('table');
                _errorModeTable.cellPadding = '0';
                _errorModeTable.cellSpacing = '0';
                _errorModeTable.style.top = '0px';
                _errorModeTable.style.left = '0px';
                _errorModeTable.style.position = 'absolute';
                _errorModeTable.style.zIndex = '30001';
                var tbodyElement = document.createElement('tbody');
                var trElement = document.createElement('tr');
                var tdElement = document.createElement('td');
                tdElement.vAlign = 'middle';
                tdElement.align = 'center';

                _errorModeTable.appendChild(tbodyElement);
                tbodyElement.appendChild(trElement);
                trElement.appendChild(tdElement);

                tdElement.appendChild(errorContainer);

                document.body.appendChild(_errorModeGrayDiv);
                document.body.appendChild(_errorModeTable);
            }
            else {
                                _errorModeGrayDiv.style.display = '';
                _errorModeTable.style.display = '';
            }

            this._disableFormElements();

                        this._onWindowResize();
            if (!_onWindowResizeHandler) {
                _onWindowResizeHandler = Function.createDelegate(this, this._onWindowResize);
            }
            window.attachEvent('onresize', _onWindowResizeHandler);

                        _pageErrorMessage = pageErrorMessage;
            this.raisePropertyChanged('pageErrorMessage');

            _inErrorMode = true;
            this.raisePropertyChanged('inErrorMode');
        }
        else {
                                                alert(pageErrorMessage);
        }
    }

            function findNearestElement(uniqueID) {
        while (uniqueID.length > 0) {
            var clientID = uniqueIDToClientID(uniqueID);
            var element = document.getElementById(clientID);
            if (element) {
                return element;
            }
            var indexOfLastDollar = uniqueID.lastIndexOf('$');
            if (indexOfLastDollar == -1) {
                return null;
            }
            uniqueID = uniqueID.substring(0, indexOfLastDollar);
        }
        return null;
    }

    this.getDescriptor = function() {
        var td = new Sys.TypeDescriptor();

        td.addProperty('asyncPostbackControlIDs', String);
        td.addProperty('errorContainerID', String);
        td.addProperty('form', String);
        td.addProperty('id', String);
        td.addProperty('inPostBack', Boolean, true);
        td.addProperty('inErrorMode', Boolean, true);
        td.addProperty('pageErrorMessage', String, true);
        td.addProperty('scriptManagerID', String);
        td.addProperty('updatePanelIDs', String);
        td.addEvent('propertyChanged', false);
        td.addMethod('abortPostBack');
        td.addMethod('clearError');

        return td;
    }

    function getPostbackSettings(element) {
debug.assert(element, 'element should not be null');
                                                                        for (var j = _updatePanelClientIDs.length - 1; j >= 0; j--) {
            var updatePanel = document.getElementById(_updatePanelClientIDs[j]);
            if (updatePanel && updatePanel.contains(element)) {
                                                                return createPostbackSettings(true, _updatePanelIDs[j]);
            }
        }

                        for (var i = 0; i < _asyncPostbackControlIDs.length; i++) {
            var asyncPostbackControl = document.getElementById(_asyncPostbackControlIDs[i]);
            if (element == asyncPostbackControl) {
                                                return createPostbackSettings(true, _scriptManagerID);
            }
        }

                return createPostbackSettings(false, null);
    }

    this._loadScript = function() {
        var currentScript = _currentLoadingScript;
        if (currentScript) {
            if ((currentScript.readyState != 'loaded') &&
                (currentScript.readyState != 'complete')) {
                return;
            }
            else {
                if (Sys.Runtime.get_hostType() != Sys.HostType.InternetExplorer) {
                    currentScript.onload = null;
                }
                else {
                    currentScript.onreadystatechange = null;
                }
                _currentLoadingScript = null;
            }
        }

        var scripts = _scriptsToLoad;
        if (scripts && (scripts.length > 1)) {
            var scriptSrc = scripts.dequeue();
            var scriptElement = document.createElement('SCRIPT');

            _currentLoadingScript = scriptElement;

            if (Sys.Runtime.get_hostType() != Sys.HostType.InternetExplorer) {
                scriptElement.readyState = 'loaded';
                scriptElement.onload = Function.createDelegate(this, this._loadScript);
            }
            else {
                scriptElement.onreadystatechange = Function.createDelegate(this, this._loadScript);
            }
            scriptElement.type = 'text/javascript';
            scriptElement.src = scriptSrc;

            addScriptToDocument(scriptElement);

            return;
        }

        var scriptText = scripts[0];
        if (scriptText) {
            var inlineScriptElement = document.createElement('SCRIPT');
            inlineScriptElement.type = 'text/javascript';
            inlineScriptElement.text = scriptText;

            addScriptToDocument(inlineScriptElement);
        }

        this._onFormSubmitCompletedCallback();
    }

    this._onFormElementClick = function() {
        var element = window.event.srcElement;
        if (element.disabled) {
            return;
        }

        if (this.get_inPostBack()) {
            return;
        }

                _postbackSettings = getPostbackSettings(element);

        if (element.tagName == 'INPUT') {
            var type = element.type;
            if (type == 'submit') {
                _additionalInput = element.name + '=' + encodeURIComponent(element.value);
            }
            else if (type == 'image') {
                var x = window.event.offsetX;
                var y = window.event.offsetY;
                _additionalInput = element.name + '.x=' + x + '&' + element.name + '.y=' + y;
            }
        }
        else if ((element.tagName == 'BUTTON') && (element.name.length != 0) && (element.type == 'submit')) {
            _additionalInput = element.name + '=' + encodeURIComponent(element.value);
        }
    }

    this._onFormSubmit = function() {
        if (this.get_inPostBack()) {
                                    if (window.event) {
                window.event.returnValue = false;
            }
            return false;
        }

        var continueSubmit = true;

        if (_onsubmit) {
            continueSubmit = _onsubmit();
        }

        if (!continueSubmit) {
            if (window.event) {
                window.event.returnValue = false;
            }
            return false;
        }

        var form = _form;
        if (form.action != form._initialAction) {
                                    return true;
        }

                        if (!_postbackSettings.async) {
            return true;
        }

                var formBody = new Sys.StringBuilder();
        formBody.append(_scriptManagerID + '=' + _postbackSettings.panelID + '&');

        var count = form.elements.length;
        for (var i = 0; i < count; i++) {
            var element = form.elements[i];
            var name = element.name;
            if ((name == null) || (name.length == 0)) {
                continue;
            }

            var tagName = element.tagName;

            if (tagName == 'INPUT') {
                var type = element.type;
                if ((type == 'text') ||
                    (type == 'password') ||
                    (type == 'hidden') ||
                    (((type == 'checkbox') || (type == 'radio')) && element.checked)) {
                    formBody.append(name);
                    formBody.append('=');
                    formBody.append(encodeURIComponent(element.value));
                    formBody.append('&');
                }
            }
            else if (tagName == 'SELECT') {
                var optionCount = element.options.length;
                for (var j = 0; j < optionCount; j++) {
                    var option = element.options[j];
                    if (option.selected == true) {
                        formBody.append(name);
                        formBody.append('=');
                        formBody.append(encodeURIComponent(option.value));
                        formBody.append('&');
                    }
                }
            }
            else if (tagName == 'TEXTAREA') {
                formBody.append(name);
                formBody.append('=');
                formBody.append(encodeURIComponent(element.value));
                formBody.append('&');
            }
        }

        if (_additionalInput) {
            formBody.append(_additionalInput);
            _additionalInput = null;
        }

        var request = new Sys.Net.WebRequest();
        request.set_url(form.action);
        request.get_headers()['delta'] = 'true';
        request.get_headers()['Cache-Control'] = 'no-cache';
        request.set_timeoutInterval(90000);
        request.set_priority(Sys.Net.WebRequestPriority.High);
        request.completed.add(Function.createDelegate(this, this._onFormSubmitCompleted));
        request.timeout.add(Function.createDelegate(this, this._onFormSubmitTimeout));
        request.set_body(formBody.toString());

        _request = request;
        this.raisePropertyChanged('inPostBack');
        request.invoke();

                if (window.event) {
            window.event.returnValue = false;
        }
        return false;
    }

    this._onFormSubmitCompleted = function(sender, eventArgs) {
        
                                        var isErrorMode = true;
        var errorNode;
        var delta;
        if (sender.get_statusCode() == 200) {
            delta = sender.get_xml();
            if (delta) {
                errorNode = delta.selectSingleNode("/delta/pageError");
                if (!errorNode) {
                    isErrorMode = false;
                }
            }
        }

        if (isErrorMode) {
                        if (errorNode) {
                pageErrorMessage = errorNode.attributes.getNamedItem('message').nodeValue;
            }
            else {
                pageErrorMessage = 'Unknown error';
            }
            this._enterErrorMode(pageErrorMessage);
            return;
        }

        var redirectNode = delta.selectSingleNode("/delta/pageRedirect");
        if (redirectNode) {
                        var redirectLocation = redirectNode.attributes.getNamedItem('location').nodeValue;
            window.location = redirectLocation;
            return;
        }

debug.assert(delta != null, 'We should have valid XML if we get here');

                var deltaPanels = delta.selectSingleNode("/delta/deltaPanels/text()");
        if (deltaPanels && deltaPanels.length) {
            deltaPanels = deltaPanels.nodeValue.split(',');

                        for (var i = 0; i < deltaPanels.length; i++) {
                var deltaPanelID = deltaPanels[i];

                var deltaPanelRendering = delta.selectSingleNode('/delta/rendering//panelContent[@id="' + deltaPanelID + '"]');
                                deltaPanelRendering = Sys.UI._unescapeCData(deltaPanelRendering.firstChild.nodeValue);

                this._updatePanel(document.getElementById(deltaPanelID), deltaPanelRendering,
                                  Sys.Application.getMarkupContext());
            }
        }

                var hiddenFields = delta.selectNodes('/delta/hiddenField');
        for (var j = 0; j < hiddenFields.length; j++) {
            var id = hiddenFields[j].attributes.getNamedItem('id').nodeValue;
            var value = hiddenFields[j].attributes.getNamedItem('value').nodeValue;

            var hiddenFieldElement = document.getElementById(id);
            if (!hiddenFieldElement) {
                                hiddenFieldElement = document.createElement('input');
                hiddenFieldElement.id = id;
                hiddenFieldElement.name = id;
                hiddenFieldElement.type = 'hidden';
                _form.appendChild(hiddenFieldElement);
            }
            hiddenFieldElement.value = value;
        }

                var title = delta.selectSingleNode('/delta/rendering//title/text()');
        if (title) {
            document.title = title.nodeValue.trim();
        }
        else {
            document.title = '';
        }

                var pageRequestManagerNode = delta.selectSingleNode("/delta/pageRequestManager");
        if (pageRequestManagerNode) {
            this.set_asyncPostbackControlIDs(pageRequestManagerNode.attributes.getNamedItem('asyncPostbackControlIDs').nodeValue);
            this.set_updatePanelIDs(pageRequestManagerNode.attributes.getNamedItem('updatePanelIDs').nodeValue);
        }

                var styleSheetMarkup = delta.selectSingleNode('/delta/rendering/head/style[position()=last()]');
        if (styleSheetMarkup) {
            this._updateStyleSheet(styleSheetMarkup.text);
        }

                        _xmlScript = delta.selectSingleNode('/delta/xmlScript/page');

                var scripts = delta.selectNodes('/delta//script[@type="text/javascript"]');
        if (scripts && scripts.length) {
            this._updateScripts(scripts);
        }
        else {
            this._onFormSubmitCompletedCallback();
        }
    }

    this._onFormSubmitCompletedCallback = function() {
        if (_xmlScript) {
            Sys.Application._loadIncremental(_xmlScript);
            _xmlScript = null;
        }

        _request = null;
        this.raisePropertyChanged('inPostBack');

        _scriptsToLoad = null;
        _currentLoadingScript = null;
        _additionalInput = null;
    }

    this._onFormSubmitTimeout = function(sender, eventArgs) {
        _request = null;
        this.raisePropertyChanged('inPostBack');
    }

    this._onWindowResize = function() {
        var windowWidth = document.body.parentNode.clientWidth + "px";
        var windowHeight = document.body.parentNode.clientHeight + "px";
        _errorModeGrayDiv.style.width = windowWidth;
        _errorModeGrayDiv.style.height = windowHeight;
        _errorModeTable.style.width = windowWidth;
        _errorModeTable.style.height = windowHeight;
    }

    this.raisePropertyChanged = function(propertyName) {
        this.propertyChanged.invoke(this, new Sys.PropertyChangedEventArgs(propertyName));
    }

    function uniqueIDToClientID(uniqueID) {
                return uniqueID.replace(/\$/g, '_');
    }

    this._updatePanel = function(updatePanelElement, rendering, markupContext) {
        destroyTree(updatePanelElement, markupContext);

                updatePanelElement.innerHTML = rendering;
    }

    this._updateScripts = function(scripts) {
        var existingScripts = document.getElementsByTagName('SCRIPT');

        for (var i = existingScripts.length - 1; i >= 0; i--) {
            var scriptNode = existingScripts[i];
            var scriptSrcAttribute = scriptNode.attributes.getNamedItem('src');
            var scriptSrc = (scriptSrcAttribute) ? scriptSrcAttribute.nodeValue : '';
            if (scriptSrc.length) {
                if (scriptSrc.indexOf('/WebResource.axd?') >= 0) {
                    var scriptIndexT = scriptSrc.indexOf('&t=');
                    scriptSrc = scriptSrc.substring(0, scriptIndexT);
                }

                if (!_referencedScripts.contains(scriptSrc)) {
                    _referencedScripts.add(scriptSrc);
                }
            }
        }

                                        if (window.__theFormPostData) {
            window.__theFormPostData = "";
        }
        if (window.__theFormPostCollection) {
            window.__theFormPostCollection = [];
        }
                                                if (window.__rootMenuItem) {
            window.__rootMenuItem = null;
        }
        if (window.__scrollPanel) {
            window.__scrollPanel = null;
        }

                                                                var scriptsToLoad = [];
        var scriptText = '';

        for (var j = 0; j < scripts.length; j++) {
            var xmlScriptNode = scripts[j];
            var srcAttribute = xmlScriptNode.attributes.getNamedItem('src');
            var src = (srcAttribute) ? srcAttribute.nodeValue : '';

            if (src.length) {
                if (src.indexOf('/WebResource.axd?') >= 0) {
                    var indexT = src.indexOf('&t=');
                    src = src.substring(0, indexT);
                }

                if (_referencedScripts.contains(src)) {
                    continue;
                }

                scriptsToLoad.queue(src);
            }
            else {
                var text = '';

                if (xmlScriptNode.childNodes.length != 0) {
                    for (var c = xmlScriptNode.childNodes.length - 1; c >= 0; c--) {
                        var nodeType = xmlScriptNode.childNodes[c].nodeType;
                                                                        
                                                                                                if ((nodeType == 3) || (nodeType == 4) || (nodeType == 8)) {
                            text += xmlScriptNode.childNodes[c].nodeValue;
                        }
                    }
                }
                else {
                    text = xmlScriptNode.nodeValue;
                }

                if (text) {
                    if (text.indexOf('function __doPostBack(') >= 0) {
                        continue;
                    }

                    scriptText += text;
                }
            }
        }

                scriptsToLoad.queue(Sys.UI._unescapeCData(scriptText));

        if (scriptsToLoad.length != 0) {
            _scriptsToLoad = scriptsToLoad;
            _currentLoadingScript = null;
            this._loadScript();
        }
        else {
            this._onFormSubmitCompletedCallback();
        }
    }

    this._updateStyleSheet = function(cssText) {
        var head = document.getElementsByTagName('HEAD')[0];
        var styles = document.styleSheets;
        var styleSheet = styles[styles.length - 1];

        if (Sys.Runtime.get_hostType() == Sys.HostType.InternetExplorer) {
            styleSheet.cssText = cssText;
        }
        else {
                                    
            for (var i = styleSheet.cssRules.length - 1; i >= 0; i--) {
                styleSheet.deleteRule(i);
            }

            var ruleLines = cssText.split('}');
            for (var j = 0; j < ruleLines.length; j++) {
                var rule = ruleLines[j];
                var index = rule.indexOf('{');

                var style = rule.substr(index + 1).trim();
                if (style.length != 0) {
                    var selector = rule.substring(0, index).trim();
                    styleSheet.insertRule(selector + '{' + style + '}', styleSheet.cssRules.length);
                }
            }
        }
    }
}

Sys.WebForms._PageRequestManager._id = '_PageRequestManager';

Sys.WebForms._PageRequestManager.registerSealedClass('Sys.WebForms._PageRequestManager', null, Sys.ITypeDescriptorProvider, Sys.INotifyPropertyChanged, Sys.IDisposable);
Sys.TypeDescriptor.addType('script', 'pageRequestManager', Sys.WebForms._PageRequestManager);

Sys.WebForms._PageRequestManager.parseFromMarkup = function(type, node, markupContext) {
    if (!markupContext.get_isGlobal()) {
        throw Error.createError('The PageRequestManager must be a top level object.');
    }

        if (!Sys.WebForms.PageRequestManager) {
        Sys.WebForms.PageRequestManager = new Sys.WebForms._PageRequestManager();
    }

    Sys.MarkupParser.initializeObject(Sys.WebForms.PageRequestManager, node, markupContext);

    markupContext.addObject(Sys.WebForms._PageRequestManager._id, Sys.WebForms.PageRequestManager);

    return Sys.WebForms.PageRequestManager;
}




Sys.Application = new Sys._Application();
