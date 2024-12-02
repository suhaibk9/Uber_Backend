const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authMiddleware = async (req, res, next) => {
  console.log('inside auth');
  //Get the token from the header.
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('verified', verified);
    req.user = await User.findById(verified.id);
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
module.exports = authMiddleware;

//Okay so the flow is when user registers we give it a token or it logins we give it a token
// Now everytime user needs to call an endpoint it will send just that token.
