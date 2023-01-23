chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "linkExtractor",
      title: "Extract Links",
      contexts: ["page"]
    });
});
  
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "linkExtractor") {
      chrome.tabs.executeScript(tab.id, {file: "extractLinks.js"});
    }
});
  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'links') {
        var links = request.links;
        var html = "<style>div, table {text-align: center;}</style> <style>th, td {border: 1px solid black;}</style><table>";
        console.log("extracting links")
        links.forEach(function(link) {
            console.log(link.href)
            var qr = qrcode(12 , "L")
            qr.addData(link.href)
            qr.make();
            html += "<div><tr><th>" + link.title + "</th> <th>" + qr.createImgTag(); + " </th></tr></div>"
            //html += "<li><a href='" + link.href + "'>" + link.title + "</a></li>";
        
        });
        html += "</table>";
        var blob = new Blob([html], {type: "text/html;charset=utf-8"});
        var url = URL.createObjectURL(blob);

        chrome.downloads.download({
            url: url,
            filename: "Job Postings.html",
            saveAs: true
        
        });
    }
});
  