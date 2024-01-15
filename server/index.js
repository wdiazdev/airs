import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js"
import authRouter from "./routes/authRoute.js"
import listingRouter from "./routes/listingRoute.js"
import cookieParser from "cookie-parser"

dotenv.config()

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

app.use(express.json())

app.use(cookieParser())

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

app.use("/api/user", userRouter)

app.use("/api/auth", authRouter)

app.use("/api/listing", listingRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error test"
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
