/*********************************************************************************************************************************************
* x8menus2.js Version 2.0 February 7, 2003 (fixed the ";" issue in NN4.7)						*
* This script is a highly customized version of the HVmenus script that can be found at dynamicdrive.com. It is based on the HVmenu script created by Ger Versluis
* please post comments and suggestions to the Octane8 downloads discussion forum located in the client center
**********************************************************************************************************************************************/

// Gobal variables	

	var AgntUsr=navigator.userAgent.toLowerCase();
	var DomYes=(document.getElementById)?1:0;
	var NavYes=(AgntUsr.indexOf('mozilla')!=-1&&AgntUsr.indexOf('compatible')==-1)?1:0;
	var ExpYes=(AgntUsr.indexOf('msie')!=-1)?1:0;
	var Opr5=(AgntUsr.indexOf('opera 5')!=-1||AgntUsr.indexOf('opera/5')!=-1)?1:0;
	var DomNav=(DomYes&&NavYes)?1:0;
 	var DomExp=(DomYes&&ExpYes)?1:0;
	var Nav4=(NavYes&&!DomYes&&document.layers)?1:0;
	var Exp4=(ExpYes&&!DomYes&&document.all)?1:0;
	var PosStrt=((NavYes||ExpYes)&&!Opr5)?1:0;

	var FrstLoc,ScLoc,DcLoc;
	var ScWinWdth,ScWinHght,FrstWinWdth,FrstWinHght;
	var ScLdAgainWin;
	var FirstColPos,SecColPos,DocColPos;
	var RcrsLvl=0;
	var FrstCreat=1,Loadd=0,Creatd=0,IniFlg,AcrssFrms=1;
	var FrstCntnr=null,CurrntOvr=null,CloseTmr=null;
	var CntrTxt,TxtClose,ImgStr;
	var Ztop=100;
	var M_StrtTp=StartTop,M_StrtLft=StartLeft;
	var LftXtra=(DomNav)?LeftPaddng:0;
	var TpXtra=(DomNav)?TopPaddng:0;
	var M_Hide=(Nav4)?'hide':'hidden';var M_Show=(Nav4)?'show':'visible';
	var CRoll;
	var Par=(parent.frames[0]&&FirstLineFrame!=SecLineFrame)?parent:window;
	var Doc=Par.document, Bod=Doc.body, Trigger=(NavYes)?Par:Bod;
	
	MenuTextCentered=(MenuTextCentered==1||MenuTextCentered=='center')?'center':(MenuTextCentered==0||MenuTextCentered!='right')?'left':'right';
	WbMstrAlrts=["No such frame: ","Item not defined: ","Item needs height: ","Item needs width: ","Item Oke ","Menu tree oke"];

	if(Trigger.onload)Dummy=Trigger.onload;
	if(DomNav&&!Opr5)Trigger.addEventListener('load',Go,false);else Trigger.onload=Go;

function Dummy(){return}		// Executes user onload when found

function CnclSlct(){
	//return false
	}		// Prevents text select on menu items.

function RePos(){			// Repositions menu after resize IE and NS6
	var FrstCntnrStyle=(!Nav4)?FrstCntnr.style:FrstCntnr;
	FrstWinWdth=(ExpYes)?FrstLoc.document.body.clientWidth:FrstLoc.innerWidth;
	FrstWinHght=(ExpYes)?FrstLoc.document.body.clientHeight:FrstLoc.innerHeight;
	ScWinWdth=(ExpYes)?ScLoc.document.body.clientWidth:ScLoc.innerWidth;
	ScWinHght=(ExpYes)?ScLoc.document.body.clientHeight:ScLoc.innerHeight;
	if(TargetLoc)ClcTrgt();
	if(MenuCentered)ClcLft();
	if(MenuVerticalCentered)ClcTp();
	PosMenu(FrstCntnr,StartTop,StartLeft)}

function UnLoaded(){			// Disables menu when document gets unloaded
	if(typeof(CloseTmr)!='undefined'&&CloseTmr)clearTimeout(CloseTmr);
	Loadd=0; Creatd=0;
	if(HideTop){
	var FCStyle=(Nav4)?FrstCntnr:FrstCntnr.style;
	FCStyle.visibility=M_Hide}}

function ReDoWhole(){		// Reloads after resize NS4 only
	if(ScWinWdth!=ScLoc.innerWidth||ScWinHght!=ScLoc.innerHeight||FrstWinWdth!=FrstLoc.innerWidth||FrstWinHght!=FrstLoc.innerHeight)
	Doc.location.reload()}

