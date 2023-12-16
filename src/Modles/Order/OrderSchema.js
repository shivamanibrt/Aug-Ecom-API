import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "inactive"
    },
    buyer: {
        buyerId: {
            type: String,
            required: true
        },
        fName: String,
        lName: String,
        email: String,
        phone: String
    },
    cart: [
        {
            productId: {
                type: String,
                required: true
            },
            productName: String,
            salesPrice: Number,
            qty: Number,
            thumbnail: String,
            subTotal: Number
        }
    ],
    shipping: {
        fName: String,
        lName: String,
        phone: String,
        street: String,
        postcode: String,
        state: String,
        country: String
    },
    cartTotal: Number,
    discount: Number,
    discountCode: String,
    totalAmount: Number,
    paymentInfo: {
        status: {
            type: String,
            enum: ['paid', 'pending'] // Corrected: Use enum for a predefined set of values
        },
        method: {
            type: String,
            enum: ['cash', 'credit card'] // Corrected: Use enum for a predefined set of values
        },
        paidAmount: Number,
        transactionId: String, // Corrected: 'transacitonId' to 'transactionId'
        paidDate: Date
    }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema)