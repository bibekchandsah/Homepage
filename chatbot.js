const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement, userMessage) => {
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    // const requestOptions = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${API_KEY}`
    //     },
    //     body: JSON.stringify({
    //         model: "gpt-3.5-turbo",
    //         messages: [{ role: "user", content: userMessage }],
    //     })
    // }

    // // Send POST request to API
    // fetch(API_URL, requestOptions)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log("API Response:", data);
    //         messageElement.textContent = data.choices[0].message.content.trim();
    //     })
    //     .catch(error => {
    //         console.error("API Request Error:", error);
    //         messageElement.classList.add("error");
    //         messageElement.textContent = "Oops! Something went wrong. Please try again.";
    //     })
    //     .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));

    const apiKey = 'AIzaSyC3v3xmOJKBZMBhW2lVC8pa4QzecMv1lGU';
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;

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
            console.log(data);
            messageElement.textContent = data.candidates[0].content.parts[0].text;
        })
        .catch(error => {
            messageElement.textContent = "I cannot respond to that!";
        });

}


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
        })

        copyButton.addEventListener("click", function () {
            navigator.clipboard.writeText(incomingChatLi.textContent.replace("COPY", "").replace("smart_toy", ""));
            copyButton.src = "https://cdn-icons-png.flaticon.com/128/5610/5610944.png";


            setTimeout(function () {
                copyButton.src = "https://cdn-icons-png.flaticon.com/128/1828/1828249.png";
            }, 3000);
        })

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

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));