import registeredUserModel from "../models/register.model.js"
import bcrypt from 'bcrypt'
import { generateTokens } from "../utils/app.utils.js"

export const registerUserController = async (req, res) => {

    try {
        let { name, email, password, role } = req.body

        let isUserAlreadyRegistered = await registeredUserModel.findOne({ email })

        if (isUserAlreadyRegistered) {
            return res.status(400).json({
                message: "Invalid Credentials",
            })
        }

        let user = await registeredUserModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role
        })

        let { refreshToken, accessToken } = generateTokens(user._id, user.role)

        await registeredUserModel.findOneAndUpdate({ _id: user._id }, { refreshToken })

        res.cookie("refreshToken", refreshToken,
            {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

        res.status(201).json({
            message: "User registered successfully.",
            data: {
                user: {
                    name: user.name,
                    email: user.email
                },
                accessToken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }

}

export const loginUserController = async (req, res) => {

    let { email, password } = req.body

    let isUserExists = await registeredUserModel.findOne({ email })

    if (!isUserExists) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    let isPasswordMatched = await bcrypt.compare(password, isUserExists.password)

    if (!isPasswordMatched) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    let { refreshToken, accessToken } = generateTokens(isUserExists._id, isUserExists.role)

    await registeredUserModel.findByIdAndUpdate(isUserExists._id, { refreshToken })

    res.cookie("refreshToken", refreshToken,
        {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

    res.status(200).json({
        message : "User Loged in successfully",
        data :{
            name : isUserExists.name,
            email : isUserExists.email,
            role : isUserExists.role
        },
        accessToken
    })
}