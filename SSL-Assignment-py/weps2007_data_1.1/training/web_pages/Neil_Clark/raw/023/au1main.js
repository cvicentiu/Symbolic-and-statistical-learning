if (!document.getElementById)
 document.location.href="http://www.florin.com/browserupdate.html"; 


function browseSelections(sStartPath) {

    var sLocation;
    
    var sFilename=sStartPath.replace(/\/authors\//i, "");
    
    switch (sFilename){
 
        case "index.html" :  sLocation = "desoto-capital.html";  break;
        case "desoto-capital.html" :  sLocation = "devarajan-africa.html";  break;
        case "devarajan-africa.html" :  sLocation = "devarajan-report.html";  break;
        case "devarajan-report.html" :  sLocation = "mcnamara-currency.html";  break;
        case "mcnamara-currency.html" :  sLocation = "bok-myrdal.html";  break;
        case "bok-myrdal.html" :  sLocation = "margolis-war.html";  break;
        case "margolis-war.html" :  sLocation = "demadariaga-catherine.html";  break;
        case "demadariaga-catherine.html" :  sLocation = "demadariaga-russia.html";  break;
        case "demadariaga-russia.html" :  sLocation = "demadariaga-ivan.html";  break;
        case "demadariaga-ivan.html" :  sLocation = "dawson-knowledge.html";  break;
        case "dawson-knowledge.html" :  sLocation = "dawson-networks.html";  break;  
        case "dawson-networks.html" :  sLocation = "brynner-odyssey.html";  break;
        case "brynner-odyssey.html" :  sLocation = "burton-psychiatry.html";  break;
        case "burton-psychiatry.html" :  sLocation = "velmans-kwai.html";  break;
        case "velmans-kwai.html" :  sLocation = "bartsch-ideology.html";  break;
        case "bartsch-ideology.html" :  sLocation = "bok-common.html";  break;
        case "bok-common.html" :  sLocation = "hofstadter-godel.html";  break;
        case "hofstadter-godel.html" :  sLocation = "bartsch-erotikon.html";  break;
        case "bartsch-erotikon.html" :  sLocation = "bok-secrets.html";  break;
        case "bok-secrets.html" :  sLocation = "bok-lying.html";  break;
        case "bok-lying.html" :  sLocation = "bok-mayhem.html";  break;
        case "bok-mayhem.html" :  sLocation = "hofstadter-tonbeau.html";  break;
        case "hofstadter-tonbeau.html" :  sLocation = "handy-cache.html";  break;
        case "handy-cache.html" :  sLocation = "vandulken-nineteenth.html";  break;
        case "vandulken-nineteenth.html" :  sLocation = "vandulken-american.html";  break;
        case "vandulken-american.html" :  sLocation = "vandulken-twentieth.html";  break;
        case "vandulken-twentieth.html" :  sLocation = "neilclark-facts.html";  break;
        case "neilclark-facts.html" :  sLocation = "neilclark-pockets.html";  break;
        case "neilclark-pockets.html" :  sLocation = "lucia-shadow.html";  break;
        case "lucia-shadow.html" :  sLocation = "lynette-camel.html";  break;
        case "lynette-camel.html" :  sLocation = "frieden-canvas.html";  break;
        case "frieden-canvas.html" :  sLocation = "boylan-killoyle.html";  break;
        case "boylan-killoyle.html" :  sLocation = "boylan-olympiad.html";  break;
        case "boylan-olympiad.html" :  sLocation = "velmans-lily.html";  break;
        case "velmans-lily.html" :  sLocation = "lucia-memory.html";  break;
        case "lucia-memory.html" :  sLocation = "velmans-whale.html";  break;
        case "velmans-whale.html" :  sLocation = "velmans-heart.html";  break;
        case "velmans-heart.html" :  sLocation = "index.html";  break;
          
       default : 
           sLocation="index.html";
           break;   
    }

    document.location.href = sLocation;

}