function Check(WMnu,NoOf){		// Checks menu tree
	var i,Hg,Wd,La,Li,Nof,array,ArrayLoc;
	ArrayLoc=(parent.frames[0])?parent.frames[FirstLineFrame]:self;
	for(i=0;i<NoOf;i++){
		array=WMnu+eval(i+1);
		if(!ArrayLoc[array]){WbMstrAlrt(1,array); return false}
		La=ArrayLoc[array][0]; Li=ArrayLoc[array][1]; Nof=ArrayLoc[array][3];
		if(i==0){	if(!ArrayLoc[array][4]){WbMstrAlrt(2,array); return false}
			if(!ArrayLoc[array][5]){WbMstrAlrt(3,array); return false}}
			Hg=ArrayLoc[array][4]; Wd=ArrayLoc[array][5];
		if(!WbMstrAlrt(4,'\n\n'+array+'\nwidth: '+Wd+'\nheight: '+Hg+'\nLabel: '+La+'\nLink: '+Li+'\nNo of sub items: '+Nof)){WebMasterCheck=0; return true}
		if(ArrayLoc[array][3])if(!Check(array+'_',ArrayLoc[array][3])) return false}
	return true}	

function WbMstrAlrt(No,Xtra){
	if(WebMasterCheck)return confirm(WbMstrAlrts[No]+Xtra+'   ')}

function Go(){			// Main function
	Dummy();
	if(Loadd||!PosStrt)return;
	BeforeStart();
	Creatd=0; Loadd=1;
	status='Building menu';
	if(FrstCreat){
		if(FirstLineFrame =="" || !parent.frames[FirstLineFrame]){WbMstrAlrt(0,FirstLineFrame); FirstLineFrame=SecLineFrame}
		if(FirstLineFrame =="" || !parent.frames[FirstLineFrame]){WbMstrAlrt(0,SecLineFrame); FirstLineFrame=SecLineFrame=DocTargetFrame}
		if(FirstLineFrame =="" || !parent.frames[FirstLineFrame]){WbMstrAlrt(0,DocTargetFrame); FirstLineFrame=SecLineFrame=DocTargetFrame=''}
		if(SecLineFrame =="" || !parent.frames[SecLineFrame])SecLineFrame=DocTargetFrame;
		if(SecLineFrame =="" || !parent.frames[SecLineFrame])SecLineFrame=DocTargetFrame=FirstLineFrame;
		if(DocTargetFrame =="" || !parent.frames[DocTargetFrame])DocTargetFrame=SecLineFrame;
		if(WebMasterCheck){if(!Check('Menu',NoOffFirstLineMenus))return;else WbMstrAlrt(5,'')}
		FrstLoc=(FirstLineFrame!="")?parent.frames[FirstLineFrame]:window;
		ScLoc=(SecLineFrame!="")?parent.frames[SecLineFrame]:window;
		DcLoc=(DocTargetFrame!="")?parent.frames[DocTargetFrame]:window;
		if (FrstLoc==ScLoc) AcrssFrms=0;
		if (AcrssFrms)FirstLineHorizontal=(MenuFramesVertical)?0:1;
		FrstWinWdth=(ExpYes)?FrstLoc.document.body.clientWidth:FrstLoc.innerWidth;
		FrstWinHght=(ExpYes)?FrstLoc.document.body.clientHeight:FrstLoc.innerHeight;
		ScWinWdth=(ExpYes)?ScLoc.document.body.clientWidth:ScLoc.innerWidth;
		ScWinHght=(ExpYes)?ScLoc.document.body.clientHeight:ScLoc.innerHeight;
		if(Nav4){CntrTxt=(MenuTextCentered!='left')?"<div align='"+MenuTextCentered+"'>":"";TxtClose="</font>"+(MenuTextCentered!='left')?"</div>":""}}
	FirstColPos=(Nav4)?FrstLoc.document:FrstLoc.document.body;
	SecColPos=(Nav4)?ScLoc.document:ScLoc.document.body;
	DocColPos=(Nav4)?DcLoc.document:ScLoc.document.body;
	if (TakeOverBgColor)FirstColPos.bgColor=(AcrssFrms)?SecColPos.bgColor:DocColPos.bgColor;
	if(FrstCreat){FrstCntnr=CreateMenuStructure('Menu',NoOffFirstLineMenus);
	FrstCreat=(AcrssFrms)?0:1}
	else CreateMenuStructureAgain('Menu',NoOffFirstLineMenus);
		if(TargetLoc)ClcTrgt();
		if(MenuCentered) ClcLft();
		if(MenuVerticalCentered) ClcTp();
	PosMenu(FrstCntnr,StartTop,StartLeft);
	IniFlg=1;Initiate();Creatd=1; 
	ScLdAgainWin=(ExpYes)?ScLoc.document.body:ScLoc;
	ScLdAgainWin.onunload=UnLoaded;
	if(ExpYes)FrstLoc.document.body.onselectstart=CnclSlct;
	Trigger.onresize=(Nav4)?ReDoWhole:RePos;
	AfterBuild();
	status='Menu ready for use'}

