import express from 'express'
import { loginUserValidator, registerUserValidator } from '../validator/auth.validator.js'
import { loginUserController, registerUserController } from '../controllers/auth.controllers.js'

const auth_Router = express.Router()

auth_Router.post("/register", registerUserValidator, registerUserController)

auth_Router.post("/login", loginUserValidator, loginUserController)


export default auth_Router