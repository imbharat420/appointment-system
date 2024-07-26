const express = require('express'); 
const cors = require('cors');
const sequelize = require('./configs/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');
const authenticate = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);
app.use('/api/appointments', authenticate, appointmentRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
