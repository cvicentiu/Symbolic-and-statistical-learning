// TemplateName=list_component.js
// $Header: /home/cvs/cvsroot/site_data/001/00000001/static_data/js/list_component.js,v 1.9 2006/05/08 18:20:50 jeffm Exp $

/**
 * @fileoverview These functions support the list component features.
 */

/**
 * @class ListComponent contains global methods in the list_component.js file.
 * This is not really a class, but it serves to better organize the javadoc
 * comments generated from this file.
 * Without this, all methods get documented in a 'GLOBALS' page with methods
 * from all other .js files.
 * @private
 */
function AdminWrapper()
{
}

/**
 * A list of all column filters for lists in this page.
 * @private
 * @type lcColFilter[]
 * @member ListComponent
 */
var lc_filters = new Array();

/**
 * A map of all column filters for lists in this page, keyed by the table ID.
 * @private
 * @type lcColFilter[]
 * @member ListComponent
 */
var lc_filtersMap = new Array();

/**
 * Creates a new lcColFilter object.
 *
 * @class lcColFilter objects are created in the template for each table
 * and have information specific to each instance for the purpose of letting
 * the user collapse and expand columns.
 *
 * @param table_id the HTML ID of the table containing the columns.
 * @param _param the name of the HTTP parameter containing the list of
 *        columns to collapse.
 * @param hidden_cols a text string of the list of columns to collapse,
 *        identified by their sequence number starting with 1 (one) and
 *        separated by underscores.
 * @param has_extra_col boolean specification of whether there is an extra
 *        leading column in the table that should be skipped before applying the
 *        column numbers.
 */
function lcColFilter (table_id, _param, hidden_cols, has_extra_col)
{
	this.tableId = table_id;
	this.paramName = _param;

	// Collapse leading and trailing column separators.
	if (hidden_cols)
		hidden_cols = hidden_cols.replace (/^_*([^_]*)_*$/g, '$1');

	this.hiddenCols = hidden_cols ? hidden_cols.split ('_') : new Array();
	this.hasExtraCol = has_extra_col;
}

/**
 * A convenience method for creating a new {@link lcColFilter} object and adding
 * it to a global registry of filters.
 *
 * @param table_id the HTML ID of the table containing the columns.
 * @param _param the name of the HTTP parameter containing the list of
 *        columns to collapse.
 * @param hidden_cols a text string of the list of columns to collapse,
 *        identified by their sequence number starting with 1 (one) and
 *        separated by underscores.
 * @param has_extra_col boolean specification of whether there is an extra
 *        leading column in the table that should be skipped before applying the
 *        column numbers.
 * @member ListComponent
 */
function newListColFilter (table_id, _param, hidden_cols, has_extra_col)
{
	var f = new lcColFilter (table_id, _param, hidden_cols, has_extra_col);
	lc_filters.push (f);
	lc_filtersMap[table_id] = f;
}

/**
 * This is the main entry point to hide or show a column.
 * It can be called in response to users actions.
 *
 * @param origin is the element within the table initiating the invocation.
 *               Might be the table itself.
 * @param colNum is the index of the column to be hidden or shown, starting at 1
 * @param hideIt indicates whether to hide or show the column
 * @member ListComponent
 */
