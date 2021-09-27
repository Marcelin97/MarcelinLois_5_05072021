import * as index from "./index";

////////////////////////////////////////////
/////////////////getProduct/////////////////
////////////////////////////////////////////
function getProduct() {
  const url = new URL(window.location.href);
  return (
    fetch(
      "http://localhost:3000/api/" +
        url.searchParams.get("category") +
        "/" +
        url.searchParams.get("id")
    )
      // Convert this data to JSON
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((datas) => {
        return datas;
      })
      //catch in case of error which resumes the "displayError" function
      .catch((error) => {
        displayError();
        return false;
      })
  );
}
////////////////////////////////////////////
/////////////////getProduct/////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//////////message in case of error//////////
////////////////////////////////////////////
function displayError() {
  let mainContent = document.getElementById("container");
  mainContent.innerHTML = `
  <section id="titre">
    <h1>Ce produit n'existe pas</h1>
        <p>Il semblerait que vous essayez d'accéder à un produit qui n'est pas ou plus dans notre catalogue. <br> 
        Pour ce faire, vous pouvez consulter la liste de nos produits actuellement disponibles veuillez cliquer sur le bouton suivant : </p>
      <a class="btn" href="../index.html">Notre catalogue</a>
  </section>
  `;
}
////////////////////////////////////////////
//////////message in case of error//////////
////////////////////////////////////////////

////////////////////////////////////////////
////////////////renderProduct///////////////
////////////////////////////////////////////
function renderProduct(product) {
  let container = document.getElementById("container");
  document.getElementsByTagName("img")[0].src = product.imageUrl;
  document.getElementsByTagName("h1")[0].innerHTML = product.name;
  document.getElementsByTagName("select")[0].innerHTML =
    '<option value="">Veuillez choisir une option</option>' +
    getOptions(product[getCustomisation(product)]);
  document.getElementsByName("price")[0].innerHTML = index.priceToEuros(
    product.price
  );
}
////////////////////////////////////////////
////////////////renderProduct///////////////
////////////////////////////////////////////

////////////////////////////////////////////
////////////////isProductExist//////////////
////////////////////////////////////////////
getProduct().then((result) => {
  // déclaration d'une promise
  if (!result) {
    throw new Error("Product not found");
  }
  //j'appel ma fonction pour l'exécuté
  renderProduct(result);

  // Envoie valeur à localStorage après 'ajout au panier'
  document
    .getElementsByTagName("form")[0]
    .addEventListener("submit", function (event) {
      //on stop la propagation du click
      event.preventDefault();
      addToCart(result);
    });
});
////////////////////////////////////////////
////////////////isProductExist//////////////
////////////////////////////////////////////

////////////////////////////////////////////////
///////////////Options of product///////////////
////////////////////////////////////////////////
function getCustomisation(product) {
  if ("colors" in product) return "colors";

  if ("lenses" in product) return "lenses";

  if ("varnish" in product) return "varnish";

  return "Unknown";
}

function getOptions(options) {
  let content = "";
  options.forEach((element) => {
    content += `<option value="` + element + `">` + element + `</option>`;
  });
  return content;
}
////////////////////////////////////////////////
///////////////Options of product///////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////
index.incrementDecrement();
////////////////////////////////////////////////
//Button decrement and increment with my input//
////////////////////////////////////////////////

////////////////////////////////////////////////
/////////addToCart and if product exist/////////
////////////////////////////////////////////////
function addToCart(result) {
  //j'appel mon panier qui est stocké dans une fonction dans mon index.js
  let cart = index.getCart();

  // Cette fonction assigne les valeurs du produit à envoyer dans le localStorage
  let product = {
    _id: result._id,
    name: result.name,
    description: result.description,
    imageUrl: result.imageUrl,
    price: result.price,
    optionValue: document.getElementById("options").value,
    qty: Number(document.getElementById("quantity").value),
  };

  //on déclare une constante produit est = trouvé dans le panier
  const isProduct = cart.find(
    (element) =>
      // Le nouvel élément avec son id et égale au produit avec son id ET son option et égale au produit
      element._id === product._id && element.optionValue === product.optionValue
  );
  //si le produit n'existe pas déjà dans le panier, alors ajoute le
  if (isProduct === undefined) {
    //pour ajouté au panier
    cart.push(product);
    alert("Le produit est dans le panier ! ");
    window.location = "cart.html";

    // Send data back to storage as a STRING
    localStorage.setItem("cart", JSON.stringify(cart));
    //sinon
  } else {
    //On crée un panier temporaire pour stocker le panier actuel
    const newCart = cart.map((element) => {
      //si l'élément dans la panier est identique au produit que l'on veut ajouter
      if (element._id === product._id) {
        //ajoute la quantité = doit être égale au produit existant + le produit que l'on ajoute
        element.qty = product.qty + isProduct.qty;
      }
      //retourne moi le nouvelle élément à jour
      alert("Le panier a été mis a jour ! ");
      window.location = "cart.html";
      return element;
    });
    //get the new cart
    // Send data back to storage as a STRING
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  index.setCounterCart();
}
////////////////////////////////////////////////
/////////addToCart and if product exist/////////
////////////////////////////////////////////////
