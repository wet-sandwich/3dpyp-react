const Printer = require('../models/printer-model');

exports.printer_index = function(req, res) {
  Printer.find()
    .then(printers => res.json(printers))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.printer_detail = function(req, res) {
  Printer.findById(req.params.id)
    .then(printer => res.json(printer))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.printer_create = function(req, res) {
  const newPrinter = new Printer({
    name: req.body.name,
    make: req.body.make,
    life: req.body.life,
    cost: req.body.cost,
    type: req.body.type,
    motion: req.body.motion,
    drive: req.body.drive,
    maxBedTemp: req.body.maxBedTemp,
    size: req.body.size,
    maxPrintTemp: req.body.maxPrintTemp,
  });

  newPrinter.save()
    .then(() => res.json('Printer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.printer_update = function(req, res) {
  Printer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    make: req.body.make,
    life: req.body.life,
    cost: req.body.cost,
    type: req.body.type,
    motion: req.body.motion,
    drive: req.body.drive,
    maxBedTemp: req.body.maxBedTemp,
    size: req.body.size,
    maxPrintTemp: req.body.maxPrintTemp,
  })
    .then(() => res.json('Printer updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.printer_delete = function(req, res) {
  Printer.findByIdAndDelete(req.params.id)
    .then(() => res.json('Printer deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
}
