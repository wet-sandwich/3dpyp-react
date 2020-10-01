const router = require('express').Router();
const controller = require('../controllers/filaments-controller');

router.get('/', controller.filament_index);
router.post('/', controller.filament_create);
router.get('/datalist', controller.filament_datalist);
router.get('/:id', controller.filament_detail);
router.put('/:id', controller.filament_update);
router.delete('/:id', controller.filament_delete);

module.exports = router;
