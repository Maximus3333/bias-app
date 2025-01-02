// src/hooks/usePageText.ts
import { useState, useEffect } from "react";

const usePageText = () => {
  const [pageText, setPageText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPageText = () => {
    setLoading(true);
    chrome.runtime.sendMessage({ action: 'GET_PAGE_TEXT' }, (response) => {
    if (response && response.text) {
      setPageText(response.text);
    }
  });

  };

  useEffect(() => {
    // Request the page text from the background script
    fetchPageText();

  }, []);


  return { pageText, loading, setLoading };
};

export default usePageText;
