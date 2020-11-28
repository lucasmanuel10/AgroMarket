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
                Cart: [],
                History: []
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

function sell_product(email, product_name, description, stock,price, category,market, delivery, image, callback) {
    firebase.database().ref('product/' + product_name).set({
        ProductName: product_name,
        Description: description,
        Stock: stock,
        Price: price,
        Category: category,
        Market: market,
        Image: image,
        Seller: email,
        Delivery: delivery 
    }).then(function(){
      callback();  
    });    
}

function get_product(product_name, callback) {
    firebase.database().ref('product/' + product_name).once('value').then(function(snapshot){
        var product = snapshot.val();
        callback(product);
    });
}

function get_products(callback) {
    firebase.database().ref('product/').once('value').then(function(snapshot){
        var products = snapshot.val();
        console.log(products);
        if(products == null) {
            products_ = []; 
            callback(products_);  
        } else {
           var products_ = [];
          
           snapshot.forEach(function(childSnapshot) {
                products_.push(childSnapshot.toJSON());
           }); 
           callback(products_);    
        }
    });  
}



function get_products_(callback, category) {
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

function add_to_cart(email, product_name) {
    firebase.database().ref('products/' + product_name).once('value').then(function(snapshot){
        var stock = snapshot.val().Stock;
        if(stock > 0 ) {
            firebase.database().ref('users/' + email.split("@")[0]).once('value').then(function(snapshot) {
                var cart = snapshot.val().cart; 
                cart.push(product_name);
                firebase.database().ref('users/' + email.split("@")[0]).set({
                    Cart: cart
                });
                callback(cart);
            });
        } else {
            var cart = [];
            callback(cart);
        }
    });  
}
