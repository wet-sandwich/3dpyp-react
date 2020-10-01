const router = require('express').Router();
const controller = require('../controllers/printers-controller');

router.get('/', controller.printer_index);
router.post('/', controller.printer_create);
router.get('/:id', controller.printer_detail);
router.put('/:id', controller.printer_update);
router.delete('/:id', controller.printer_delete);

module.exports = router;
