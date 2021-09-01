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
let containerCart = document.getElementsByClassName("container-cart");
console.log(containerCart);
//sélection de la classe ou je vais injecter le code HTML

//je déclare la structure de mon nouveau panier
let structureProduitPanier = [];
//je déclare la structure de mon nouveau panier

//si le panier est vide : afficher le panier est vide
if (cart === null) {
  let panierVide = document.getElementById("titre-cart");
  panierVide.innerHTML = `
    <div class="info-items-desc">
    <div>Le panier est vide</div>
    </div>
`;
  console.log(panierVide);
  containerCart.innerHTML = panierVide;
}


  function displayCart() {
    let container = document.getElementById("items");
    document.getElementsByTagName("img")[0].src = product.imageUrl;
    document.getElementById("titre-product")[0].innerHTML = product.name;
    document.getElementById("description")[0].innerHTML = product.description;
    document.getElementById("quantity")[0].innerHTML = product.qty;

    // document.getElementsByTagName("select")[0].innerHTML =
    //   '<option value="">Veuillez choisir une option</option>' +
    //   getOptions(product[getCustomisation(product)]);
    document.getElementsByName("price")[0].innerHTML = index.priceToEuros(
      product.price
    );
  }


displayCart();

// function displayCart() {
//   let items = document.getElementById("items");
//   let listOfProductsTitle = document.createElement("h2");
//   listOfProductsTitle.textContent = "Voici la liste de vos produits";
//   items.appendChild(listOfProductsTitle);
//   for (let i = 0; i < containerCart.length; i++) {
//     const product = containerCart[i];
//     items.innerHTML +=
//       `
//               <ul>
//                 <li>
//                   <div class="details-items">
//                     <div class="details-items-img">
//                       <div>
//                         <a href="./product.html?id=` +
//       element._id +
//       `&category=` +
//       category +
//       `">
//                           <img 
//                           src="` +
//       element.imageUrl +
//       `" 
//                           alt="Appareil photo vintage sur un gard-corp bois en extérieur"
//                           >
//                         </a>
//                       </div>
//                     </div>
//                     <div class="info-items">
//                       <div>
//                         <div class="info-items-desc">
//                           <p id="titre-product">` +
//       element.name +
//       `</p>
//                           <p id="description">` +
//       element.description +
//       `
//                             </p>
//                           <div>
//                             <span>` +
//       index.priceToEuros(element.price) +
//       `</span>
//                           </div>
//                         </div>
//                         <div class="info-items-quantity">
//                           <div>
//                               <div class="cart-update">
//                                 <button type="button" class="btn-update" id="decrement" value="-1"><i class="fas fa-minus"></i></button>
//                                 <input type="number" id="quantity" value="1">
//                                 <button type="button" class="btn-update" id="increment" value="+1"><i class="fas fa-plus"></i></button>
//                               </div>
//                               <div class="info-items-total">
//                                 <span>` +
//       index.priceToEuros(element.price) +
//       `</span>
//                               </div>
//                           </div>
//                           <div class="info-items-remove">
//                             <a href="#">Supprimer</a>
//                           </div>
//                         </div>
//                     </div>
//                   </div>
//                 </li>
//               </ul>
//     `;
//   }
// }

//   //injection du html dans la page panier
//   if (k == containerCart.length) {
//       containerCart.innerHTML = structureProduitPanier;
//     }
// }

///////////////////////////////////////////////
////dynamic display of products in the cart/////
///////////////////////////////////////////////
