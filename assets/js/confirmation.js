import * as index from "./index";

// ///////////////////////////////////////////////
// ///Redirection on the home page, if no order///
// ///////////////////////////////////////////////
function redirectIfNoOrder() {
  if (!localStorage.getItem("idOrder")) {
    window.location = "../index.html";
  }
}
redirectIfNoOrder();
// ///////////////////////////////////////////////
// ///Redirection on the home page, if no order///
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// ////////////////Order number///////////////////
// ///////////////////////////////////////////////

//Voici le numéro de commande
let id = localStorage.getItem("idOrder");

document.querySelector(
  "#orderCommande"
).textContent = `Voici ton numéro de commande : ${id} `;  
// ///////////////////////////////////////////////
// ////////////////Order number///////////////////
// ///////////////////////////////////////////////

// ///////////////////////////////////////////////
// Personalized message with customer information//
// ///////////////////////////////////////////////

//les informations du clients
let ordersInformation = localStorage.getItem("formValues");
ordersInformation = JSON.parse(ordersInformation);

function displayClientReferences() {
  let clientReferences = document.getElementById("orderCommandeText");
  clientReferences.innerHTML += `
        <p>Salut <span class="font-weight-bold">${ordersInformation.firstName}</span>, </p>
        <p>Merci d'avoir commandé chez Orinoco !</p>
        <p>On es ravi de confirmer que ta commande a bien été reçue</p>
        <p>Un mail de confirmation vous sera envoyé à <span class="font-weight-bold">${ordersInformation.email}</span> contenant le récapitulatif de
        votre commande.
        <p>Voici les informations de livraison que vous nous avez transmis : <br>
          <ul>
            <li><span class="font-weight-bold">${ordersInformation.address}</span></li>
            <li><span class="font-weight-bold">${ordersInformation.postalCode}</span></li>
            <li>à <span class="font-weight-bold">${ordersInformation.city}</span>.</li>
          </ul> 
        </p>
    `;
  localStorage.clear();
  //j'appel ma fonction compteur du panier, pour réactualisation sur cette page
  index.setCounterCart();
};
displayClientReferences();
// ///////////////////////////////////////////////
// Personalized message with customer information//
// ///////////////////////////////////////////////