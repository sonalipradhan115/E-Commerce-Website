import mongoose, { mongo } from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
        .then(()=>console.log("mongoDB connected"))
        .catch((err)=>{
            console.log("could not connect to mongodb!")
            console.log(err)
        })
}

export default connectDB;