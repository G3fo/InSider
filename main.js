//The following key has been issued for Congress API
//KEY: cYMTdFJS13jzEeSby2onJewefObRpQKCL6NOReqD 


//Hice todo esto al pedo porque bootstrap tiene una clase que se llama sticky-top que hace esto por vos.


// Cuando el usuario scrollea, ejecuta my function
window.onscroll = function () { agregaClasesADivs() };

//  Agarra la navbar y el header
var navbar = document.getElementById("navbar");
var header = document.getElementById("header");

// Obtiene la posicion de la navbar
var sticky = navbar.offsetTop;

// Agrega la propiedad "sticky" cuando scrolleas, la saca cuando volves a la posicion default de la navbar
function agregaClasesADivs() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky-top")
  } else {
    navbar.classList.remove("sticky-top");
  }
}


var republicans = document.getElementsByClassName("R");
var democrats = document.getElementsByClassName("D");
var independent = document.getElementsByClassName("I");


//checkedOption = document.querySelector('party:checked').value;

//addEventListener.querySelector("party:checked", function () { var checkedOption = document.querySelector('party:checked').value })
//addEventListener.querySelector("party:checked", partyFilter())


function partyFilter(selectedParty) {

  if (selectedParty == "R") {
    for (var i = 0; i < republicans.length; i++) {
      democrats.classList.add("hide");
      independent.classList.add("hide");
      republicans[i].classList.remove("hide");
    }
  }
  else if (selectedParty == "D") {
    for (var i = 0; i < democrats.length; i++) {
      republicans.classList.add("hide");
      independent.classList.add("hide");
      democrats[i].classList.remove("hide");
    }
  }
  else (selectedParty == "I");{
    for (var i = 0; i < independent.length; i++) {
      republicans.classList.add("hide");
      democrats.classList.add("hide");
      independent[i].classList.remove("hide");
    }
  }
}


