import * as index from "./index";

////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////
index.incrementDecrement();
////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////

// ///////////////////////////////////////////////
// ////////I get my cart from LocalStorage////////
// ///////////////////////////////////////////////
let cart = index.getCart(); //je stocke mon panier dans une variable pour pouvoir la réutiliser

//si mon index.getCart() est vide mettre un message 'votre panier est vide'
if (cart.length === 0) {
  console.log("le panier est vide");
} else {
  //sinon parcours tout le panier
  cart.map((element) => {
    renderCartProduct(element);
  });
}
// ///////////////////////////////////////////////
// ////////I get my cart from LocalStorage////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// ////dynamic display of products in the cart/////
// ///////////////////////////////////////////////
function renderCartProduct(product) {
  let containerCart = document.getElementsByClassName("main-cart");
  let cart = index.getCart();
  //alert(cart.length);
  let fullPanier = [];
  for (let i = 0; i < cart.length; i++) {
    fullPanier += `              <ul>
                <li>
                  <div class="details-items">
                    <div class="details-items-img">
                      <div>
                        <a href="./product.html">
                          <img  
                          src= ${cart[i].imageUrl}
                          alt="Appareil photo"
                          >
                        </a>
                      </div>
                    </div>
                    <div class="info-items">
                      <div>
                        <div class="info-items-desc">
                          <p class="titreProduct">${cart[i].name}</p>
                          <h4 name="qty">${
                            cart[i].qty + " article(s) dans le panier"
                          }</h4>
                          <h4 name="option">${
                            "Votre option: " + cart[i].optionValue
                          }</h4>
                          <p class="description">${cart[i].description}</p>
                          <div>
                            <span name="price">${index.priceToEuros(
                              cart[i].price
                            )}</span>
                          </div>
                        </div>
                        <div class="info-items-quantity">
                          <div>
                              <div class="cart-update">
                                <button type="button" class="btn-update" id="decrement" value="-1"><i class="fas fa-minus"></i></button>
                                <input type="number" id="quantity" value="${
                                  cart[i].qty
                                }">
                                <button type="button" class="btn-update" id="increment" value="+1"><i class="fas fa-plus"></i></button>
                              </div>
                              <div class="info-items-total">
                                <span name="price">${
                                  "Prix total: " +
                                  index.totalPriceByItems(
                                    cart[i].qty,
                                    cart[i].price
                                  )
                                }</span>
                              </div>
                          </div>
                          <div class="info-items-remove">
                            <a href="#">Supprimer l'article</a>
                          </div>
                        </div>
                    </div>
                  </div>
                </li>
              </ul>`;
    document.getElementById("items").innerHTML = fullPanier;
  }
}
// ///////////////////////////////////////////////
// ////dynamic display of products in the cart/////
// ///////////////////////////////////////////////


// function removeItemFromCart(name) {

// ///////////////////////////////////////////////
// ////////////removeOneItemsOnTheCart/////////////
// ///////////////////////////////////////////////
let btnRemove = document.querySelectorAll(".info-items-remove");
btnRemove.forEach(function (element, index, array) {
  btnRemove[index].addEventListener("click", function () {
    if (cart.length > 1) {
      cart.splice(index, 1);
      //on envoie la variable dans le local Storage
      //la transformation en format JSON
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    } else {
      localStorage.removeItem("cart");
      location.reload();
    }
  })
})
// ///////////////////////////////////////////////
// ////////////removeOneItemsOnTheCart/////////////
// ///////////////////////////////////////////////

// function clearCarts() {
//   // Remove all datas in localStorage
//   localStorage.clear();

//   // Remove each element in the cart view
//   document.querySelectorAll("artilcle").forEach((element) => {
//     element.remove();
//   });

//   document.getElementById("cart-container").innerHTML =
//     "<p>Votre panier est vide.</p>";
// }