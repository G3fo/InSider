fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
  method: "GET",
  headers: { "X-API-Key": "cYMTdFJS13jzEeSby2onJewefObRpQKCL6NOReqD" }
})
  .then(res => res.json())
  .then(data => {
    congressMembers = data.results[0].members;
  })
  .then(function(){initialize()})
  .catch(err => console.log(err));
