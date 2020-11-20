const Filament = require('../models/filament-model');

exports.filament_index = function(req, res) {
  Filament.find({ user: req.user.id })
    .then(filaments => res.json(filaments))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.filament_detail = function(req, res) {
  Filament.findById(req.params.id)
    .then(filament => res.json(filament))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.filament_create = function(req ,res) {
  const newFilament = new Filament({
    name: req.body.name,
    brand: req.body.brand,
    material: req.body.material,
    color: req.body.color,
    cost: req.body.cost,
    size: req.body.size,
    printTemp: formatRange(req.body.printMinTemp, req.body.printMaxTemp),
    bedTemp: formatRange(req.body.bedMinTemp, req.body.bedMaxTemp),
    user: req.user.id,
  });

  newFilament.save()
    .then(() => res.json('Filament created!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.filament_update = function(req, res) {
  Filament.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    brand: req.body.brand,
    material: req.body.material,
    color: req.body.color,
    cost: req.body.cost,
    size: req.body.size,
    printTemp: formatRange(req.body.printMinTemp, req.body.printMaxTemp),
    bedTemp: formatRange(req.body.bedMinTemp, req.body.bedMaxTemp),
    user: req.user.id,
  })
    .then(() => res.json('Hotend updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.filament_delete = function(req, res) {
  Filament.findByIdAndDelete(req.params.id)
    .then(() => res.json('Filament deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.filament_datalist = function(req, res) {
  let fields = (typeof req.query.fields === 'string') ? [req.query.fields] : req.query.fields;
  Filament.find({ user: req.user.id }, fields)
    .then(data => {
      let datalist = {};
      fields.forEach(field => {
        datalist[field] = [...new Set(data.map(datum => datum[field]))];
      });
      res.json(datalist);
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

function formatRange(low, high) {
  low = parseInt(low);
  high = parseInt(high);
  // if both fields left blank return empty array
  if (isNaN(low) && isNaN(high)) {
    return [];
  }
  // if one field filled in return [value, 0]
  else if (isNaN(low) || isNaN(high)) {
    return [isNaN(low) ? high : low, 0];
  }
  // if both fields filled in simply return them as an array
  else {
    return [low, high];
  }
}

//move this to the front end
function calcPlusMinus(tempRange) {
  if (tempRange.length == 0) {
    return tempRange;
  }
  const low = tempRange[0];
  const high = tempRange[1];

  if (high == 0) {
    return [low, high];
  } else {
    return [(low + high) / 2, (high - low) / 2];
  }
}
