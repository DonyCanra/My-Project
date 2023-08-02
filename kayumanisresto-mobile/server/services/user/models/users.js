const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongoConnection");

class User {
  static userCollection() {
    return getDb().collection("users");
  }

  static async findAll() {
    const userCollection = this.userCollection();
    // console.log(userCollection, "<<<");
    return await userCollection.find().toArray();
  }

  static async findById(userId) {
    const userCollection = this.userCollection();
    return await userCollection.findOne({
      _id: new ObjectId(userId),
    });
  }
  static async create({ username, email, password }) {
    const userCollection = this.userCollection();
    const result = await userCollection.insertOne({
      username,
      email,
      password,
    });
    return await userCollection.findOne({
      _id: new ObjectId(result.insertedId),
    });
  }
}

module.exports = User;
