var stLoad     = 0;    // used to init the Story Toolbar - in combination with scripts.js
var stRepOpen  = 0;
var fSize      = 1;	   // init sans-serif
var fontSize   = 12;
//var fontFamily = 'verdana,geneva,arial,helvetica,sans-serif';
var fontFamily = 'arial,helvetica,sans-serif';
var ieX = '';
var ie4 = '';
var ns6 = '';
var stY        = 15;
var stX        = -50;  // init Story Toolbar X position (offstage)

var yElm       = (ieX || ns6) ? document.getElementById('stY') : document.getElementById('stY');

if (yElm)
{
	var lyrRef = yElm;
	while (lyrRef.offsetParent != null) 
	{
		stY += lyrRef.offsetTop;
		lyrRef = lyrRef.offsetParent;
	}
	stY += lyrRef.offsetTop;
}
else stY = 325;

if (agt.indexOf('mac') != -1) stY += 15;
if (ie4 || ns6) stY += 5;

var screenWidth = (ieX || ie4) ? document.body.clientWidth : self.innerWidth;

stX = (screenWidth / 2) - 384;
if (ns6) stX -= 7;

if (ieX || ns6) document.getElementById('st').style.top  = stY;
if (ieX || ns6) document.getElementById('st').style.left = stX;

if (ie4) document.all('st').style.pixelTop  = stY;
if (ie4) document.all('st').style.pixelLeft = stX;

function rePos()
{
	screenWidth = (ieX || ie4) ? document.body.clientWidth : self.innerWidth;
	
	stX = (screenWidth / 2) - 384;
	if (ns6) stX -= 7;
	
	var extreme, overflow, temp;
	extreme = stX - 3;
	
	if (screenWidth < 768) 
	{
		temp = extreme;
		temp -= stX;
		stX = temp;
	}
	
	if (ieX || ns6) document.getElementById('st').style.left = stX;
	if (ie4) document.all('st').style.pixelLeft = stX;
};

onresize = function() { rePos(); };

function stDisplay(id)
{
	repObj = (ieX || ns6) ? document.getElementById('stRRFrame') : document.all('stRRFrame');
	if (repObj) 
	{
		repObj.style.display = 'none';
		actDyn = true;
	}
	
	togObj = (ieX || ns6) ? document.getElementById(id) : document.all(id);
	if (togObj)
	{
		if (togObj.style.display == 'block') togObj.style.display = 'none';
		else togObj.style.display = 'block';
	}
};

function stRRToggle(id)
{
	togObj = (ieX || ns6) ? document.getElementById('stInfo') : document.all('stInfo');
	if (togObj) togObj.style.display = 'none';
	
	repObj = (ieX || ns6) ? document.getElementById(id) : document.all(id);
	if (repObj)
	{
		if (repObj.style.display == 'block') 
		{
			stRepOpen = 1;
			repObj.style.display = 'none';
			actDyn = true;
		}
		else 
		{
			if (skin) fizz(); // the fizz() function is located in toolTips.js
			var tmpURL = '/dwb_content_search/v-reporter/index.html?target=' + stRRURL + '&search_fields=8&collection=Current';
			actDyn = false;
			repObj.style.display = 'block';
			if (stRepOpen == 0)
			{
				if (ieX || ns6) document.getElementById('stReporter').src = tmpURL;
				if (ie4) window.top.stReporter.location.href = tmpURL;
			}
		}
	}
};

function stSetObj()
{
	stObj = (document.getElementById) ? document.getElementById('storyBody') : document.all('storyBody');
};
	
function stTTog()
{
	stSetObj();
	if (fontFamily == 'verdana,geneva,arial,helvetica,sans-serif')
	{	
		fontFamily == 'verdana,geneva,arial,helvetica,sans-serif';
		//fontFamily = 'georgia,times,times new roman,serif';
		if (fSize == 1)	// checks for sans-serif then adjusts
		{
			fontSize += 3;	// +3px for the serif font
			stObj.style.fontSize = fontSize + 'px';
			fSize = 0;
		}
	}
	else
	{
		fontFamily = 'verdana,geneva,arial,helvetica,sans-serif';
		if (fSize == 0)	// checks for serif then adjusts
		{
			fontSize -= 3;	// -3px for the serif font
			stObj.style.fontSize = fontSize + 'px';
			fSize = 1;
		}
	}
	stObj.style.fontFamily = fontFamily;
	stSavePrefs();
};

function Bigger()
{
	fontSize += 1;
	if (fSize == 1)
	{
		if (fontSize > 16) fontSize = 16;
	}
	else 
	{
		if (fontSize > 19) fontSize = 19;	// +3px for the serif font
	}
	stSetObj();
	stObj.style.fontSize = fontSize + 'px';
	stSavePrefs();
};
	
function Smaller()
{
	fontSize -= 1;
	if (fSize == 1)
	{
		if (fontSize < 9) fontSize = 9;
	}
	else 
	{
		if (fontSize < 12) fontSize = 12;	// +3px for the serif font
	}
	stSetObj();
	stObj.style.fontSize = fontSize + 'px';
	stSavePrefs();
};

function stSavePrefs()
{
	tCookie = 'stPrefs=';
	tCookie = tCookie + '^fSize=' + fSize + '^fontSize=' + fontSize + '^fontFamily=' + fontFamily;
	var expire = new Date ();
   	expire.setTime (expire.getTime() + (6 * 24 * 3600000));	// expires 6 days from users clock
   	expire = expire.toGMTString();
	fCookie = tCookie + '; path=/; expires=' + expire; 
  	document.cookie = fCookie;
};

function stLoadPrefs()
{
	stPrefString = null;
	tArray = document.cookie.split(';');
	for (tA = 0; tA < tArray.length; tA++)
	{
		if (tArray[tA].indexOf('stPrefs=') > -1)
		{
			tPos = tArray[tA].indexOf('=') + 2;
			stPrefString = tArray[tA].substring(tPos, tArray[tA].length);
			//alert('stPrefString: ' + stPrefString);
		}
	}
	if (stPrefString != null)
	{
		tArray = stPrefString.split('^');
		for (tA = 0; tA < tArray.length; tA++)
		{
			if (tArray[tA].indexOf('fSize') > -1)
			{
				tFSize = tArray[tA].split('=');
				fSize  = parseInt(tFSize[1]);
			}
			if (tArray[tA].indexOf('fontSize') > -1)
			{
				tFontSize = tArray[tA].split('=');
				fontSize  = parseInt(tFontSize[1]);
			}
			if (tArray[tA].indexOf('fontFamily') > -1)
			{
				tFontFamily = tArray[tA].split('=');
				fontFamily  = (tFontFamily[1]);
			}
		}
	}
};

function stSetElm()
{
	stSetObj();
	stObj.style.fontSize = fontSize + 'px';
	stObj.style.fontFamily = fontFamily;
	stSavePrefs();
};

function stInit()	// loaded in a global onload function in script.js
{
	stLoadPrefs();
	stSetElm();
};
