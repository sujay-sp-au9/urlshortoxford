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
const authProtect = require("./authProtect");
const adminConfirm = require("./adminConfirm");
const UrlRouter = require("./urls");

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

app.post("/api/authenticate", authProtect, adminConfirm, (req, res) => {
  const responseObj = {};
  if (req.user === "admin") {
    responseObj.admin = true;
  }
  res.status(200).send(responseObj);
});

app.use("/api/url", UrlRouter);

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
