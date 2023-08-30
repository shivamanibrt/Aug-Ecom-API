import AdminUserSchema from "./AdminUserSchema.js";

export const insertAdminUSer = (obj) => {
    return AdminUserSchema(obj).save();
}