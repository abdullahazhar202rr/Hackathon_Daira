const express = require('express');
const Review = require('../models/review');
const router = express.Router();

// Get reviews by provider ID
router.get('/reviews/:providerId', async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new review
router.post('/reviews', async (req, res) => {
  const { providerId, userId, userName, userImage, rating, content } = req.body;
  const review = new Review({
    providerId,
    userId,
    userName,
    userImage,
    rating,
    content,
  });
  try {
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
