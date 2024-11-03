const accessToken = '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'; // Your Hugging Face access token

// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    sendBtn.onclick = async function () {
        const userMessage = userInput.value;
        chatBox.innerHTML += `<p>You: ${userMessage}</p>`;
        
        try {
            const botResponse = await getBotResponse(userMessage);
            chatBox.innerHTML += `<p>AI: ${botResponse}</p>`;
        } catch (error) {
            chatBox.innerHTML += `<p>AI: Sorry, something went wrong.</p>`;
        }

        userInput.value = ""; // Clear the input field
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    };

    // Allow sending message with Enter key
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendBtn.click();
        }
    });
});

async function getBotResponse(userInput) {
    const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: userInput })
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Error from API:", error);
        throw new Error(error.error);
    }

    const data = await response.json();
    return data[0].generated_text; // Adjust based on response structure
}
