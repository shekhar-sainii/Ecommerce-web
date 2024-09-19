import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator  from "validator"

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


// Route for user login 
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        console.log(password);

        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, msg: "User does not Exist Please Sign Up!"})
        }

        const isUser = await bcrypt.compare(password, user.password);
        console.log(isUser);
        

        if(isUser) {
            const token = createToken(user._id)
            console.log(token);
            
            res.json({success: true, token})
        } else {
            return res.json({success: false, msg: "Invalid Creditial"})
        }

    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message})

    }

}

// Route for user register 
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        const exists = await userModel.findOne({email})

        if(exists) {
            return res.json({success : false, msg: "User Already Exists"})
        }

        // Validating email and password 
        if(!validator.isEmail(email)) {
            return res.json({success: false, msg: "Please Enter is Valid Email"})
        }

        if(password.length < 8) {
            return res.json({success: false, msg: "Please Enter strong Password"})
        }
        // console.log(password);
        

        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        

        const newUser = userModel({
            name,
            email,
            password: hashPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token})


    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message})
        
    }
    // res.json({msg: "Register Api Working"})
     
}

// Route for Admin login
const adminLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success: false, msg: "Invalid Crenditial"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message})
        
    }
}

export {
    loginUser,
    registerUser,
    adminLogin
}