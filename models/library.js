// Create a model to dinamically generate activities
module.exports = function(sequelize, DataTypes) {
    var Library = sequelize.define("Library", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 100]
            }
        },
        url: {
            type: DataTypes.TEXT,
        },
        field_trip:{
            type:DataTypes.BOOLEAN,
        }

    });
    return Library;
};
