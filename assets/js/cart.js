import * as index from "./index";

////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////
index.incrementDecrement();
////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////
// ////dynamic display of products in the cart/////
// ///////////////////////////////////////////////

// //sélection de la classe ou je vais injecter le code HTML
// let containerCart = document.getElementsByClassName("container-cart");
// console.log(containerCart);
// //sélection de la classe ou je vais injecter le code HTML

// //je déclare la structure de mon nouveau panier
// let structureProduitPanier = [];
// //je déclare la structure de mon nouveau panier

// //si le panier est vide : afficher le panier est vide
// if (cart === null) {

// displayCart();

// // function displayCart() {
// //   let items = document.getElementById("items");
// //   let listOfProductsTitle = document.createElement("h2");
// //   listOfProductsTitle.textContent = "Voici la liste de vos produits";
// //   items.appendChild(listOfProductsTitle);
// //   for (let i = 0; i < containerCart.length; i++) {
// //     const product = containerCart[i];
// //     items.innerHTML +=
// //       `

// //     `;
// //   }
// // }

// //   //injection du html dans la page panier
// //   if (k == containerCart.length) {
// //       containerCart.innerHTML = structureProduitPanier;
// //     }
// // }

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
                            <a href="#">Supprimer</a>
                          </div>
                        </div>
                    </div>
                  </div>
                </li>
              </ul>`;
    document.getElementById("items").innerHTML = fullPanier;
    // const product = cart[i];
    //   document.getElementsByTagName("img")[i].src = product.imageUrl;
    //   document.getElementsByClassName("titreProduct")[i].innerHTML = product.name;
    // document.getElementsByClassName("description")[i].innerHTML = product.description;
    // document.getElementsByName("qty")[i].innerHTML = product.qty + " article(s) dans le panier";
    // document.getElementsByName("option")[i].innerHTML =
    //   "Voici l'option que vous avez choisi: " + product.optionValue;
    //   document.getElementsByName("price")[0].innerHTML = index.priceToEuros(
    //     product.price
    //   );

    //Add the product in the first section
    // containerCart.innerHTML +=
    //   `;
    //               <ul>
    //           <li>
    //             <div class="details-items">
    //               <div class="details-items-img">
    //                 <div>
    //                   <a href="./product.html?id= ${product.name}">
    //                     <img
    //                     src="` +
    //   product.imageUrl +
    //   `"
    //                     alt="Appareil photo vintage sur un gard-corp bois en extérieur"
    //                     >
    //                   </a>
    //                 </div>
    //               </div>
    //               <div class="info-items">
    //                 <div>
    //                   <div class="info-items-desc">
    //                     <p id="titre-product">` +
    //   product.name +
    //   `</p>
    //                     <p id="description">` +
    //   product.description +
    //   `
    //                       </p>
    //                     <div>
    //                       <span>` +
    //   index.priceToEuros(product.price) +
    //   `</span>
    //                     </div>
    //                   </div>
    //                   <div class="info-items-quantity">
    //                     <div>
    //                         <div class="cart-update">
    //                           <button type="button" class="btn-update" id="decrement" value="-1"><i class="fas fa-minus"></i></button>
    //                           <input type="number" id="quantity" value="1">
    //                           <button type="button" class="btn-update" id="increment" value="+1"><i class="fas fa-plus"></i></button>
    //                         </div>
    //                         <div class="info-items-total">
    //                           <span>` +
    //   index.priceToEuros(product.price) +
    //   `</span>
    //                         </div>
    //                     </div>
    //                     <div class="info-items-remove">
    //                       <a href="#">Supprimer</a>
    //                     </div>
    //                   </div>
    //               </div>
    //             </div>
    //           </li>
    //         </ul>
    // `;
  }
}
// ///////////////////////////////////////////////
// ////dynamic display of products in the cart/////
// ///////////////////////////////////////////////
