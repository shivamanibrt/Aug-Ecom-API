import Joi from "joi";
import { ADDRESS, DATE, EMAIL, EMAILVALIDATIONCODE, FNAME, LNAME, LONGSTR, NUMBER, PASSWORD, PHONE, SHORTSTR, STATUS, validator } from "./constant.js";


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

export const updateAdminUservalidation = (req, res, next) => {
    //define rules 
    const schema = Joi.object({
        _id: SHORTSTR.required(),
        fName: FNAME.required(),
        lName: LNAME.required(),
        phone: PHONE,
        address: ADDRESS,
        dob: DATE.allow('', null),
    })
    //give rules to the data
    validator(schema, req, res, next);
}
export const updateAdinPasswordaValidation = (req, res, next) => {
    //define rules 
    const schema = Joi.object({
        _id: SHORTSTR.required(),
        currentPassword: SHORTSTR.required(),
        newPassword: SHORTSTR.required()
    })
    //give rules to the data
    validator(schema, req, res, next);
}
export const resetAdminPasswordaValidation = (req, res, next) => {
    //define rules 
    const schema = Joi.object({
        email: EMAIL.required(),
        password: SHORTSTR.required(),
        otp: NUMBER.required()
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

export const newPaymentMethodValidation = (req, res, next) => {
    const schema = Joi.object({
        status: STATUS,
        name: SHORTSTR.required(),
        description: LONGSTR.required(),
    })
    validator(schema, req, res, next);
}

export const updatePaymentMethodValidation = (req, res, next) => {
    const schema = Joi.object({
        _id: SHORTSTR.required(),
        status: STATUS.required(),
        name: SHORTSTR.required(),
        description: LONGSTR.required(),
    })
    validator(schema, req, res, next);
}

export const productValidation = (req, res, next) => {
    const { salesPrice, salesStartDate, salesEndDate } = req.body;

    req.body.salesPrice = salesPrice ? salesPrice : 0;
    req.body.salesStartDate = !salesStartDate || salesStartDate === 'null' ? null : salesStartDate;
    req.body.salesEndDate = !salesEndDate || salesEndDate === 'null' ? null : salesEndDate;

    const schema = Joi.object({
        status: STATUS.required(),
        name: SHORTSTR.required(),
        sku: SHORTSTR.required(),
        description: LONGSTR.required(),
        qty: NUMBER.required(),
        price: NUMBER.required(),
        salesPrice: NUMBER.required(),
        salesStartDate: DATE.allow(null),
        salesEndDate: DATE.allow(null),
        catId: SHORTSTR.required(),
    })
    validator(schema, req, res, next);
}

export const updateProductValidation = (req, res, next) => {
    const { salesPrice, salesStartDate, salesEndDate } = req.body;

    req.body.salesPrice = salesPrice ? salesPrice : 0;
    req.body.salesStartDate = !salesStartDate || salesStartDate === 'null' ? null : salesStartDate;
    req.body.salesEndDate = !salesEndDate || salesEndDate === 'null' ? null : salesEndDate;

    const schema = Joi.object({
        _id: SHORTSTR.required(),
        status: STATUS.required(),
        name: SHORTSTR.required(),
        description: LONGSTR.required(),
        qty: NUMBER.required(),
        price: NUMBER.required(),
        salesPrice: NUMBER.required(),
        salesStartDate: DATE.allow(null),
        salesEndDate: DATE.allow(null),
        catId: SHORTSTR.required(),
        images: LONGSTR.required(),
        thumbnail: LONGSTR.required(),
        imgToDelete: LONGSTR.allow(""),
    })
    validator(schema, req, res, next);
}