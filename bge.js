async function getBotResponse(input) {
    const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: input })
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Error from API:", error);
        return "I'm not sure how to respond.";
    }

    const data = await response.json();
    return data.embedding; // Adjust based on your needs
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.className = sender;
    messageElement.innerHTML = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
}

document.getElementById("sendButton").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    appendMessage("User", userInput);
    document.getElementById("userInput").value = "";

    const response = await getBotResponse(userInput);
    appendMessage("CometAI", response);
});
