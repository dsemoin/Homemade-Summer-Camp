var db = require("../models");

module.exports = function(app) {

app.get("/api/user/:email", function(req, res) { 
    db.User.findOne({
      where: {
        email: req.params.email
      },
      include: [db.Task]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });


}