from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from openai import OpenAI


# Load environment variables
load_dotenv()
os.environ['FLASK_ENV'] = 'development'


app = Flask(__name__)
CORS(app)

system_prompt = """You are an unbiased assistant that analyzes the contents of a website \
and provides logical evidence to determine the political bias of the text, ignoring text that might be navigation related. \
Respond with a overall score between -5 to 5 of politically leaning and logic and text evidence to back up your score. 5 being the most conservative and -5 being most liberal."""

# Define messages for the chat
def messages_for(prompt):
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ]

@app.route('/api/openai', methods=['GET', 'POST'])
def openai():
    if request.method == 'GET':
        return {"message": "GET request received"}
    print('Received request to /api/openai')
    openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    data = request.json
    prompt = data.get('prompt')
    print(f'Prompt: {10}')
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        response = openai.chat.completions.create(model="gpt-4o-mini", messages=messages_for(prompt))
        print(f'Response: {response.choices[0].message.content}')
        return response.choices[0].message.content
    except requests.exceptions.RequestException as e:
        print(f'Error calling OpenAI API: {e}')
        return jsonify({'error': 'Failed to fetch OpenAI response'}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)