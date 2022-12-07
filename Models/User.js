import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    country:{
        type: String,                
        trim: true
    },
    city:{
        type: String,                
        trim: true
    },
    phone:{
        type: String,                
        trim: true
    },
    img:{
        type: String,                
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

export default mongoose.model("User", UserSchema)