const socket=io('http://localhost:8000');

const form=document.querySelector('.chat-form');
const Text=document.querySelector('#Text');
const btn=document.querySelector('#btn');
const messageDiv=document.querySelector('.messages');
const messageContainer=document.querySelector('.messageContainer');

const messages = document.querySelector(".messages");

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}


const name=prompt("Enter your name to join");
if(name){
    socket.emit('new-join',name);
}

function append(message,position){
    const div=document.createElement('div');
    div.innerText=message;
    div.classList.add('message');
    div.classList.add(position);
    messageDiv.appendChild(div);
    scrollToBottom();
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    append(`You: ${Text.value}`,'right');
    socket.emit('send',Text.value)
    Text.value='';
});
socket.on('user-joined',(name)=>{
    append(`${name} joined the chat`,'left');
});
socket.on('receive',(data)=>{
    append(`${data.name} : ${data.message}`,'left');
})
socket.on('left',(name)=>{
    append(`${name} left the chat`,'left');
})
