if (document.images)
      {
       //preload rollovers
       var linkElemName =""
       var thisLk
       
       for(var i=0;i<imgnames.length;i++)
         {
          var thisname=imgnames[i]
          var thisnameon=thisname + 'on'
          eval(""+thisnameon+" = new Image()");
          
          eval(thisnameon+".src =\"" +srcpath + thisname + "_over.gif\"");
          var thisnameoff=thisname + 'off'
          eval(""+thisnameoff+" = new Image()");
          eval(thisnameoff+".src =\"" +srcpath + thisname + ".gif\"");          
         }
       } 