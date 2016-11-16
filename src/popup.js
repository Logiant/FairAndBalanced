var rawText, dictionary = {}, names;

var pageRating = -1, pageName = "";

var warnings = ["is in the database of misleading websites",
                "is known to distort headlines and report dubious information to generate likes, shares, and profits",
                "may circulate misleading and/or potentially unreliable information",
                "is known to use clickbait headlines and descriptions",
                "is known satire"];

// request the raw text data file from the github repository
var dataFile = new XMLHttpRequest();

function load() {
dataFile.open("GET", "https://raw.githubusercontent.com/Logiant/FairAndBalanced/master/masterlist-sorted.dat", true);
    
dataFile.onreadystatechange = function() {
    //make sure the file is ready to parse and found
    if (dataFile.readyState===4 && dataFile.status === 200) {
        rawText = dataFile.responseText;
        buildDictionary();
    }
}

dataFile.send(null);
            compareURL();

}

function buildDictionary() {    
    var lines = rawText.split('\n');
    
    for (var i=0;i<lines.length;i++) {
        var tokens = lines[i].split(",");
        var name = tokens[0].toUpperCase();
        var score = 0; //default for "not found"
        if (tokens.length > 1 && tokens[1]) {
            score = parseInt(tokens[1], 10);
        }
        dictionary[name] = score; 
    }
    
    names = Object.keys(dictionary);    
}

//document.addEventListener("DOMContentLoaded", function() {
chrome.webNavigation.onCompleted.addListener(function() {

    if (Object.keys(dictionary).length === 0 && dictionary.constructor === Object) {
        load();
        
    } else {
        compareURL();
    }

    
});


function compareURL() {

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var URL = tabs[0].url;

        //split the current URL down to the root
        var testChar = '.'; //period after www
        if (URL.search("www.") == -1) {
            testChar = '/';
        }
        
        var i1 = 0;
        
        if (URL.search("http") != -1) {
            i1 = URL.indexOf(testChar)+1; //after www
            if (testChar == '/') {
                i1 = i1 + 1;
            }
        }

        var i2 = URL.substr(i1).indexOf('/'); //before the first backslash
        if (i2 == -1) { i2 = URL.length; }
        //the string to test vs the dictionary
        var testString = URL.substr(i1, i2).toUpperCase();
        var index = names.indexOf(testString);
        pageRating = 0; //default for OKAY
        if (index != -1 && names[index] != pageName) { //this needs to be tested
            pageName = names[index];
            pageRating = dictionary[pageName];
            alert(pageName.toLowerCase() + " " + warnings[pageRating]);
        }
        
    });
}

