document.getElementById("send-btn").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value;
    if (userInput) {
        appendMessage("You: " + userInput);
        getBotResponse(userInput);
    }
});

function appendMessage(message) {
    const messagesDiv = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
}

function getBotResponse(userInput) {
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        appendMessage("Bot: " + data.response);
    })
    .catch(error => {
        appendMessage("Bot: I'm sorry, I couldn't understand that.");
    });
}
