const express = require("express");
const app = express();
const port = 4444;
const user = require("./routes/user.route");
const bodyParser = require("body-parser");

app.use("/users", user);

app.get("/", (req, res) => {
  res.status(200).send("swagg");
});

app.listen(port);
