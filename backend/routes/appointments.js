// server/routes/appointments.js
const express = require('express');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { teacherId, studentId, date, time } = req.body;
  console.log( { teacherId, studentId, date, time })
  const appointment = await Appointment.create({ teacherId, studentId, date, time });
  res.status(201).json(appointment);
});

router.get('/', async (req, res) => {
  const appointments = await Appointment.findAll({ include: ['teacher', 'student'] });
  res.json({appointments});
});

router.put('/:id', async (req, res) => {
  const { status } = req.body;
  await Appointment.update({ status }, { where: { id: req.params.id } });
  res.json({ message: 'Appointment updated' });
});

module.exports = router;
