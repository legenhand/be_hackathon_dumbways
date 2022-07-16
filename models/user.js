'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user.hasMany(models.game, {
                as: 'games',
                foreignKey: {
                    name: 'createdBy',
                },
            });
            user.hasMany(models.reviews, {
                as: 'reviews',
                foreignKey: {
                    name: 'createdBy',
                },
            });
        }
    }
    user.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'user',
        }
    );
    return user;
};
