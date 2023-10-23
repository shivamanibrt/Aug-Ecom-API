import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    "name": "Mackbook",
    "sku": "mac_14",
    "description": "Mac intel chip",
    "Qty": 100,
    "price": 2000,
    "salesPrice": 0,
    "salesStartDate": null,
    "salesEndDate": null

    status: {
        type: String,
        default: 'inactive'
    },
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    sku: {
        type: String,
        unique: true,
        index: 1,
        required: true,
        maxLength: 20
    },
    slug: {
        type: String,
        unique: true,
        index: 1,
        required: true,
        maxLength: 20
    },
    description: {
        type: String,
        required: true,
        maxLength: 5000
    },

}) 