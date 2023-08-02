const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_CONNECTION || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let db;

async function connect() {
  try {
    db = client.db("project-two");
    return db
  } catch (error) {
    console.log(error);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};
