const User = require("../models/user.model");

exports.test = (req, res) => {
    res.send("User test controller");
};

exports.userRegister = (req, res) => {
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
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