const User = require('../models/user');
const findDriverById = async (id) => {
  return User.findById({
    _id: id,
    role: 'driver',
  });
};
module.exports = {
  findDriverById,
};
