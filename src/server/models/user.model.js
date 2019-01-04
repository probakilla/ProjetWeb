const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    teams: { type: String, required: false },
    labs: { type: String, required: false }
  },
  { collection: "User" }
);

let User = mongoose.model("User", UserSchema);

UserSchema.pre("save", next => {
  let self = this;
  User.find({ username: self.username }, (err, docs) => {
    if (!docs.length) {
      next();
    } else {
      alert("User exists!")
      next(new Error("User exists!"));
    }
  });
});

module.exports = User;
