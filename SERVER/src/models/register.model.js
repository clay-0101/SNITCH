import mongoose from "mongoose";

const registerUserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Minimum three letters are required for name"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Try with different email"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Minimum six letters are required for password"]
    },

    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "seller"],
            message: "{VALUE} is not a valid role"
        }
    },

    refreshToken: {
        type: String,
        default: null
    }

})

const registeredUserModel = mongoose.model("Registered-Users", registerUserSchema)
export default registeredUserModel