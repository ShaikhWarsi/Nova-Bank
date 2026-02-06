// routes/account.js
const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const { authenticate } = require('../middleware/auth');

// Utility function to generate a unique account number
const generateUniqueAccountNumber = () => {
  return 'ACC' + Math.floor(100000 + Math.random() * 900000);
};

router.post('/open', authenticate, async (req, res) => {
  try {
    const userId = req.user._id; // Provided by your authentication middleware
    const accountNumber = generateUniqueAccountNumber();

    const newAccount = new Account({ userId, accountNumber });
    await newAccount.save();

    res.status(201).json({ account: newAccount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
