const mongoose = require('mongoose');

const hotendSchema = new mongoose.Schema({
  name: String,
  make: String,
  size: Number,
  heatbreak: String,
  maxTemp: Number,
});

module.exports = mongoose.model('Hotend', hotendSchema);
