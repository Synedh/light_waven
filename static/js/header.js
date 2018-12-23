var user = {};
var registerButton = document.getElementById("register");

function user_detail() {
    document.getElementById('user_detail').style.display = 'block';
}

function disconnect() {
    get("/disconnect", {}, function(response) {
        if (response)
            location.reload();
        console.log(response);
    });
}

document.forms["login"]
    .addEventListener("submit", function(event) {
        event.preventDefault();
        var data = {
            "login": this["login"].value,
            "password": this["password"].value
        }
        post("/login", data, function(response) {
            if (response)
                location.reload();
            console.log(response);
        });
});

document.forms["register"]
    .addEventListener("submit", function(event) {
        event.preventDefault();
        var data = {
            "login": this["login"].value,
            "password": this["password"].value,
            "email": this["email"].value
        }
        post("/register", data, function(response) {
        });
});

document.getElementById("register_login")
    .addEventListener("change", function(event) {
        var input = this;
        get("/user", {"login": this.value}, function(response) {
            if (response.length > 0) {
                input.setCustomValidity("Le pseudo \"" + input.value + "\" est déjà utilisé.")
                registerButton.disabled = true;
                registerButton.classList.add("invalid");
            } else {
                input.setCustomValidity("");
                registerButton.disabled = false;
                registerButton.classList.remove("invalid");
            }
        });
});

document.getElementById("register_email")
    .addEventListener("change", function(event) {
        var input = this;
        get("/user", {"email": this.value}, function(response) {
            if (response.length > 0) {
                input.setCustomValidity("L'email \"" + input.value + "\" est déjà utilisé.")
                registerButton.disabled = true;
                registerButton.classList.add("invalid");
            } else {
                input.setCustomValidity("");
                registerButton.disabled = false;
                registerButton.classList.remove("invalid");
            }
        });
});

document.getElementById("register_password_confirm")
    .addEventListener("keyup", function(event) {
        var passwordButton = document.getElementById("register_password");
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
var login_modal = document.getElementById("login_modal");
var register_modal = document.getElementById("register_modal");

function login_display() {
    login_modal.style.display = "block";
    document.getElementById('login_login').focus();
}

function login_close() {
    login_modal.style.display = "none";
    document.forms["login"].reset()
}

function register_display() {
    register_modal.style.display = "block";
}

function register_close() {
    register_modal.style.display = "none";
    document.forms["register"].reset();
}

window.onclick = function(event) {
    if (event.target == login_modal) {
        login_close(); 
    }
    if (event.target == register_modal) {
        register_close();  
    }
}