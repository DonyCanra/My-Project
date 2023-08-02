if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const [userTypeDefs, userResolvers] = require("./schemas/userSchema");
const [itemTypeDefs, itemResolvers] = require("./schemas/itemSchema");
const [categoryTypeDefs, categoryResolvers] = require("./schemas/categorySchema");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, itemTypeDefs, categoryTypeDefs],
  resolvers: [userResolvers, itemResolvers, categoryResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`Example app listening on ${url}`);
});
