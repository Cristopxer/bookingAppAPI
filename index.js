import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoute from './Routes/Auth.js'
import hotelsRoute from './Routes/Hotels.js'
import roomsRoute from './Routes/Rooms.js'
import usersRoute from './Routes/Users.js'

const app = express();
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        console.log('Connected to MongoDB')
    } catch (e) {
        throw (e)
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

// middleware
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/hotels", hotelsRoute)
app.use("/api/v1/rooms", roomsRoute)
app.use("/api/v1/users", usersRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(8800, () => {
    connect()
    console.log("Connected to server.");
})