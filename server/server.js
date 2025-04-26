const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  icon: String,
  color: String,
});

module.exports = mongoose.model('Category', categorySchema);
