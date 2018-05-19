var db = require("../models");

module.exports = function(app) {

    //create task
    app.post("/api/taskNew", function(req, res) {

       db.Task.create(req.body).then(function(dbTask) {
           res.json(dbTask);
          });
        });

        app.get("/api/task/:id", function(req, res) {
           
            db.Task.findOne({
              where: {
                id: req.params.id
              },
              include: [db.User]
            }).then(function(dbTask) {
              res.json(dbTask);
            });
          });
          

          //get by the id user
          app.get("/api/task", function(req, res) {
           
            var query = {};
            if (req.query.user_id) {
              query.UserId = req.query.user_id;
            }
            db.Task.findAll({
              where: query,
              include: [db.User]
            }).then(function(dbPost) {
              res.json(dbPost);
            });
          });

          

           // PUT route for updating 
        app.put("/api/task/:id", function(req, res) {
            db.Task.update(
            req.body,
            {
                where: {
                id: req.params.id
                }
            }).then(function(dbTask) {
            res.json(dbTask);
            });
        });

        // DELETE route for deleting posts
  app.delete("/api/task/:id", function(req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });
}