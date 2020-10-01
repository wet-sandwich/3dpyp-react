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
  hotend: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotend'},
});

module.exports = mongoose.model('Printer', printerSchema);
