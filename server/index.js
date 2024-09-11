import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import connectDB from './mongodb/connect.js';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import resetPasswordRoutes from './routes/resetPasswordRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import signupOtpRoutes from './routes/signupOtpRoutes.js'

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes)
app.use('/post',postRoutes)
app.use('/order',orderRoutes);
app.use('/reset-password',resetPasswordRoutes);
app.use('/comment',commentRoutes);
app.use('/signupotp',signupOtpRoutes);

app.get('/',async(req,res) => {
    res.sendStatus(200);
})

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(port, ()=>console.log('server has started on http://localhost:8080'));
    }catch(error){
        console.log(error);
    }
} 
startServer();
