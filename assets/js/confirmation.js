let Id = localStorage.getItem("idresponse");
// let ordersInformation = localStorage.getItem("formValues");

document.querySelector(
  "#orderCommande"
).textContent = `Voici ton numéro de commande : ${Id} `;
document.querySelector(
  "#orderCommandeText"
).textContent = `Merci de ta récente commande n° "${Id}" chez Orinoco.`;

function deleteKey(key) {
  localStorage.removeItem(key);
}

deleteKey("cart");
deleteKey("idresponse");

///Retour sur la page d'accueil après actualisation de la page confirmation
// if (cart == null || idresponse == null) {
//   window.location = "index.html";
// }
