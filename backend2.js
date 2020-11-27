var app = null;
var current_user = null;

function load_json() {
    fetch('teste.json')
  .then(response => response.json())
  .then(text => aux(text)) 
    
}

function aux(text) {
    console.log(text);
}
function login(email, password) {
    for (user in app.getElementById("users"))
        if(user.getElementById("email").normalize == email.normalize && user.getElementById("password").normalize == password.normalize )
            return true;
    return false;
}

function register(email, password, account_type) {
    for (user in app.getElementById("users"))
        if(user.getElementById("email").normalize == email.normalize)
            return false;
    new_user = {
        "email": email, 
        "password": password, 
        "account-type": account_type
    }
    app.getElementById("users")[app.getElementById("users").length()] = new_user;
    return true;
}