function ClcTrgt(){			// Calculates StartTop and Left when positioning is relative
	var TLoc=(Nav4)?FrstLoc.document.layers[TargetLoc]:(DomYes)?FrstLoc.document.getElementById(TargetLoc):FrstLoc.document.all[TargetLoc];
	StartTop=M_StrtTp; StartLeft=M_StrtLft;
	StartTop+=(Nav4)?TLoc.pageY:TLoc.offsetTop;
	StartLeft+=(Nav4)?TLoc.pageX:TLoc.offsetLeft}

function ClcLft(){			// Calculates StartTop and Left when menu is centered
	if(MenuCentered!='left'){
		var Size=FrstWinWdth-((!Nav4)?parseInt(FrstCntnr.style.width):FrstCntnr.clip.width);
		StartLeft=M_StrtLft;
		StartLeft+=(MenuCentered=='right')?Size:Size/2}}

function ClcTp(){			// Calculates StartTop and Left when menu is centered
	if(MenuVerticalCentered!='top'){	
		var Size=FrstWinHght-((!Nav4)?parseInt(FrstCntnr.style.height):FrstCntnr.clip.height);
		StartTop=M_StrtTp;
		StartTop+=(MenuVerticalCentered=='bottom')?Size:Size/2}}

function PosMenu(CntnrPntr,Tp,Lt){	// Positions menu elements
	var Topi,Lefti,Hori;
	var Cntnr=CntnrPntr;
	var Mmbr=Cntnr.FrstMbr;
	var CntnrStyle=(!Nav4)?Cntnr.style:Cntnr;
	var MmbrStyle=(!Nav4)?Mmbr.style:Mmbr;
	var PadL=(Mmbr.value.indexOf('<')==-1)?LftXtra:0;
	var PadT=(Mmbr.value.indexOf('<')==-1)?TpXtra:0;
	var MmbrWt=(!Nav4)?parseInt(MmbrStyle.width)+PadL:MmbrStyle.clip.width;
	var MmbrHt=(!Nav4)?parseInt(MmbrStyle.height)+PadT:MmbrStyle.clip.height;
	var CntnrWt=(!Nav4)?parseInt(CntnrStyle.width):CntnrStyle.clip.width;
	var CntnrHt=(!Nav4)?parseInt(CntnrStyle.height):CntnrStyle.clip.height;
	var SubTp,SubLt;
	RcrsLvl++;
	if (RcrsLvl==1 && AcrssFrms)(!MenuFramesVertical)?Tp=FrstWinHght-CntnrHt+((Nav4)?4:0):Lt=(RightToLeft)?0:FrstWinWdth-CntnrWt+((Nav4)?4:0);
	if (RcrsLvl==2 && AcrssFrms)(!MenuFramesVertical)?Tp=0:Lt=(RightToLeft)?ScWinWdth-CntnrWt:0;
	if (RcrsLvl==2 && AcrssFrms){Tp+=VerCorrect;Lt+=HorCorrect}
	CntnrStyle.top=(RcrsLvl==1)?Tp:0;Cntnr.OrgTop=Tp;
	CntnrStyle.left=(RcrsLvl==1)?Lt:0;	Cntnr.OrgLeft=Lt;
	if (RcrsLvl==1 && FirstLineHorizontal){Hori=1; Lefti=CntnrWt-MmbrWt-2*BorderWidth;Topi=0}
	else{Hori=Lefti=0; Topi=CntnrHt-MmbrHt-2*BorderWidth}
	while(Mmbr!=null){
		PadL=(Mmbr.value.indexOf('<')==-1)?LftXtra:0;
		PadT=(Mmbr.value.indexOf('<')==-1)?TpXtra:0;
		MmbrStyle.left=Lefti+BorderWidth;
		MmbrStyle.top=Topi+BorderWidth;
		if(Nav4)Mmbr.CmdLyr.moveTo(Lefti+BorderWidth,Topi+BorderWidth);
		if(Mmbr.ChildCntnr){
			if(RightToLeft)ChldCntnrWdth=(Nav4)?Mmbr.ChildCntnr.clip.width:parseInt(Mmbr.ChildCntnr.style.width);
			if(Hori){	SubTp=Topi+MmbrHt+2*BorderWidth; 
				SubLt=(RightToLeft)?Lefti+MmbrWt-ChldCntnrWdth:Lefti}
			else{	SubLt=(RightToLeft)?Lefti-ChldCntnrWdth+ChildOverlap*MmbrWt+BorderWidth:Lefti+(1-ChildOverlap)*MmbrWt+BorderWidth; 
				SubTp=(RcrsLvl==1&&AcrssFrms)?Topi:Topi+ChildVerticalOverlap*MmbrHt}
			PosMenu(Mmbr.ChildCntnr,SubTp,SubLt)}
			Mmbr=Mmbr.PrvMbr;
		if(Mmbr){	MmbrStyle=(!Nav4)?Mmbr.style:Mmbr;
			MmbrWt=(!Nav4)?parseInt(MmbrStyle.width)+PadL:MmbrStyle.clip.width;
			MmbrHt=(!Nav4)?parseInt(MmbrStyle.height)+PadT:MmbrStyle.clip.height;
			(Hori)?Lefti-=(BorderBtwnElmnts)?(MmbrWt+BorderWidth):(MmbrWt):Topi-=(BorderBtwnElmnts)?(MmbrHt+BorderWidth):(MmbrHt)}}
	RcrsLvl--}

