const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decoded = jsonwebtoken.decode(req.body.accessToken);
    if (
      decoded.roles &&
      decoded.roles.length > 0 &&
      decoded.roles.some((el) => el === "admin")
    ) {
      req.user = "adminadminadmin";
    }
  } catch (err) {
    console.log(err);
  }
  next();
};
