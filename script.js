const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const chatArea = document.getElementById("chatArea");
const sidebar = document.querySelector(".sidebar");

// Send a message
chatForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = messageInput.value.trim();

    if (text === "") return;

    welcome.style.display = "none";

    addMessage(text, "user");
    messageInput.value = "";

    // Demo response (not connected to a real AI API)
    setTimeout(function () {
        addMessage(getReply(text), "ai");
    }, 400);
});

// Add a message to the chat
function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = "message";

    const avatar = document.createElement("div");
    avatar.className = "avatar " +
        (sender === "user" ? "user-avatar" : "ai-avatar");
    avatar.textContent = sender === "user" ? "A" : "✦";

    const content = document.createElement("div");
    content.className = "message-content";

    const name = document.createElement("strong");
    name.textContent = sender === "user" ? "You" : "My AI";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    content.appendChild(name);
    content.appendChild(paragraph);

    message.appendChild(avatar);
    message.appendChild(content);

    messages.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;
}

// Sample replies for demonstration
function getReply(text) {
    const question = text.toLowerCase();

    if (question.includes("html")) {
        return "HTML creates the structure of a webpage using headings, paragraphs, images, links and other elements.";
    }

    if (question.includes("css")) {
        return "CSS controls the appearance of a webpage, including colors, fonts, spacing, layouts and responsive design.";
    }

    if (question.includes("javascript")) {
        return "JavaScript makes websites interactive. You can use it for buttons, forms, animations and dynamic content.";
    }

    if (question.includes("hello") || question.includes("hi")) {
        return "Hello! Welcome to My AI. What would you like to learn today?";
    }

    if (question.includes("thank")) {
        return "You're welcome! Feel free to ask another question.";
    }

    return "This is a demo response. To receive real AI-generated answers, connect this website to an AI API through a secure backend.";
}

// Start a new chat
function newChat() {
    messages.innerHTML = "";
    welcome.style.display = "block";
    messageInput.value = "";
    sidebar.classList.remove("open");
    messageInput.focus();
}

// Clear messages
function clearChat() {
    messages.innerHTML = "";
    welcome.style.display = "block";
}

// Put a previous prompt into the input
function setPrompt(text) {
    messageInput.value = text;
    messageInput.focus();
    sidebar.classList.remove("open");
}

// Toggle dark mode
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// Mobile sidebar
function toggleSidebar() {
    sidebar.classList.toggle("open");
}

// Copy the example code
async function copyCode(button) {
    const code = button.parentElement.nextElementSibling.innerText;

    try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied!";

        setTimeout(function () {
            button.textContent = "Copy";
        }, 1500);
    } catch (error) {
        alert("Copy failed. Please select and copy the code manually.");
    }
}