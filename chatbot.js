const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;
let apiKey = localStorage.getItem('apiKey'); // Retrieve the API key from local storage

// Function to prompt for API key if not already stored
const promptForApiKey = () => {
    if (!apiKey) {
        apiKey = prompt('Open "https://aistudio.google.com/", Create APi key and Enter your API key:');
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey); // Save the API key in local storage
        } else {
            alert('API key is required to use the chatbot.');
        }
    }
};



// Function to create a chat <li> element
const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}





// Function to generate response using the API
const generateResponse = (chatElement, userMessage) => {
    const messageElement = chatElement.querySelector("p");
    // Define the properties and message for the API request
    // const apiKey = 'AIzaSyBenOByFdE0HykRMOqpSSobuxc4ds3iJGU';
    // const apiKey = 'AIzaSyBOUtCHCIjDouEeBDvjugj5c-Mm0kAAOh8';
    if (!apiKey) {
        messageElement.textContent = "API key not provided.";
        return;
    }
    // const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;
    // const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey;
    const requestBody = {
        contents: [{
            parts: [{
                text: userMessage
            }]
        }]
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            messageElement.textContent = data.candidates[0].content.parts[0].text;
        })
        .catch(error => {
            // console.error(error);
            messageElement.textContent = "I cannot respond to that!";
        });

}





// Function to handle user chat
const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;
    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        let copyButton = document.createElement("img");
        copyButton.src = "https://cdn-icons-png.flaticon.com/128/1828/1828249.png";
        Object.assign(copyButton.style, {
            "height": "20px",
            "width": "20px",
            "cursor": "pointer"
        });
        copyButton.addEventListener("click", function () {
            navigator.clipboard.writeText(incomingChatLi.textContent.replace("COPY", "").replace("smart_toy", ""));
            copyButton.src = "https://cdn-icons-png.flaticon.com/128/5610/5610944.png";
            setTimeout(function () {
                copyButton.src = "https://cdn-icons-png.flaticon.com/128/1828/1828249.png";
            }, 3000);
        });
        incomingChatLi.appendChild(copyButton)
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi, userMessage);
    }, 600);
}
chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});





// press enter key to search for the query
chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});





// Add click event listener to send chat button
sendChatBtn.addEventListener("click", handleChat);
// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
const chatbotContainer = document.querySelector('.chatbot');





// Function to close the chatbot
const closeChatbot = () => {
    document.body.classList.remove('show-chatbot');
};





// Event listener for close button
closeBtn.addEventListener('click', () => closeChatbot());
// Event listener for chatbot toggler
chatbotToggler.addEventListener('click', () => {
    document.body.classList.toggle('show-chatbot');
    if (document.body.classList.contains('show-chatbot')) {
        promptForApiKey(); // Prompt for API key if chatbot is opened
        focusChatInput();
    }
});





// Event listener to close chatbot when clicked outside
document.addEventListener('click', (event) => {
    if (!chatbotContainer.contains(event.target) && !chatbotToggler.contains(event.target)) {
        closeChatbot();
    }
});





// Function to focus on chat input textarea
const focusChatInput = () => {
    if (chatInput) {
        chatInput.focus();
    }
};





// short cut key for chatbot "alt+b"
document.addEventListener('keydown', function(event) {
  if (event.altKey && event.key === 'b') {
    event.preventDefault(); // Prevent default browser behavior
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    if (chatbotToggler) {
      document.body.classList.toggle('show-chatbot');
        promptForApiKey(); // Prompt for API key if chatbot is opened
        focusChatInput();
        console.log("chatbot button pressed");
    }
  }
});