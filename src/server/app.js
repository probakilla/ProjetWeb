const express = require("express");
const app = express();
const user = require("./routes/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const HttpCodes = require("../js/httpCodes");
const mongoose = require("mongoose");

let dbUrl = "mongodb://admin:yoloswagg69@ds026658.mlab.com:26658/projetweb";
let mongo = process.env.MONGODB_URI || dbUrl;
mongoose.connect(mongo);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", user);

app.get("/", (req, res) => {
  res.status(HttpCodes.SUCCESS).send("swagger");
});

app.get("/home", (req, res) => {
  res.status(HttpCodes.SUCCESS).sendFile("index.html");
});
const port = 4444;
app.listen(port);
