import userModel from "../models/userModel";

export async function getUserData(req, res) {
  try {
    const { userID } = req.body;

    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerfied: user.isAccountVerfied,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
