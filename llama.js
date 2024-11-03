const accessToken = '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'; // Your Hugging Face access token

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sendBtn").onclick = async function () {
        const userInput = document.getElementById("userInput").value;
        const chatBox = document.getElementById("chatBox");

        chatBox.innerHTML += `<p>You: ${userInput}</p>`;
        
        try {
            const botResponse = await getBotResponse(userInput);
            chatBox.innerHTML += `<p>AI: ${botResponse}</p>`;
        } catch (error) {
            chatBox.innerHTML += `<p>AI: Sorry, something went wrong.</p>`;
        }

        document.getElementById("userInput").value = ""; // Clear the input field
    };

    // Allow sending message with Enter key
    document.getElementById("userInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            document.getElementById("sendBtn").click();
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
