//findBooking({
//     _id: bookingId,
//     passenger: userId,
//   })
const findBooking = async (query) => {
  return Booking.findOne(query);
};

module.exports = {
  findBooking,
};
