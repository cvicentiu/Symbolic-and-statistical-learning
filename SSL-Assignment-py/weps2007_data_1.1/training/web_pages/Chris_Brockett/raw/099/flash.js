function flashdisplay(w,h, filename) { 
document.write("<object data=\"" + filename + "\" type=\"application/x-shockwave-flash\" width=\""+w+"\" height=\""+h+"\">");
document.write("<param name=\"movie\" value=\""+filename+"\" />");
document.write("<param name=\"wmode\" value=\"transparent\" />  ");
//document.write("<embed src=\"" + filename + "\" width=\"" + w + "\" height=\"" + h + "\" />");
document.write("<img src=\"/tools/images/spacer.gif\" width=\""+w+"\" height=\""+h+"\" alt=\"\" />");
document.write("</object>");
}