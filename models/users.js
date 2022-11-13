const mongoose = require("mongoose");
const db = require("../config/db");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    id: ObjectId,
    name: String,
    phone: String,
    email: String,
    password: Date,
  },
  { timestamps: true }
);

let users = db.model("users", userSchema);
module.exports = users;
