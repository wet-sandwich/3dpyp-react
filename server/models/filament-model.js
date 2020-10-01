const mongoose = require('mongoose');

const filamentSchema = new mongoose.Schema({
  name: String,
  brand: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  printTemp: Array,
  bedTemp: Array,
});

module.exports = mongoose.model("Filament", filamentSchema);
