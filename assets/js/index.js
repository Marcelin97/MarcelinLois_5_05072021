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

export function getCart() {
  //on déclare le panier en tableau (pas en objet)
  let cart = [];

  //si le panier est différent en type et en valeur de null
  if (localStorage.getItem("cart") !== null) {
    //mets à jour le panier
    cart = JSON.parse(localStorage.getItem("cart"));
  }
}