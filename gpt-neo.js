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

// Function to handle sending messages
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return; // Don't send empty messages

    // Display user message
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div class="user-message">User: ${userInput}</div>`;

    // Get bot response
    const botResponse = await getBotResponse(userInput);
    chatbox.innerHTML += `<div class="bot-message">Bot: ${botResponse}</div>`;

    // Clear the input
    document.getElementById('user-input').value = '';

    // Scroll to the bottom of chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Add event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for send button
    document.getElementById('send-button').onclick = sendMessage;

    // Event listener for Enter key
    document.getElementById('user-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage(); // Call sendMessage function on Enter key press
            event.preventDefault(); // Prevent the default action (like a form submission)
        }
    });
});
