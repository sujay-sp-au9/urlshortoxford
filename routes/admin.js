const express = require("express");
const catchAsync = require("../catchAsync");

const authProtect = (req, res, next) => {
  try {
    if (!req.body.idToken || !req.body.username) {
      return res
        .status(403)
        .send({ message: "User not logged in. Unauthorised" });
    }
    const decoded = jsonwebtoken.decode(req.body.idToken);
    if (
      !(
        decoded.aud === process.env.APPID &&
        decoded.exp * 1000 > Date.now() &&
        decoded.preferred_username === req.body.username &&
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

const router = express.Router();

const adminProtect = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.username });
  if (!user) {
    return res.status(403).send({ message: "User not found. Unauthorised" });
  } else if (user.role === 0) {
    return res.status(403).send({ message: "User not an admin. Unauthorised" });
  }
  next();
});

router.post("/api/admin", authProtect, adminProtect);

module.exports = router;
