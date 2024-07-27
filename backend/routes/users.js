// server/routes/users.js
const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/me', authenticate,   async (req, res) => {
     try {
        const { id } = req.userId

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({  user, msg: "Profile Retrieved Successfully"  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error retrieving profile" });
    }
})

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

router.get('/teachers', async (req, res) => {
  const user = await User.findAll({
    where:{role:"Teacher"}
  });
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const { name, email, phone, role } = req.body;
  const userId = req.params.id;

  try {
     
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== parseInt(userId)) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    
    await User.update({ name, email, phone, role }, { where: { id: userId } });
    res.json({ message: 'User updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'User deleted' });
});

module.exports = router;
