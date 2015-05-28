// Copyright (c) 1996-1997 Athenia Associates.
// http://www.webreference.com/js/
// License is granted if and only if this entire
// copyright notice is included. By Tomer Shiran.

function setCookie (name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) + (expires ? "; expires=" + expires : "") +
        (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "secure" : "");
    document.cookie = curCookie;
}

function getCookie (name) {
    var prefix = name + '=';
    var c = document.cookie;
    var nullstring = '';
    var cookieStartIndex = c.indexOf(prefix);
    if (cookieStartIndex == -1)
        return nullstring;
    var cookieEndIndex = c.indexOf(";", cookieStartIndex + prefix.length);
    if (cookieEndIndex == -1)
        cookieEndIndex = c.length;
    return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

function deleteCookie (name, path, domain) {
    if (getCookie(name))
        document.cookie = name + "=" + ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function fixDate (date) {
    var base = new Date(0);
    var skew = base.getTime();
    if (skew > 0)
        date.setTime(date.getTime() - skew);
}

function rememberMe (f) {
    var now = new Date();
    fixDate(now);
    now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    now = now.toGMTString();
    if (f.author != undefined)
       setCookie('goth_mtcmtauth', f.author.value, now, '/', '', '');
    if (f.email != undefined)
       setCookie('goth_mtcmtmail', f.email.value, now, '/', '', '');
    if (f.url != undefined)
       setCookie('goth_mtcmthome', f.url.value, now, '/', '', '');
}

function forgetMe (f) {
    deleteCookie('goth_mtcmtmail', '/', '');
    deleteCookie('goth_mtcmthome', '/', '');
    deleteCookie('goth_mtcmtauth', '/', '');
    f.email.value = '';
    f.author.value = '';
    f.url.value = '';
}

function hideDocumentElement(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

function showDocumentElement(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
}

var commenter_name;

function individualArchivesOnLoad(commenter_name) {
 
      hideDocumentElement('trackbacks-info');
 
   // comments are allowed but not required
    if (commenter_name) {
       hideDocumentElement('name-email');
       // ONLY display the URL field for authenticated commenters
       showDocumentElement('commenter-url');
    } else {
       showDocumentElement('name-email');
       // Hide the URL field from anonymous commenters
       hideDocumentElement('commenter-url');
    }
 
 

    var goth_mtcmtauth;
    var goth_mtcmthome;
    if (document.comments_form) {
       if (!commenter_name && (document.comments_form.email != undefined) &&
          (goth_mtcmtmail = getCookie("goth_mtcmtmail")))
          document.comments_form.email.value = goth_mtcmtmail;
       if (!commenter_name && (document.comments_form.author != undefined) &&
          (goth_mtcmtauth = getCookie("goth_mtcmtauth")))
          document.comments_form.author.value = goth_mtcmtauth;
       /* if (commenter_name && (document.comments_form.url != undefined) && 
          (goth_mtcmthome = getCookie("goth_mtcmthome")))
          // ONLY set the url from a cookie for trusted commenters!
          document.comments_form.url.value = goth_mtcmthome; */
       if (document.comments_form["bakecookie"]) {
          if (goth_mtcmtauth || goth_mtcmthome) {
              document.comments_form.bakecookie.checked = true;
          } else {
              document.comments_form.bakecookie.checked = false;
          }
       }
    }
 }

function writeTypeKeyGreeting(commenter_name, entry_id) {
    if (commenter_name) {
        document.write('<p>Thanks for signing in, ' + commenter_name +
          '. Now you can comment. '+
          '(<a href="http://www.sfist.com/mt/mt-com.fcgi?__mode=handle_sign_in&amp;static=1&amp;logout=1&entry_id=' + entry_id + '">sign out</a>)</p>');
    } else {
        document.write('<p>If you have a TypeKey identity, you can '+
          '<a href="https://www.typekey.com/t/typekey/login?&amp;need_email=1&amp;lang=en_US&amp;t=pbewcurABNwtLb1I8B47&amp;v=1.1&amp;_return=http://www.sfist.com/mt/mt-com.fcgi%3f__mode=handle_sign_in%26static=1%26entry_id=' + entry_id + '">sign in</a> '+
          'to use it here.</p>');

    }

}

if ('www.sfist.com' != 'www.sfist.com') {
    document.write('<script src="http://www.sfist.com/mt/mt-com.fcgi?__mode=cmtr_name_js"></script>');
} else {
    commenter_name = getCookie('commenter_name');
}

