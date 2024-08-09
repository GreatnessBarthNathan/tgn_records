import "express-async-errors"
import * as dotenv from "dotenv"
import express from "express"
dotenv.config()
import mongoose from "mongoose"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"

// middlewares
// import notFound from "./middleware/notFound.js"
import errorHandler from "./middleware/errorHandler.js"
import { authenticateUser } from "./middleware/authMiddleware.js"

// routers
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import countRouter from "./routes/countRoutes.js"
import reportRouter from "./routes/reportRoutes.js"
import rcFinanceRouter from "./routes/rcFinanceRoutes.js"
import tenRouter from "./routes/tenRoutes.js"
import memberRouter from "./routes/memberRoutes.js"
import csRouter from "./routes/csRoutes.js"
import prayerGroupRouter from "./routes/prayerGroupRoutes.js"

const app = express()

import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.static(path.resolve(__dirname, "./public")))
// app.use(express.static(path.resolve(__dirname, "./client/dist")))

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(mongoSanitize())

app.use("/api/v1/group-record", authenticateUser, prayerGroupRouter)
app.use("/api/v1/concept_strategy", authenticateUser, csRouter)
app.use("/api/v1/member", authenticateUser, memberRouter)
app.use("/api/v1/ten", authenticateUser, tenRouter)
app.use("/api/v1/rc-finance", authenticateUser, rcFinanceRouter)
app.use("/api/v1/report", authenticateUser, reportRouter)
app.use("/api/v1/count", authenticateUser, countRouter)
app.use("/api/v1/user", authenticateUser, userRouter)
app.use("/api/v1/auth", authRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"))
})
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"))
// })

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" })
})

app.use(errorHandler)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log("connected to DB")
    console.log(`Server is listening on port ${port}`)
  })
} catch (error) {
  console.log(error)
}
