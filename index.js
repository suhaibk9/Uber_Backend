const PORT = require('./config/index').ServerConfig.PORT;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
