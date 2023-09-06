import AdminUserSchema from "./AdminUserSchema.js";

//Create
export const insertAdminUSer = (obj) => {
    return AdminUserSchema(obj).save();
}
//Read
export const getAdminUSer = () => {
    return AdminUserSchema.find();
}
//Read only one user this is to find admin
export const findOneAdminUSer = (filter) => {
    return AdminUserSchema.findOne(filter);
}
//Update
export const updateOneAdminUser = (filter, update) => {
    return AdminUserSchema.findOneAndUpdate(filter, update, { new: true });
}
//Delete
export const deleteAdminUser = (ids) => {
    return AdminUserSchema.deleteMany({ "_id": { $in: ids } })
}
