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
      window.location.href = "https://lucasmanuel10.github.io/AgroMarket/profile(vendedor).html";
    else
      window.location.href = "https://lucasmanuel10.github.io/AgroMarket/profile(cliente).html";
  });
}