function lc_hideOrShowCol (origin, colNum, hideIt)
{
	var parent = origin;

	if (colNum == '')
		return;

	var table = getAncestor ('TABLE', origin);
	var colFilter = table ? lc_filtersMap[table.id] : null;

	if (!colFilter)
		return;

	if (hideIt == null)
		hideIt = true;

	var table = getAncestor ('TABLE', origin);
	// column header
	var ths = table.getElementsByTagName ('TH');
	var hdrNum = ((colNum - 1) * 2);

	if (colFilter.hasExtraCol)
		hdrNum--;

	lc_hideOrShowNode (ths, hdrNum, hideIt);
	lc_toggleHdr (ths, (hdrNum + 1), hideIt);

	// I first found the TDs to hide by going through the rows, getting the
	// array of TDs for each row, and then invoking the lc_hideOrShowNode
	// method using the colNum index.  But that failed with IE6 on the initial
	// load of the page (it worked when the user clicked on the hide or show
	// icons).
	// So this approach of getting all TDs and finding the appropriate ones
	// based on their ID fixed that.
	var tds = table.getElementsByTagName ('TD');
	var cellIdRegex = 'lc_cell_[^_]*_[0-9]*_' + (colNum - 1);

	for (var t = 0; t < tds.length; t++) {
		var td = tds.item(t);

		if (td) {
			if (td.id && td.id.match (cellIdRegex))
				lc_hideOrShowNode (tds, t, hideIt);
		}
	}

	// Update the variables that track which columns are hidden.
	// Also update any links in the page that contain the column filter.
	if (hideIt) {
		var found = false;

		// First, make sure it isn't already in the list of hidden columns.
		// It shouldn't be, but this helps prevent unnecessary processing.
		for (var c = 0; (!found && (c < colFilter.hiddenCols.length)); c++) {
			if (colFilter.hiddenCols[c] == colNum)
				found = true;
		}

		if (!found) {
			colFilter.hiddenCols[colFilter.hiddenCols.length] = colNum;
			lc_update_filter_in_page (colFilter.paramName, colFilter.hiddenCols);
		}
	}
	// Show the column (remove it from the filter)
	else {
		// Remove all references to this column number in the list of hidden
		// columns.  There should just be one.
		for (var c = 0; (c < colFilter.hiddenCols.length); ) {
			if (colFilter.hiddenCols[c] == colNum)
				colFilter.hiddenCols.splice (c, 1);
			else
				c++;
		}

		lc_update_filter_in_page (colFilter.paramName, colFilter.hiddenCols);
	}
}

/**
 * Hides a table column.
 * @param origin is the element within the table initiating the invocation.
 *               Might be the table itself.
 * @param colNum the index of the column, starting at 1
 * @member ListComponent
 * @see #lc_hideOrShowCol
 */
function lc_hideCol (origin, colNum)
{
	lc_hideOrShowCol (origin, colNum, true);
}

/**
 * Shows a table column.
 * @param origin is the element within the table initiating the invocation.
 *               Might be the table itself.
 * @param colNum the index of the column, starting at 1
 * @member ListComponent
 * @see #lc_hideOrShowCol
 */
function lc_showCol (origin, colNum)
{
	lc_hideOrShowCol (origin, colNum, false);
}

/**
 * This method updates the visual elements in the column header to reflect
 * the new state (shown / hidden) of the column.
 *
 * @param hdrList is a list of all header items.
 * @param hdrNum is the index of the header item to be changed.
 * @param hideIt indicates whether the column is being hidden or shown.
 * @member ListComponent
 */
function lc_toggleHdr (hdrList, hdrNum, hideIt)
{
	if (hdrList.length > hdrNum) {
		var hdr = hdrList.item(hdrNum);

		if (hdr != null) {
			// This is a dependency on list_component_header.tpt.
			// The hide / show images are within anchors ('<a ...>') to trick
			// NS & Mozilla into rendering their ALT text as fly-over text.
			var imgs = hdr.getElementsByTagName ('A');

			for (var i = 0; (i < imgs.length); i++) {
				var img = imgs.item(i);

				if (img != null) {
					// When hiding, show the link/image for showing and hide everything else.
					if (img.name && (img.name == 'lc_open'))
						set_display (img, hideIt); // show this node if column is to be hidden
					else
						set_display (img, !hideIt);
				}
			}
		}
	}
}

/**
 * This method hides or shows a DOM node by hiding or showing all of the
 * children of the node.	The node itself is not changed so that its
 * background, borders, etc. are not removed.
 *
 * @param nodeList is a list of all nodes.
 * @param nodeNum is the index of the node to be changed.
 * @param hideIt indicates whether the column is being hidden or shown.
 * @member ListComponent
 */
function lc_hideOrShowNode (nodeList, nodeNum, hideIt)
{
	if (nodeList.length > nodeNum) {
		var node = nodeList.item(nodeNum);

		if (node != null) {
			var children = node.childNodes;

			for (var n = 0; n < children.length; n++) {
				var child = children.item(n);

				if (child) {
					if (isOfClass (child, 'lc_empty'))
						set_display (child, hideIt); // show this node if column is to be hidden
					else
						set_display (child, !hideIt);
				}
			}
		}
	}
}

