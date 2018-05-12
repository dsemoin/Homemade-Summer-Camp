var bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 50]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [1, 255]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        } 
              
      // },
      //  {
      //   freezeTableName: true,
      //   instanceMethods: {
      //       generateHash(password) {
      //           return bcrypt.hash(password, bcrypt.genSaltSync(8));
      //       },
      //       validPassword(password) {
      //           return bcrypt.compare(password, this.password);
      //       }
      //    }
     });

    User.beforeCreate((user, options) => {

    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
});

    // var hasSecurePassword = function(user, options, callback) {

    // if (user.password != user.password_confirmation) {
    //     throw new Error("Password confirmation doesn't match Password");
    // }

    // var salt = bcrypt.genSaltSync(saltRounds);
    // var hash = bcrypt.hashSync(myPlaintextPassword, salt);
    
    // user.set('password_digest', hash);
        
    // };


    // User.beforeCreate(function(user, options, callback) {
    //     user.email = user.email.toLowerCase();
    //     if (user.password)
    //         hasSecurePassword(user, options, callback);
    //     else
    //         return callback(null, options);
    // });

    User.associate = function(models) {

        User.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };
    return User;
}