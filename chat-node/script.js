
const socket = new WebSocket('ws://localhost:3000');

const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Handle incoming messages
// socket.onmessage = (event) => {
//   const message = event.data;
//   displayMessage(message, 'received');
// };

socket.onmessage = async (event) => {
    let message;
    if (event.data instanceof Blob) {
      // Convert Blob to text
      message = await event.data.text();
    } else {
      message = event.data; // It's already plain text
    }
  
    displayMessage(message, 'received');
  };
  

// Send message to WebSocket server
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    socket.send(message); // Send message to the server
    displayMessage(message, 'sent'); // Show the message in the chat
    messageInput.value = ''; // Clear input field
  }
}

// Display message in the chat
function displayMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', type);
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
}
