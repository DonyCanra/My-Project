if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 4001;
const { connect } = require("./config/mongoConnection");
const { errorHandler } = require("./middlewares/errorHandler");
const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

app.use(errorHandler);

connect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
