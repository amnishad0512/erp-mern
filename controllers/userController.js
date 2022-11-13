const Users = require("../models/users");
const bcrypt = require("bcrypt");

const userList = async (req, res) => {
  let data = await Users.find();
  res.json(data);
};
const userAdd = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const data = new Users({ name, email, phone, password });
  const response = await data.save();
  const myToken = await data.getAuthToken();
  res.status(200).json({ message: "ok", token: myToken });
};
const userLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(301).json({ message: "Please enter email and password" });
  }

  let user = await Users.findOne({ email: req.body.email });

  let responseType = {
    message: "ok",
  };
  if (user) {
    let match = true;
    if (match) {
      let myToken = await user.getAuthToken();
      responseType.message = "login successful";
      responseType.token = myToken;
    } else {
      responseType.message = "Invalid email and password";
    }
  } else {
    responseType.message = "Invalid email and password";
  }
  res.status(200).json({ message: "ok", data: responseType });
};

module.exports = { userList, userAdd, userLogin };
