module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      carName: {
        type: Sequelize.STRING,
      },
      registrationNumber: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('Cars')
};
