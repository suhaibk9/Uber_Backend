const passenger = require('../services/passengerService');
const getPassengerBookings = async (req, res) => {
  try {
    const bookings = await passenger.getPassengerBookings(req.user._id);
    if (bookings.length === 0) {
      return res.status(200).send({
        data: bookings,
        success: true,
        error: null,
        message: 'No bookings found',
      });
    }
    return res.status(200).send({
      data: bookings,
      success: true,
      error: null,
      message: 'successfully fetched bookings',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
/*
Feedback Structure:
{
    "bookingId": "5f8f8c4b2f4b8c2b4c7f7b4c",
    "rating": 4,
    "feedback": "The driver was very polite and the car was clean."
}
 */
const provideFeedback = async (req, res) => {
  try {
    const { bookingId, rating, feedback } = req.body;
    const fb = await passenger.provideFeedback(
      req.user._id,
      bookingId,
      rating,
      feedback
    );
    return res.status(201).send({
      data: fb,
      success: true,
      error: null,
      message: 'successfully added feedback',
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = { getPassengerBookings, provideFeedback };
