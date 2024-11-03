document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

let dotCount = 0;
const thinkingElement = document.getElementById("thinking-animation");
const dotsElement = document.getElementById("dots");

function updateThinkingAnimation() {
    dotsElement.innerText = '.'.repeat(dotCount);
    dotCount = (dotCount + 1) % 4; // Cycle through 0 to 3 dots
}

async function getBotResponse(userMessage) {
    thinkingElement.classList.remove("hidden");
    dotCount = 0;
    const thinkingInterval = setInterval(updateThinkingAnimation, 500);

    const response = await fetch('https://api-inference.huggingface.co/models/BAAI/bge-base-en-v1.5', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: userMessage })
    });

    clearInterval(thinkingInterval);
    thinkingElement.classList.add("hidden");

    if (!response.ok) {
        const error = await response.json();
        console.error("Error from API:", error);
        return `Error: ${error.error || 'Something went wrong. Please try again later.'}`;
    }

    const data = await response.json();
    return data.generated_text || "I'm not sure how to respond.";
}

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessageToChat('User: ' + userMessage);
    userInput.value = '';

    const botResponse = await getBotResponse(userMessage);
    addMessageToChat('Comet: ' + botResponse);
}

function addMessageToChat(message) {
    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");

    if (message.startsWith('Comet:')) {
        const typingElement = document.createElement("span");
        typingElement.className = "typing-animation";
        chatbox.appendChild(messageElement); // Append the message container first
        messageElement.appendChild(typingElement); // Then append the typing element

        // Simulate typing effect
        const fullMessage = message.replace('Comet: ', '');
        let i = 0;
        const typingInterval = setInterval(() => {
            typingElement.innerText += fullMessage.charAt(i);
            i++;
            if (i === fullMessage.length) {
                clearInterval(typingInterval);
            }
        }, 100); // Adjust speed here
    } else {
        messageElement.innerText = message;
        chatbox.appendChild(messageElement);
    }

    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}
