const express = require("express");
const user = require("./routes/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const dbUrl = "mongodb://admin:yoloswagg69@ds026658.mlab.com:26658/projetweb";
const mongo = process.env.MONGODB_URI || dbUrl;
mongoose.connect(mongo);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
const port = 4444;

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", user);

app.listen(process.env.PORT || port);
