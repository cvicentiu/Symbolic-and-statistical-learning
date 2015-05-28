var agent     = navigator.userAgent.toLowerCase();
var is_ie     = ((agent.indexOf("msie") != -1) && (agent.indexOf("opera") == -1));
var is_opera  = (agent.indexOf("opera") != -1);
var is_mac    = (agent.indexOf("mac") != -1);
var is_mac_ie = (is_ie && is_mac);
var is_win_ie = (is_ie && !is_mac);
var is_safari = (agent.indexOf('safari') != -1 && is_mac);
var is_gecko  = (navigator.product == "Gecko");
var is_opera = (agent.indexOf("opera") != -1);
var is_firefox = (agent.indexOf("firefox") != -1);
var is_old_firefox = (agent.match(/firefox\/(...)/) ? RegExp.$1 * 1 < 1.5 : false);
var is_netscape = (agent.indexOf("netscape") != -1);

var init_fns = new Array();


function addInitFunction(fn)
{
  if (init_fns instanceof Array) init_fns.push(fn);
}

function init()
{
  MM_preloadImages('/images/top/b-showcase-home-r.jpg',
                   '/images/top/b-featured-artists-r.jpg',
                   '/images/top/b-charts-r.jpg',
                   '/images/top/b-calendar-r.jpg',
                   '/images/top/b-artist-direct-r.jpg');

  var i, f = document.forms['genre_styles'];

  if (f) if (genres) if (f.genres) if (f.styles)
  {
    loadCombo(f.genres, genres, 0, 'Genre');
    if (window.genre_id) setComboValue(f.genres, window.genre_id);
    handleGenre(f.genres);
    if (window.style_id) setComboValue(f.styles, window.style_id);
  }

  if (window.page_init) page_init();

  if (init_fns instanceof Array)
  {
    var i, fn;

    for (i = 0; i < init_fns.length; i++)
    {
      if ((fn = init_fns[i]) instanceof Function) fn();
    }	
  }
}

function debugging()
{
  return getCookie('debugging') ? true : false;
}

function elem(id, required)
{
  if (typeof id == 'object') return id;

  var e = document.getElementById(id);

  return required ? e : (e ? e : new Object());
}

function elemStyle(id, required)
{
  var s = elem(id).style;

  return required ? s : (s ? s : new Object());
}

function elemDisplay(id, display, required)
{
  style = elemStyle(id);

  display = (display ? '' : 'none');

  if (style.display != display) style.display = display;
}

function elemValue(id)
{
  var e = elem(id);

  return e.options ? getComboValue(e) : e.value;
}

function toggleDisplay(id, required)
{
  var s = elemStyle(id, required)

  if (s) s.display = (s.display == 'inline' ? 'none' : 'inline');

  return s ? true : false;
}

function newGecko()
{
  return navigator.product == 'Gecko' && navigator.productSub && navigator.productSub > '20041010' &&
        (navigator.userAgent.indexOf('rv:1.8') != -1 || navigator.userAgent.indexOf('rv:1.9') != -1);
}

function getRowVisibility(rowid, empty_means_none)
{
  var style = elemStyle(rowid, true);

  empty_means_none = (empty_means_none ? true : false);

  if (style)            {} else return !empty_means_none;
  if (style.visibility) {} else return !empty_means_none;

  if (style.visibility == 'collapse') return false;
  if (style.visibility == 'none')     return false;

  return true;
}

function setRowVisibility(rowid, visible)
{
  var style = elemStyle(rowid, true)

  if (style) {} else return;

  visible = (visible ? 'visible' : 'collapse');

  if (newGecko())
  {
    style.visibility = visible;
    style.display = (visible == 'visible' ? 'table-row' : 'none');
  }
  else if (visible == 'visible')
  {
    if (document.all && !window.opera) // document.compatMode == 'CSS1Compat'
    {
      style.display = 'block';
    }
    else if (document.getElementById) // && table.rows)
    // Mozilla prior to 1.8a2, Opera 7.x and MSIE 5+
    {
      style.display = 'table-row';
    }
  }
  else if (visible == 'collapse')
  {
    style.display = 'none';
  }
}

