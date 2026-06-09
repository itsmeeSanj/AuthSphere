import express from "express";

import userAuth from "../middleware/userAuth.js";
import {
  getUserData,
  getAllUsers,
  deleteAccount,
  //   getUserStats,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

userRouter.get("/all", userAuth, getAllUsers);
userRouter.delete("/delete/:userId", userAuth, deleteAccount); // admin deletes user
userRouter.delete("/delete", userAuth, deleteAccount);

// userRouter.get("/stats", userAuth, getUserStats);
userRouter.get("/profile", userAuth, getProfile);
userRouter.put("/profile", userAuth, updateProfile);
userRouter.put("/change-password", userAuth, changePassword);

export default userRouter;
