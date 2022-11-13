const users = require("../models/users");

const userList = async (req, res) => {
  let data = await users.find();
  res.json(data);
};

module.exports = userList;
