
export function checkWithRegex(regex, value, id) {
  const street = "/^([0-9]*) ?([a-zA-Z,. ]*)$";
  const stringWithoutSpecials = "/^([a-zA-ZÀ-ÿ-']{1,20})$/";
  const email =
    "/^[-!#-'*+/-9=?^-~]+(?:.[-!#-'*+/-9=?^-~]+)*@[-!#-'*+/-9=?^-~]+(?:.[-!#-'*+/-9=?^-~]+)+$/i";
  const postalCode = "/^[0-9]{5}$/";
  const phone = "/^(?:(?:+|00)33|0)s*[1-9](?:[s.-]*d{2}){4}$/";
  const regexTest = new RegExp(regex).test(value);
  if (regexTest) {
    emptyEntryEmptyText(id);
    return true;
  } else {
    emptyEntrytext(id);
    return false;
  }
};

    ////////////////////////////Text alert input//////////////////////////////

  //Fonction pour gérer l'affichage du texte alert à côté de l'input
  //pour indiquer à l'utilisateur qu'il faut bien remplir le champ
function emptyEntryEmptyText(querySelectorId) {
    // if yes, the input value is correct
    document.querySelector(`#${querySelectorId}`).innerHTML = "";
  };

function emptyEntryText(querySelectorId) {
    // if not, display a small message to let the client know what's going wrong
    document.querySelector(`#${querySelectorId}`).textContent =
      "Veuillez bien renseigner ce champ.";
  };

  ////////////////////////////Text alert input//////////////////////////////
