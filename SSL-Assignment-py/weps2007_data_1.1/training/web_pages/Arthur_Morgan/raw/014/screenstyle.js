  var width = 0;
  if (window.innerWidth) { // browser supports innerWidth
   width = window.innerWidth;
  }
  else if (document.all) { // supports document.all (IE 4+)
   width = document.body.clientWidth;
  }
  if (width<831) {
  document.write('<style type="text/css"> #container { padding: 0 0 0 4%; } #header_container { margin-right: 4%; } ');
  document.write('#menu { left: 4%; } #arthurian-legend { margin-right: 4%; } </style>');
  }
  if ((width>830)&&(width<1050)) {
  document.write('<style type="text/css"> #container { padding: 0 0 0 10%; } #header_container { margin-right: 10%; }');
  document.write('#menu { left: 10%; } #arthurian-legend { margin-right: 10%; } </style>');
  }
  if (width>1049) {
  document.write('<style type="text/css"> #container { padding: 0 0 0 15%; } #header_container { margin-right: 15%; }');
  document.write('#menu { left: 15%; } #arthurian-legend { margin-right: 15%; } </style>');
  }