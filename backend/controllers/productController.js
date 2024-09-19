import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
// import upload from '../middleware/multer.js';

// Function for add product 
const addProduct = async (req, res) => {
    try {
        const {name, desciption, price, category, subCategory, sizes, bestSeller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]



        const images = [image1, image2, image3, image4].filter((item) => item !== 'undefined')
        console.log(images);
        

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        // console.log(name, desciption, price, category, subCategory, sizes, bestSeller);
        // console.log(imageUrl);

        const productData = {
            name,
            desciption,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imageUrl,
            date: Date.now()
        }
      
        // console.log(productData);

        const product = new productModel(productData)
        await product.save()
        

        res.json({success: true, msg: "Product Added Successsully"})
        
    } catch (error) {
        console.log(error);
        res.json({success : false,msg: error.message})
        
    }
} 

// function for list product 
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message})
    }
}

// function for remove product 

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, msg: "Product Remove Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, msg: error.message})
    }
}

// function for single product info 
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success: true,product})
    } catch (error) {
        console.log(error);
        res.json({success: false,msg: error.message})
    }
}

export {
    addProduct, 
    listProduct,
    removeProduct, 
    singleProduct
}