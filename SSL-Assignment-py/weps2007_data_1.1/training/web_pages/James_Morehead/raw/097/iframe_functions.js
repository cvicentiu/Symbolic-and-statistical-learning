iframe_url_params = '';
function append_url_esc(param, value) {
  if (value) {
    window.iframe_url_params += '&' + param + '=' + encodeURIComponent(value);
  }
}
function append_color(param, value) {
  append_url_esc('color_' + param, value);
}
function show_google_ad(width,height)
{
	w = window;
	append_url_esc('url', w.g_url);
	append_url_esc('format', w.g_format);
	append_url_esc('type', w.g_type);
	append_url_esc('visible_url', w.g_visible_url);
	append_url_esc('channel', w.g_channel);
	append_color('bg', w.g_color_bg);
	append_color('text', w.g_color_text);
	append_color('link', w.g_color_link);
	append_color('url', w.g_color_url);
	append_color('border', w.g_color_border);
	append_color('line', w.g_color_line);
	//document.write('<iframe src="http://pagead2.googlesyndication.com/pagead/ads?client=ca-redorbit_js'+
	document.write('<iframe src="http://pagead2.googlesyndication.com/pagead/ads?client=ca-pub-5440138744487553'+
	w.iframe_url_params
	+'" width="'+width+'" height="'+height+'" frameborder="0" name="google_ads_frame" scrolling="no"></iframe>');
}
