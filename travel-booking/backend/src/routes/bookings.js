const router = require('express').Router();
const { authenticate, adminOnly } = require('../middleware/auth');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendBookingRequestToAdmin, sendApprovalToUser, sendRejectionToUser } = require('../utils/email');

// Create booking
router.post('/', authenticate, async (req, res) => {
  try {
    const { destination, days, people, budget, travelType, packageName, packageCost, packageDuration, packageHighlights } = req.body;

    const booking = await Booking.create({
      userId: req.user.id,
      destination, days, people, budget, travelType,
      packageName, packageCost, packageDuration,
      packageHighlights: Array.isArray(packageHighlights) ? packageHighlights.join(', ') : packageHighlights,
    });

    // Send email to admin (non-blocking)
    sendBookingRequestToAdmin(booking, req.user).catch(console.error);

    res.status(201).json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user's bookings
router.get('/my', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin: get all bookings
router.get('/admin/all', authenticate, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin: update booking status
router.patch('/admin/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const booking = await Booking.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }],
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = status;
    await booking.save();

    // Send email notification (non-blocking)
    if (status === 'approved') {
      sendApprovalToUser(booking, booking.user).catch(console.error);
    } else {
      sendRejectionToUser(booking, booking.user).catch(console.error);
    }

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
