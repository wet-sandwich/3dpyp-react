const Hotend = require('../models/hotend-model');

exports.hotend_index = function(req, res) {
  Hotend.find()
    .then(hotends => res.json(hotends))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.hotend_detail = function(req, res) {
  Hotend.findById(req.params.id)
    .then(hotend => res.json(hotend))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.hotend_create = function(req, res) {
  const newHotend = new Hotend({
    name: req.body.name,
    make: req.body.make,
    size: req.body.size,
    heatbreak: req.body.heatbreak,
    maxTemp: req.body.maxTemp,
  });

  newHotend.save()
    .then(() => res.json('Hotend added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.hotend_update = function(req, res) {
  Hotend.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    make: req.body.make,
    size: req.body.size,
    heatbreak: req.body.heatbreak,
    maxTemp: req.body.maxTemp,
  })
    .then(() => res.json('Hotend updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.hotend_delete = function(req, res) {
  Hotend.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hotend deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}
