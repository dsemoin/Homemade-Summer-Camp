module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define("Task", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
        date_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hour_at: {
            type: DataTypes.TIME,

        },
        description: {
            type: DataTypes.TEXT,

        }

    });

    Task.associate = function(models) {

        Task.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Task;
}