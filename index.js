const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const Taskroutes = require("./routes/Taskroutes");
const Userroutes = require("./routes/User");
// app.use(bodyParser);
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
console.log(PORT);
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
console.log("error");
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
app.use("/api/v1/tasks", Taskroutes);
app.use("/api/v1/auth", Userroutes);
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is up and running....",
  });
});
