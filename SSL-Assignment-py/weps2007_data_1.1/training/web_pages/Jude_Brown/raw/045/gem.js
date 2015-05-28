

function escramble(nom,add,zone){
 var a,b,c,d,e,f,g,h,i,k
k=zone
 a='<a href=\"mai'
 b=nom
 c='\"  class=\"menuw\">'
 if (add) b+='.' 
 a+='lto:'
 if (add) b+=add
 b+='@'
 e='</a>'
 f=''
 b+=k
 g='<img src=\"'
 h=''
 i='\" alt="Email us." border="0">'

 if (f) d=f
 else if (h) d=g+h+i
 else d=b

 document.write(a+b+c+d+e)
}