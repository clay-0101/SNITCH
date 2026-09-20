import mongoose from 'mongoose'
import { config } from './config.js'


export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri)
        console.log("Database is Connected")
    } catch (error) {
        console.log('Error occurs while connect to Database : ', error)
    }
}