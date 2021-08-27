import * as index from "./index";

//message in case of error
function displayError() {
  let mainContent = document.getElementById("container");
  mainContent.innerHTML = `
  <section id="titre">
    <div>
        <h1>Ce produit n'existe pas</h1>
        <p>Il semblerait que vous essayez d'accéder à un produit qui n'est pas ou plus dans notre catalogue. <br> 
        Pour ce faire, vous pouvez consulter la liste de nos produits actuellement disponibles veuillez cliquer sur le bouton suivant : </p>
        <a class="btn" href="../index.html">Notre catalogue</a>
    </div>
  </section>
  `;
}
//message in case of error

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
        document
          .getElementsByTagName("form")[0]
          .addEventListener("submit", () => {
            //Add product to localstorage
          });

        return datas;
      })
      //catch in case of error which resumes the "displayError" function
      .catch((error) => {
        return false;
      })
  );
      }

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

getProduct().then((result) => {
  // déclaration d'une promise
  if (!result) {
    throw new Error("Product not found");
  }
  renderProduct(result); //j'appel ma fonction pour l'exécuté
  document
    .getElementsByTagName("form")[0]
    .addEventListener("submit", function (event) {
      // Envoie valeur à localStorage après soumission du formulaire

      event.preventDefault(); //on stop la propagation

      let cart = []; //on déclare le panier en tableau (pas en objet)

      if (localStorage.getItem("cart") !== null) {
        //si le panier est différent en type et en valeur de null
        cart = JSON.parse(localStorage.getItem("cart")); //mets à jour le panier
      }

      let product = {
        // Cette fonction assigne les valeurs du produit à envoyer dans le localStorage
        _id: result._id,
        name: result.name,
        description: result.description,
        imageUrl: result.imageUrl,
        price: result.price,
        optionValue: document.getElementById("options").value,
        qty: Number(document.getElementById("quantity").value),
      };

      //fonction si le produit existe déjà dans le panier
      function isProductExist(product) {
        const isProduct = cart.find( //on déclare une constante produit est = trouvé dans le panier
          (element) => //element 
            element._id === product._id && // Le nouvel élement avec son id et égale au produit avec son id ET son option et égale au produit
            element.optionValue === product.optionValue
        );
        if (isProduct === undefined) {
          //si le produit n'existe pas déjà dans le panier, alors ajoute le
          cart.push(product); //pour ajouté au panier
          localStorage.setItem("cart", JSON.stringify(cart)); //ensuite ajoute au localStorage
        } else {
          //sinon
          const newCart = cart.map((element) => { //On crée un panier temporaire pour stocker le panier actuel 
            if (element._id === product._id) { //si l'élément dans la panier est identique au produit que l'on veut ajouter
              element.qty = product.qty + isProduct.qty; //ajoute la quantité = doit être égale au produit existant + le produit que l'on ajoute
            }
            return element; //retourne moi le nouvelle élément à jour
          });
          console.log(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart)); //ajoute le au localStorage
        }
      }
      isProductExist(product); //j'appel ma fonction pour l'exécuté
      console.log(isProduct);
    });
});

// getProduct().then((result) => {
//   if (!result) {
//     throw new Error("Product not found");
//   }
//   renderProduct(result);
//   document
//     .getElementsByTagName("form")[0]
//     .addEventListener("submit", function (event) {
//       // Envoie valeur à localStorage après soumission du formulaire

//       event.preventDefault(); //on stop la propagation
//       let cart = {};
//       if (localStorage.getItem("cart") != null) {
//         cart = JSON.parse(localStorage.getItem("cart"));
//       }

//       let key = result.name + "-" + document.getElementById("options").value;
//       key = key.replace(" ", "_");

//       let product = {
//         // Cette fonction assigne les valeurs à envoyer à localStorage
//         _id: result._id,
//         name: result.name,
//         description: result.description,
//         imageUrl: result.imageUrl,
//         price: result.price,
//         optionValue: document.getElementById("options").value,
//         qty: Number(document.getElementById("quantity").value),
//       };
//       cart[key] = product;
//       localStorage.setItem("cart", JSON.stringify(cart));
//     });
// });

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

//Button decrement and increment with my input

document.addEventListener("DOMContentLoaded", () => {
  let btnIncrement = document.getElementById("increment");
  let input = document.getElementById("quantity");
  let btnDecrement = document.getElementById("decrement");

  btnIncrement.addEventListener("click", () => {
    input.value = parseInt(input.value) + 1;
  });

  btnDecrement.addEventListener("click", () => {
    if (input.value > 0) {
      input.value = parseInt(input.value) - 1;
    }
  });
});

//Button decrement and increment with my input

