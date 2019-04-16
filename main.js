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


function republicanFilter(selectedParty) {

  if (selectedParty === "R") {
    for (var i = 0; i < republicans.length; i++) {
      republicans[i].classList.remove("hide");
    }
    for (var i = 0; i < democrats.length; i++) {
      democrats[i].classList.add("hide");
    }
    for (var i = 0; i < independent.length; i++) {
      independent[i].classList.add("hide");
    }
  }
}

function democratFilter(selectedParty) {
  if (selectedParty === "D") {
    for (var i = 0; i < democrats.length; i++) {
      democrats[i].classList.remove("hide");
    }
    for (var i = 0; i < independent.length; i++) {
      independent[i].classList.add("hide");
    }
    for (var i = 0; i < republicans.length; i++) {
      republicans[i].classList.add("hide");
    }
  }
}

function independentFilter(selectedParty) {
  if (selectedParty === "I"); {
    for (var i = 0; i < independent.length; i++) {
      independent[i].classList.remove("hide");
    }
    for (var i = 0; i < republicans.length; i++) {
      republicans[i].classList.add("hide");
    }
    for (var i = 0; i < democrats.length; i++) {
      democrats[i].classList.add("hide");
    }
  }
}

function filterName() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("senateData");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

