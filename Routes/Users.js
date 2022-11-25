import express from 'express'
import {verifyAdmin, verifyToken, verifyUser} from '../Utils/VerifyToken.js'
import { deleteUser, getAllUser, getUser, updateUser } from '../Controllers/user.js'

const router = express.Router()

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("User youre logged in successfully")
// })
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("Hello user, youre logged in successfully")
// })
// router.get('/checkadmin', verifyAdmin, (req, res, next) => {
//     res.send("Hello admin, youre logged in successfully")
// })

// UPDATE
router.put("/:id", verifyUser, updateUser)
// DELETE
router.delete("/:id", verifyUser, deleteUser)
// GET
router.get("/:id", verifyUser, getUser)
// GET ALL
router.get("/", verifyAdmin, getAllUser)


export default router