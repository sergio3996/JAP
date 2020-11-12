var productInfoArray = [];
var commentsArray = [];
var productsArray = [];

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
    ArrayRelatedProducts.forEach(function (i) {

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${ArrayProducts[i].imgSrc}" alt="${ArrayProducts[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${ArrayProducts[i].name}</h4><br>
                    </div>
                    <p class="mb-1">${ArrayProducts[i].description}</p><br>
                </div>
            </div>
        </a>
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

            document.getElementById("image1").src = productInfoArray.images[0]
            document.getElementById("image2").src = productInfoArray.images[1]
            document.getElementById("image3").src = productInfoArray.images[2]
            document.getElementById("image4").src = productInfoArray.images[3]
            document.getElementById("image5").src = productInfoArray.images[4]

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

        postJSONData(NEW_COMMENT, newComm).then(function (resultObj) {
            if (resultObj.status === "ok") {
                alert(resultObj.data.msj)
            }
        })
        
        sendComment(newComm);
        showComments(commentsArray);
    })

    let usuarioLogueado = localStorage.getItem('Usuario');
    let Comentarios = document.getElementById('newcomments')
    if (usuarioLogueado) {
        Comentarios.style = "display: inline-block";
    }

});