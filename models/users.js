const mongoose = require("mongoose");
const db = require("../config/db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    password: {
      type: String,
      select: false,
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let salt = bcrypt.genSaltSync(10);
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.getAuthToken = async function (data) {
  let param = {
    id: this._id,
    email: this.email,
    phone: this.phone,
  };
  let tokenValue = jwt.sign(param, process.env.SECRET_KEY,{expiresIn: '300000s'});
  this.tokens = this.tokens.concat({ token: tokenValue });
  await this.save();
  return tokenValue;
};

let users = db.model("users", userSchema);

module.exports = users;
