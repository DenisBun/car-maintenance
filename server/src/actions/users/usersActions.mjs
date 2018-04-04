import sequelize from 'sequelize';
import defineUserModel from '../../db/models/user';

export const getAllUsers = () => {
  return defineUserModel.findAll();
}