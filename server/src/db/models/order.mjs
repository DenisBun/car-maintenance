// import store from '../../config/session-store';

export default function defineOrderModel(sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
    },
    carId: {
      type: DataTypes.INTEGER,
    },
    maintenanceId: {
      type: DataTypes.INTEGER,
    },
  });
  // Order.associate = (models) => {
  //   Order.belongsTo(models.Order, { foreignKey: 'maintenanceId' });
  // };

  return Order;
}
