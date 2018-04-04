module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Maintenances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('UPGRADE', 'REPAIR'),
        allowNull: false,
        defaultValue: 'REPAIR',
      },
      price: {
        type: Sequelize.INTEGER,
      },      
    });
  },

  down: queryInterface => queryInterface.dropTable('Maintenances')
};
