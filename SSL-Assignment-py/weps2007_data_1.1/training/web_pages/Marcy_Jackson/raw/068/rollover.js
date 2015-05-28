               /* file: rollover.js                                 */
               /* author:ted o'hara                                 */
               /* module: Generic                                   */
               /* purpose: shared subpage rollover script           */                       
               /* Created: 09/26/2003                               */
               /* Copyright (C) 2003 bxTechnologies, Inc.           */
               
 //srcpath and imgnames to be set on-page

if (document.images)
      {
       //preload rollovers
       var linkElemName =""
       var thisLk
       
       for(var i=0;i<imgnames.length;i++)
         {
          var thisname=imgnames[i]
         
          
          //add event handlers
         
          if ((document.getElementById) && (thisname!="enter") && (thisname != notthisid))
            {
              linkElemName = "lk_" + thisname
              thisLk = document.getElementById(linkElemName)
              if (thisLk != null)
                {
                  thisLk.onmouseover=imgOn
                  thisLk.onmouseout=imgOff
                }              
            }
         }
       } 
       
       
      

       
       function imgOn ()
       {
         var imgName = this.id.substr(3)
         
         if (document.images)
         {
          document [imgName].src = eval (imgName + "on.src");
         }
       }
       
       // image off function
       function imgOff()
       {
         var imgName = this.id.substr(3)         
         if (document.images)
         {
           document [imgName].src = eval (imgName + "off.src");
         }
       }
       
       
        
        function dotOn (imgName) //dot on
        {
         if (document.images)
         {
           document[imgName].src = dot.src;
         }
        }
        
        function dotOff(imgName) // dot off
        {
         if (document.images)
         {
           document[imgName].src = spacer.src ;
         }
        }