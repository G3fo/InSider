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

getFullName(congressMembers)

function getFullName(array) {
  array.forEach(item => {
    var middleName = item.middle_name || "";
    item.full_name = item.first_name + " " + middleName + " " + item.last_name;
    item.party_votes = Math.trunc(item.total_votes * item.votes_with_party_pct / 100)
  });
}

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

statistics.democratsAverageVoteWithParty = getAverageVoteWithParty(democrats);
statistics.republicansAverageVoteWithParty = getAverageVoteWithParty(republicans);
statistics.independentAverageVoteWithParty = getAverageVoteWithParty(independent);
statistics.totalAverage = getAverageVoteWithParty(congressMembers);

statistics.leastLoyal = getTopTen(congressMembers, "votes_with_party_pct", "des");
statistics.mostLoyal = getTopTen(congressMembers, "votes_with_party_pct", "asc");
statistics.mostengaged = getTopTen(congressMembers, "missed_votes_pct", "des");
statistics.leastEngaged = getTopTen(congressMembers, "missed_votes_pct", "asc");


//Funcion que calcula el promedio
function getAverageVoteWithParty(partyList) {
  var percentageNumber = 0;

  partyList.forEach(item => {
    percentageNumber += item.votes_with_party_pct;
  });

  return percentageNumber / partyList.length;
}

//Funcion que recibe un array, una key seleccionada del json, y el orden (asc o des)
function getTopTen(array, key, orden) {

  var tenPercent = array.length / 10;
  var topTen = [];

  //Ordena el array de menor a mayor o viceversa
  orden == "des" ?
    array.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0)) :
    array.sort((a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0));

  //Loop que agrega a un array el primer 10% de los elementos del array inicial
  for (i = 0; topTen.length <= tenPercent; i++) {
    topTen.push(array[i]);

    while (array[i][key] == array[i + 1][key]) {
      topTen.push(array[i + 1]);
      i++;
    }
  }
  return topTen;
}


createStatisticsTable(leastTable, statistics.leastLoyal);
createStatisticsTable(mostTable, statistics.mostLoyal);
createGlanceTable(glance);

function createStatisticsTable(table, members) {
  var linea = ""

  members.forEach(function (item) {
    linea += "<tr><td>" + item.full_name + "</td><td>" + item.party_votes + "</td><td>" + item.votes_with_party_pct + "</td></tr>";
  });
  table.innerHTML = linea;
}

function createGlanceTable(table){
  table.innerHTML += "<tr><td>Republican</td><td>" + statistics.numberOfRepublicans + "</td><td>" + statistics.republicansAverageVoteWithParty + "</td><tr>" +
    "<tr><td>Democrats</td><td>" + statistics.numberOfDemocrats + "</td><td>" + statistics.democratsAverageVoteWithParty + "</td><tr>" +
    "<tr><td>Independents</td><td>" + statistics.numberOfIndependents + "</td><td>" + statistics.independentAverageVoteWithParty + "</td><tr>"
}
