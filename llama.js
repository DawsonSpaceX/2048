const API_URL = "https://api-inference.huggingface.co/models/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF";
const API_TOKEN = "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"; // Replace with your actual token

document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value;
    if (userMessage.trim() === "") return;

    appendMessage("You: " + userMessage);
    inputField.value = "";

    const response = await getBotResponse(userMessage);
    appendMessage("AI: " + response);
}

async function getBotResponse(message) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: message })
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error from API:", errorMessage);
        return "Sorry, I couldn't process that.";
    }

    const data = await response.json();
    return data[0]?.generated_text || "Sorry, I couldn't understand that.";
}

function appendMessage(message) {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += "<div>" + message + "</div>";
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
