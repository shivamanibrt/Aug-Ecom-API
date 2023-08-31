import adminUserSchema from "./AdminUserSchema.js";

export const insertAdminUSer = (obj) => {
    return adminUserSchema(obj).save();
}