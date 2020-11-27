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
    for (var user in app.users)
        if(user.email == email && user.password == password ) {
            current_user = user;
            return true;
        }  
    return false;
}

function register(first_name, last_name, email, password, account_type) {
    for (var user in app.users)
        if(user.email == email)
            return false;
    new_user = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email, 
        "password": password, 
        "account-type": account_type
    }
    app.users[app.users.length] = new_user;
    const fs = require('fs');
    fs.writeFileSync("./app.json",app);
    return true;
}

function is_seller() {
    if(current_user.account_type == "true")
        return true;
    return false;
}

function get_products() {
    var products = [];
    for (var product in app.products) {
        products.push(product);
    }
    return products;
}

function get_products(category) {
    var products = [];
    for (var product in app.products) {
        if(product.category == category)
            products.push(product);
    }
    return products;
}

function get_products_ordered() {
    var products = [];
    for (var product in app.products) {
        if(product.buyer_email == current_user.email)
            products.push(product);
    }
    return products;
}
