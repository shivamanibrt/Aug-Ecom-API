import jwt from 'jsonwebtoken'
import { deleteSession, insertSesion } from '../Modles/Modals/SessionModel.js';
import { updateOneAdminUser } from '../Modles/adminUser/AdminUserModal.js';
// import dotenv from 'dotenv';

// dotenv.config();
export const signAssessJWT = async (payload) => {
    const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m"
    });

    const obj = {
        token: accessJWT,
        type: 'jwt'
    };
    await insertSesion(obj);
    return accessJWT;
}

export const signRefreshJWT = async (payload) => {
    const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d"
    });

    await updateOneAdminUser(payload, { refreshJWT })
    return refreshJWT;
}

export const createJWTs = async (payload) => {
    return {
        accessJWT: await signAssessJWT(payload),
        refreshJWT: await signRefreshJWT(payload)
    }
}

export const verifyAccessJWT = token => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    } catch (error) {
        if (error?.message === 'jwt expired!') {
            //delete jwt from session table 
            deleteSession({
                type: 'jwt',
                token
            })
        }
        return error?.message
    }
}

export const verifyRefreshJWT = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}
