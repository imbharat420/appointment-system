const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const User = require('./User');

const Appointment = sequelize.define('Appointment', {
  date: { type: DataTypes.DATE, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.ENUM('Pending', 'Confirmed'), defaultValue: 'Pending' },
});

Appointment.belongsTo(User, { as: 'teacher', foreignKey: 'teacherId' });
Appointment.belongsTo(User, { as: 'student', foreignKey: 'studentId' });

module.exports = Appointment;
