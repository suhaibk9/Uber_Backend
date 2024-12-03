const authMiddleWare = require('../middlewares/authMiddleWare');
const {
  getDriverBookings,
  updateLocation,
} = require('../controllers/driverController');
const router = require('express').Router();
router.get('/bookings', authMiddleWare, getDriverBookings);
router.post('/location', authMiddleWare, updateLocation);

module.exports = router;
