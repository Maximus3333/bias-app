// src/components/Popup.tsx
import usePageText from "../hooks/usePageText";
import {useState } from 'react';
import axios from 'axios';


const Popup = () => {
  const { pageText, loading } = usePageText();
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/openai', { pageText }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponse(res.data.choices[0].text.trim());
      console.log("Here is the resp: ", res.data.choices[0].text.trim());
      console.log(response);
      
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }
  };

  return (
    <div style={{ padding: "10px", maxWidth: "300px" }}>
      <h1>Bias Scorer</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <textarea
          value={pageText}
          readOnly
          rows={10}
          style={{ width: "100%" }}
        />
      )}
      <button onClick={handleSubmit}>Submit</button>

    </div>
  );
};

export default Popup;
