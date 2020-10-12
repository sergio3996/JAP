//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let usuarioLogueado = localStorage.getItem('Usuario');
    if (!usuarioLogueado) {
      localStorage.setItem("login-need", JSON.stringify({
        from: "my-profile.html",
        msg: "Debe estar logeado para ver su perfil!"
      }));
      window.location = "index.html"
    }


});