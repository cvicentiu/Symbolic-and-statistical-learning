// Support Script (627)
function subAwithBinC(a,b,c)
{

	var i = c.indexOf(a);
	var l = b.length;

	while (i != -1)	{
		c = c.substring(0,i) + b + c.substring(i + a.length,c.length);
  i += l
		i = c.indexOf(a,i);
	}
	return c;

}


function ImageButton1_onClick() {
var addChar = "?" 
var j
var okToSubmit = false;

if ("".length > 1)
{
    Form1.setAction(subAwithBinC(" ", "%20", ""));
}

// execute the onSubmit() event handler and try to 
// determine if it already validated the form
Result = Form1.onSubmit();

//   If there is no onSubmithander the return value is null
//   If there is a validation handler it returns true to submit
//   or false to not submit
if (Result==null)  // there is no validation already defined
{
    if ("0" == "1")
    {
        Result = Validate("0"); // don't stop on first error
        if (Result == "") okToSubmit = true;
        else alert("The form could not be submitted:" + Result);
    }
    else okToSubmit = true;
}
else // there is a validation already defined
{
    if (Result==true)
        okToSubmit = true;
}

if (okToSubmit) 
{
    // We have to
    // put the source in the query string so the generic database contracts
    // still work.

    // NOTE: this only works if the method of the form is POST


    act = Form1.getAction();
    if (act.indexOf("?") != -1)
    {    
        addChar = "&"
    }

    act += addChar + "ImageButton1=1"
    Form1.setAction(act);


    Form1.submit();
}
 }
function _ImageButton1_onClick() { if (ImageButton1) return ImageButton1.onClick(); }
function ImageButton2_onClick() {
var addChar = "?" 
var j
var okToSubmit = false;

if ("".length > 1)
{
    Form1.setAction(subAwithBinC(" ", "%20", ""));
}

// execute the onSubmit() event handler and try to 
// determine if it already validated the form
Result = Form1.onSubmit();

//   If there is no onSubmithander the return value is null
//   If there is a validation handler it returns true to submit
//   or false to not submit
if (Result==null)  // there is no validation already defined
{
    if ("0" == "1")
    {
        Result = Validate("0"); // don't stop on first error
        if (Result == "") okToSubmit = true;
        else alert("The form could not be submitted:" + Result);
    }
    else okToSubmit = true;
}
else // there is a validation already defined
{
    if (Result==true)
        okToSubmit = true;
}

if (okToSubmit) 
{
    // We have to
    // put the source in the query string so the generic database contracts
    // still work.

    // NOTE: this only works if the method of the form is POST


    act = Form1.getAction();
    if (act.indexOf("?") != -1)
    {    
        addChar = "&"
    }

    act += addChar + "ImageButton2=1"
    Form1.setAction(act);


    Form1.submit();
}
 }
function _ImageButton2_onClick() { if (ImageButton2) return ImageButton2.onClick(); }
function ImageButton3_onClick() {
var addChar = "?" 
var j
var okToSubmit = false;

if ("".length > 1)
{
    Form1.setAction(subAwithBinC(" ", "%20", ""));
}

// execute the onSubmit() event handler and try to 
// determine if it already validated the form
Result = Form1.onSubmit();

//   If there is no onSubmithander the return value is null
//   If there is a validation handler it returns true to submit
//   or false to not submit
if (Result==null)  // there is no validation already defined
{
    if ("0" == "1")
    {
        Result = Validate("0"); // don't stop on first error
        if (Result == "") okToSubmit = true;
        else alert("The form could not be submitted:" + Result);
    }
    else okToSubmit = true;
}
else // there is a validation already defined
{
    if (Result==true)
        okToSubmit = true;
}

if (okToSubmit) 
{
    // We have to
    // put the source in the query string so the generic database contracts
    // still work.

    // NOTE: this only works if the method of the form is POST


    act = Form1.getAction();
    if (act.indexOf("?") != -1)
    {    
        addChar = "&"
    }

    act += addChar + "ImageButton3=1"
    Form1.setAction(act);


    Form1.submit();
}
 }
