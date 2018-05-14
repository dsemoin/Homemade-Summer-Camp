var db = require("../models");

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.get('/register', function(req, res){
    	res.render('register');
    });

    app.get('/calendar', function(req, res){
    	res.render('calendar');
    });

   


}