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
    xhttp.send(data);
}

/* === CHATBOX === */
var messageWrapper = document.getElementById("messages-wrapper");
var messageBox = document.getElementById("messages");
var typeField = document.getElementById("typefield");

function scrollDown() {
    messageWrapper.scrollTop = messageWrapper.scrollHeight;
}

messageBox.writeMessage = function (timestamp, username, content) {
    this.innerHTML += 
        "<div class=message>" 
        + timestamp + " " 
        + username + " : "
        + content + "</div>"
}

messageBox.clear = function() {
    this.innerHTML = "";
}

function loadChatMessages() {

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
    messageBox.writeMessage(content.timestamp, content.username, content.message);
    if (is_bottom) {
        scrollDown();
    }
});

window.onload = function() {
    scrollDown();
}