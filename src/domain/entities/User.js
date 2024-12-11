// src/domain/entities/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false, 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false, 
    },
  }, {
    tableName: 'users', 
    timestamps: false,  
  });

  return User;
};
