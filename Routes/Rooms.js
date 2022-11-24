import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'Hello M**therF*cker from Rooms file'})
})

export default router