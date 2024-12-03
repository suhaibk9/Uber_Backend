const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();
const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});
(async () => {
  try {
    await redisClient.connect(); // Explicitly connect the client
    console.log('Redis client connected');
  } catch (error) {
    console.error('Error connecting Redis client: ', error);
  }
})();

redisClient.on('error', (err) => {
  console.error('Redis client error: ', err);
});

module.exports = redisClient;
