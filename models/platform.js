'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class platform extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            platform.hasMany(models.game, {
                as: 'gamePlatform',
                foreignKey: {
                    name: 'platform',
                },
            });
        }
    }
    platform.init(
        {
            name: DataTypes.STRING,
            type: DataTypes.ENUM('Download', 'Url'),
        },
        {
            sequelize,
            modelName: 'platform',
        }
    );
    return platform;
};
