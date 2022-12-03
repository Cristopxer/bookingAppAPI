import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../Controllers/hotel.js'
import { verifyAdmin } from '../Utils/VerifyToken.js'

const router = express.Router()

// CREATE
router.post("/", verifyAdmin, createHotel)
// UPDATE
router.put("/:id", verifyAdmin, updateHotel)
// DELETE
router.delete("/:id", verifyAdmin, deleteHotel)
// GET
router.get("/find/:id", getHotel)
// GET ALL
router.get("/", getAllHotel)
// COUNT HOTELS BY city
router.get("/countByCity", countByCity)
// COUNT HOTELS BY type
router.get("/countByType", countByType)



export default router