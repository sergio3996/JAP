var productInfoArray = [];
var commentsArray = [];

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

function showComments(array) {
    let htmlContentToAppend = "";
    let puntos = "";
    

    
    
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        
        for(let i = 1; i <= comment.score; i++){
            puntos += `<span class="fa fa-star checked"></span>`;
        }

        for(let i = comment.score + 1; i <= 5; i++){
            puntos += `<span class="fa fa-star"></span>`;
        }

        htmlContentToAppend += '<p><strong>' + comment.user + ':</strong></p>';
        htmlContentToAppend += '<p>' + comment.description + '</p>';
        htmlContentToAppend += '<p>Puntuación: ' + puntos + '</p>';
        htmlContentToAppend += '<p id="fecha">' + comment.dateTime + '</p>';
        htmlContentToAppend += '<hr id="hrcomentario">';
        puntos = "";
    
        
        
        
        
        
        document.getElementById("comments").innerHTML = htmlContentToAppend;
        


    }
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

    document.getElementById("sendcomm").addEventListener("click", function(){
        var x = new Date();
        let newComm = {
            score: parseInt(document.getElementById("stars").value),
            description: document.getElementById("newcomm").value,
            user: JSON.parse(localStorage.getItem("Usuario")).email,
            dateTime: x.getFullYear() + "-" + (x.getMonth()+1) + "-" + x.getDate() + "  " + x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds()
        };
       commentsArray.push(newComm);
       showComments(commentsArray);
    })
});