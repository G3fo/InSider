fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
  method: "GET",
  headers: { "X-API-Key": "cYMTdFJS13jzEeSby2onJewefObRpQKCL6NOReqD" }
})
  .then(res => res.json())
  .then(data => {
    congressMembers = data.results[0].members;
  })
  .then(function() {
    initialize();
  })
  .catch(err => console.log(err) &&
  alert("The server had problems delivering the request" + err))
