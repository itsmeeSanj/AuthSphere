// register, login, logout, verifyAccount, PasswordReset, forget password

import bcrypt from "bcryptjs"; //encrypt the password
import jwt from "jsonwebtoken"; //generate token for authentication

import userModel from "../models/userModel.js";
import transporter from "../utils/nodemailer.js";

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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // user create 1 id for token, env variable, expiry time, add cookie in response

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // localenv: http / live : https
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // to run both client and server with same domain
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send an email using async/await
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to authSphere",
      text: `Welcome to the AUthSPhere. your account has been created by email ID :${email}`, // Plain-text version of the message
      html: `<h2>Welcome to AuthSphere</h2>
            <br/>
            <p>Hello ${name},</p>
            <p>Thank you for registering with AuthSphere.</p>
            <p>If you did not create this account, please ignore this email.</p>
            <p>Best regards,<br/>AuthSphere Team</p>`, // HTML version of the message
    });

    return res.json({
      success: true,
      message: "user registered sucessfully",
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

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User logged In",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

// logout
export async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "Log out",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
  y;
}

// sendverifyotp
export async function sendVerifyOTP(req, res) {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account already varified",
      });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = OTP;
    user.verifyOtpExpireAT = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    // send email
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verfication OTP",
      text: `Your OTP is ${OTP}. verify your account using this OTP`, // Plain-text version of the message
    };

    await transporter.sendMail(mailOption);

    res.json({
      success: true,
      message: "Verification OTP sent on email",
    });
  } catch (error) {
    res.json({
      success: true,
      message: re,
    });
  }
}

// Email verification
export async function verifyEmail(req, res) {
  const { userId, OTP } = req.body;

  if (!userId || !OTP) {
    return res.json({
      success: false,
      message: `Missing Details`,
    });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: `User not found`,
      });
    }

    if ((user.verifyOtp === "") | (user.verifyOtp !== otp)) {
      return res.json({
        success: false,
        message: `Invalid OTP`,
      });
    }

    if (user.verifyOtpExpireAT < Date.now()) {
      return res.json({
        success: false,
        message: `OTP Expired`,
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAT = 0;

    await user.save();
    return user.json({
      success: true,
      message: "Email verified Sucessfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}
