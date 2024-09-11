import mongoose from "mongoose";

const Comment = new mongoose.Schema({
    itemId :{type: String, required: true},
    email: {type: String, required: true},
    comment: {type: String, required: true}
})

const PostSchema = mongoose.model('Comment',Comment);

export default PostSchema;