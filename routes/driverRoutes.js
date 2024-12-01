const authMiddleWare = require('../middlewares/authMiddleWare');

const router = require('express').Router();
router.get('/bookings', authMiddleWare, getBookings);
router.get('/location', authMiddleWare, updateLocation);

module.exports = router;