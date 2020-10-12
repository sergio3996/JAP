//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    let loginNeed = localStorage.getItem('login-need');

    if (loginNeed){
        loginNeed = JSON.parse(loginNeed);
        document.getElementById("alert").innerHTML =`
        <div class="alert alert-danger alert=dismissible fade show" id="msg" role="alert">
        <span id="msg">${loginNeed.msg}</span>
        <a href="#" class="close" data=dismiss="alert">&times;</a>
        </div> 
        `
    }
    
    
    
    document.getElementById("ingresar").addEventListener("click", function(e){
        
        let password = document.getElementById("Inpassword");
        let email = document.getElementById("Inemail");
        let camposCompletos = true;

        if (password.value === '' || email.value === ''){
            camposCompletos = false;
            alert("Debes ingresar los datos!");
        
        }
        if(loginNeed){
            localStorage.removeItem("login-need");
            localStorage.setItem('Usuario', JSON.stringify({ email: email.value}))
            window.location = loginNeed.from;
        }
        if (camposCompletos && !loginNeed){
            localStorage.setItem('Usuario', JSON.stringify({ email: email.value}));
            window.location = "inicio.html";
        }
        

    });

});