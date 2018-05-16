var db = require("../models");
module.exports = function (app) {
    // This connects to the server to dinamically create the library
    app.post("/api/library", function (req, res) {
        console.log(req.body);
    //   line 8-18 might break code **
    // This is to delete a posting
            if (req.body._method === "DELETE") {
              db.Library.destroy({
                where: {
                title: req.body.title,
                url:req.body.url,
                field_trip:req.body.field_trip
                }
              }).then(function (result) {
                // Send the data to the database
                res.redirect('/library');
              });
            } else {
        db.Library.create({
            title: req.body.title,
            url: req.body.url,
            field_trip:req.body.field_trip
        }).then(function (result) {
            res.redirect('/library');
        });
    }
    });

    // Create all routes and set up logic 
    app.get("/library", function (req, res) {
        db.Library.findAll().then(function (data) {
            console.log(data);
            var hbsObject = {
               library: data
            };
            console.log(hbsObject);
            res.render("library", hbsObject);
        });
    });
};