const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.body.accessToken || !req.body.username) {
      return res
        .status(403)
        .send({ message: "User not logged in. Unauthorised" });
    }
    const decoded = jsonwebtoken.decode(req.body.accessToken);
    const findUsername = JSON.stringify(decoded);
    if (
      !(
        decoded.aud === process.env.APPID &&
        decoded.exp * 1000 > Date.now() &&
        new RegExp(req.body.username, "i").test(findUsername) &&
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
