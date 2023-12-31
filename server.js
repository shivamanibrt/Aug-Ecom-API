import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
const app = express();
import path from 'path'

const PORT = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

//serve static content
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')))

//api
import { adminAuth } from './src/MiddleWares/Joy-Valication/AuthMiddleware/authMiddleware.js';
import catagoryRouter from './src/Router/Catagory/catagoryRouter.js';
import adminUserRouter from './src/Router/AdminUser/adminUserRouter.js';
import paymentMethodRouter from './src/Router/PaymentMethod/paymentMethodRouter.js';
import productsRouter from './src/Router/Product/productsRouter.js'
import orderRouter from './src/Router/OrderRouter/orderRouter.js'

app.use('/api/v1/admin-user', adminUserRouter)
app.use('/api/v1/catagory', catagoryRouter)
app.use('/api/v1/paymentMethod', paymentMethodRouter)
app.use('/api/v1/product', productsRouter)
app.use('/api/v1/order', orderRouter)

//dbConnection
import { dbConnect } from './src/Config/dbConfig.js';
dbConnect();

//this is default end point
app.use('/', (req, res, next) => {
    try {
        res.json({
            status: 'success',
            message: 'Hi there you reached to API'
        })
    } catch (error) {
        next(error)
    }
})

//global error handler
app.use((error, req, res, next) => {
    try {
        const statusCode = error.status || 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    } catch (error) {
        next(error);
    }
});


app.listen(PORT, error => {
    error && console.log(error);
    console.log(`Server running at http://localhost:${PORT}`);
})