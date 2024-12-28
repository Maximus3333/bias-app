const extractPageText = () => {
    const body = document.body;
    
  
    return body.innerText;
  };
  
  // Send the extracted text to the background script
  const pageText = extractPageText();
  console.log('Extracted page text:', pageText); // Log the extracted text
  chrome.runtime.sendMessage({ action: 'PAGE_TEXT', text: pageText }, (response) => {
    console.log('Message sent to background script:', response); // Log the response from the background script
  });