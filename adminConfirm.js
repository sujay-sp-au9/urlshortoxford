const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  req.user = "admin";
  next();
};
