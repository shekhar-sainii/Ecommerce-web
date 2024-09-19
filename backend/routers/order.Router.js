import express, { Router } from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

import {
    verifyRazorpay,
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrder,
    userOrders,
    updateStatus,
    verifyStripe

} from '../controllers/order.Contrller.js'

const orderRouter = express.Router()
// Admin feature 
orderRouter.post('/list',adminAuth, allOrder)
orderRouter.post('/status',adminAuth, updateStatus)

// Payment feature  
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/razorpay',authUser, placeOrderRazorpay)

// User feature 
orderRouter.post('/userorders',authUser, userOrders)

// verify Router 

orderRouter.post('/verifyStripe',authUser, verifyStripe)
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)


export default orderRouter