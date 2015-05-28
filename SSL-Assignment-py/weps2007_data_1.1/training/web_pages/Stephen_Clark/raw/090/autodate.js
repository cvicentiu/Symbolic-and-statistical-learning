function initArray() 
{
  this.length = initArray.arguments.length
  for (var i = 0; i < this.length; i++)
  this[i+1] = initArray.arguments[i]
}

var MOYArray = new initArray("January","February","March","April","May","June","July","August","September","October","November","December");
var LastModDate = new Date(document.lastModified);

var NewYear = LastModDate.getYear();
if ( NewYear < 2000 )
   {
    if ( NewYear < 1900 ) 
       {
        if ( NewYear < 100 ) NewYear = NewYear + 2000;
        else NewYear = NewYear + 1900;
       }
    else NewYear = NewYear + 100;
   }

document.write("This page was last updated on: ");
document.write(MOYArray[(LastModDate.getMonth()+1)]," ");
document.write(LastModDate.getDate(),", ");
document.write((NewYear)," ");