import {io} from 'socket.io-client';

let screen = document.getElementById("message-container");
let messageInput = document.getElementById("message-input");
let userInput = document.getElementById("user-input");
let connectButton = document.getElementById("user-button");
const form = document.getElementById("form");

const socket = io("http://localhost:4000");

socket.on("connect", () => {
    showMessage("Connected to Spirit Chat System");
});

socket.on("receiveMessage", (message) => {
    showMessage(message, "received");
});

form.addEventListener('submit', e =>{
    e.preventDefault();
    if(messageInput.value === '') return;
    showMessage(messageInput.value, "sent");
    socket.emit('sendMessage', messageInput.value, userInput.value);
    messageInput.value = '';
});

connectButton.addEventListener('click', e =>{
    e.preventDefault();
    if(userInput.value === '') return;
    socket.emit('userConnect', userInput.value, message =>{
        showMessage(message);
    });
})

function showMessage(message, user){
    const div = document.createElement("div",);
    div.textContent = message;
    div.setAttribute("class", user);
    screen.appendChild(div);
};