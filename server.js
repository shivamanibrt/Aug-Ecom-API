import express from 'express'
import { dbConnect } from './src/Config/dbConfig.js';
import adminUserRouter from './src/Router/adminUserRouter.js';
import cors from 'cors'
import helmet from 'helmet'
const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

//api

app.use('/api/v1/admin-user', adminUserRouter)

//dbConnection
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

app.use((error, req, res, next) => {
    const statusCode = error.status || 404
    res(statusCode).json({
        status: 'error',
        message: error.message
    })
})

app.listen(PORT, error => {
    error && console.log(error);
    console.log(`Server running at http://localhost:${PORT}`);
})