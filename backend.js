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


function login(email, password) {
    var user = null;
    firebase.database().ref('users/' + email.split("@")[0]).once('value').then(function(snapshot){
        user = snapshot.val(); 
    });
    console.log(user);
    if(user == null || user.Password!=password)
        return false;
    return true;
}

function register(first_name, last_name, email, password, account_type) {
    var user = null;
  
    firebase.database().ref('users/' + email.split("@")[0]).on('value', function(snapshot) { 
        user = snapshot.val(); 
    });
    if(user != null)
        return false;

    firebase.database().ref('users/' + email.split("@")[0]).set({
        FirstName: first_name,
        LastName: last_name,
        Email: email,
        Password: password,
        AccountType: account_type
     });
    return true;
        
     
}


function get_products() {
    var products = null;
    firebase.database().ref('products/').on('value', function(snapshot) { 
        products = snapshot.val(); 
    });
    if (products == null)
        return [];
    return products;
}


function get_products(category) {
    var products = null;
    firebase.database().ref('products/' + category).on('value', function(snapshot) { 
        products = snapshot.val(); 
    });
    if (products == null)
        return [];
    return products;
}

function get_products_ordered(email) {
    var products = null;
    firebase.database().ref('products/').on('value', function(snapshot) { 
        products = snapshot.val(); 
    });
    if (products == null)
        return [];
    user_products = [];
    for (product in products) {
        if(product.Buyer == email.split("@")[0])
            user_products.push(product);
    }
    return products;
}
