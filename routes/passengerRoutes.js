const router = require('express').Router();
const authMiddleWare = require('../middlewares/authMiddleWare');

module.exports = (io) => {
  router.get('/bookings', authMiddleWare, getBookings);
  router.get('/feedback', authMiddleWare, getFeedback);
  return router;
};
