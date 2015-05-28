// formStyle.js, produced by Philip Howard, GamingHeadlines.co.uk
// This JavaScript is open source and freely available to all those who wish to use it.
// A link back to GamingHeadlines.co.uk would be appreciated!

	function toggleCheckbox(cbId,cbKey,ffId)
	{
	if (cbKey&&cbKey==0||!cbKey){
	var cbFF = document.getElementById(ffId);
	
		var cbFFValue = cbFF.checked;
		
		if(cbId.className.indexOf("CheckboxChecked")<0)
			{
				var checkBoxType = cbId.className.replace("Checkbox","");
				cbFF.checked=true;cbId.className="CheckboxChecked"+checkBoxType;}
			else
			{
				var checkBoxType = cbId.className.replace("CheckboxChecked","");
				cbFF.checked=false;cbId.className="Checkbox"+checkBoxType;}
		}
	}
	
	function InitializeCheckboxes()
	{
		var inputFields = document.getElementsByTagName("span");
		var checkboxIndex = 0;
		
		for (var inputIndex=0;inputIndex<inputFields.length;inputIndex++)
			{
				if (inputFields[inputIndex].className=="cbStyled")
					{
						var styleType = "";
						if (inputFields[inputIndex].getAttribute("name")!=null){styleType=inputFields[inputIndex].getAttribute("name");}
						
						var inputCurrent = inputFields[inputIndex].getElementsByTagName("input").item(0);
						if(inputCurrent.getAttribute("type")=="checkbox")
						{
							//inputCurrent.setAttribute("class","InputHidden");
							inputCurrent.className = "InputHidden";
							inputCurrent.setAttribute("id","StyledCheckbox"+checkboxIndex);
							
							if(navigator.appName.indexOf("Internet Explorer")>0)
							{
								//Internet Explorer
								var inputHTML = inputFields[inputIndex].innerHTML;
								var styledHTML = "<a href=\"#\""
								
								//styledHTML+=" name=\""+inputCurrent.getAttribute("name")+"\""
								
								if(inputCurrent.hasAttribute){if(inputCurrent.hasAttribute("title")){styledHTML+=" title=\""+inputCurrent.getAttribute("title")+"\"";}}
								
								if (inputCurrent.checked)
									{styledHTML+=" class=\"CheckboxChecked"+styleType+"\""}
									else
									{styledHTML+=" class=\"Checkbox"+styleType+"\""}
									
								styledHTML+=" onClick=\"toggleCheckbox(this,'','StyledCheckbox"+checkboxIndex+"');return false;\""
								styledHTML+=" onKeyPress=\"toggleCheckbox(this,event.keyCode,'StyledCheckbox"+checkboxIndex+"');return false;\""
								
								styledHTML+="></a>"
								
								inputFields[inputIndex].innerHTML = inputHTML+styledHTML;
							}
							else
							{
								var styledCheckbox = document.createElement("a"); 
								styledCheckbox.setAttribute("href","#");
								
								if(inputCurrent.hasAttribute){if(inputCurrent.hasAttribute("title")){styledCheckbox.setAttribute("title",inputCurrent.getAttribute("title"));}}
								
								styledCheckbox.setAttribute("onClick","toggleCheckbox(this,'','StyledCheckbox"+checkboxIndex+"');return false;");
								styledCheckbox.setAttribute("onKeyPress","toggleCheckbox(this,event.keyCode,'StyledCheckbox"+checkboxIndex+"');");
								
								if (inputCurrent.checked)
									{styledCheckbox.className="CheckboxChecked"+styleType;}//styledCheckbox.setAttribute("class","CheckboxChecked");}
									else
									{styledCheckbox.className="Checkbox"+styleType;}//styledCheckbox.setAttribute("class","Checkbox");}
									
								inputFields[inputIndex].appendChild(styledCheckbox);
							}
							
							checkboxIndex++;
						}
					}
			}	
	}
	
	function toggleRadiobox(rbObj,rbKey,rbGroup,rbId)
	{
	if (rbKey&&rbKey==0||!rbKey){
	var inputFields = document.getElementsByTagName("a");
		for (var inputIndex=0;inputIndex<inputFields.length;inputIndex++)
			{
				if (inputFields[inputIndex].getAttribute("name")==rbGroup){
					
					if(inputFields[inputIndex].className.indexOf("RadioboxChecked")<0)
									{var RadioBoxType = inputFields[inputIndex].className.replace("Radiobox","");}
									else
									{var RadioBoxType = inputFields[inputIndex].className.replace("RadioboxChecked","");}
									
					inputFields[inputIndex].className="Radiobox"+RadioBoxType;
					}
			}
	var inputFields = document.getElementsByTagName("input");
		for (var inputIndex=0;inputIndex<inputFields.length;inputIndex++)
			{
				if (inputFields[inputIndex].getAttribute("name")==rbGroup)
					{
						if (inputFields[inputIndex].getAttribute("id")==rbId)
							{
								if(rbObj.className.indexOf("RadioboxChecked")<0)
									{var RadioBoxType = rbObj.className.replace("Radiobox","");}
									else
									{var RadioBoxType = rbObj.className.replace("RadioboxChecked","");}

								inputFields[inputIndex].checked = true;rbObj.className="RadioboxChecked"+RadioBoxType;}
							else
							{inputFields[inputIndex].checked = false;}
					}
			}
	}
	}
	
	function InitializeRadioboxes()
	{
		var inputFields = document.getElementsByTagName("span");
		var radioboxIndex = 0;
		
		for (var inputIndex=0;inputIndex<inputFields.length;inputIndex++)
			{
				if (inputFields[inputIndex].className=="rbStyled")
					{
						var styleType = "";
						if (inputFields[inputIndex].getAttribute("name")!=null){styleType=inputFields[inputIndex].getAttribute("name");}
						
						var inputCurrent = inputFields[inputIndex].getElementsByTagName("input").item(0);
						if(inputCurrent.getAttribute("type")=="radio")
						{
							//inputCurrent.setAttribute("class","InputHidden");
							inputCurrent.className = "InputHidden";
							inputCurrent.setAttribute("id","StyledRadiobox"+radioboxIndex);
							
							if(navigator.appName.indexOf("Internet Explorer")>0)
							{
								//Internet Explorer
								var inputHTML = inputFields[inputIndex].innerHTML;
								var styledHTML = "<a href=\"#\""
								
								styledHTML+=" name=\""+inputCurrent.getAttribute("name")+"\""
								
								if(inputCurrent.hasAttribute){if(inputCurrent.hasAttribute("title")){styledHTML+=" title=\""+inputCurrent.getAttribute("title")+"\"";}}
								
								if (inputCurrent.checked)
									{styledHTML+=" class=\"RadioboxChecked"+styleType+"\""}
									else
									{styledHTML+=" class=\"Radiobox"+styleType+"\""}
									
								styledHTML+=" onClick=\"toggleRadiobox(this,'','"+inputCurrent.getAttribute("name")+"','StyledRadiobox"+radioboxIndex+"');return false;\""
								styledHTML+=" onKeyPress=\"toggleRadiobox(this,event.keyCode,'"+inputCurrent.getAttribute("name")+"','StyledRadiobox"+radioboxIndex+"');return false;\""
								
								styledHTML+="></a>"
								
								inputFields[inputIndex].innerHTML = inputHTML+styledHTML;
							}
							else
							{
								//Firefox, Opera, Netscape
								var styledRadiobox = document.createElement("a"); 
								styledRadiobox.setAttribute("href","#");
								styledRadiobox.setAttribute("name",inputCurrent.getAttribute("name"));
								
								if(inputCurrent.hasAttribute){if(inputCurrent.hasAttribute("title")){styledRadiobox.setAttribute("title",inputCurrent.getAttribute("title"));}}
								
								styledRadiobox.setAttribute("onClick","toggleRadiobox(this,'','"+inputCurrent.getAttribute("name")+"','StyledRadiobox"+radioboxIndex+"');return false;");
								styledRadiobox.setAttribute("onKeyPress","toggleRadiobox(this,event.keyCode,'"+inputCurrent.getAttribute("name")+"','StyledRadiobox"+radioboxIndex+"');");
								
								if (inputCurrent.checked)
									{styledRadiobox.className="RadioboxChecked"+styleType;}//styledRadiobox.setAttribute("class","RadioboxChecked");}
									else
									{styledRadiobox.className="Radiobox"+styleType;}//styledRadiobox.setAttribute("class","Radiobox");}
								
								inputFields[inputIndex].appendChild(styledRadiobox);
							}
							
							radioboxIndex++;
						}
					}
			}	
	}
	
	function Initialize()
		{
			//alert('main initialized');
			InitializeCheckboxes();InitializeRadioboxes();
		}
		
	//Initialize();
	window.onload = function() {Initialize()};