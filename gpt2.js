document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('send-button').onclick = sendMessage;
});

async function getBotResponse(userInput) {
    const response = await fetch('https://api-inference.huggingface.co/models/openai-community/gpt2', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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', // Your Hugging Face token
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: userInput }),
    });

    const data = await response.json();
    if (data && data[0] && data[0].generated_text) {
        return data[0].generated_text;
    } else {
        throw new Error("Invalid response from API");
    }
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    // Display user message
    addMessage(userInput, 'user');

    // Clear input
    document.getElementById('user-input').value = '';

    try {
        const botResponse = await getBotResponse(userInput);
        addMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Error getting response from bot:', error);
    }
}

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.textContent = text;
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight; // Scroll to bottom
}
