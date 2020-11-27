class User {
    constructor(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.purchases = new Array();
    }

    getEmail() {
        return this.email
    }
    
    setEmail(new_email) {
        this.email = new_email;
    }

    getName() {
        return this.name;
    }

    setName(new_name) {
        this.name = new_name;
    }

    verifyPassword(pass) {
        return this.password.normalize() == pass.normalize();
    }

    changePassword(old_password, new_password) {
        if(this.verifyPassword(old_password)) {
            this.password = new_password;
            return true;
        }
        return false;
            
    }

    getPassword() {
        return this.password;
    }

    getPurchases() {
        return this.purchases();
    }

    getPurchase(purchase_name) {
        for (purchase in purchases) {
            if(purchase.getName().normalize == purchase_name.normalize)
                return purchase;
        }
        return null;
    }

    addPurchase(purchase) {
        this.purchases.push(purchase);
    }

    removePurchase(purchase_name) {
        if(purchases.size() < purchases.splice(purchase, 1).size())    
            return purchase;
        return null;
    }


}

class UserSeller extends User{
    constructor(email, name, password) {
        super(email, name, password);
        this.products = new Array();
    }

    getProducts() {
        return this.products();
    }

    getProduct(product_name) {
        for (product in products) {
            if(product.getName().normalize == product_name.normalize)
                return purchase;
        }
        return null;
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(product) {
        if(products.size() < products.splice(product, 1).size())
            return product;
        return null;
    }

}

class Product {
    constructor(name,stock, weight, price_per_unit, price_per_kg, picture, seller_name, buyer_name, category, rating ) {
        this.name = name;
        this.stock = stock;
        this.weight = weight;
        this.price_per_unit = price_per_unit;
        this.price_per_kg = price_per_kg;
        this.picture = picture;
        this.seller_name = seller_name;
        this.buyer_name = buyer_name;
        this.category = category;
        this.rating = rating;
        this.nr_ratings = 0;
    }

    getName() {
        return this.name;
    }

    setName(new_name) {
        this.name = new_name;
    }

    getStock() {
        return this.stock;
    }

    setStock(new_stock) {
        this.stock = new_stock;
    }

    getWeight() {
        return this.weight;
    }

    setWeight(new_weight) {
        this.weight = new_weight;
    }

    getPricePerUnit() {
        return this.price_per_unit;
    }

    setPricePerUnit(new_price_per_unit) {
        this.price_per_unit = new_price_per_unit;
    }

    getPricePerKg() {
        return this.price_per_kg;
    }

    setPricePerUnit(new_price_per_kg) {
        this.price_per_kg = new_price_per_kg;
    }

    getPicture(){
        return this.picture;
    }

    setPicture(new_picture) {
        this.picture = new_picture;
    }
    
    getSellerName() {
        return this.seller_name;
    }

    setSellerName(new_seller_name) {
        this.seller_name = new_seller_name;
    }

    getBuyerName() {
        return this.buyer_name;
    }

    setBuyerName(new_buyer_name) {
        this.buyer_name = new_buyer_name;
    }

    getCategory() {
        return this.category;
    }

    setCategory(new_category) {
        this.category = new_category;
    }

    getRating() {
        return this.rating / this.nr_ratings;
    }

    rate(rate) {
        this.nr_ratings += 1;
        this.rating += rate;
        return this.rating / this.nr_ratings;
    }
}


function noob() {
    fetch('teste.json')
  .then(response => response.json())
  .then(text => execute()) 
}
function execute() {
    app = new App(json);
}

function login(email, password) {
    return app.login(email, password);
}

function register() {
    return app.register(email, password, account_type);
}