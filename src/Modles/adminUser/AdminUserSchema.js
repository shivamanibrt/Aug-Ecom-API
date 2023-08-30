import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'inactive'
    },
    fName: {
        type: String,
        required: true,
        maxLength: [20, 'First name cant be longer than 20 character']
    },
    lName: {
        type: String,
        required: true,
        maxLength: [20, 'First name cant be longer than 20 character']
    },
    email: {
        type: String,
        unique: true,
        index: 1,
        required: true,
        maxLength: [20, 'First name cant be longer than 20 character']
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxLength: [15, 'Phone numer cant be longer than 15 character']
    },
    address: {
        type: String,
        required: true,
        default: 'n/a'
    },
    dob: {
        type: String,
        required: true,
        default: null
    },
}, {
    timestamps: true,
})

export default mongoose.model("Admin_user", AdminUserSchema);