import * as index from "./index";

////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////
index.incrementDecrement();
////////////////////////////////////////////////
//End Button decrement and increment with my input
////////////////////////////////////////////////

// ///////////////////////////////////////////////
// ////////I get my cart from LocalStorage////////
// ///////////////////////////////////////////////

//je stocke mon panier dans une variable pour pouvoir la réutiliser
let cart = index.getCart(); 

//si mon index.getCart() est vide mettre un message 'votre panier est vide'
if (cart.length === 0) {
  console.log("le panier est vide");
  emptyCart(); //j'appel ma fonction emptyCart
} else {
  //sinon parcours tout le panier
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
  let containerCart = document.getElementsByClassName("main-cart");
  let cart = index.getCart(); //je récupère mon panier
  let fullPanier = [];
  for (let i = 0; i < cart.length; i++) {
    fullPanier += `
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
// /End dynamic display of products in the cart///
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
//Déclaration d'une variable pour pouvoir y mettre les prix qui sont dans présent dans le panier
let priceTotalCart = [];

//Je récupère les prix dans le panier
for (let m = 0; m < cart.length; m++) {
  let priceProductCart = cart[m].price * cart[m].qty;

  //Mettre les prix du panier dans la variable "priceTotalCart"
  priceTotalCart.push(priceProductCart);

  console.log(priceTotalCart);
}

//Additionner les prix qu'il y a dans le tableau de la variable "priceTotalCart" avec la méthode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = priceTotalCart.reduce(reducer, 0);
console.log(index.priceToEuros(prixTotal));

//Je crée une fonction pour insérer mon prix total dans mon html
function totalProduct() {
  let positionSummury = document.getElementsByClassName("summury-cart");
  document.getElementsByClassName("total")[0].textContent =
    index.priceToEuros(prixTotal);
}
totalProduct(); //j'appel ma fonction pour l'exécuté

// ///////////////////////////////////////////////
// /////////////End Price Total Cart//////////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// /////////////////Display form//////////////////
// ///////////////////////////////////////////////

const displayForm = () => {
  //sélection élément du DOM pour le positionnement du form dans le HTML
  let positionForm = document.querySelector("#form");
  let formHtml = `
            <div>
              <form action="GET">
                <h3>Finalisez votre commande</h3>
                <div>
                  <label for="last-name">
                    <input
                      type="text"
                      placeholder=" "
                      name="last-name"
                      id="last-name"
                    />
                    <p>Nom</p><span id="errorName" class="errorInput"></span>
                  </label>

                  <label for="first-name">
                    <input
                      type="text"
                      placeholder=" "
                      name="first-name"
                      id="first-name"
                    />
                    <p>Prénom</p>
                  </label>

                  <label class="label" for="address">
                    <input
                      type="text"
                      placeholder=" "
                      name="address"
                      id="address"
                    />
                    <p>Adresse</p>
                  </label>
                  <label class="label" for="postal-code">
                    <input
                      type="number"
                      placeholder=" "
                      name="postal-code"
                      id="postal-code"
                    />
                    <p>Code postal</p>
                  </label>
                  <label class="label" for="city">
                    <input type="text" placeholder=" " name="city" id="city" />
                    <p>Ville</p>
                  </label>
                  <label class="label" for="phone">
                    <input
                      type="number"
                      placeholder=" "
                      name="phone"
                      id="phone"
                    />
                    <p>Téléphone</p>
                  </label>
                  <label class="label" for="email">
                    <input
                      type="email"
                      placeholder=" "
                      name="email"
                      id="email"
                    />
                    <p>E-mail</p>
                  </label>
                </div>
              </form>
            </div>
  `;
  positionForm.innerHTML = formHtml;
};

//J'appel ma fonction pour injecter mon formulaire dans mon HTML
displayForm();

// ///////////////////////////////////////////////
// ///////////////End Display form////////////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// //////////Value form in localStorage///////////
// ///////////////////////////////////////////////

//selectionner du bouton "commander" pour envoyer le formulaire
let order = document.querySelector("#order");

//addEventListener pour que le formulaire soit envoyé au localStorage à la commande
//je récupère mon bouton et j'écoute le click
order.addEventListener("click", () => {
  //récupération des valeurs du formulaire pour les mettre dans le localStorage via une key
  let formValues = {
    "last-name": document.querySelector("#last-name").value,
    "first-name": document.querySelector("#first-name").value,
    address: document.querySelector("#address").value,
    "postal-code": document.querySelector("#postal-code").value,
    city: document.querySelector("#city").value,
    phone: document.querySelector("#phone").value,
    email: document.querySelector("#email").value,
  };
  console.log("formValues");
  console.log(formValues);

  // localStorage.setItem("last-name", document.querySelector("#last-name").value);
  // localStorage.setItem(
  //   "first-name",
  //   document.querySelector("#first-name").value
  // );
  // localStorage.setItem("address", document.querySelector("#address").value);
  // localStorage.setItem(
  //   "postal-code",
  //   document.querySelector("#postal-code").value
  // );
  // localStorage.setItem("city", document.querySelector("#city").value);
  // localStorage.setItem("phone", document.querySelector("#phone").value);
  // localStorage.setItem("email", document.querySelector("#email").value);

  // ///////////////////////////////////////////////
  // ////////////////validation form////////////////
  // ///////////////////////////////////////////////

  ////////////////////////////name & first name//////////////////////////////

  //Je crée une variable d'expession de fonction pour stocker mon regex sur le prénom, le nom et la ville
  //je vais pouvoir utiliser cette variable dans mes fonctions
  const regexFirstnameLastname = (value) => {
    return /^([a-zA-ZÀ-ÿ\-']{2,20})$/.test(value);
  };

  //je crée une variable d'expression de fonction avec mon "text alert"
  const textAlert = (value) => {
    return `${value}: ne doit pas comporter des chiffres et symboles. \n Il doit avoir un minimum de 2 caractères et ne doit pas dépasser 20 caractères.`;
  };

  function valideName() {
    //controle de la validité du nom de famille
    let leNom = formValues["last-name"];
    //dans mon if j'appel ma variable d'expression de fonction
    //avec un argument "value" qui sera ma variable leNom | lePrenom
    if (regexFirstnameLastname(leNom)) {
      return true;
    } else {
      //Je vais récupérer mon span HTML avec l'id "errorName"
      document.querySelector("#errorName").textContent = "Veuillez bien renseigner votre nom de famille.";
      //j'appel ma variable d'expression de fonction "text alert"
      //je remplace ma value par mon paramètre changeant
      alert(textAlert("Le nom "));
      return false;
    }
  }

  function valideFirstName() {
    //contrôle de la validité du nom de famille
    let lePrenom = formValues["first-name"];
    //dans mon if j'appel ma variable d'expression de fonction
    //avec un argument "value" qui sera ma variable leNom | lePrenom
    if (regexFirstnameLastname(lePrenom)) {
      return true;
    } else {
      //j'appel ma variable d'expression de fonction "text alert"
      //je remplace ma value par mon paramètre changeant
      alert(textAlert("Le prénom "));
      return false;
    }
  }
  ///////////////////////////End name & first name////////////////////////////////////

  ///////////////////////////////Address//////////////////////////////////////////
  const regexAddress = (value) => {
    return /^([0-9]*) ?([a-zA-Z,\. ]*)$/.test(value);
  };

  function valideAddress() {
    //contrôle de la validité du nom de famille
    let ladresse = formValues.address;
    //dans mon if j'appel ma variable d'expression de fonction
    //avec un argument "value" qui sera ma variable leNom | lePrenom | city
    if (regexAddress(ladresse)) {
      return true;
    } else {
      //je crée un message d'alerte
      alert("Veuillez entrer votre adresse au bon format.");
      return false;
    }
  }
  /////////////////////////////End Address////////////////////////////////////////

  //////////////////////////////City///////////////////////////////////////////

  const regexCity = (value) => {
    return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value);
  };

  function valideCity() {
    //contrôle de la validité de la ville
    let laVille = formValues.city;
    //dans mon if j'appel ma variable d'expression de fonction
    //avec un argument "value" qui sera ma variable "city"
    if (regexCity(laVille)) {
      return true;
    } else {
      //je crée un message d'alerte
      alert("Veuillez entrer votre ville de résidence au bon format.");
      return false;
    }
  }
  ////////////////////////////////End City//////////////////////////////////////////

  ///////////////////////////////Postal Code//////////////////////////////////////////

  //Je crée une variable d'expression de fonction pour stocker mon regex pour le CP
  //je vais pouvoir utiliser cette variable dans ma fonction
  const regexPostalCode = (value) => {
    //Regex : je contrôle les chiffres de 0 à 9 et je veux 5 chiffres
    return /^[0-9]{5}$/.test(value);
  };

  function validePostal() {
    //contrôle de la validité du code postal
    let leCodePostal = formValues["postal-code"];
    //dans mon if j'appel ma variable d'expression de fonction
    //avec un argument "value" qui sera ma variable "leCodePostal"
    if (regexPostalCode(leCodePostal)) {
      return true;
    } else {
      //je crée un message d'alerte
      alert("Le code-postal doit être composé de 5 chiffres. ");
      return false;
    }
  }
  ///////////////////////////////End Postal Code//////////////////////////////////////////

  ///////////////////////////////Phone//////////////////////////////////////////
  const regexPhone = (value) => {
    return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(value);
  };

  function validePhone() {
    //contrôle de la validité de l'email
    let phone = formValues.phone;
    //dans mon if j'appel ma variable d'expression de fonction
    //avec un argument "value" qui sera ma variable "email"
    if (regexPhone(phone)) {
      return true;
    } else {
      //je crée un message d'alerte
      alert("Veuillez entrer votre numéro de téléphone au bon format.");
      return false;
    }
  }
  /////////////////////////////End Phone////////////////////////////////////////

  ///////////////////////////////Email//////////////////////////////////////////
  const regexEmail = (value) => {
    return /^[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)*@[-!#-'*+\/-9=?^-~]+(?:\.[-!#-'*+\/-9=?^-~]+)+$/i.test(
      value
    );
  };

  function valideEmail() {
    //contrôle de la validité de l'email
    let email = formValues.email;
    //dans mon if j'appel ma variable d'expression de fonction
    //avec un argument "value" qui sera ma variable "email"
    if (regexEmail(email)) {
      return true;
    } else {
      //je crée un message d'alerte
      alert("Veuillez entrer votre e-mail au bon format.");
      return false;
    }
  }
  /////////////////////////////End Email////////////////////////////////////////

  //Contrôle validité de mon formulaire est complet je l'envoi sinon je ne l'envoi pas
  if (
    valideName() &&
    valideFirstName() &&
    validePostal() &&
    valideCity() &&
    valideAddress() &&
    valideEmail() &&
    validePhone()
  ) {
    //mettre l'objet formValues dans le localStorage
    localStorage.setItem("formValues", JSON.stringify(formValues));
  } else {
    alert("Veuillez remplir correctement le formulaire");
  }
  // ///////////////////////////////////////////////
  // //////////////End validation form//////////////
  // ///////////////////////////////////////////////

  // //mettre les value du formulaire dans un objet
  // let formulaire = {
  //   "last-name": localStorage.getItem("last-name"),
  //   "first-name": localStorage.getItem("first-name"),
  //   address: localStorage.getItem("address"),
  //   "postal-code": localStorage.getItem("postal-code"),
  //   city: localStorage.getItem("city"),
  //   phone: localStorage.getItem("phone"),
  //   email: localStorage.getItem("email"),
  // };
  // console.log("Voici le formulaire :");
  // console.log(formulaire);

  //mettre les valeurs du formulaire et les produits du paniers dans un objet à envoyé vers le serveur
  let valuesServeur = {
    cart,
    formValues,
  };
  console.log("Voici les valeurs envoyé vers le serveurs :");
  console.log(valuesServeur);
});

// ///////////////////////////////////////////////
// ////////End Value form in localStorage/////////
// ///////////////////////////////////////////////
