import adminUserSchema from "./AdminUserSchema.js";

//Create
export const insertAdminUSer = (obj) => {
    return adminUserSchema(obj).save();
}
//Read
export const getAdminUSer = () => {
    return adminUserSchema.find();
}
//Delete
export const deleteAdminUser = (ids) => {
    return adminUserSchema.deleteMany({ "_id": { $in: ids } })
}
