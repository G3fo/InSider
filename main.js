//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

var congressMembers = [];
var filterCongressmen = [];

var app = new Vue({
  el: "#app",
  data: { members: [] }
});

function initialize() {
  getFullName(congressMembers);
  filterCongressmen = congressMembers;
  app.members = filterCongressmen;

  createStateDropdown(congressMembers);
  document.getElementById("stateSelect").innerHTML = dropdownSelect;
}

function getFullName(array) {
  array.forEach(item => {
    var middleName = item.middle_name || "";
    item.full_name = item.first_name + " " + middleName + " " + item.last_name;
    item.total_present = item.total_votes - item.missed_votes;
    item.party_votes = Math.trunc(
      (item.total_present * item.votes_with_party_pct) / 100
    );
  });
}

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

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

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

//Funcion que modifica la lista de congresistas en base
function updateTableWithNewState() {
  var selectedState = document.getElementById("stateSelect").value;
  var checkedBoxes = Array.from(
    document.querySelectorAll("input[name=partyCheckbox]:checked")
  ).map(elt => elt.value);

  filterCongressmen = congressMembers.filter(member =>
    selectedState == "All" ? true : member.state === selectedState
  );

  filterCongressmen = filterCongressmen.filter(member =>
    checkedBoxes.includes(member.party)
  );

  app.members = filterCongressmen;
}

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//Search Bar!! llamo a esta función con onkeyup
function filterByName() {
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("data");
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
