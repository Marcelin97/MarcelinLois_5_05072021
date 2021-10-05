import * as index from "./index";

//Voici le numéro de commande
let id = localStorage.getItem("idOrder");

//les informations du clients
let ordersInformation = localStorage.getItem("formValues");
ordersInformation = JSON.parse(ordersInformation);

document.querySelector(
  "#orderCommande"
).textContent = `Voici ton numéro de commande : ${id} `;
  
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
};
displayClientReferences();


function deleteKey(key) {
  localStorage.clear(key);
  //Retour sur la page d'accueil après actualisation un délai
  setTimeout(function () {
    window.location = "../index.html";
  }, 30000);
};

// deleteKey("cart");
deleteKey("idOrder");