function toggleRowVisibility(rowid, empty_means_none)
{
  setRowVisibility(rowid, !getRowVisibility(rowid, empty_means_none));
}

function pixels(v)
{
  return 1 * v.toString().replace('px', '');
}

function remove_host_name(url)
{
  url = url.toString();

  return url.substring(url.indexOf(location.host) + location.host.toString().length);
}

function listen(message)
{
  message = unescapeArray(message.replace(/^\?/, ''));

  var fn = message['fn'];

  if (fn)
  {
    var i, arg = null, args = '';

    for (i = 1; (arg = message['a' + i]) != null; i++)
    {
      args += (args ? ', ' : '') + quote(arg);
    }

    fn += '(' + args + ')';

    return eval(fn);
  }
  return null;
}

function trim(s)
{
  return (''+s).toString().replace(/(^\s+|\s+$)/g, '');
}

function quote(s)
{
  return "'" + s.toString().replace('\n', '\\n').replace("'", "\\'") + "'";
}

function put(s)
{
  document.write(s);
}

function encode(s)
{
  var fn = (encodeURIComponent ? encodeURIComponent : escape);

  return fn(s);
}

function decode(s)
{
  var fn = (decodeURIComponent ? decodeURIComponent : unescape);

  return fn(s);
}

function escapeArray(a)
{
  var s = '';

  for (k in a) s += (s.length ? '&' : '') + escape(k) + '=' + escape(a[k]);

  return s;
}

function unescapeArray(s)
{
  var i, a = new Array;

  if (s.length)
  {
    var pairs = s.split('&');

    for (i = 0; i < pairs.length; i++)
    {
      var pair = pairs[i].split('=');

      if (pair[0]) a[unescape(pair[0])] = unescape(pair[1]);
    }
  }

  return a;
}

function getCookie(name)
{
  var dc = document.cookie;

  var re = new RegExp('.*' + name + '=([^;]*).*');

  return dc.match(re) ? decode(dc.replace(re, '$1')).replace(/&sp;/g, ' ') : '';
}

function setCookie(name, value, persistent)
{
  value = '' + value;

  var s = name + '=' + encode(value.replace(/ /g, '&sp;')); // see APP.php

  if (persistent)
  {
    var d = new Date();

    d.setFullYear(d.getFullYear() + 1);

    s += '; expires=' + d.toGMTString();
  }

  document.cookie = s + '; path=/';
}

function killCookie(name)
{
  document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';

  if (is_safari) document.cookie = name + '=';
}

function getComboValue(c)
{
  return c.selectedIndex >= 0 ? c.options[c.selectedIndex].value : -1;
}

function setComboValue(c, value)
{
  var i = 0;;

  for (i = 0; i < c.options.length; i++)
  {
    if (c.options[i].value == value) c.selectedIndex = i;
  }
}

function addComboOption(c, value, text)
{
  var option = document.createElement("OPTION");
  if (!is_mac_ie) if (c.options.add) c.options.add(option); else c.add(option);
  option.innerText = option.text = text;
  option.value = value;
  if (is_mac_ie) c.options.add(option);
}

function clearComboList(c)
{
  for (i = c.options.length - 1; i >= 0; i--) c.options[i] = null;
}

function loadCombo(combo, array, extra_value, extra_label)
{
  var value = getComboValue(combo);
  clearComboList(combo);
  if (extra_label) addComboOption(combo, extra_value, extra_label);
  for (key in array) addComboOption(combo, key, array[key]['name']);
  if (value >= 0) setComboValue(combo, value);
}

function handle_time_type(select)
{
  var c, b = (select.options[select.selectedIndex].value != 'specific');

  var arg = select.name.replace('type', '');

  if (c = select.form.elements[arg + 'hour']) c.disabled = b;
  if (c = select.form.elements[arg + 'minute']) c.disabled = b;
  if (c = select.form.elements[arg + 'meridiem']) c.disabled = b;
}

