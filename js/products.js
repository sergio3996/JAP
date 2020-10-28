const ORDER_ASC_BY_PRICE = "MAYOR";
const ORDER_DESC_BY_PRICE = "MENOR";
const ORDER_BY_PROD_SOLDCOUNT = "Relev.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
var buscar = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLDCOUNT) {
        result = array.sort(function (a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function addCart(i) {
    let carrito = localStorage.getItem("carrito");
    let arraycarrito = [];
    let existente = false;
    if (carrito) {
        arraycarrito = JSON.parse(carrito)
        arraycarrito.forEach(function (currentValue) {
            if (currentValue.name == currentProductsArray[i].name) {
                existente = true;
                
            }
        })
        if(existente){
            alert("Este producto ya se encuentra en su carrito");
        }else{
            arraycarrito.push(currentProductsArray[i].name)
        }

    }else{
        arraycarrito.push(currentProductsArray[i].name)
    }

    localStorage.setItem(`carrito`, JSON.stringify(arraycarrito));
}

function showProductsList() {

    let htmlContentToAppend = "";
    let userLogged = localStorage.getItem("Usuario")
    
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1) {
                htmlContentToAppend += `
               
                <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                <a href="product-info.html"><img class="card-img-top" src="${product.imgSrc}" alt="${product.description}"></a>
                  <div class="card-body">
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Precio: ${product.currency} ${product.cost}</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">Productos Vendidos ${product.soldCount}</small>
                    <div class="btn-group">
                      <button type="button" class="btn btn-primary ${userLogged? "":"d-none"}" style="float: right;font-size: 12px;" id="addcart${i}" onclick="addCart(${i})">Agregar al carrito</button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                
               
                `
            
            }
        }

        document.getElementById("productslist").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);


    showProductsList();
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRelev").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangePrice").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function () {
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showProductsList();

    });

    document.getElementById('searchbar').addEventListener('input', function () {
        buscar = document.getElementById('searchbar').value.toLowerCase();
        showProductsList();
    })

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

});

