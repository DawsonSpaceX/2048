const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const messagesDiv = document.getElementById('messages');
const thinkingDiv = document.getElementById('thinking');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userMessage = userInput.value;
    if (!userMessage) return;

    // Display user message
    appendMessage(`You: ${userMessage}`);
    userInput.value = '';

    // Show thinking animation
    thinkingDiv.classList.remove('hidden');
    const thinkingDots = document.querySelector('.dots');
    
    // Simulate AI thinking
    setTimeout(async () => {
        const response = await getBotResponse(userMessage);
        thinkingDiv.classList.add('hidden');
        appendMessage(`Comet: ${response}`);
    }, 1000);
}

async function getBotResponse(userMessage) {
    const response = await fetch('https://api-inference.huggingface.co/models/BAAI/bge-base-en-v1.5', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: userMessage })
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Error from API:", error);
        return "I'm sorry, I couldn't understand that.";
    }

    const data = await response.json();
    return data.generated_text || "I'm not sure how to respond.";
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto scroll to bottom
}
