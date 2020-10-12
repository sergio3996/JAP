
var cartList = [];

function calcTotal() {
  let total = 0;
  let subs = document.getElementsByClassName("subtotal");

  for (let i = 0; i < subs.length; i++) {
    total += parseInt(subs[i].innerHTML);
  }

  document.getElementById("total").innerHTML = total;
  calcEnvio()

}


function calcSubtotal(cost, i) {

  let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
  subtotal = cantidad * cost;
  document.getElementById(`Subtotal${i}`).innerHTML = subtotal;
  calcTotal()


}


function showCart(array) {

  let htmlContentToAppend = "";
  let htmlContentToAppend2 = "";

  for (let i = 0; i < array.length; i++) {

    if (array[i].currency === "UYU") {
      array[i].unitCost = array[i].unitCost / 40
      array[i].currency = "USD"
    }

    let product = array[i];
    let sub = product.count * product.unitCost;


    htmlContentToAppend += `
                <div class="row mb-4">
                    <div class="col-md-5 col-lg-3 col-xl-3">
                      <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img class="img-fluid w-100"
                          src="${product.src}" alt="">
                      </div>
                    </div>
                    <div class="col-md-7 col-lg-9 col-xl-9">
                      <div>
                        <div class="d-flex justify-content-between">
                          <div>
                            <h5>${product.name}</h5>
                          </div>
                          <div>
                            <div class="def-number-input number-input safari_only mb-0 w-100">
                            <input style="width:60px;" onchange="calcSubtotal(${product.unitCost}, ${i})"
                            type="number" id="cantidad${i}" value="${product.count}" min="1">
                            </div>
                          </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                          </div>
                          <p class="mb-0"><span><strong>${product.currency} ${product.unitCost}</strong></span></p class="mb-0">
                        </div>
                      </div>
                      <br><br>
                      <button class="btn-danger" style="float: right;" onclick="deleteProduct(${i})">Quitar</button>
                    </div>
                  </div>
                  <hr class="mb-4">
                  `


    htmlContentToAppend2 += `
         
      <span>${product.currency} </span><span class="subtotal" id="Subtotal${i}">${sub}</span><br>
        
      `

    document.getElementById("cart").innerHTML = htmlContentToAppend;
    document.getElementById("subtotal1").innerHTML = htmlContentToAppend2;

  }
  calcTotal()
}


function calcEnvio() {
  let total = parseInt(document.getElementById("total").innerHTML);
  let envio = 0
  let selected = ""

  let elements = document.getElementsByName("envio");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      envio = parseInt(elements[i].value);
      selected = elements[i].placeholder;
    }
  }

  let porcentaje = (envio / 100);
  let totalEnvio = porcentaje * total;
  let totalConEnvio = total + porcentaje * total;

  document.getElementById("totalConEnvio").innerHTML = totalConEnvio == 0 ? "" : "USD " + totalConEnvio;
  document.getElementById("EnvioModal").innerHTML = totalEnvio == 0 ? "[Seleccionar]" : `[${selected}]`;
  document.getElementById("costoenvio").innerHTML = totalEnvio == 0 ? "" : "USD " + totalEnvio;

}


function deleteProduct(i) {
  if (cartList.length > 1) {
    cartList.splice(i, 1);
    showCart(cartList);
  } else {

    document.getElementById("micarrito").innerHTML = `
    <br><br><br>
    <h2 "mb-4">¡No tiene productos en su carrito!</h2>
    <p>Agregue productos a su carrito <a href="products.html">aquí</a></p>
    `
  }

}



document.addEventListener("DOMContentLoaded", function (e) {

  let usuarioLogueado = localStorage.getItem('Usuario');
  if (!usuarioLogueado) {
    localStorage.setItem("login-need", JSON.stringify({
      from: "cart.html",
      msg: "Debe estar logeado para ver su carrito!"
    }));
    window.location = "index.html"
  }

  let form = document.getElementById("needs-validation");

  form.addEventListener('submit', function (e) {
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add("was-validated");
  })

  let elements = document.getElementsByName("envio");
  for (let i = 0; i < elements.length; i++) {
    elements[i].checked = false
  }

  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {

      cartList = resultObj.data.articles;

      let newProduct1 = JSON.parse(localStorage.getItem(`product1`));
      if (newProduct1) {
        cartList.push(newProduct1)
      }
      let newProduct2 = JSON.parse(localStorage.getItem(`product2`));
      if (newProduct2) {
        cartList.push(newProduct2)
      }
      let newProduct3 = JSON.parse(localStorage.getItem(`product3`));
      if (newProduct3) {
        cartList.push(newProduct3)
      }

      showCart(cartList);

    }
  })

  document.getElementById("confirmenvio").addEventListener("click", function () {
    showCart(cartList);
  })

  document.getElementById("CancelEnvio").addEventListener("click", function () {
    let elements = document.getElementsByName("envio");
    for (let i = 0; i < elements.length; i++) {
      elements[i].checked = false
    }
    showCart(cartList);
    document.getElementById("EnvioModal").innerHTML = `[Seleccionar]`;

  })


});