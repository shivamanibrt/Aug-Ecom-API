import CategorySchema from "./CategorySchema.js";

//get cataegory = (obj)=>{
export const getAllCatagories = () => {
    return CategorySchema.find();
}
export const getCategory = (_id) => {
    return CategorySchema.findById(_id);
}

//insert category
export const insertCategory = (obj) => {
    return CategorySchema(obj).save();
}
//update category
export const updateCategoryById = ({ _id, ...rest }) => {
    return CategorySchema.findByIdAndUpdate(_id, rest, { new: true });
}

//find parent category
export const hasChildCategorybyId = async (parentId) => {
    const cat = await CategorySchema.findOne({ parentId });
    return cat?._id ? true : false
}

//delete catageory
export const deleteCataegory = (filter) => {
    return CategorySchema.findOneAndDelete(filter)
}
