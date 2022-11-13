const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is listening at http://localhost:${process.env.PORT}`);
});
