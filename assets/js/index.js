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
  // we declare the cart as an array (not as an object)
  let cart = [];
  // if the cart is different in type and in value of null
  if (localStorage.getItem("cart") !== null) {
    // get the items stored and put them in the cart
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  // return the cart to me
  return cart;
}
////////////////////////////////////////////////
///////////function for cart storage///////////
////////////////////////////////////////////////

////////////////////////////////////////////////
///////////function for cart counter////////////
////////////////////////////////////////////////

// calculate the total of items in the cart
export function getTotalQty() {
  // I collect my basket
  let cart = getCart();
  // I declare a variable for the total which starts at 0
  let totalQty = 0;
  // I make a loop in my cart with .map on each element =>
  cart.map((element) => {
    //totalQty = element.qty + totalQty
    totalQty += element.qty;
  });
  // return me the total quantity
  return totalQty;
}

export function setCounterCart() {
  // inject in all the html elements having for class = "counter"
  let counter = document.querySelectorAll(".counter");
  // loop through each element
  counter.forEach((element) => {
    // each element html = count function in total qty
    element.innerHTML = getTotalQty();
  });
}

// I call my function everywhere I need it
setCounterCart();
////////////////////////////////////////////////
///////////function for cart counter////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
/////////function total price by items//////////
////////////////////////////////////////////////
export function totalPriceByItems(qty, price) {
  // I declare a variable total price = qty * price
  let totalPrice = qty * price;
  // return my price conversion function to me with my new variable as arguments
  return priceToEuros(totalPrice);
}
////////////////////////////////////////////////
/////////function total price by items//////////
////////////////////////////////////////////////

///////////////////////////////////////////////
///////////////pop up message////////////////
///////////////////////////////////////////////

///////////////////////////////////////////////
///////////////pop up message////////////////
///////////////////////////////////////////////