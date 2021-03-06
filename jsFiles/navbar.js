function loadNavbar() {
  var email = window.location.hash.substr(1);
  console.log(email);

  is_seller(email, function(b){
    if(b) {
      document.getElementById("sellId").style.display = "block";
    }
  });
  shoppingCart(email)
};

function myProfile() {
  var email = window.location.hash.substr(1);
  console.log(email);

  is_seller(email, function(b){
    if(b) 
      window.location.href = "https://lucasmanuel10.github.io/AgroMarket/profile(vendedor).html#" + email;
    else
      window.location.href = "https://lucasmanuel10.github.io/AgroMarket/profile(cliente).html#" + email;
  });
}

function sellItem() {
  var email = window.location.hash.substr(1);
  window.location.href = "https://lucasmanuel10.github.io/AgroMarket/addProduct.html#" + email;
}

function homepage() {
  var email = window.location.hash.substr(1);
  window.location.href = "https://lucasmanuel10.github.io/AgroMarket/home-page.html#" + email;
}

function history() {
  var email = window.location.hash.substr(1);
  window.location.href = "https://lucasmanuel10.github.io/AgroMarket/historico.html#" + email;
}

function myShoppingCart() {
  var email = window.location.hash.substr(1);
  window.location.href = "https://lucasmanuel10.github.io/AgroMarket/my-shopping-cart.html#" + email;
}

function shoppingCart(email) {
  has_shopping_cart(email, function(x){
    document.getElementById("shoppingcart").innerHTML = x;
  });
}

