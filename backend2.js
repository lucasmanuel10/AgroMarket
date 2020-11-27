var users = null;
var products = null;
var current_user = null;

function load_json() {
    fetch('users.json')
  .then(response => response.json())
  .then(text => users = text) 
  fetch('products.json')
  .then(response => response.json())
  .then(text => products = text)
  console.log(users) ;
}

function login(email, password) {
    current_user = users.getElementById(email);
    if(current_user == null || current_user.getElementById(password))
        return false;
    return true;
}

function register(email, password, account_type) {
    current_user = users.getElementById(email);
    if(current_user != null)
        return false;
    current_user = {
        "email": email, 
        "password": password, 
        "account-type": account_type
    }
    return true;
}




