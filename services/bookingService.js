const bookingRepo = require('../repositories/bookingRepository');
const haversineDistance = require('../utils/distance');
const locationService = require('../services/locationService');
const BASIC_FARE = 50; // Basic fare in currency units
const RATE_PER_KM = 12; // Rate per kilometer in currency units
const createBooking = async ({ passengerId, source, destination }) => {
  const distance = haversineDistance(
    source.latitude,
    source.longitude,
    destination.latitude,
    destination.longitude
  );
  const fare = BASIC_FARE + distance * RATE_PER_KM;
  const booking = await bookingRepo.createBooking({
    passenger: passengerId,
    source,
    destination,
    fare,
    status: 'pending',
  });

  return booking;
};
const findNearbyDrivers = async (source) => {
  console.log('SOURCE', source);
  const radius = 5;
  const latitude = source.latitude;
  const longitude = source.longitude;
  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Invalid source location');
  }
  console.log('LATITUDE', latitude);
  console.log('LONGITUDE', longitude);
  const nearbyDrivers = await locationService.findNearbyDrivers(
    longitude,
    latitude,
    radius
  );
  return nearbyDrivers;
};
const assignDriver = async (bookingId, driverId) => {
  const booking = await bookingRepo.updateBookingStatus(
    bookingId,
    driverId,
    'confirmed'
  );
  if (!booking) {
    throw new Error('Booking not found or already confirmed');
  }
  return booking;
};
module.exports = {
  createBooking,
  findNearbyDrivers,
  assignDriver,
};
