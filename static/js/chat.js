var chatBox = document.getElementById("chatbox");
var messageWrapper = document.getElementById("messages-wrapper");
var messageBox = document.getElementById("messages");
var typeField = document.getElementById("typefield");
console.log(window.appConfig.user);
var user = JSON.parse(window.appConfig.user);
var messages = [{ name: "general", type: "general", users: [], messages: [] }];
var currentChan = 0;

function scrollDown() {
    messageWrapper.scrollTop = messageWrapper.scrollHeight;
}

function showChanList() {
    var pannel = document.createElement("div");
    pannel.setAttribute("class", "chan_list");
    pannel.setAttribute("id", "chan_list");
    for (var i = 0; i < messages.length; i++) {
        var chan = document.createElement("div");
        chan.setAttribute("class", "chan"); 
        chan.innerHTML = messages[i]['name'];
        pannel.appendChild(chan);
    }
    chatBox.appendChild(pannel);
}

messageBox.writeMessage = function (message) {
    this.innerHTML += 
        "<div class=message>" 
        + message.timestamp + " " 
        + message.username + " : "
        + message.message + "</div>";
}

messageBox.clear = function() {
    this.innerHTML = "";
}

function loadChatMessages() {
    socket.emit("get_messages", ["general"])
}

typeField.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        var message = 
            {
                "channel_type": messages[currentChan]["type"],
                "channel_name": messages[currentChan]["name"],
                "channel_users": messages[currentChan]["users"],
                "user_id": user.id,
                "message": this.value
            };
        console.log(message);
        socket.emit(
            "chat_message", message
        );
        this.value = "";
    }
});

socket.on("chat_message", function(content) {
    var is_bottom = messageWrapper.scrollTop === messageWrapper.scrollTopMax;
    messageBox.writeMessage(content);
    if (is_bottom) {
        scrollDown();
    }
});

socket.on("get_messages", function(content) {
    messages = content;
    for (var i = 0; i < messages[currentChan].length; i++) {
        messageBox.writeMessage(messages[current_chan][i]);
    }
    scrollDown();
});

socket.on("join", function(chan) {
    console.log(chan);
});

window.onload = function() {
    loadChatMessages();
}

window.onclick = function(event) {
    if (document.getElementById('chan_list')
        && event.target.id != 'chan_list'
        && !event.target.classList.contains('chan')) {
        console.log('test');
        document.getElementById('chan_list').outerHTML = "";
    }
}