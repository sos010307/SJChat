var socket = io();

socket.on("connect", function(){
    var name = prompt("반갑습니다. 당신은 누구시죠?", "");
    if(!name)
        name="익명의 유저";
    socket.emit("newUser", name);
})

// 서버로부터 데이터를 받을때 실행
socket.on("update", function(data){
    var chat = document.getElementById('chat');

    var message = document.createElement('p');
    var node = data.name == "SERVER" ? document.createTextNode(`${data.message}`) : document.createTextNode(`${data.name} : ${data.message}`);
    var className = ''

    switch(data.type) {
        case 'message':
            className = 'other'
            break

        case 'connect':
            className = 'connect'
            break
        case 'disconnect':
            className = 'disconnect'
            break
    }

    message.classList.add(className);
    message.appendChild(node)
    chat.appendChild(message)
    console.log(`${data.name} : ${data.message}`);
})

function send(){
    var message = document.getElementById("test").value;
    document.getElementById("test").value = "";

    var chat = document.getElementById('chat');
    var msg = document.createElement('p');
    var node = document.createTextNode(message);
    msg.classList.add("me");
    msg.appendChild(node);
    chat.appendChild(msg);

    socket.emit("message", {type: 'message', message: message});
}