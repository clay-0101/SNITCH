import { body, validationResult } from 'express-validator'

const productValidator = [

    body("title")
        .exists().withMessage("Title is required.").bail()
        .isString().withMessage("Title must be a string.").bail()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Value must be 2–100 characters long.").bail()
        .isAlpha("en-US", { ignore: " " }).withMessage("Input must contain letters only."),


    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string.").bail()
        .trim()
        .isLength({min : 20, max : 200}).withMessage("Value must be 20–200 characters long."),
    
    
    body("price.amount")
        .exists().withMessage("Price amount is required.").bail()
        .isFloat({min : 0}).withMessage("Only numbers ≥ 0 allowed."),
    
    body("price.currency")
        .exists().withMessage("Price currency is required").bail()
        .isString().withMessage("Price currency must be a string").bail()
        .isIn(["USD", "INR"]).withMessage("Currency either be INR or USD"),


    body("sizes")
        .exists().withMessage("Sizes are required").bail()
        .isArray().withMessage("Sizes must be an array of object"),
    
    body("sizes.*.size")
        .exists().withMessage("size must be present in every entry of sizes array.").bail()
        .isString().withMessage("size must be a string value").bail()
        .trim()
        .isIn(["XS","S","M","L","XL","XXL"]).withMessage("size can be one of these  XS , S , M , L , XL , XXL "),
    
    body("sizes.*.stock")
        .exists().withMessage("stock must be present in every entry of sizes array.").bail()
        .isInt({min : 0}).withMessage("stock must be a integer value").bail()

    


]