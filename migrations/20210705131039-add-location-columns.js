'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      await queryInterface.addColumn('Users', 'latitude', {
        type: Sequelize.STRING,
        allowNull: false      
      }),
  
      await queryInterface.addColumn('Users', 'longitude', {
        type: Sequelize.STRING,
        allowNull: false
      })
    );
    },

  down: async (queryInterface, Sequelize) => {
    return (
      await queryInterface.removeColumn('Users', 'latitude'),
      queryInterface.changeColumn('Users', 'longitude')
    )
  }
}