/**
 * This method updates all links in the page that contain the column filter
 * parameter.
 * It also updates the similarly named hidden field, if it exists.
 *
 * @param _param the name of the HTTP parameter containing the list of
 *        columns to collapse.
 * @param _colFilters an Array of the numbers of the columns to hide.
 * @member ListComponent
 */
function lc_update_filter_in_page (_param, _colFilters)
{
	var filter_string = _colFilters.join ('_');

	// In case all collapsed columns have now been expanded, making filter_string
	// empty, make it non-empty so that the server will parse the changes.
	if (!filter_string)
		filter_string = '_';

	lc_update_filter_in_links (document.getElementsByTagName ('A'), _param, filter_string);
	lc_update_filter_in_links (document.getElementsByTagName ('AREA'), _param, filter_string);

	// Update the hidden field
	var hidden = document.getElementById (_param);

	if (hidden)
		hidden.value = filter_string;
}

/**
 * This method adds the column filter parameter to a list of links.
 *
 * @param _links an Array of HTML elements to change.
 * @param _param the name of the HTTP parameter containing the list of
 *        columns to collapse.
 * @param _filter a filter parameter value.
 * @member ListComponent
 */
function lc_update_filter_in_links (_links, _param, _filter)
{
	for (var a = 0; (a < _links.length); a++) {
		if (_links[a].href && _links[a].href.match ('^http'))
				_links[a].href = appendToUrl (_links[a].href, _param, _filter);
	}
}

/**
 * This method is for initializing the columns according to the current
 * filter.	It assumes that all columns are displayed and only takes action
 * to hide the ones that are supposed to be hidden.
 *
 * @param colFilter a lcColFilter object of table filtering information.
 * @member ListComponent
 */
function lc_init_cols (colFilter)
{
	if (colFilter.hiddenCols != null) {
		var tbl = document.getElementById (colFilter.tableId);

		for (var c = 0; (c < colFilter.hiddenCols.length); c++)
			lc_hideOrShowCol (tbl, colFilter.hiddenCols[c], true);
	}
}

function lc_reorderListItem (_hidName, _delta)
{
	_delta = (_delta > 0) ? 1 : -1;

	// Find the hidden field that track the position
	var hid = document.getElementById (_hidName);

	if (hid) {
		// Move the table row.
		var row = getAncestor ('tr', hid);
		var beforeEl;
		var otherRow;

		if ((_delta > 0) && row.nextSibling) {
			otherRow = lc_getNextRow (row);

			if (otherRow)
				beforeEl = otherRow.nextSibling;
		}
		else if ((_delta < 0) && row.previousSibling)
			beforeEl = otherRow = lc_getPreviousRow (row);

		if (otherRow) {
			row.parentNode.insertBefore (row, beforeEl);
			lc_toggleRowClass (row);
			lc_toggleRowClass (otherRow);

			// Update the hidden fields for the 2 rows
			hid.value = String (parseInt (hid.value) + _delta);

			hid = otherRow.getElementsByTagName ('INPUT').item(0);
			hid.value = String (parseInt (hid.value) - _delta);
		}
	}
}

function lc_getPreviousRow (_row)
{
	var el = _row.previousSibling;

	while (el && ((el.tagName != 'TR') || lc_isHeaderRow (el)))
		el = el.previousSibling;

	return el;
}

function lc_getNextRow (_row)
{
	var el = _row.nextSibling;

	while (el && ((el.tagName != 'TR') || lc_isHeaderRow (el)))
			el = el.nextSibling;

	return el;
}

function lc_isHeaderRow (_row)
{
	return (_row && (_row.tagName == 'TR') && (_row.getElementsByTagName ('TH').length > 0));
}

function lc_toggleRowClass (_row)
{
	if (_row && _row.tagName == 'TR') {
		if (_row.className == 'lc_Row1')
			_row.className = 'lc_Row0';
		else if (_row.className == 'lc_Row0')
			_row.className = 'lc_Row1';
	}
}

function lc_init_all_filters()
{
	for (var f = 0; (f < lc_filters.length); f++) {
		var tbl = document.getElementById (lc_filters[f].tableId);

		if (tbl) {
			var links = tbl.getElementsByTagName ('A');

			for (var k = 0; (k < links.length); k++) {
				if (links[k].name == 'lc_close')
					show_element (links[k]);
			}
		}

		lc_init_cols (lc_filters[f]);
	}
}

addOnLoadHandler (lc_init_all_filters);