function Initiate(){			// Resets menu's visiblity
	if(IniFlg){Init(FrstCntnr);IniFlg=0}}

function Init(CntnrPntr){
	var Mmbr=CntnrPntr.FrstMbr;
	var MCStyle=(Nav4)?CntnrPntr:CntnrPntr.style;
	RcrsLvl++;
	MCStyle.visibility=(RcrsLvl==1)?M_Show:M_Hide;
	CntnrPntr.Sflg=(RcrsLvl==1)?1:0;
//JSB
if(RcrsLvl==1 && !Nav4){x8menusContainerWidth=CntnrPntr.style.width;x8menusContainerHeight=CntnrPntr.style.height;}
	while(Mmbr!=null){
		if(Mmbr.ChildCntnr) Init(Mmbr.ChildCntnr);
		Mmbr=Mmbr.PrvMbr}
	RcrsLvl--}

function ClearAllChilds(Pntr,ChldPntr){	// Hides no longer wanted elements
	var CPCCStyle;
	while (Pntr){
		if(Pntr.ChildCntnr&&Pntr.ChildCntnr.Sflg){
			CPCCStyle=(Nav4)?Pntr.ChildCntnr:Pntr.ChildCntnr.style;
			if(Pntr.ChildCntnr!=ChldPntr){CPCCStyle.visibility=M_Hide;Pntr.ChildCntnr.Sflg=0}
			ClearAllChilds(Pntr.ChildCntnr.FrstMbr,ChldPntr)}
		Pntr=Pntr.PrvMbr}}	

function GoTo(){			// Triggered by mouse click
	if(this.LinkTxt){
		status=''; 
		if(Nav4){if(this.LowLyr.LoBck)this.LowLyr.bgColor=this.LowLyr.LoBck;if(this.LowLyr.value.indexOf('<img')==-1){this.LowLyr.document.write(this.LowLyr.value);this.LowLyr.document.close()}}
		else{if(this.LoBck)this.style.backgroundColor=this.LoBck; if(this.LwFntClr)this.style.color=this.LwFntClr}
		this.LinkTxt.indexOf("javascript:")!=-1?eval(this.LinkTxt):(this.LinkTarget=="_blank")?window.open(this.LinkTxt):DcLoc.location.href=this.LinkTxt}}		
		
function OpenMenu(){			// Triggered by mouse over
	if(!Loadd||!Creatd) return;
	var TpScrlld=(ExpYes)?ScLoc.document.body.scrollTop:ScLoc.pageYOffset;
	var LScrlld=(ExpYes)?ScLoc.document.body.scrollLeft:ScLoc.pageXOffset;
	var CCnt=(Nav4)?this.LowLyr.ChildCntnr:this.ChildCntnr;
	var ThisHt=(Nav4)?this.clip.height:parseInt(this.style.height);
	var ThisWt=(Nav4)?this.clip.width:parseInt(this.style.width);
	var ThisLft=(AcrssFrms&&this.Level==1&&!FirstLineHorizontal)?0:(Nav4)?this.Container.left:parseInt(this.Container.style.left);
	var ThisTp=(AcrssFrms&&this.Level==1&&FirstLineHorizontal)?0:(Nav4)?this.Container.top:parseInt(this.Container.style.top);
	CurrntOvr=this; IniFlg=0;
	ClearAllChilds(this.Container.FrstMbr,CCnt);
	if((CRoll=(Nav4)?this.LowLyr.ro:this.ro)){
		if(Nav4)this.LowLyr.document.images[this.LowLyr.rid].src=this.LowLyr.ri2;
		else {var Lc=(this.Level==1)?FrstLoc:ScLoc;Lc.document.images[this.rid].src=this.ri2}}
		else{	if(Nav4){if(this.LowLyr.HiBck)this.LowLyr.bgColor=this.LowLyr.HiBck;if(this.LowLyr.value.indexOf('<img')==-1){
// JSB 07-18-01	
// 		if(useMenuBackgroundImage==1){this.style.backgroundImage='url('+menuBackgroundImageOver+')';}
		this.LowLyr.document.write(this.LowLyr.Ovalue);this.LowLyr.document.close()}}
		else{if(this.HiBck)this.style.backgroundColor=this.HiBck;if(this.HiFntClr)this.style.color=this.HiFntClr}}

// JSB 07-18-01	
		if(DomYes&&useMenuBackgroundImage==1){this.style.backgroundImage='url('+menuBackgroundImageOver+')';}
	
	if(CCnt!=null){
		CCnt.Sflg=1;
		var CCW=(Nav4)?this.LowLyr.ChildCntnr.clip.width:parseInt(this.ChildCntnr.style.width);
		var CCH=(Nav4)?this.LowLyr.ChildCntnr.clip.height:parseInt(this.ChildCntnr.style.height);
		var ChCntTL=(Nav4)?this.LowLyr.ChildCntnr:this.ChildCntnr.style;
		var SubLt=(AcrssFrms&&this.Level==1)?CCnt.OrgLeft+ThisLft+LScrlld:CCnt.OrgLeft+ThisLft;
		var SubTp=(AcrssFrms&&this.Level==1)?CCnt.OrgTop+ThisTp+TpScrlld:CCnt.OrgTop+ThisTp;
		if(MenuWrap){
			if(RightToLeft){if(SubLt<LScrlld)SubLt=(this.Level==1)?LScrlld:SubLt+(CCW+(1-2*ChildOverlap)*ThisWt);
				if(SubLt+CCW>ScWinWdth+LScrlld)SubLt=ScWinWdth+LScrlld-CCW}
			else{	if(SubLt+CCW>ScWinWdth+LScrlld)SubLt=(this.Level==1)?ScWinWdth+LScrlld-CCW:SubLt-(CCW+(1-2*ChildOverlap)*ThisWt);
				if(SubLt<LScrlld)SubLt=LScrlld}
			if(SubTp+CCH>TpScrlld+ScWinHght)SubTp=(this.Level==1)?SubTp=TpScrlld+ScWinHght-CCH:SubTp-CCH+(1-2*ChildVerticalOverlap)*ThisHt;
			if(SubTp<TpScrlld)SubTp=TpScrlld}
		ChCntTL.top=SubTp;ChCntTL.left=SubLt;ChCntTL.visibility=M_Show}
	status=this.LinkTxt}	

