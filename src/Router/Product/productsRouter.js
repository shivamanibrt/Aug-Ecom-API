import express from "express";
import { createProduct, getAllProducts, getProductsByID } from "../../Modles/Product/productModal.js";
import { productValidation } from "../../MiddleWares/Joy-Valication/joiValidation.js";
const router = express.Router();
import slugify from 'slugify';
import multer from 'multer';

//set up multer for validation and upload destination
const filesUploadDestination = 'public/img'

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        let error = null;
        //valudation test if needed....

        //error and callback
        cb(error, filesUploadDestination);
    },
    filename: (req, file, cb) => {
        const fullFileName = Date.now() + '-' + file.originalname;
        cb(null, fullFileName);
    }
});

const upload = multer({ storage });

router.get('/:_id?', async (req, res, next) => {
    try {
        const { _id } = req.params
        const products = _id ? await getProductsByID(_id) : await getAllProducts();
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
    try {
        const files = req.files;

        if (files.length) {
            const images = files.map(img => img.path.slice(6));
            req.body.images = images;
            //gives firs image as thumnail
            req.body.thumbnail = images[0]
            console.log(images)
        }

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

router.delete('/:_id', (req, res, next) => {
    try {
        //deleting img from disk, not recommended in the production
        const { _id } = req.params
        const imgToDelete = req.body;
        console.log(_id, imgToDelete)
    } catch (error) {
        next(error)
    }
})

export default router;