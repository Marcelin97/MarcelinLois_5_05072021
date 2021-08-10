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
    '<option value="hidden">Veuillez choisir une option</option>' +
    getOptions(product[getCustomisation(product)]);
  document.getElementsByName("price")[0].innerHTML = index.priceToEuros(
    product.price
  );
}

getProduct().then((result) => {
      if (!result) {
        throw new Error("Product not found");
      }
  renderProduct(result);
});

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


//Button drecrement and increment with my input

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

//Button drecrement and increment with my input
