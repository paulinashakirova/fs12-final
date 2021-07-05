'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasOne(models.Contact);
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      allowNull: false,
      email: DataTypes.STRING,
      allowNull: false,
      password: DataTypes.STRING,
      allowNull: false,
      address: DataTypes.STRING,
      allowNull: false,
      phone: DataTypes.STRING,
      allowNull: false,
      trusted_contact: DataTypes.STRING,
      allowNull: false,
      trusted_name: DataTypes.STRING,
      allowNull: false,
      profile_photo: DataTypes.STRING,
      allowNull: false
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
