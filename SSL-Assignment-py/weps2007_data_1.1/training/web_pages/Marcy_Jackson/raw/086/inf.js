function extLink(target,paypal) {
 var moreLink	= '';
 var winProp	= "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width=450,height=185";
 if (paypal == 1) {
  moreLink = "_paypal";
  winProp  = "toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1,width=800,height=600";
 }
 OpenWindow	= window.open("link"+moreLink+".php?target="+target,"link",winProp);
}

function open_win(page) {
 window.open(page,"_blank","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=400, height=450")
}

function contactVerify() {
 var trigger;
 var message;
 trigger = 0;
 message = '';

 if (document.sendMsg.name.value == '') {
  trigger = 1;
  message = message + "* Please fill in your name\n";
 }
 if (document.sendMsg.email.value == '') {
  trigger = 1;
  message = message + "* Please fill in your email address\n";
 }
 if (document.sendMsg.status.value == '') {
  trigger = 1;
  message = message + "* Please select your membership status\n";
 }
 if (document.sendMsg.message.value == '') {
  trigger = 1;
  message = message + "* Please fill in your message\n";
 }
 if (trigger == 1) {
  alert(message);
  return false;
 }
}
