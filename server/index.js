const express = require("express");
let dotenv = require("dotenv").config();
const connectDB = require("./db/db");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
};
connectDB();
const app = express();

//Cors
app.use(cors(corsOptions));

//Middlewares

app.use(express.json());

app.get("/test", (req, res) => {
  console.log("listning");
  res.send("asdrf");
});

app.use("/api/books", bookRoutes);
app.use("/api/book", reviewRoutes);

app.listen(PORT, () => {
  console.log("Listning on port :", PORT);
});