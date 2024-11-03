async function getBotResponse(userMessage) {
    const response = await fetch('https://api-inference.huggingface.co/models/openai-community/gpt2', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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', // Your API token
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: userMessage })
    });

    // Check if the response is OK (status code 200)
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error from API:', errorMessage);
        return "Sorry, I couldn't get a response from the AI. Please try again.";
    }

    const data = await response.json();
    // Ensure data[0] exists before accessing generated_text
    if (data && data.length > 0 && data[0].generated_text) {
        return data[0].generated_text;
    } else {
        console.error('Unexpected response structure:', data);
        return "Sorry, there was an issue processing your request.";
    }
}

// Function to handle sending messages
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return; // Don't send empty messages

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
    const sendButton = document.getElementById('send-button');
    sendButton.onclick = sendMessage; // Set the click event for the send button

    document.getElementById('user-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage(); // Call sendMessage function on Enter key press
            event.preventDefault(); // Prevent the default action (like a form submission)
        }
    });
});
