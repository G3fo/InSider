//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

var currentPage = "";
var congressMembers = "";

//Funcion que busca en que pagina está parado el js, y establece variables que permiten o no armar las tablas.
function getCurrentPage() {
  if (document.getElementById("senateData") != null) {
    return (
      (currentPage = "senateData") &&
      (congressMembers = senateData.results[0].members)
    );
  } else if (document.getElementById("houseData") != null) {
    return (
      (currentPage = "houseData") &&
      (congressMembers = houseData.results[0].members)
    );
  } else {
    return (currentPage = "anyOtherPageWithoutTable");
  }
}

getCurrentPage();

var filterCongressmen = congressMembers;

function createTable(members) {
  var middleName = members.middle_name || "";
  var linea =
    "<tr class= '" +
    members.party +
    "' '" +
    members.state +
    "'><td><a href='" +
    members.url +
    "'>" + //Convierte a link el nombre del senador
    members.first_name +
    " " +
    middleName +
    " " +
    members.last_name +
    "</a></td><td>" +
    members.party +
    "</td><td>" +
    members.state +
    "</td><td>" +
    members.seniority +
    "</td><td>" +
    members.votes_with_party_pct +
    "%</td></tr>";

  return linea;
}

var tableString =
  currentPage != "anyOtherPageWithoutTable"
    ? congressMembers.reduce(function(item, members) {
        return item + createTable(members);
      }, "")
    : "";

document.getElementById(currentPage).innerHTML = tableString;

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//Crea la lista de estados a partir de json

var stateList = [];

getStates(congressMembers);

function getStates(members) {
  for (var i = 0; i < members.length; i++) {
    if (!stateList.includes(members[i].state)) {
      stateList.push(members[i].state);
    }
  }
  stateList.sort();
}

//Esta segunda funcion crea el dropdown adentro del <select>, usando el array que crea la funcion getStates

var dropdownSelect = "";

function createStateDropdown() {
  dropdownSelect += "<option value='All'>All</option>";
  stateList.forEach(item => {
    dropdownSelect += "<option value='" + item + "'>" + item + "</option>";
  });

  return dropdownSelect;
}

createStateDropdown();
document.getElementById("stateSelect").innerHTML = dropdownSelect;

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//TODO hacer los filtros de nuevo usando la funcion filter y eliminar las 4 funciones que usaba para los checkboxes

//TODO hacer un array filtrado con todos los parametros de los botones chequeados y los filtros aplicados

//TODO hacer que la funcion que crea la tabla, use el filtro, y que cada vez que el filtro es modificado, que re-cree la tabla

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//Hice todo esto al pedo porque bootstrap tiene una clase que se llama sticky-top que hace esto por vos.

// Cuando el usuario scrollea, ejecuta my function
window.onscroll = function() {
  agregaClasesADivs();
};

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

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//Declaro las variables de las party, agarro todos los elementos TR.

var republicans = document.getElementsByClassName("R");
var democrats = document.getElementsByClassName("D");
var independent = document.getElementsByClassName("I");


var stateDropdown = document.getElementById("stateSelect");
var value = stateDropdown.options[stateDropdown.selectedIndex].value;
var text = stateDropdown.options[stateDropdown.selectedIndex].text;



//Las siguientes 4 funciones reciben que checkbox está seleccionado, y filtran a las demás parties usando display: none
//Al principio intente hacerlo todo en una función pero tuve muchos problemas, y esta manera funcionó, pero sigo pensando
//en como puedo hacerlo en una sola función

function partyFilter(party) {
  if (party === "R") {
    for (var i = 0; i < republicans.length; i++) {
      republicans[i].classList.remove("hide");
    }
    for (var i = 0; i < democrats.length; i++) {
      democrats[i].classList.add("hide");
    }
    for (var i = 0; i < independent.length; i++) {
      independent[i].classList.add("hide");
    }
  } else if (party === "D") {
    for (var i = 0; i < democrats.length; i++) {
      democrats[i].classList.remove("hide");
    }
    for (var i = 0; i < independent.length; i++) {
      independent[i].classList.add("hide");
    }
    for (var i = 0; i < republicans.length; i++) {
      republicans[i].classList.add("hide");
    }
  } else if (party === "I") {
    for (var i = 0; i < independent.length; i++) {
      independent[i].classList.remove("hide");
    }
    for (var i = 0; i < republicans.length; i++) {
      republicans[i].classList.add("hide");
    }
    for (var i = 0; i < democrats.length; i++) {
      democrats[i].classList.add("hide");
    }// 
//     } else if (
// 
//       //TODO agregar los condicionales para que filtre por estado seleccionado
// 
//       //TODO se me ocurre hacerlo que cuando uno seleccione un estado, saque de display a todos los TR, y despues 
//       //agregue los seleccionados con style.display = ""
// 
//     ){

    
  } else {
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
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
