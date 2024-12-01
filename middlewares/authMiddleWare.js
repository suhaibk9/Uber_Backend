const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authMiddleWare = async (req, res, next) => {
  try {
    //Get the token from the header and remove the 'Bearer ' part.
    const token = req.header('Authorization').replace('Bearer ', '');
    //Verify the token and get the user id.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Find the user with the id and the token.
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    //If the user is not found, then throw an error.
    if (!user) {
      throw new Error();
    }
    //Set the token and user in the request object.
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};
module.exports = authMiddleWare;
