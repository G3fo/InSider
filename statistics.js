var statistics = {
  "numberOfDemocrats": 0,
  "numberOfRepublicans": 0,
  "numberOfIndependents": 0,
  "total": 0,
  "democratsAverageVoteWithParty": 0,
  "republicansAverageVoteWithParty": 0,
  "independentAverageVoteWithParty": 0,
  "totalAverage": 0,
  "leastEngaged": [],
  "mostengaged": [],
  "leastLoyal": [],
  "mostLoyal": []
}

var congressMembers = data.results[0].members;

var democrats = []
var republicans = []
var independent = []

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


function getAverageVoteWithParty(partyList) {
  var percentageNumber = 0;

  partyList.forEach(item => {
    percentageNumber += item.votes_with_party_pct;
  });

  return percentageNumber / partyList.length;
}

console.log(statistics)

