<!--
	// Global variables
	var layerList = new Array();
	var TimerID = Number( 0 );

	// Browser Detection
	var isIE=(document.all)?1:0;
	var isNS4=(document.layers)?1:0;
	var isNS6=((document.getElementById)&&(navigator.appName=='Netscape'))?1:0;
	var isNS=(isNS4)?1:0;
	var DHTML=(isIE||isNS4||isNS6)?1:0;
	var isMac=(navigator.userAgent.indexOf('Mac')!=-1)?1:0;
	var isIEMac=(isMac&&isIE)?1:0;
	var isIE4Mac=(isIEMac&&(navigator.appVersion.indexOf('4.',4)!=-1))?1:0;
	var isIE5Mac=(isIEMac&&(navigator.appVersion.indexOf('5.')!=-1))?1:0;


	// This function builds the navigation menus
	// Uses: Global Arrays aMenus and aMenuItems
	function CreateMenus() {
		// Look through the list of menus and create them
		var iMenuItem = Number( 1 );

		for (var iMenu=0; iMenu<aMenus.length; iMenu++ ) {
			var strMenu = String( aMenus[iMenu] );
			var aMenu = strMenu.split( ',' );

			// Make sure this is a valid menu
			if ( aMenu.length == 4 ) {
				// Build the HTML code for the menu
				var strCode = String("");

				strCode += '<table border=0 cellspacing=0 cellpadding=0 bgcolor="#F1EFED">';

				strCode += '<tr>';
				strCode += '<td width="2" bgcolor="#006699"><img src="/SNL-Lab-Template/images/spacer.gif" width="2" height="2" border="0" alt="spacer"/></td>';
				strCode += '<td width="9"><img src="/SNL-Lab-Template/images/spacer.gif" width="9" height="2" border="0" alt="spacer"/></td>';
				strCode += '<td colspan="3"><img src="/SNL-Lab-Template/images/spacer.gif" width="157" height="2" border="0" alt="spacer"/></td>';
				strCode += '</tr>';

				// Add the links for all the items
				for (var i=0; i<aMenuItems.length; i++ ) {
					var strMenuItem = String( aMenuItems[i] );
					var aMenuItem = strMenuItem.split( ',' );

					// Make sure this is a valid item
					if ( aMenuItem.length == 4  &&  aMenuItem[0] == aMenu[0] ) {
						strCode += '<tr>';
						strCode += '<td width="2" bgcolor="#006699"><img src="/SNL-Lab-Template/images/spacer.gif" width="2" height="18" border="0" alt="spacer"/></td>';
						strCode += '<td width="9"><img src="/SNL-Lab-Template/images/spacer.gif" width="9" height="18" border="0" alt="spacer"></td>';
						strCode += '<td width="9"><img src="/SNL-Lab-Template/images/spacer.gif" width="9" height="18" border="0" alt="spacer"></td>';
						strCode += '<td width="139" align=left valign=center class="menuitem"><a href="' + aMenuItem[2] + '" class="menuitem" onmouseover="Subroll(true);';

						if ( aMenuItem[3] != "" ) {
							strCode += ' menu_rollover(\'' + aMenu[0] + '\', \'menu_line_' + iMenuItem + '\',\'menu_line_on\');';
							strCode += ' Roll(\'' + aMenuItem[3] + '\',true,\'' + aMenu[0] + '\');';
						} else if ( aMenu[3] == "2" ) {
							strCode += ' HideMenus(\'' + aMenu[0] + '\');';
						}

						strCode += '" onmouseout="Subroll(false); ';

						if ( aMenuItem[3] != "" ) {
							strCode += 'menu_rollover(\'' + aMenu[0] + '\', \'menu_line_' + iMenuItem + '\',\'menu_line_off\');';
							strCode += ' Roll(\'' + aMenuItem[3] + '\',false,\'' + aMenu[0] + '\');';
						}

						strCode += '">' + aMenuItem[1] + '</a></td>';
						strCode += '<td width="9"><img src="/SNL-Lab-Template/images/spacer.gif" width=9 height=18 border=0 alt="spacer"/></td>';
						strCode += '</tr>';

						strCode += '<tr>';
						strCode += '<td width="2" bgcolor="#006699"><img src="/SNL-Lab-Template/images/spacer.gif" width="2" height="2" border=0 alt="spacer"/></td>';
						strCode += '<td width="9"><img src="/SNL-Lab-Template/images/spacer.gif" width="9" height="2" border="0" alt="spacer"/></td>';
						strCode += '<td colspan="3"><img src="/SNL-Lab-Template/images/menu-line_off.gif" width="157" height="2" border="0" name="menu_line_' + iMenuItem + '" alt="menu-line"/></td>';
						strCode += '</tr>';
					}

					iMenuItem++;
				}

				strCode += '</table>';

				CreateMenu( aMenu[0], strCode, aMenu[1], aMenu[2] );
			}
		}
	}

	// Creates an individual menu
	function CreateMenu( strName, strCode, iX, iY ) {
		var z = layerList.length;
		layerList[ z ] = strName;

		if ( isNS4  &&  ! isNS6 ) {
			document.write( '<layer name="' + strName + '" left=' + iX + ' top=' + iY + ' visibility="hide" z-index=' + z + '>');
			document.write( strCode );
			document.write( '</layer>\n' );
		} else {
			document.write('<div id="' + strName + '" style="position:absolute; overflow:hidden; left:' + iX + 'px; top:' + iY + 'px; visibility:hidden; z-index:' + z + '">');
			document.write( strCode );
			document.write('</div>');
		}
	}

	// Makes a menu visible
	function ShowMenu( strMenuName, strParentName, bHideOthers ) {
		if ( bLoaded == true ) {
			for ( var i=0; i<layerList.length; i++ ) {
				var layer;

				if ( isNS4  &&  ! isNS6 ) {
					layer = document.layers[ layerList[i] ];
				} else {
					if ( isNS6 ) {
						layer = document.getElementById(layerList[i]);
					} else {
						layer = eval('document.all.' + layerList[i] + '.style');
					}

					if ( layerList[i] == strMenuName ) {
						// alert( "Active Layer: " + i );

						if ( isNS4  &&  ! isNS6 ) {
							layer.visibility = "show";
						} else {
							if ( isNS6 ) {
								layer.style.visibility = "visible";
							} else {
								layer.visibility = "visible";
							}
						}
					} else if ( bHideOthers  &&  layerList[i] != strParentName ) {
						if ( isNS4  &&  ! isNS6 ) {
							layer.visibility = "hide";
						} else {
							if ( isNS6 ){
								layer.style.visibility = "hidden";
							} else {
								layer.visibility = "hidden";
							}
						}
					}
				}
			}
		}
	}

	// This function is called when user rolls over a menu item, to make sure the menu doesn't hide

	function Subroll( bOn ) {
		clearTimeout( TimerID );

		if ( ! bOn ) {
			TimerID = setTimeout( 'HideMenus();', 1000 );
		}
	}

	// This function is called when user rolls over a menu item, to make sure the menu doesn't hide
	function Roll( strMenuName, bOn, strParentName ) {
		if ( bLoaded == true ) {
			clearTimeout( TimerID );

			if ( bOn ) {
				ShowMenu( strMenuName, strParentName, true );
			} else {
				TimerID = setTimeout( 'HideMenus();', 1000 );
			}
		}
	}

	// Hides any visible menus
	function HideMenus( strParentName ) {
		if ( bLoaded == true ) {
			clearTimeout( TimerID );
			ShowMenu( '', strParentName, true );
		}
	}
//-->
