'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn(
        'Users', // name of Source model
        'trusted_name', // name of the key we're adding
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users', // name of Source model
        'trusted_contact', // name of the key we're adding
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users', // name of Source model
        'profile_photo', // name of the key we're adding
        {
          type: Sequelize.STRING
        }
      )
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'trusted_name'),
      queryInterface.removeColumn('Users', 'trusted_contact'),
      queryInterface.removeColumn('Users', 'profile_photo');
  }
};
