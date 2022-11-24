import express from 'express'
import {verifyToken} from '../Utils/VerifyToken.js'
import { deleteUser, getAllUser, getUser, updateUser } from '../Controllers/user.js'

const router = express.Router()

router.get('/checkauthentication', verifyToken, (req, res, next) => {
    res.send("User youre logged in successfully")
})

// UPDATE
router.put("/:id", updateUser)
// DELETE
router.delete("/:id", deleteUser)
// GET
router.get("/:id", getUser)
// GET ALL
router.get("/", getAllUser)


export default router