const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  userId: String,
  userName: String,
  userImage: String,
  rating: Number,
  content: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
