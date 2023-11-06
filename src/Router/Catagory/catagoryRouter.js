import express from 'express'
import { deleteCataegory, getAllCatagories, getCategory, hasChildCategorybyId, insertCategory, updateCategoryById } from '../../Modles/Catagory/CategoryModel.js';
import { newCategoryValidation, updateCategoryValidation } from '../../MiddleWares/Joy-Valication/joiValidation.js';
const router = express.Router();
import slufigy from 'slugify'


router.get('/:_id?', async (req, res, next) => {
    try {
        const { _id } = req.params;
        const catagories = _id ? await getCategory(_id) : await getAllCatagories();
        res.json({
            status: 'success',
            message: 'catagory list',
            catagories
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', newCategoryValidation, async (req, res, next) => {
    try {
        req.body.slug = slufigy(req.body.name, {
            lower: true,
            trim: true
        })
        const result = await insertCategory(req.body);
        result?._id ? res.json({
            status: 'success',
            message: 'catagory list added',
            result
        }) : res.json({
            status: 'error',
            message: 'unable to add the catageroy'
        })

    } catch (error) {
        if (error.message.includes("E11000")) {
            error.status = 200;
            error.message = 'Category already Exist'
        }
        next(error)
    }
})
//update catagory
router.put('/', updateCategoryValidation, async (req, res, next) => {
    try {
        const catUpdate = await updateCategoryById(req.body);
        catUpdate?._id ?
            res.json({
                status: 'success',
                message: 'Updated'
            }) : res.json({
                status: 'error',
                message: 'Unsucessfull'
            })
    } catch (error) {
        next(error)
    }
})

router.delete('/', async (req, res, next) => {
    try {
        const hasChildCats = await hasChildCategorybyId(req.body._id)
        if (hasChildCats) {
            return res.json({
                status: 'error',
                message: 'It cant be deleted becasue it has assigned child categories to it'
            })
        }
        const { _id } = req.body;
        const result = await deleteCataegory({ _id });
        res.json({
            status: 'success',
            message: 'Categaory Deleted',
            result
        })
    } catch (error) {
        next(error)
    }
})

export default router;