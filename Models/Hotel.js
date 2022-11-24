import mongoose from 'mongoose'

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    distance: {
        type: Number,
        required: true,
        trim: true
    },
    photos: {
        type: [String]
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        trim: true
    },
    rooms: {
        type: [String]
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    }

})

export default mongoose.model("Hotel", HotelSchema)