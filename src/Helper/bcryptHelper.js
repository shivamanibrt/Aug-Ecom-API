import bcrypt from "bcryptjs";

const saltRound = 10;

export const hashPasswords = (planPassword) => {
    return bcrypt.hashSync(planPassword, saltRound)
}

export const comparePassword = (planPassword, hashPasswords) => {
    return bcrypt.compareSync(planPassword, hashPasswords)
}

