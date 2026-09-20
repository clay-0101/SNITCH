import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import { verifyAccessToken } from '../utils/app.utils.js'

export const authenticate = (req, res, next) => {

    let accessToken = req.headers.authorization.split(" ")[1]

    if (!accessToken) {
        return res.status(400).json({
            message: "Access Token not found in the header request"
        })
    }

    try {
        
        let decode = verifyAccessToken(accessToken)
        req.user = decode
        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    }
}