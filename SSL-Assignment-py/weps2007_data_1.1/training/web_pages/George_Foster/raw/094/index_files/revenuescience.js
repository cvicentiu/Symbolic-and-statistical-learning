                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
// 00.00.04.010
// Start Config // 
 var DM_CSID		= "D04451";
 var DM_UIDS		= 3;
 var DM_CHN			= document.location.hostname;
 var DM_PIX			= "rsi.tvguide.com";
 var DM_BPIX		= "rsi.tvguide.com";
 var DM_UIDD		= document.location.hostname;
 var DM_UIDP		= "/";
 var DM_UIDC		= "";
 var DM_UIDN		= "";
 var DM_UIDE		= 0;
 var DM_ADMG		= 1;
 var DM_ANLY		= 1;
 var DM_CSES		= 0;
 var DM_CTST		= 0;
 var DM_MULT		= 1;
 var DM_FRAG		= 0;
 var DM_RCRC		= 0;
 var DM_BOOM_ON		= 0;
 var DM_BOOM_DMN	= "";
 var DM_BOOM_SRC	= "";
 var DM_BOOM_DCN	= "";
// End Config //

var DM_TEST		= 0; 
var DM_REQS		= 0; 
var _DTE		= new Date(); 
var _UNV		= navigator; 
var _UDC		= document; 
var _CHR		= null; 
var _sImg		= new Array(); 
var _evts		= new Array(); 
var _hexc		= new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"); 
var _BCL1		= "?&=%.()"; 
var _GCL2		= "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; 
var _TGID		= "a" + _hexc[(DM_TEST<<3 | DM_REQS<<2| DM_ADMG<<1 | DM_ANLY)]; 
var _name		= _UDC.title; 

for(_CHR="",i=0;i<256;i++) 
{ 
	_CHR += String.fromCharCode(i);  
} 

var _CRCTbl = new Array( 0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1, 0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d ); 

var _UID	= 0;  
var _UTZ	= (-1*_DTE.getTimezoneOffset())+720; 
var _UCS	= ((DM_CTST) ? (_gc(_sc("TC0",1,DM_CHN,"/",0,0)) == 1 ? 1:0)+(_gc(_sc("TC1",1,DM_CHN,"/",1,0)) == 1 ? 2:0):0);  
var _USID	= ((DM_CSES) ? _sessID():0); 
var _CNV	= ""; 
var _LOC	= _UDC.location.toString(); 
var _REF	= _UDC.referrer.toString(); 
var _CLD	= 0;

function DM_tag() 
{ 
	if (_CLD == 0 || DM_MULT == 1) 
	{ 
		_CLD = 1; 

		switch(DM_UIDS) 
		{ 
			case 1: 
			case 2: 
			case 5: 
				var cke = _gc(DM_UIDC); 
				if(cke==null)
				{ 
					_UID=-1; 
				}
				else if(cke.indexOf("/")>=0 || cke.indexOf("?")>=0)
				{ 
					_UID=-1;
				}
				else
				{ 
					_UID="DMID"+DM_UIDS+"="+escape(cke); 
				} 
				break; 
			case 4: 
				if ((_UID = _gc(DM_UIDN)) == null) 
				{ 
					_UID = _genID(); 
					_sc(DM_UIDN,_UID,DM_UIDD,DM_UIDP,DM_UIDE,0); 
				} 
				_UID = "DMID4="+_UID; 
				break; 
		} 
		
		for(var i=0;i<_evts.length;i++)
		{ 
			_addNV("DM_EVT."+_evts[i].name,_evts[i].props); 
		} 

		_addNV("DM_LOC",_encd(_LOC,_BCL1,0)); 
		_addNV("DM_REF",_encd(_REF,_BCL1,0)); 

		(_UID!=0 && _UID!=-1?_addNV("DM_HID",_encd(_UID,_BCL1,0)):0);
		
		_addNV("DM_TIT",_encd(_UDC.title.toString(),_BCL1,0));
		 
		_CNV+="&DM_EOM=1"; 
		
		if(_pack(_CNV))
		{ 
			if(DM_BOOM_ON)
			{ 
				_checkBoom();
			} 
		} 
		
		_rstReq(); 
	} 
} 

