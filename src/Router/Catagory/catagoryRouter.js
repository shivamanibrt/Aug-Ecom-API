import express from 'express'
import { getCategory, insertCategory } from '../../Modles/Catagory/CategoryModel.js';
import { newCategoryValidation } from '../../MiddleWares/Joy-Valication/joiValidation.js';
const router = express.Router();

//get the available catagory
router.get('/:_id?', async (req, res, next) => {
    try {
        const { _id } = req.params;
        const result = await getCategory(_id);

        res.json({
            status: 'success',
            message: 'catagory list',
            result
        })
    } catch (error) {
        next(error)
    }
})

//insert new catagory
router.post('/', newCategoryValidation, async (req, res, next) => {
    try {
        const result = await insertCategory(req.body);

        result?._id ? res.json({
            status: 'success',
            message: 'catagory list',
            result
        }) : res.json({
            status: 'error',
            message: 'unable to add the catageroy'
        })
    } catch (error) {
        next(error)
    }
})

export default router;