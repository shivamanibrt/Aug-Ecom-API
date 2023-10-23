import ProductModalSchema from "./ProductModalSchema";


export const createProduct = (obj) => {
    return ProductModalSchema(obj).save()
}

export const getAllProducts = () => {
    return ProductModalSchema.find()
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