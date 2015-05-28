//
// +---------------------------------------------------------------------+
// | phpOpenTracker - The Website Traffic and Visitor Analysis Solution  |
// +---------------------------------------------------------------------+
// | Copyright (c) 2000-2003 Sebastian Bergmann. All rights reserved.    |
// +---------------------------------------------------------------------+
// | This source file is subject to the phpOpenTracker Software License, |
// | Version 1.0, that is bundled with this package in the file LICENSE. |
// | If you did not receive a copy of this file, you may either read the |
// | license online at http://phpOpenTracker.de/license/1_0.txt, or send |
// | a note to license@phpOpenTracker.de, so we can mail you a copy.     |
// +---------------------------------------------------------------------+
// | Author: Sebastian Bergmann <sebastian@phpOpenTracker.de>            |
// +---------------------------------------------------------------------+
//
// $Id: webbug.js,v 1.3 2002/12/07 10:55:06 bergmann Exp $
//

client_id = 1;

// Taken from http://www.jan-winkler.de/hw/artikel/art_j02.htm

function base64_encode(decStr) {
 var base64s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
 var bits;
 var dual;
 var i = 0;
 var encOut = '';

 while(decStr.length >= i + 3) {
  bits = (decStr.charCodeAt(i++) & 0xff) <<16 |
         (decStr.charCodeAt(i++) & 0xff) <<8 |
          decStr.charCodeAt(i++) & 0xff;
  encOut += base64s.charAt((bits & 0x00fc0000) >>18) +
            base64s.charAt((bits & 0x0003f000) >>12) +
            base64s.charAt((bits & 0x00000fc0) >> 6) +
            base64s.charAt((bits & 0x0000003f));
 }

 if(decStr.length -i > 0 && decStr.length -i < 3) {
  dual = Boolean(decStr.length -i -1);
  bits = ((decStr.charCodeAt(i++) & 0xff) <<16) |
         (dual ? (decStr.charCodeAt(i) & 0xff) <<8 : 0);
  encOut += base64s.charAt((bits & 0x00fc0000) >>18) +
            base64s.charAt((bits & 0x0003f000) >>12) +
            (dual ? base64s.charAt((bits & 0x00000fc0) >>6) : '=') +
            '=';
  }

  return(encOut);
}

resolution = window.screen.width      + 'x' +
             window.screen.height     + 'x' +
             window.screen.colorDepth + 'bit';

document.write('<img src="http://search.rte.ie/webbug/image.php?' +
               'client_id='              + client_id    + '&' +
               'document='               + document.URL + '&' +
               'referer='                + base64_encode(document.referrer) + '&' +
               'add_data[]=resolution::' + resolution   +
               '" width="0" height="0" />'
              );
//document.write('<img src="http://stats2.rte.ie/image.php?' +
//               'client_id='              + client_id    + '&' +
//               'document='               + document.URL + '&' +
//               'referer='                + base64_encode(document.referrer) + '&' +
//               'add_data[]=resolution::' + resolution   +
//               '" alt="phpOpenTracker" width="0" height="0" />'
//              );
                                                                                         
