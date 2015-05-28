<!--

function form_popup(quiz,width,height){
  properties = 'width=' + width +
               ',height=' + height +
               'scrollbars=no,resizeable';
  window.open('','popup',properties);
  quiz.target = "popup";
  quiz.submit();
  return true;
}

function popup(url,width,height){
  properties = 'width=' + width +
               ',height=' + height +
               'scrollbars=no,resizeable';
  window.open(url,'popup',properties);
  return true;
}

function popup_scrolling(url,width,height){
  properties = 'width=' + width +
               ',height=' + height +
               ',scrollbars=yes,resizeable';
  window.open(url,'popup',properties);
  return true;
}

function popup_flash(url,width,height){
  properties = 'width=' + width +
               ',height=' + height +
               ',scrollbars=yes,resizeable';
  window.open(url,'popup',properties);
}

function close_redirect(url){
  opener.location = url;
  self.close();
}

function close_popupredirect(url,width,height){
  popup_scrolling(url,width,height);
  self.close();
}

function redirect(url){
  if(url != ""){
     document.location = url;
  }
}

//-->
