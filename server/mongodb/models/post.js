import mongoose from "mongoose";

const Post = new mongoose.Schema({
    email: {type: String, required: true},
    image: {type: String, required: true},
    title: {type: String, required: true},
    author:{type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true}
})

const PostSchema = mongoose.model('Post',Post);

export default PostSchema;