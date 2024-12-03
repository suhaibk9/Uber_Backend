const bookingRepo = require('../repositories/bookingRepository');
const passengerRepo = require('../repositories/passengerRepository');
// const bookingRepo = new BookingRepository();
const Booking = require('../models/booking');
const getPassengerBookings = (passengerId) => {
  return Booking.find({ passenger: passengerId });
};
const provideFeedback = async (userId, bookingId, rating, feedback) => {
  const booking = await bookingRepo.findBooking({
    _id: bookingId,
    passenger: userId,
  });
  if (!booking) throw new Error('Booking not found');
  booking.rating = rating;
  booking.feedback = feedback;
  await booking.save();
  return booking;
};

module.exports = {
  getPassengerBookings,
  provideFeedback,
};
