const express = require("express");
const user = require("./routes/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Console = require("console");
const path = require("path");
const http = require("http");

const dbUrl = "mongodb://admin:yoloswagg69@ds026658.mlab.com:26658/projetweb";
const mongo = process.env.MONGODB_URI || dbUrl;
mongoose.connect(
  mongo,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", Console.error.bind(console, "MongoDB connection error:"));

const app = express();
const server = new http.Server(app);
const port = process.env.PORT || 4444;

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist")));
app.use("/user", user);

server.listen(port, () => {
  Console.log(`Listening on port http://localhost:${port}/`);
});
