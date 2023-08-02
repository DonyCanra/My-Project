const bcrypt = require("bcryptjs");

const HashPassword = (input) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(input, salt);
};

const ComparePassword = (input, hash) => {
  return bcrypt.compareSync(input, hash);
};

module.exports = {
  HashPassword,
  ComparePassword,
};
