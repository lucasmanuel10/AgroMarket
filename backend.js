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

function get_user(email, callback) {
    firebase.database().ref('users/' + email.split("@")[0]).once('value').then(function(snapshot){
        callback(snapshot.toJSON());
    });
}


function change_account_type(email, type, callback) {
    firebase.database().ref('users/' + email.split("@")[0]).update({
        AccountType: type
      });
      callback();
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

function get_shopping_cart(email, callback) {
    var cart= [];
    firebase.database().ref('users/' + email.split("@")[0] + '/Cart').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            cart.push(childSnapshot.toJSON());
       }); 
       callback(cart);
    });
}

function has_shopping_cart(email, callback) {
    firebase.database().ref('users/' + email.split("@")[0]).once('value').then(function(snapshot) {
        var cart = snapshot.val().Cart;
        if(cart!=null) {
            var length = 0;
            firebase.database().ref('users/' + email.split("@")[0] + '/Cart').once('value').then(function(snap) {
                snap.forEach(function(childSnapshot) {
                    length++;
                });
                callback(length);
            });
        } else
            callback(0);
    });
}

function add_to_cart(email, product_name, quantity, callback) {
    firebase.database().ref('product/' + product_name).once('value').then(function(snapshot){
        var product = snapshot.val();
        if(product.Stock > quantity) {
            firebase.database().ref('users/' + email.split("@")[0] + '/Cart/' + product_name).set({
                ProductName: product.ProductName,
                Quantity: product.Stock,
                Image: product.Image,
                Description: product.Description,
                Market: product.Market,
                Seller: product.Seller,
                Price: product.Price
            });
            callback(product);
        } else {
            callback("jebaited");
        } 
    });   
}

function remove_from_cart(email, product_name, callback) {     
    firebase.database().ref('users/' + email.split("@")[0] + '/Cart/' + product_name).remove();  
    callback();
}

function finish_purchase(email,montante, callback) {
    var order = Math.round(Math.random()*10000); 
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var completeDate = day + "/" + month + "/" + year;
    firebase.database().ref('users/' + email.split("@")[0] + '/History/' + order).set({
        Order: order,
        State: "Concluído",
        Date:  completeDate,
        Total: montante
    }); 
    firebase.database().ref('users/' + email.split("@")[0] + '/Cart/').once('value').then(function(snapshot) {  
        snapshot.forEach(function(childSnapshot) {
            var product = childSnapshot.val();
            firebase.database().ref('users/' + email.split("@")[0] + '/History/' + order +'/Produtos/' + product.ProductName).set({
                ProductName: product.ProductName,
                Quantity: product.Quantity,
                Image: product.Image,
                Description: product.Description,
                Market: product.Market,
                Seller: product.Seller,
                Price: product.Price
            });
        });
        firebase.database().ref('users/' + email.split("@")[0] + '/Cart').remove();
        callback();
    });
}
function get_history(email, callback) {
    firebase.database().ref('users/' + email.split("@")[0] + '/History/').once('value').then(function(snapshot) {
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

function get_order_history(email, order, callback) {
    firebase.database().ref('users/' + email.split("@")[0] + '/History/' + order +'/Produtos/').once('value').then(function(snapshot) {
        callback(snapshot.toJSON());   
    }); 
}

function get_schedule(email, callback) {
    firebase.database().ref('users/' + email.split("@")[0] + '/Schedule').once('value').then(function(snapshot) {
        var schedule = snapshot.val();
        var schedule_ = [];
        if(schedule != null) {
            snapshot.forEach(function(childSnapshot) {
                schedule_.push(childSnapshot.toJSON());
            });
        }
        callback(schedule_);
    });
}

function add_schedule(email, market, date, callback) {
    var month = date.getUTCMonth() + 1; 
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var completeDate = day.toString() + month.toString() + year.toString();
    var completeDate_ = day.toString() + '/'+ month.toString() +'/'+ year.toString();
    var id = market + completeDate;
    firebase.database().ref('users/' + email.split("@")[0] + '/Schedule/' + id).set({
        Market: market,
        Date: completeDate_,
        Id: id
    });
    callback(id);
}

function remove_schedule(email,callback) {
    firebase.database().ref('users/' + email.split("@")[0] + '/Schedule').once('value').then(function(snapshot) {
        var lastSchedule = null;
        snapshot.forEach(function(childSnapshot){
            lastSchedule = childSnapshot.val();
        });
        if(lastSchedule != null) {
            firebase.database().ref('users/' + email.split("@")[0] + '/Schedule/' + lastSchedule.Id).remove();
            callback(true);
        } else {
            callback(false);
        }
    });
    
}
