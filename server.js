import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import  mongoose  from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
