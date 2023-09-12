import SessionSchema from './SessionSchema.js'

export const insertSesion = obj => {
    return SessionSchema(obj).save();
}