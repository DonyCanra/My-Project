const axios = require("axios");

const BASE_URL_USER = process.env.BASE_URL_USER || "http://localhost:4001";

const typeDefs = `#graphql

type User {
    _id: String
    username: String
    email: String
    password: String
}

type Query {
    users: [User]
    user(id: String!): User
}
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const { data: users } = await axios.get(`${BASE_URL_USER}/users`);

        return users;
      } catch (error) {
        console.log(error);
      }
    },
    user: async (_, args) => {
      try {
        const { id } = args;
        const { data: user } = await axios.get(`${BASE_URL_USER}/users/${id}`);

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
