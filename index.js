const PORT = require('./config/index').ServerConfig.PORT;
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const driverRoutes = require('./routes/driverRoutes');
const redisClient = require('./utils/redisClient');
const cors = require('cors');
const io = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });
app.use('/api/auth', authRoutes);
// app.use('/api/booking', bookingRoutes(io));
app.use('/api/passenger', passengerRoutes(io));
app.use('/api/driver', driverRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});