function handle_smart_date(select)
{
  var name = select.name;
  var type = select.name;

  name = name.replace('_mday', '');

  name = name.replace('_mon', '');

  name = name.replace('_year', '');

  type = type.replace(name+'_','');

  if(c = select.value)
  {
    if (c = select.form.elements[name + '_mday']) if(!c.value) c.value = '1';
    if (c = select.form.elements[name + '_mon'])  if(!c.value) c.value = '1';
    if (c = select.form.elements[name + '_year']) if(!c.value) c.value = '2007';
  }
  else
  {
    if (c = select.form.elements[name + '_mday']) c.value = null;
    if (c = select.form.elements[name + '_mon'])  c.value = null;
    if (c = select.form.elements[name + '_year']) c.value = null;
  }

}

function valid_email(email)
{
  return email.value.match(/\w+@\w+\.\w+/) ? true : false;
}

function doLogin(formObject)
{
  var currentPage = document.createElement("input");

  if (document.location.toString().indexOf('ubl.com') < 0 && formObject.username.value.indexOf('@') > 0) 
  {
    doWebmailLogin(formObject);
    return false;
  }
  else
  {
    currentPage.type = "hidden";
    currentPage.name = "current_page";
    currentPage.value = document.location;
    formObject.appendChild(currentPage);
    return true;
  }
}

function doWebmailLogin(formObject)
{
  f = document.getElementById('webmail');
  f.imapuser.value = formObject.username.value;
  f.pass.value = formObject.password.value;
  f.submit();
}

function getMessages()
{
  var s = getCookie('APP_Messages');
  killCookie('APP_Messages');
  return s;
}

function handleGenre(genre, sub)
{
  var id = getComboValue(genre);

  if (sub) {} else sub = genre.form.styles;

  clearComboList(sub);

  if (id) if (genres)
  {
    var default_style = (id == 53 ? 564 : 0); // allow general choice for WAAF contest

    loadCombo(sub, genres[id] ? genres[id]['styles'] : new Array(), default_style, 'Style');
  }
}

function controlSoundslike(genre, sub)
{
  var id = getComboValue(genre);

  if (sub) {} else sub = genre.form.soundslike;

  clearComboList(sub);

  if (id) if (genre_soundslike)
  {
    loadCombo(sub, genre_soundslike[id] ? genre_soundslike[id]['prototype_bands'] : new Array(), 0, 'Sounds Like');
  }
}

function setSearchFields(type, keywords)
{
  var e, f = document.forms['search'];

  if (f)
  {
    if (e = f.elements['type']) setComboValue(e, type);
    if (e = f.elements['keywords']) e.value = keywords;
  }
}

function nav(url)
{
  // this lets the media player drive the main window to
  // add_to_watch.php without appearing to be the referrer
  setTimeout('location = "'+url+'";', 50);
}

var mpwin = 0;
var mpcount = 0;
function mediaPlayer(cls, id)
{
  if (mpwin) mpwin.close();
  var  args = cls + "', '" + id;
  if(is_safari)
  {
    mpcount++;
    mpPopup(cls, id);
  } else {
    mpPopup(cls, id);
  }
}

var pwin = 0;
var pcount = 0;
function launch_db_picker(source, key, value, s_name, element_name, element_label)
{
  var args = 'source='+source+'&key='+key+'&value='+value+'&element_name='+element_name+'&element_label='+element_label;

  if(pwin) pwin.close();

  if(is_safari) pcount++;

  if(s_name.match(/\?/)) s_name = s_name + '&';
  else s_name = s_name + '?';

  s_name = s_name + args;

  pwin =  window.open(s_name, 'pwin'+pcount,
                      'toolbar=no,location=no,directories=no,status=no,menubar=no,titlebar=0,' +
                      'scrollbars=yes,resizable=yes,width=400,height=300');
}

function choose_picker_value(element_name, key, element_label, value)
{
  var key_field   = document.getElementById(element_name);  
  var value_field = document.getElementById(element_label);  

  key_field.value   = key;
  value_field.value = value;
  return true;
}

function mpPopup(cls, id)
{
  mpwin = window.open('/mediaplayer/class/' + cls + '/id/' + id + '/index.php', 'mpwin'+mpcount,
		      'toolbar=no,location=no,directories=no,status=no,menubar=no,titlebar=0,' +
		      'scrollbars=no,resizable=no,width=400,height=416');
}

var popup = 0;

