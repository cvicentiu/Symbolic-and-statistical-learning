function searchFormSubmit(theForm)
{
	searchStringElement = theForm.elements["q"];
	searchString = searchStringElement.value;
	searchStringElement.value = searchString + "+ww2";
	return true;
}
window.name = "main";