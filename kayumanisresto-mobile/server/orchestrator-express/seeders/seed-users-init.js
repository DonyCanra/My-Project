// const { MongoClient } = require("mongodb");
// const docs = require("./users-init.json");

// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("users");

//     const users = database.collection("users");

//     const option = { ordered: true };
//     const result = await users.insertMany(docs, option);

//     console.log(result);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
// node_modules;
