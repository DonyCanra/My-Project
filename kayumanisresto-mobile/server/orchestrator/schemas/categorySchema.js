const Redis = require("ioredis");
const axios = require("axios");

const redis = new Redis("redis://default:1X03FAhnXGCYyhQkON1aSHBJ0uqSPlPX@redis-11101.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:11101");

const BASE_URL_APP = process.env.BASE_URL_APP || "http://localhost:4002";

const typeDefs = `
    type Category {
        id: Int
        name: String
        imgUrl: String
    }
    
    type Query {
        categories: [Category]
        category(id: Int!): Category 
    }
    `;

const resolvers = {
  Query: {
    categories: async () => {
      try {
        const categoriesCache = await redis.get("app:categories");
        let categories;

        if (categoriesCache) {
          categories = JSON.parse(categoriesCache);
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${BASE_URL_APP}/admin/categories`,
          });
          await redis.set("app:categories", JSON.stringify(data.Category));
          categories = data;
        }
        return categories;
      } catch (error) {
        console.log(error);
      }
    },

    category: async (_, args) => {
      try {
        const { id } = args;
        const { data: category } = await axios({
          method: "GET",
          url: `${BASE_URL_APP}/admin/categories/${id}`,
        });

        return category;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
