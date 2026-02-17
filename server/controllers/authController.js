// register, login, logout, verifyAccount, PasswordReset, forget password

import bcrypt from "bcryptjs"; //encrypt the password
import jwt from "jsonwebtoken"; //generate token for authentication
import userModel from "../models/userModel.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.json({
      success: false,
      message: "Missing Details",
    });

  try {
    // store in database
    const existingUser = await userModel.findOne({ email });

    if (existingUser)
      return res.json({
        success: false,
        message: "User already exisit",
      });

    //   encrypt Password
    const hashedPassword = await bcrypt.hash(password, 10); // encrypt password

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}
