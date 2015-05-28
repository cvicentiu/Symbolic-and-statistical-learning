// detecting for NS4 for Windows in order to reference additional .css file
var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? 1:0;

if (document.layers) document.write ("<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.fredlaw.com\styles_ns4.css\" />");