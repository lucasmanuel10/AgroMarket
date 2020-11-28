var database = null;
var current_user = null;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyA2JNM8baGJWfSa59WQd3-8P-9zqC9TV3U",
    authDomain: "projeto1-cbb1a.firebaseapp.com",
    databaseURL: "https://projeto1-cbb1a.firebaseio.com",
    projectId: "projeto1-cbb1a",
    storageBucket: "projeto1-cbb1a.appspot.com",
    messagingSenderId: "366062903132",
    appId: "1:366062903132:web:f319507ffa693e32fd2b99",
    measurementId: "G-T5155MKZ4N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


function login(email, password, callback) {
    var user = null;
    firebase.database().ref('users/' + email.split("@")[0]).once('value').then(function(snapshot){
        user = snapshot.val();
        var x = true;
        if(user == null || user.Password!=password)
            x = false;
        callback(x);
    });
}

function register(first_name, last_name, email, password, account_type, callback) {
    var user = null;
  
    firebase.database().ref('users/' + email.split("@")[0]).once('value').then(function(snapshot){
        user = snapshot.val();
        var x = true;
        if(user != null)
            x = false;
        else {
            firebase.database().ref('users/' + email.split("@")[0]).set({
                FirstName: first_name,
                LastName: last_name,
                Email: email,
                Password: password,
                AccountType: account_type,
                Cart: []
            });
            x = true;
         } 
        callback(x);
    });    
}

function is_seller(email, callback) {
    firebase.database().ref('users/' + email.split("@")[0]).once('value').then(function(snapshot) {
        var x = true;
        var user= snapshot.val();
        if(user.AccountType != true)
            x = false;
        callback(x);
    });
}

function sell_product(email, product_name, description, stock,price, category,market, image, callback) {
    firebase.database().ref('product/' + product_name).set({
        ProductName: product_name,
        Description: description,
        Stock: stock,
        Price: price,
        Category: category,
        Market: market,
        Image: image,
        Seller: email,
        Buyer: ""
    });     
}

function get_products(callback) {
    firebase.database().ref('products/').once('value').then(function(snapshot){
        var products = snapshot.val(); 
        if(products == null)
            products = []; 
        callback(products);  
    });  
}


function get_products(callback, category) {
    firebase.database().ref('products/' + category).once('value').then(function(snapshot){
        var products = snapshot.val(); 
        if(products == null)
            products = []; 
        callback(products);  
    });  
}

function get_products_ordered(email) {
    firebase.database().ref('products/').once('value').then(function(snapshot){
        var products = snapshot.val();
        if (products == null)
            products = [];
        else {
            var user_products = [];
            for (product in products) {
                if(product.Buyer == email.split("@")[0])
                    user_products.push(product);
            }
            products = user_products;
        }
        callback(products);
    });
}

function get_shopping_cart(email) {
    firebase.database().ref('users/' + email.split("@")[0]).once('value').then(function(snapshot) {
        var cart = snapshot.val().cart; 
        callback(cart);
    });
}
