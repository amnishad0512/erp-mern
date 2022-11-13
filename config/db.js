const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/erp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected DB"))
  .catch((err) => console.log(err));

module.exports = mongoose;
