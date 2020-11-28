var database = null;
var current_user = null;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBSnUkR2G22khdwPxWkJ3AdY1PmmuiKFpw",
    authDomain: "fir-js-67501.firebaseapp.com",
    databaseURL: "https://fir-js-67501.firebaseio.com",
    projectId: "fir-js-67501",
    storageBucket: "fir-js-67501.appspot.com",
    messagingSenderId: "367010020114",
    appId: "1:367010020114:web:b21f92d0652acdb17111cb",
    measurementId: "G-30WDYQMQLB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


function login(email, password) {
    var user = null;
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
    var user = null;
  
    database.ref('users/' + email.split("@")[0]).on('value', function(snapshot) { 
        user = snapshot.val; 
    });
    if(user == null)
        return false;

    firebase.database.ref('users/' + email).set({
        FirstName: first_name,
        LastName: last_name,
        Email: email.split("@")[0],
        Password: password,
        AccountType: account_type
     })
    return true;
        
     
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
