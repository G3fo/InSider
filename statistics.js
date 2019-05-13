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

statistics.republicansAverageVoteWithParty = getAverageVoteWithParty(
  republicans
);

statistics.independentAverageVoteWithParty = getAverageVoteWithParty(
  independent
);

statistics.totalAverage = getAverageVoteWithParty(congressMembers);

statistics.leastLoyal = getLeast(
  congressMembers,
  congressMembers.votes_with_party_pct,
  -1
);

function getAverageVoteWithParty(partyList) {
  var percentageNumber = 0;

  partyList.forEach(item => {
    percentageNumber += item.votes_with_party_pct;
  });

  return percentageNumber / partyList.length;
}

function getLeast(array, key, topOrLow) {
  topOrLow = -1
    ? array.sort((a, b) => (a.key < b.key ? 1 : b.key < a.key ? -1 : 0))
    : array.sort((a, b) => (a.key > b.key ? 1 : b.key > a.key ? -1 : 0));

  for (i = 0; i <= array.length / 10; i++) {
    least.push(array[i]);
    // array[i + 1].key == array[i].key ? least.push(array[i + 1]) : "";
  }

  return least;
}

console.log(congressMembers);
console.log(statistics);
console.log(least);
