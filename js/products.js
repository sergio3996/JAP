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



function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1) {
                htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                    </div>
                        <small class="text-muted">Precio: ${product.currency} ${product.cost}</small>
                        
                    </div>
                    <p>${product.soldCount} Productos vendidos</p><br>
                    <p><a href="product-info.html">Aquí</a> puede ver informacion del producto</p>
                    
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
    
    document.getElementById('searchbar').addEventListener('input', function(){
        buscar = document.getElementById('searchbar').value.toLowerCase();
        showProductsList();
    })



});

