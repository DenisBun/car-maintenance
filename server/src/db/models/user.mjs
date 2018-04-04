// import store from '../../config/session-store';

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
    // User.belongsTo(store.Session, { foreignKeyConstraint: true, foreignKey: 'sessionId' });
    // User.belongsToMany(models.Group, { through: 'UserGroup', foreignKey: 'userId' });
    // User.hasMany(models.Assignment, { as: 'assignments', foreignKey: 'userId' });
    // User.hasMany(models.UserAnswer, { as: 'userAnswers', foreignKey: 'userId' });
    // User.hasMany(models.Token, { as: 'userTokens', foreignKey: 'userId' });
  };

  return User;
}
