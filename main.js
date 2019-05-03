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

var filterCongressmen = congressMembers;

var tableString =
  currentPage != "anyOtherPageWithoutTable"
    ? filterCongressmen.reduce(function (item, members) {
      return item + createTable(members);
    }, "")
    : "";

document.getElementById(currentPage).innerHTML = tableString;

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

// Crea la lista de estados a partir de json y crea el dropdown adentro del <select>, usando el array de states
var dropdownSelect = "";
var stateList = [];



function createStateDropdown(members) {
  //Función de dos partes, la primera genera un array ordenado con todos los estados.

  for (var i = 0; i < members.length; i++) {
    if (!stateList.includes(members[i].state)) {
      stateList.push(members[i].state);
    }
  }
  stateList.sort();

  //Y de acá para abajo crea todas las opciones del dropdown
  dropdownSelect += "<option value='All'>All</option>";
  stateList.forEach(item => {
    dropdownSelect += "<option value='" + item + "'>" + item + "</option>";
  });

  return dropdownSelect;
}


createStateDropdown(congressMembers);
document.getElementById("stateSelect").innerHTML = dropdownSelect;

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------


//Hice todo esto al pedo porque bootstrap tiene una clase que se llama sticky-top que hace esto por vos.

// Cuando el usuario scrollea, ejecuta my function
window.onscroll = function () {
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

//Recibe que checkbox está seleccionado, y filtran a las demás parties usando display: none

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
    }
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

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

var selectedState = document.getElementById("stateSelect").value;

function updateTableWithNewState() {
  var selectedState = document.getElementById("stateSelect").value;

  filterCongressmen = congressMembers.filter(
    member => member.state === selectedState
  );

  selectedState == "All" ? (filterCongressmen = congressMembers) : "";

  tableString = filterCongressmen.reduce(function (item, members) {
    return item + createTable(members);
  }, "");

  document.getElementById(currentPage).innerHTML = tableString;
}

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//Search Bar!! llamo a esta función con onkeyup
function filterByName() {
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById(currentPage);
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



//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------


