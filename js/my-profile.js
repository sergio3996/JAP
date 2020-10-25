function loadProfile() {
  if (localStorage.getItem("profile")) {
    let profile = JSON.parse(localStorage.getItem("profile"));
    document.getElementById("profileimg").src = profile.pic;
    document.getElementById("name").value = profile.name;
    document.getElementById("surnames").value = profile.surnames;
    document.getElementById("age").value = profile.age;
    document.getElementById("email").value = profile.email;
    document.getElementById("phone").value = profile.phone;
  }
}

function save() {
  let profile = {}
  profile.pic = document.getElementById("urlprofileimg").value;
  profile.name = document.getElementById("name").value;
  profile.surnames = document.getElementById("surnames").value;
  profile.age = document.getElementById("age").value;
  profile.email = document.getElementById("email").value;
  profile.phone = document.getElementById("phone").value;

  localStorage.setItem("profile", JSON.stringify(profile));
}


document.addEventListener("DOMContentLoaded", function (e) {

  loadProfile();
  
  let usuarioLogueado = localStorage.getItem('Usuario');
  if (!usuarioLogueado) {
    localStorage.setItem("login-need", JSON.stringify({
      from: "my-profile.html",
      msg: "Debe estar logeado para ver su perfil!"
    }));
    window.location = "index.html"
  }

  let form = document.getElementById("needs-validation");

  form.addEventListener('submit', function (e) {
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    save();
    form.classList.add("was-validated");
  })

});