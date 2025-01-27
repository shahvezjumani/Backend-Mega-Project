import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`ERR: ${error}`);
      throw error;
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed !! : ", error);
  });

/**
import express from "express"
import dotenv from "dotenv";
dotenv.config()

const app = express()

 ( async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
        console.log("ERR: ", error);
        throw error
    })
    app.listen(process.env.PORT, () => {
        console.log(`app is listening on port ${process.env.PORT}`);
    })
  } catch (error) {
    console.error("Error", error); 
    throw error;
  }
} )();

console.log(process.env.MONGODB_URL);

 */
