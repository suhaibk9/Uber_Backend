const router = require('express').Router();
const authMiddleWare = require('../middlewares/authMiddleWare');
module.exports = (io) => {
  //io is the socket.io instance
  router.post('/', authMiddleWare, createBooking(io));
  router.post('/confirm', authMiddleWare, confirmBooking(io));
  return router;
};
