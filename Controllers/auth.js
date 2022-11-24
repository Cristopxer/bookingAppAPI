import User from "../Models/User.js";
import { createError } from "../Utils/Error.js"
import bcrypt from "bcryptjs"


export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(201).json("User has been registered")
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(createError(404, "User not found"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(404, "Wrong username or password"))
        }
        const { password, isAdmin, ...otherDetails } = user._doc
        res.status(201).json({ ...otherDetails })
    } catch (err) {
        next(err);
    }
}