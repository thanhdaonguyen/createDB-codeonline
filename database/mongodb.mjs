import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const createMongoConnection = async (url) => {
  return await mongoose.connect(url, {
  }).then(() => {
      console.log("connected to database!")
  }).catch((err) => {
      console.log(err)
  })
}

export default createMongoConnection 