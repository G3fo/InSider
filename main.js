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
    navbar.classList.add("sticky-top");
  } else {
    navbar.classList.remove("sticky-top");
  }
}

//Declaro las variables de las party, agarro todos los elementos TR.

var republicans = document.getElementsByClassName("R");
var democrats = document.getElementsByClassName("D");
var independent = document.getElementsByClassName("I");

//Las siguientes 4 funciones reciben que checkbox está seleccionado, y filtran a las demás parties usando display: none
//Al principio intente hacerlo todo en una función pero tuve muchos problemas, y esta manera funcionó, pero sigo pensando
//en como puedo hacerlo en una sola función
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

function showAll(){
  for (var i = 0; i < republicans.length; i++) {
    republicans[i].classList.remove("hide");
  }
  for (var i = 0; i < democrats.length; i++) {
    democrats[i].classList.remove("hide");
  }
  for (var i = 0; i < independent.length; i++) {
    independent[i].classList.remove("hide");
  }
}


//Search Bar!! llamo a esta función con onkeyup
function filterByName() {

  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("senateData");
  tr = table.getElementsByTagName("tr");

  // Loopea a traves de todas las TR, y esconde las que no coinciden con la busqueda
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];

    if (td) {
      txtValue = td.textContent || td.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } 
      else {
        tr[i].style.display = "none";
      }
    } 
  }
}

