var database = null;
var current_user = null;

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
firebase.initializeApp(firebaseConfig);
firebase.analytics();
database = firebase.database();


function login(email, password) {
    user = null;
    try {
        database.ref('users/' + email).on('value', function(snapshot) {
            user = snapshot.val; 
         });
         if(user.Password!=password)
            return false;
    } catch (error) {
        return false;
    }
    return true;
}

function register(first_name, last_name, email, password, account_type) {
    user = null;
    try {
        database.ref('users/' + email).on('value', function(snapshot) {
            user = snapshot.val; 
         });
    } catch (error) {
        database.ref('users/' + email).set({
            FirstName: first_name,
            LastName: last_name,
            Email: email,
            Password: password,
            AccountType: account_type
         })
        return true;
    }
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
