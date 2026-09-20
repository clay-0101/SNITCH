import express from 'express'
import auth_Router from '../router/auth.router.js'
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())

app.use(cookieParser())


// Auth Routes Only
app.use("/auth", auth_Router)

export default app