function OpenMenuClick(){			// Triggered by mouse over
	if(!Loadd||!Creatd) return;
	var CCnt=(Nav4)?this.LowLyr.ChildCntnr:this.ChildCntnr;
	CurrntOvr=this; IniFlg=0;
	ClearAllChilds(this.Container.FrstMbr,CCnt);
	if((CRoll=(Nav4)?this.LowLyr.ro:this.ro)){
		if(Nav4)this.LowLyr.document.images[this.LowLyr.rid].src=this.LowLyr.ri2;
		else {var Lc=(this.Level==1)?FrstLoc:ScLoc;Lc.document.images[this.rid].src=this.ri2}}
	else{	if(Nav4){if(this.LowLyr.HiBck)this.LowLyr.bgColor=this.LowLyr.HiBck;if(this.LowLyr.value.indexOf('<img')==-1){this.LowLyr.document.write(this.LowLyr.Ovalue);this.LowLyr.document.close()}}
		else{if(this.HiBck)this.style.backgroundColor=this.HiBck;if(this.HiFntClr)this.style.color=this.HiFntClr}}
	status=this.LinkTxt}	

function CloseMenu(){		// Triggered by mouse out
	if(!Loadd||!Creatd) return;
	if((CRoll=(Nav4)?this.LowLyr.ro:this.ro)){
		if(Nav4)this.LowLyr.document.images[this.LowLyr.rid].src=this.LowLyr.ri1;
		else {var Lc=(this.Level==1)?FrstLoc:ScLoc;Lc.document.images[this.rid].src=this.ri1}}
	else{	if(Nav4){if(this.LowLyr.LoBck)this.LowLyr.bgColor=this.LowLyr.LoBck;if(this.LowLyr.value.indexOf('<img')==-1){this.LowLyr.document.write(this.LowLyr.value);this.LowLyr.document.close()}}
		else{if(this.LoBck)this.style.backgroundColor=this.LoBck;if(this.LwFntClr)this.style.color=this.LwFntClr}}
	
	//jsb
	if(DomYes&&useMenuBackgroundImage==1){this.style.backgroundImage='url('+menuBackgroundImage+')';}
	
	status='';
	if(this==CurrntOvr){IniFlg=1;if (CloseTmr) clearTimeout(CloseTmr);CloseTmr=setTimeout('Initiate(CurrntOvr)',DissapearDelay)}}

function CntnrSetUp(Wdth,Hght,NoOff){	// Sets up layer that holds group of elements
	var x=(RcrsLvl==1)?BorderColor:BorderSubColor;
	this.FrstMbr=null;
	this.OrgLeft=this.OrgTop=0;
	this.Sflg=0;
	if(x)this.bgColor=x;
	if(Nav4){this.visibility='hide';this.resizeTo(Wdth,Hght)}
	else{if(x)this.style.backgroundColor=x;
		this.style.width=Wdth;
		this.style.height=Hght;
		this.style.fontFamily=FontFamily;
		this.style.fontWeight=(FontBold)?'bold':'normal';
		this.style.fontStyle=(FontItalic)?'italic':'normal';
		this.style.fontSize=FontSize+'pt';
		this.style.zIndex=RcrsLvl+Ztop}}

