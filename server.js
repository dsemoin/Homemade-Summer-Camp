var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8082;

// Requiring our models for syncing
var db = require("./models");

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/html-routes.js")(app);
require("./routes/login-routes.js")(app);
require("./routes/task.js")(app);



// Start our server so that it can begin listening to client requests.
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});