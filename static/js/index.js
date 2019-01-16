var socket = io();

/* === AJAX REQUESTS === */
function get(url, data, next) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            value = JSON.parse(this.response);
            next(value);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(data);
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

window.onload = function() {
    loadChatMessages();
}

window.onmouseup = function() {
    if (grid) {
        grid.render();
    }
}