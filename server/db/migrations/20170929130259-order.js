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
      status: {
        type: Sequelize.ENUM('IN_PROGRESS', 'RESOLVED'),
        allowNull: false,
        defaultValue: 'IN_PROGRESS',
      },
      resolutionDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },      
    });
  },

  down: queryInterface => queryInterface.dropTable('Orders')
};
