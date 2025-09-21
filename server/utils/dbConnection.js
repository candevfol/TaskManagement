import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to db`);
  } catch (e) {
    console.error(e);
  }
};
export { connectDb };