function openPopup(url, requireLogin)
{
  if (popup) popup.close();
  if (requireLogin) if (have_user()) {} else
  {
    if (confirm('To use this feature please login or signup for a free membership.'))
    {
      if (window.opener) { window.opener.document.location = '/signup'; window.close(); }

      else document.location = '/signup';
    }

    return;
  }

  if (url.toLowerCase().indexOf('http') != 0) if (url.toLowerCase().indexOf('/') != 0) url = '/' + url;

  popup = window.open(url, 'popup',
		      'toolbar=no,location=no,directories=no,status=no,menubar=no,titlebar=0,' +
		      'scrollbars=no,resizable=no,width=520,height=460');  
  if(is_mac)
  {
    setTimeout('window.popup.document.location = "'+ url+'";', 90);
  }
}

// hopefully the last popup function needed - others should use this one or replaced with direct calls to it.
//
// if an old_popup window is provided it is first closed
// options to override the defaults defined within can be passed as an object for example: { toolbar:'yes' }
// the opener argument can be provided to specify a diferent opening window than the caller
//
function popup_window(url, old_popup, options, opener)
{
  if (old_popup) old_popup.close();

  if (window.old_popup) window.old_popup.close();

  if (is_safari) popup_window.count++;

  var s = '', defaults =
  {
    toolbar:'no',
    location:'no',
    directories:'no',
    status:'no',
    menubar:'no',
    titlebar:'no',
    scrollbars:'yes',
    resizable:'yes',
    width:640,
    height:480
  };

  if (options instanceof Object) for (option in options) defaults[option] = options[option];

  for (option in defaults) s += ',' + option + '=' + defaults[option];

  window.old_popup = window.open(url, 'popup' + (popup_window.count ? popup_window.count : ''), s.substring(1));

  if (window.old_popup) {} else alert('Warning: Popup Blocker Suspected.');

  if (opener) {} else opener = window;

  if (popup.opener != opener) popup.opener = opener;

  return window.old_popup;
}

function content_popup(content_block, title, ok_callback, cancel_callback, mode)
{
  if (mode) {} else mode = 'confirm';

  var confirm = (ok_callback || cancel_callback) ? '&' + mode + '=true' : '';

  var win = popup_window('/dashboard/pop_content.php?content=' + content_block + '&title=' + escape(title) + confirm);

  if (win)
  {
    win.ok_callback = ok_callback;
    win.cancel_callback = cancel_callback;
  }
}

function have_user()
{
  return getCookie('login_id') ? true : false;
}

function postRequest(url, data, method)
{
  var req = false;

  if (method) {} else method = "POST";

  if (window.XMLHttpRequest) // safari, mozilla
  {
    // causes dialog to popup but is only necessary when running this file locally
    // for example, off your desktop, where the address bar might read:
    // file:///e:/Documents%20and%20Settings/Administrator/Desktop/SoundsLike.htm
    //
    //netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");

    try { req = new XMLHttpRequest(); }

    catch(e) { req = false; } finally {}
  }
  else if (window.ActiveXObject) // msie
  {
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e)
    {
       try { req = new ActiveXObject("Microsoft.XMLHTTP"); }

       catch(e) { req = false; } finally {}
    }
  }

  if (req)
  {
    req.open(method, url, false); // false for synchronous call
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Content-length", data.length);
    req.setRequestHeader("Connection", "close");
    req.send(data);

    return req.responseText;
  }

  return "Unable to Post Request";
}

var g_weekday   = '';
var g_monthname = '';
var g_monthday  = '';
var g_year      = '';

function getCalendarDate()
{
   var months = getMonthsArray();

   var days = getDaysArray();

   var now         = new Date();
   var monthnumber = now.getMonth();
     g_weekday     = days[now.getDay()];
     g_monthname   = months[monthnumber];
     g_monthday    = now.getDate();
     g_year        = now.getYear();
   if(g_year < 2000) { g_year = g_year + 1900; }
   var dateString = g_monthname + 
                    ' ' + 
                    g_monthday + 
                    ', ' + 
                    g_year;
   return dateString;
}

function getMonthsArray()
{
   var months = new Array(13);

   months[0]  = "January";
   months[1]  = "February";
   months[2]  = "March";
   months[3]  = "April";
   months[4]  = "May";
   months[5]  = "June";
   months[6]  = "July";
   months[7]  = "August";
   months[8]  = "September";
   months[9]  = "October";
   months[10] = "November";
   months[11] = "December";

   return months;
}

