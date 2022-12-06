import Hotel from "../Models/Hotel.js";
import Room from "../Models/Room.js";

export const createHotel = async (req, res, next) => {
    const hotelBody = req.body
    hotelBody.city = hotelBody.city.toLowerCase()
    const newHotel = new Hotel(hotelBody)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (err) {
        next(err)
    }
}
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}
export const getAllHotel = async (req, res, next) => {
    const { min, max, city, ...others } = req.query
    var hotels;
    try {

        if (city) {
            hotels = await Hotel.find({ ...others, city: { '$regex': city.toLowerCase() }, cheapestPrice: { $gte: min || 1, $lte: max || 999999 } }).limit(req.query.limit)
        } else {
            hotels = await Hotel.find({ ...others, cheapestPrice: { $gte: min || 1, $lte: max || 999999 } }).limit(req.query.limit)
        }
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const hostalCount = await Hotel.countDocuments({ type: "hostals" })
        res.status(200).json([
            { "type": "hotels", "count": hotelCount },
            { "type": "apartments", "count": apartmentCount },
            { "type": "resorts", "count": resortCount },
            { "type": "villas", "count": villaCount },
            { "type": "hostals", "count": hostalCount }
        ])
    } catch (err) {
        next(err)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}