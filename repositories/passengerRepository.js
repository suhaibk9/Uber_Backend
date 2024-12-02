const User = require('../models/user');
const findPassengerById = async (id) => {
  return User.findById({
    _id: id,
    role: 'passenger',
  });
};

module.exports = {
  findPassengerById,
};
