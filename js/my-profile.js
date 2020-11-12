function loadProfile() { 
  if (localStorage.getItem("profile")) {
    let profile = JSON.parse(localStorage.getItem("profile"));
    $("#profileimg").attr("src", profile.pic);
    $("#profileimg").val(profile.pic);
    $("#name").val(profile.names);
    $("#surnames").val(profile.surnames);
    $("#age").val(profile.age);
    $("#email").val(profile.email);
    $("#phone").val(profile.phone);
  }
}

function save() {
  let profile = {}
  profile.pic = $("#urlprofileimg").val();
  profile.names = $("#name").val();
  profile.surnames = $("#surnames").val();
  profile.age = $("#age").val();
  profile.email = $("#email").val();
  profile.phone = $("#phone").val();

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