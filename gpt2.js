async function getBotResponse(userInput) {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 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', // Your Hugging Face token
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: userInput }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response from API:', data); // Log the response for debugging
                if (data && data[0] && data[0].generated_text) {
                    return data[0].generated_text;
                } else {
                    return "I'm sorry, I didn't understand that.";
                }
            } else if (response.status === 503) {
                console.warn('Service unavailable, retrying...');
                attempt++;
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
            } else {
                throw new Error('Response not OK');
            }
        } catch (error) {
            console.error('Error getting response from bot:', error);
            return "Sorry, there was an error connecting to the AI.";
        }
    }
    return "Sorry, I'm unable to connect to the AI right now. Please try again later.";
}
