module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carId: {
        type: Sequelize.INTEGER,
      },
      maintenanceId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },      
    });
  },

  down: queryInterface => queryInterface.dropTable('Orders')
};
