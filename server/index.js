const express = require("express");
let dotenv = require("dotenv").config();
const connectDB = require("./db/db");
const cors = require("cors");

const PORT = process.env.PORT || 8080

connectDB();

const app = express();

//Middlewares
app.use(express.json());

app.get("/test", (req, res) => {
  console.log("listning");
  res.send("asdrf");
});

app.listen(PORT, () => {
  console.log("Listning on port :", PORT);
});
