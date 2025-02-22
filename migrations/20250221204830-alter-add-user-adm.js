'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'admin');
  }
};
