var rawText, dictionary;

// request the raw text data file from the github repository
var dataFile = new XMLHttpRequest();

dataFile.open("GET", "https://raw.githubusercontent.com/Logiant/FairAndBalanced/master/masterlist.dat", true);

dataFile.onreadystatechange = function() {
    //make sure the file is ready to parse and found
    if (dataFile.readyState===4 && dataFile.status === 200) {
        rawText = dataFile.responseText;
        buildDictionary();
    }
}

dataFile.send(null);

function buildDictionary() {
    
    console.log("Buildin now!");
    
    var lines = rawText.split('\n');
    
    for (var i=0;i<lines.length;i++) {
        
    }
    
    
    
}