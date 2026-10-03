import express from 'express'
import auth_Router from '../router/auth.router.js'
import product_Router from "../router/product.router.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())

app.use(cookieParser())


// Auth Routes Only
app.use("/api/auth", auth_Router)

app.use("/api/product", product_Router)

export default app