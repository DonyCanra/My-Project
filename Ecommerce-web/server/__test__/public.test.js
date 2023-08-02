const { Customer, Product } = require("../models");
const { hashPassword } = require("./bcrypt");
const { describe, test, expect } = require("@jest/globals");
const request = require("supertest");
const models = require("./models");
const app = require("./app");

let access_token = "";

async function bulkInsertCustomers() {
  await Customer.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await Product.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Customer.bulkCreate([
    {
      email: "test1@mail.com",
      password: hashPassword("123"),
      role: "customer",
    },
    {
      email: "test2@mail.com",
      password: hashPassword("123"),
      role: "customer",
    },
  ]);
  await Order.bulkCreate([
    {
      customerId: 1,
      cuisineId: 1,
    },
  ]);
}

beforeAll(async function () {
  await bulkInsertCustomers();
});
afterAll(async function () {
  await models.sequelize.close();
});

describe("Customer", function () {
  describe("Register Test", function () {
    test("Status (201)", async function () {
      const response = await request(app).post("/public/register").send({ email: "test@mail.com", password: "123" });
      expect(response.status).toEqual(201);
    });
    test("Status (400) ", async function () {
      const response = await request(app).post("/public/register").send({ password: "123" });
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("Email is required");
    });
    test("Status (400)", async function () {
      const response = await request(app).post("/public/register").send({ email: "test@mail.com" });
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("Password is required");
    });
    test("Status (400) ", async function () {
      const response = await request(app).post("/public/register").send({ email: "", password: "123" });
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("Email is required");
    });
    test("Status (400)", async function () {
      const response = await request(app).post("/public/register").send({ email: "test@mail.com", password: "" });
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("Password is required");
    });
    test("Status (401) ", async function () {
      const response = await request(app).post("/public/register").send({ email: "test@mail.com", password: "123" });
      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual("Email must been unique");
    });
    test("Status (400)", async function () {
      const response = await request(app).post("/public/register").send({ email: "test", password: "123" });
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("Format email is wrong");
    });
  });

  describe("Login Test", function () {
    test("Status (200)", async function () {
      const response = await request(app).post("/public/login").send({ email: "test@mail.com", password: "123" });
      expect(response.status).toEqual(200);
      access_token = response.body.access_token;
    });
    test("Status (400)", async function () {
      const response = await request(app).post("/public/login").send({ email: "test@mail.com", password: "1234" });
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("invalid password");
    });
    test("Status (400)", async function () {
      const response = await request(app).post("/public/login").send({ email: "test2@mail.com", password: "123" });
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("invalid email");
    });
  });

  describe("Main Entity test", function () {
    test("GET /public/products success without access token", async function () {
      const response = await request(app).get("/public/products");
      expect(response.status).toEqual(200);
      expect(typeof response.body).toEqual("object");
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("imgUrl");
      expect(response.body[0]).toHaveProperty("status");
      expect(response.body[0]).toHaveProperty("authorId");
      expect(response.body[0]).toHaveProperty("categoryId");
    });
    test("GET /public/products success without access token with query parameter", async function () {
      const response = await request(app).get("/public/products?page=1");
      expect(response.status).toEqual(200);
      expect(typeof response.body).toEqual("object");
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("imgUrl");
      expect(response.body[0]).toHaveProperty("status");
      expect(response.body[0]).toHaveProperty("authorId");
      expect(response.body[0]).toHaveProperty("categoryId");
    });
    test("GET /public/products success with with pagination and length pagination", async function () {
      const response = await request(app).get("/public/products?page=1");
      expect(response.status).toEqual(200);
      expect(typeof response.body).toEqual("object");
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("imgUrl");
      expect(response.body[0]).toHaveProperty("status");
      expect(response.body[0]).toHaveProperty("authorId");
      expect(response.body[0]).toHaveProperty("categoryId");
    });
    test("GET /public/products success by id params", async function () {
      const response = await request(app).get("/public/products/1");
      expect(response.status).toEqual(200);
      expect(typeof response.body).toEqual("object");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("price");
      expect(response.body).toHaveProperty("imgUrl");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("authorId");
      expect(response.body).toHaveProperty("categoryId");
    });
    test("GET /public/products/ fail id params invalid ", async function () {
      const response = await request(app).get("/public/products/1000");
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual("Product is not found");
    });
  });

  describe("Customer test", function () {
    test("GET /public/transactions showlist", async function () {
      const response = await request(app).get("/public/transactions").set("access_token", token);

      expect(response.status).toEqual(200);
      expect(typeof response.body).toEqual("object");
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("CustomerId");
      expect(response.body[0]).toHaveProperty("ProductId");
    });
    test("POST /transactions/productId show transaction with user id", async function () {
      const response = await request(app).post("/public/transactions/1").set("access_token", token);

      expect(response.status).toEqual(201);
      expect(typeof response.body).toEqual("object");
    });
    test("post /transactions/productsId fail add by params", async function () {
      const response = await request(app).post("/public/transactions/1000").set("access_token", token);

      console.log(response.body, "pppp");
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual("Product is not found");
    });
    test("POST /transactions/productId fail show because no access token", async function () {
      const response = await request(app).post("/public/transactions/1");

      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual("invalid token");
    });
    test("GET /transactions fail show because invalid token", async function () {
      const response = await request(app)
        .get("/public/transaactions/1")
        .set("access_token", access_token + "xxx");
      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual("invalid token");
    });
  });
});
