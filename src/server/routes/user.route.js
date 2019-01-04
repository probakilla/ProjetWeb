const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/", userController.userRegister);
router.get("/:uname&:pswd", userController.userCredentials);

module.exports = router;
