var productInfoArray = [];
var commentsArray = [];
var productsArray = [];

function showProductInfo(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}

function sendComment(commentt) {
    if (document.getElementById("newcomm").value != "") {
        commentsArray.push(commentt)
    }
}

function showComments(array) {
    let htmlContentToAppend = "";
    let stars = "";




    for (let i = 0; i < array.length; i++) {
        let comment = array[i];

        for (let i = 1; i <= comment.score; i++) {
            stars += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            stars += `<span class="fa fa-star"></span>`;
        }

        htmlContentToAppend += '<p><strong>' + comment.user + ':</strong></p>';
        htmlContentToAppend += '<p>' + comment.description + '</p>';
        htmlContentToAppend += '<p>Puntuación: ' + stars + '</p>';
        htmlContentToAppend += '<p id="fecha">' + comment.dateTime + '</p>';
        htmlContentToAppend += '<hr id="hrcomentario">';
        stars = "";
        



        document.getElementById("comments").innerHTML = htmlContentToAppend;



    }
}

function showRelatedProducts(ArrayProducts, ArrayRelatedProducts) {
    let htmlContentToAppend = ''
    ArrayRelatedProducts.forEach(function(i){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${ArrayProducts[i].imgSrc}" alt="${ArrayProducts[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4>${ArrayProducts[i].name}</h4>
                        <p>${ArrayProducts[i].description}</p>
                    </div>
                        <small class="text-muted">Precio: ${ArrayProducts[i].currency} ${ArrayProducts[i].cost}</small>
                        
                    </div>
                    <p>${ArrayProducts[i].soldCount} Productos vendidos</p><br>
                    
                </div>
            </div>
        </div>
        `
    });
    document.getElementById("relatedproducts").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfoArray = resultObj.data;

            let productName = document.getElementById("productName");
            let productDescription = document.getElementById("productDescription");
            let productCount = document.getElementById("productSoldCount");
            let productCost = document.getElementById("productCost");
            let productCategory = document.getElementById("productCategory");

            productName.innerHTML = productInfoArray.name;
            productDescription.innerHTML = productInfoArray.description;
            productCount.innerHTML = productInfoArray.soldCount;
            productCost.innerHTML = productInfoArray.cost + " " + productInfoArray.currency;
            productCategory.innerHTML = productInfoArray.category;

            showProductInfo(productInfoArray.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showComments(commentsArray);
        }
    })

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showRelatedProducts(productsArray, productInfoArray.relatedProducts)
        }
    })

    document.getElementById("sendcomm").addEventListener("click", function () {
        var x = new Date();
        let newComm = {
            score: parseInt(document.getElementById("stars").value),
            description: document.getElementById("newcomm").value,
            user: JSON.parse(localStorage.getItem("Usuario")).email,
            dateTime: x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate() + "  " + x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds()
        };


        sendComment(newComm);
        showComments(commentsArray);
    })

    let usuarioLogueado = localStorage.getItem('Usuario');
    let Comentarios = document.getElementById('newcomments')
    if (usuarioLogueado) {
        Comentarios.style = "display: inline-block";
    }

});