const express = require('express');
const Provider = require('../models/provider');
const router = express.Router();

// Get all providers
router.get('/providers', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get provider by ID
router.get('/providers/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
