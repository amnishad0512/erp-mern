const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: false }));

const jwtAuth = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.send({ message: "Invalid token" });
    } else {
      next();
    }
  });
};

router.get("/", (req, res) => {
  res.send("Home Page");
});

router.get("/list",jwtAuth, userController.userList);
router.post("/add", userController.userAdd);
router.get("/login", userController.userLogin);

module.exports = router;
