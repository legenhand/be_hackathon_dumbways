'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game.hasMany(models.reviews, {
        as: "reviews",
        foreignKey: {
          name: "gameId"
        }
      });

      game.belongsTo(models.user, {
        as: "createdBy",
        foreignKey: {
          name: "createdBy"
        }
      });

      game.belongsTo(models.genre, {
        as: "genre",
        foreignKey: {
          name: "genre"
        }
      });

      game.belongsTo(models.platform, {
        as: "platform",
        foreignKey: {
          name: "platform"
        }
      });
    }
  }
  game.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    genre: DataTypes.INTEGER,
    platform: DataTypes.INTEGER,
    gameUrl: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    screenshots: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};