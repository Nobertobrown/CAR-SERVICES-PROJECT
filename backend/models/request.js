// models/Request.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // adjust the path according to your project structure

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mechanicId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'requests',
  timestamps: false
});

export default Request;
