import express from "express";
import Comment from "../mongodb/models/comment.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { itemId, email, comment } = req.body;
  try {
    const findemail = await Comment.find({ email: email ,itemId: itemId});
    if (findemail.length !== 0) {
      // const result = await Comment.findOneAndUpdate({ email: email },{ $set: { comment: comment }});
      await Comment.findOneAndRemove({email:email});
      const result = Comment.create({
        itemId: itemId,
        email: email,
        comment: comment,
      });
      res.status(200).json({ success: true, data: result });
    } else if(findemail.length===0) {
      const result = Comment.create({
        itemId: itemId,
        email: email,
        comment: comment,
      });
      res.status(200).json({ success: true, data: result });
    }
  } catch (err) {
    res.status(200).json({ success: false, message: "cannot comment! error" });
  }
});

router.route('/:id').get(async(req,res) => {
    const {id} = req.params;
    try{
        const data = await Comment.find({itemId:id});
        res.status(200).json({success: true, data: data});
    }catch(err){
        res.status(200).json({ success: false, message: "error while fetching comments!" });
    }
})

export default router;
