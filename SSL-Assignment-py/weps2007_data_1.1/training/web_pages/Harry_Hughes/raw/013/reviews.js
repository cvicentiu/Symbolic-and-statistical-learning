


if(!b25)
  var b25 = {};
  
b25.Reviews = {
  URI: '/reviewlist.html?',
  active: false,
  runOnce: true,
  getTransport: function() {
    if(b25.Reviews.request)
      return b25.Reviews.request;
    var req;
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch(err) {
      try { req = new ActiveXObject("Microsoft.XMLHTTP"); }
      catch(err) { req = null; }
    }
    if(!req && (typeof(XMLHttpRequest)!="undefined")) {
      req = new XMLHttpRequest();
    }
    return b25.Reviews.request = req;
  },
  update: function( hotelId, groupId ) {
    if(!b25.Reviews.active) {
      b25.Reviews.active = true;
      var transport = b25.Reviews.getTransport();
      var getURI = b25.Reviews.URI + 'hotel_id=' + hotelId + ';type=' + groupId;
      transport.onreadystatechange = b25.Reviews.responseHandler;
      transport.open('GET', getURI, true);
      transport.send('');
    }
  },
  getRawPage: function( url ) {
    if(!b25.Reviews.active) {
      b25.Reviews.active = true;
      var transport = b25.Reviews.getTransport();
      transport.onreadystatechange = b25.Reviews.responseHandler;
      transport.open('GET', url, true);
      transport.send('');
    }
  },
  updateOnce: function( hotelId, groupId, startIndex ) {
    if(b25.Reviews.runOnce) {
      b25.Reviews.runOnce = false;
      b25.Reviews.update(hotelId, groupId);
    }
  },
  responseHandler: function() {
    if(b25.Reviews.request.readyState == 4) {
      if(b25.Reviews.request.status == 200) {
        var outputElm = document.getElementById('guest_reviews');
        outputElm.innerHTML = b25.Reviews.request.responseText;
      }
      delete b25.Reviews.request.onreadystatechange;
      delete b25.Reviews.request;
      b25.Reviews.active = false;
    }
  }
}

document.write('<style type="text/css">.hotelchars .reviews_pager { display: block !important; }</style>');
