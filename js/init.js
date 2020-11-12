
const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


/*
const CATEGORIES_URL = "/json/CATEGORIES_URL";
const PUBLISH_PRODUCT_URL = "/json/PUBLISH_PRODUCT_URL";
const CATEGORY_INFO_URL = "/json/CATEGORY_INFO_URL";
const PRODUCTS_URL = "/json/PRODUCTS_URL";
const PRODUCT_INFO_URL = "/json/PRODUCT_INFO_URL";
const PRODUCT_INFO_COMMENTS_URL = "/json/PRODUCT_INFO_COMMENTS_URL";
const CART_INFO_URL = "/json/CART_INFO_URL";
const CART_BUY_URL = "/json/CART_BUY_URL";
const NEW_COMMENT = "/new-comment";
const CHECKOUT = "/checkout"
*/

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

var postJSONData = function (url, obj){
  var result = {}
  return fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
  });
}


document.addEventListener("DOMContentLoaded", function(e){
  
  let usuarioLogueado = localStorage.getItem('Usuario');
  let infoUsuario = document.getElementById("infoUsuario");
  let Usuario = document.getElementById("usuario");

  if (usuarioLogueado) {
    usuarioLogueado = JSON.parse(usuarioLogueado);
    Usuario.innerHTML = Usuario.innerText+ "Bienvenido " + usuarioLogueado.email + "!";
    infoUsuario.style = "display: inline-block";
  }

  document.getElementById("salir").addEventListener("click", function(e){
    localStorage.removeItem('Usuario');
    window.location = "index.html"

  })
});