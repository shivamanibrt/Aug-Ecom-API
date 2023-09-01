import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'inactive'
    },
    fName: {
        type: String,
        required: [true, 'First name is required'],
        maxLength: [20, 'First name cannot be longer than 20 characters']
    },
    lName: {
        type: String,
        required: [true, 'Last name is required'],
        maxLength: [20, 'Last name cannot be longer than 20 characters']
    },
    email: {
        type: String,
        unique: true,
        index: 1,
        required: [true, 'Email is required'],
        maxLength: [50, 'Email cannot be longer than 50 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },

    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        maxLength: [15, 'Phone number cannot be longer than 15 characters']
    },
    address: {
        type: String,
        default: 'n/a'
    },
    dob: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
});

export default mongoose.model("Admin_user", adminUserSchema);
