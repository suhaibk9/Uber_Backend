const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();
const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});
redisClient.on('connect', () => {
  console.log('Redis client connected');
});
redisClient.on('error', (err) => {
  console.log('Error: ' + err);
});
module.exports = redisClient;