function _pack(d) 
{ 
	var rdte = new Date(); 
	var rid = _toHex(Math.floor(rdte)); 
	var bse="",hdr="",dat="",seq=1; 
	var prt=location.protocol+"//";
	var msl=(DM_PIX.length>DM_BPIX.length?DM_PIX.length:DM_BPIX.length); 
	var mrl=2000,usd=0; d=_encd(d,_GCL2,1); 
	
	for(var shpd=0,f=1;((DM_FRAG) ? (shpd<d.length):(f==1));shpd+=dat.length,f++)
	{ 
		hdr="/"+DM_CSID+"/"+_TGID+"/"+_UCS+"/"+DM_UIDS+"/"+_UTZ+"/"+seq+"/"+_USID+"/"+rid+"/"+_UID+"/"; 
		bse="/"+Math.floor(Math.random()*Math.pow(10,9))+".gif?D="; 
		lst=(shpd+(mrl-msl-(prt+hdr+bse).length-10)>d.length?1:0); 
		
		if(!DM_FRAG)
		{ 
			sts=0; 
		}
		else if(f==1&&lst==0)
		{ 
			sts=1; 
		}
		else if(f>1&&lst==0)
		{ 
			sts=2; 
		}
		else if(f>1&&lst==1)
		{ 
			sts=3; 
		}else
		{ 
			sts=0; 
		} 
		
		hdr+=sts+"/"; 
		usd=(prt+hdr+bse).length+msl+8; 
		dat=d.substr(shpd,(mrl-usd-(d.charAt(shpd+(mrl-usd-1))=='%'?1:(d.charAt(shpd+(mrl-usd-2))=='%'?2:0)))); 
		hdr+=_pad(((DM_RCRC) ? _toHex(_crc32(dat)):0),8); 
		_ship(rid+seq,prt,DM_PIX,DM_BPIX,hdr+bse+dat,0); 
		seq++; 
	} 
	return 1; 
} 

function _ship(srl,p,s1,s2,u,t) 
{ 
	if(_sImg[srl]==null) 
	{ 
		_sImg[srl]=new Image(2,3); 
	} 
	
	if (t<2) 
	{ 
		_sImg[srl].src = p+s1+u;
	} 
	else if(t<4) 
	{ 
		_sImg[srl].src = p+s2+u; 
	} 
	
	_sImg[srl].onerror= function(){setTimeout("_ship('"+srl+"','"+p+"','"+s1+"','"+s2+"','"+u+"',"+(t+1)+")",5000);};
} 

function _addNV(n,v) 
{  
	_CNV += (_CNV?"&":"")+n+"="+v;  
} 

function _genID() 
{ 
	return _toHex(Math.floor(_DTE)) +"-"+_toHex(Math.floor(Math.random()*Math.pow(10,16))) +"-"+_toHex(_crc32("".concat(_UDC.referrer,_UDC.cookie,_UNV.userAgent,_UTZ,screen.width,screen.height))); 
} 

function _sessID() 
{ 
	var sID=_gc("DMSID"); 
	
	if (sID == null)
	{ 
		sID=_gc(_sc("DMSID",_genID(),DM_UIDD,DM_UIDP,0,0));
	} 
	
	return(sID);  
} 

function _sc(n,v,d,p,e,o) 
{ 
	var _CDTE = new Date(); 
	if ((n != "" && v != "") && (_gc(n) == null || o == 1)) 
	{ 
		_CDTE.setDate(_DTE.getDate()+e); 
		_UDC.cookie = n+"="+v+(p != "" ? ";path="+p:"")+(d != "" ? ";domain="+d:"")+(e>0 ? ";expires="+_CDTE.toGMTString():""); 
	}  
	return n;  
} 

function _gc(n) 
{ 
	var co = _UDC.cookie; 
	var pos = co.indexOf(n+"="); 
	return pos != -1 ? co.substring(pos+n.length+1,(co.indexOf("; ",pos)!= -1 ? co.indexOf("; ",pos):co.length)):null;  
} 

function _encd(s,chrs,b)
{ 
	for(var i=0,ns="",c="";i<s.length;i++)
	{ 
		if((b==1 ? chrs.indexOf(s.charAt(i))>=0 : chrs.indexOf(s.charAt(i))<0))
		{ 
			ns+=s.charAt(i); 
		}
		else
		{ 
			if((c=_CHR.indexOf(s.charAt(i)))>0) 
				ns+="%"+_pad(_toHex(c),2); 
		} 
	} 
	return ns; 
} 

