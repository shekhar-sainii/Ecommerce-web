import userModel from "../models/userModel.js";


const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        console.log("Cart data",cartData);
        
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
                
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, msg: "Added the Cart"})
        
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: error.message})
        
    }
}
const updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, msg: "Cart Updated!"})
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: error.message})
        
    }
}
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        
        res.json({success: true, cartData})

    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: error.message})
        
    }
}


export {
    addToCart,
    updateCart,
    getUserCart
}