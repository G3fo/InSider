var statistics = {
  numberOfDemocrats: 0,
  numberOfRepublicans: 0,
  numberOfIndependents: 0,
  total: 0,
  democratsAverageVoteWithParty: 0,
  republicansAverageVoteWithParty: 0,
  independentAverageVoteWithParty: 0,
  totalAverage: 0,
  leastEngaged: [],
  mostengaged: [],
  leastLoyal: [],
  mostLoyal: []
};

var congressMembers = data.results[0].members;

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

getFullName(congressMembers);

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

var glance = document.getElementById("glance");
var mostTable = document.getElementById("most");
var leastTable = document.getElementById("least");

var democrats = [];
var republicans = [];
var independent = [];

congressMembers.forEach(item => {
  item.party == "D" ? democrats.push(item) : "";
  item.party == "R" ? republicans.push(item) : "";
  item.party == "I" ? independent.push(item) : "";
});

statistics.numberOfDemocrats = democrats.length;
statistics.numberOfRepublicans = republicans.length;
statistics.numberOfIndependents = independent.length;
statistics.total = congressMembers.length;

statistics.democratsAverageVoteWithParty = getAverageVoteWithParty(
  democrats
).toFixed(2);
statistics.republicansAverageVoteWithParty = getAverageVoteWithParty(
  republicans
).toFixed(2);
statistics.independentAverageVoteWithParty = getAverageVoteWithParty(
  independent
).toFixed(2);
statistics.totalAverage = getAverageVoteWithParty(congressMembers);

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

statistics.leastLoyal = getTopTen(
  congressMembers,
  "votes_with_party_pct",
  true
);
statistics.mostLoyal = getTopTen(
  congressMembers,
  "votes_with_party_pct",
  false
);
statistics.mostengaged = getTopTen(congressMembers, "missed_votes_pct", false);
statistics.leastEngaged = getTopTen(congressMembers, "missed_votes_pct", true);

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//Funcion que calcula el promedio
function getAverageVoteWithParty(partyList) {
  var percentageNumber = 0;

  partyList.forEach(item => {
    percentageNumber += item.votes_with_party_pct;
  });

  return percentageNumber / partyList.length;
}

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

//Funcion que recibe un array, una key seleccionada del json, y el orden (asc o des)
function getTopTen(array, key, orden) {
  var i = 0;
  var tenPercent = array.length / 10;
  var topTen = [];

  array.sort((a, b) => (orden ? a[key] - b[key] : b[key] - a[key]));

  //Loop que agrega a un array el primer 10% de los elementos del array inicial
  while (i < tenPercent || array[i][key] == array[i + 1][key]) {
    topTen.push(array[i]);
    i++;
  }
  return topTen;
}

createGlanceTable(glance);

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

function createStatisticsTable(table, members, key1, key2) {
  var linea = "";

  members.forEach(function(item) {
    linea +=
      "<tr><td>" +
      item.full_name +
      "</td><td>" +
      item[key1] +
      "</td><td>" +
      item[key2] +
      "</td></tr>";
  });
  table.innerHTML = linea;
}

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

function createGlanceTable(table) {
  table.innerHTML +=
    "<tr><td>Republican</td><td>" +
    statistics.numberOfRepublicans +
    "</td><td>" +
    statistics.republicansAverageVoteWithParty +
    "</td><tr>" +
    "<tr><td>Democrats</td><td>" +
    statistics.numberOfDemocrats +
    "</td><td>" +
    statistics.democratsAverageVoteWithParty +
    "</td><tr>" +
    "<tr><td>Independents</td><td>" +
    statistics.numberOfIndependents +
    "</td><td>" +
    statistics.independentAverageVoteWithParty +
    "</td><tr>";
}
