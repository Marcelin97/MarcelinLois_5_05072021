import * as index from "./index";
import * as validations from "./validations";

// ///////////////////////////////////////////////
// ////////I get my cart from LocalStorage////////
// ///////////////////////////////////////////////

//je stocke mon panier dans une variable pour pouvoir la réutiliser
let cart = index.getCart();

//si mon index.getCart() est vide...
if (cart.length === 0) {
  //...j'appel ma fonction emptyCart
  emptyCart();
} else {
  //sinon parcours tout le panier pour me rendre les produits
  cart.map((element) => {
    renderCartProduct(element);
  });
}
// ///////////////////////////////////////////////
// //////End I get my cart from LocalStorage//////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// ///////////////////Empty Cart//////////////////
// ///////////////////////////////////////////////
function emptyCart() {
  let mainCart = document.getElementById("items");
  mainCart.innerHTML = `
  <section id="titre" class="back-to-home">
    <h2>Votre panier est tristement vide.</h2><br>
    <span><i class="far fa-frown empty-cart"></i></span>
        <p>En manque d'inspiration ?</p>
      <a class="btn" href="../index.html">Trouver des idées</a>
  </section>
  `;
}
// ///////////////////////////////////////////////
// /////////////////End Empty Cart////////////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// ////dynamic display of products in the cart/////
// ///////////////////////////////////////////////
function renderCartProduct(product) {
  //je récupère mon panier
  let cart = index.getCart();
  let fullCart = [];
  for (let i = 0; i < cart.length; i++) {
    fullCart += `
              <ul>
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
                                <button type="button" class="btn-update" id="decrement" value="-1"
                                productId="${cart[i]._id}">
                                  <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" min="0" id="quantity" value="${
                                  cart[i].qty
                                }">
                                <button type="button" class="btn-update" id="increment" value="+1"
                                productId="${cart[i]._id}">
                                  <i class="fas fa-plus"></i></button>
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
    document.getElementById("items").innerHTML = fullCart;
  }
}
// ///////////////////////////////////////////////
// /End dynamic display of products in the cart///
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// ////////////updateItemsOnTheCart/////////////
// ///////////////////////////////////////////////
function updateItemsOnTheCart() {
  document.addEventListener("DOMContentLoaded", () => {
    let btnIncrement = document.getElementById("increment");
    let input = document.getElementById("quantity");
    let btnDecrement = document.getElementById("decrement");

    btnIncrement.addEventListener("click", function () {
      input.value = parseInt(input.value) + 1;
      const productId = btnIncrement.getAttribute("productId");
      //On crée un panier temporaire pour stocker le panier actuel
      const newCart = cart.map((element) => {
        //si l'élément dans la panier est identique au produit que l'on veut ajouter
        if (element._id === productId) {
          //ajoute la quantité
          element.qty++;
        }
        //retourne moi le nouvelle élément à jour
        return element;
      });
      //get the new cart
      // Send data back to storage as a STRING
      localStorage.setItem("cart", JSON.stringify(newCart));
      location.reload();
    });

    btnDecrement.addEventListener("click", () => {
      input.value = parseInt(input.value) - 1;
      const productId = btnDecrement.getAttribute("productId");
      //On crée un panier temporaire pour stocker le panier actuel
      const newCart = cart.map((element) => {
        //si l'élément dans la panier est identique au produit que l'on veut ajouter
        if (element._id === productId) {
          //enlève la quantité
          element.qty--;
        }
        //retourne moi le nouvelle élément à jour
        return element;
      });
      //get the new cart
      // Send data back to storage as a STRING
      localStorage.setItem("cart", JSON.stringify(newCart));
      location.reload();
    });
  });
}
//j'appel ma fonction pour l'exécuté
updateItemsOnTheCart();
// ///////////////////////////////////////////////
// ////////////updateItemsOnTheCart/////////////
// ///////////////////////////////////////////////

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
  });
});
// ///////////////////////////////////////////////
// /////////End removeOneItemsOnTheCart///////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// //////////clear all products in cart///////////
// ///////////////////////////////////////////////
let positionBtnClearCart = document.querySelectorAll("#clear");
positionBtnClearCart.forEach(function (element, index, array) {
  positionBtnClearCart[index].addEventListener("click", function () {
    if (cart.length > 1) {
      localStorage.removeItem("cart");
      alert("Le panier a été vider");
      location.reload();
    }
  });
});
// ///////////////////////////////////////////////
// ////////End clear all products in cart/////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// ///////////////Price Total Cart////////////////
// ///////////////////////////////////////////////
// Déclaration d'une variable pour pouvoir y mettre les prix qui sont dans présent dans le panier
let priceTotalCart = [];

//Je récupère les prix dans le panier
for (let m = 0; m < cart.length; m++) {
  let priceProductCart = cart[m].price * cart[m].qty;
  //Mettre les prix du panier dans la variable "priceTotalCart"
  priceTotalCart.push(priceProductCart);
}

//Additionner les prix qu'il y a dans le tableau de la variable "priceTotalCart" avec la méthode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = priceTotalCart.reduce(reducer, 0);

//Je crée une fonction pour insérer mon prix total dans mon html
function totalProduct() {
  let positionSummury = document.getElementsByClassName("summury-cart");
  document.getElementsByClassName("total")[0].textContent =
    index.priceToEuros(prixTotal);
}
//j'appel ma fonction pour l'exécuté
totalProduct();
// ///////////////////////////////////////////////
// /////////////End Price Total Cart//////////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// //////////////////Value form///////////////////
// ///////////////////////////////////////////////
//selectionner du bouton "commander" pour envoyer le formulaire
let order = document.querySelector("#order");

//addEventListener pour que le formulaire soit envoyé au localStorage à la commande
//je récupère mon bouton et j'écoute le click
order.addEventListener("click", () => {
  //récupération des valeurs du formulaire pour les mettre dans le localStorage via une key
  let formValues = {
    lastName: document.querySelector("#last-name").value,
    firstName: document.querySelector("#first-name").value,
    address: document.querySelector("#address").value,
    postalCode: document.querySelector("#postal-code").value,
    city: document.querySelector("#city").value,
    phone: document.querySelector("#phone").value,
    email: document.querySelector("#email").value,
  };
  // ///////////////////////////////////////////////
  // //////////////////Value form //////////////////
  // ///////////////////////////////////////////////

  // ///////////////////////////////////////////////
  // ////////////////Validation form////////////////
  // ///////////////////////////////////////////////

  //je crée une variable d'expression de fonction avec mon "text alert"
  // const textAlert = (value) => {
  //   return `${value}: ne doit pas comporter des chiffres et symboles. \n Il doit avoir un minimum de 2 caractères et ne doit pas dépasser 20 caractères.`;
  // };
  function validForm() {
    //Contrôle validité de mon formulaire est complet je l'envoi sinon je ne l'envoi pas
    if (
      validations.checkWithRegex(
        stringWithoutSpecials,
        formValues.lastName,
        "#errorName"
      ) &&
      validations.checkWithRegex(
        stringWithoutSpecials,
        formValues.firstName,
        "#errorFirstName"
      ) &&
      validations.checkWithRegex(street, formValues.address, "#errorAddress") &&
      validations.checkWithRegex(
        stringWithoutSpecials,
        formValues.city,
        "#errorCity"
      ) &&
      validations.checkWithRegex(
        postalCode,
        formValues.postalCode,
        "#errorPostalCode"
      ) &&
      validations.checkWithRegex(phone, formValues.phone, "#errorPhone") &&
      validations.checkWithRegex(email, formValues.email, "#errorEmail")
    ) {
      //mettre l'objet formValues dans le localStorage
      localStorage.setItem("formValues", JSON.stringify(formValues));
      // alert("Merci. Votre formulaire est correctement rempli et nous venons de valider votre commande");
      orderSuccess();
    } else {
      //scroll to the form to watch the error
      throw new Error();
    }
  }
  // ///////////////////////////////////////////////
  // //////////////End validation form//////////////
  // ///////////////////////////////////////////////

  // ///////////////////////////////////////////////
  // /////////////// Get id product ////////////////
  // ///////////////////////////////////////////////

    //je récupère mon panier
    let cart = index.getCart();

    //////Je récupère l'id de chaque produit présent dans le panier que j'envoi au serveur//////
    let panierGetProductId = [];
    for (let i = 0; i < cart.length; i++) {
      let idProduct = cart[i]._id;
      // alert(idProduct);
      panierGetProductId.push(idProduct);
    }


  // ///////////////////////////////////////////////
  // /////////////// Get id product ////////////////
  // ///////////////////////////////////////////////

  // ///////////////////////////////////////////////
  // ////////Send data to the localStorage/////////
  // ///////////////////////////////////////////////

  //mettre les valeurs du formulaire et les produits du paniers dans un objet à envoyé vers le serveur
  const elementToSend = { contact: formValues, products: panierGetProductId };

  //envoi des valuesServeur vers le serveur avec fetch et post
  const promise = "http://localhost:3000/api/cameras/order";
  const fetchData = {
    method: "POST",
    body: JSON.stringify(elementToSend),
    headers: { "Content-Type": "application/json" },
  };

  fetch(promise, fetchData)
    .then(async (response) => {
      try {
        const dataResponse = await response.json();
        console.log("OK");
        if (response.ok) {
          // alert(dataResponse.orderId);
          localStorage.setItem("idOrder", dataResponse.orderId);
          setTimeout(function () {
            window.location = "confirmation.html";
          }, 2000);
        } else {
          console.log("KO");
        }
      } catch (e) {
        console.log(e);
        console.log("KO");
      }
    })
    .catch(function (error) {
      alert(`Erreur, impossible de transmettre la requête au serveur`);
      console.log(error);
    });
});
// ///////////////////////////////////////////////
// ////////Send data to the localStorage/////////
// ///////////////////////////////////////////////

///////////////////////////////////////////////
///////////////pop up message////////////////
///////////////////////////////////////////////

function orderSuccess() {
  // Get the modal
  var modal = document.getElementById("confirmation");

  // // Get the button that opens the modal
  // var btn = document.getElementById("order");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // // When the user clicks on the button, open the modal
  // btn.onclick = function () {
  //   modal.style.display = "block";
  // };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

///////////////////////////////////////////////
///////////////pop up message////////////////
///////////////////////////////////////////////
