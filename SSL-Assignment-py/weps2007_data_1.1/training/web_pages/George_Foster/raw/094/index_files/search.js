if(typeof search == "undefined") search={};
if(typeof search.UserControls == "undefined") search.UserControls={};
search.UserControls.UserControls_Autocomplete_class = function() {};
Object.extend(search.UserControls.UserControls_Autocomplete_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	GetData: function(eventArgument) {
		return this.invoke("GetData", {"eventArgument":eventArgument}, this.GetData.getArguments().slice(1));
	},
	url: '/ajaxpro/search.UserControls.UserControls_Autocomplete,App_Web_autocomplete.ascx.6bb32623.ashx'
}));
search.UserControls.UserControls_Autocomplete = new search.UserControls.UserControls_Autocomplete_class();