function _ImageButton3_onClick() { if (ImageButton3) return ImageButton3.onClick(); }


function ImageButton4_onClick() {

var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"yes":"no")
options+=",resizable="+(("0"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("300") > 0) options+=",height="+"400"

if (parseInt("50") >= 0)
{
	options+=",top="+"50"
	options+=",screenY="+"50"
}
if (parseInt("100") >= 0)
{
	options+=",left="+"100"
	options+=",screenX="+"100"
}

page = "";
if (page.length == 0) page = "ContactMe.asp";

window.open(page,"NewWindow",options);
}
function _ImageButton4_onClick() { if (ImageButton4) return ImageButton4.onClick(); }


function ImageButton5_onClick() {

var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"no":"no")
options+=",resizable="+(("1"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("500") > 0) options+=",height="+"500"

if (parseInt("-1") >= 0)
{
	options+=",top="+"-1"
	options+=",screenY="+"-1"
}
if (parseInt("-1") >= 0)
{
	options+=",left="+"-1"
	options+=",screenX="+"-1"
}

page = "";
if (page.length == 0) page = "AreasIServe.asp";

window.open(page,"NewWindow",options);
}
function _ImageButton5_onClick() { if (ImageButton5) return ImageButton5.onClick(); }


function ImageButton6_onClick() {
var addChar = "?" 
var j
var okToSubmit = false;

if ("".length > 1)
{
    Form1.setAction(subAwithBinC(" ", "%20", ""));
}

// execute the onSubmit() event handler and try to 
// determine if it already validated the form
Result = Form1.onSubmit();

//   If there is no onSubmithander the return value is null
//   If there is a validation handler it returns true to submit
//   or false to not submit
if (Result==null)  // there is no validation already defined
{
    if ("0" == "1")
    {
        Result = Validate("0"); // don't stop on first error
        if (Result == "") okToSubmit = true;
        else alert("The form could not be submitted:" + Result);
    }
    else okToSubmit = true;
}
else // there is a validation already defined
{
    if (Result==true)
        okToSubmit = true;
}

if (okToSubmit) 
{
    // We have to
    // put the source in the query string so the generic database contracts
    // still work.

    // NOTE: this only works if the method of the form is POST


    act = Form1.getAction();
    if (act.indexOf("?") != -1)
    {    
        addChar = "&"
    }

    act += addChar + "ImageButton6=1"
    Form1.setAction(act);


    Form1.submit();
}
 }
function _ImageButton6_onClick() { if (ImageButton6) return ImageButton6.onClick(); }



function ImageButton7_onClick() {
	
var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("1"=="1")?"no":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"yes":"no")
options+=",resizable="+(("1"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("500") > 0) options+=",height="+"500"

if (parseInt("50") >= 0)
{
	options+=",top="+"50"
	options+=",screenY="+"50"
}
if (parseInt("150") >= 0)
{
	options+=",left="+"150"
	options+=",screenX="+"150"
}

window.open(Page2,"NewWindow",options);
}

function _ImageButton7_onClick() { if (ImageButton7) return ImageButton7.onClick(); }



function ImageButton8_onClick() {

var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"no":"no")
options+=",resizable="+(("1"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("500") > 0) options+=",height="+"500"

if (parseInt("50") >= 0)
{
	options+=",top="+"50"
	options+=",screenY="+"50"
}
if (parseInt("150") >= 0)
{
	options+=",left="+"150"
	options+=",screenX="+"150"
}


window.open(Page1,"NewWindow",options);
}

function _ImageButton8_onClick() { if (ImageButton8) return ImageButton8.onClick(); }