function MbrSetUp(MmbrCntnr,PrMmbr,WhatMenu,Wdth,Hght){ // Sets up element IE & NS6
	var Location=(RcrsLvl==1)?FrstLoc:ScLoc;
	var MemVal=eval(WhatMenu+'[0]');
	var t,T,L,W,H,S;
	var a,b,c,d;
	this.PrvMbr=PrMmbr;
	this.Level=RcrsLvl;
	this.LinkTxt=eval(WhatMenu+'[1]');
	this.LinkTarget=eval(WhatMenu+'[6]');
	this.Container=MmbrCntnr;
	this.ChildCntnr=null;
	this.style.overflow='hidden';
	this.style.cursor=(ExpYes&&(this.LinkTxt||(RcrsLvl==1&&UnfoldsOnClick)))?'hand':'default';
	this.ro=0;this.ri1=this.ri2=this.rid='';
	if(MemVal.indexOf('rollover')!=-1){
		this.ro=1;this.ri1=MemVal.substring(MemVal.indexOf(':')+1,MemVal.lastIndexOf(':'));
		this.ri2=MemVal.substring(MemVal.lastIndexOf(':')+1,MemVal.length);
		this.rid=WhatMenu+'i';MemVal="<img src='"+this.ri1+"' name='"+this.rid+"'>"}
	this.value=MemVal;
	
	if(RcrsLvl==1)
		{
		a=LowBgColor; 
		b=HighBgColor; 
		c=FontLowColor; 
		d=FontHighColor
		
			//jsb
			if(useFilterOnMain){this.style.filter=mainFilter;}
		}
	else 
		{
		a=LowSubBgColor; 
		b=HighSubBgColor; 
		c=FontSubLowColor; 
		d=FontSubHighColor
		
			//jsb
			if(useFilterOnSubs){this.style.filter=subsFilter;}
		}
		
	this.LoBck=a;
	this.LwFntClr=c;
	this.HiBck=b;
	this.HiFntClr=d; 
	this.style.color=this.LwFntClr;
	
	//jsb
	if(useMenuBackgroundImage==1){this.style.backgroundImage='url('+menuBackgroundImage+')';}
		
	if(this.LoBck)this.style.backgroundColor=this.LoBck;
	this.style.textAlign=MenuTextCentered;
	if(eval(WhatMenu+'[2]'))this.style.backgroundImage="url(\'"+eval(WhatMenu+'[2]')+"\')";
	if(MemVal.indexOf('<')==-1){this.style.width=Wdth-LftXtra;this.style.height=Hght-TpXtra;
		this.style.paddingLeft=LeftPaddng;this.style.paddingTop=TopPaddng}
	else{	this.style.width=Wdth; this.style.height=Hght}
	if(MemVal.indexOf('<')==-1&&DomYes){t=Location.document.createTextNode(MemVal);this.appendChild(t)}
	else this.innerHTML=MemVal;
	if(eval(WhatMenu+'[3]')){
		
		//jsb
		if(DomYes){S=(RcrsLvl==1&&FirstLineHorizontal)?arrowDown:(RightToLeft)?arrowRight:arrowRight;}
		else {S=(RcrsLvl==1&&FirstLineHorizontal)?'images/x8menus_arrow_down_dk.gif':(RightToLeft)?'images/x8menus_arrow_right_dk.gif':'x8menus_arrow_right_dk.gif';}
		W=(RcrsLvl==1&&FirstLineHorizontal)?10:5;
		H=(RcrsLvl==1&&FirstLineHorizontal)?5:10;
		T=(RcrsLvl==1&&FirstLineHorizontal)?Hght/2+3:Hght/2-3;
		L=(RcrsLvl==1&&FirstLineHorizontal)?Wdth-12:Wdth-10;

		
		
		if(DomYes){t=Location.document.createElement('img'); this.appendChild(t); t.style.position='absolute'; t.src=S; t.style.top=T; t.style.left=L}
		else{MemVal+="<div style='position:absolute; top:"+T+"; left:"+L+"; width:"+W+"; height:"+H+";visibility:inherit'><img src='"+S+"'></div>"; this.innerHTML=MemVal}}
	if(ExpYes){this.onmouseover=(RcrsLvl==1&&UnfoldsOnClick)?OpenMenuClick:OpenMenu;
		this.onmouseout=CloseMenu; 
		this.onclick=(RcrsLvl==1&&UnfoldsOnClick&&eval(WhatMenu+'[3]'))?OpenMenu:GoTo}
	else{	(RcrsLvl==1&&UnfoldsOnClick)?this.addEventListener('mouseover',OpenMenuClick,false):this.addEventListener('mouseover',OpenMenu,false); 
		this.addEventListener('mouseout',CloseMenu,false); 
		(RcrsLvl==1&&UnfoldsOnClick&&eval(WhatMenu+'[3]'))?this.addEventListener('click',OpenMenu,false):this.addEventListener('click',GoTo,false)}}

