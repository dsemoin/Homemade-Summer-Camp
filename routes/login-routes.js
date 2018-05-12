var db = require("../models");
var bcrypt = require('bcrypt');


module.exports = function(app) {

app.post("/api/login", function(req, res) { 

 
    var emailB=req.body.email;
    var passwordB=req.body.password;

console.log(emailB);
 
if (emailB=="" || passwordB=="") { 
  res.render('/index');
} else{ 

    db.User.findOne({
      where: {
        email: emailB
      },
      include: [db.Task]
    }).then(function(dbUser) {

       if(dbUser!=null)
       {
         if(bcrypt.compareSync(passwordB, dbUser.password))
         {
          res.send('correct credentials.');
           console.log(bcrypt.compareSync(passwordB, dbUser.password));
        }
      }
      
     else{
      res.json(dbUser);
    }   
    
    });
  }
});

app.get("/api/email/:email", function(req, res){
  db.User.findOne({
    where:{
      email:req.params.email
    },
    include:[db.Task]
  }).then(function(dbUser){
        res.json(dbUser);
   });
});


app.post("/api/user", function(req, res) {

  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;
     db.User.create({
      "name":name,
      "email": email,
      "password": password,
    }
    ).then(function(dbUser) {
     res.redirect('/calendar');
    });
  });

}