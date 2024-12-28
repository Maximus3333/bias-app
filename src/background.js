let pageText = '';

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'PAGE_TEXT') {
    pageText = message.text;
    console.log('Page text saved:', pageText);
     // Save the page text
  }
});

// Expose a method for the popup to request the text
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'GET_PAGE_TEXT') {
    sendResponse({ text: pageText });
  }
});