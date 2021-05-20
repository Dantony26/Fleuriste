let bouquetBloc = document.getElementById('bouquetBloc');
let annivBloc = document.getElementById('annivBloc');
let plantBloc = document.getElementById('plantBloc');


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
            jsonData.push(products[this.value]);
            localStorage.setItem("addToCart", JSON.stringify(jsonData));
        }
    });
});

let cartToFill  = document.getElementById('cartToFill');
localStorageData = JSON.parse(localStorage.addToCart);
if (localStorageData != null) {
    localStorageData.forEach((element, key) => {
        if(element != null) {
            cartToFill.innerHTML += `<div id="product_${key}">
            <div class="d-flex flex-row justify-content-between mb-5">
              <div class="d-flex flex-row row gx-0">
                <div class="border me-5 col-4"><img class= "w-100"src="assets/img/${element.img}" alt=""></div>
              <div class="border col-4">
                <p class="my-2 me-2">${element.productName}</p>
                  <p class="my-2 me-2">${element.price}€</p>
                <div class="d-flex flex-row align-middle">
                  <p class="my-2 me-2">Quantité</p>
                  <select class="form-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <p class="my-2 me-2">Ref: 10${key}</p>
              </div>
              </div>
              <div class="border col-4">
                <p>prix</p>
              </div>
            </div>
          </div>`;
        };
    });

};