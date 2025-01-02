import axios from "axios";

export const getOpenAIResponse = async (prompt: String) => {
try {
    const res = await axios.post('http://127.0.0.1:5000/api/openai', { prompt: prompt}, {
    headers: {
        'Content-Type': 'application/json'
    }
    });
    return res.data;
    
} catch (error) {
    console.error('Error fetching OpenAI response:', error);
}
};