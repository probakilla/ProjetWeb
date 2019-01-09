const User = require("../models/user.model");
const crypto = require("crypto");
const HttpCodes = require("../../js/httpCodes");
const key = "Crypt0K3y";

function handleError(err, res) {
  res.status(HttpCodes.BAD_REQUEST).send("DATABASE ERROR: " + err);
}

function encrypt(text, masterKey) {
  const iv = crypto.randomBytes(16);
  const salt = crypto.randomBytes(64);
  const key = crypto.pbkdf2Sync(masterKey, salt, 2145, 32, "sha512");
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final()
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([salt, iv, tag, encrypted]).toString("base64");
}

function decrypt(encrypted, masterKey) {
  const bData = Buffer.from(encrypted, "base64");

  const salt = bData.slice(0, 64);
  const iv = bData.slice(64, 80);
  const tag = bData.slice(80, 96);
  const text = bData.slice(96);

  const key = crypto.pbkdf2Sync(masterKey, salt, 2145, 32, "sha512");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return decipher.update(text, "binary", "utf8") + decipher.final("utf8");
}

exports.userRegister = (req, res) => {
  const encrypted = encrypt(req.body.password, key);
  let user = new User({
    username: req.body.username,
    password: encrypted,
    labs: req.body.labs,
  });
  user.save(err => {
    if (err) handleError(err, res);
    res.status(HttpCodes.CREATED).send("Enregistrement réussi!");
  });
};

exports.userCredentials = (req, res) => {
  User.findOne(
    { username: req.params.uname },
    "password labs",
    (err, user) => {
      if (err) handleError(err, res);
      if (decrypt(user.password, key) === req.params.pswd) {
        const obj = {
          username: req.params.uname,
          labs: user.labs
        };
        res.status(HttpCodes.ACCEPTED).send(JSON.stringify(obj));
      }
      res.status(HttpCodes.UNAUTHORIZED).send("Connexion échouée ");
    }
  );
};
