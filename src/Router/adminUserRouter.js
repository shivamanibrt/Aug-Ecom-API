import express from 'express';
const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        console.log(req.body);

        res.json({
            status: 'success',
            message: 'todo create new user'
        })
    } catch (error) {
        next(error)
    }
})
router.patch('/', (req, res, next) => {
    try {
        console.log(req.body);
        res.json({
            status: 'success',
            message: 'verify email create new user'
        })
    } catch (error) {
        next(error)
    }
})

export default router;
