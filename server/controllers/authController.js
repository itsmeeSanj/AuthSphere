// register, login, logout, verifyAccount, PasswordReset, forget password

import bcrypt from "bcryptjs"; //encrypt the password
import jwt from "jsonwebtoken"; //generate token for authentication
import userModel from "../models/userModel.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    // store in database
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exisit",
      });
    }

    //   encrypt Password
    const hashedPassword = await bcrypt.hash(password, 10); // encrypt password

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // generate token
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // user create 1 id for token, env variable, expiry time, add cookie in response

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.evn.NODE_ENV === "production", // localenv: http / live : https
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // to run both client and server with same domain
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// login
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    // const isMatch;
  } catch (error) {}
}
