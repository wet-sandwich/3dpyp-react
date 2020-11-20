const router = require('express').Router();
const controller = require('../controllers/auth-controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/demo', controller.demo);
router.get('/logout', controller.logout);

module.exports = router;
