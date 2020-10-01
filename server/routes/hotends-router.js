const router = require('express').Router();
const controller = require('../controllers/hotends-controller');

router.get('/', controller.hotend_index);
router.post('/', controller.hotend_create);
router.get('/:id', controller.hotend_detail);
router.put('/:id', controller.hotend_update);
router.delete('/:id', controller.hotend_delete);

module.exports = router;
