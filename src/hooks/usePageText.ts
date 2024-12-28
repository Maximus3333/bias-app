// src/hooks/usePageText.ts
import { useState, useEffect } from "react";

const usePageText = () => {
  const [pageText, setPageText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Request the page text from the background script
    chrome.runtime.sendMessage({ action: 'GET_PAGE_TEXT' }, (response) => {
        console.log(response);
        console.log("wtf");
        
        
      if (response && response.text) {
        setPageText(response.text);
        setLoading(false);
      }
    });
  }, []);


  return { pageText, loading };
};

export default usePageText;
