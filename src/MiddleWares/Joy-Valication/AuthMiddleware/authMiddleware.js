import { verifyAccessJWT } from "../../../Helper/jwtHelper.js";
import { getSession } from "../../../Modles/Modals/SessionModel.js";
import { findOneAdminUSer } from "../../../Modles/adminUser/AdminUserModal.js";

export const adminAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const decoded = await verifyAccessJWT(authorization);

            if (decoded === 'jwt expired') {
                return res.status(403).json({
                    status: 'error',
                    message: 'jwt expired'
                });
            }

            if (decoded?.email) {
                const existInDb = await getSession({
                    type: 'jwt',
                    token: authorization
                });

                if (existInDb?._id) {
                    const adminInfo = await findOneAdminUSer({ email: decoded.email });
                    if (adminInfo?._id) {
                        req.adminInfo = adminInfo;
                        return next();
                    }
                }
            }
        }
        res.status(400).json({
            status: 'error',
            message: 'Invalid or missing JWT'
        });

    } catch (error) {
        error.status = 500;
        error.message = 'Internal Server Error';
        next(error);
    }
};
