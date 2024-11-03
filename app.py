from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModel
import torch

app = Flask(__name__)

# Load model and tokenizer once
tokenizer = AutoTokenizer.from_pretrained("BAAI/bge-base-en-v1.5")
model = AutoModel.from_pretrained("BAAI/bge-base-en-v1.5")

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    user_input = data.get('text')

    # Tokenize and process the input
    inputs = tokenizer(user_input, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)

    # Get the average embedding as a response (you can customize as needed)
    sentence_embedding = outputs.last_hidden_state.mean(dim=1).tolist()

    return jsonify({"embedding": sentence_embedding})

if __name__ == "__main__":
    app.run(debug=True)
