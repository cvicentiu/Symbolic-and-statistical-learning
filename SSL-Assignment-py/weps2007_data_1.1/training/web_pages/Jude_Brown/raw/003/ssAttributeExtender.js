var maryCurrentAttributePrice = new Array();
var maryAttributePrice = new Array();
var prodBasePrice = 0;
var cstrBaseImagePath = "";
	
function updateProductPrice(theSelect, attrNum)
{
	var theForm = theSelect.form;
	var attrIndex = theSelect.selectedIndex + 1;
	var dblPrice;
	
	letCurrentAttributePrice(attrNum, attrIndex);
	dblPrice = getProductPrice(attrNum, attrIndex);
	theForm.prodPrice.value = dblPrice;
	//alert(dblPrice);
}

function setProductPrice(theSelect, attrNum)
{
	var theForm = theSelect.form;
	var attrIndex = theSelect.selectedIndex + 1;
	var dblPrice;
	
	letCurrentAttributePrice(attrNum, attrIndex);
	dblPrice = getProductPrice(attrNum, attrIndex);
	theForm.prodPrice.value = dblPrice;
	//alert(dblPrice);
}

function setCurrentAttributePrice(attrNum, attrPrice)
{
	maryCurrentAttributePrice[attrNum] = attrPrice;
}

function setAttributePrice(attrNum, attrIndex, attrPrice)
{
	if (attrIndex == 1){ maryAttributePrice[attrNum] = new Array(); }
	maryAttributePrice[attrNum][attrIndex] = attrPrice;
}

function letCurrentAttributePrice(attrNum, attrIndex)
{
	maryCurrentAttributePrice[attrNum] = maryAttributePrice[attrNum][attrIndex];
}

function getProductPrice()
{
var pdblPrice;

	pdblPrice = prodBasePrice;
	for (var i = 1; i < maryCurrentAttributePrice.length; i++)
	{
		pdblPrice = pdblPrice + maryCurrentAttributePrice[i];
	}
	pdblPrice = formatDollar(pdblPrice,"");

	return pdblPrice;
}

function formatDollar (Val, DollarSign)
{	

	Val= "" + Val;

	if (Val.indexOf (".", 0)!=-1)
	{
		Dollars = Val.substring(0, Val.indexOf (".", 0));
    	Cents = Val.substring(Val.indexOf (".", 0)+1, Val.indexOf (".", 0)+3);
    	if (Cents.length==0) 			Cents="00";
    	if (Cents.length==1)			Cents=Cents+"0";
	}else{
    	Dollars = Val;
    	Cents = "00";
	}
	
    if (DollarSign)
    {
    	OutString = ("$"+Dollars+"."+Cents);
    }else{
    	OutString = (Dollars+"."+Cents);
    }

	len=Dollars.length;
	if (len>=3)
	{
		OutString="";
		while (len>0)
		{
			TempString=Dollars.substring(len-3, len)
    		if (TempString.length==3)
    		{
    			OutString = "," + TempString + OutString;
    			len=len-3;
    		}else{
    			OutString=TempString+OutString;
    			len=0;
    		}
   		}
		
    	if (OutString.substring(0, 1)==",")
    	{ 
    		Dollars=OutString.substring (1, OutString.length);
    	}else{
    		Dollars=OutString
    	}
		
    	if (DollarSign)
    	{
    		OutString = ("$"+Dollars+"."+Cents);
    	}else{
    		OutString = (Dollars+"."+Cents);
    	}
    }
    
    return OutString;
}

var theCustomImage = new Array();	//this is set by the image
var maryAttrImages = new Array();
var maryCustomImages = new Array();

function setCustomImage(theImage, strProdID){theCustomImage[strProdID] = theImage;}

function changeCustomImage(strProdID, theSelect){theCustomImage[strProdID].src = maryAttrImages[strProdID][theSelect[theSelect.selectedIndex].value];}

function letCustomImageEntry(lngIndex, strImage){maryAttrImages[lngIndex] = strImage;}

function letCustomImage(lngIndex, strImage)
{
	letCustomImageEntry(lngIndex, strImage);
	theCustomImage.src = getCustomImagePath();
}

function getCustomImagePath()
{
var pstrBaseImagePath;

	for (var i = 0; i < maryAttrImages.length; i++)
	{
		if (maryAttrImages[i] != undefined)
		{
			if (maryAttrImages[i].length > 0)
			{
				pstrBaseImagePath = "_" + maryAttrImages[i];
			}
		}
	}
	
	if (pstrBaseImagePath != ""){ pstrBaseImagePath = cstrBaseImagePath + pstrBaseImagePath + ".jpg"; }
	//alert(pstrBaseImagePath);
	return pstrBaseImagePath;
}

function setAttributeOptional(theFormName, theFieldName, optional)
{
	var e = document.getElementById(theFieldName);
	e.optional = optional;
	//alert(e.name + ": " + e.optional);
}

function setAttributeTitle(theFormName, theFieldName, theTitle)
{
	//var e = eval(theFormName + '.' + theFieldName);
	var e = document.getElementById(theFieldName);
	e.title = theTitle;
	//alert(e.title);
}
