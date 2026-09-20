import express from 'express'
import { loginUserValidator, registerUserValidator } from '../validator/auth.validator.js'
import { getMe, loginUserController, refresh, registerUserController } from '../controllers/auth.controllers.js'
import { authenticate } from '../middlewares/auth.middlewares.js'

const auth_Router = express.Router()

auth_Router.post("/register", registerUserValidator, registerUserController)

auth_Router.post("/login", loginUserValidator, loginUserController)

auth_Router.get("/me", authenticate, getMe)

auth_Router.get("/refresh", refresh)



export default auth_Router