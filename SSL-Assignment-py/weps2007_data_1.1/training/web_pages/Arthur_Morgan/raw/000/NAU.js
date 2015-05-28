/*This function builds the link to the book lists on Amazon. The Harvard Square Library profit sharing code is embedded in the TheLinkStart variable. 
Please do not edit this function! */

			var TheLinkStart="http://www.amazon.com/gp/redirect.html?link_code=ur2&tag=harvardsquare-20&camp=1789&creative=9325&location=%2Fs%2Fref%3Dnb_ss_b%3Furl%3Dsearch-alias%253Dstripbooks%26field-keywords%3D"
			var TheLinkEnd="%26Go.x%3D0%26Go.y%3D0%26Go%3DGo"
			
			
			

TheSubject=document.title 
if (TheSubject.indexOf(":")!=0){
	TheSubject=TheSubject.slice(0,TheSubject.indexOf(":")) 
}
document.getElementById('TheAd').innerHTML="<strong><u>Click Here</u></strong> to view Supplemental Reading to "+TheSubject+" on Amazon.";
document.getElementById('TheAmazonLink').href=TheLinkStart+TheSubject.replace(/ /,"%20")+TheLinkEnd;
//document.getElementById('TheAmazonLink').target="new"

function AddHarvardBooksDiv(){
		var y=document.createElement('div')
		y.setAttribute("id","HarvardBooks");	
		//y.innerHTML='<div style=\"clear:both; height=:20px; min-height:20px; margin:2px;\" >findabletext</div>'
		//var y=document.createElement('div')			
		//y.innerHTML='<div class=\'HarvardBooks\'><a href=\'http://harvardsquarelibrary.org/HarvardPressBooks/politics.php\' class=\'BookLink\' title=\'A celebration of books published by the Harvard University Press\'><img src=\'http://harvardsquarelibrary.org/HarvardPressBooks/images/poli_ad.gif\' width=200 height=60 border=0 alt=\'Click here to view the Harvard Square Library selection of Politics and Law books from Harvard University Press\'></a></div>'
		//document.getElementById('AdContainer').insertBefore(y,document.getElementById('AdContainer').firstChild);

}
AddHarvardBooksDiv()