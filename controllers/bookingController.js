const bookingService = require('../services/bookingService');
const io = require('../index');

const locationService = require('../services/locationService');

const createBooking = (io) => async (req, res) => {
  try {
    const { source, destination } = req.body;
    const driverIds = [];
    const booking = await bookingService.createBooking({
      passengerId: req.user._id,
      source,
      destination,
    });
    const nearByDrivers = await locationService.getNearByDrivers(source);
    for (const driver of nearByDrivers) {
      const driverSocketId = await locationService.getDriverSocket(driver[0]);
      if (driverSocketId) {
        driverIds.push(driver[0]);
        io.to(driverSocketId).emit('newBooking', {
          bookingId: booking._id,
          source,
          destination,
          fare: booking.fare,
        });
      }
    }
    await locationService.storeNotifiedDrivers(booking._id, driverIds);
    res.status(201).send({
      data: booking,
      success: true,
      error: null,
      message: 'successfully created booking',
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
module.exports = { createBooking };
/*
How the list of nearby drivers will look like:

[
  [
    "driver123",                // Driver ID
    ["13.4050", "52.5200"]      // [Longitude, Latitude] as strings
  ],
  [
    "driver456",
    ["13.4100", "52.5220"]
  ],

]

 */
