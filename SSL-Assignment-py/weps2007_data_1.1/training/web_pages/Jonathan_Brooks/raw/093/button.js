/* @(#)$Id$
 * Copyright (c) 2000 Studio Terra, Inc. All Rights Reserved.
 *
 * This script represents implementation of the simple image button.
 * The button has link(href), alternate text, image, mouse over image
 * and selected image.
 *
 * In order to use it menu options should be added typicaly in header:
 *		...
 *		<script LANGUAGE=JavaScript>
 *		addButton('button1', 'button1.gif', 'button_over.gif');
 *		addButton('button2', 'button2.gif', 'button2_over.gif');
 *		addButton('button3', 'button3.gif', 'button3_over.gif');
 *		</script>
 *		...
 * After that in body section menu options should be added where aproperiate:
 *		...
 *		<a href='xxx.html'
 *				onMouseOver="setOverImage('button1')"
 *				onMouseOut="setImage('button1')">
 *			<img name="button1" src="button1.gif">
 *		</a>
 *		...
 *		<a href='yyy.html'
 *				onMouseOver="setOverImage('button2')"
 *				onMouseOut="setImage('button2')">
 *			<img name="button2" src="button2.gif">
 *		</a>
 *		...
 *		<a href='zzz.html'
 *				onMouseOver="setOverImage('button3')"
 *				onMouseOut="setImage('button3')">
 *			<img name="button3" src="button3.gif">
 *		</a>
 *		...
 *
 * version   $Revision$, $Date$
 * author    Irena Dominic
 */

// Navigation menu options array.
var buttons = new Array();

// Selected button index
var button_selected = '';
	
/* -----------------------------------------------------------------------------
 * This function declares Button object.
 * Parameters:
 *		image		  - image for menu option that represent normal state
 *		overImage	  - image for menu option that represent mouse over state
 *		selectedImage - image for menu option that represent mouse selected state
 */
/*function Button (image, overImage, selectedImage) {
 *	this.image = new Image();
 *	this.image.src = image;
 *	this.overImage = new Image();
 *	this.overImage.src = overImage;
 *	this.selectedImage = new Image();
 *	this.selectedImage.src = selectedImage;
 *}
 */
function Button (image, overImage) {
	this.image = new Image();
	this.image.src = image;
	this.overImage = new Image();
	this.overImage.src = overImage;
}

/* -----------------------------------------------------------------------------
 * This function adds new Button object.
 * Parameters:
 *		name          - symbolic name of this option
 *		image         - image for menu option that represent normal state
 *		overImage     - image for menu option that represent mouse over state
 *		selectedImage - image for menu option that represent mouse selected state
 */
/*function button_addButton (name, image, overImage, selectedImage) {
 *	buttons[name] =
 *			new Button(image, overImage, selectedImage);
 *}
 */
function button_addButton (name, image, overImage) {
      buttons[name] =new Button(image, overImage);
}

/* -----------------------------------------------------------------------------
 * This function sets selected image for specified button.
 * Parameters:
 *		name - symbolic name of this button
 */
function button_setSelectedImage (name) {
	var oldSelected = button_selected;

	document.images[name].src = buttons[name].selectedImage.src;
	button_selected = name;

	if (oldSelected != '') {
		button_setImage(oldSelected);
	}

}

/* -----------------------------------------------------------------------------
 * This function sets mouse over image for specified button.
 * Parameters:
 *		name - symbolic name of this button
 */
function button_setOverImage (name) {
	if (button_selected == name) {
		document.images[name].src = buttons[name].selectedImage.src;
	} else {
		document.images[name].src = buttons[name].overImage.src;
	}
}

/* -----------------------------------------------------------------------------
 * This function sets normal image for specified button.
 * Parameters:
 *		name - symbolic name of this button
 */
function button_setImage (name) {
	if (button_selected == name) {
		document.images[name].src = buttons[name].selectedImage.src;
	} else {
		document.images[name].src = buttons[name].image.src;
	}
}
