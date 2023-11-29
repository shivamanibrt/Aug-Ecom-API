import ProductModalSchema from "./ProductModalSchema.js";

export const createProduct = (obj) => {
    return ProductModalSchema(obj).save()
}

export const getAllProducts = () => {
    return ProductModalSchema.find()
}

export const getProductsByID = (filter) => {
    return ProductModalSchema.findById(filter)
}
export const getSelectedProducts = (filter) => {
    return ProductModalSchema.find(filter)
}

export const updateProductById = ({ _id, ...rest }) => {
    return ProductModalSchema.findByIdAndUpdate(_id, rest);
}

export const deleteProductByID = (_id) => {
    return ProductModalSchema.findByIdAndDelete(_id)
}
export const deleteManyProductByID = (ids) => {
    return ProductModalSchema.deleteMany({ "_id": { $in: ids } })
}