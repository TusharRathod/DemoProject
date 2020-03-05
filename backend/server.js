const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./routes/userRouter");
const product = require("./routes/productRouter");
var jwt = require("jsonwebtoken");
var cors = require("cors");
const port = 8080;
const app = express();

// const { static } = require("express");

app.use("/uploads", express.static("public/images/uploads/"));
app.use(cors());
app.set("secretKey", "nodeRestApi"); // jwt secret token
let dev_db_url = "mongodb://127.0.0.1:27017/warrior";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", user);
app.use("/product", validateUser, product);
app.use("/upload", validateUser, user);
app.use("/getUser", validateUser, user);

function validateUser(req, res, next) {
  jwt.verify(req.headers["authorization"], req.app.get("secretKey"), function(
    err,
    decoded
  ) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.userId = decoded.userId;
      next();
    }
  });
}
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// handle errors
app.use(function(err, req, res, next) {
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
