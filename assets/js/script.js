let bouquetBloc = document.getElementById('bouquetBloc');
let annivBloc = document.getElementById('annivBloc');
let plantBloc = document.getElementById('plantBloc');
let reloadCart = document.getElementById("reloadCart");

document.getElementById('bouquetButton').addEventListener('click', function () {

    bouquetBloc.className = '';
    annivBloc.className = '';
    plantBloc.className = '';
    bouquetBloc.classList.add('d-block');
    annivBloc.classList.add('d-none');
    plantBloc.classList.add('d-none');

});

document.getElementById('annivButton').addEventListener('click', function () {

    bouquetBloc.className = '';
    annivBloc.className = '';
    plantBloc.className = '';
    bouquetBloc.classList.add('d-none');
    annivBloc.classList.add('d-block');
    plantBloc.classList.add('d-none');

});

document.getElementById('plantButton').addEventListener('click', function () {

    bouquetBloc.className = '';
    annivBloc.className = '';
    plantBloc.className = '';
    bouquetBloc.classList.add('d-none');
    annivBloc.classList.add('d-none');
    plantBloc.classList.add('d-block');

});


let articlesName = document.getElementsByClassName('article');
let articlesDesc = document.getElementsByClassName('description');
let articlesPrice = document.getElementsByClassName('price');
let addToCart = document.querySelectorAll(".addToCart");

addToCart.forEach(element => {
    element.addEventListener('click', function () {
        let retrievedDataFromLocalStorage = localStorage.getItem('addToCart');

        if (retrievedDataFromLocalStorage == null) {

            localStorage.setItem("addToCart", JSON.stringify([products[this.value]]));

        } else {

            jsonData = JSON.parse(retrievedDataFromLocalStorage);
            let arrayRef = [];
            jsonData.forEach(t => {
                arrayRef.push(t.ref);
            });
            if (arrayRef.includes(products[this.value].ref)) {
                jsonData[this.value].qty++;
                localStorage.setItem("addToCart", JSON.stringify(jsonData));
            } else {
                jsonData.push(products[this.value]);
                localStorage.setItem("addToCart", JSON.stringify(jsonData));
            }
        }
    });
});


let CartButton = document.getElementById('cartButton');


CartButton.addEventListener('click', function () {
    let cartToFill = document.getElementById('cartToFill');
    localStorageData = JSON.parse(localStorage.addToCart);
    if (localStorageData != null) {
        cartToFill.innerHTML = '<div id="cartContent"></div>';
        let cartContent = document.getElementById('cartContent');
        localStorageData.forEach((element, key) => {

            if (element.qty > 0) {

                let test = element.price * element.qty;
                cartContent.innerHTML += `<div class="productCart border my-3" id="product_${key}" value="${key}">
                    <div class="d-flex flex-row justify-content-between p-3">
                      <div class="d-flex flex-row row gx-0 col-9">
                        <div class="me-5 col-3 imgCart"><img class= "w-100"src="assets/img/${element.img}" alt=""></div>
                      <div class="col-sm-6 col-9">
                        <p class="my-2 me-2">${element.productName}</p>
                          <p class="my-2 me-2 priceOfArticle" id="priceOfArticle${key}">Prix: ${element.price}€</p>
                        <div class="d-flex flex-row align-middle">
                          <p class="my-2 me-2">Quantité: 
                          <button type="button" class="btn minusButton" value="${key}">-</button> 
                          <span class="numberOfArticle" id="numberOfArticle${key}">${element.qty}</span>
                          <button type="button" class="btn plusButton" value="${key}">+</button></p>
                        </div>
                        <p class="my-2 me-2">Ref: ${element.ref}</p>
                      </div>
                      </div>
                      <div class="col-3">
                        <p>Total: <span class="articlePrice" id="articlePrice${key}">${test.toFixed(2)}</span>€</p>
                      </div>
                      <button type="button" class="btn-close deleteButtons" value="${key}"></button>
                    </div>
                  </div>`;
            }
        });
        let totalPriceCart = () => {
            let articlePrice = document.querySelectorAll('.articlePrice');
            let totalPriceParagraph = document.getElementById('totalPrice');
            let totalPrice = 0;
            if (articlePrice.length > 0) {
                articlePrice.forEach(u => {
                    totalPrice += parseFloat(u.textContent);
                    totalPriceParagraph.innerText = `Prix total de la commande : ${totalPrice.toFixed(2)}€`;
                });
            } else {
                totalPriceParagraph.innerText = 'Le panier est vide';
            }
        }

        totalPriceCart();

        let deleteButtonsArray = document.querySelectorAll(".deleteButtons");
        let productCart = document.querySelectorAll(".productCart");
        deleteButtonsArray.forEach(d => {
            d.addEventListener("click", function () {
                articleToDelete = this.value;
                localStorageData[articleToDelete].qty = 0;
                localStorage.setItem("addToCart", JSON.stringify(localStorageData));
                document.getElementById("product_" + articleToDelete).remove();
                totalPriceCart();


            });
        });

        let decreaseNumberOfArticles = document.querySelectorAll(".minusButton");

        decreaseNumberOfArticles.forEach(m => {
            m.addEventListener("click", function () {
                let retrievedDataFromLocalStorage = localStorage.getItem('addToCart');
                jsonData = JSON.parse(retrievedDataFromLocalStorage);
                if (jsonData[this.value].qty > 1) {
                    jsonData[this.value].qty--;
                    localStorage.setItem("addToCart", JSON.stringify(jsonData));
                    document.getElementById(`numberOfArticle${this.value}`).innerText = jsonData[this.value].qty;
                    let totalArticles = jsonData[this.value].price * jsonData[this.value].qty
                    document.getElementById(`articlePrice${this.value}`).innerText = totalArticles.toFixed(2);
                    totalPriceCart();
                } else {
                    document.getElementById(`product_${this.value}`).outerHTML = '';
                    jsonData[this.value].qty = 0;
                    localStorage.setItem("addToCart", JSON.stringify(jsonData));
                    totalPriceCart();
                }
            });
        });

        let increaseNumberOfArticles = document.querySelectorAll(".plusButton");
        increaseNumberOfArticles.forEach(p => {
            p.addEventListener("click", function () {
                let retrievedDataFromLocalStorage = localStorage.getItem('addToCart');
                jsonData = JSON.parse(retrievedDataFromLocalStorage);
                if (jsonData[this.value].qty >= 0) {
                    jsonData[this.value].qty++;
                    localStorage.setItem("addToCart", JSON.stringify(jsonData));
                    document.getElementById(`numberOfArticle${this.value}`).innerText = jsonData[this.value].qty;
                    let totalArticles = jsonData[this.value].price * jsonData[this.value].qty
                    document.getElementById(`articlePrice${this.value}`).innerText = totalArticles.toFixed(2);
                    totalPriceCart();
                } else {
                    document.getElementById("product_" + articleToDelete).remove();
                    totalPriceCart();
                }
            });
        });
    };
});


document.getElementById('modalPanier').addEventListener('hidden.bs.modal', function () {
    let cartToFill = document.getElementById('cartToFill');
    cartToFill.removeChild(document.getElementById('cartContent'));
    totalPrice.innerHTML = "Le panier est vide";

})