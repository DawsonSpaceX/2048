// gpt-neo.js

async function getBotResponse(userMessage) {
    const response = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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', // Your API token
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: userMessage })
    });

    const data = await response.json();
    return data[0].generated_text; // Ensure the correct indexing based on response structure
}

// Event listener for send button
document.getElementById('send-button').onclick = async function() {
    const userInput = document.getElementById('user-input').value;
    const botResponse = await getBotResponse(userInput);
    document.getElementById('chatbox').innerHTML += `<div>User: ${userInput}</div>`;
    document.getElementById('chatbox').innerHTML += `<div>Bot: ${botResponse}</div>`;
    document.getElementById('user-input').value = ''; // Clear input after sending
};
