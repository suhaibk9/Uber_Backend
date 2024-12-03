const bookingService = require('../services/bookingService');
const io = require('../index');

const locationService = require('../services/locationService');

const createBooking = (io) => async (req, res) => {
  try {
    const { source, destination } = req.body;
    console.log("Sourcce", source);
    console.log("Destinnation", destination);
    const driverIds = [];
    const booking = await bookingService.createBooking({
      passengerId: req.user._id,
      source,
      destination,
    });
    const nearByDrivers = await bookingService.findNearbyDrivers(source);
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
const confirmBooking = (io) => async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await bookingService.assignDriver(bookingId, req.user._id);
    const notifiedDrivers = await locationService.getNotifiedDrivers(bookingId);
    for (const driverId of notifiedDrivers) {
      const driverSocketId = await locationService.getDriverSocket(driverId);
      if (driverSocketId) {
        if (driverId === req.user._id) {
          io.to(driverSocketId).emit('rideConfirmed', {
            bookingId,
            driver: req.user._id,
          });
        } else {
          io.to(driverSocketId).emit('removeBooking', {
            bookingId,
            driver: req.user._id,
          });
        }
      }
    }
    return res.status(200).send({
      data: booking,
      success: true,
      error: null,
      message: 'successfully confirmed booking',
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
module.exports = { createBooking, confirmBooking };
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
