function getProducts(category){
    return fetch("http://localhost:3000/api/"+category)
  .then(function(res) {
    res.json()
  })
  .then(function(datas) {
    return datas;
  })
  .catch(function(err) {
      console.log("An error occured : "+err)
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
                      <span>890<b>€</b></span>
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