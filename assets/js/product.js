import * as index from "./index";

//message in case of error
function displayError() {
  let mainContent = document.getElementById('container');
  mainContent.innerHTML = '';
  mainContent.innerHTML += `
  <div>
      <h1>Ce produit n'existe pas</h1>
      <p>Il semblerait que vous essayez d'accéder à un produit qui n'est pas ou plus dans notre catalogue. <br> 
      Pour ce faire, vous pouvez consulter la liste de nos produits actuellement disponibles veuillez cliquer sur le bouton suivant : </p>
      <a href="../index.html">Notre catalogue</a>
  </div>
  `
}
//message in case of error


function getProduct(){
    const url=new URL("window.location.href");
    return fetch('http://localhost:3000/api/ ' + url.searchParams.get("category")+ '/' + url.searchParams.get("id"))
    // Convert this data to JSON
    .then(response => response.json())
    .then(datas => {
        return datas;
    })
    //catch in case of error which resumes the "displayError" function
    .catch(error => {
        displayError();
        return error;
    });
}

function renderProduct(product){
    let container=document.getElementById("container");
    let content=`
    <div class="col-1">
        <div>
          <img src="`+element.imageUrl+`"
          alt="Appareil photo vintage sur un gard-corp bois en extérieur"
          />
        </div>
      </div>

      <div class="col-2">
        <div>
          <h1>`+element.name+`</h1>
          <p>`+element.description+`</p>
          <div>`+index.priceToEuros(element.price)+`</div>
          <form action="#" method="post">
            <fieldset>
              <legend>Personnalisation du produit</legend>
              <label for="options">Choisir une option</label>
              <div>
                <select name="option" id="options">
                  <option value="hidden">Veuillez choisir une option</option>
                  <option value="sacoche">sacoche</option>
                  <option value="sacoche et pied">sacoche et pied</option>
                </select>
              </div>
              <div class="quantity">
                <label for="quantity">Quantité</label>
                <div class="cart-update">
                  <button type="button" class="btn-update"><i class="fas fa-minus"></i></button>
                  <input type="number" id="quantity" value="1">
                  <button type="button" class="btn-update"><i class="fas fa-plus"></i></button>
                </div>
              </div>
            </fieldset>
            <button class="btn" type="submit" title="ajouter au panier" value="ajouter au panier">Ajouter au panier<i class="fas fa-shopping-cart"></i></button>
          </form>
        </div>
      </div>
    </div>
    `;
    container.innerHTML=content;
}
getProduct().then(result => {
    renderProducts(result);
});