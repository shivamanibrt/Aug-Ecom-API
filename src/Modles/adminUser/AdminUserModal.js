import adminUserSchema from "./AdminUserSchema.js";

export const getAdminUSer = () => {
    return adminUserSchema.find();
}

export const insertAdminUSer = (obj) => {
    return adminUserSchema(obj).save();
}

export const deleteAdminUser = (ids) => {
    return adminUserSchema.deleteMany({ "_id": { $in: ids } })
}
