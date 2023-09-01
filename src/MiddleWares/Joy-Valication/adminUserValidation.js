import Joi from "joi";

export const newAdminUservalidation = (req, res, next) => {
    try {
        //define rules 
        const schema = Joi.object({
            fName: Joi.string().max(20).required(),
            lName: Joi.string().max(20).required(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().max(20).required(),
            phone: Joi.string().max(20).required(),
            address: Joi.string().max(20),
            dob: Joi.date().allow("", null)
        })
        //give data to the rules
        const { error } = schema.validate(req.body)
        if (error) {
            error.status = 200;
            return next(error)
        }
        next(error)
    } catch (error) {
        next(error)
    }
}