function ImageButton9_onClick() {
	
var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"yes":"no")
options+=",resizable="+(("1"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("500") > 0) options+=",height="+"500"

if (parseInt("50") >= 0)
{
	options+=",top="+"50"
	options+=",screenY="+"50"
}
if (parseInt("150") >= 0)
{
	options+=",left="+"150"
	options+=",screenX="+"150"
}

window.open(Page4,"NewWindow",options);


}

function _ImageButton9_onClick() { if (ImageButton9) return ImageButton9.onClick(); }


function ImageButton10_onClick() {
	
var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"yes":"no")
options+=",resizable="+(("1"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("500") > 0) options+=",height="+"500"

if (parseInt("50") >= 0)
{
	options+=",top="+"50"
	options+=",screenY="+"50"
}
if (parseInt("150") >= 0)
{
	options+=",left="+"150"
	options+=",screenX="+"150"
}

window.open(Page5,"NewWindow",options);


}

function _ImageButton10_onClick() { if (ImageButton10) return ImageButton10.onClick(); }


function ImageButton11_onClick() {

var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"yes":"no")
options+=",resizable="+(("1"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("500") > 0) options+=",height="+"500"

if (parseInt("50") >= 0)
{
	options+=",top="+"50"
	options+=",screenY="+"50"
}
if (parseInt("150") >= 0)
{
	options+=",left="+"150"
	options+=",screenX="+"150"
}

window.open(Page3,"NewWindow",options);


}

function _ImageButton11_onClick() { if (ImageButton11) return ImageButton11.onClick(); }



function ImageButton16_onClick() {
	
var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"yes":"no")
options+=",resizable="+(("1"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("500") > 0) options+=",height="+"500"

if (parseInt("50") >= 0)
{
	options+=",top="+"50"
	options+=",screenY="+"50"
}
if (parseInt("150") >= 0)
{
	options+=",left="+"150"
	options+=",screenX="+"150"
}

page = "";
if (page.length == 0) page = "TodaysRates.asp";

window.open(page,"NewWindow",options);


 }
function _ImageButton16_onClick() { if (ImageButton16) return ImageButton16.onClick(); }

function ImageButton17_onClick() {
var addChar = "?" 
var j
var okToSubmit = false;

if ("".length > 1)
{
    Form1.setAction(subAwithBinC(" ", "%20", ""));
}

// execute the onSubmit() event handler and try to 
// determine if it already validated the form
Result = Form1.onSubmit();

//   If there is no onSubmithander the return value is null
//   If there is a validation handler it returns true to submit
//   or false to not submit
if (Result==null)  // there is no validation already defined
{
    if ("0" == "1")
    {
        Result = Validate("0"); // don't stop on first error
        if (Result == "") okToSubmit = true;
        else alert("The form could not be submitted:" + Result);
    }
    else okToSubmit = true;
}
else // there is a validation already defined
{
    if (Result==true)
        okToSubmit = true;
}

if (okToSubmit) 
{
    // We have to
    // put the source in the query string so the generic database contracts
    // still work.

    // NOTE: this only works if the method of the form is POST


    act = Form1.getAction();
    if (act.indexOf("?") != -1)
    {    
        addChar = "&"
    }

    act += addChar + "ImageButton17=1"
    Form1.setAction(act);


    Form1.submit();
}
 }
function _ImageButton17_onClick() { if (ImageButton17) return ImageButton17.onClick(); }






function ImageButton50_onClick() {
var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"yes":"yes")
options+=",resizable="+(("1"=="1")?"yes":"yes")

if (parseInt("500")  > 0) options+=",width="+"600"
if (parseInt("400") > 0) options+=",height="+"450"

if (parseInt("-1") >= 0)
{
	options+=",top="+"-1"
	options+=",screenY="+"-1"
}
if (parseInt("-1") >= 0)
{
	options+=",left="+"-1"
	options+=",screenX="+"-1"
}

page = "";
if (page.length == 0) page = "Privacy.html";

window.open(page,"NewWindow",options);
 }
function _ImageButton50_onClick() { if (ImageButton50) return ImageButton50.onClick(); }


