require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const shortId = require("shortid");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const jsonwebtoken = require("jsonwebtoken");
const catchAsync = require("./catchAsync");
const ShortUrl = require("./models/shortUrl");

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  process.env.DB_URL.replace("<password>", "lmfao123"),
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

const authProtect = (req, res, next) => {
  try {
    if (!req.body.idToken || !req.body.username) {
      return res
        .status(403)
        .send({ message: "User not logged in. Unauthorised" });
    }
    const decoded = jsonwebtoken.decode(req.body.idToken);
    console.log(
      decoded.aud === process.env.APPID,
      decoded.exp * 1000 > Date.now(),
      decoded.preferred_username === req.body.username
    );
    if (
      !(
        decoded.aud === process.env.APPID &&
        decoded.exp * 1000 > Date.now() &&
        decoded.preferred_username === req.body.username
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

app.get(
  "/api/:username",
  catchAsync(async (req, res) => {
    const shortUrls = await ShortUrl.find({ user: req.params.username }).sort({
      createdAt: -1,
    });
    res.status(200).send({ shortUrls });
  })
);

app.post(
  "/api/shortUrls",
  authProtect,
  catchAsync(async (req, res) => {
    if (!req.body.short) {
      let shortUrl = await ShortUrl.find({
        full: req.body.full,
        user: req.body.username,
      });
      if (shortUrl.length > 0) {
        return res.status(200).send({ shortUrl: shortUrl[0] });
      }
    }
    const createAndSend = async (short) => {
      const shortUrl = await ShortUrl.create({
        full: req.body.full,
        short,
        user: req.body.username,
        password: req.body.password,
      });
      res.status(201).send({ shortUrl });
    };
    let short = req.body.short;
    if (!short) {
      short = shortId.generate();
      shortUrl = await ShortUrl.find({ short });
      while (shortUrl.length > 0) {
        short = shortId.generate();
        shortUrl = await ShortUrl.find({ short });
      }
      await createAndSend(short);
    } else {
      let shortUrl = await ShortUrl.find({ short });
      if (shortUrl.length > 0) {
        res.status(202).send({ error: "shortURL already exists" });
      } else {
        await createAndSend(short);
      }
    }
  })
);

app.get(
  "/api/short/:shortUrl",
  catchAsync(async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
    if (shortUrl.password) {
      return res.status(200).send({ shortUrl: "password protected" });
    }
    res.status(200).send({ shortUrl });
    shortUrl.clicks++;
    shortUrl.save();
  })
);

app.post(
  "/api/short/:shortUrl",
  catchAsync(async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
    if (shortUrl.password) {
      if (req.body.password && shortUrl.password === req.body.password) {
        res.status(200).send({ shortUrl });
        shortUrl.clicks++;
        shortUrl.save();
      } else {
        res.sendStatus(403);
      }
    } else {
      res.status(200).send({ shortUrl });
      shortUrl.clicks++;
      shortUrl.save();
    }
  })
);

app.delete(
  "/api/short/:shortUrlId",
  authProtect,
  catchAsync(async (req, res) => {
    await ShortUrl.findByIdAndDelete(req.params.shortUrlId);
    res.status(204).send({});
  })
);

app.get(
  "/api/short/:shortUrl/exists",
  catchAsync(async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.status(200).send({ exists: false });
    res.status(200).send({ exists: true });
  })
);

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
