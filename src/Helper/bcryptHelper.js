import bcrypt from "bcryptjs";

const saltRound = 10;
export const hashPasswords = (planPassword) => {
    return bcrypt.hashSync(planPassword, saltRound)
}