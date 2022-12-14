import Room from '../Models/Room.js'
import Hotel from '../Models/Hotel.js'

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom.id } })
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}


export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
}
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne({ "roomNumber._id": req.params.id }, {
            $push: {
                "roomNumber.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json("Rooms status has been updated")
    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id)
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        res.status(200).json("Room has been deleted")
    } catch (err) {
        next(err)
    }
}
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}
export const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
}
