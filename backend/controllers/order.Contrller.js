import orderModel from "../models/order.model.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import razorpay from 'razorpay'

// global variable 
const currency = 'inr'
const deliveryCharge = 10

// gateway Setup 
const stripe = new Stripe(process.env.STRIPE_PUBLIC_KEY)

// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET
// })

// placing order using COD Method 
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
            address
        }

        const newOrder  = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartdata: {}})

        // res.json({success: true, msg: "Order Placed })
    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
        
    }
}
// placing order using Stripe Method 
const placeOrderStripe = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body
       const {origin} = req.headers;

       
       const orderData = {
        userId,
        items,
        amount,
        paymentMethod: 'Stripe',
        payment: false,
        date: Date.now(),
        address
    }

    
    const newOrder  = new orderModel(orderData)
    await newOrder.save()

    const line_items = items.map((item) => ({
        price_data: {
            currency: currency,
            product_data : {
                name: item.name
            },
            unit_amount: item.price * 100
        },
        quantity: item.quantity
    }))
    line_items.push({
        price_data: {
            currency: currency,
            product_data: {
                name: 'Delivery Charges'
            },
                unit_amount: deliveryCharge * 100
        },
        quantity: 1
    })

    const session  = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: 'payment',


    })
    res.json({success: true, session_url: session.url})


    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
    }
}

// verify stripe 
const verifyStripe = async (req, res) => {
    try {
    const {orderId, success, userId} = req.body
        if(success === true) {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})

            res.json({success: true})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
        
    }
}

// placing order using COD Method 
const placeOrderRazorpay = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body
        const {origin} = req.headers;
 
        
        const orderData = {
         userId,
         items,
         amount,
         paymentMethod: 'Razorpay',
         payment: false,
         date: Date.now(),
         address
     }

     const newOrder  = new orderModel(orderData)
     await newOrder.save()


     const options = {
        amount: amount*100,
        currency: currency.toUpperCase(),
        receipt: newOrder._id.toString()
     }

     await razorpayInstance.orders.create(options, (error, order) => {
        if (error) {
            console.log(error);
            return res.json({success: false, msg: error })
        }
        return res.json({success: true, order })

     })

    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
    }
}

// verify razorpay 
const verifyRazorpay = async (req, res) => {
    try {
    const {userId,razorpay_order_id} = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    console.log(orderInfo);
    
        if(orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})

            res.json({success: true, msg: "Payment Successfully!"})
        } else {
            res.json({success: false, msg: "Payment Failed!"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
        
    }
}


// All orders date for admin panel
const allOrder = async (req, res) => {
    try {
        const orders =await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
    }
}
// User orders data from frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body

        const orders = await orderModel.find({userId})

        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
    }
}
// Update orders status from admin Panel
const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body

        await findByIdAndUpdate(orderId, {status})
        res.json({success: true, msg: "Status Updated!"})
    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
    }
}

export {
    verifyRazorpay,
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrder,
    userOrders,
    updateStatus,
    verifyStripe

}