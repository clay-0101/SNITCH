import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const generateRefreshToken = (id , role) => {
  return  jwt.sign({id , role}, config.refreshTokenSecret, {expiresIn : "7d"})
}

export const generateAccessToken = (id, role) => {
    return jwt.sign({id, role}, config.accessTokenSecret, {expiresIn : "15m"})
}

export const generateTokens = (id , role) => ({
    refreshToken : generateRefreshToken(id , role),
    accessToken : generateAccessToken(id , role)
})

export const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken, config.accessTokenSecret)
}

export const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, config.refreshTokenSecret)
}