import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/ProductRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 4000;
await connectDB()
await connectCloudinary()

//Allow multiple origins
const allowedOrigins = ['http://localhost:5173','https://farm-fresh-chi.vercel.app']

app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));


app.get('/',(req,res)=>{
res.send("API is working")
});
app.use('/user',userRouter)
app.use('/seller',sellerRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/address',addressRouter)
app.use('/order',orderRouter)

app.get('/list-files', (req, res) => {
  const files = fs.readdirSync(path.resolve('.'));
  res.json({ files });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});