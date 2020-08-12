//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("ingresar").addEventListener("click", function(e){
        let password = document.getElementById("Inpassword");
        let email = document.getElementById("Inemail");
        let camposCompletos = true;

        if (password.value === '' || email.value === ''){
            camposCompletos = false;
            alert("Debes ingresar los datos!");
        }
        if (camposCompletos){
            window.location = "inicio.html";
        }
       

    });

});