from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"
MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.1"  # You can change this later

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.json.get('message')
    print("User asked:", user_input)

    try:
        response = requests.post(
            TOGETHER_API_URL,
            headers={
                "Authorization": f"Bearer {TOGETHER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODEL_NAME,
                "messages": [
                    {"role": "system", "content": "You are a helpful and emotionally supportive AI therapist."},
                    {"role": "user", "content": user_input}
                ],
                "temperature": 0.7,
                "max_tokens": 300
            }
        )
        data = response.json()
        reply = data['choices'][0]['message']['content']
        print("AI reply:", reply)
        return jsonify({'reply': reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({'reply': 'Sorry, something went wrong.'})

if __name__ == '__main__':
    app.run(debug=True)
