import express from 'express';
import { deleteAdminUser, findOneAdminUSer, getAdminUSer, insertAdminUSer, updateOneAdminUser } from '../../Modles/adminUser/AdminUserModal.js';
import { comparePassword, hashPasswords } from '../../Helper/bcryptHelper.js';
import { emailVerificationValidation, loginValidation, newAdminUservalidation } from '../../MiddleWares/Joy-Valication/joiValidation.js';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import { userVerifiedNotification, verificationEmail } from '../../Helper/emailHelper.js';
import { createJWTs } from '../../Helper/jwtHelper.js';


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
                message: 'We have sent you and email to verify your account please check your mailbox',
                user
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
        // const url = http://localhost:3000/admin/verify-email?c=1e64fddf-788c-4c2e-830b-b74d5c21b32c&e=shivamani@email.com
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

router.post('/login', loginValidation, async (req, res, next) => {
    try {
        const { password, email } = req.body;

        //find if user exist based in given email 
        const user = await findOneAdminUSer({ email });

        if (!user) {
            return res.json({
                status: 'error',
                message: 'Account not found',
            })
        }

        if (user?._id) {
            if (user?.status !== 'active') {
                return res.json({
                    status: 'error',
                    message: 'Verify user using email',
                })
            }
            const isMatched = comparePassword(password, user.password);

            if (isMatched) {
                user.password = undefined;
                const jwts = await createJWTs({ email })
                return res.json({
                    status: 'success',
                    message: 'Logged in successfully',
                    user,
                    ...jwts
                })
            }
            return res.json({
                status: 'error',
                message: 'Invalid email or password',
            })
        }
    } catch (error) {
        next(error);
    }
});

router.patch('/verify-email', emailVerificationValidation, async (req, res, next) => {
    try {
        const { email, emailValidationCode } = req.body;
        const user = await updateOneAdminUser(
            {
                email,
                emailValidationCode
            },
            {
                status: "active",
                emailValidationCode: "",
            }
        );

        user?._id ?
            res.json({
                status: 'success',
                message: 'Your accound has been verified you may login',
            }) && userVerifiedNotification(user) :
            res.json({
                status: 'error',
                message: 'Account verified.',
            });
    } catch (error) {
        next(error);
    }
});


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
