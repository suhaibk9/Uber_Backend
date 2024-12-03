//findBooking({
//     _id: bookingId,
//     passenger: userId,
//   })
const Booking = require('../models/booking');
const findBooking = async (query) => {
  return Booking.findOne(query);
};
const createBooking = async (data) => {
  const booking = new Booking(data);
  await booking.save();
  return booking;
};
module.exports = {
  findBooking,
  createBooking,
};
