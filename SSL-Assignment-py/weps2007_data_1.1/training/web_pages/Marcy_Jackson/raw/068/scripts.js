
       
       
       
 
// function to popup a window. Required argument "url" for the contents of the window,
// width, height, windowName, and scrollB (whether to show scrollbars) have default values
// of 439, 325, "Popup" and yes (scrolling) respectively.

function popWindow(url, width, height, windowName, scrollb,windowbars)
  {
    // default width and height for window
    if (!width) { width  = 439; }
    if (!height) { height = 325; }
    if (!scrollb) {scrollb = "yes"}
      // positioning of pop-up window
      { leftpos=0
        if (screen)
           {
            leftpos = screen.width-(width+230)
           }
      // default window name if not passed to function
      if (!windowName) { windowName = "thispopup"; }
      if (!windowbars)
        {
          wref = window.open (url, windowName,"toolbar=no,width=" + width + ",height=" + height + ",directories=no,status=no,scrollbars=" +scrollb + ",resizable=yes,menubar=no,top=50,left="+leftpos);
        }
      else
        {
          wref = window.open (url, windowName,"toolbar=yes,width=" + width + ",height=" + height + ",directories=no,status=no,scrollbars=" +scrollb + ",resizable=yes,menubar=no,top=50,left="+leftpos);
        }
      
      wref.focus();
      }
    } 
    
  function autoPrint()
    {
    if (self.print)
      {
        self.print()
      }
    else alert ("Sorry, your browser doesn't support this function.\nPlease use the Print command in the browser\'s File menu")
    }
  
  function modeaction(obj,val)
      {  
         var formobj=obj.form;
         formobj.mode.value=val;
         //var goodtogo=validatesubmit(formobj)
         formobj.submit();
      }  
       
  
 function changeaction(selectelem)
   {
      thisidx=selectelem.selectedIndex
      thisval = selectelem.options[thisidx].value      
      
      if (thisval.substr(0,11)=="javascript:")
        {
         thisval2=thisval.substr(11)
         //alert(thisval2)
         eval(thisval2);
         ;return
        }
      if (thisval=="") {alert('Please make a choice')}
      else {window.location=thisval};
   } 
   
 
       
     
   
  
 
  
  
    // function to loop through a form and clear its elements, regardless of initial settings.
    // takes two arguments, formname (required), which is the name of the form to be cleared, 
    // and exceptionList (optional), which is a comma delimited list of form fields to skip.
    // Skips button, reset, submit and hidden field elements.
    // Assumes all fields are named, and treats sets of radio buttons as a group as far as exceptions are concerned
    // Ted O'Hara  2/17/02
	  
	  function clearAll(formname,exceptionList) 
	    {
	     var thisForm = document.forms[formname] //get the form element
	     //create an array of exceptions--fields NOT to be be reset
	     if (exceptionList)
	        {
	         var exceptionArray=exceptionList.split( ",")
	        }
	      else exceptionArray= new Array()
	     //set up loop to loop through all form elements
	     for(i=0;i<thisForm.length;i++)  
	         {
	          thisElem=thisForm.elements[i] //put current element in variable
	          //begin checking to see if this element is on the exception list
	          var thisExcepted = false;
	          if (exceptionArray.length != 0) //if we have a list of exceptions 
	             {
	              for (x=0; x<exceptionArray.length; x++) //loop through the list of exceptions
	                 {
	                  if (thisElem.name==exceptionArray[x])  //if the name matches an exception
	                      {
	                       thisExcepted= true;
	                       break
	                      }	                      
	                 }
	             }
	             
								//do the actual clearing, if this element has not been excepted
								if (!thisExcepted)  
									{ 									  
										switch (thisElem.type)  //depending on type, do various things
												{
												 case "text"            : thisElem.value = ""; break;
												 case "password"        : thisElem.value = ""; break;
												 case "file"            : thisElem.value = ""; break;
												 case "textarea"        : thisElem.value = ""; break;
												 case "checkbox"        : thisElem.checked = false; break;
												 case "radio"           : thisElem.checked = false; break;
												 case "select-one"      : thisElem.selectedIndex=0; break;
												 case "select-multiple" : 
															for (j=0; j<thisElem.options.length;j++)
																{
																 thisElem.options[j].selected=false
																}												 
												}  //end switch										
									 }//end if
	          }//end for
	    } //end function
       
       
 function relocate(url)
   {
   	window.location=url;
   } 
         
         
   function validateForm(formobj)
      { 
        var errormsg="Sorry, the following fields are required\nand must be completed before the form \ncan be submitted.\n"
        var badfields=""
        
        if ((formobj.required)&&(formobj.required.value!=""))
         //if the required field is present
         {
            var requiredArray=formobj.required.value.split(",")
            for (i=0;i<requiredArray.length;i++)
               {
                if ((formobj[requiredArray[i]].type !="select-one") && (formobj[requiredArray[i]].type !="select-multiple") && (formobj[requiredArray[i]].length))
                  {
                   //if a checkbox or radio button set are required, loop through the array for this element, mark them all required.
                   for(j=0;j<formobj[requiredArray[i]].length;j++)
                     {
                       formobj[requiredArray[i]][j].required=true
                     }                   
                   }
                else
                  {
                     formobj[requiredArray[i]].required=true //mark the fields as required
                  }                
               }
         }
       else //if no required fields designated, mark all as being required.
         {
          for (i=0;i<formobj.length;i++)
             {
               formobj.elements[i].required=true //mark all form elements as being required
             }
         }
         
        for (i=0;i<formobj.length;i++)
           { 
             var thisElem=formobj.elements[i]
             if (thisElem.required)
               {
                   if ((thisElem.type=="text")&&(thisElem.value==""))
                      {
                        badfields=badfields +'\n'+ thisElem.name.replace(/_/g," ")
                      }
                   else if ((thisElem.type=="select-one")&&(thisElem.selectedIndex==0))
                      {
                        badfields=badfields + '\n'+ thisElem.name.replace(/_/g," ")
                      }
                   else if ((thisElem.type=="textarea")&&(thisElem.value==''))
                      {
                        badfields=badfields+ '\n'+ thisElem.name.replace(/_/g," ")
                      }
                   else if ((thisElem.type=="radio")||(thisElem.type=="checkbox"))
                     {
                       var notchecked=true
                       var radioName=thisElem.name
                       var radioArray=formobj.elements[radioName]
                       for (j=0;j<radioArray.length;j++,i++)
                         {
                          if (radioArray[j].checked)
                             {
                              notchecked=false
                             }
                         }
                       if (notchecked)
                         {
                         badfields=badfields+ '\n'+ thisElem.name.replace(/_/g," ")
                         }
                       i--
                     }
                 } // end if required
           }//end for        
          
        
        if (badfields !="") //invalid elements found, alert and stop submission
           {
            alert(errormsg + badfields); return false
            }
        else 
        
        {
         //formobj.returnpage.value="http://"+window.location.hostname + "/contact/thankyou.html";
         return true
        
        }
       //else alert('no errors found');return false //this line for testing purposes--alerts there are no errors without submitting form
      }//end function
      
      function arrayFind(arrayobj,value)
        {         
         for(var i=0;i<arrayobj.length;i++)
           {
            if(arrayobj[i]==value) return i              
           }
         return -1
        }
        
    function toggleCBfield(formobj,fieldname)
    {
      cbset = formobj.elements[fieldname];
      if (cbset.length)
        {
          for (var i=0; i<cbset.length;i++)
            {
              cbset[i].checked = !cbset[i].checked
            }
        }
      }
       
