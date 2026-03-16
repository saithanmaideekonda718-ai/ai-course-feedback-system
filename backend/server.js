import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import dbConnect from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import feedbackRoutes from "./routes/feedbackRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

dbConnect()

app.use("/api/auth",authRoutes)
app.use("/api/courses",courseRoutes)
app.use("/api/feedback",feedbackRoutes)

app.get("/",(req,res)=>{
    res.send("Server Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})