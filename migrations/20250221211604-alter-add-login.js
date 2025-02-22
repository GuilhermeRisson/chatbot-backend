'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'login', {
      type: Sequelize.STRING,
      allowNull: false,  // O login não pode ser nulo
      unique: true        // Garante que o login será único
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'login');
  }
};