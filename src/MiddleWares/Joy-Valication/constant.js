import Joi from "joi"

export const STATUS = Joi.string().max(20)
export const FNAME = Joi.string().max(20).required()
export const LNAME = Joi.string().max(20).required()
export const EMAIL = Joi.string().email({ minDomainSegments: 2 }).required()
export const PASSWORD = Joi.string().max(20).required()
export const PHONE = Joi.string().max(20).required()
export const ADDRESS = Joi.string().max(20)
export const DATE = Joi.date().allow("", null)

export const SHORTSTR = Joi.string().max(50)
export const LONGSTR = Joi.string().max(500)

export const EMAILVALIDATIONCODE = Joi.string().max(100).required()


export const validator = (schema, req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
        error.status = 200;
        return next(error)
    }
    next();
}