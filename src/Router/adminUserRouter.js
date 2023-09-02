import express from 'express';
import { deleteAdminUser, getAdminUSer, insertAdminUSer } from '../Modles/adminUser/AdminUserModal.js';
import { hashPasswords } from '../Helper/bcryptHelper.js';
import { newAdminUservalidation } from '../MiddleWares/Joy-Valication/adminUserValidation.js';
const router = express.Router();


//server side validation
//encrypt user password
//insert into the database
//create unique verification code
//create a link pointing to our front end wih the email and verification cdoe and send to their email

router.get('/:_id?', async (req, res, next) => {
    const { _id } = req.params;
    const result = await getAdminUSer(_id)
    try {
        res.json({
            status: 'success',
            message: 'return from get method',
            result
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', newAdminUservalidation, async (req, res, next) => {
    try {
        const { password } = req.body;
        req.body.password = hashPasswords(password);
        const user = await insertAdminUSer(req.body);
        user?._id
            ? res.json({
                status: 'success',
                message: 'we have sent you and email to verify your account please check your mailbox'
            }) :
            res.json({
                status: 'error',
                message: 'todo create new user'
            })
    } catch (error) {
        if (error.message.includes("E1100")) {
            error.status = 200;
            error.message = 'Email already Exist'
        }
        next(error)
    }
})


router.delete('/', async (req, res, next) => {
    const { ids } = req.body;
    const result = await deleteAdminUser(ids)
    try {
        res.json({
            status: 'success',
            message: 'User Deleted',
            result
        })
    } catch (error) {
        next(error)
    }
})

export default router;
