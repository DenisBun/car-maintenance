
export default function defineUserModel(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    User.belongsTo(models.Order, { foreignKey: 'userId' });
    User.belongsTo(models.Car, { foreignKey: 'userId' });
  };

  return User;
}
