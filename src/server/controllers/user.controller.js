const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const HttpCodes = require("../httpCodes")
const key = "CryptoKey";

function handleError(err, res) {
  res.status(HttpCodes.BAD_REQUEST).send("DATABASE ERROR: " + err);
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
    res.status(HttpCodes.CREATED).send("Enregistrement réussi!");
  });
};

exports.userCredentials = (req, res) => {
  User.findOne({ username: req.params.uname }, "password", (err, user) => {
    if (err) handleError(err, res);
    if (dcr(user.password) === req.params.uname) {
      res.status(HttpCodes.ACCEPTED).send("Connexion réussie");
    }
    res.status(HttpCodes.UNAUTHORIZED).send("Connexion échouée");
  });
};
