////////////////////////////Text alert input//////////////////////////////

//Fonction pour gérer l'affichage du texte alert à côté de l'input
//pour indiquer à l'utilisateur qu'il faut bien remplir le champ
function emptyEntryEmptyText(querySelectorId) {
  // if yes, the input value is correct
  document.querySelector(`#${querySelectorId}`).innerHTML = "";
}

function emptyEntryText(querySelectorId) {
  // if not, display a small message to let the client know what's going wrong
  document.querySelector(`#${querySelectorId}`).textContent =
    "Veuillez bien renseigner ce champ.";
}
////////////////////////////Text alert input//////////////////////////////

export const street = "^([0-9]*) ?([a-zA-Z,. ]*)$";
export const stringWithoutSpecials = "^([a-zA-ZÀ-ÿ-']{1,20})$";
export const email =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
export const postalCode = "^[0-9]{5}$";
export const phone =
  "^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$";

export let errorStatus = false;

export function changeStatus(boolean) {
  errorStatus = boolean;
}

export function checkWithRegex(regex, value, id) {
  const regexTest = new RegExp(regex).test(value);
  if (regexTest) {
    emptyEntryEmptyText(id);
  } else {
    changeStatus(true);
    emptyEntryText(id);
  }
}