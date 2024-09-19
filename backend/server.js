import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongoDB.js"
import connectCloudinary from "./config/cloudinary.js"
import router from "./routers/user.Route.js"
import productRouter from "./routers/product.Route.js"
import cartRouter from "./routers/cart.Router.js"
import orderRouter from "./routers/order.Router.js"

// App config 
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

// middleware  
app.use(express.json())

app.use(cors())

// api endpoint 
app.use('/api/user', router)
app.use("/api/product",productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log(`server startes at ${port}`)
)