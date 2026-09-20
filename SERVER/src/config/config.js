import 'dotenv/config'

export const config = {
    port : process.env.PORT,
    mongoUri : process.env.MONGO_URI,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET,
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET
}