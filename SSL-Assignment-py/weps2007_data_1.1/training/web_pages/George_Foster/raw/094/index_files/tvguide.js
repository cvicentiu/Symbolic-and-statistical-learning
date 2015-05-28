
try
{
    switch(navigator.appName.toLowerCase())
    {
        case "netscape" :
            break;
        default:
            setDocDomain();
            break;
    }
}
catch(err)
{
}  

function setDocDomain()
{
    var domParts = document.domain.split('.');
    
    switch(domParts.length)
    {
        case 0:
            break;
        case 1:
            break;
        default:
            document.domain = domParts[domParts.length-2] + '.' + domParts[domParts.length-1];
            break;
    }
}