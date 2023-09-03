import express from 'express';
import { deleteAdminUser, getAdminUSer, insertAdminUSer } from '../Modles/adminUser/AdminUserModal.js';
import { hashPasswords } from '../Helper/bcryptHelper.js';
import { newAdminUservalidation } from '../MiddleWares/Joy-Valication/adminUserValidation.js';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import { verificationEmail } from '../Helper/emailHelper.js';


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
        req.body.emailValidationCode = uuidv4();
        const user = await insertAdminUSer(req.body);

        if (user?._id) {
            res.json({
                status: 'success',
                message: 'we have sent you and email to verify your account please check your mailbox'
            });
            const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`
            //send email
            verificationEmail({
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                url
            })
            return;
        }
        res.json({
            status: 'error',
            message: 'Unable to create new user'
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
