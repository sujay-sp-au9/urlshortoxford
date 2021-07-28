const express = require("express");
const catchAsync = require("./catchAsync");
const ShortUrl = require("./models/shortUrl");
const authProtect = require("./authProtect");
const adminProtect = require("./adminProtect");
const shortId = require("shortid");
const http = require("https");

const router = express.Router();

const options = {
  method: "GET",
  hostname: "freegeoip.app",
  port: null,
  path: "/json/",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
};

const getAllUrlsOfUser = catchAsync(async (req, res) => {
  let sort;
  switch (req.body.sort) {
    case "latest":
      sort = {
        createdAt: "desc",
      };
      break;
    case "oldest":
      sort = {
        createdAt: "asc",
      };
      break;
    case "mostclicked":
      sort = {
        clicks: "desc",
      };
      break;
    case "leastclicked":
      sort = { clicks: "asc" };
      break;
    default:
      sort = {
        createdAt: "desc",
      };
  }
  let status;
  const { filter } = req.body;
  if (filter === 3) {
    status = undefined;
  } else if (filter === 2) {
    status = false;
  } else if (filter === 1) {
    status = true;
  } else {
    status = undefined;
  }
  const finalObj = {};
  if (status === true || status === false) {
    finalObj.status = status;
  }
  if (req.user === "adminadminadmin") {
    finalObj.user = { $ne: req.body.username };
    finalObj.$or = [
      { full: new RegExp(req.body.search, "i") },
      { short: new RegExp(req.body.search, "i") },
      { user: new RegExp(req.body.search, "i") },
    ];
  } else {
    finalObj.user = req.body.username;
    finalObj.$or = [
      { full: new RegExp(req.body.search, "i") },
      { short: new RegExp(req.body.search, "i") },
    ];
  }
  const shortUrls = await ShortUrl.find(finalObj)
    .sort(sort)
    .skip((req.body.pageNumber - 1) * req.body.pageSize)
    .limit(req.body.pageSize);
  res.status(200).send({ shortUrls });
});

const countAllUrlsOfUser = catchAsync(async (req, res) => {
  const finalObj = {};
  if (req.originalUrl.split("/")[3] === "admin") {
    finalObj.user = { $ne: req.params.user };
  } else {
    finalObj.user = req.params.user;
  }
  const count = await ShortUrl.countDocuments(finalObj);
  res.status(200).send({ count });
});

const addToUrls = catchAsync(async (req, res) => {
  if (req.body.short && req.body.short.startsWith("api")) {
    return res.status(400).send({ message: "Alias not allowed" });
  }
  if (!req.body.short && !req.body.password) {
    let shortUrl = await ShortUrl.find({
      full: req.body.full,
      user: req.body.username,
    });
    if (shortUrl.length > 0 && !shortUrl[0].password) {
      return res.status(200).send({ shortUrl: shortUrl[0] });
    }
  }
  const createAndSend = async (short) => {
    const dataObj = {
      full: req.body.full,
      short,
      user: req.body.username,
      password: req.body.password,
      createdAt: Date.now(),
    };
    if (req.body.state) {
      dataObj.state = "TMP";
    }
    const shortUrl = await ShortUrl.create(dataObj);
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
      res.status(202).send({ error: "ShortURL already exists" });
    } else {
      await createAndSend(short);
    }
  }
});

const getFullUrl1 = catchAsync(async (req, res) => {
  const shortUrl = await ShortUrl.findOne(
    { short: req.params.shortUrl },
    "full password clicks clicksDates status"
  );
  if (shortUrl == null) return res.status(404).send({ message: "Not found" });
  if (!shortUrl.status) {
    return res.status(200).send({ shortUrl: "disabled" });
  }
  if (shortUrl.password) {
    return res.status(200).send({ shortUrl: "password protected" });
  }
  res.status(200).send({ shortUrl });
  shortUrl.clicks++;
  let { referrer } = req.query;
  if (referrer === "") {
    referrer = "direct";
  }
  console.log(req.ip);
  let location;
  const reqlocation = http.request(options, function (res) {
    const chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      const body = Buffer.concat(chunks);
      location = JSON.parse(body.toString()).country_code;
      if (!location) {
        location = "IN";
      }
      shortUrl.clicksDates.push({
        date: Date.now(),
        referrer,
        location: location.toLowerCase(),
      });
      shortUrl.save();
    });
  });
  reqlocation.end();
});

