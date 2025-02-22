
let backgroundSet = false;

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const userText = inputField.value.trim();
    
    if (userText === "") return;

    // Set background image only once
    if (!backgroundSet) {
        document.body.style.backgroundImage = "url('images/blog-ai-chatbots.png')";
        document.body.style.backgroundSize = "cover";
        backgroundSet = true;
    }

    // Create User Message Element
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = "You: " + userText;
    chatBox.appendChild(userMessage);
    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Add Typing Indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.innerHTML = "<span>.</span><span>.</span><span>.</span>"; // Typing animation
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send Request to Flask API
    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Bot Response:", data);  // Debugging Line

        // Remove Typing Indicator
        chatBox.removeChild(typingIndicator);

        // Create Bot Message Element
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.textContent = "Bot: " + data.response.replace(/\n/g, "\n");  // Prevent HTML injection
        
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        chatBox.removeChild(typingIndicator);

        const errorMessage = document.createElement("div");
        errorMessage.classList.add("message", "bot-message");
        errorMessage.textContent = "Bot: Sorry, something went wrong. Please try again later.";
        chatBox.appendChild(errorMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Allow Enter key to send messages
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
=======
let backgroundSet = false;

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const userText = inputField.value.trim();
    
    if (userText === "") return;

    // Set background image only once
    if (!backgroundSet) {
        document.body.style.backgroundImage = "url('images/blog-ai-chatbots.png')";
        document.body.style.backgroundSize = "cover";
        backgroundSet = true;
    }

    // Create User Message Element
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = "You: " + userText;
    chatBox.appendChild(userMessage);
    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Add Typing Indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.innerHTML = "<span>.</span><span>.</span><span>.</span>"; // Typing animation
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send Request to Flask API
    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Bot Response:", data);  // Debugging Line

        // Remove Typing Indicator
        chatBox.removeChild(typingIndicator);

        // Create Bot Message Element
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.textContent = "Bot: " + data.response.replace(/\n/g, "\n");  // Prevent HTML injection
        
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        chatBox.removeChild(typingIndicator);

        const errorMessage = document.createElement("div");
        errorMessage.classList.add("message", "bot-message");
        errorMessage.textContent = "Bot: Sorry, something went wrong. Please try again later.";
        chatBox.appendChild(errorMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Allow Enter key to send messages
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

