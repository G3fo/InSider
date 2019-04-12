//The following key has been issued for Congress API
//KEY: cYMTdFJS13jzEeSby2onJewefObRpQKCL6NOReqD 


// Cuando el usuario scrollea, ejecuta my function
window.onscroll = function() {agregaClasesADivs()};

//  Agarra la navbar y el header
var navbar = document.getElementById("navbar");
var header = document.getElementById("header");

// Obtiene la posicion de la navbar
var sticky = navbar.offsetTop;

// Agrega la propiedad "sticky" cuando scrolleas, la saca cuando volves a la posicion default de la navbar
function agregaClasesADivs() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    header.classList.add("header0px")
  } else {
    navbar.classList.remove("sticky");
    header.classList.remove("header0px")
  }
}
