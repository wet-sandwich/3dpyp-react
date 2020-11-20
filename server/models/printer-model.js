const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
  name: String,
  make: String,
  life: Number,
  cost: Number,
  type: String,
  motion: String,
  maxBedTemp: Number,
  drive: String,
  size: Number,
  maxPrintTemp: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Printer', printerSchema);
