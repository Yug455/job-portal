const mongoose = require("mongoose")
require("dotenv").config()

const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

const connectDB = require("./config/database")
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

const userRouter = require("./routes/userRoutes")
const companyRouter = require("./routes/companyRoutes")
const jobRouter = require("./routes/jobRoutes")
const applicationRouter = require("./routes/applicationRoutes")

app.use("/user", userRouter)
app.use("/company", companyRouter)
app.use("/jobs", jobRouter)
app.use("/application", applicationRouter)

const frontendPath = path.resolve(
    __dirname,
    "../frontend/my-project/dist"
)

app.use(express.static(frontendPath))

app.get("/*splat", (req, res) => {
    res.sendFile(
        path.resolve(
            frontendPath,
            "index.html"
        )
    )
})

app.listen(3000, () => {
    console.log("server started at 3000")
})