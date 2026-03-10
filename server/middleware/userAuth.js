/*
     authcontroller.js>line 195
    this file is to get the id for otp req from the token which is stored in cookie
*/
import jwt from "jsonwebtoken";

export default async function userAuth(req, res, next) {
  const token = req.cookies?.token; //optional chaining

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    // req.userId = decoded.id;
    req.body.userId = decoded.id;
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid/Expired token" });
  }
}
