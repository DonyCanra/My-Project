const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const Redis = require("ioredis");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const redis = new Redis("redis://default:1X03FAhnXGCYyhQkON1aSHBJ0uqSPlPX@redis-11101.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:11101");
const PORT = 4000;

app.use(morgan("tiny"));

app.get("/all", async (req, res, next) => {
  try {
    const allDataCache = await redis.get("allDataCache");
    if (!allDataCache) {
      const { data: items } = await axios({
        method: "GET",
        url: `http://localhost:4002/public/items`,
      });
      const { data: users } = await axios({
        method: "GET",
        url: `http://localhost:4001/users`,
      });

      const allData = { items, users };
      await redis.set("allDataCache", JSON.stringify(allData));
      res.status(200).json(allData);
    } else {
      res.status(200).json(JSON.parse(allDataCache));
    }
  } catch (err) {
    next(err);
  }
});

app.get("/items", async (req, res, next) => {
  try {
    const itemsCache = await redis.get("itemsCache");
    if (!itemsCache) {
      const { data: items } = await axios({
        method: "GET",
        url: `http://localhost:4002/public/items`,
      });
      await redis.set("itemsCache", JSON.stringify(items));
      res.status(200).json(data);
    } else {
      res.status(200).json(JSON.parse(itemsCache));
    }
  } catch (err) {
    next(err);
  }
});

app.get("/items/:id", async (req, res, next) => {
  try {
    const { data: item } = await axios({
      method: "GET",
      url: `http://localhost:4002/public/items/${req.params.id}`,
    });

    const { data: user } = await axios({
      method: "GET",
      url: `http://localhost:4001/users/${item.UserMongoId}`,
    });

    item.User = user;
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

app.post("/.items", async (req, res, next) => {
  const { name, description, price, imgUrl, CategoryId, ingredients } = req.body;
  try {
    let { data } = await axios({
      method: "POST",
      url: `http://localhost:4002/admin/items`,
      data: { name, description, price, imgUrl, CategoryId, ingredients },
    });

    await redis.del("allData");
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log("this orchestractor express running with port", PORT);
});
