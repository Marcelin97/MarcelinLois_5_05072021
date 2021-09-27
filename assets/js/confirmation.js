let Id = localStorage.getItem("idResponse");
// let ordersInformation = localStorage.getItem("formValues");

document.querySelector(
  "#orderCommande"
).textContent = `Voici ton numéro de commande : ${Id} `;
document.querySelector(
  "#orderCommandeText"
).textContent = `Merci de ta récente commande n° "${Id}" chez Orinoco et pour tes informations "${ordersInformation}"`;

function deleteKey(key) {
  localStorage.getItem(key);
}

deleteKey("cart");
deleteKey("idResponse");

///Retour sur la page d'accueil après actualisation de la page confirmation
// if (cart == null || idResponse == null) {
//   window.location = "index.html";
// }
