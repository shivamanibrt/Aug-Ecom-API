import express from "express";
import { createProduct, getAllProducts } from "../../Modles/Product/productModal.js";
import { productValidation } from "../../MiddleWares/Joy-Valication/joiValidation.js";
const router = express.Router();
import slugify from 'slugify';


router.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.json({
            status: 'success',
            message: 'Product GET method',
            products
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', productValidation, async (req, res, next) => {
    try {
        req.body.slug = slugify(req.body.name, { lower: true, trim: true })
        const result = await createProduct(req.body);
        result?._id ?
            res.json({
                status: 'success',
                message: 'Product POST method',
                result
            }) :
            res.json({
                status: 'error',
                message: 'Unable to add the product',
                result
            });
    } catch (error) {
        if (error.message.includes("E11000")) {
            error.status = 200;
            error.message = 'Products already Exist'
        }
        next(error)
    }
})

export default router;