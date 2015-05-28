function DexHelp() {}
DexHelp.topicByPage = {
    search: "search",
    searchResults: "searchResults",
    residential: "residentialSearch",
    government: "governmentSearch",
    mywww: "myDex",
    compare: "compare",
    detailsMap: "details",
    details: "details",
    mapResults: "maps",
    manage: 'myAccount',
    login: 'myAccount',
    directions: 'directions',
    email: 'print',
    forgotPw: 'FAQ#q22'
};

DexHelp.getTopicByPage = function( page ) {
    if( DexHelp.topicByPage[page] ) {
        return DexHelp.topicByPage[page];
    }
    return 'welcome';
};

function ShowHelp( url, context ) {
    if( context ) {
        url += '?topic=' + context;
    }
    var body = document.getElementsByTagName( 'body' )[0],
        w = body.offsetWidth * .75,
        wnd = window.open( url, 'helpWin', 'location=no,scrollbars=yes,toolbar=yes,resizable=yes,width=' + w );
    wnd.moveTo( self.screen.width/4, 0 );
    wnd.focus();
}

function ShowHelpSorting( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var url = new Url( e.getCurrentTarget().href );
    ShowHelp( url.getLocation(), 'sorting' );
    e.preventDefault();
    return false;
}

function ShowHelpMyWWW( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var url = new Url( e.getCurrentTarget().href );
    ShowHelp( url.getLocation(), 'myDex' );
    e.preventDefault();
    return false;
}
function ShowHelpByRel( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var a = e.getCurrentTarget();
    var url = new Url( a.href );
    var r = a.rel.split( ' ' );
    var topic = '';
    for( var i = 0; i < r.length; ++i ) {
        if( r[i].match( /^topic_(.*?)$/ ) ) {
            topic = RegExp.$1;
            break;
        }
    }
    ShowHelp( url.getLocation(), DexHelp.getTopicByPage( topic ) );
    e.preventDefault();
    return false;
}
function ShowHelpAuto( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var url = new Url( e.getCurrentTarget().href );
    if( url.queryExists( 'topic' ) ) {
        ShowHelp( url.getLocation() );
    } else {
        ShowHelp( url.getLocation(), DexHelp.getTopicByPage( u.pageName ) );
    }
    e.preventDefault();
    return false;
}

if( ( ! DSBrowser.isSafari ) && typeof ShowHelpAuto == 'function' ) {
    DSLink.addType( 'help_popup', ShowHelpAuto );
    DSLink.addType( 'mywww_help_popup', ShowHelpMyWWW );
    DSLink.addType( 'help_sorting', ShowHelpSorting );
    DSLink.addType( 'help_rel', ShowHelpByRel );
}
