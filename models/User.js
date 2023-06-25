import { DataTypes } from 'sequelize';
import db from '../utils/db.js';

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
