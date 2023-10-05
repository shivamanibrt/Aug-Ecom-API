import Joi from "joi";
import { ADDRESS, DATE, EMAIL, EMAILVALIDATIONCODE, FNAME, LNAME, PASSWORD, PHONE, SHORTSTR, STATUS, validator } from "./constant.js";

export const newAdminUservalidation = (req, res, next) => {
    //define rules 
    const schema = Joi.object({
        fName: FNAME,
        lName: LNAME,
        email: EMAIL,
        password: PASSWORD,
        phone: PHONE,
        address: ADDRESS,
        dob: DATE,
    })
    //give rules to the data
    validator(schema, req, res, next);
}

export const emailVerificationValidation = (req, res, next) => {
    const schema = Joi.object({
        email: EMAIL,
        emailValidationCode: EMAILVALIDATIONCODE,
    });
    validator(schema, req, res, next);

}

export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: EMAIL,
        password: PASSWORD,
    });
    validator(schema, req, res, next);
}
export const newCategoryValidation = (req, res, next) => {
    req.body.parentId = req.body.parentId ? req.body.parentId : null;
    const schema = Joi.object({
        status: STATUS,
        name: SHORTSTR.required(),
        parentId: SHORTSTR.allow(null, ""),
    });
    validator(schema, req, res, next);
}

export const updateCategoryValidation = (req, res, next) => {
    req.body.parentId = req.body.parentId ? req.body.parentId : null;
    const schema = Joi.object({
        status: STATUS,
        name: SHORTSTR.required(),
        parentId: SHORTSTR.allow(null, ""),
        _id: SHORTSTR.required(),
    });
    validator(schema, req, res, next);
};