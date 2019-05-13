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
var least = [];
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
statistics.leastLoyal = getTopTen(congressMembers,"votes_with_party_pct","des");
// statistics.mostLoyal = getTopTen(congressMembers,"votes_with_party_pct","asc");

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

  //Ordena el array de menos a mayor o viceversa
  orden == "des"
    ? array.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0))
    : array.sort((a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0));

  //Loop que agrega a un array el primer 10% de los elementos del array inicial
  for (i = 0; least.length <= tenPercent; i++) {
    least.push(array[i]);
    array[i][key] == array[i+1][key] ? least.push(array[i+1] && i++) : "";
  }
  return least;
}

console.log(statistics);
console.log(least);
