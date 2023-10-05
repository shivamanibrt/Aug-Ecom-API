import SessionSchema from './SessionSchema.js'

export const insertSesion = obj => {
    return SessionSchema(obj).save();
}

export const getSession = filter => {
    return SessionSchema.findOne(filter);
}
export const deleteSession = filter => {
    return SessionSchema.findOneAndDelete(filter);
}