function ImageButton51_onClick() {
var options="";
options+="status="+(("0"=="1")?"yes":"no")
options+=",directories="+(("0"=="1")?"yes":"no")
options+=",location="+(("0"=="1")?"yes":"no")
options+=",toolbar="+(("0"=="1")?"yes":"no")
options+=",menubar="+(("0"=="1")?"yes":"no")
options+=",scrollbars="+(("1"=="1")?"yes":"no")
options+=",resizable="+(("1"=="1")?"yes":"no")

if (parseInt("500")  > 0) options+=",width="+"500"
if (parseInt("400") > 0) options+=",height="+"400"

if (parseInt("-1") >= 0)
{
	options+=",top="+"-1"
	options+=",screenY="+"-1"
}
if (parseInt("-1") >= 0)
{
	options+=",left="+"-1"
	options+=",screenX="+"-1"
}

page = "";
if (page.length == 0) page = "Suggestions.asp";

window.open(page,"NewWindow",options);
 }
function _ImageButton51_onClick() { if (ImageButton51) return ImageButton51.onClick(); }

function link20_onClick() {

var addChar = "?" 
var j
var okToSubmit = false;

if ("".length > 1)
{
    Form1.setAction(subAwithBinC(" ", "%20", ""));
}

// execute the onSubmit() event handler and try to 
// determine if it already validated the form
Result = Form1.onSubmit();

//   If there is no onSubmithander the return value is null
//   If there is a validation handler it returns true to submit
//   or false to not submit
if (Result==null)  // there is no validation already defined
{
    if ("0" == "1")
    {
        Result = Validate("0"); // don't stop on first error
        if (Result == "") okToSubmit = true;
        else alert("The form could not be submitted:" + Result);
    }
    else okToSubmit = true;
}
else // there is a validation already defined
{
    if (Result==true)
        okToSubmit = true;
}

if (okToSubmit) 
{
    // We have to
    // put the source in the query string so the generic database contracts
    // still work.

    // NOTE: this only works if the method of the form is POST


    act = Form1.getAction();
    if (act.indexOf("?") != -1)
    {    
        addChar = "&"
    }

    act += addChar + "link20=1"
    Form1.setAction(act);


    Form1.submit();
}
}
function _link20_onClick() { if (link20) return link20.onClick(); }

function ImageButton12_onClick() {
var addChar = "?" 
var j
var okToSubmit = false;

if ("".length > 1)
{
    Form1.setAction(subAwithBinC(" ", "%20", ""));
}

// execute the onSubmit() event handler and try to 
// determine if it already validated the form
Result = Form1.onSubmit();

//   If there is no onSubmithander the return value is null
//   If there is a validation handler it returns true to submit
//   or false to not submit
if (Result==null)  // there is no validation already defined
{
    if ("0" == "1")
    {
        Result = Validate("0"); // don't stop on first error
        if (Result == "") okToSubmit = true;
        else alert("The form could not be submitted:" + Result);
    }
    else okToSubmit = true;
}
else // there is a validation already defined
{
    if (Result==true)
        okToSubmit = true;
}

if (okToSubmit) 
{
    // We have to
    // put the source in the query string so the generic database contracts
    // still work.

    // NOTE: this only works if the method of the form is POST


    act = Form1.getAction();
    if (act.indexOf("?") != -1)
    {    
        addChar = "&"
    }

    act += addChar + "ImageButton12=1"
    Form1.setAction(act);


    Form1.submit();
}
 }
function _ImageButton12_onClick() { if (ImageButton12) return ImageButton12.onClick(); }

function WhatCanIAfford() {
	affordWind = window.open('AgentOwnVsRent.asp', 'ownWind', 'width=460,height=400,resizable=yes')
}

function HowMuch() {
	HowMuchWind = window.open('AgentHowMuch.asp', 'HowMuchWnd', 'width=460,height=500,resizable=yes')
	}