function NavMbrSetUp(MmbrCntnr,PrMmbr,WhatMenu,Wdth,Hght){ // Sets up element IE & NS6
	var a,b,c,d;
	if(RcrsLvl==1){a=LowBgColor; b=HighBgColor; c=FontLowColor; d=FontHighColor}
	else {a=LowSubBgColor; b=HighSubBgColor; c=FontSubLowColor; d=FontSubHighColor}
	this.value=eval(WhatMenu+'[0]');
	this.ro=0;this.ri1=this.ri2=this.rid='';
	if(this.value.indexOf('rollover')!=-1){
		this.ro=1;this.ri1=this.value.substring(this.value.indexOf(':')+1,this.value.lastIndexOf(':'));
		this.ri2=this.value.substring(this.value.lastIndexOf(':')+1,this.value.length);
		this.rid=WhatMenu+'i';this.value="<img src='"+this.ri1+"' name='"+this.rid+"'>"}
//this next line cause a ";" character to appear to the left of the menu, why???
//	if(LeftPaddng&&this.value.indexOf('<')==-1&&MenuTextCentered=='left')this.value=' \;'+this.value;

	if(FontBold)this.value=this.value.bold();
	if(FontItalic)this.value=this.value.italics();
	this.Ovalue=this.value;
	this.value=this.value.fontcolor(c);
	this.Ovalue=this.Ovalue.fontcolor(d);
	this.value=CntrTxt+"<font face='"+FontFamily+"' point-size='"+FontSize+"'>"+this.value+TxtClose;
	this.Ovalue=CntrTxt+"<font face='"+FontFamily+"' point-size='"+FontSize+"'>"+this.Ovalue+TxtClose;
	this.LoBck=a;
	this.HiBck=b;
	this.ChildCntnr=null;
	this.PrvMbr=PrMmbr;
	this.visibility='inherit';
	if(this.LoBck)this.bgColor=this.LoBck;
	this.resizeTo(Wdth,Hght);
	if(!AcrssFrms&&eval(WhatMenu+'[2]'))this.background.src=eval(WhatMenu+'[2]');
	this.document.write(this.value);
	this.document.close();
	this.CmdLyr=new Layer(Wdth,MmbrCntnr);
	this.CmdLyr.Level=RcrsLvl;
	this.CmdLyr.LinkTxt=eval(WhatMenu+'[1]');
	this.CmdLyr.LinkTarget=eval(WhatMenu+'[6]');
	this.CmdLyr.visibility='inherit';
	this.CmdLyr.onmouseover=(RcrsLvl==1&&UnfoldsOnClick)?OpenMenuClick:OpenMenu;
	this.CmdLyr.onmouseout=CloseMenu;
	this.CmdLyr.captureEvents(Event.MOUSEUP);
	this.CmdLyr.onmouseup=(RcrsLvl==1&&UnfoldsOnClick&&eval(WhatMenu+'[3]'))?OpenMenu:GoTo;
	this.CmdLyr.LowLyr=this;
	this.CmdLyr.resizeTo(Wdth,Hght);
	this.CmdLyr.Container=MmbrCntnr;
	if(eval(WhatMenu+'[3]')){
		this.CmdLyr.ImgLyr=new Layer(10,this.CmdLyr);
		this.CmdLyr.ImgLyr.visibility='inherit';
		this.CmdLyr.ImgLyr.top=(RcrsLvl==1&&FirstLineHorizontal)?Hght-7:Hght/2-5;
		this.CmdLyr.ImgLyr.left=(RcrsLvl==1&&FirstLineHorizontal)?Wdth-12:Wdth-7;
		this.CmdLyr.ImgLyr.width=(RcrsLvl==1&&FirstLineHorizontal)?10:5;
		this.CmdLyr.ImgLyr.height=(RcrsLvl==1&&FirstLineHorizontal)?5:10;
		
		if(DomYes){
			ImgStr=(RcrsLvl==1&&FirstLineHorizontal)?"<img src='+arrowRight+'>":(RightToLeft)?"<img src='+arrowLeft+'>":"<img src='+arrowRight+'>";
			}
			else
			{
			ImgStr=(RcrsLvl==1&&FirstLineHorizontal)?"<img src='images/x8menus_arrow_down_dk.gif'>":(RightToLeft)?"<img src='images/x8menus_arrow_right_dk.gif'>":"<img src='images/x8menus_arrow_right_dk.gif'>";
		}
		this.CmdLyr.ImgLyr.document.write(ImgStr);
		this.CmdLyr.ImgLyr.document.close()}}

