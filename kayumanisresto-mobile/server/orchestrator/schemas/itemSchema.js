const Redis = require("ioredis");
const axios = require("axios");

const redis = new Redis("redis://default:1X03FAhnXGCYyhQkON1aSHBJ0uqSPlPX@redis-11101.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:11101");

const BASE_URL_USER = process.env.BASE_URL_USER || "http://localhost:4001";
const BASE_URL_APP = process.env.BASE_URL_APP || "http://localhost:4002";

const typeDefs = `
    type Item {
        id: Int
        name: String
        description: String
        price: Int
        stars: String
        imgUrl: String
        UserId: Int
        CategoryId: String
        UserMongoId: String
        User: User
        Category: Category
        Ingredients: [Ingredient]
    }

    type User {
      _id: String
      username: String
      email: String
    }

    type Category {
      name: String
      imgUrl: String
    }
    type Ingredient {
      ItemId: Int
      name: String
    }

    type Query {
        items: [Item]
        item(id: Int!): Item 
    }
    `;

const resolvers = {
  Query: {
    items: async () => {
      try {
        const itemsCache = await redis.get("app:items");
        let items;

        if (itemsCache) {
          items = JSON.parse(itemsCache);
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${BASE_URL_APP}/public/items`,
          });
          await redis.set("app:items", JSON.stringify(data.Items));
          items = data;
        }
        return items;
      } catch (error) {
        console.log(error);
      }
    },

    item: async (_, args) => {
      try {
        const { id } = args;
        const { data: item } = await axios({
          method: "GET",
          url: `${BASE_URL_APP}/public/items/${id}`,
        });

        console.log(item, id, "<<<");
        const { data: user } = await axios({
          method: "GET",
          url: `${BASE_URL_USER}/users/${item.UserMongoId}`,
        });

        console.log(user, ">>");

        item.User = user;

        return item;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
