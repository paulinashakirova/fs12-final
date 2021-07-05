'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      await queryInterface.changeColumn('Users', 'name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'address', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'phone', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'trusted_name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'trusted_contact', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'profile_photo', {
        type: Sequelize.STRING,
        allowNull: false
      })
    );
  },
  // return Promise.all([queryInterface.changeColumn('users', 'april')]);
  down: async (queryInterface, Sequelize) => {
    return (
      await queryInterface.changeColumn('Users', 'name'),
      queryInterface.changeColumn('Users', 'password'),
      queryInterface.changeColumn('Users', 'address'),
      queryInterface.changeColumn('Users', 'phone'),
      queryInterface.changeColumn('Users', 'trusted_name'),
      queryInterface.changeColumn('Users', 'trusted_contact'),
      queryInterface.changeColumn('Users', 'profile_photo')
    );
  }
};
