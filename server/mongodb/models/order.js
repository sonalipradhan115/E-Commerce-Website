import mongoose from "mongoose";

const Order = new mongoose.Schema({
    buyer: {type: String, required: true},
    seller: {type: String, required: true},
    itemId: {type: String, required: true},
    itemimage: {type: String, required: true},
    itemname: {type: String, required: true},
    itemauthor: {type: String, required: true},
    itemprice: {type: String, required: true},
    itemquantity: {type: String, required: true},
})

const PostSchema = mongoose.model('Order',Order);

export default PostSchema;