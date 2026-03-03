/*
     authcontroller.js>line 195
    this file is to get the id for otp req from the token which is stored in cookie
*/
import jwt from "jsonwebtoken";

export async function userAuth(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    res.json({
      success: false,
      Message: "Not authorized login again",
    });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      return res.json({
        success: false,
        Message: "Not authorized login again",
      });
    }

    next();
  } catch (error) {
    req.json({
      success: false,
      message: error.message,
    });
  }
}
