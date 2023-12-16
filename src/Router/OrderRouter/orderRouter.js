import express from 'express'
import { getAllOrders, getOrdersById, insertOrders } from '../../Modles/Order/OrderModel.js'
const router = express.Router()

// const orderArg = [
//     {
//         _id: '11',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '12',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
//     {
//         _id: '1',
//         status: 'processing',//processing,completed,cancelled
//         buyer: {
//             buyerId: 'xbv47',
//             fName: 'Aayush',
//             lName: 'Bartaula',
//             email: 'phone',
//             phone: '0414449540'
//         },
//         cart: [
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             },
//             {
//                 productId: 'sdasda',
//                 productName: 'asdas',
//                 salesPrice: 111,
//                 qty: 2,
//                 thumnail: 'http',
//                 subTotal: 300
//             }
//         ],
//         shipping: {
//             fName: 'Shivamani',
//             lName: 'Bartaula',
//             phone: '21321',
//             street: '10 George st',
//             postcode: '2000',
//             state: 'NSW',
//             country: 'Australia'
//         },
//         cartTotal: 450,
//         discount: 50,
//         discountCode: 'disCode',
//         totalAmount: 400,// cartTotal - discount,
//         paymentInfo: {
//             status: 'paid', //paid, pending
//             method: 'cash', // cash or credit card
//             paidAmount: 400,
//             transacitonId: 'sadas',
//             paidDate: '2020-02-20'
//         }
//     },
// ]

router.get('/', async (req, res, next) => {
    try {
        const { _id } = req.body;

        const orders = _id ? await getAllOrders() : await getOrdersById(_id);
        res.json({
            status: 'success',
            message: 'orderList',
            orders
        })

    } catch (error) {
        next(error)

    }
})

router.post('/', async (req, res, next) => {
    try {
        const orders = await insertOrders(req.body)
        orders?._id ?
            res.json({
                status: 'succes',
                message: 'Order succesfully created'
            }) : res.json({
                status: 'error',
                message: 'Order cannot be created'
            })

    } catch (error) {
        next(error)

    }
})
export default router;