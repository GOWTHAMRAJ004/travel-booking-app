const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const { getSuggestions } = require('../utils/suggestions');

router.post('/', authenticate, (req, res) => {
  try {
    const { destination, days, people, budget, travelType } = req.body;
    if (!destination || !days || !people || !budget)
      return res.status(400).json({ message: 'Missing required fields' });

    const suggestions = getSuggestions({ destination, days, people, budget, travelType });
    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