function CreateMenuStructure(MName,NumberOf){
	RcrsLvl++;
	var i,NoOffSubs,Mbr,Wdth=0,Hght=0;
	var PrvMmbr=null;
	var WMnu=MName+'1';
	var MenuWidth=eval(WMnu+'[5]');
	var MenuHeight=eval(WMnu+'[4]');
	var Location=(RcrsLvl==1)?FrstLoc:ScLoc;
	if (RcrsLvl==1&&FirstLineHorizontal){
		for(i=1;i<NumberOf+1;i++){WMnu=MName+eval(i);Wdth=(eval(WMnu+'[5]'))?Wdth+eval(WMnu+'[5]'):Wdth+MenuWidth}
		Wdth=(BorderBtwnElmnts)?Wdth+(NumberOf+1)*BorderWidth:Wdth+2*BorderWidth;Hght=MenuHeight+2*BorderWidth}
	else{	for(i=1;i<NumberOf+1;i++){WMnu=MName+eval(i);Hght=(eval(WMnu+'[4]'))?Hght+eval(WMnu+'[4]'):Hght+MenuHeight}
		Hght=(BorderBtwnElmnts)?Hght+(NumberOf+1)*BorderWidth:Hght+2*BorderWidth;Wdth=MenuWidth+2*BorderWidth}
	if(DomYes){
		var MmbrCntnr=Location.document.createElement("div");
		MmbrCntnr.style.position='absolute';
		MmbrCntnr.style.visibility='hidden';
		Location.document.body.appendChild(MmbrCntnr)}
	else	if(Nav4) var MmbrCntnr=new Layer(Wdth,Location)
		else{	WMnu+='c';
			Location.document.body.insertAdjacentHTML("AfterBegin","<div id='"+WMnu+"' style='visibility:hidden; position:absolute;'><\/div>"); 
			var MmbrCntnr=Location.document.all[WMnu]}
	MmbrCntnr.SetUp=CntnrSetUp;
	MmbrCntnr.SetUp(Wdth,Hght,NumberOf);
	if(Exp4){	MmbrCntnr.InnerString='';
		for(i=1;i<NumberOf+1;i++){
			WMnu=MName+eval(i);
			MmbrCntnr.InnerString+="<div id='"+WMnu+"' style='position:absolute;'><\/div>"}
		MmbrCntnr.innerHTML=MmbrCntnr.InnerString}
	for(i=1;i<NumberOf+1;i++){
		WMnu=MName+eval(i);
		NoOffSubs=eval(WMnu+'[3]');
		Wdth=(RcrsLvl==1&&FirstLineHorizontal)?(eval(WMnu+'[5]'))?eval(WMnu+'[5]'):MenuWidth:MenuWidth;
		Hght=(RcrsLvl==1&&FirstLineHorizontal)?MenuHeight:(eval(WMnu+'[4]'))?eval(WMnu+'[4]'):MenuHeight;
		if(DomYes){Mbr=Location.document.createElement("div");
			Mbr.style.position='absolute';
			Mbr.style.visibility='inherit';
			
			//JSB
			if(useCSSBorders&&DomYes){
				Mbr.style.border=borderStyle;
				Mbr.style.borderWidth=borderWidthCSS;
				Mbr.style.borderTopColor=borderTopColor;
				Mbr.style.borderRightColor=borderRightColor;
				Mbr.style.borderBottomColor=borderBottomColor;
				Mbr.style.borderLeftColor=borderLeftColor;
			}
			
			MmbrCntnr.appendChild(Mbr)}
		else Mbr=(Nav4)?new Layer(Wdth,MmbrCntnr):Location.document.all[WMnu];
		Mbr.SetUp=(Nav4)?NavMbrSetUp:MbrSetUp;
		Mbr.SetUp(MmbrCntnr,PrvMmbr,WMnu,Wdth,Hght);
		if(NoOffSubs) Mbr.ChildCntnr=CreateMenuStructure(WMnu+'_',NoOffSubs);
		PrvMmbr=Mbr}
	MmbrCntnr.FrstMbr=Mbr;
	RcrsLvl--;
	return(MmbrCntnr)}

function CreateMenuStructureAgain(MName,NumberOf){
	var i,WMnu,NoOffSubs;
	var PrvMmbr,Mbr=FrstCntnr.FrstMbr;
	RcrsLvl++;
	for(i=NumberOf;i>0;i--){
		WMnu=MName+eval(i);
		NoOffSubs=eval(WMnu+'[3]');
		PrvMmbr=Mbr;
		if(NoOffSubs)Mbr.ChildCntnr=CreateMenuStructure(WMnu+'_',NoOffSubs);
		Mbr=Mbr.PrvMbr}
	RcrsLvl--}