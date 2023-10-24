import express from "express";
import { getAllProducts } from "../../Modles/Product/productModal.js";
const router = express.Router();

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

router.post('/', (req, res, next) => {
    try {
        const result = req.body
        res.json({
            status: 'success',
            message: 'You reached to payment Post method',
            result
        })
    } catch (error) {
        next(error)
    }
})

export default router;