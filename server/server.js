import express from "express";
import cors from "cors";
import "dotenv/config";
import cookiePraser from "cookie-parser";

import connectDB from "./config/mongodb";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cookiePraser());
app.use(cors({ credentials: true })); //send cookies into res

app.get("/", function (req, res) {
  res.send("API is workinng");
});

app.listen(port, function () {
  console.log(`Server started on PORT : ${port}`);
});
