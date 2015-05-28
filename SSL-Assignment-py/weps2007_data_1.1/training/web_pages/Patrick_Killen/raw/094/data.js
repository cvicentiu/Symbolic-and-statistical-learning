    <!--
   function GoThere(yourname)
        {
        whoyou = yourname.value;
        whoyou = Replace(whoyou, "'", "");      //clip out single quotes
        whoyou = Replace(whoyou, ":", "_");     // replace colon,
        whoyou = Replace(whoyou, "/", "_");     // and slash
        whoyou = Replace(whoyou, " ", "_");     // and spaces.

        window.location.href="http://www.genealogybuff.com/data.htm" + "#" + whoyou;
        }

 function Replace ( target, todo, withwhat)
  { var fixme = target;                 // load string to alter (into fixme)
    var atpos = fixme.indexOf(todo);    // find position of string to replace
    while ( atpos > -1)                 // while still to replace..
      { fixme = fixme.substring(0,atpos) 
                + withwhat
                + fixme.substring(todo.length + atpos); //replace
        atpos = fixme.indexOf(todo);     // find next position (if exists)
      };                                // .. end while
    return fixme;                       // return altered string
  }


   //-->