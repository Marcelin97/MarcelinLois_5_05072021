import * as index from "./index";

function getProducts(category){
    return fetch('http://localhost:3000/api/' + category)
    .then(response => response.json())
    .then(datas => {
        return datas;
    })
    .catch(error => {
        console.log(error);
        return error;
    });
}

function renderProducts(products){
    let container=document.getElementById("container");
    let content="";
    products.forEach(element => {
        content+=`
        <article>
                <figure>
                  <a href="./pages/product.html">
                  <img
                    src="`+element.imageUrl+`"
                    alt="Appareil photo vintage sur un gard-corp bois en extérieur"
                  />
                  <div><i class="fas fa-plus"></i></div>
                  </a>
                </figure>
                <div>
                  <a href="./pages/product.html">
                    <div>
                      <h3>`+element.name+`</h3>
                      <p>`+element.description+`
                      </p>
                      <span>`+index.priceToEuros(element.price)+`</span>
                    </div>
                  </a>
                </div>
            </article>
        `;
    });
    container.innerHTML=content;
}
console.log(getProducts("cameras"));
getProducts("cameras").then(result => {
    renderProducts(result);
});