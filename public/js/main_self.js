const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-message');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
// get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// console.log(username, room)

const socket = io()

// join chatroom
socket.emit('joinroom', { username, room })

//  get roo  sur
socket.on('roomUsers', ({ room , users }) => {
    outputRoomName(room);
    outputUsers(users);
})

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // scroll down
    chatMessage.scrollTop = chatMessage.scrollWidth;
});
// message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    socket.emit('cahtMessage',msg);

    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})
// output message from dom
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML= `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.caht-message').appendChild(div);
}
// add room name to dom 
function outputRoomName(room) {
 roomName.innerText = room;
}
function outputUsers(users) {
    userList.innerText = `
    ${usrs.map(user => `<li>${user.username}</li>`).join('')}`;
}