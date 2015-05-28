function getElementReference(elementId)
{
  var value=false;
	

  if(document.layers)
	{
    value=document.layers[elementId];
		

}
  else
  {
    if(document.all)
		{
      value=document.all[elementId];
			
			
		}	
    else
      if(document.getElementById)
			{
        value=document.getElementById(elementId);
					
		}	
  }

  return value;
}

function getStyleReference(elementId)
{

  var value=false;

  if(getElementReference(elementId))
  {
    value=getElementReference(elementId);
		
    if(!document.layers)
      value=value.style;
  }
	

  return value;
}

    