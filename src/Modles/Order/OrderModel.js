import OrderSchema from "./OrderSchema.js";

export const getAllOrders = () => {
    return OrderSchema.find()
}

export const getOrdersById = (_id) => {
    return OrderSchema.findById(_id)
}

export const insertOrders = (obj) => {
    return OrderSchema(obj).save()
}

export const updateOrdersById = ({ _id, ...rest }) => {
    return OrderSchema.findByIdAndUpdate(_id, rest, { new: true })
}

export const deleteOrders = (filter) => {
    return OrderSchema.findOneAndDelete(filter)
}

export const deleteOdersById = (ids) => {
    return OrderSchema.deleteMany({ "_id": { $in: ids } })
}