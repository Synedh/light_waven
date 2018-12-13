var socket = io();

/* === AJAX REQUESTS === */
function get(url, next) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            value = JSON.parse(this.response);
            next(value);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function post(url, data, next) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            value = JSON.parse(this.response);
            next(value);
        }
    }
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));
}

/* === AUTHENTIFICATION === */
user_id = "";

document.forms["login"]
    .addEventListener("submit", function(event) {
        event.preventDefault();
        var data = {
            "login": this["login"].value,
            "password": this["password"].value
        }
        post('/login', data, function(response) {
            console.log(response);
        })
});

document.forms["register"]
    .addEventListener("submit", function(event) {
        event.preventDefault();
        var data = {
            "login": this["login"].value,
            "password": this["password"].value,
            "email": this["email"].value
        }
        post('/register', data, function(response) {
            console.log(response);
        })
});

document.getElementById("register_password_confirm")
    .addEventListener("keyup", function(event) {
        var passwordButton = document.getElementById("register_password");
        var registerButton = document.getElementById("register");
        if (this.value != passwordButton.value) {
            this.setCustomValidity("Differents passwords.");
            passwordButton.setCustomValidity("Differents passwords.");
            registerButton.disabled = true;
            registerButton.classList.add("invalid");
        } else {
            this.setCustomValidity("");
            passwordButton.setCustomValidity("");
            registerButton.disabled = false;
            registerButton.classList.remove("invalid");
        }
});

/* Modal */
var login_modal = document.getElementById('login_modal');
var register_modal = document.getElementById('register_modal');

function login_display() {
    login_modal.style.display = "block";
}

function login_close() {
    login_modal.style.display = "none";
}

function register_display() {
    register_modal.style.display = "block";
}

function register_close() {
    register_modal.style.display = "none";
}

/* === CHATBOX === */
var chatBox = document.getElementById("chatbox");
var messageWrapper = document.getElementById("messages-wrapper");
var messageBox = document.getElementById("messages");
var typeField = document.getElementById("typefield");
var messages = { "general": []};
var currentChan = "general";

function scrollDown() {
    messageWrapper.scrollTop = messageWrapper.scrollHeight;
}

function showChanList() {
    var pannel = document.createElement('div');
    pannel.setAttribute('class', 'chan_list');
    pannel.setAttribute('id', 'chan_list');
    for (var i = 0; i < Object.keys(messages).length; i++) {
        var chan = document.createElement('div');
        chan.setAttribute('class', 'chan');
        chan.innerHTML = Object.keys(messages)[i];
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
    socket.emit("get_messages", ['general'])
}

typeField.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        socket.emit("chat_message", this.value);
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


/* === WINDOW GLOBAL FUNCTIONS === */

window.onload = function() {
    loadChatMessages();
}

window.onclick = function(event) {
  if (event.target == login_modal) {
    login_modal.style.display = "none";
  }
  if (event.target == register_modal) {
    register_modal.style.display = "none";
  }
}