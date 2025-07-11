import requests

def chat(prompt):
    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    })
    return response.json()["response"]

if __name__ == "__main__":
    print("Ask-TapeB Local Chatbot (type 'exit' to quit)")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        response = chat(user_input)
        print(f"Bot: {response}")