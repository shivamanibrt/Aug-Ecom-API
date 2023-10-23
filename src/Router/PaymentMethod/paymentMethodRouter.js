import express from 'express';
import { newPaymentMethodValidation, updatePaymentMethodValidation } from '../../MiddleWares/Joy-Valication/joiValidation.js';
import { deletePaymentMethodById, getPaymentMethods, insertPaymentMethod, updatePaymentMethodById } from '../../Modles/Payment/PaymentModal.js';
// import PaymentMethodSchema from '../../Modles/Payment/PaymentMethodSchema.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await getPaymentMethods();
        res.json({
            status: 'success',
            message: 'You reached payment method get API',
            result
        })
    } catch (error) {
        error.status = 500
        next(error)
    }
})

router.post('/', newPaymentMethodValidation, async (req, res, next) => {
    try {
        const paymentMethod = await insertPaymentMethod(req.body);
        paymentMethod?._id ?
            res.json({
                status: 'success',
                message: 'New pament has been added',
            }) :
            res.json({
                status: 'error',
                message: 'Unable to add new payment method please try again later',
            })
    } catch (error) {
        error.status = 500;
        if (error?.message?.includes('E11000')) {
            error.message = "Duplicate this payment method has already been added";
        }
        next(error)
    }
})

router.put('/', updatePaymentMethodValidation, async (req, res, next) => {
    try {
        const paymentMethod = await updatePaymentMethodById(req.body);

        paymentMethod?._id ?
            res.json({
                status: 'success',
                message: 'Payment Method has been updated',
                paymentMethod
            }) :
            res.json({
                status: 'error',
                message: 'Unable to update nPayment has been updated',
            })
    } catch (error) {
        error.status = 500;
        next(error)
    }
})


router.delete('/', async (req, res, next) => {
    try {
        const { _id } = req.body;

        const result = await deletePaymentMethodById(_id);

        result?._id ?
            res.json({
                status: 'success',
                message: 'Deleted Succesfully',
                result
            }) :
            res.json({
                status: 'error',
                message: 'Unable to delete',
            })
    } catch (error) {
        error.status = 500;
        next(error)
    }
})

export default router;