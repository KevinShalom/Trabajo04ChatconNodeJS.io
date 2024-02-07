

const socket = io();
const form = document.getElementById('form');
const mI = document.getElementById('messageInput');
const iI = document.getElementById('idInput');
const nI = document.getElementById('nickInput');
const mList = document.getElementById('messageList');


form.onsubmit = function(event) {

    event.preventDefault();

    message = {
      text: mI.value,
      student_id: iI.value,
      nick: nI.value,
    }

    socket.emit('chat message', message);

    mI.value = '';
    return false;
}

socket.on('chat message', function(message) {
    let li = document.createElement('li');
        let span = document.createElement('p');
        let nick = document.createTextNode(message.nick + ":   ");
        let p = document.createElement('p');
        let text = document.createTextNode(message.text);


        span.appendChild(nick);
        span.setAttribute('class', 'nick');

        p.appendChild(text);
        p.setAttribute('class', 'text');

        li.appendChild(span);
        li.appendChild(p);
        li.setAttribute('class', 'message is-success');

        document.getElementById('messageList').appendChild(li);
});

function getMessages() {

    fetch('http://34.210.35.174:7000')
      .then(response => response.json())
      .then(response => showMessages(response));
}


function showMessages(messages) {

    console.log(messages);
    for (let i in messages) {
        let li = document.createElement('li');
        let span = document.createElement('p');
        let nick = document.createTextNode(messages[i].nick + ":   ");
        let p = document.createElement('p');
        let text = document.createTextNode(messages[i].text);


        span.appendChild(nick);
        span.setAttribute('class', 'nick');

        p.appendChild(text);
        p.setAttribute('class', 'text');

        li.appendChild(span);
        li.appendChild(p);
        li.setAttribute('class', 'message');

        if (messages[i].student_id == '15041') {
          li.setAttribute('class', 'message is-success');
        }

        document.getElementById('messageList').appendChild(li);
    }
}

window.onload = function() {
    getMessages();
} 