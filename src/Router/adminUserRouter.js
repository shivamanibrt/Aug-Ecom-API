import express from 'express';
import { insertAdminUSer } from '../Modles/adminUser/AdminUserModal.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await insertAdminUSer(req.body);

        user?._id ? res.json({
            status: 'success',
            message: 'we have sent you and email to verify your account please check your mailbox'
        }) :
            res.json({
                status: 'error',
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
