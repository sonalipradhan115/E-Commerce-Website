import express from 'express';
import Post from '../mongodb/models/post.js';

const router = express.Router();

router.route('/').get(async(req,res) => {
    try{
        const data = await Post.find({})
        res.status(200).json({success: true, data: data})
    }catch(error){
        res.status(500).json({success: false, message: "could not get books data!"})
    }
})
router.route('/userdetail/:email').get(async(req,res) => {
    const {email} = req.params;
    try{
        const data = await Post.find({email: email});
        res.status(200).json({success: true, data: data})
    }catch(error){
        res.status(500).json({success: false, message: "could not get user post details!"})
    }
})
router.route('/:id').get(async(req,res) => {
    const {id} = req.params;
    try{
        const data = await Post.find({_id:id});
        res.status(200).json({success: true, data: data})
    }catch(error){
        res.status(500).json({success: false, message: "could not get books data!"})
    }
})
router.route('/genre/:id').get(async(req,res) => {
    const {id} = req.params;
    try{
        const data = await Post.find({category:id});
        res.status(200).json({success: true, data: data})
    }catch(error){
        res.status(500).json({success: false, message: "could not get books data!"})
    }
})
router.route('/').post(async(req,res) => {
    try {
        const {email,image,title,author,price,description,category} = req.body;
        const newPost = Post.create({
            email: email,
            image: image,
            title: title,
            author: author,
            price: price,
            description: description,
            category: category
        })
        res.status(200).json({success: true, data: newPost});
    }catch(err){
        res.status(500).json({success: false, message: 'cannot create a book post!'})
    }
})
router.route('/update/:id').post(async(req,res) => {
    try {
        const {id} = req.params;
        const {email,image,title,author,price,description,category} = req.body;
        await Post.findByIdAndUpdate(id,{image:image,title:title,author:author,price:price,description:description,category:category})
        res.status(200).json({success: true, message: 'post updated successfully!'});
    }catch(err){
        res.status(500).json({success: false, message: 'cannot update the post!'})
    }
})
router.route('/:id').post(async(req,res) => {
    try{
        const {_id} = req.body;
        await Post.findByIdAndRemove({_id});
        res.status(200).json({success: true, message: 'post deleted successfully!'})
    }catch(err){
        res.status(500).json({success:false, message: 'cannot delete the post!'})
    }
})




export default router;