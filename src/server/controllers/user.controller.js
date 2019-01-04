const User = require("../models/user.model");
const SHA256 = require("crypto-js/sha256") 

exports.userRegister = (req, res) => {


    let password = SHA256(req.body.password);
    let user = new User(
        {
            username: req.body.username,
            password: password,
            labs: req.body.labs,
            teams: req.body.teams
        }
    );

    user.save(err => {
        if (err) {
            alert("Error!!");
        }
        res.send("Successfully registred!");
    })
}