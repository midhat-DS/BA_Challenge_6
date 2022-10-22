'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.belongsTo(models.history, {
        foreignKey: "historyId",
      });
    }
  }
  cars.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    size: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    historyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cars',
  });
  return cars;
};