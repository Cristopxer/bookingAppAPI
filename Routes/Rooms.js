import express from 'express'
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from '../Controllers/room.js'
import { verifyAdmin } from '../Utils/VerifyToken.js'

const router = express.Router()

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom)
// UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)
// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)
// GET
router.get("/:id", getRoom)
// GET ALL
router.get("/", getAllRoom)

export default router