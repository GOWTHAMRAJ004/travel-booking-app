require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');

// Import models to register them
require('./models/User');
require('./models/Booking');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/suggestions', require('./routes/suggestions'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // Seed admin user if not exists
    const User = require('./models/User');
    const admin = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } });
    if (!admin) {
      const hashed = await bcrypt.hash('admin123', 12);
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashed,
        role: 'admin',
      });
      console.log('Admin user created: admin@travelbooking.com / admin123');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
