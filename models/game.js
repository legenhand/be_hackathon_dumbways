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