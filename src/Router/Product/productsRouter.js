import express from "express";
import { createProduct, getAllProducts } from "../../Modles/Product/productModal.js";
import { productValidation } from "../../MiddleWares/Joy-Valication/joiValidation.js";
const router = express.Router();
import slugify from 'slugify';
import multer from 'multer';

//set up multer for validation and upload destination
const filesUploadDestination = '/imageFolder'

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        let error = null;
        console.log(req.files)
        console.log(files)
        cb(error, filesUploadDestination);
    },
    filename: (req, file, cb) => {
        const fullFileName = Date.now() + '-' + file.originalname;
        cb(null, fullFileName);
    }
});

const upload = multer({ storage });


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

router.post('/', upload.array('images', 5), productValidation, async (req, res, next) => {
    console.log('Request Files:', req.files);
    try {
        req.body.slug = slugify(req.body.name, { lower: true, trim: true })
        const result = await createProduct(req.body);
        result?._id ?
            res.json({
                status: 'success',
                message: 'Product added succesfully',
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