  function PopUp(url,wsize,hsize,resize)
  {
    window.open(url, 'childwin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width='+wsize+',height='+hsize+',resizable='+resize);
  }

  function WinOpen(url,wsize,hsize,resize)
  {
     window.open(url, 'childwin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width='+wsize+',height='+hsize+',resizable='+resize)
  }

  function openWinView(url)
  {
    winview=window.open(url, 'winview', 'toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,resizable=yes,width=600,height=500,scrollbars=yes');
    winview.focus();
  }

  function changeButton(myImage)
  {

    re=/On\.gif/;

    found=re.exec(myImage.src);

    if  (found == 'On.gif')
    {
      re = /On\.gif/;
      newSrc=myImage.src.replace(re,'Off.gif');
      myImage.src=newSrc;
    }else{
      re = /Off\.gif/;
      newSrc=myImage.src.replace(re,'On.gif');
      myImage.src=newSrc;
    }

  }
  function RUSure()
  {
    if(confirm("Are you sure you want to\nclear the entire form?"))
    {
      document.registration.reset();
    }
    else
    {
      return;
    }
  }
