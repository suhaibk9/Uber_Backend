const router = require('express').Router();
const authMiddleWare = require('../middlewares/authMiddleWare');
const passengerController = require('../controllers/passengerController');
const { getPassengerBookings, provideFeedback } = passengerController;
module.exports = (io) => {
  router.get('/bookings', authMiddleWare, getPassengerBookings);
  router.get('/feedback', authMiddleWare, provideFeedback);
  return router;
};
