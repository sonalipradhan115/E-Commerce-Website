import mongoose from "mongoose";

const User = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const PostSchema = mongoose.model('User',User);

export default PostSchema;