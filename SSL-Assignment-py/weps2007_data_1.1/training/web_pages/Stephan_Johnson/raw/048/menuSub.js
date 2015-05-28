<!--

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

		function P7Snap() 

		{
			//v2.65 by PVII

			var x,y,ox,bx,oy,p,tx,a,b,k,d,da,e,el,tw,q0,xx,yy,w1,pa='px',args=P7Snap.arguments;
			a=parseInt(a);

			if(document.layers||window.opera)	
			{

				pa='';
			}

			for(k=0;k<(args.length);k+=4)	
			{

				if((g=MM_findObj(args[k]))!=null) 
				{

					if((el=MM_findObj(args[k+1]))!=null)
	 
					{

						a=parseInt(args[k+2]);
						b=parseInt(args[k+3]);
						x=0;
						y=0;
						ox=0;
						oy=0;
						p="";
						tx=1;

						da="document.all['"+args[k]+"']";
						if(document.getElementById)
						{

							d="document.getElementsByName('"+args[k]+"')[0]";
							if(!eval(d))	
							{

								d="document.getElementById('"+args[k]+"')";
								if(!eval(d))		
								{

									d=da;
								}

							}

						}

						else if(document.all)
						{

							d=da;
						}

						if(document.all||document.getElementById)
						{

							while(tx==1)
												   
							{

								p+=".offsetParent";
								if(eval(d+p))
								{

									x+=parseInt(eval(d+p+".offsetLeft"));
									y+=parseInt(eval(d+p+".offsetTop"));

								}

								else
								{

									tx=0;
								}

							}

							ox=parseInt(g.offsetLeft);
							oy=parseInt(g.offsetTop);
							tw=x+ox+y+oy;

							if(tw==0||(navigator.appVersion.indexOf("MSIE 4")>-1&&navigator.appVersion.indexOf("Mac")>-1))
							{

								ox=0;
								oy=0;
								if(g.style.left)
								{

									x=parseInt(g.style.left);
									y=parseInt(g.style.top);
								}
								else
								{

									w1=parseInt(el.style.width);
									bx=(a<0)?-5-w1:-10;
									a=(Math.abs(a)<1000)?0:a;
									b=(Math.abs(b)<1000)?0:b;

									x=document.body.scrollLeft+event.clientX+bx;
									y=document.body.scrollTop+event.clientY;
								}
							}

						}
						else if(document.layers)
						{
							x=g.x;
							y=g.y;
							q0=document.layers,dd="";
							for(var s=0;s<q0.length;s++)
							{

								dd='document.'+q0[s].id;
								if(eval(dd+'.document.'+args[k]))
								{
								x+=eval(dd+'.left');
								y+=eval(dd+'.top');

									break;
								}
							}
						}
						
						if (args[1].indexOf("rollout") == -1)
						{
							div=MM_findObj(args[1]);
						}
						else
						{
							div=MM_findObj(args[0]);
						}

				
						e=(document.layers)?el:el.style;
						xx=parseInt(x+ox+a),yy=parseInt(y+oy-div.offsetHeight + 20);

						if(navigator.appVersion.indexOf("MSIE 5")>-1 && navigator.appVersion.indexOf("Mac")>-1)
						{

							xx+=parseInt(document.body.leftMargin);
							yy+=parseInt(document.body.topMargin);
						}

						e.left=xx+pa;
						e.top=yy+pa;
					}

				}

			}

		}

		function P7autoLayers() 
		{ //v1.4 by PVII

			var g,b,k,f,args=P7autoLayers.arguments;
			a=parseInt(args[0]);
			if(isNaN(a))a=0;

			if(!document.p7setc)
			{
				p7c=new Array();
				document.p7setc=true;
				for(var u=0;
					u<10;
					u++)
				{
					p7c[u]=new Array();
				}
			}
			for(k=0;
				 k<p7c[a].length;
				 k++)
			 {
				 if((g=MM_findObj(p7c[a][k]))!=null)
				 {
					 b=(document.layers)?g:g.style;
					 b.visibility="hidden";
				 }
			 }
			for(k=1;k<args.length;k++)
			{
				if((g=MM_findObj(args[k]))!=null)
				{
					b=(document.layers)?g:g.style;
					b.visibility="visible";
					f=false;

					for(var j=0;
						j<p7c[a].length;
						j++)
					{
						if(args[k]==p7c[a][j]) 
						{
							f=true;
						}
					}
					if(!f)
					{
						p7c[a][p7c[a].length++]=args[k];
					}
				}
			}
		}

//-->