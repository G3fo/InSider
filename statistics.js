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
  mostLoyal: [],
  democrats: [],
  republicans: [],
  independent: []
};

var congressMembers = [];

var vueMost = new Vue({
  el: "#most",
  data: { members: [] }
});

var vueLeast = new Vue({
  el: "#least",
  data: { members: [] }
});

var vueGlance = new Vue({
  el: "#glance",
  data: statistics
});

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

function initialize() {
  getFullName(congressMembers);

  congressMembers.forEach(item => {
    item.party == "D" ? statistics.democrats.push(item) : "";
    item.party == "R" ? statistics.republicans.push(item) : "";
    item.party == "I" ? statistics.independent.push(item) : "";
  });

  statistics.numberOfDemocrats = statistics.democrats.length;
  statistics.numberOfRepublicans = statistics.republicans.length;
  statistics.numberOfIndependents = statistics.independent.length;
  statistics.total = congressMembers.length;

  statistics.democratsAverageVoteWithParty = getAverageVoteWithParty(
    statistics.democrats
  ).toFixed(2);
  statistics.republicansAverageVoteWithParty = getAverageVoteWithParty(
    statistics.republicans
  ).toFixed(2);
  statistics.independentAverageVoteWithParty = getAverageVoteWithParty(
    statistics.independent
  ).toFixed(2);
  statistics.totalAverage = getAverageVoteWithParty(congressMembers);

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
  statistics.mostengaged = getTopTen(
    congressMembers,
    "missed_votes_pct",
    false
  );
  statistics.leastEngaged = getTopTen(
    congressMembers,
    "missed_votes_pct",
    true
  );
    
			vueLeast.members = statistics.mostEngaged;
			vueMost.members =  statistics.leastEngaged;
  createVueTables();
}

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

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
