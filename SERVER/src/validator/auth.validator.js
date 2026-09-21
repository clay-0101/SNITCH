import { body, validationResult } from 'express-validator'

export const registerUserValidator = [

    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a String").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("Minimum three letters are required for name"),


    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isLength({ min: 1 }).withMessage("Email cannot be empty").bail()
        .isEmail().withMessage("Enter a valid email address"),


    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be six character long"),


    body("role")
        .optional()
        .isIn(["user", "seller"]).withMessage("Role must be either user or seller"),


    (req, res, next) => {

        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Fill all the fileds carefully..",
                error : errors.array()
            })
        }

        next()
    }

]

export const loginUserValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isLength({ min: 1 }).withMessage("Email cannot be empty").bail()
        .isEmail().withMessage("Enter a valid email address"),


    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({min : 6}).withMessage("Password must be six character long"),
    
    
    (req, res, next) => {

        let errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "Fill all the fields carefully",
                errors
        })
        }

        next()
    }

]