function getDaysArray()
{
   var days = new Array(7);

   days[0] = "Sunday";
   days[1] = "Monday";
   days[2] = "Tuesday";
   days[3] = "Wednesday";
   days[4] = "Thursday";
   days[5] = "Friday";
   days[6] = "Saturday";

   return days;
}

getCalendarDate();

// macromedia rollover functions
//
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function toggle_tabs(img, key, state)
{

  if(state == undefined)
    s = (document.getElementById(key).style.display == 'none');
  else
    s = state;
 
  try
  {
    document.getElementById(key).style.display = (s ?'inline':'none');
    document.getElementById(img).src = (s ? '/images/arrowD.gif':'/images/arrowL.gif');
  }
  catch(e) {} finally {}
}

function show_message(s)
{
  elem('message_box').innerHTML = s;

  if (s) if (window.refresh_editor) try
  {
    refresh_editor();
  }
  catch(e) {} finally {}
}

function stop_event(event)
{
  if (event)
  {
    if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
  }
}

function add_event(element, event, fn, useCapture)
{
  if (element.addEventListener) element.addEventListener(event, fn, useCapture);

  else if (element.attachEvent) element.attachEvent('on' + event, fn);
}

function window_size(win)
{
  if (win) {} else win = window;

  var body = win.document.body;
  var elem = win.document.documentElement;

  if (win.innerHeight)   return { y: win.innerHeight,   x: win.innerWidth   };
  if (body.clientHeight) return { y: body.clientHeight, x: body.clientWidth };
  else                   return { y: elem.clientHeight, x: elem.clientWidth };
}

function content_size(win)
{
  if (win) {} else win = window;

  var body = win.document.body;
  var elem = win.document.documentElement;

  if (body.scrollHeight) return { y: body.scrollHeight, x: body.scrollWidth };
  else                   return { y: elem.scrollHeight, x: elem.scrollWidth };
}

function auto_adjust_height(div, win)
{
  if (win) {} else win = window;

  if (typeof div == 'string') div = win.document.getElementById(div);

  if (div) {} else return;

  var other_content_height = content_size(win).y - div.scrollHeight;

  div.style.overflowY = 'auto';

  var fn = function()
  {
    var h = window_size(win).y - other_content_height;

    div.style.height = (h < 0 ? 0 : h) + 'px';
  }

  add_event(win, 'resize', fn);

  fn();
}

function auto_adjust_height2(div, diff, win)
{
  if (win) {} else win = window;

  if (typeof div == 'string') div = win.document.getElementById(div);

  if (div) {} else return;

  div.style.overflowY = 'auto';

  var fn = function()
  {
    var h = content_size(win).y - div.offsetTop - diff;

    div.style.height = (h < 0 ? 0 : h) + 'px';
  }

  add_event(win, 'resize', fn);

  fn();
}

var htmlarea_textarea = null;
var htmlarea_window   = null;
var htmlarea_title    = null;

function open_htmlarea(textarea, title)
{
  if (htmlarea_window) htmlarea_window.close();

  htmlarea_textarea = textarea;

  htmlarea_window = window.open('/nrp/includes/htmlarea.php', 'htmlarea',
    "toolbar=no,location=no,directories=no,status=no,menubar=no," +
    "scrollbars=no,resizable=yes,width=640,height=480");

  htmlarea_title = title;
}

function draw_htmlarea_button(input_name, title)
{
  if (is_win_ie || is_gecko)
  {
    var s = 'open_htmlarea(this.form.' + input_name + ', \'' + title + '\')';

    document.write('<br><input type="button" class="btn" value="HTML Editor..." onclick="' + s + '">&nbsp;Supported by IE 5.5, Mozilla 1.3, Netscape 4.7 or greater.');
  }
}

function format_money(price)
{
    price += 0;
    price  = (Math.round(price*100))/100;
    price  = (price == Math.floor(price)) ? price + '.00' 
              : ( (price*10 == Math.floor(price*10)) ? 
                       price + '0' : price);
    return '$' + price;
}
