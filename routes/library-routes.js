var db = require("../models");
module.exports = function (app) {
    // This connects to the server to dinamically create the library
    app.post("/api/library", function (req, res) {
        console.log(req.body);
//    This adds new content to the table
        db.Library.create({
            title: req.body.title,
            url: req.body.url,
            field_trip:req.body.field_trip
        }).then(function (result) {
            res.redirect('/library');
        });
    });

    // Create all routes and set up logic 
    app.get("/library", function (req, res) {
        db.Library.findAll().then(function (data) {
            console.log(data);
            var hbsObject = {
                lessons: data.filter(activity => activity.field_trip === false),
                fieldTrips: data.filter(activity => activity.field_trip)
              };
           
            console.log(hbsObject);
            res.render("library", hbsObject);
        });
    });
    app.post("/api/library/:id", function (req, res) {
        // This is to delete a posting
            db.Library.destroy({
              where: {
                id: req.params.id
              }
            }).then(function (result) {
              // Send the data to the database
              res.redirect('/library');
            });
        });
    
};