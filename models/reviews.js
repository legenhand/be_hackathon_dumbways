'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reviews.belongsTo(models.user, {
        as: "creator",
        foreignKey: {
          name: "createdBy"
        }
      });
      reviews.belongsTo(models.game, {
        as: "game",
        foreignKey: {
          name: "gameId"
        }
      });
    }
  }
  reviews.init({
    gameId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reviews',
  });
  return reviews;
};