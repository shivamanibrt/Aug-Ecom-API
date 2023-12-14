import express from 'express';
import { deleteAdminUser, findOneAdminUSer, getAdminUSer, insertAdminUSer, updateOneAdminUser } from '../../Modles/adminUser/AdminUserModal.js';
import { comparePassword, hashPasswords } from '../../Helper/bcryptHelper.js';
import { emailVerificationValidation, loginValidation, newAdminUservalidation, resetAdminPasswordaValidation, updateAdinPasswordaValidation, updateAdminUservalidation } from '../../MiddleWares/Joy-Valication/joiValidation.js';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import { otpNotification, userVerifiedNotification, verificationEmail } from '../../Helper/emailHelper.js';
import { createJWTs, signAssessJWT, verifyRefreshJWT } from '../../Helper/jwtHelper.js';
import { adminAuth } from '../../MiddleWares/Joy-Valication/AuthMiddleware/authMiddleware.js';
import { createOTP } from '../../utils/randomGenerator.js';
import { deleteSession, insertSesion } from '../../Modles/Modals/SessionModel.js';

//server side validation
//encrypt user password
//insert into the database
//create unique verification code
//create a link pointing to our front end wih the email and verification cdoe and send to their email

router.get('/', adminAuth, async (req, res, next) => {
    try {
        const user = req.adminInfo;
        user.password = undefined;
        user.refreshJWT = undefined;
        res.json({
            status: 'success',
            message: 'return from get method',
            user
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

router.put('/', updateAdminUservalidation, async (req, res, next) => {
    try {
        const { _id, ...rest } = req.body
        const result = await updateOneAdminUser({ _id }, rest);

        result?._id ? res.json({
            status: 'success',
            message: 'User Profile has been updated succesfully',
            result
        }) : res.json({
            status: 'error',
            message: 'Sorry User Profile not able to updated succesfully',
            result
        })
    } catch (error) {
        console.log('Admin user Router : ', error)
        next(error)
    }
})

router.patch('/', adminAuth, updateAdinPasswordaValidation, async (req, res, next) => {
    try {
        const { currentPassword, _id, newPassword } = req.body;

        const userId = req.adminInfo._id.toString();

        if (_id !== userId) {
            return res.json({
                status: 'error',
                message: 'Invalid user request',
            })
        }
        // aA12345
        const passFormDb = req.adminInfo.password;
        //check if the password is valid
        const isMatched = comparePassword(currentPassword, passFormDb);
        if (isMatched) {
            //encrypt the new password
            const hashedPasswords = hashPasswords(newPassword);
            //update the password in hatch
            const result = await updateOneAdminUser({ _id }, { password: hashedPasswords })

            result?._id ?
                res.json({
                    status: 'success',
                    message: 'password updated'
                }) :
                res.json({
                    status: 'error',
                    message: 'unable to updated',
                })
        }
    } catch (error) {
        next(error)
    }
})
//public router

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

//generate new accessJWT and send back to the client
router.get('/accessjwt', async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            //verif the token
            const decoded = verifyRefreshJWT(authorization)
            if (decoded.email) {
                const user = await findOneAdminUSer({ email: decoded.email })
                //check if exist in db
                if (user?._id) {
                    //creat new accessjwt and return
                    return res.json({
                        statu: 'success',
                        accessJWT: await signAssessJWT({ email: decoded.email })
                    })
                }
            }
        }
        res.status(401).json({
            status: 'error',
            message: 'Unauthenticated'
        });
    } catch (error) {
        error.status = 401
        next(error);
    }
})

//request otp
router.post('/request-password-reset-otp', async (req, res, next) => {
    try {
        //check if user exist
        const { email } = req.body

        if (email.includes('@')) {
            const user = await findOneAdminUSer({ email })

            if (user?._id) {
                //create uniq code and store in the datas with the email
                const otp = createOTP();

                const obj = {
                    token: otp,
                    associate: email,
                    type: 'updatePassword'
                }

                const result = await insertSesion(obj)
                if (result?._id) {
                    // email the otp to the client
                    otpNotification({
                        otp: result.token,
                        fName: result.associate,
                        email
                    })

                }
            }
        }

        res.json({
            status: 'success',
            message: 'If the email exist in our system you will receive OTP and email instruction to reset the password'
        })
    } catch (error) {
        next(error)
    }
})

//password reset as logged out user
router.patch('/reset-password', resetAdminPasswordaValidation, async (req, res, next) => {
    try {
        //check if user exist
        const { email, otp, password } = req.body;

        const filter = {
            token: otp,
            associate: email,
            type: 'updatePassword',
        }

        //find if the filter exist in the session table and delete it.
        const result = await deleteSession(filter);

        // if delete is succed 
        if (result?._id) {
            //then encrypt the password and update in user table 
            const ecrypted = hashPasswords(password)

            const user = await updateOneAdminUser({ email }, { password: ecrypted })

            if (user?._id) {
                return res.json({
                    status: 'success',
                    message: 'Your password is reset succesfully'
                })
            }
        }

        res.json({
            status: 'error',
            message: 'Invalid request'
        })

    } catch (error) {
        console.error('Error in hashPasswords:', error);
        next(error)
    }
})

export default router; 
