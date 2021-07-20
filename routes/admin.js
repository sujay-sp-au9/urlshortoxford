const express = require("express");
const authProtect = require("../server");

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

router.post(
  "/api/admin",
  authProtect,
  adminProtect,
  catchAsync(async (req, res) => {})
);

module.exports = router;
