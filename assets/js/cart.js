import * as index from "./index";
import * as validations from "./validations";

//importation des regEX
import {
  stringWithoutSpecials,
  street,
  postalCode,
  email,
  phone,
  errorStatus,
} from "./validations";

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
// /////////Hide element if cart empty////////////
// ///////////////////////////////////////////////
function hideElement() {
  const hideClearCart = document.getElementById("clear");
  const hideSummury = document.getElementById("summCart");
  const hideForm = document.getElementById("form");

  if (cart.length === 0) {
    hideClearCart.style.display = "none";
    hideSummury.style.display = "none";
    hideForm.style.display = "none";
  } else {
    hideClearCart.style.display = "block";
    hideSummury.style.display = "block";
    hideForm.style.display = "block";
  }
}
hideElement();
// ///////////////////////////////////////////////
// /////End of Hide element if cart empty/////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// ////dynamic display of products in the cart////
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
                                <button type="button" class="btn-update decrement" data-index="${i}" value="1"
                                productId="${cart[i]._id}">
                                  <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" min="1" id="quantity" value="${
                                  cart[i].qty
                                }">
                                <button type="button" class="btn-update increment" value="1"
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
    let allBtnIncrements = document.querySelectorAll(".increment");
    let allBtnDecrements = document.querySelectorAll(".decrement");

    allBtnIncrements.forEach((element) => {
      element.addEventListener("click", function (event) {
        event.stopPropagation();
        let inputPrev = event.currentTarget.previousElementSibling;
        inputPrev.value = parseInt(inputPrev.value) + 1;
        const productId = element.getAttribute("productId");
        //On crée un panier temporaire pour stocker le panier actuel
        const newCart = cart.map((elementCart) => {
          //si l'élément dans la panier est identique au produit que l'on veut ajouter
          if (elementCart._id === productId) {
            //ajoute la quantité
            elementCart.qty++;
          }
          //retourne moi le nouvelle élément à jour
          return elementCart;
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
        location.reload();
      });
    });

    allBtnDecrements.forEach((element) => {
      element.addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        let inputNext = event.currentTarget.nextElementSibling;
        inputNext.value = parseInt(inputNext.value) - 1;

        let elementCurrent = cart[event.currentTarget.dataset.index];
        elementCurrent["qty"] = elementCurrent.qty - 1;
        if (elementCurrent["qty"] < 1) {
          removeOnCart(event.currentTarget.dataset.index);
        } else {
          localStorage.setItem("cart", JSON.stringify(cart));
        }
        location.reload();
      });
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
    removeOnCart(index);
    location.reload();
  });
});

function removeOnCart(index) {
  console.log(index);
  if (cart.length > 1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.removeItem("cart");
  }
}
// ///////////////////////////////////////////////
// /////////End removeOneItemsOnTheCart///////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// //////////clear all products in cart///////////
// ///////////////////////////////////////////////
let positionBtnClearCart = document.querySelectorAll("#clear");
positionBtnClearCart.forEach(function (element, index, array) {
  positionBtnClearCart[index].addEventListener("click", function () {
    if ((cart.length = 1)) {
      localStorage.removeItem("cart");
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
//selection du formulaire
let form = document.querySelector("form");

//addEventListener pour que le formulaire soit envoyé au localStorage à la commande
//je récupère mon bouton et j'écoute le click
form.addEventListener("submit", (e) => {
  e.preventDefault();
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
  //j'appel ma fonction validForm pour valider mon formulaire
  validForm(formValues);
  // ///////////////////////////////////////////////
  // //////////////////Value form //////////////////
  // ///////////////////////////////////////////////
});
// ///////////////////////////////////////////////
// ////////Send data to the localStorage/////////
// ///////////////////////////////////////////////

function orderSuccess(formValues) {
  popUp();
  setTimeout(function () {
    // ///////////////////////////////////////////////
    // /////////////// Get id product ////////////////
    // ///////////////////////////////////////////////
    //je récupère mon panier
    let cart = index.getCart();

    //////Je récupère l'id de chaque produit présent dans le panier que j'envoi au serveur//////
    let panierGetProductId = [];
    for (let i = 0; i < cart.length; i++) {
      let idProduct = cart[i]._id;
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
            localStorage.clear;
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
  }, 3000);
}
// ///////////////////////////////////////////////
// ///////End Send data to the localStorage///////
// ///////////////////////////////////////////////

///////////////////////////////////////////////
///////////////pop up message////////////////
///////////////////////////////////////////////
function popUp() {
  // Get the modal
  var modal = document.getElementById("confirmation");

  // // Get the button that opens the modal
  var btn = document.getElementById("Order");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  console.log(window.getComputedStyle(modal)["display"]);

  // When the user clicks on the button, open the modal
  // the modal will open on the window, if this style is on display none
  // it's will be change on display = block
  if (window.getComputedStyle(modal)["display"] == "none") {
    modal.style.display = "block";
  }

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

// ///////////////////////////////////////////////
// ////////////////Validation form////////////////
// ///////////////////////////////////////////////
function validForm(formValues) {
  validations.changeStatus(false);

  //Contrôle validité de mon formulaire est complet je l'envoi sinon je ne l'envoi pas
  validations.checkWithRegex(
    stringWithoutSpecials,
    formValues.lastName,
    "errorName"
  );
  validations.checkWithRegex(
    stringWithoutSpecials,
    formValues.firstName,
    "errorFirstName"
  );
  validations.checkWithRegex(street, formValues.address, "errorAddress");
  validations.checkWithRegex(
    stringWithoutSpecials,
    formValues.city,
    "errorCity"
  );
  validations.checkWithRegex(
    postalCode,
    formValues.postalCode,
    "errorPostalCode"
  );
  validations.checkWithRegex(phone, formValues.phone, "errorPhone");
  validations.checkWithRegex(email, formValues.email, "errorEmail");
  //si je n'ai pas d'erreur dans mon formulaire
  if (!errorStatus) {
    //mettre l'objet formValues dans le localStorage
    localStorage.setItem("formValues", JSON.stringify(formValues));
    //on valide que le formulaire est bien rempli avec la fonction orderSuccess
    orderSuccess(formValues);
  } else {
    console.log("error");
    //scroll to the form to watch the error
    let errors = [...document.querySelectorAll("span.errorInput")];
    errors = errors.filter(function (error) {
      //si le champ error n'est pas vide
      if (error.innerHTML != "") {
        return true;
      } else {
        return false;
      }
    });
    //affiche la première erreur du formulaire dans le champ de vision
    errors[0].scrollIntoView();

    throw new Error();
  }
}
// ///////////////////////////////////////////////
// //////////////End validation form//////////////
// ///////////////////////////////////////////////
