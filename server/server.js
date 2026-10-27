import e from "express";
import 'dotenv/config'
import ConnectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors";
import { productRoutes } from "./src/routes/productRoutes.js";
import { cartRoutes } from "./src/routes/cartRoutes.js";



const app = e();


app.use(e.json())
app.use(cors())

app.get('/get',(req,res)=>{
    return res.json({message:"get api is working"})
})

app.use('/api/auth',authRoutes)
app.use('/api/products', productRoutes )
app.use('/api/cart', cartRoutes )




const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    ConnectDB()
    console.log(`Prot is listening: ${PORT}`)
})