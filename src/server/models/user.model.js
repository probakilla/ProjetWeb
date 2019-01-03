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

module.exports = mongoose.model("User", UserSchema);
