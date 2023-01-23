
//var links = document.querySelectorAll("a");
var extractedLinks = [];
/*for(var i = 0; i < links.length; i++) {
        extractedLinks.push({
            title: links[i].title,
            href: links[i].href
            
        });
    
}*/
var extractedLinks = [];
Array.from(document.getElementsByClassName("jobTitle")).forEach(function(element, index, array){
    extractedLinks.push({
        title: element.textContent,
        href: element.href
            
    })
});

chrome.runtime.sendMessage({type: 'links', links: extractedLinks});