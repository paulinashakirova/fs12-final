'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('Users', 'location_token', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('Users', 'location_token');
  }
};
