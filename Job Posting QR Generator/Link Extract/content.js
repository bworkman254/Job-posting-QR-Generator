chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'getLinks') {
      var links = document.querySelectorAll("a");
      var extractedLinks = [];
      for(var i = 0; i < links.length; i++) {
          extractedLinks.push({
              title: links[i].title,
              href: links[i].href
          });
      }
      chrome.runtime.sendMessage({type: 'links', links: extractedLinks});
    }
  });
  