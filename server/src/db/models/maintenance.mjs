// import store from '../../config/session-store';

export default function defineMaintenanceModel(sequelize, DataTypes) {
  const Maintenance = sequelize.define('Maintenance', {
    title: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('UPGRADE', 'REPAIR'),
      allowNull: false,
      defaultValue: 'UPGRADE',
    },
    price: {
      type: DataTypes.INTEGER,
    },
  });
  Maintenance.associate = (models) => {
    Maintenance.belongsTo(models.Order, { foreignKey: 'maintenanceId' });
  };

  return Maintenance;
}
