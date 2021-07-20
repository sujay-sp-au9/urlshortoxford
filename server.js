require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const jsonwebtoken = require("jsonwebtoken");
const catchAsync = require("./catchAsync");
const User = require("./models/user");
const UrlRouter = require("./routes/urls");
const AdminRouter = require("./routes/admin");

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  "mongodb://localhost:27017/glamurlshortner",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to db")
);

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(mongoSanitize());
app.use(xssClean());

export const authProtect = (req, res, next) => {
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

app.post(
  "/api/user",
  authProtect,
  catchAsync(async (req, res) => {
    const user = await User.find({ email: req.body.username });
    if (user.length === 0) {
      await User.create({ email: req.body.username });
      res.status(201).send({});
    } else {
      res.status(200).send({});
    }
  })
);

app.use("/api/url", UrlRouter);
app.use("/api/admin", AdminRouter);

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

const httpsServer = https.createServer(
  {
    key: fs.readFileSync(
      "/etc/letsencrypt/live/shorturl.cloudmantra.in/privkey.pem"
    ),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/shorturl.cloudmantra.in/fullchain.pem"
    ),
  },
  app
);

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
