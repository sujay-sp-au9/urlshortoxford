const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.body.accessToken || !req.body.username) {
      return res
        .status(403)
        .send({ message: "User not logged in. Unauthorised" });
    }
    const decoded = jsonwebtoken.decode(req.body.accessToken);
    if (
      !(
        decoded.appid === process.env.APPID &&
        decoded.exp * 1000 > Date.now() &&
        (decoded.upn === req.body.username ||
          decoded.email === req.body.username) &&
        decoded.tid === process.env.TENANTID
      )
    ) {
      return res
        .status(403)
        .send({ message: "User not logged in. Unauthorised" });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};
