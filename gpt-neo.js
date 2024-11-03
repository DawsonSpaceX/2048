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

    console.log("User Input:", userInput); // Log the user input
    const botResponse = await getBotResponse(userInput);
    
    document.getElementById('chatbox').innerHTML += `<div>User: ${userInput}</div>`;
    document.getElementById('chatbox').innerHTML += `<div>Bot: ${botResponse}</div>`;
    document.getElementById('user-input').value = ''; // Clear input after sending
}

// Add event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for send button
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.onclick = sendMessage;
    } else {
        console.error("Send button not found!"); // Log if button not found
    }

    // Event listener for Enter key
    document.getElementById('user-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage(); // Call sendMessage function on Enter key press
            event.preventDefault(); // Prevent the default action (like a form submission)
        }
    });
});
