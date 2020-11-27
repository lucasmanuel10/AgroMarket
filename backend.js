var app = null;
var current_user = null;

function load_json() {
    fetch('app.json')
  .then(response => response.json())
  .then(text => aux(text))     
}

function aux(text) {
    app = text;
}

function login(email, password) {
    for (user in app.users)
        if(user.email.normalize == email.normalize && user.password.normalize == password.normalize ) {
            current_user = user;
            return true;
        }  
    return false;
}

function register(first_name, last_name, email, password, account_type, ) {
    for (user in app.users)
        if(user.email.normalize == email.normalize)
            return false;
    new_user = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email, 
        "password": password, 
        "account-type": account_type
    }
    app.users[app.users.length()] = new_user;
    current_user = user;
    return true;
}







