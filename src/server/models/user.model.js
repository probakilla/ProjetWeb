const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    teams: { type: String, required: false },
    labs: { type: String, required: false }
  },
  { collection: "User" }
);
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
