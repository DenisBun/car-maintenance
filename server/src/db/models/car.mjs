// import store from '../../config/session-store';

export default function defineCarModel(sequelize, DataTypes) {
  const Car = sequelize.define('Car', {
    carName: {
      type: DataTypes.STRING,
    },
    registrationNumber: {
      type: DataTypes.STRING,
    },
  });
  Car.associate = (models) => {
    Car.belongsTo(models.Order, { foreignKey: 'carId' });
  };

  return Car;
}
