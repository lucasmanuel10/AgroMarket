function loadNavbar() {
  var b = true;
  var email = window.location.hash.substr(1);
  console.log(email);

  is_seller(email, function(b){
    if(b) {
      document.getElementById("sellId").style.display = "block";
    }
  });
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