const getFullUrl2 = catchAsync(async (req, res) => {
  const shortUrl = await ShortUrl.findOne(
    { short: req.params.shortUrl },
    "full password clicks clicksDates"
  );
  if (!shortUrl) return res.status(404).send({ message: "Not found" });
  if (shortUrl.password) {
    if (req.body.password && shortUrl.password === req.body.password) {
      res.status(200).send({ shortUrl });
      shortUrl.clicks++;
      let { referrer } = req.query;
      if (referrer === "") {
        referrer = "direct";
      }
      let location;
      const reqlocation = http.request(options, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
        res.on("end", function () {
          const body = Buffer.concat(chunks);
          location = JSON.parse(body.toString()).country_code;
          if (!location) {
            location = "IN";
          }
          shortUrl.clicksDates.push({
            date: Date.now(),
            referrer,
            location: location.toLowerCase(),
          });
          shortUrl.save();
        });
      });
      reqlocation.end();
    } else {
      res.status(403).send({ message: "Incorrect password" });
    }
  } else {
    res.status(200).send({ shortUrl });
    shortUrl.clicks++;
    let { referrer } = req.query;
    if (referrer === "") {
      referrer = "direct";
    }
    let location;
    const reqlocation = http.request(options, function (res) {
      const chunks = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        const body = Buffer.concat(chunks);
        location = JSON.parse(body.toString()).country_code;
        if (!location) {
          location = "IN";
        }
        shortUrl.clicksDates.push({
          date: Date.now(),
          referrer,
          location: location.toLowerCase(),
        });
        shortUrl.save();
      });
    });
    reqlocation.end();
  }
});

const getReferrers = catchAsync(async (req, res) => {
  const shortUrl = await ShortUrl.findOne(
    { short: req.params.shortUrl },
    "referrers"
  );
  if (!shortUrl) return res.sendStatus(404);
  res.status(200).send({ shortUrl });
});

const getClickDates = catchAsync(async (req, res) => {
  const shortUrl = await ShortUrl.findOne(
    { short: req.params.shortUrl },
    "clicksDates"
  );
  if (!shortUrl) return res.sendStatus(404);
  res.status(200).send({ shortUrl });
});

const deleteSelectedUrls = catchAsync(async (req, res) => {
  await ShortUrl.deleteMany({
    _id: {
      $in: req.body.ids,
    },
  });
  res.status(204).send({});
});

const deleteAllUrlsOfUser = catchAsync(async (req, res) => {
  const finalObj = {};
  if (req.user === "adminadminadmin") {
    finalObj.user = { $ne: req.body.username };
  } else {
    finalObj.user = req.body.username;
  }
  await ShortUrl.deleteMany(finalObj);
  res.status(204).send({});
});

const updateSelectedUrlsStatus = catchAsync(async (req, res) => {
  await ShortUrl.updateMany(
    {
      _id: { $in: req.body.ids },
    },
    { status: req.body.status }
  );
  res.status(200).send({});
});

const checkShortUrlAliasAlreadyExists = catchAsync(async (req, res) => {
  const shortUrl = await ShortUrl.findOne(
    { short: req.params.shortUrl },
    "clicks"
  );
  if (shortUrl == null) return res.status(200).send({ exists: false });
  res.status(200).send({ exists: true });
});

const updateShortUrlLongUrl = catchAsync(async (req, res) => {
  await ShortUrl.findByIdAndUpdate(req.body.id, { full: req.body.full });
  res.status(200).send({});
});

router.post("/", authProtect, getAllUrlsOfUser);
router.get("/shortUrls/count/:user", countAllUrlsOfUser);
router.get("/short/:shortUrl/exists", checkShortUrlAliasAlreadyExists);
router.post("/shortUrls", authProtect, addToUrls);
router.get("/short/referrers/:shortUrl", getReferrers);
router.get("/short/clickDates/:shortUrl", getClickDates);
router.get("/short/:shortUrl", getFullUrl1);
router.post("/short/:shortUrl", getFullUrl2);
router.delete("/shortUrls", authProtect, deleteSelectedUrls);
router.delete("/shortUrls/all", authProtect, deleteAllUrlsOfUser);
router.patch("/shortUrls/long", authProtect, updateShortUrlLongUrl);
router.patch("/shortUrls", authProtect, updateSelectedUrlsStatus);

router.get("/admin/shortUrls/count/:user", countAllUrlsOfUser);

router.use(authProtect, adminProtect);
router.post("/admin", getAllUrlsOfUser);
router.delete("/admin/shortUrls/all", deleteAllUrlsOfUser);

module.exports = router;
