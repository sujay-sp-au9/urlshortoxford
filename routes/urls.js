const express = require("express");
const authProtect = require("../server");

const router = express.Router();

router.post(
  "/",
  authProtect,
  catchAsync(async (req, res) => {
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
    let finalObj = {
      user: req.body.username,
      full: new RegExp(req.body.search2, "i"),
      short: new RegExp(req.body.search, "i"),
    };
    if (status === true || status === false) {
      finalObj.status = status;
    }
    const shortUrls = await ShortUrl.find(finalObj)
      .sort(sort)
      .skip((req.body.pageNumber - 1) * 10)
      .limit(10);
    res.status(200).send({ shortUrls });
  })
);

router.get(
  "/shortUrls/count/:user",
  catchAsync(async (req, res) => {
    const count = await ShortUrl.countDocuments({
      user: req.params.user,
    });
    res.status(200).send({ count });
  })
);

router.post(
  "/shortUrls",
  authProtect,
  catchAsync(async (req, res) => {
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

router.get(
  "/short/:shortUrl",
  catchAsync(async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
    if (!shortUrl.status) {
      return res.status(200).send({ shortUrl: "disabled" });
    }
    if (shortUrl.password) {
      return res.status(200).send({ shortUrl: "password protected" });
    }
    res.status(200).send({ shortUrl });
    shortUrl.clicks++;
    shortUrl.save();
  })
);

router.post(
  "/short/:shortUrl",
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

router.delete(
  "/shortUrls",
  authProtect,
  catchAsync(async (req, res) => {
    await ShortUrl.deleteMany({
      _id: {
        $in: req.body.ids,
      },
    });
    res.status(204).send({});
  })
);

router.put(
  "/shortUrls",
  authProtect,
  catchAsync(async (req, res) => {
    await ShortUrl.updateMany(
      {
        _id: { $in: req.body.ids },
      },
      { status: req.body.status }
    );
    res.status(200).send({});
  })
);

router.delete(
  "/shortUrls/all",
  authProtect,
  catchAsync(async (req, res) => {
    await ShortUrl.deleteMany({ user: req.body.username });
    res.status(204).send({});
  })
);

router.get(
  "/short/:shortUrl/exists",
  catchAsync(async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.status(200).send({ exists: false });
    res.status(200).send({ exists: true });
  })
);

module.exports = router;
