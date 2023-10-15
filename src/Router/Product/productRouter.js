import express from "express";
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'You reached to payment GET method'
        })

    } catch (error) {
        next(error)
    }
})
router.post('/', (req, res, next) => {
    try {
        const result = req.body
        res.json({
            status: 'success',
            message: 'You reached to payment Post method',
            result
        })
    } catch (error) {
        next(error)
    }
})

export default router