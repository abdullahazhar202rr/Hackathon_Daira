const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: String,
  profession: String,
  bio: String,
  rating: Number,
  reviewCount: Number,
  location: String,
  availability: String,
  isAvailable: Boolean,
  distance: Number,
  hourlyRate: Number,
  phoneNumber: String,
  email: String,
  imageUrl: String,
  services: [String],
  responseTime: String,
  yearsOfExperience: Number,
  completedJobs: Number,
});

module.exports = mongoose.model('Provider', providerSchema);
