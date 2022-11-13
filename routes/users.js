const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("Home Page");
});

router.get("/list", userController);

module.exports = router;
