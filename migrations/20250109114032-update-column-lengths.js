module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('Users', 'name', {
          type: Sequelize.STRING,
          allowNull: false
      });
      await queryInterface.changeColumn('Users', 'email', {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      });
      await queryInterface.changeColumn('Users', 'role', {
          type: Sequelize.STRING,
          allowNull: false
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('Users', 'name', {
          type: Sequelize.STRING,
          allowNull: false
      });
      await queryInterface.changeColumn('Users', 'email', {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      });
      await queryInterface.changeColumn('Users', 'role', {
          type: Sequelize.STRING,
          allowNull: false
      });
  }
};