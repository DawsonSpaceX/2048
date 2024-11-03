document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function getBotResponse(userMessage) {
    const thinkingAnimation = document.getElementById("thinking-animation");
    thinkingAnimation.classList.remove("hidden");
    thinkingAnimation.innerHTML = "Comet is thinking...";

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
        thinkingAnimation.classList.add("hidden");
        return `Error: ${error.error || 'Something went wrong. Please try again later.'}`;
    }

    const data = await response.json();
    thinkingAnimation.classList.add("hidden");
    return data.generated_text || "I'm not sure how to respond.";
}

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value;
    if (!userMessage.trim()) return;

    addMessageToChat('User: ' + userMessage);
    userInput.value = '';

    const botResponse = await getBotResponse(userMessage);
    addMessageToChat('Comet: ' + botResponse);
}

function addMessageToChat(message) {
    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");
    messageElement.innerText = message;

    // Typing effect for bot responses
    if (message.startsWith('Comet:')) {
        const typingElement = document.createElement("span");
        typingElement.className = "typing-animation";
        typingElement.innerText = '';
        messageElement.appendChild(typingElement);
        chatbox.appendChild(messageElement);

        // Simulate typing
        let i = 0;
        const fullMessage = message.replace('Comet: ', '');
        const typingInterval = setInterval(() => {
            if (i < fullMessage.length) {
                typingElement.innerText += fullMessage.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50); // Adjust speed here
    } else {
        chatbox.appendChild(messageElement);
    }

    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

function openSettings() {
    alert("Settings are not yet implemented.");
}