function _crc32(buf) 
{ 
	i=0; 
	cnt = buf.length; 
	crc = 0xFFFFFFFF; 
	
	while (cnt-- != 0) 
		crc = _CRCTbl[(crc ^ _CHR.indexOf(buf.charAt(i++))) & 0xFF] ^ (crc >>> 8); 
		
	crc ^= 0xFFFFFFFF;  
	crc = (crc & 0x7FFFFFFF) + ((crc<0)?0x80000000:0); 
	return crc; 
} 

function _appendToUrl(u,n,v) 
{ 
	return u+((u.indexOf("?")==-1)?"?":"&")+n+"="+v; 
} 

function _toHex(n)
{ 
	var rmd=0,quo=0,hex=""; 
	
	if(n < 16) 
	{ 
		return _hexc[n]; 
	}
	else
	{ 
		rmd = (n%16); 
		quo = Math.floor((n - rmd)/16); 
		return (_toHex(quo)+_toHex(rmd)); 
	} 
} 

function _pad(d,p)
{ 
	d += ""; 
	
	while(d.length < p)
	{ 
		d = "0"+d; 
	} 
	return d; 
} 

function _checkBoom()
{ 
	var segC="", bomc="",scrc=0,bcrc=0; 
	
	if((segC = _gc("DMSEG")) != null)
	{ 
		if((bomc = _gc("DMBOM")) != null)
		{ 
			scrc = _pad(_toHex(_crc32(segC)),8); 
			bcrc = bomc.substr(0,bomc.indexOf("&")); 
			if(scrc != bcrc)
			{ 
				_sendBoom(segC,scrc,DM_BOOM_DMN,DM_BOOM_SRC,DM_BOOM_DCN); 
			} 
		}
		else
		{ 
			_sendBoom(segC,_pad(_toHex(_crc32(segC)),8),DM_BOOM_DMN,DM_BOOM_SRC,DM_BOOM_DCN); 
		} 
	} 
} 

function _sendBoom(segC,crc,dmn,src,dcn)
{ 
	var aTok,segs,rid=0,i=0,bl="",u="";
	segC = unescape(segC); 
	aTok = segC.split("&"); 
	
	if(aTok.length >= 6)
	{ 
		if(aTok[5].length > 0)
		{ 
			segs = aTok[5].split(","); 
			while(i < segs.length)
			{ 
				bl += "boom="+segs[i]+";"; 
				i++; 
			} 
			rid = Math.floor(Math.random()*Math.pow(10,9)); 
			u = "/src="+src+";dcnet="+dcn+";"+bl+"sz=1x1;ord="+rid+"?"; 
			_ship(rid,location.protocol+"//",dmn,dmn,u,0); 
			_setBoom(crc,1); 
		}
		else
		{ 
			_setBoom(crc,0); 
		} 
	}
	else
	{ 
		_setBoom(crc,0); 
	} 
} 

function _setBoom(crc,snt)
{
	_sc("DMBOM",crc+"&"+_toHex(Math.floor(_DTE))+"&"+snt,DM_CHN,"/",0,1); 
} 

function _rstReq() 
{ 
	_CNV = ""; 
	_LOC = _UDC.location.toString(); 
	_REF = _UDC.referrer.toString(); 
	_UID = 0; 
} 

function DM_event(e,n,v)
{ 
	for(var i=0;i<_evts.length;i++)
	{ 
		if(_evts[i].name == e)
		{ 
			if(_evts[i].props.indexOf("("+_encd(n,_BCL1,0)+".")<0)
			{ 
				_evts[i].props+="("+_encd(n,_BCL1,0)+"."+_encd(v,_BCL1,0)+")"; 
				return 1; 
			}
			else
			{ 
				return 0; 
			} 
		} 
	} 
	_evts[_evts.length]={name:_encd(e,_BCL1,0),props:"("+_encd(n,_BCL1,0)+"."+_encd(v,_BCL1,0)+")"}; 
	return 1; 
} 

function DM_cat(cat) 
{ 
	_addNV("DM_CAT",_encd(cat,_BCL1,0)) 
} 

function DM_name(f) 
{ 
	_addNV("DM_NAM",_encd(f,_BCL1,0)) 
} 

function DM_keywords(k) 
{ 
	_addNV("DM_KYW",_encd(k,_BCL1,0)) 
} 

function DM_segments(s) 
{ 
	_addNV("DM_SEG",_encd(s,_BCL1,0)) 
} 

function DM_addToLoc(n,v) 
{ 
	v=escape(v);
	_LOC=_appendToUrl(_LOC,n,v); 
}

