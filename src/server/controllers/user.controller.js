const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const key = "CryptoKey";

function handleError(err, res) {
  res.status(400).send("DATABASE ERROR: " + err);
}

function ecr(word) {
  return CryptoJS.AES.encrypt(word, key);
}

function dcr(encrypted) {
  return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
}

exports.userRegister = (req, res) => {
  const password = ecr(req.body.password);
  let user = new User({
    username: req.body.username,
    password: password,
    labs: req.body.labs,
    teams: req.body.teams
  });
  user.save(err => {
    if (err) handleError(err, res);
    res.status(201).send("Successfully registred!");
  });
};

exports.userCredentials = (req, res) => {
  User.findOne({ username: req.params.uname }, "password", (err, user) => {
    if (err) handleError(err, res);
    if (dcr(user.password) === req.params.uname) {
      res.status(202).send("Connected");
    }
    res.status(401).send("Authentication failed");
  });
};
