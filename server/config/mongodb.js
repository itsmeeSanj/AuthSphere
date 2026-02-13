import mongoose from "mongoose";

const connectDB = async function () {
  mongoose.connection.on("connected", function () {
    console.log("database connected");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/AuthSphere`);
};

export default connectDB;
