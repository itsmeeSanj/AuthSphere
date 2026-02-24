import express from "express";
import cors from "cors";
import "dotenv/config";
import cookiePraser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authroutes.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiePraser());
app.use(cors({ credentials: true })); //send cookies into res

// API ENDPOINTS
app.get("/", function (req, res) {
  res.send("API is workinng");
});
app.use("/api/auth", authRouter);

app.listen(port, function () {
  console.log(`Server started on PORT : ${port}`);
});
