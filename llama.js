const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const messages = document.getElementById('messages');

sendButton.onclick = async () => {
    const inputText = userInput.value;
    if (!inputText) return;

    // Display user's message
    messages.innerHTML += `<div>User: ${inputText}</div>`;
    userInput.value = '';

    // Call the AI model
    const response = await getBotResponse(inputText);
    messages.innerHTML += `<div>AI: ${response}</div>`;
    messages.scrollTop = messages.scrollHeight; // Scroll to bottom
};

async function getBotResponse(userInput) {
    const response = await fetch('https://api-inference.huggingface.co/models/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_HUGGING_FACE_TOKEN`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: userInput })
    });

    if (!response.ok) {
        console.error('Error from API:', response.statusText);
        return 'Error: Unable to fetch response';
    }

    const data = await response.json();
    return data.generated_text || 'No response generated.';
}
