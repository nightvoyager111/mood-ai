from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)
OLLAMA_API_URL = "https://e92098e86eae.ngrok-free.app"  # Replace with new tunnel

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.json.get('message')
    print("User asked:", user_input)

    try:
        response = requests.post(f"{OLLAMA_API_URL}/api/generate", json={
            "model": "mistral",
            "prompt": user_input,
            "stream": False
        })
        data = response.json()
        reply = data.get("response", "[No reply]")
        print("Ollama reply:", reply)
        return jsonify({'reply': reply})    
        
    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return jsonify({'reply': 'Sorry, something went wrong.'})

if __name__ == '__main__':
    app.run(debug=True)
