////////////////////////////////////////////////
//////////////////priceToEuros//////////////////
////////////////////////////////////////////////
export function priceToEuros(price) {
  //We divide this price by 100 to transform the cents into euros
  price = price / 100;
  //we return this new price by adding the euro symbol
  return price + "€";
}
////////////////////////////////////////////////
//////////////////priceToEuros//////////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////
export function incrementDecrement() {
  document.addEventListener("DOMContentLoaded", () => {
    let btnIncrement = document.getElementById("increment");
    let input = document.getElementById("quantity");
    let btnDecrement = document.getElementById("decrement");

    btnIncrement.addEventListener("click", () => {
      input.value = parseInt(input.value) + 1;
    });

    btnDecrement.addEventListener("click", () => {
      if (input.value > 0) {
        input.value = parseInt(input.value) - 1;
      }
    });
  });
}
////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////

////////////////////////////////////////////////
///////////function for cart storage///////////
////////////////////////////////////////////////
export function getCart() {
  //on déclare le panier en tableau (pas en objet)
  let cart = [];
  //si le panier est différent en type et en valeur de null
  if (localStorage.getItem("cart") !== null) {
    //récupère les élements stocker dans le panier
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  //retourne moi le panier
  return cart;
}
////////////////////////////////////////////////
///////////function for cart storage///////////
////////////////////////////////////////////////

////////////////////////////////////////////////
///////////function for cart counter////////////
////////////////////////////////////////////////

//calcul du total d'articles dans le panier
export function getTotalQty() {
  //je récupère mon panier
  let cart = getCart();
  //je déclare une variable pour le total qui démarre à 0
  let totalQty = 0;
  //je fais une boucle dans mon panier avec .map sur chaque element =>
  cart.map((element) => {
    //totalQty = element.qty + totalQty
    totalQty += element.qty;
  });
  //retourne moi la quantité total
  return totalQty;
}

export function setCounterCart() {
  //injecte dans tous les éléments html ayant pour class="counter"
  let counter = document.querySelectorAll(".counter");
  console.log(counter);
  //fait une boucle sur chaque element
  counter.forEach((element) => {
    //chaque element html = fonction de comptage en qty total
    element.innerHTML = getTotalQty();
  });
}

//j'appel ma fonction partout en j'en ai besoin
setCounterCart();
////////////////////////////////////////////////
///////////function for cart counter////////////
////////////////////////////////////////////////


////////////////////////////////////////////////
/////////function total price by items//////////
////////////////////////////////////////////////
export function totalPriceByItems(qty, price) {
  let totalPrice = qty * price; //je déclare une variable total price = qty * price
  return priceToEuros(totalPrice); //retourne moi ma fonction de conversion du prix avec en arguments ma nouvel variable
};
////////////////////////////////////////////////
/////////function total price by items//////////
////////////////////////////////////////////////
