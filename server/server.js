import express from "express";
import cors from "cors";
import "dotenv/config";
import cookiePraser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authroutes.js";
import userRouter from "./routes/userRouters.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
); //send cookies in
// to res
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiePraser());

// API ENDPOINTS
app.get("/", function (req, res) {
  res.send("API is workinng");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, function () {
  console.log(`Server started on PORT : ${port}`);
});
