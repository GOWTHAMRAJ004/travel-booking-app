const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  days: { type: DataTypes.INTEGER, allowNull: false },
  people: { type: DataTypes.INTEGER, allowNull: false },
  budget: { type: DataTypes.FLOAT, allowNull: false },
  travelType: { type: DataTypes.STRING },
  packageName: { type: DataTypes.STRING, allowNull: false },
  packageCost: { type: DataTypes.FLOAT, allowNull: false },
  packageDuration: { type: DataTypes.STRING },
  packageHighlights: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
});

Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Booking;
