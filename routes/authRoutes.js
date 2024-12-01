const router = require('express').Router();
const authMiddleWare = require('../middlewares/authMiddleWare');
router.post('/register', register);
router.post('/login', login);

module.exports = router;
