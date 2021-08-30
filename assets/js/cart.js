import * as index from "./index";

////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////
console.log(index.incrementDecrement());
////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////

///////////////////////////////////////////////
////////I get my cart from LocalStorage////////
///////////////////////////////////////////////
let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);
console.log(cart);
///////////////////////////////////////////////
////////I get my cart from LocalStorage////////
///////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
////dynamic display of products in the cart/////
///////////////////////////////////////////////

//sélection de la classe ou je vais injecter le code HTML
let containerCart = document.getElementsByClassName("sidebar-cart");
console.log(containerCart);
//sélection de la classe ou je vais injecter le code HTML

//si le panier est vide : afficher le panier est vide
if (cart === null) {
  let panierVide = document.getElementById("titre-product");
  panierVide.innerHTML = `
    <div class="info-items-desc">
    <div>Le panier est vide</div>
    </div>
`;
  console.log("je suis ici" + panierVide);
  containerCart.innerHTML = panierVide;
} else {
  //si le panier n'est pas vide : affiche les produits dans le localStorage
  let summury = "";
  cartSummary.forEach((element) => {
    element.name;
    console.log(element.name);
  });
}
///////////////////////////////////////////////
////dynamic display of products in the cart/////
///////////////////////////////////////////////
