
var EmailOwnerForm = Class.create();

EmailOwnerForm.emailOwnerUrl = null;
EmailOwnerForm.pageUrlPath = null;
EmailOwnerForm.isLoaded = false;
EmailOwnerForm.spinnerImg = '<img src="/static_war/images/tab-spinner.gif" align="middle" title="Please wait, loading">';

EmailOwnerForm.show = function() {
		Element.show('emailOwnerDiv');
		EmailOwnerForm.reposition();
		if (!EmailOwnerForm.isLoaded)
		{
			var url = EmailOwnerForm.emailOwnerUrl;
			var params = 'page='+EmailOwnerForm.pageUrlPath+'&seed=' + (new Date().getTime());
			new Ajax.Updater(
				'emailOwnerDivContent',
				url,
				{
					method: 'get', 
					parameters: params, 
					onComplete: function (e) { EmailOwnerForm.reposition(); },
					onSuccess: function (e) { EmailOwnerForm.isLoaded = true; },
					onFailure: EmailOwnerForm.reportError,
					onLoading: EmailOwnerForm.showLoading
				}
			);
		}
};
	
EmailOwnerForm.reposition = function() {
		var box = $('emailOwnerDiv');
		var height = Element.getHeight(box);
		var parentPosition = Position.cumulativeOffset($('emailOwnerLink'));
		var top = (parentPosition[1] - height);
		if (top < 0) {
			top = 0;
		}
		var left = parentPosition[0];
		if (left < 0) {
			left = 0;
		}
		box.style.top = top + 'px';
		box.style.left = left + 'px';
};

EmailOwnerForm.hide = function() {
		Element.hide('emailOwnerDiv');
};

EmailOwnerForm.post = function() {
		var url = EmailOwnerForm.emailOwnerUrl;
		var params = WForm.postEncode('emailOwnerForm');
		$('pageOwnerSubmit').disabled = true;
		$('pageOwnerCancel').disabled = true;
		new Ajax.Updater(
			'emailOwnerDivContent',
			url,
			{
				method: 'post', 
				parameters: params, 
				onComplete: EmailOwnerForm.resizeMessageBox,
				onFailure: EmailOwnerForm.reportError
			}
		);
};
	
EmailOwnerForm.reportError = function(request) {
		EmailOwnerForm.isLoaded = false;
		Element.update('emailOwnerDivContent','<p>There was a problem loading the email user form.</p><p><a href="#" onclick="showEmailOwnerForm()">Retry</a></p>');
};
	
EmailOwnerForm.showLoading = function(request) {
	if (!EmailOwnerForm.isLoaded) {
		Element.update('emailOwnerDivContent','<p>Loading... please wait '+EmailOwnerForm.spinnerImg+'</p>');
	}
};

EmailOwnerForm.resizeMessageBox = function() {
	//we should probably sort the textarea height out at this point
	var height = Element.getStyle($('emailOwnerDiv'),'height');
	height = height.substring(0,height.indexOf('px'));
	if (document.getElementById('message')) {
		Element.setStyle($('message'),{height:(height - 140) + 'px'});
	}
}
