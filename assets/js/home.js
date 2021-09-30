import * as index from "./index";

////////////////////////////////////////////
/////////////getProducts from API///////////
////////////////////////////////////////////
function getProducts(category) {
  return fetch("http://localhost:3000/api/" + category)
    .then((response) => response.json())
    .then((datas) => {
      return datas;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}
////////////////////////////////////////////
/////////////getProducts from API///////////
////////////////////////////////////////////

////////////////////////////////////////////
////////////renderProducts in HTML//////////
////////////////////////////////////////////
function renderProducts(products, category) {
  let container = document.getElementById("container");
  let content = "";
  products.forEach((element) => {
    content +=
      `
        <article>
                <figure>
                  <a href="./pages/product.html?id=` +
      element._id +
      `&category=` +
      category +
      `">
                  <img
                    src="` +
      element.imageUrl +
      `"
                    alt="Appareil photo vintage sur un gard-corp bois en extérieur"
                  />
                  <div><i class="fas fa-plus"></i></div>
                  </a>
                </figure>
                <div>
                  <a href="./pages/product.html">
                    <div>
                      <h3>` +
      element.name +
      `</h3>
                      <p>` +
      element.description +
      `
                      </p>
                      <span>` +
      index.priceToEuros(element.price) +
      `</span>
                    </div>
                  </a>
                </div>
            </article>
        `;
  });
  container.innerHTML = content;
}
////////////////////////////////////////////
////////////renderProducts in HTML//////////
////////////////////////////////////////////

////////////////////////////////////////////
/////I call my function with an argument////
////////////////////////////////////////////
getProducts("cameras").then((result) => {
  renderProducts(result, "cameras");
});
////////////////////////////////////////////
/////I call my function with an argument////
////////////////////////////////////////////
