function chooseStyle(type){
    if(document.layers) { // netscape 4.x
        var styleSheet = '<link rel="stylesheet" type="text/css" href="/dev/css/ns4/' + type + '.css">';
    } else if (document.all) { // ie 4.x
        var styleSheet = '<link rel="stylesheet" media="screen" type="text/css" href="/dev/css/' + type + '.css"><link rel="stylesheet" media="print" type="text/css" href="/dev/css/print/' + type + '.css">';
    } else {
        var styleSheet = '';
    }

    document.writeln(styleSheet);
}
