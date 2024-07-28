// server/routes/appointments.js
const express = require('express');
const moment = require('moment');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { Op } = require('sequelize');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  const { teacherId, studentId, date, time,topic } = req.body; 
  const appointment = await Appointment.create({ topic,teacherId, studentId, date, time });
  res.status(201).json(appointment);
});

router.get('/',authenticate,  async (req, res) => {
  const user = req.user

  const { type } = req.query;
  const now = moment();
  const next3Days = moment().add(3, 'days');

let whereCondition = {
    [Op.or]: [
      { teacherId: user.id },
      { studentId: user.id }
    ]
  };

  if (type === 'upcoming') {
    whereCondition = {
      ...whereCondition,
      date: {
        [Op.gte]: now.toDate(),
        [Op.lte]: next3Days.toDate()
      },
      status: 'pending'
    };
  } else if (type === 'pending') {
    whereCondition = {
      ...whereCondition,
      date: {
        [Op.gte]: now.toDate()
      },
      status: 'pending'
    };
  } else if (type === 'past') {
    whereCondition = {
      ...whereCondition,
      date: {
        [Op.lt]: now.toDate()
      }
    };
  }
  try {
    const appointments = await Appointment.findAll({
      where: whereCondition,
      include: [
        { model: User, as: 'teacher', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'student', attributes: ['id', 'name', 'email'] }
      ]
    });
    res.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});


router.put('/:id', async (req, res) => {
  const { status } = req.body;
  await Appointment.update({ status }, { where: { id: req.params.id } });
  res.json({ message: 'Appointment updated' });
});

module.exports = router;
