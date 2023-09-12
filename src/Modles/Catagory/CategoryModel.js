import CategorySchema from "./CategorySchema.js";

//get cataegory = (obj)=>{
export const getCategory = () => {
    return CategorySchema.find();
}

//insert category
export const insertCategory = (obj) => {
    return CategorySchema(obj).save();
}