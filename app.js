const express = require("express");
const app = express();
const port = 8080;
const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
