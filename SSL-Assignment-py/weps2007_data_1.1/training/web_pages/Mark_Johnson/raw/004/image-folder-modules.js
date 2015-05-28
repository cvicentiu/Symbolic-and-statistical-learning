

var SS_FOLDER_STATES = new Array();


function toggleFolder( id, makeVisible ) {

  // perform visibility toggle

  var icon = document.getElementById( "folderToggleIcon" + id );
  var content = document.getElementById( "folderContent" + id );
  var btn = document.getElementById( "folderControl" + id );

  if (!content || !btn) {
    SS_FOLDER_STATES[id] = false;
    saveStates();
    return;
  }

  // see if we're forcing visibility

  if (makeVisible && isVisible(content)) { return; }

  // perform toggle

  toggleVisibility( content );

  if (!icon) {

    if (!isVisible(content)) {
      SS_FOLDER_STATES[id] = false;
      btn.className = "folder-link-expand";
    } else {
      SS_FOLDER_STATES[id] = true;
      btn.className = "folder-link-contract";
    }

  } else {

    if (!isVisible(content)) {
      SS_FOLDER_STATES[id] = false;
      icon.src = icon.src.replace("contract", "expand");
    } else {
      SS_FOLDER_STATES[id] = true;
      icon.src = icon.src.replace("expand", "contract");
    }

  }

  // serialize folder state

  saveStates();

}

function saveStates() {

  var folderStateSerialized = "";

  for( s in SS_FOLDER_STATES ) {
    if (SS_FOLDER_STATES[s] == true) {
      folderStateSerialized += ",";
      folderStateSerialized += s
    }
  }

  setCookie( "SS_FOLDER_STATES", folderStateSerialized.substr(1), null, '/' );

}

function restoreFolderStates() {

  var states = getCookie("SS_FOLDER_STATES");
  if (states) {
    states = states.split(",");
    for( fid in states ) {
      toggleFolder(states[fid], true);
      SS_FOLDER_STATES[states[fid]] = true;
    }
  }

}

addEvent(window, "load", restoreFolderStates);
